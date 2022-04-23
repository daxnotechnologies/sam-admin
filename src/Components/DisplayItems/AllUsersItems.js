import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../api/firebase-config";
import useUser from "../../hooks/useUser";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const AllUsersItems = ({ userName, userId, imagePath }) => {
  let navigate = useNavigate();
  const { deleteUser } = useUser();

  const [isloading, setIsloading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {imagePath ? (
              !isloading ? (
                <img
                  src={imagePath}
                  alt=""
                  className="object-cover h-14 w-14 rounded-full"
                />
              ) : (
                <div className="h-14 w-14 bg-gray-500 rounded-full animate-pulse" />
              )
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>{userName}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852] text-[12px]">{"5:12 pm"}</p>
              <p className=" text-[#404852] self-end">.</p>
              <p className="text-primary text-[12px] font-semibold opacity-70">
                {"Details"}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-user/${userId}`);
            }}
          >
            Edit
          </Button>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <Button
            alt
            onClick={() => {
              setShowModal(true);
              // alert(userName + " with Id " + userId + " deleted");
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <Backdrop
        title="Delete User!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to delete the user?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={() => {
              deleteUser(userId);
              setShowModal(false);
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default AllUsersItems;
