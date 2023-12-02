/*
This file holds the code for the Header Element
*/

import { useContext } from "react";
import { IoMenuOutline } from "react-icons/io5";
import SharingContext from "../context/SharingContext";
import "../theme-css/themes";

// label here is for the header title
export default function Header({ label }) {
  const { setShow, show } = useContext(SharingContext);

  // This controls the sidebar collapse state
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="topbar ">
      <div className="toggle " onClick={handleClick}>
        <IoMenuOutline className="menu-outline" />
      </div>
      <div className="heading">{label}</div>
    </div>
  );
}
