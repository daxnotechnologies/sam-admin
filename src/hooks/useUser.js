import React from "react";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";

const useUser = () => {
  const usersCollectionRef = collection(db, "users");

  const deleteUser = async (userId) => {
    const userDoc = doc(usersCollectionRef, userId);
    deleteDoc(userDoc);
  };
  const updateUser = async (values, userId, imagePath) => {
    const data = doc(usersCollectionRef, userId);
    await updateDoc(data, {
      name: values.name,
      email: values.email,
      password: values.password,
      favourites: values.favourites,
      imagePath: imagePath,
    });
  };

  return { deleteUser, updateUser };
};

export default useUser;
