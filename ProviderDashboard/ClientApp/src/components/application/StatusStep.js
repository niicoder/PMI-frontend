import React from 'react';
import ApplicationStatus from '../common/ApplicationStatus';

const StatusStep = ({ application, admin }) => {
  return (
    <div className="">
      <ApplicationStatus application={application} admin={admin} showButton={false} />
    </div>
  );
};

export default StatusStep;
