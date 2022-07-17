import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Card from "../Components/UI/Card";
import Input from "../Components/UI/Input";

import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../api/firebase-config";
import TextArea from "../Components/UI/TextArea";
import Backdrop from "../Components/UI/BackdropModal";
import Button from "../Components/UI/Button";
import { useNavigate, useParams } from "react-router-dom";
import useAddApp from "../hooks/useAddApp";
import useApp from "../hooks/useApp";
import axios from "axios";
import { SketchPicker } from "react-color";
import Spinner from "../Components/UI/Spinner";
import useFetch from "../hooks/useFetch";
import { useStateContext } from "../contexts/ContextProvider";

const AddFeatureApp = () => {
  const { featuredApp } = useStateContext();

  const [check, setCheck] = useState(false);
  const { data: requests, isloading } = useFetch("app-requests", check);
  const navigate = useNavigate();
  const { id } = useParams();

  const { getApp, addApp, app } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#fff");

  const formik = useFormik({
    initialValues: {
      packageId: id,
      color: selectedColor,
      videoLink: "",
      websiteLink: "",
    },
    enableReinitialize: false,
    onSubmit: async (values) => {
      values.color = selectedColor;
      await addApp(app, values);
      const filteredRequest = requests.filter(
        (item) => item.id === featuredApp
      );
      await updateDoc(
        doc(collection(db, "app-requests"), filteredRequest[0].id),
        {
          ...filteredRequest,
          approved: true,
        }
      );
      setShowModal(false);
      navigate("/dashboard/all-apps");
    },
  });
  // console.log(formik.values.color);

  return (
    <>
      <Card>
        <div className="w-[90%] max-w-5xl h-full mx-auto">
          <h1 className="text-4xl">App Request</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col flex-wrap gap-4 pt-6 md:px-14 md:gap-6"
          >
            <Input
              disabled
              width="full"
              type="text"
              name="packageId"
              label="App ID(Play/App Store package_id)"
              onChange={formik.handleChange}
              value={formik.values.packageId}
            />
            <Input
              width="full"
              type="text"
              name="videoLink"
              label="Video Link"
              onChange={formik.handleChange}
              value={formik.values.videoLink}
            />
            {/* <Input
              width="full"
              type="text"
              name="websiteLink"
              label="Website Link"
              onChange={formik.handleChange}
              value={formik.values.websiteLink}
            /> */}
            <div className="flex gap-4">
              <Input
                width="full"
                type="text"
                name="color"
                label="Select App Color"
                value={selectedColor}
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                }}
              />
              <SketchPicker
                presetColors={[]}
                color={selectedColor}
                onChange={(color) => {
                  setSelectedColor(color.hex);
                }}
              />
            </div>
            <div className="w-full flex justify-between">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                type="button"
                className="flex bg-green-500 text-white rounded-lg  px-8 py-3 md:px-10 md:py-3 md:mx-0"
              >
                Go back
              </button>
              <button
                onClick={() => {
                  getApp(formik.values.packageId);
                  console.log(app);
                  setShowModal(true);
                }}
                type="button"
                className="flex bg-green-500 text-white rounded-lg  px-8 py-3 md:px-10 md:py-3 md:mx-0"
              >
                Add App
              </button>
            </div>
            <Backdrop
              disableAlpha
              title="Add App"
              show={showModal}
              onClick={() => setShowModal(false)}
            >
              Are you sure you want to add requested App?
              <div className="self-end mt-4">
                <Button type={"submit"}>Yes</Button>
              </div>
            </Backdrop>
          </form>
        </div>
      </Card>
    </>
  );
};

export default AddFeatureApp;
