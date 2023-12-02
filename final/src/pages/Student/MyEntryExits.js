import { useContext } from "react";
import SharingContext from "../../context/SharingContext";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Table from "../../components/Table";

export default function MyEntryExits() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}my_entry_exit/`);
      setRawData(response.data);
    };
    fetchData();
  }, []);

  const entries = rawData.map((rowData) => {
    return [
      rowData.id,
      rowData.exit_time.split("T")[0],
      rowData.exit_time.split("T")[1].split(".")[0],
      rowData.entry_time ? rowData.entry_time.split("T")[0] : "Not Entered",
      rowData.entry_time
        ? rowData.entry_time.split("T")[1].split(".")[0]
        : "Not Entered",
    ];
  });

  const data = {
    title: "My Entry Exit Details",
    headers: ["ID", "Exit Date", "Exit Time", "Entry Date", "Entry Time"],
    entries: entries,
  };

  return <Table data={data} />;
}
