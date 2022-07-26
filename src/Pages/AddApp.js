import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Card from "../Components/UI/Card";
import Input from "../Components/UI/Input";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";
import TextArea from "../Components/UI/TextArea";
import Backdrop from "../Components/UI/BackdropModal";
import Button from "../Components/UI/Button";
import { useNavigate } from "react-router-dom";
import useAddApp from "../hooks/useAddApp";
import useApp from "../hooks/useApp";
import axios from "axios";
import { SketchPicker } from "react-color";
import Spinner from "../Components/UI/Spinner";

const AddApp = () => {
  const navigate = useNavigate();

  const { getApp, addApp, app } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#fff");

  const formik = useFormik({
    initialValues: {
      packageId: "",
      color: selectedColor,
      videoLink: "",
      websiteLink: "",
    },
    enableReinitialize: false,
    onSubmit: (values) => {
      values.color = selectedColor;
      addApp(app, values);
      setShowModal(false);

      navigate("/dashboard/all-apps");
    },
  });

  return (
    <>
      <Card>
        <div className="w-[90%] max-w-5xl h-full mx-auto">
          <h1 className="text-4xl">Add App</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col flex-wrap gap-4 pt-6 md:px-14 md:gap-6"
          >
            <Input
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
                disableAlpha
                presetColors={[]}
                color={selectedColor}
                onChange={(color) => {
                  setSelectedColor(color.hex);
                }}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  getApp(formik.values.packageId);
                  console.log(app);
                  setShowModal(true);
                }}
                type="button"
                className="flex bg-green-500 text-white rounded-lg mx-auto  px-8 py-3 md:px-10 md:py-3 md:ml-auto md:mx-0"
              >
                Add App
              </button>
            </div>
            <Backdrop
              title="Add App"
              show={showModal}
              onClick={() => setShowModal(false)}
            >
              Are you sure you want to add this App?
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

export default AddApp;
