import React from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../api/firebase-config";

const useCategory = () => {
  const categoriesCollectionRef = collection(db, "categories");

  const addCategory = async (values) => {
    await addDoc(categoriesCollectionRef, values);
  };

  const deleteCategory = async (categoryId) => {
    const categoryDoc = doc(categoriesCollectionRef, categoryId);
    deleteDoc(categoryDoc);
  };

  /* const featureApp = async (appId, featureApp) => {
    const data = doc(appCollectionRef, appId);
    await updateDoc(data, {
      featured: featureApp,
    });
  }; */

  return { addCategory, deleteCategory };
};

export default useCategory;
