import { useContext } from "react";
import Form from "../../components/Form";
import SharingContext from "../../context/SharingContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const { APIaddr } = useContext(SharingContext);
  const navigate = useNavigate();
  const formData = {
    Header: "Add Student",
    fields: [
      {
        label: "Name",
        input: <input type="text" name="name" required />,
      },
      {
        label: "Registration Number",
        input: <input type="text" name="roll_no" required />,
      },
      {
        label: "Father's name",
        input: <input type="text" name="father" required />,
      },
      {
        label: "Contact Number",
        input: <input type="text" name="phone_no" required />,
      },
      {
        label: "Emergency Contact Number",
        input: <input type="text" name="emergency_phone_no" required />,
      },
      {
        label: "Gender",
        input: (
          <div className="gender-details">
            <input type="radio" name="gender" id="dot-1" value="male" />
            <input type="radio" name="gender" id="dot-2" value="female" />
            <div className="category">
              <label htmlFor="dot-1">
                <span className="dot one"></span>
                <span className="gender">Male</span>
              </label>
              <label htmlFor="dot-2">
                <span className="dot two"></span>
                <span className="gender">Female</span>
              </label>
            </div>
          </div>
        ),
      },
      {
        label: "Upload profile picture",
        input: <input type="file" name="profile_pic" accept=".jpg, .jpeg" />,
      },
      {
        label: "Email",
        input: <input type="email" name="email" required />,
      },
      {
        label: "Password",
        input: <input type="password" name="password" required />,
      },
      {
        label: "",
        input: (
          <button className="nextBtn">
            <span className="btnText">Create Student</span>
            <i class="uil uil navigator"></i>
          </button>
        ),
      },
    ],
  };
  const handleSubmit = async (formData) => {
    const postData = async () => {
      const response = await axios.post(
        `${APIaddr}management/student/`,
        formData
      );
      if (response.data.success) {
        window.alert("Student Created");
        navigate("../home");
      } else {
        window.alert(response.data.error);
      }
    };
    postData();
  };

  return <Form data={formData} onSubmit={handleSubmit} />;
}
