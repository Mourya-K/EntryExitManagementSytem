import { useContext } from "react";
import Form from "../../components/Form";
import SharingContext from "../../context/SharingContext";
import axios from "axios";
import Cookies from "js-cookie";

export default function DeleteHistory() {
  const { APIaddr } = useContext(SharingContext);

  const data = {
    Header: "Delete History",
    fields: [
      {
        label: "Select From Date",
        input: <input type="date" name="from_date" required />,
      },
      {
        label: "Select To Date",
        input: <input type="date" name="to_date" required />,
      },
      {
        label: "Enter Password",
        input: <input type="password" name="password" required />,
      },
      {
        label: "",
        input: (
          <div className="btn">
            <button className="deleteBtn">
              <span>Delete</span>
            </button>
          </div>
        ),
      },
    ],
  };

  const handleSubmit = async (params) => {
    const frm = new Date(params.get("from_date"));
    const to = new Date(params.get("to_date"));
    if (frm <= to) {
      const response = await axios.post(`${APIaddr}delete_history/`, params, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      console.log(response);
    } else window.alert("From date is later than to date");
  };

  return <Form data={data} onSubmit={handleSubmit} />;
}
