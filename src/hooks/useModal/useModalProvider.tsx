import { createContext, FC, ReactElement } from "react";
import { useModal, UseModalType } from "./useModal";
import Modal from "./modal";

const ModalContext = createContext<UseModalType>([()=>{},()=>{}, null]);

type ModalContextProviderProps = {
    children: ReactElement;
}

const ModalContextProvider: FC<ModalContextProviderProps> = ({ children }) => {
  const [openModal, closeModal, content] = useModal();

  return (
    <ModalContext.Provider value={[openModal, closeModal, content]}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };