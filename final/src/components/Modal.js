import { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ onClose, footer, children }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return document.body.classList.remove("overflow-hidden");
  }, []);
  return ReactDOM.createPortal(
    <div>
      <div onClick={onClose} className="modal-background"></div>
      <div className="modal-content-container">
        <div className="modal-content">
          {children}
          <div className="modal-footer">{footer}</div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}
