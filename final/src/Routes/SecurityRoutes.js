/*
This file holds the routing information for the admin pages
*/
import { Route, Routes } from "react-router-dom";
import Error from "../pages/Error";
import SecurityTemplate from "../pages/Security/SecurityTemplate";
import SecurityProfile from "../pages/Security/SecurityProfile";
import ManualEntry from "../pages/Security/ManualEntry";
import StudentsOut from "../pages/Security/StudentsOut";
import FaceEntry from "../pages/Security/FaceEntry";

export default function SecurityRoutes() {
  return (
    <Routes>
      <Route path="/security" element={<SecurityTemplate />}>
        <Route path="profile" element={<SecurityProfile />} />
        <Route path="faceEntry" element={<FaceEntry />} />
        <Route path="manualEntry" element={<ManualEntry />} />
        <Route path="outStudents" element={<StudentsOut />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
