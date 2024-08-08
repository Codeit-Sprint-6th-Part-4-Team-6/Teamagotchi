import { ComponentType } from "react";
import create from "zustand";

interface ModalProps {
  onClose?: () => void;
  onConfirm?: () => void;
  onChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | ((event: React.ChangeEvent<HTMLTextAreaElement>) => void);
  firstOnChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | ((event: React.ChangeEvent<HTMLTextAreaElement>) => void);
  secondOnChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | ((event: React.ChangeEvent<HTMLTextAreaElement>) => void);
}

interface ModalState {
  modalType: string | null;
  ModalComponent: ComponentType<ModalProps> | null;
  modalProps: ModalProps | null;
  openModal: (type: string, Component: ComponentType<ModalProps>, props?: ModalProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  ModalComponent: null,
  modalProps: null,
  openModal: (type, Component, props) =>
    set({ modalType: type, ModalComponent: Component, modalProps: props || null }),
  closeModal: () => set({ modalType: null, ModalComponent: null, modalProps: null }),
}));
