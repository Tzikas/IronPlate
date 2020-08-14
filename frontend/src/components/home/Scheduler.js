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

export default function Scheduler({modalIsOpen, setIsOpen, user, post}){
  var subtitle;

  function afterOpenModal() {
    console.log(user)
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

    console.log(post)


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
            <div class="zoom">
              <h2 ref={_subtitle => (subtitle = _subtitle)}>Please select a time to meet</h2>
              <a href="https://zoom.us/j/761267530">https://zoom.us/j/761267530</a>
            </div>
            <button onClick={() => setIsOpen(false)}>close</button>
          </div>
          <div className="calendly">
            <iframe
              src={post?.user?.calendly}
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>

        </div>
         
        </Modal>
      </div>
    );
}

