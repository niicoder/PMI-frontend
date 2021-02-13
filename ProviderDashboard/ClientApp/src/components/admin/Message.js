import React from 'react';
import moment from 'moment';
import ButtonWithIcon from '../buttons/ButtonWithIcon';

const messageTypes = {
  MSG_APPLICATION: 'Application',
  MSG_PROVIDER: 'Provider',
  MSG_INSTRUCTOR: 'Instructor',
};

const Message = ({ message }) => {
  const expanded = true;

  return (
    <div className="container mx-auto mt-12 text-center font-agrandir rounded-t-md">
      <div className="inline-flex bg-gray-300 w-full items-center border-2 border-gray-400">
        <div className="w-2/5 inline-flex items-center">
          <div className="bg-gray-400 text-2xl px-2 py-1">
            {messageTypes[message.messageTypeId]}
            <span>
              <i className="fas fa-play-circle ml-4" />
            </span>
          </div>
          <div className="text-blue-500 ml-6" />
        </div>
        <div className="w-2/5 inline-flex items-center">
          <div className="bg-gray-400 text-2xl px-2 py-1">From</div>
          <div className="ml-6">{message.fromName}</div>
        </div>
        <div className="w-1/5 inline-flex items-center justify-end pr-2">
          <ButtonWithIcon color="primary-light" colorLight="primary-light" title="Reply" size="2">
            <i className="fas fa-reply" />
          </ButtonWithIcon>
          &nbsp;
          <ButtonWithIcon
            color="primary-light"
            colorLight="primary-light"
            title={expanded ? 'Hide' : 'Expand'}
            size="2"
          >
            <i className={`fas ${expanded ? 'fa-caret-up' : 'fa-caret-down'}`} />
          </ButtonWithIcon>
        </div>
      </div>

      <div>
        <div className="inline-flex bg-gray-300 w-full items-center text-left text-sm border-b-2 border-l-2 border-r-2 border-gray-400">
          <div className="w-1/4 p-2 text-gray-600">
            <strong className="text-black bold">{message.inReplyToMessageId ? 'In Reply To: ' : 'RE: '}</strong>
          </div>
          <div className="w-1/2 p-2 text-gray-600">
            <strong className="text-black bold">Subject: </strong>
            {message.messageSubject}
          </div>
          <div className="w-1/4 p-2 text-gray-600 italic text-xs text-right">
            <span>Received:</span>
            <span className="not-italic bold text-black">
              &nbsp;
              {moment(message.dateSent).format('MM/DD/YYYY')}
            </span>
            <span>
              &nbsp;
              {moment(message.dateSent).format('HH:mm')}
            </span>
          </div>
        </div>
        {expanded && (
          <div className="bg-gray-100 text-xs text-left p-4 border-b-2 border-l-2 border-r-2 border-gray-400">
            {message.messageBody}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
