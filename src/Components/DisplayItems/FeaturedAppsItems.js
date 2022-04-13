import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../api/firebase-config";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const FeaturedAppsItems = ({ imgSrc, ftAppName, ftAppId }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const deleteFtApp = async (id) => {
    const ftAppDoc = doc(db, "featuredApps", id);
    deleteDoc(ftAppDoc);
  };

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-8 lg:col-span-9 flex gap-4 place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center">
            <img
              src={imgSrc}
              alt=""
              className="object-cover h-12  rounded-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p>{ftAppName}</p>
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
              navigate(`/dashboard/edit-group/${ftAppId}`);
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
        title="Remove!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to remove this App?
        <div className="self-end">
          <Button
            type={"button"}
            onClick={() => {
              deleteFtApp(ftAppId);
              setShowModal(false);
            }}
          >
            OK
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default FeaturedAppsItems;
