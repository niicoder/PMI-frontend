import React, { useState } from 'react';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import Message from './Message';
import ComposeMessage from './ComposeMesssage';

const Messages = ({ application }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal && <ComposeMessage startStep={1} application={application} onClose={() => setShowModal(false)} />}

      <div className="container mx-auto mt-12 text-left">
        <div className="mb-4">
          <ButtonWithIcon onClick={() => setShowModal(!showModal)} title="Compose" rtl size={2}>
            <span className="w-6 text-sm">
              <i className="far fa-edit" />
            </span>
          </ButtonWithIcon>
        </div>
      </div>

      {application && application.messages.map((item) => <Message key={item.id} message={item} />)}
    </div>
  );
};

export default Messages;
