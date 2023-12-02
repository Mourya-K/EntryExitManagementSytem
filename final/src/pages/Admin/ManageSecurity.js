import { useContext, useEffect, useState } from "react";
import SearchableTable from "../../components/SearchableTable";
import SharingContext from "../../context/SharingContext";
import axios from "axios";

export default function ManageSecurity() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);
  const [dummy, setDummy] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}manage_security/`);
      setRawData(response.data);
    };
    fetchData();
  }, [dummy]);

  const entries = rawData.map((rowData) => {
    return [
      rowData.id,
      rowData.name,
      rowData.phone_no,
      <div className="btn">
        <button
          onClick={async () => {
            const formData = new FormData();
            formData.append("id", rowData.id);
            await axios.post(`${APIaddr}delete_security/`, formData);
            setDummy(Math.random());
          }}
          className="deleteBtn"
        >
          Delete
        </button>
      </div>,
    ];
  });

  let data = {
    title: "Manage Security",
    headers: ["Security ID", "Name", "Contact Number", "Delete Security"],
    entries: entries,
  };

  return <SearchableTable searchFor={"Registration Number"} data={data} />;
}
