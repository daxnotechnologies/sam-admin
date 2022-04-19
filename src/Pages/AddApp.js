import { useFormik } from "formik";
import React, { useState } from "react";
import Card from "../Components/Card";
import Input from "../Components/Input";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";
import TextArea from "../Components/TextArea";
import Backdrop from "../Components/UI/BackdropModal";
import Button from "../Components/UI/Button";
import { useNavigate, useParams } from "react-router-dom";

const AddApp = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const categoriesCollectionRef = collection(db, "categories");

  const addApp = async (values) => {
    await addDoc(categoriesCollectionRef, values);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      /* alert(JSON.stringify(values, null, 2)); */
      addApp(values);
      setShowModal(true);

      /* alert("Category Added!"); */
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
              name="name"
              label="App link (Play/App Store)"
              onChange={formik.handleChange}
              value={formik.values.studentName}
            />
            <TextArea
              type="text"
              rows={5}
              placeholder="Description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.requirment}
            />
            <input type="file" name="" id="" />
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
        title="Add"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Category Added
        <div className="self-end">
          <Button
            type={"button"}
            onClick={() => {
              setShowModal(false);
              navigate("/dashboard");
            }}
          >
            OK
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default AddApp;
