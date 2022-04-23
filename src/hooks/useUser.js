import React from "react";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";

const useUser = () => {
  const usersCollectionRef = collection(db, "users");

  const deleteUser = async (userId) => {
    const userDoc = doc(usersCollectionRef, userId);
    deleteDoc(userDoc);
  };

  return { deleteUser };
};

export default useUser;
