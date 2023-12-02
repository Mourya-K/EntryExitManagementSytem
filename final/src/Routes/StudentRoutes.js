/*
This file holds the routing information for the student pages
*/
import { Route, Routes } from "react-router-dom";
import Error from "../pages/Error";
import StudentTemplate from "../pages/Student/StudentTemplate";
import Appeal from "../pages/Student/Appeal";
import Apply from "../pages/Student/Apply";
import ChangePassword from "../pages/Student/ChangePass";
import StudentProfile from "../pages/Student/StudentProfile";
import CheckOutpass from "../pages/Student/CheckOutpass";
import MyEntryExits from "../pages/Student/MyEntryExits";

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/student" element={<StudentTemplate />}>
        <Route path="home" element={<StudentProfile />} />
        <Route path="outpass" element={<Apply />} />
        <Route path="appeal" element={<Appeal />} />
        <Route path="checkOutpass" element={<CheckOutpass />} />
        <Route path="entryexit" element={<MyEntryExits />} />
        <Route path="changePassword" element={<ChangePassword />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
