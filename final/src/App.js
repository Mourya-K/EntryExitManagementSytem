import StudentRoutes from "./Routes/StudentRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import StaffRoutes from "./Routes/StaffRoutes";
import SecurityRoutes from "./Routes/SecurityRoutes";
import LoginRoutes from "./Routes/LoginRoutes";
import { useContext, useEffect, useState } from "react";
import SharingContext from "./context/SharingContext";
import { useNavigate } from "react-router-dom";
import Error from "./pages/Error";
import LoginForm from "./pages/LoginForm";

export default function App() {
    const { role, isAuth, setIsMobile, setShow } = useContext(SharingContext);

    const navigate = useNavigate();
    const [dummy, setDummy] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        const mobileKeywords = [
            "android",
            "webos",
            "iphone",
            "ipad",
            "ipod",
            "blackberry",
            "windows phone",
        ];

        if (mobileKeywords.some((keyword) => userAgent.includes(keyword))) {
            setIsMobile(true);
            setShow(true);
        } else {
            setIsMobile(false);
            setShow(true);
        }
    }, []);

    useEffect(() => {
        setDummy(!dummy);
        if (role === "admin" && isAuth === true) {
            navigate("/admin/home");
        } else if (role === "student" && isAuth === true) {
            navigate("/student/home", { replace: true });
        } else if (role === "staff" && isAuth === true) {
            navigate("/staff/home");
        } else if (role === "security" && isAuth === true) {
            navigate("/security/profile");
        }
    }, [isAuth, role]);

    return ( <
        >
        <
        LoginRoutes / > {
            /* {isAuth && role === "student" && <StudentRoutes />}
                  {isAuth && role === "admin" && <AdminRoutes />}
                  {isAuth && role === "staff" && <StaffRoutes />}
                  {isAuth && role === "security" && <SecurityRoutes />}
                  {!isAuth && <LoginForm />} */
        } { /* {!isAuth && <Error />} */ } <
        StudentRoutes / >
        <
        AdminRoutes / >
        <
        StaffRoutes / >
        <
        SecurityRoutes / >
        <
        />
    );
}