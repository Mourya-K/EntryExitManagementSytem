import { useContext, useEffect, useState } from "react";
import Form from "../../components/Form";
import Table from "../../components/Table";
import SharingContext from "../../context/SharingContext";
import axios from "axios";

export default function ContinueStaff({ staffLevel, setEntity }) {
  const { APIaddr } = useContext(SharingContext);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get(`${APIaddr}add_students_for_outpass/`);
      if (response.data.error) fetchStudents();
      else setStudentList(response.data);
    };
    if (staffLevel[1] && !staffLevel[0]) fetchStudents();
  }, []);

  const wardenField = staffLevel[0] === "warden" && {
    label: "Add students under warden",
    input: (
      <div>
        <span>Boys</span>
        <input type="radio" name="students" value="male" />
        <br />
        <span>Girls</span>
        <input type="radio" name="students" value="female" />
        <br />
        <span>Add All Students</span>
        <input type="radio" name="students" value="all" />
        <input type="hidden" name="staff_type" value="warden" />
      </div>
    ),
  };

  const entries = studentList.map((student) => {
    return [
      student.name,
      student.roll_no,
      student.phone_no,
      <input type="checkbox" name="students" value={student.id} />,
    ];
  });

  const faData = {
    title: "Add students under the created Faculty Advisor",
    headers: ["Name", "Registration Number", "Batch", "Select"],
    entries: entries,
  };

  const faField = staffLevel[1] &&
    !staffLevel[0] && {
      label: "",
      input: (
        <div>
          <Table searchFor="Registration Number" data={faData} />
          <input type="hidden" name="staff_type" value="fa" />
        </div>
      ),
    };

  const data = {
    Header: "Fill further details",
    fields: [
      wardenField,
      faField,
      {
        label: "",
        input: (
          <button className="nextBtn">
            <span className="btnText">Create Staff</span>
          </button>
        ),
      },
    ],
  };

  const handleSubmit = async (formData) => {
    formData.append("id", staffLevel[2]);

    const response = await axios.post(
      `${APIaddr}add_students_for_outpass/`,
      formData
    );
    if (response.data.success) setEntity("Select Entity");
  };

  return <Form data={data} onSubmit={handleSubmit} />;
}
