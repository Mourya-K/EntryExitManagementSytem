import {
  IoMoonOutline,
  IoSettingsOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { useContext, useState } from "react";
import classNames from "classnames";
import SharingContext from "../context/SharingContext";

export default function ThemeSelector() {
  const { dark, setDark, setTheme } = useContext(SharingContext);
  const [toggle, setToggle] = useState(false);

  const toggleClass = classNames("style-switcher", {
    open: toggle,
  });

  const toggleThemeSelector = () => {
    setToggle(!toggle);
  };

  return (
    <div className={toggleClass}>
      {/* <div
        className="style-switcher-toggler s-icon"
        onClick={toggleThemeSelector}
      >
        <i className="fas fa-cog fa-spin">
          <IoSettingsOutline />
        </i>
      </div> */}
      <div className="day-night s-icon" onClick={() => setDark(!dark)}>
        <i className="fas">
          {!dark && <IoMoonOutline />}
          {dark && <IoSunnyOutline />}
        </i>
      </div>
      <h4>Theme Colors</h4>
      <div className="colors">
        <span className="color-1" onClick={() => setTheme(1)}></span>
        <span className="color-2" onClick={() => setTheme(2)}></span>
        <span className="color-3" onClick={() => setTheme(3)}></span>
        <span className="color-4" onClick={() => setTheme(4)}></span>
        <span className="color-5" onClick={() => setTheme(5)}></span>
      </div>
    </div>
  );
}
