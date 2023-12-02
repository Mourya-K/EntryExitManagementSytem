import { useContext, useEffect, useState } from "react";
import SearchableTable from "../../components/SearchableTable";
import SharingContext from "../../context/SharingContext";
import axios from "axios";
import CSRFToken from "../../components/CSRFToken";

export default function BansTable() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);
  const [dummy, setDummy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}unban_requests/`);
      setRawData(response.data.students);
    };
    fetchData();
  }, [dummy]);

  const entries = rawData.map((rowData) => {
    return [
      rowData.name,
      rowData.roll_no,
      rowData.reason,
      <div className="btn">
        <button
          onClick={async () => {
            const response = await axios.post(`${APIaddr}unban_requests/`, {
              roll_no: rowData.roll_no,
            });
            if (response.data.success) setDummy(Math.random);
            else window.alert(response.data.error);
          }}
          className="approveBtn"
        >
          UNBAN
        </button>
      </div>,
    ];
  });

  const data = {
    title: "Student Ban Records",
    headers: [
      "Name",
      "Registration Number",
      // "Reason",
      "Justification",
      "Unban Student",
    ],
    entries: entries,
  };
  return (
    <>
      <SearchableTable data={data} searchFor={"Registration Number"} />
    </>
  );
}
