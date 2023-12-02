import { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";
import SharingContext from "../../context/SharingContext";

export default function OutpassHistory() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}outpass_exits/`);
      setRawData(response.data);
    };
    fetchData();
  }, []);

  const entries = rawData.map((rowData) => {
    return [
      rowData.name,
      rowData.roll_no,
      rowData.exit_time.split("T")[0],
      rowData.exit_time.split("T")[1].split(".")[0],
    ];
  });

  let data = {
    title: "Entry Exit Information",
    headers: ["Name", "Registration Number", "Exit Date", "Time of Exit"],
    entries: entries,
  };

  return <Table data={data} />;
}
