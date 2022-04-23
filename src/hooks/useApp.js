import React, { useState } from "react";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../api/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const useApp = () => {
  const [imagePath, setImagePath] = useState("");
  const appsCollectionRef = collection(db, "apps");

  const deleteApp = async (appId) => {
    const appDoc = doc(appsCollectionRef, appId);
    deleteDoc(appDoc);
  };

  const featureApp = async (appId, featureApp) => {
    const data = doc(appsCollectionRef, appId);
    await updateDoc(data, {
      featured: featureApp,
    });
  };

  const updateApp = async (values, appId) => {
    const data = doc(appsCollectionRef, appId);
    await updateDoc(data, {
      title: values.title,
      category: values.category,
      rating: values.rating,
      description: values.description,
      imagePath: values.imagePath,
    });
  };

  const uploadappIcon = async (appIcon, appId) => {
    if (appIcon == null) return;
    const appIconRef = ref(storage, `app_images/${appId}`);
    uploadBytes(appIconRef, appIcon);
    let path = await getDownloadURL(appIconRef);
    setImagePath(path);
    return imagePath;
  };

  return { deleteApp, featureApp, updateApp, uploadappIcon };
};

export default useApp;
