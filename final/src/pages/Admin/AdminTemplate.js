/*
This file generates the Administrator Panel template site(Header, Navbar, Footer). 
*/
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import { useContext } from "react";
import SharingContext from "../../context/SharingContext";
import classNames from "classnames";

import {
  IoHomeOutline,
  IoListOutline,
  IoCloseCircleOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
  IoLogOutOutline,
  IoClipboardOutline,
  IoDocumentTextOutline,
  IoLockClosedOutline,
} from "react-icons/io5";

export default function AdminTemplate() {
  const { show, setAuth } = useContext(SharingContext);

  // Adjust the className for navbar collapse toggle
  const mainClass = classNames("main", {
    active: !show,
  });

  // Explanation of the objects can be found in the Navbar component
  const links = [
    {
      title: "Home",
      to: "home",
      icon: <IoHomeOutline />,
    },
    {
      title: "Add Entity",
      to: "add",
      icon: <IoPersonAddOutline />,
    },
    {
      title: "Manage Entity",
      to: "manage",
      icon: <IoPeopleOutline />,
    },
    {
      title: "Entry Exit Details",
      to: "records",
      icon: <IoClipboardOutline />,
    },
    {
      title: "Unban Requests",
      to: "bans",
      icon: <IoListOutline />,
    },
    {
      title: "Delete History",
      to: "deleteHistory",
      icon: <IoCloseCircleOutline />,
    },
    // {
    //   title: "Delete Batch",
    //   to: "deleteBatch",
    //   icon: <IoTrashOutline />,
    // },
    {
      title: "Outpass",
      to: "outpass",
      icon: <IoDocumentTextOutline />,
    },
    {
      title: "Change Password",
      to: "changePassword",
      icon: <IoLockClosedOutline />,
    },
    {
      title: "Sign Out",
      to: "../logout",
      icon: <IoLogOutOutline />,
      onClick: () => {
        setAuth(false);
      },
    },
  ];

  return (
    <div className="divbody">
      <NavBar links={links} />
      <div className={mainClass}>
        <Header label="Admin Panel" />
        <Outlet />
      </div>
    </div>
  );
}
