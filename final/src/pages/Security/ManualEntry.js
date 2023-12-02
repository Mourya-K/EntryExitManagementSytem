import axios from "axios";
import Form from "../../components/Form";
import { useContext, useState } from "react";
import SharingContext from "../../context/SharingContext";
import OutpassExit from "./OutpassExit";
import Modal from "../../components/Modal";
import FaceEntryNext from "./FaceEntryNext";
import {  useNavigate } from "react-router-dom";

export default function ManualEntry() {
  const { APIaddr } = useContext(SharingContext);
  const [studentData, setStudentData] = useState("");
  const [show, setShow] = useState(false)
  const [content, setContent] = useState("")

  const navigate = useNavigate()

  const data = {
    Header: "Add entry",
    fields: [
      {
        label: "Enter Registration number",
        input: <input type="text" name="roll_no" required />,
      },
      {
        label: "",
        input: (
          <button class="nextBtn">
            <span class="btnText">Make Manual Entry</span>
            <i class="uil uil navigator"></i>
          </button>
        ),
      },
      {
        label: "",
        input: <input type="hidden" name="entry_type" value="manual" />,
      },
    ],
  };

  const handleSubmit = async (formData) => {
    const response = await axios.post(`${APIaddr}direct_entry/`, formData);
    if (response.data.error) setContent(response.data.error);
    else {
      setStudentData(response.data)
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const footer = (
    <div className="btn">
      <button className="deleteBtn" onClick={handleClose}>
        Close
      </button>
    </div>
  );

  return (
    <>
      {!studentData.name && <Form data={data} onSubmit={handleSubmit} />}
      {studentData.name && (
        <FaceEntryNext record={studentData} setData={setStudentData} type="manual"/>
      )}
      {show && (
        <Modal onClose={handleClose} footer={footer}>
          {content}
        </Modal>
      )}
    </>
  );
}
