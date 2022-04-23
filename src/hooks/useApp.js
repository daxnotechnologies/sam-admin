import React from "react";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";

const useApp = () => {
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

  return { deleteApp, featureApp };
};

export default useApp;
