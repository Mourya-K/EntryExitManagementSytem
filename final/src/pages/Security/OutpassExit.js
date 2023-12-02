import axios from "axios";
import Form from "../../components/Form";
import { useContext } from "react";
import SharingContext from "../../context/SharingContext";
import { useNavigate } from "react-router-dom";

export default function OutpassExit({ rollNo, setRollNo }) {
  const { APIaddr } = useContext(SharingContext);
  const navigate = useNavigate();
  const data = {
    Header: "Choose Type of Exit",
    fields: [
      {
        label: "Exiting",
        input: <p>{rollNo}</p>,
      },
      {
        label: "",
        input: (
          <button
            class="nextBtn"
            onClick={async () => {
              const response = await axios.post(
                `${APIaddr}direct_or_outpass/`,
                {
                  roll_no: rollNo,
                  exit_type: "outpass",
                }
              );
              window.alert(response.data.success);
              setRollNo("");
              navigate("../manualEntry");
            }}
          >
            <span class="btnText">Outpass Exit</span>
            <i class="uil uil navigator"></i>
          </button>
        ),
      },
      {
        label: "",
        input: (
          <button
            class="nextBtn"
            onClick={async () => {
              const response = await axios.post(
                `${APIaddr}direct_or_outpass/`,
                {
                  roll_no: rollNo,
                  exit_type: "direct",
                }
              );
              window.alert(response.data.success);
              setRollNo("");
              navigate("../manualEntry");
            }}
          >
            <span class="btnText">Direct Exit</span>
            <i class="uil uil navigator"></i>
          </button>
        ),
      },
      {
        label: "",
        input: (
          <button
            class="nextBtn"
            onClick={async () => {
              setRollNo("");
              navigate("../manualEntry");
            }}
          >
            <span class="btnText">Cancel</span>
            <i class="uil uil navigator"></i>
          </button>
        ),
      },
    ],
  };
  const handleSubmit = () => {};
  return <Form data={data} onSubmit={handleSubmit} />;
}
