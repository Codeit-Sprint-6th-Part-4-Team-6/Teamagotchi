import React, { useRef } from "react";

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose?: () => void;
  autoClose?: boolean;
}

export default function ModalWrapper({ children, onClose, autoClose = false }: ModalWrapperProps) {
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const handleAutoClose: React.MouseEventHandler = (event) => {
    if (event.target !== modalOverlayRef.current || !autoClose || !onClose) return;
    onClose();
  };

  return (
    <>
      {/* <div className="modal-overlay" ref={modalOverlayRef} onClick={handleAutoClose}></div> */}
      <div className="modal-container">{children}</div>
    </>
  );
}
