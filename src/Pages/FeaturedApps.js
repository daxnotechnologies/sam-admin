import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../api/firebase-config";
import Card from "../Components/Card";
import FeaturedAppsItems from "../Components/DisplayItems/FeaturedAppsItems";
import Spinner from "../Components/UI/Spinner";

const FeaturedApps = () => {
  const [isloading, setIsloading] = useState(true);
  const [ftApps, setFtApps] = useState([]);

  const appsCollectionRef = collection(db, "apps");

  useEffect(() => {
    const getApps = async () => {
      const data = await getDocs(appsCollectionRef);
      setFtApps(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsloading(false);
    };
    getApps();
  }, [appsCollectionRef]);

  const date = new Date();
  const currentDate = `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`;
  return (
    <Card>
      <div className="w-[90%] max-w-5xl h-full mx-auto">
        <header className="flex flex-col gap-2 justify-start mb-14 ">
          <h1 className="text-4xl">Featured Apps</h1>
          <p className="text-gray-400">{currentDate}</p>
        </header>
        {/* Table */}
        {/* Header */}
        <div className="flex flex-col px-0">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-secondary">Apps</p>
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
            <div className="z-30 m-auto mt-20">
              <Spinner />
            </div>
          ) : (
            <div
              className="flex flex-col gap-5 mt-4 md:max-h-[55vh] xl:max-h-[55vh]
            md:overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-300"
            >
              <div className="flex flex-col gap-y-7 ">
                {ftApps.map((item) => {
                  if (item.featured === true) {
                    return (
                      <FeaturedAppsItems
                        key={item.id}
                        ftAppId={item.id}
                        ftAppName={item.name}
                        isFeatured={item.featured}
                        imgSrc={""}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FeaturedApps;
