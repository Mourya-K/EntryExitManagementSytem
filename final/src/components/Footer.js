/*
This file holds the code for the footer element
*/
import "../theme-css/themes";

export default function Footer() {
  const year = new Date().getYear() + 1900;
  return (
    <div className="footer">
      <p>
        <span className="nowrap">Copyright &copy; {year} </span>
        <span className="nowrap">Silhouette</span>
      </p>
    </div>
  );
}
