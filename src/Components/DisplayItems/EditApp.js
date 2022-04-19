import React, { useEffect, useState } from "react";

import Input from "../Input";
import { useFormik } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import Card from "../Card";
import TextArea from "../TextArea";
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
import InputFile from "../InputFile";

const EditApp = () => {
  const navigate = useNavigate();
  const { appId } = useParams();
  const [selectedApp, setSelectedApp] = useState({});
  const [users, setUsers] = useState({});
  const [appIcon, setAppIcon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: selectedApp.name,
      /* email: selectedApp.email,
      password: selectedApp.password,
      address: selectedApp.address, */
      imagePath: selectedApp.imagePath,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateApp(values);
      navigate("/dashboard/all-apps");
    },
  });

  const usersCollectionRef = collection(db, "apps");
  useEffect(() => {
    const getApp = async () => {
      const data = await getDoc(doc(usersCollectionRef, appId));
      setSelectedApp(data.data());
    };
    getApp();
  }, []);

  const [imagePath, setImagePath] = useState(formik.values.imagePath);

  const uploadappIcon = async (setIsUploading) => {
    if (appIcon == null) return;
    const appIconRef = ref(storage, `profile_images/${appId}`);
    uploadBytes(appIconRef, appIcon);
    const path = await getDownloadURL(appIconRef);
    console.log(path);
    setImagePath(path);
    setIsUploading(false);
  };

  const updateApp = async (values) => {
    console.log(imagePath);
    const data = doc(usersCollectionRef, appId);
    await updateDoc(data, {
      name: values.name,
      /* email: values.email,
      password: values.password,
      address: values.address, */
      // imagePath: imagePath,
    });
  };

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit App</h1>

          <div className="flex items-center gap-6 mr-4">
            {imagePath || formik.values.imagePath ? (
              <img
                src={imagePath || formik.values.imagePath || ""}
                alt=""
                className="object-cover h-14 w-14 rounded-full"
              />
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
            <InputFile
              name="imagePath"
              imageName={appIcon?.name}
              onChange={(e) => {
                setAppIcon(e.target.files[0]);
              }}
              onUpload={uploadappIcon}
            >
              Upload
            </InputFile>
          </div>
          <Input
            width="full"
            type="text"
            name="name"
            label="Name:"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <Input
            width="full"
            type="text"
            label="E-mail:"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Input
            width="full"
            type="text"
            label="Password:"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <TextArea
            rows={1}
            type="text"
            label="Address:"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
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
            Are you sure you want to update user details?
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

export default EditApp;
