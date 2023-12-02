import axios from "axios";
import Form from "../../components/Form";
import { useContext, useState } from "react";
import SharingContext from "../../context/SharingContext";
import Modal from "../../components/Modal";

export default function Apply() {
  const { APIaddr } = useContext(SharingContext);
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");

  const data = {
    Header: "Apply for Outpass",
    Title: "",
    fields: [
      {
        label: "Date of Leaving",
        input: (
          <input
            type="date"
            placeholder="Enter date of Leaving"
            name="from_date"
            required
          />
        ),
      },
      {
        label: "Date of Return",
        input: (
          <input
            type="date"
            placeholder="Enter date of Return"
            name="to_date"
            required
          />
        ),
      },
      {
        label: "Reason",
        input: <textarea type="text" name="reason" required />,
      },
      {
        label: "Attach document",
        input: <input type="file" name="attachment" accept="image/*" />,
      },
      {
        label: "Declaration",
        input: (
          <div>
            <input type="checkbox" name="declaration" required />
            <span>
              I hereby declare that I am leaving the campus on my own and I am
              fully responsible for my actions.
            </span>
          </div>
        ),
      },
      {
        label: "",
        input: (
          <button class="nextBtn">
            <span class="btnText">Submit Request</span>
            <i class="uil uil navigator"></i>
          </button>
        ),
      },
    ],
  };

  const handleSubmit = async (params) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const frm = new Date(params.get("from_date"));
    const to = new Date(params.get("to_date"));
    console.log(today);
    console.log(frm);
    if (frm <= to && frm >= today) {
      const response = await axios.post(`${APIaddr}apply_outpass/`, params);
      if (response.data.success) setContent(response.data.success);
      else if (response.data.error) setContent(response.data.error);
    } else {
      if (frm < today) setContent("From date is before today!");
      else setContent("From date is after To date");
    }
    setShow(true);
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
      <Form data={data} onSubmit={handleSubmit} />
      {show && (
        <Modal onClose={handleClose} footer={footer}>
          {content}
        </Modal>
      )}
    </>
  );
}
