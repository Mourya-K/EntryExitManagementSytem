import axios from "axios";
import { useContext } from "react";
import SharingContext from "../../context/SharingContext";
import Form from "../../components/Form";

export default function BulkAddStudents() {
  const { APIaddr } = useContext(SharingContext);

  const data = {
    Header: "Add Students in Bulk",
    fields: [
      {
        label: "Upload CSV File of students",
        input: <input type="file" accept=".csv, .xlsx" name="file" required />,
      },
      {
        label: "",
        input: <button className="nextBtn">Submit</button>,
      },
    ],
  };

  const handleSubmit = async (formData) => {
    const response = await axios.post(
      `${APIaddr}bulk_student_registration/`,
      formData
    );
    if (response.data.success) window.alert(response.data.success);
    else window.alert(response.data.error);
  };

  return <Form data={data} onSubmit={handleSubmit} />;
}
