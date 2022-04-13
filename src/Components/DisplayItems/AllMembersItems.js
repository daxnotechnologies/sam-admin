import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../api/firebase-config";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const AllMembersItems = ({ memberId, group, setGroup }) => {
  let navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [member, setMember] = useState([]);

  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const userData = await getDoc(doc(usersCollectionRef, memberId));
      setMember(userData.data());
    };
    getUsers();
  }, [memberId, usersCollectionRef]);

  const deleteMember = async (id) => {
    const userDoc = doc(db, "users", id);
    deleteDoc(userDoc);
  };
  return (
    <>
      {member && (
        <div className="grid grid-cols-12 place-items-center text-center">
          <div className="col-span-8 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
            <div className="grid place-items-center mr-4">
              {member.imagePath ? (
                <img
                  src={member.imagePath}
                  alt=""
                  className="object-cover h-14 w-14 rounded-full"
                />
              ) : (
                <div className="h-14 w-14 bg-slate-300 rounded-full" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p>{member.name}</p>
              <div className="flex items-center gap-2">
                <p className=" text-[#404852] text-[12px]">{"5:12 pm"}</p>
                <p className=" text-[#404852] self-end">.</p>
                <p className="text-primary text-[12px] font-semibold opacity-70">
                  {"Details"}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-4 lg:col-span-3">
            <Button
              type="button"
              alt
              onClick={() => {
                setShowModal(true);
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      )}
      <Backdrop
        title="Remove!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to remove the member?
        <div className="self-end">
          <Button
            type={"button"}
            onClick={() => {
              /* let newMembers = group.members.filter((id) => memberId !== id);
              setGroup({
                ...group,
                members: newMembers,
              }); */
              console.log(group.members);
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

export default AllMembersItems;
