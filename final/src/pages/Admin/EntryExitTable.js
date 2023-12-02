import { useContext, useEffect, useState } from "react";
import SearchableTable from "../../components/SearchableTable";
import SharingContext from "../../context/SharingContext";
import axios from "axios";

export default function EntryExitTable() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}entry_exit_details/`);
      console.log(response.data);
      setRawData(response.data.entry_exit);
    };
    fetchData();
  }, []);

  const entries = rawData.map((rowData) => {
    return [
      rowData.name,
      rowData.roll_no,
      rowData.exit_time.split("T")[0],
      rowData.exit_time.split("T")[1].split(".")[0],
      rowData.entry_time ? rowData.entry_time.split("T")[0] : "Not entered",
      rowData.entry_time
        ? rowData.entry_time.split("T")[1].split(".")[0]
        : "Not entered",
    ];
  });

  let data = {
    title: "Entry Exit Information",
    headers: [
      "Name",
      "Registration Number",
      "Exit Date",
      "Time of Exit",
      "Entry Date",
      "Time of Entry",
    ],
    entries: entries,
  };

  return <SearchableTable data={data} searchFor={"Registration Number"} />;
}
