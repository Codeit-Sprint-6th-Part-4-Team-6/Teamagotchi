// src/components/Modal/ModalsWrapper.tsx
import React from "react";
import useModalStore from "@store/useModalStore";

export default function ModalsWrapper() {
  const { modalsData } = useModalStore();
  return (
    <>
      {modalsData.map((modal) => (
        <React.Fragment key={modal.id}>
          {modal.isOpen && <modal.Component {...modal.props} />}
        </React.Fragment>
      ))}
    </>
  );
}
