/*
This file holds the routing information for the login page
*/
import { Route, Routes } from "react-router-dom";
import Error from "../pages/Error";
import LoginForm from "../pages/LoginForm";
import Logout from "../pages/Logout";

export default function LoginRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route path="login" element={<LoginForm />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Routes>
  );
}
