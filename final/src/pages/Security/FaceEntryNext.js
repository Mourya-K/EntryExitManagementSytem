import axios from "axios";
import Form from "../../components/Form";
import { useContext, useEffect, useState } from "react";
import SharingContext from "../../context/SharingContext";
import { useNavigate } from "react-router-dom";
import OutpassExit from "./OutpassExit";

export default function FaceEntryNext({ record, setData, type }) {
  const { APIaddr } = useContext(SharingContext);
  const [rollNo, setRollNo] = useState("");
  const navigate = useNavigate();
  const data = {
    Header: "Confirm student",
    fields: [
      {
        label: "Name",
        input: <p>{record.name}</p>,
      },
      {
        label: "Registration Number",
        input: <p>{record.roll_no}</p>,
      },
      {
        label:"",
        input: <div className="studentpic">
          <img className = "pic1" src={`${APIaddr}` + record.profile_pic} style={{height:"480px", width:"640px"}}/>
          <img className = "pic2" src={`${APIaddr}` + record.image} style={{height:"480px", width:"640px"}} alt="Failed to load image"/>
        </div>
      },
      {
        label: "",
        input: (
          <button
            class="nextBtn"
            onClick={async () => {
              const formData = new FormData();
              formData.append("roll_no", record.roll_no);
              formData.append("entry_type", "face_accept");
              const response = await axios.post(
                `${APIaddr}direct_entry/`,
                formData
              );
              if (response.data.success) {
                window.alert(response.data.success)
                navigate("../profile")
              } else if (response.data.error) window.alert(response.data.error);
              if (response.data.outpass) setRollNo(record.roll_no);
            }}
          >
            <span class="btnText">Confirm Student</span>
          </button>
        ),
      },
      {
        label: "",
        input: (
          <button class="nextBtn" onClick={() => navigate("../profile")}>
            <span class="btnText">Cancel</span>
          </button>
        ),
      },
    ],
  };

  const handleSubmit = () => {};

  return (
    <>
      {!rollNo && <Form data={data} onSubmit={handleSubmit} />}
      {rollNo && <OutpassExit rollNo={rollNo} setRollNo={setRollNo} />}
    </>
  );
}
