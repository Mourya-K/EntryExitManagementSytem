import { useState } from "react";
import DropdownStylized from "../../components/DropdownStylized";
import { useNavigate } from "react-router-dom";

export default function AddEntity() {
  const [Entity, SetEntity] = useState("Select Entity");
  const navigate = useNavigate();
  const options = [
    { key: 1, label: "Manage Staff" },
    { key: 2, label: "Manage Student" },
    { key: 3, label: "Manage Security" },
  ];

  if (Entity === "Manage Staff") navigate("staff");
  if (Entity === "Manage Student") navigate("student");
  if (Entity === "Manage Security") navigate("security");

  return (
    <div>
      <DropdownStylized
        current={Entity}
        setCurrent={SetEntity}
        options={options}
      />
    </div>
  );
}
