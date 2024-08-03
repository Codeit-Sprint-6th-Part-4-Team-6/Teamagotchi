import React from "react";
import { useModal } from "@hooks/useModal";

export default function ModalWrapper() {
  const { modalType, ModalComponent, modalProps, closeModal } = useModal();

  if (!modalType || !ModalComponent) return null;

  const enhancedModalProps = {
    ...modalProps,
    onClose: closeModal,
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <ModalComponent {...enhancedModalProps} />
      </div>
    </div>
  );
}
