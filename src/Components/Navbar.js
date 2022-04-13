import React from "react";
import menu from "../Assets/Images/menu-outline.svg";
import avatar from "../Assets/Images/profile.png";
import Search from "./Searchbar";

const Navbar = (props) => {
  return (
    <div className="md:hidden flex items-center justify-between px-6 h-16 bg-green-500 ">
      <img
        onClick={() => {
          props.setOpen(!props.open);
          props.setShowBackdrop(true);
        }}
        src={menu}
        alt="menu"
        className="object-contain h-8 cursor-pointer"
      />
    </div>
  );
};

export default Navbar;
