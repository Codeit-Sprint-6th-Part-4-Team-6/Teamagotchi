import create from "zustand";

export interface ModalProps {
  [key: string]: any;
}

interface ModalState<T extends ModalProps = ModalProps> {
  modalType: string | null;
  ModalComponent: React.ComponentType<T> | null;
  modalProps: T;
  openModal: (type: string, Component: React.ComponentType<T>, props?: T) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  ModalComponent: null,
  modalProps: {},
  openModal: (type, Component, props = {}) =>
    set({ modalType: type, ModalComponent: Component, modalProps: props }),
  closeModal: () => set({ modalType: null, ModalComponent: null, modalProps: {} }),
}));
