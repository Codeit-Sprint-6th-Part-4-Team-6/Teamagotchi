import create from "zustand";

export interface ModalProps {
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  [key: string]: unknown;
}

interface ModalData {
  id: string;
  Component: React.ComponentType;
  props: { [key: string]: unknown };
  isOpen: boolean;
}

interface ModalStore {
  modalsData: ModalData[];
  openModal: (id: string, Component: React.ComponentType, props?: ModalProps) => void;
  closeModal: (id: string) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modalsData: [],
  openModal: (id, Component, props) => {
    set((state) => {
      if (state.modalsData.some((modal) => modal.id === id)) return state;

      return {
        modalsData: [
          ...state.modalsData,
          {
            id,
            Component,
            props: { ...props, onClose: () => state.closeModal(id) },
            isOpen: true,
          },
        ],
      };
    });
  },
  closeModal: (id) => {
    set((state) => ({
      modalsData: state.modalsData.filter((modal) => modal.id !== id),
    }));
  },
}));

export default useModalStore;
