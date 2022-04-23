import React, { useState } from "react";
import profile from "../../Assets/Images/profile.png";
import close from "../../Assets/Images/close-outline.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Backdrop from "./Backdrop";
import { useSelector } from "react-redux";
import { auth } from "../../api/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [isloading, setIsLoading] = useState(true);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
  };

  const sidebarList = [
    { key: "1", name: "All Categories", route: "/dashboard" },
    { key: "2", name: "Add Category", route: "/dashboard/add-category" },
    { key: "3", name: "All Apps", route: "/dashboard/all-apps" },
    { key: "4", name: "Add App", route: "/dashboard/add-app" },
    { key: "5", name: "Featured Apps", route: "/dashboard/featured-apps" },
    { key: "6", name: "All Users", route: "/dashboard/users" },
    { key: "7", name: "Logout", route: "/", logout: true },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed flex flex-col gap-6 p-4 z-50 w-full max-w-[300px] min-h-screen bg-green-500
        overflow-y-auto 
        ${
          props.open === true
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-20"
        } transition ease-out duration-300`}
      >
        <div className="flex flex-col gap-2">
          <img
            onClick={() => {
              props.setOpen(!props.open);
              props.setShowBackdrop(false);
            }}
            src={close}
            alt="close"
            className="md:hidden object-contain h-8 cursor-pointer ml-auto "
          />
          <div className="flex flex-col gap-4">
            <img
              src={user?.photoURL || profile}
              alt="pic"
              className="object-contain h-20 self-start rounded-xl"
            />
            <h2 className="text-3xl text-white break-all">
              {user?.displayName || "Admin"}
            </h2>
          </div>
          <p className="text-base break-all text-slate-200">
            {user?.email || "admin@gmail.com"}
          </p>
        </div>

        <ul className="flex flex-col gap-8">
          {sidebarList.map((item, index) => {
            return (
              <div key={item.key} className="max-w-xs">
                <Link
                  key={item.key}
                  to={item.route}
                  className="text-xl text-white cursor-pointer"
                  onClick={() => {
                    props.setOpen(!props.open);
                    props.setShowBackdrop(false);
                  }}
                >
                  {item.name}
                </Link>
                <hr className="md:hidden mt-2" />
              </div>
            );
          })}
        </ul>
      </div>
      <Backdrop
        showBackdrop={props.showBackdrop}
        onClick={() => {
          props.setOpen(!props.open);
          props.setShowBackdrop(false);
        }}
      />
      {/* Mobile Sidebar */}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[90%] max-w-[200px] lg:max-w-[280px]  mx-auto">
        <div className="hidden sm:flex sm:flex-col sm:gap-12 sm:text-3xl sm:min-h-full sm:max-w-72 sm:p-4 lg:p-10">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <img
                src={user?.photoURL || profile}
                alt="pic"
                className="object-contain h-24 self-start rounded-xl"
              />
              <h2 className="text-3xl text-white break-all">
                {user?.displayName || "Admin"}
              </h2>
            </div>
            <p className="text-base break-all text-slate-200">
              {user?.email || "admin@gmail.com"}
            </p>
          </div>
          <ul className="w-full max-w-[180px]">
            {sidebarList.map((item) => {
              return (
                <div
                  key={item.key}
                  className={`mb-3 rounded ease-in-out transition-all duration-150
                  hover:bg-slate-100 hover:bg-opacity-20 hover:pl-4
                  ${
                    location.pathname === item.route &&
                    "bg-slate-100 bg-opacity-20 pl-4"
                  }`}
                >
                  <Link
                    key={item.key}
                    to={item.route}
                    className="block text-xl text-white px-2 py-2"
                    onClick={() => {
                      item.logout && logout();
                    }}
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
