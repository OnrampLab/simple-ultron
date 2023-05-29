import { Modal } from 'antd';
import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: JSX.Element;
};

type ModalProps = {
  title?: string;
  okText?: string;
  cancelText?: string;
  content: JSX.Element;
  onOk?(): void;
  onCancel?(): void;
};

type GlobalModalContextContract = {
  showModal: (modalProps?: ModalProps) => void;
  hideModal: () => void;
  store: Store;
};

type Store = {
  modalProps?: ModalProps;
  show: boolean;
};

const initialState: GlobalModalContextContract = {
  showModal: () => {},
  hideModal: () => {},
  store: {
    show: false,
    modalProps: {
      content: <></>,
    },
  },
};

export const GlobalModalContext = createContext(initialState);

export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const GlobalModalProvider: React.FC<Props> = ({ children }) => {
  const [store, setStore] = useState<Store>(initialState.store);
  const { modalProps } = store || initialState.store;

  const showModal = (modalProps?: ModalProps) => {
    setStore({
      ...store,
      modalProps,
      show: true,
    });
  };

  const hideModal = () => {
    setStore(initialState.store);
  };

  const onOkClick = () => {
    modalProps?.onOk?.();
    hideModal();
  };

  const onCancelClick = () => {
    modalProps?.onCancel?.();
    hideModal();
  };

  const renderComponent = () => {
    return (
      <Modal
        title={modalProps?.title || 'Modal'}
        open={store.show}
        onOk={onOkClick}
        onCancel={onCancelClick}
        width={1200}
        okText={modalProps?.okText}
        cancelText={modalProps?.cancelText}
      >
        {modalProps?.content}
      </Modal>
    );
  };

  return (
    <GlobalModalContext.Provider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};
