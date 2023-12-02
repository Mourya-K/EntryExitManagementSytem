import { useContext, useEffect, useState } from "react";
import SharingContext from "../../context/SharingContext";
import axios from "axios";
import SearchableTable from "../../components/SearchableTable";

export default function ApprovedOutpasses() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);
  const [dummy, setDummy] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await axios.get(`${APIaddr}outpasses_approved/`);
      setRawData(response.data);
    };
    fetchRecords();
  }, [dummy]);

  const entries = rawData.map((record) => {
    return [
      record.name,
      record.roll_no,
      record.phone_no,
      record.From,
      record.To,
      record.Reason,
      <div className="btn">
        <button
          onClick={async () => {
            const formData = new FormData();
            formData.append("id", record.id);
            const response = await axios.post(
              `${APIaddr}outpasses_approved/`,
              formData
            );
            if (response.data.success) setDummy(Math.random());
          }}
          className="deleteBtn"
        >
          Cancel Outpass
        </button>
      </div>,
    ];
  });

  const data = {
    headers: [
      "Name",
      "Registration Number",
      "Phone Number",
      "From Date",
      "To Date",
      "Reason",
      "Cancel Outpass",
    ],
    title: "View/Cancel Approved Outpasses",
    entries: entries,
  };

  return <SearchableTable searchFor={"Registration Number"} data={data} />;
}
