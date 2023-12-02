import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import SharingContext from "../../context/SharingContext";
import { useState } from "react";
import Table from "../../components/Table";

export default function CheckOutpass() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);
  const [dummy, setDummy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}outpass_status/`);
      setRawData(response.data);
    };
    fetchData();
  }, [dummy]);

  const entries = rawData.map((rowData) => {
    return [
      rowData.id,
      rowData.From,
      rowData.To,
      rowData.Reason,
      rowData.faculty_approval ? "Approved" : "",
      rowData.warden_approval ? "Approved" : "",
      rowData.swc_approval ? "Approved" : "",
      rowData.approved ? "Approved" : "",
      <div className="btn">
        <button
          onClick={async () => {
            axios.post(`${APIaddr}outpass_status/`, { id: rowData.id });
            setDummy(Math.random());
          }}
          className="deleteBtn"
        >
          Delete Request
        </button>
      </div>,
    ];
  });

  const data = {
    title: "Check Outpass requests",
    headers: [
      "Outpass ID",
      "From",
      "To",
      "Reason",
      "FA Approval",
      "Warden Approval",
      "SWC Approval",
      "Approved",
      "Delete",
    ],
    entries: entries,
  };

  return <Table data={data} />;
}
