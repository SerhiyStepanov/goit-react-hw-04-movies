import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ closeModal, children }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handleKeydown = (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  };

  const clickOnBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  return createPortal(
    <div className={s.backdrop} onClick={clickOnBackdrop}>
      <div className={s.modal}>{children}</div>
    </div>,

    modalRoot
  );
}
