import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const { data: allUsers, isloading } = useFetch("users");
  // const { docData: user } = useFetchDoc("users", userId);
  console.log(allUsers);
  const appPackageId = extractAppId(appLink);
  const { app } = useAddApp(appPackageId);
  console.log(app);

  const { addApp } = useApp();
  const { updateAppRequest, deleteAppRequest } = useAppRequest();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [approved, setApproved] = useState(isApproved);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState(false);

  useEffect(() => {
    const getColor = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://api.imagga.com/v2/colors", {
          params: {
            image_url: app?.icon,
          },
          headers: {
            Authorization:
              "Basic YWNjXzU1MTAyMjQzMmU4YWVhOTplMWQwOGM2ZDRkOGYxNmI4NDEzNjUwOWVjMDNkZTZmZg==",
          },
        });
        const color =
          response.data.result.colors.image_colors[0]
            .closest_palette_color_html_code;
        console.log(response.data.result.colors);
        console.log(color);
        setColor(color);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getColor();
  }, [app]);

  useEffect(() => {
    if (userId) {
      const user = allUsers.find((user) => user.id === userId);
      setSelectedUser(user);
    }
  }, [allUsers, userId]);

  console.log(selectedUser);
  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-4 lg:col-span-7 flex gap-4 place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center">
            {app?.icon ? (
              <img
                src={app?.icon}
                alt=""
                className="object-cover h-14 w-14 rounded-full"
              />
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
          </div>

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
              setLoading(true);
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
                  addApp(app);
                  updateAppRequest(appRequestId);
                  setCheck(!check);
                  setApproved(true);
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
