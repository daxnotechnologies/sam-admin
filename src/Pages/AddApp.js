import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Card from "../Components/UI/Card";
import Input from "../Components/UI/Input";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";
import TextArea from "../Components/UI/TextArea";
import Backdrop from "../Components/UI/BackdropModal";
import Button from "../Components/UI/Button";
import { useNavigate, useParams } from "react-router-dom";
import useAddApp from "../hooks/useAddApp";
import useApp from "../hooks/useApp";

const AddApp = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { addApp } = useApp();

  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      packageId: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log(app);
      addApp(app);
      setShowModal(true);
      /* alert("Category Added!"); */
    },
  });

  const { app } = useAddApp(formik.values.packageId);

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
            {/* <TextArea
              type="text"
              rows={5}
              placeholder="Description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.requirment}
            /> */}
            {/* <input type="file" name="" id="" /> */}
            <div>
              <button
                type="submit"
                className="flex bg-green-500 text-white rounded-lg mx-auto  px-8 py-3 md:px-10 md:py-3 md:ml-auto md:mx-0"
              >
                Add App
              </button>
            </div>
          </form>
        </div>
      </Card>
      <Backdrop
        title="Add App"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to add this App?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={() => {
              setShowModal(false);
              // navigate("/dashboard/all-apps");
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default AddApp;
