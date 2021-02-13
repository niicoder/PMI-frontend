import React from 'react';
import { dummyMessages } from '../../utils/dummyData';
import Messages from '../admin/Messages';

const MessagesSection = ({ application }) => {
  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">Messages</div>
      </div>

      <div className="px-8 py-4">
        <Messages messages={dummyMessages} application={application} />
      </div>
    </div>
  );
};

export default MessagesSection;
