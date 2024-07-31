import { useCallback } from "react";
import useModalStore, { ModalProps } from "@store/useModalStore";

const useModal = () => {
  const { modalsData, openModal, closeModal } = useModalStore();

  const openModalCallback = useCallback(
    (id: string, Component: React.ComponentType, props?: ModalProps) => {
      openModal(id, Component, props);
    },
    [openModal]
  );

  const closeModalCallback = useCallback(
    (id: string) => {
      closeModal(id);
    },
    [closeModal]
  );

  return { modalsData, openModal: openModalCallback, closeModal: closeModalCallback };
};

export default useModal;
