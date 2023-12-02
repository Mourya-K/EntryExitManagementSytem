import { useContext, useEffect, useState } from "react";
import SharingContext from "../../context/SharingContext";
import axios from "axios";
import SearchableTable from "../../components/SearchableTable";

export default function AddStudent() {
  const { APIaddr } = useContext(SharingContext);
  const [studentList, setStudentList] = useState([]);
  const [dummy, setDummy] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get(`${APIaddr}add_students_for_outpass/`);
      setStudentList(response.data);
    };
    fetchStudents();
  }, [dummy]);

  const entries = studentList.map((student) => {
    return [
      student.name,
      student.roll_no,
      student.phone_no,
      <input type="checkbox" name="students" value={student.id} />,
    ];
  });

  let data = {
    headers: ["Name", "Registration Number", "Phone Number", "Add"],
    title: "Add Students under me",
    entries: entries,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await axios.post(
      `${APIaddr}add_students_for_outpass/`,
      formData
    );
    if (response.data.success) setDummy("");
    else window.alert(response.data.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchableTable data={data} searchFor={"Registration Number"} />
      <div className="btn">
        <button type="submit" className="nextBtn">
          Submit
        </button>
      </div>
    </form>
  );
}
