/*
This file generates the Administrator Panel template site(Header, Navbar, Footer). 
*/
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import SharingContext from "../context/SharingContext";
import classNames from "classnames";
import ThemeSelector from "../components/ThemeSelector";

export default function LoginTemplate() {
  const { show, dark, setAuth } = useContext(SharingContext);
  const navigate = useNavigate();

  // Adjust the className for navbar collapse toggle
  const mainClass = classNames("main", {
    active: !show,
  });

  // Adjust the className to toggle Dark mode
  const bodyClass = classNames("divbody", {
    dark: dark,
  });

  // Explanation of the objects can be found in the Navbar component
  const links = [];

  return (
    <div className={bodyClass}>
      <NavBar links={links} />
      <div className={mainClass}>
        <Header label="Login" />
        <Outlet />
        <ThemeSelector />
        <Footer />
      </div>
    </div>
  );
}
