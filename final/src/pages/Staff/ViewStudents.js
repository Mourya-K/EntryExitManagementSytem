import { useContext, useEffect, useState } from "react";
import SearchableTable from "../../components/SearchableTable";
import SharingContext from "../../context/SharingContext";
import axios from "axios";

export default function ViewStudents() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);
  const [dummy, setDummy] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}students_under_staff/`);
      setRawData(response.data);
    };
    fetchData();
  }, [dummy]);

  const entries = rawData.map((rowData) => {
    return [
      rowData.name,
      rowData.roll_no,
      rowData.phone_no,
      rowData.emergency_phone_no,
      <div className="btn">
        <button
          className="deleteBtn"
          onClick={async () => {
            const formData = new FormData();
            formData.append("id", rowData.id);
            const response = await axios.post(
              `${APIaddr}students_under_staff/`,
              formData
            );
            if (response.data.success) setDummy(Math.random());
          }}
        >
          Remove
        </button>
      </div>,
    ];
  });

  let data = {
    title: "Manage Students",
    headers: [
      "Name",
      "Registration Number",
      "Contact Number",
      "Emergency Number",
      "Remove Student",
    ],
    entries: entries,
  };

  return <SearchableTable searchFor={"Registration Number"} data={data} />;
}
