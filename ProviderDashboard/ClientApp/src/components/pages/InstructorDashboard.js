import React from 'react';
import AssociatedProviders from '../instructor/AssociatedProviders';
import CurrentQualifications from '../instructor/CurrentQualifications';
import InstructorApplications from '../instructor/InstructorApplications';

const InstructorDashboard = () => {
  return (
    <div>
      <div className="m-8">
        <InstructorApplications />
      </div>
      <div className="m-8">
        <CurrentQualifications />
      </div>
      <div className="m-8">
        <AssociatedProviders />
      </div>
    </div>
  );
};

export default InstructorDashboard;
