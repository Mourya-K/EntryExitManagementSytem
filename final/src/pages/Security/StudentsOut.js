import { useContext, useEffect, useState } from "react";
import SearchableTable from "../../components/SearchableTable";
import SharingContext from "../../context/SharingContext";
import axios from "axios";

export default function StudentsOut() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}list_of_students_out/`);
      setRawData(response.data);
    };
    fetchData();
  }, []);

  const entries = rawData.map((entry) => {
    return [
      entry.name,
      entry.roll_no,
      entry.phone_no,
      entry.exit_time.split("T")[1].split(".")[0],
    ];
  });

  const data = {
    headers: ["Name", "Registration Number", "Phone Number", "Exit Time"],
    title: "Out students details",
    entries: entries,
  };

  return <SearchableTable searchFor={"Registration Number"} data={data} />;
}
