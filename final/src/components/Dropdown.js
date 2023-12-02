import { useState } from "react";
import "./Dropdown.css";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";

export default function Dropdown({ current, setCurrent, options }) {
  const [open, setOpen] = useState(false);
  const renderedOptions = options.map((option) => {
    return (
      <div
        key={option.key}
        onClick={() => {
          if (option.label != current) setCurrent(option.label);
          setOpen(false);
        }}
      >
        {option.label}
      </div>
    );
  });
  return (
    <div className="parent">
      <div className="input-box" onClick={() => setOpen(!open)}>
        <span>{current} </span>
        <span>
          {!open && <IoChevronDownOutline />}
          {open && <IoChevronUpOutline />}
        </span>
      </div>
      {open && <div className="options-box">{renderedOptions}</div>}
    </div>
  );
}
