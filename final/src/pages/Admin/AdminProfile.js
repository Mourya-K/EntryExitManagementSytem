import { IoMailOutline, IoCallOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SharingContext from "../../context/SharingContext";

export default function StudentProfile() {
  const { APIaddr } = useContext(SharingContext);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}admin_profile/`);
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="wrapper312">
      <div className="left21">
        <img src={`${APIaddr}` + data.profile_pic} alt="profile pic" />
        <h4>{data.name}</h4>
        <h5>{data.roll_no}</h5>
      </div>
      <div className="right312341">
        <div className="info1234323">
          <h3>Profile</h3>
          <div className="info_data14564">
            <div className="data12534">
              <h4>
                <IoMailOutline />
                Email
              </h4>
              <p>{data.email}</p>
            </div>
          </div>
        </div>

        <div className="projects1235342">
          <h3>Contact Details</h3>
          <div className="projects_data7684">
            <div className="data12534">
              <h4>
                <IoCallOutline />
                Contact Number
              </h4>
              <p>{data.phone_no}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
