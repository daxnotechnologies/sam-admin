import React, { useEffect, useState } from "react";

import Input from "../UI/Input";
import { useFormik } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import TextArea from "../UI/TextArea";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../api/firebase-config";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import InputFile from "../UI/InputFile";

const EditCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState({});
  const [showModal, setShowModal] = useState(false);
  //   const [users, setUsers] = useState({});
  //   const [profilePic, setProfilePic] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: selectedCategory.name,
      description: selectedCategory.description,
      //   imagePath: selectedCategory.imagePath,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      /* alert(JSON.stringify(values, null, 2)); */
      updateUser(values);
      navigate("/dashboard/categories");
    },
  });

  const usersCollectionRef = collection(db, "categories");
  useEffect(() => {
    const getCategory = async () => {
      const data = await getDoc(doc(usersCollectionRef, categoryId));
      setSelectedCategory(data.data());
    };
    getCategory();
  }, []);

  //   const [imagePath, setImagePath] = useState(formik.values.imagePath);

  //   const uploadIcon = async (setIsUploading) => {
  //     if (profilePic == null) return;
  //     const profilePicRef = ref(storage, `profile_images/${categoryId}`);
  //     uploadBytes(profilePicRef, profilePic);
  //     const path = await getDownloadURL(profilePicRef);
  //     console.log(path);
  //     setImagePath(path);
  //     setIsUploading(false);
  //   };

  const updateUser = async (values) => {
    // console.log(imagePath);
    const data = doc(usersCollectionRef, categoryId);
    await updateDoc(data, {
      name: values.name,
      //   desciption: values.description,
      //   imagePath: imagePath,
    });
  };

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Category</h1>
          <Input
            width="full"
            type="text"
            name="name"
            label="Name:"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <TextArea
            rows={4}
            type="text"
            label="Description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />

          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Update</div>
            </Button>
            <Button
              type="button"
              onClick={() => {
                navigate("/dashboard/users");
              }}
            >
              <div className="text-base p-1">Cancel</div>
            </Button>
          </div>
          <Backdrop
            title="Update"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to update Category details?
            <div className="self-end">
              <Button type={"submit"} onClick={() => setShowModal(false)}>
                OK
              </Button>
            </div>
          </Backdrop>
        </form>
      </Card>
    </>
  );
};

export default EditCategory;
