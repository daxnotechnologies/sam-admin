import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../api/firebase-config";
import Card from "../Components/UI/Card";
import GroupsItems from "../Components/DisplayItems/GroupsItems";
import Search from "../Components/UI/Searchbar";
import Spinner from "../Components/UI/Spinner";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const groupsCollectionRef = collection(db, "allGroups");

  useEffect(() => {
    const getGroups = async () => {
      const data = await getDocs(groupsCollectionRef);
      setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsloading(false);
    };
    getGroups();
  }, [groupsCollectionRef]);

  const date = new Date();

  const currentDate = `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`;
  return (
    <>
      <Card>
        <div className="w-[90%] max-w-5xl h-full mx-auto">
          <header className="flex flex-col gap-2 justify-start mb-14 ">
            <h1 className="text-4xl">Groups</h1>
            <p className="text-gray-400">{currentDate}</p>
          </header>
          {/* Table */}
          {/* Header */}
          <div className="flex flex-col px-0 ">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-secondary">All Groups</p>
              <svg
                className="fill-gray-400 object-contain h-10 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
              </svg>
            </div>
            <hr className="max-w-full" />
            {/* Body */}
            {isloading ? (
              <div className="mt-20 m-auto">
                <Spinner />
              </div>
            ) : (
              <div
                className="flex flex-col gap-5 mt-4 md:max-h-[53vh] xl:max-h-[53vh] 
              md:overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-300"
              >
                <div className="flex flex-col gap-y-7">
                  {groups.map((item) => {
                    return (
                      <GroupsItems
                        groupName={item.groupName}
                        groupId={item.id}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Groups;
