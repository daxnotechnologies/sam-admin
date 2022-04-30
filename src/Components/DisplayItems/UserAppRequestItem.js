import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAddApp from "../../hooks/useAddApp";
import useApp from "../../hooks/useApp";
import useAppRequest from "../../hooks/useAppRequest";
import useFetchDoc from "../../hooks/useFetchDoc";
import useUser from "../../hooks/useUser";
import extractAppId from "../../utility/extractAppId";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const UserAppRequestItem = ({ appRequestId, userId, appLink, isApproved }) => {
  const { docData: selectedUser } = useFetchDoc("users", userId);
  const appPackageId = extractAppId(appLink);
  const { app } = useAddApp(appPackageId);
  const { addApp } = useApp();
  const { updateAppRequest, deleteAppRequest } = useAppRequest();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [approved, setApproved] = useState(isApproved);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-4 lg:col-span-7 flex gap-4 place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center">
            {/* <img
              src={selectedUser.imagePath}
              alt=""
              className="object-cover h-12  rounded-full"
            /> */}
          </div>

          <div className="flex flex-col gap-2">
            <p>{selectedUser?.username}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852] text-[12px]">{"5:12 pm"}</p>
              <p className=" text-[#404852] self-end">.</p>
              <p className="text-primary text-[12px] font-semibold opacity-70">
                {"Details"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3 lg:col-span-2">
          {approved ? (
            <Button disabled={true}>Approve</Button>
          ) : (
            <Button
              onClick={() => {
                setShowFeatureModal(true);
              }}
            >
              Approve
            </Button>
          )}
        </div>

        <div className="col-span-2 lg:col-span-1">
          {/* <Button
            onClick={() => {
              navigate(`/dashboard/edit-app/${appId}`);
            }}
          >
            Edit
          </Button> */}
        </div>
        <div className="col-span-3 lg:col-span-2">
          <Button
            alt
            onClick={() => {
              setShowDeleteModal(true);
              // alert(categoryName + " with Id " + categoryId + " deleted");
            }}
          >
            Dismiss
          </Button>
        </div>
      </div>
      <Backdrop
        title="Dismiss!"
        show={showDeleteModal}
        onClick={() => setShowDeleteModal(false)}
      >
        Are you sure you want to Dismiss this request?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={() => {
              deleteAppRequest(appRequestId);
              setShowDeleteModal(false);
            }}
          >
            OK
          </Button>
        </div>
      </Backdrop>
      <Backdrop
        title="Approve App!"
        show={showFeatureModal}
        onClick={() => setShowFeatureModal(false)}
      >
        Are you sure you want to Approve this App?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={() => {
              addApp(app);
              updateAppRequest(appRequestId);
              setApproved(true);
              setShowFeatureModal(false);
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default UserAppRequestItem;
