import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import constants from '../../constants';

const AdminTab = ({ tab }) => {
  return (
    <div className="w-full bg-gray-100 text-primary font-semibold">
      <div className="container mx-auto sm:px-28 flex justify-center">
        <NavLink
          to="/admin"
          className={cn('flex flex-col justify-center items-center text-center px-4 sm:px-16 py-4', {
            'bg-gray-300': tab === constants.adminTabs.dashboard,
          })}
        >
          <i className="fas fa-tachometer-alt sm:text-2xl lg:text-3xl" />
          <span className="sm:text-xl">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/pmp"
          className={cn('flex flex-col justify-center items-center text-center px-4 sm:px-16 py-4', {
            'bg-gray-300': tab === constants.adminTabs.pmp,
          })}
        >
          <i className="fas fa-chalkboard-teacher sm:text-2xl lg:text-3xl" />
          <span className="sm:text-xl">PMP TTT</span>
        </NavLink>

        {/* Messages hidden for now */}
        {/* <NavLink
          exact
          to="/messages"
          className="flex-col justify-center items-center text-center px-4 sm:px-16 py-4"
          activeClassName="bg-gray-300"
        >
          <i className="far fa-envelope sm:text-2xl lg:text-3xl"></i>
          <span className="sm:text-xl">Messages</span>
        </NavLink> */}
      </div>
    </div>
  );
};

export default AdminTab;
