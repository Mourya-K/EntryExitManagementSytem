import axios from "axios";
import { useContext, useEffect } from "react";
import SharingContext from "../context/SharingContext";

export default function () {
  const { setAuth, setCurRole, APIaddr } = useContext(SharingContext);
  useEffect(() => {
    const deleteToken = async () => {
      axios.post(`${APIaddr}logout/`);
    };
    deleteToken();
  }, []);
  axios.defaults.baseURL = undefined;
  axios.defaults.headers.common["Authorization"] = undefined;
  setAuth(false);
  setCurRole("");
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  if (localStorage.getItem("admin")) localStorage.removeItem("admin");
  if (localStorage.getItem("security")) localStorage.removeItem("security");
  if (localStorage.getItem("staff")) localStorage.removeItem("staff");
  if (localStorage.getItem("student")) localStorage.removeItem("student");
  if (localStorage.getItem("curr_role")) localStorage.removeItem("curr_role");

  window.location.replace("../login");
  return <div></div>;
}
