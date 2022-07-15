import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import useAddApp from "../../hooks/useAddApp";
import useApp from "../../hooks/useApp";
import useAppRequest from "../../hooks/useAppRequest";
import useFetch from "../../hooks/useFetch";

import useUser from "../../hooks/useUser";
import extractAppId from "../../utility/extractAppId";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";

const UserAppRequestItem = ({
  appRequestId,
  userId,
  appLink,
  isApproved,
  check,
  setCheck,
}) => {
  console.log(isApproved);
  const { setFeature } = useStateContext();
  const navigate = useNavigate();
  const { data: allUsers, isloading } = useFetch("users");
  // const { docData: user } = useFetchDoc("users", userId);
  console.log(allUsers);
  const appPackageId = extractAppId(appLink);
  const { app } = useAddApp(appPackageId);
  console.log(app);

  // const { addApp } = useApp();
  const { updateAppRequest, deleteAppRequest } = useAppRequest();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // const [approved, setApproved] = useState(isApproved);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      const user = allUsers.find((user) => user.id === userId);
      setSelectedUser(user);
    }
  }, [allUsers, userId]);

  // console.log(selectedUser);
  // console.log(app?.icon);
  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-4 lg:col-span-7 flex gap-4 place-self-start text-left font-semibold text-primary">
          {app && (
            <div className="grid place-items-center">
              {app?.icon?.length > 0 ? (
                <img
                  src={app?.icon}
                  alt="icon"
                  className="object-cover h-14 w-14 rounded-full"
                />
              ) : (
                <div className="h-14 w-14 bg-slate-300 rounded-full" />
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            {app ? <p>{app.title}</p> : <p>-</p>}
            <div className="flex items-center gap-2">
              <p className="text-primary text-[12px] font-semibold opacity-70">
                by {selectedUser?.username}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3 lg:col-span-2">
          {isApproved ? (
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
              // setLoading(true);
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
        onClick={() => {
          setShowDeleteModal(false);
        }}
      >
        Are you sure you want to Dismiss this request?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={() => {
              deleteAppRequest(appRequestId);
              setCheck(!check);
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
        {loading ? (
          <div className="pt-6 pb-8 grid place-content-center">
            <Spinner />
          </div>
        ) : (
          <>
            Are you sure you want to Approve this App?
            <div className="self-end mt-4">
              <Button
                type={"button"}
                onClick={() => {
                  // setSelectedApp()
                  setFeature(appRequestId);
                  navigate(`/dashboard/add-featureapp/${appPackageId}`);
                  // addApp(app, color);
                  // updateAppRequest(appRequestId);
                  // setCheck(!check);
                  // setApproved(true);
                  setShowFeatureModal(false);
                }}
              >
                Yes
              </Button>
            </div>
          </>
        )}
      </Backdrop>
    </>
  );
};

export default UserAppRequestItem;
