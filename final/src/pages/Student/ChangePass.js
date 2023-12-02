import axios from "axios";
import Form from "../../components/Form";
import Cookies from "js-cookie";
import { useContext } from "react";
import SharingContext from "../../context/SharingContext";

export default function ChangePassword() {
  const { APIaddr } = useContext(SharingContext);

  const data = {
    Header: "Change Password",
    fields: [
      {
        label: "Old Password",
        input: <input type="password" name="old_password" required />,
      },
      {
        label: "New Password",
        input: (
          <input
            type="password"
            name="new_password"
            required
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}"
            title="Password must be at least 8 characters long with at least one lowercase letter, one uppercase letter, one number, and one special character."
          />
        ),
      },
      {
        label: "Re-enter New Password",
        input: <input type="password" name="rePass" required />,
      },
      {
        label: "",
        input: (
          <button class="nextBtn">
            <span class="btnText">Submit</span>
            <i class="uil uil navigator"></i>
          </button>
        ),
      },
    ],
  };

  const handleSubmit = (params) => {
    if (params.get("new_password") === params.get("rePass")) {
      const postData = async () => {
        const response = await axios.post(
          `${APIaddr}change_password/`,
          params,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-CSRFToken": Cookies.get("csrftoken"),
            },
          }
        );
        console.log(response.data);
      };
      postData();
    } else {
      window.alert("New Password does not match the reentered password");
    }
  };

  return <Form data={data} onSubmit={handleSubmit} />;
}
