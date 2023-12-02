import { useContext, useEffect, useState } from "react";
import SharingContext from "../../context/SharingContext";
import axios from "axios";
import SearchableTable from "../../components/SearchableTable";

export default function OutpassOut() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}outpass_students_out/`);
      setRawData(response.data);
    };
    fetchData();
  }, []);

  const entries = rawData.map((record) => {
    return [
      record.name,
      record.roll_no,
      record.exit_time.split("T")[0],
      record.exit_time.split("T")[1].split(".")[0],
      record.phone_no,
    ];
  });

  const data = {
    headers: [
      "Name",
      "Registration Number",
      "Exit Date",
      "Exit Time",
      "Phone Number",
    ],
    title: "View Students out on Outpass",
    entries: entries,
  };

  return <SearchableTable searchFor={"Registration Number"} data={data} />;
}
