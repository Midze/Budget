import React, { ReactNode } from 'react';
import cn from 'classnames';
import Portal from 'components/Portal';
import styles from './Modal.module.css';
import CloseIcon from 'components/Icons/CloseIcon';

interface ModalProps {
  children: ReactNode;
  setIsModalActive: (active: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ children, setIsModalActive }) => {
  const onClose = () => {
    setIsModalActive(false);
  };

  return (
    <Portal>
      <div className={cn(styles.overlay)} onClick={onClose}></div>
      <div className={cn(styles.modal)}>
        {children}
        <CloseIcon className={cn(styles.close)} onClick={onClose}/>
      </div>
    </Portal>
  );
};

export default Modal;
