import { ModalProps, useModalStore } from "../store/useModalStore";

interface UseModal<T extends ModalProps = ModalProps> {
  openModal: (type: string, Component: React.ComponentType<T>, props?: T) => void;
  closeModal: () => void;
  modalType: string | null;
  ModalComponent: React.ComponentType<T> | null;
  modalProps: T;
}

export const useModal = <T extends ModalProps = ModalProps>(): UseModal<T> => {
  const { openModal, closeModal, modalType, ModalComponent, modalProps } = useModalStore();

  return {
    openModal,
    closeModal,
    modalType,
    ModalComponent,
    modalProps,
  };
};
