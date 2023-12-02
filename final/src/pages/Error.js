import { Link, useNavigate } from "react-router-dom";

export default function Error() {
  // const navigate = useNavigate();
  // navigate("/login");
  return (
    <h1>
      Oops, something went wrong. Check the link again or try logging in again?
      <Link to="../logout" title="Login" />
    </h1>
  );
}
