import Form from "../../components/Form";

export default function AddStaff({ handleStaffSubmit }) {
  const data = {
    Header: "Add Staff",
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
          <input type="email" placeholder="Enter Email" name="email" required />
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
        label: "Password",
        input: (
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />
        ),
      },
      {
        label: "Profile Picture",
        input: <input type="file" accept=".jpg, .jpeg" name="profile_pic" />,
      },
      {
        label: "Is the staff a Warden?",
        input: <input type="checkbox" value="warden" name="warden" />,
      },
      {
        label: "Is the staff a Student Welfare Coordinator?",
        input: <input type="checkbox" value="swc" name="swc" />,
      },
      {
        label: "Is the staff a Faculty Advisor?",
        input: <input type="checkbox" value="fa" name="fa" />,
      },
      {
        label: "Gender",
        input: (
          <div className="input-field76t33">
            <label>Male</label>
            <input type="radio" name="gender" value="male" id="dot-1" />
            <label>Female</label>
            <input type="radio" name="gender" value="female" id="dot-2" />
          </div>
        ),
      },
      {
        label: "",
        input: (
          <button className="nextBtn">
            <span className="btnText">Create</span>
            <i className="uil uil navigator"></i>
          </button>
        ),
      },
    ],
  };

  return <Form data={data} onSubmit={handleStaffSubmit} />;
}
