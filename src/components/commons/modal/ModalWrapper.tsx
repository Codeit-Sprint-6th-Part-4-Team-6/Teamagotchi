import React, { useEffect, useState } from "react";
import useMediaQuery from "@hooks/useMediaQuery";
import { useModal } from "@hooks/useModal";

export default function ModalWrapper() {
  const { modalType, ModalComponent, modalProps, closeModal } = useModal();
  const { isMobile } = useMediaQuery();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (modalType && ModalComponent) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [modalType, ModalComponent]);

  if (!modalType || !ModalComponent) return null;

  const enhancedModalProps = {
    ...modalProps,
    onClose: closeModal,
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className={`modal-container transition-transform duration-500 ease-in-out ${isVisible ? `scale-1` : `scale-0`}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalComponent {...enhancedModalProps} />
      </div>
    </div>
  );
}
