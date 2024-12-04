// SuccessModal.js
import React from "react";
import Modal from "react-modal";
//import './ComponentCss/SuccessModal.css'

const SuccessModal = ({ isOpen, message, onClose }) => {

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      width: '20%',
      height: '20%',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Success Modal"
      style={customStyles}
    >
      <div style={{ textAlign: 'center' }}>
        <h2>{message}</h2>
      </div>
      <button
        onClick={onClose}
        style={{ alignSelf: 'flex-end', marginRight: '10px', marginBottom: '10px', width: '50px', height: '30px',alignItems: 'center', }}
      >
        OK
      </button>
    </Modal>
  );
};

export default SuccessModal;
