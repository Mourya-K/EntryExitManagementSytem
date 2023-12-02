import { useContext, useEffect, useState } from "react";
import SharingContext from "../../context/SharingContext";
import axios from "axios";
import SearchableTable from "../../components/SearchableTable";
import Form from "../../components/Form";
import Modal from "../../components/Modal";

export default function ApproveOutpass() {
  const { APIaddr } = useContext(SharingContext);
  const [records, setRecords] = useState([]);
  const [dummy, setDummy] = useState(0);
  const [showModal, setShow] = useState(false);
  const [dat, setDat] = useState({});

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await axios.get(`${APIaddr}outpass_requests/`);
      setRecords(response.data);
    };
    fetchRecords();
  }, [dummy]);
  const entries = records.map((record) => {
    let frm = new Date(record.From);
    let to = new Date(record.To);
    let duration = (to - frm) / 86400000;
    // record[duration] = duration.toString().concat(" days");
    record = { ...record, duration: duration.toString().concat(" days") };
    return [
      record.name,
      record.roll_no,
      record.phone_no,
      record.From,
      record.To,
      record.duration,
      record.Reason,
      <div className="btn">
        <button
          onClick={async () => {
            const response = await axios.post(`${APIaddr}outpass_requests/`, {
              id: record.id,
              status: "Approve",
            });
            if (response.data.success) window.alert(response.data.success);
            else window.alert(response.data.error);
            setDummy(Math.random());
          }}
          className="approveBtn"
        >
          APPROVE
        </button>
      </div>,
      <div className="btn">
        <button
          onClick={() => {
            setDat(record);
            setShow(true);
          }}
          className="deleteBtn"
        >
          REJECT
        </button>
      </div>,
    ];
  });

  const data = {
    title: "Approve Student Outpass",
    headers: [
      "Name",
      "Registration Number",
      "Phone Number",
      "From Date",
      "To Date",
      "Duration of Outpass",
      "Reason",
      "Approve",
      "Reject",
    ],
    entries: entries,
  };

  const closeModal = () => {
    setShow(false);
  };

  const footer = (
    <div className="btn">
      <button onClick={closeModal}>Cancel</button>
    </div>
  );

  const handleSubmit = async (formData) => {
    const response = await axios.post(`${APIaddr}outpass_requests/`, formData);
    closeModal();
    setDummy(Math.random());
  };

  const rejectionForm = {
    Header: `Rejecting ${dat.name} Outpass`,
    fields: [
      {
        label: "",
        input: <input value={dat.id} name="id" type="hidden" />,
      },
      {
        label: "",
        input: <input value="Reject" name="status" type="hidden" />,
      },
      {
        label: "Name",
        input: <input value={dat.name} disabled />,
      },
      {
        label: "Registration Number",
        input: <input value={dat.roll_no} disabled />,
      },
      {
        label: "Contact Number",
        input: <input value={dat.phone_no} disabled />,
      },
      {
        label: "Leaving on",
        input: <input value={dat.From} type="date" disabled />,
      },
      {
        label: "Returning on",
        input: <input value={dat.To} type="date" disabled />,
      },
      {
        label: "Duration of absence",
        input: <input value={dat.duration} type="text" disabled />,
      },
      {
        label: "Reason for application",
        input: <input value={dat.Reason} disabled />,
      },
      {
        label: "Remarks",
        input: <textarea name="remarks" />,
      },
      {
        label: "",
        input: (
          <div className="btn">
            <button type="submit" className="deleteBtn">
              Reject Outpass
            </button>
          </div>
        ),
      },
    ],
  };

  return (
    <>
      <SearchableTable data={data} searchFor={"Registration Number"} />
      {showModal && (
        <Modal onClose={closeModal} footer={footer}>
          <Form data={rejectionForm} onSubmit={handleSubmit} />
        </Modal>
      )}
    </>
  );
}
