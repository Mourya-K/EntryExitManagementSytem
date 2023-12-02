import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SharingContext from "../context/SharingContext";

export default function CSRFToken() {
  const [csrftoken, setCSRFToken] = useState("");
  const { APIaddr } = useContext(SharingContext);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${APIaddr}csrf_cookie/`);
        console.log(getCookie("csrftoken"));
        setCSRFToken(getCookie("csrftoken"));
      } catch (err) {}
    };

    fetchData();
  }, []);
  console.log("COOKIE: ".concat(getCookie("csrftoken")));
  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
}
