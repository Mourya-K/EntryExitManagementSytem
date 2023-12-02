import { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import SharingContext from "../../context/SharingContext";
import FaceEntryNext from "./FaceEntryNext";

export default function MakeEntry() {
  const { APIaddr } = useContext(SharingContext);
  const vid = useRef(null);
  const canvasRef = useRef(null);
  const [studentData, setData] = useState({});
  // const [take, setTake] = useState(true);
  const [rollNo, setRoll] = useState("");
  const [content, setContent] = useState("Show QR Code");

  let temp = null;
  let stream;
  useEffect(() => {
    const getMedia = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (vid.current) {
          vid.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    getMedia();
    makePackage();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [studentData]);

  const makePackage = () => {
    let count = 0;
    const formData = new FormData();
    const iid = setInterval(
      () => {
        capture();
        formData.append("img", temp);
        count++;
        if (count === 1) {
          shipPackage(formData);
          clearInterval(iid);
        }
      },
      rollNo ? 100 : 1000
    );
  };

  const shipPackage = async (formData) => {
    formData.append("entry_type", "face");
    if (rollNo) formData.append("roll_no", rollNo);
    const response = await axios.post(`${APIaddr}direct_entry/`, formData);
    if (
      ((response.data.error || response.data.getface) &&
        // take &&
        window.location.pathname === "/security/faceEntry") ||
      response.status === 500
    ) {
      if (response.data.getface) {
        setRoll(response.data.roll_no);
        setContent("Show your Face");
      }
      makePackage();
    } else if (response.data.success) {
      setRoll("");
      setContent(rollNo + " recorded");
      // if (stream) {
      //   stream.getTracks().forEach((track) => {
      //     track.stop();
      //   });
      // }
      // setData(response.data);
      // setTake(false);
    } else if (response.data.no_match) {
      setRoll("");
      setContent("Face not matched with QR Code");
    }
  };

  const handleLoadedMetadata = () => {
    if (vid.current) {
      canvasRef.current.width = 640;
      canvasRef.current.height = 480;
    }
  };

  const capture = () => {
    if (vid.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(vid.current, 0, 0, 640, 480);
      temp = canvasRef.current.toDataURL("image/jpeg", 0.9);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{content}</h1>
      {!studentData.name && (
        <div className="secCenter">
          <div>
            <video
              ref={vid}
              autoPlay
              muted
              playsInline
              onLoadedMetadata={handleLoadedMetadata}
              height="480px"
              width="640px"
            />
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}
      {studentData.name && (
        <FaceEntryNext
          record={studentData}
          setData={setData}
          type="faceEntry"
        />
      )}
    </div>
  );
}
