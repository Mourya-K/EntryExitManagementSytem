import { useContext } from "react";
import Form from "../../components/Form";
import SharingContext from "../../context/SharingContext";
import axios from "axios";

export default function AddSecurity() {
  const { APIaddr } = useContext(SharingContext);

  const data = {
    Header: "Add Security",
    fields: [
      {
        label: "Name",
        input: (
          <input type="text" placeholder="Enter Name" name="name" required />
        ),
      },
      {
        label: "Email",
        input: (
          <input type="email" placeholder="Enter email" name="email" required />
        ),
      },
      {
        label: "Contact Number",
        input: (
          <input
            type="text"
            placeholder="Enter Contact Number"
            name="phone_no"
            required
          />
        ),
      },
      {
        label: "Profile Picture",
        input: (
          <input
            type="file"
            accept=".jpg, .jpeg"
            placeholder="Select Photo"
            name="profile_pic"
          />
        ),
      },
      // {
      //   label: "Security Head",
      //   input: <input type="checkbox" name=/>,
      // },
      {
        label: "Password",
        input: (
          <input
            type="password"
            placeholder="Create New Password"
            name="password"
            required
          />
        ),
      },
      {
        label: "",
        input: (
          <button className="nextBtn">
            <span className="btnText">Create Security</span>
            <i className="uil uil navigator"></i>
          </button>
        ),
      },
    ],
  };

  const handleSubmit = async (formData) => {
    const response = await axios.post(
      `${APIaddr}management/security/`,
      formData
    );
    if (response.data.user_id) console.log("Successfully created user");
    else window.alert(response.data.error);
  };

  return <Form data={data} onSubmit={handleSubmit} />;
}
