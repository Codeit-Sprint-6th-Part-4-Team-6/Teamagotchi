import React, { useEffect, useState } from "react";
import classNames from "classnames";
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

  const modalClass = classNames(
    "modal-container-base transition-transform",
    isMobile
      ? `modal-container-mobile duration-500 ${isVisible ? `-translate-y-0` : `translate-y-300`}`
      : `modal-container duration-500 ease-in-out ${isVisible ? `scale-1` : `scale-0`}`
  );

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        <ModalComponent {...enhancedModalProps} />
      </div>
    </div>
  );
}
