import { useEffect, useState } from "react";
import Table from "./Table";

export default function SearchableTable({ data, searchFor }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [index, setIndex] = useState(null);
  let newData = { headers: data.headers, title: data.title, entries: [] };

  useEffect(() => {
    setIndex(data.headers.indexOf(searchFor));
  }, []);

  if (searchTerm !== "") {
    if (index !== -1) {
      for (let i = 0; i < data.entries.length; i++) {
        if (data.entries[i][index].includes(searchTerm.toUpperCase())) {
          newData.entries.push(data.entries[i]);
        }
      }
    }
  } else {
    newData.entries = data.entries;
  }

  return (
    <Table
      data={newData}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchFor={searchFor}
    />
  );
}
