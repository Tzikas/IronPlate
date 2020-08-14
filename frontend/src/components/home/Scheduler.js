import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

export default function Scheduler({modalIsOpen, setIsOpen, user}){
  var subtitle;

  function afterOpenModal() {
    console.log(user)
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }
  


    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className="modal-header">
            <h2 ref={_subtitle => (subtitle = _subtitle)}>Please select a time to meet</h2>
            <button onClick={() => setIsOpen(false)}>close</button>
          </div>
          <div className="calendly">
            <iframe
              src={user?.calendly}
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>

        </div>
         
        </Modal>
      </div>
    );
}

