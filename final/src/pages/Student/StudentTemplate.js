/*
This file generates the Student Panel template site(Header, Navbar, Footer). 
*/
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import { useContext } from "react";
import SharingContext from "../../context/SharingContext";
import classNames from "classnames";
import {
    IoHomeOutline,
    IoBanOutline,
    IoLockClosedOutline,
    IoClipboardOutline,
    IoLogOutOutline,
    IoCheckmarkCircleOutline,
    IoListOutline,
} from "react-icons/io5";

export default function StudentTemplate() {
    const { show, setAuth } = useContext(SharingContext);
    const navigate = useNavigate();

    // Adjust the className for navbar collapse toggle
    const mainClass = classNames("main", {
        active: !show,
    });

    // Explanation of the objects can be found in the Navbar component
    const links = [{
            title: "Home",
            to: "home",
            icon: < IoHomeOutline / > ,
        },
        {
            title: "My Entry Exit Details",
            to: "entryexit",
            icon: < IoListOutline / > ,
        },
        {
            title: "Apply for Outpass",
            to: "outpass",
            icon: < IoClipboardOutline / > ,
        },
        {
            title: "Check Outpass status",
            to: "checkOutpass",
            icon: < IoCheckmarkCircleOutline / > ,
        },
        {
            title: "Appeal Ban",
            to: "appeal",
            icon: < IoBanOutline / > ,
        },
        {
            title: "Change Password",
            to: "changePassword",
            icon: < IoLockClosedOutline / > ,
        },
        {
            title: "Sign Out",
            to: "../logout",
            icon: < IoLogOutOutline / > ,
            onClick: () => {
                setAuth(false);
                navigate("../login");
            },
        },
    ];

    return ( <
        div className = "divbody" >
        <
        div className = "container" >
        <
        NavBar links = { links }
        /> <
        div className = { mainClass } >
        <
        Header label = "Student Panel" / >
        <
        Outlet / >
        <
        /div> <
        /div> <
        /div>
    );
}