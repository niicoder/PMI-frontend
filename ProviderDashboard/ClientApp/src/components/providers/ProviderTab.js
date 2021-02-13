import React from 'react';
import { Link } from 'react-router-dom';
import SectionButton from '../buttons/SectionButton';

const AdminTab = ({ tab }) => {
  return (
    <div className="flex flex-row justify-center">
      <Link to="/my-provider/info">
        <SectionButton title="Provider Info" description="Provider Demographics" first selected={tab === 1}>
          <div className="text-xl text-white border-4 border-white w-8 h-8 flex items-center justify-center rounded-full">
            i
          </div>
        </SectionButton>
      </Link>
      {/* Instructors / Courses hidden for now. */}
      {/* <Link to="/my-provider/instructor">
        <SectionButton
          title="Instructors"
          description="Provider Instructors"
          selected={tab === 2}
        >
          <div className="text-2xl text-white">
            <i className="fas fa-users"></i>
          </div>
        </SectionButton>
      </Link>
      <Link to="/my-provider/course">
        <SectionButton
          title="Courses"
          description="Provider Courses"
          last={true}
          selected={tab === 3}
        >
          <div className="text-2xl text-white">
            <i className="fas fa-graduation-cap"></i>
          </div>
        </SectionButton>
      </Link> */}
    </div>
  );
};

export default AdminTab;
