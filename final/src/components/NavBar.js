/*
This file holds all the code to generate Navbar based on the links passed.
*/

import { useContext } from "react";
import { NavLink } from "react-router-dom";
import className from "classnames";
import SharingContext from "../context/SharingContext";
// import logo from "../images/collegeLogo.png";
import logo1 from "../images/logon.png";

// Need to add active and pending class colours in css

export default function NavBar({ links }) {
    const { show, isMobile, setShow } = useContext(SharingContext);

    // Adjust the className based on navbar collapse state
    const navclass = className("navigation", {
        active: !show,
    });

    // Render links based on the prop passed
    // Title is the label displayed to the user
    // Icon is the Icon rendered to the user
    // to is the path to navigate to
    const renderedLinks = links.map((link) => {
            if (!link) return;
            return ( <
                li key = { link.title } >
                <
                NavLink to = { link.to }
                className = {!link.disableActive ?
                    "" :
                        ({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                }
                onClick = {
                    () => {
                        if (isMobile) setShow(false);
                        link.handleClick();
                    }
                } >
                <
                span className = "icon" > { link.icon } < /span>{" "} {
                    (show || isMobile) && < span className = "title" > { link.title } < /span>}{" "} <
                        /NavLink>{" "} <
                        /li>
                );
            });

        return ( <
            div className = { navclass } >
            <
            ul >
            <
            li >
            <
            NavLink >
            <
            div className = "title logo" > { " " } { /* <span>S</span> */ } { /* {show && "ilhouette"}{" "} */ } { " " } { /* Display the stylised S when collapsed */ } { " " } <
            img src = { logo1 }
            className = "nav-logo"
            alt = "IIIT DWD Logo"
            // style="marginRight:'100em';"
            /
            >
            <
            /div>{" "} <
            /NavLink>{" "} <
            div className = "nav-toggler" >
            <
            span > < /span>{" "} <
            /div>{" "} <
            /li>{" "} { renderedLinks } { " " } <
            /ul>{" "} <
            /div>
        );
    }