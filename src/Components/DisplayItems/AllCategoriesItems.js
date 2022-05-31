import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../api/firebase-config";
import useCategory from "../../hooks/useCategory";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const AllCategoriesItems = ({ categoryName, categoryId, check, setCheck }) => {
  const navigate = useNavigate();
  const { deleteCategory } = useCategory();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center">
            {/* <img
              src={imgSrc}
              alt=""
              className="object-cover h-12  rounded-full"
            /> */}
          </div>
          <div className="flex flex-col gap-2">
            <p>{categoryName}</p>
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
              navigate(`/dashboard/edit-category/${categoryId}`);
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
              // alert(categoryName + " with Id " + categoryId + " deleted");
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <Backdrop
        title="Delete!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to delete this Category?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={() => {
              deleteCategory(categoryId);
              setCheck(!check);
              setShowModal(false);
              navigate("/dashboard");
              // forceUpdate()
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default AllCategoriesItems;
