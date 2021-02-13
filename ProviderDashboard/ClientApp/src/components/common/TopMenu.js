import React from 'react';
import { NavLink } from 'react-router-dom';

const TopMenu = () => {
  return (
    <div className="w-full bg-gray-100 text-primary font-semibold">
      <div className="container mx-auto sm:px-28 flex justify-center">
        <NavLink
          to="/application"
          className="flex flex-col justify-center items-center text-center px-4 sm:px-16 py-4"
          activeClassName="bg-gray-300"
        >
          <i className="far fa-clipboard sm:text-2xl lg:text-3xl" />
          <span className="sm:text-xl">Applications</span>
        </NavLink>
        <NavLink
          exact
          to="/my-provider"
          className="flex flex-col justify-center  items-center   text-center px-4 sm:px-16 py-4"
          activeClassName="bg-gray-300"
        >
          <i className="far fa-building sm:text-2xl lg:text-3xl" />
          <span className="sm:text-xl">My Providers</span>
        </NavLink>
        {/* Messages hidden for now. */}
        {/* <NavLink
          exact
          to="/messages"
          className="flex flex-col justify-center items-center text-center px-4 sm:px-16 py-4"
          activeClassName="bg-gray-300"
        >
          <i className="far fa-envelope sm:text-2xl lg:text-3xl"></i>
          <span className="sm:text-xl">Messages</span>
        </NavLink> */}
      </div>
    </div>
  );
};

export default TopMenu;
