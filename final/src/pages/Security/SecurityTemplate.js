/*
This file generates the Administrator Panel template site(Header, Navbar, Footer). 
*/
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import { useContext } from "react";
import SharingContext from "../../context/SharingContext";
import classNames from "classnames";
import {
  IoPersonOutline,
  IoListOutline,
  IoLogOutOutline,
  IoCameraOutline,
  IoPaperPlaneOutline,
} from "react-icons/io5";

export default function SecurityTemplate() {
  const { show, setAuth } = useContext(SharingContext);
  const navigate = useNavigate();

  // Adjust the className for navbar collapse toggle
  const mainClass = classNames("main", {
    active: !show,
  });

  // Explanation of the objects can be found in the Navbar component
  const links = [
    {
      title: "Face Entry ",
      to: "faceEntry",
      icon: <IoCameraOutline />,
    },
    {
      title: "Manual Entry",
      to: "manualEntry",
      icon: <IoListOutline />,
    },
    {
      title: "Students Out",
      to: "outStudents",
      icon: <IoPaperPlaneOutline />,
    },
    {
      title: "Profile ",
      to: "profile",
      icon: <IoPersonOutline />,
    },
    {
      title: "Logout ",
      to: "../logout",
      icon: <IoLogOutOutline />,
      onClick: () => {
        setAuth(false);
        navigate("../login");
      },
    },
  ];

  return (
    <div className="divbody dark">
      <NavBar links={links} />
      <div className={mainClass}>
        <Header label="Security Panel" />
        <Outlet />
      </div>
    </div>
  );
}
