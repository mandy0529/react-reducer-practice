import React, {useEffect} from 'react';

const Modal = ({modalContent, closeModal}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      closeModal();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [modalContent]);

  return (
    <div className="modal">
      <p>{modalContent}</p>
    </div>
  );
};

export default Modal;
