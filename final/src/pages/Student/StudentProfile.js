import {
    IoMailOutline,
    IoCallOutline,
    IoMaleFemaleOutline,
    IoWaterOutline,
    IoQrCodeOutline,
} from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SharingContext from "../../context/SharingContext";
import QRCode from "qrcode.react";

export default function StudentProfile() {
    const { APIaddr } = useContext(SharingContext);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get(`${APIaddr}student_profile/`);
            setData(response.data);
        };
        fetchData();
    }, []);

    const downloadQR = () => {
        const canvas = document.querySelector("canvas");
        const url = canvas.toDataURL();
        const link = document.createElement("a");
        link.download = "id.png";
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return ( <
            div className = "wrapper312" >
            <
            div className = "left21" >
            <
            // img src = { `${APIaddr}` + data.profile_pic }
            img src = { "https://www.clipartmax.com/png/middle/180-1809318_picture-300-x-300-pixel.png" }
            alt = "profile pic" / >
            <
            h4 > { data.name } < /h4> <
            h5 > { data.roll_no } < /h5> < /
            div > <
            div className = "right312341" >
            <
            div className = "info1234323" >
            <
            h3 > Profile < /h3> <
            div className = "info_data14564" >
            <
            div className = "data12534" >
            <
            div className = "fields7414" > <
            h4 >
            <
            IoMailOutline / >
            Email: <
            /h4> <
            // p > { data.email } < /p> < /
            p className = "ans111" > 21 bcs049 @iiitdwd.ac.in < /p> < /
            div > <
            div className = "data12534" >
            <
            h4 >
            <
            IoMaleFemaleOutline / >
            Gender: <
            /h4> <
            p className = "ans112" > Male < /p> < /
            div > <
            div className = "data12534" >
            <
            h4 >
            <
            IoWaterOutline / >
            Father 's Name:< /
            h4 > <
            p className = "ans113" > sthrsyb dthdb < /p> < /
            div > < /
            div > <
            /div> < /
            div >

            <
            div className = "projects1235342" >

            <
            h3 > Contact Details: < /h3> <
            div className = "projects_data7684" >
            <
            div className = "data12534" >
            <
            div className = "fields7414" >
            <
            h4 >
            <
            IoCallOutline / >
            Contact No.: <
            /h4> <
            p className = "ans114" > 8765432765 < /p> < /
            div > <
            div className = "data12534" >
            <
            h4 >
            <
            IoCallOutline / >
            Emergency Contact No.: <
            /h4> <
            p className = "ans115" > 9876543242 < /p> < /
            div >
            <
            /div>{
            /* <div className="data12534">
                          <h4>
                            <IoQrCodeOutline />
                            Entry pass
                          </h4>
                          <div className="qrcode">
                            <QRCode value={data.roll_no} />
                          </div>
                          <div className="btn qrdownload-center">
                            <button onClick={downloadQR}>Download QR Code</button>
                          </div>
                        </div> */
        } <
        /div> < /
    div > <
        /div> < /
    div >
);
}