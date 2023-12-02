/*
This file holds the routing information for the admin pages
*/
import { Route, Routes } from "react-router-dom";
import Error from "../pages/Error";
import StaffTemplate from "../pages/Staff/StaffTemplate";
import StaffProfile from "../pages/Staff/StaffProfile";
import ApproveOutpass from "../pages/Staff/ApproveOutpass";
import ChangePassword from "../pages/Staff/ChangePass";
import ApprovedOutpasses from "../pages/Staff/ApprovedOutpasses";
import OutpassOut from "../pages/Staff/OutpassOut";
import ViewStudents from "../pages/Staff/ViewStudents";
import AddStudent from "../pages/Staff/AddStudent";

export default function StaffRoutes() {
  return (
    <Routes>
      <Route path="/staff" element={<StaffTemplate />}>
        <Route path="home" element={<StaffProfile />} />
        <Route path="approve" element={<ApproveOutpass />} />
        <Route path="viewApprovedOutpasses" element={<ApprovedOutpasses />} />
        <Route path="viewStudentsOut" element={<OutpassOut />} />
        <Route path="viewStudents" element={<ViewStudents />} />
        <Route path="addStudents" element={<AddStudent />} />
        <Route path="changePassword" element={<ChangePassword />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
