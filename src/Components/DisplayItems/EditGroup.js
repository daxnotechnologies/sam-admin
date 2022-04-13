import React, { useEffect, useState } from "react";

import Input from "../Input";
import { useFormik } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import Card from "../Card";
import TextArea from "../TextArea";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../api/firebase-config";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";
import AllMembersItems from "./AllMembersItems";

const EditGroup = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [group, setGroup] = useState({});
  const [admin, setAdmin] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const groupsCollectionRef = collection(db, "allGroups");
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    /* const getUsers = async () => {
      const userData = await getDoc(doc(usersCollectionRef, group.groupAdmin));
      setAdmin(userData.data().name);
    }; */

    const getGroups = async () => {
      const data = await getDoc(doc(groupsCollectionRef, groupId));
      setGroup(data.data());
    };
    let unmount = true;
    if (unmount) {
      getGroups();
      /*  getUsers(); */
    }
    return () => {
      unmount = false;
    };
  }, []);

  const updateGroups = async (values) => {
    const data = doc(groupsCollectionRef, groupId);
    await updateDoc(data, {
      groupName: values.groupName,
      groupAdmin: values.groupAdmin,
      date: values.date,
      time: values.time,
      addDepositingPeriod: values.addDepositingPeriod,
      totalAmount: values.totalAmount,
      maxPeople: values.maxPeople,
      members: values.members,
    });
  };

  const formik = useFormik({
    initialValues: {
      groupName: group.groupName,
      groupAdmin: group.groupAdmin,
      date: group.date,
      time: group.time,
      addDepositingPeriod: group.addDepositingPeriod,
      totalAmount: group.totalAmount,
      maxPeople: group.maxPeople,
      members: group.members,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      /* alert(JSON.stringify(values, null, 2)); */
      updateGroups(values);
      navigate("/dashboard/groups");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-4 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Group</h1>

          <div className="flex gap-6">
            <div className="w-1/2 flex flex-col gap-4">
              <Input
                type="text"
                name="groupName"
                label="Group:"
                onChange={formik.handleChange}
                value={formik.values.groupName}
              />
              <Input
                type="text"
                name="addDepositingPeriod"
                label="Deposition Period:"
                onChange={formik.handleChange}
                value={formik.values.addDepositingPeriod}
              />
              <Input
                type="text"
                label="Total Amount:"
                name="totalAmount"
                onChange={formik.handleChange}
                value={formik.values.totalAmount}
              />
              <Input
                disabled
                type="text"
                name="groupAdmin"
                label="Admin:"
                onChange={formik.handleChange}
                value={formik.values.groupAdmin}
              />

              <Input
                type="text"
                label="Created At:"
                name="date"
                onChange={formik.handleChange}
                value={formik.values.date}
              />
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <Input
                type="text"
                label="Max Members:"
                name="maxPeople"
                onChange={formik.handleChange}
                value={formik.values.maxPeople}
              />
              <div className=" shadow-sm ">
                <h2 className="text-secondary text-xl font-semibold mb-3">
                  All Members
                </h2>
                <div
                  className="flex flex-col gap-3 h-80 pl-2 py-2 rounded border border-gray-500
                lg:pl-4 lg:py-4
                md:overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-300"
                >
                  {formik.values.members?.map((memberId) => (
                    <AllMembersItems
                      memberId={memberId}
                      group={group}
                      setGroup={setGroup}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                console.log(group.members);
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Update</div>
            </Button>
            <Button
              type="button"
              onClick={() => {
                navigate("/dashboard/groups");
              }}
            >
              <div className="text-base p-1">Cancel</div>
            </Button>
          </div>
          <Backdrop
            title="Update"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to update group details?
            <div className="self-end">
              <Button type={"submit"} onClick={() => setShowModal(false)}>
                OK
              </Button>
            </div>
          </Backdrop>
        </form>
      </Card>
    </>
  );
};

export default EditGroup;
