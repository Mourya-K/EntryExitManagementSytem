import { useContext, useState } from "react";
import DropdownStylized from "../../components/DropdownStylized";
import AddStaff from "./AddStaff";
import AddStudent from "./AddStudent";
import AddSecurity from "./AddSecurity";
import ContinueStaff from "./ContinueStaff";
import BulkAddStudents from "./BulkAddStudents";
import axios from "axios";
import SharingContext from "../../context/SharingContext";

export default function AddEntity() {
  const [Entity, SetEntity] = useState("Select Entity");
  const [staffLevel, setStaffLevel] = useState(null);
  const { APIaddr } = useContext(SharingContext);

  const options = [
    { key: 1, label: "Add Staff" },
    { key: 2, label: "Add Student" },
    { key: 3, label: "Add Security" },
    { key: 4, label: "Bulk Add Students" },
  ];

  const handleStaffSubmit = async (formData) => {
    if (formData.get("warden") && formData.get("swc")) {
      window.alert("A person cannot be a warden and a swc.");
      return;
    }
    const response = await axios.post(`${APIaddr}management/staff/`, formData);
    if (response.data.error) window.alert(response.data.error);
    if (formData.get("swc") === null) {
      setStaffLevel([
        formData.get("warden"),
        formData.get("fa"),
        response.data.id,
      ]);
      SetEntity("staffpg2");
    } else {
      const swcCreate = new FormData();
      swcCreate.append("id", response.data.id);
      swcCreate.append("students", "all");
      swcCreate.append("staff_type", "swc");
      const resp = await axios.post(
        `${APIaddr}add_students_for_outpass/`,
        swcCreate
      );
      if (resp.data.success) SetEntity("Select Entity");
    }
  };

  return (
    <div>
      {Entity === "Select Entity" && (
        <DropdownStylized
          current={Entity}
          setCurrent={SetEntity}
          options={options}
        />
      )}
      {Entity === "Add Staff" && (
        <AddStaff handleStaffSubmit={handleStaffSubmit} />
      )}
      {Entity === "Add Student" && <AddStudent />}
      {Entity === "Add Security" && <AddSecurity />}
      {Entity === "staffpg2" && staffLevel && (
        <ContinueStaff staffLevel={staffLevel} setEntity={SetEntity} />
      )}

      {Entity === "Bulk Add Students" && <BulkAddStudents />}
    </div>
  );
}
