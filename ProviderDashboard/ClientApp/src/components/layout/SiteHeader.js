import React from 'react';
import { Link } from 'react-router-dom';

const SiteHeader = ({ isLoggedIn }) => {
  return (
    <div>
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto py-2 px-4 sm:px-6 flex items-center justify-between lg:px-8">
          <div className="flex items-center">
            <div className="pr-3">
              <i className="fas fa-th text-black text-4xl" />
            </div>
            <a href="https://www.pmi.org">
              <img
                className="w-48 pl-2 border-l border-solid border-gray-300 cursor-pointer"
                src="images/pmi-logo-new.png"
                alt="PMI Logo"
              />
            </a>
          </div>
          <div>
            {!isLoggedIn && (
              <Link to="/login">
                <div className=" text-white text-sm px-5 py-2 rounded-md bg-primary">Log In</div>
              </Link>
            )}
            {isLoggedIn && (
              <Link to="/logout">
                <div className=" text-white text-sm px-5 py-2 rounded-md bg-primary">Log Out</div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="bg-primary">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="text-white">
            <a href="https://www.pmi.org/certifications">
              <span className="mr-2">Certifications</span>
            </a>
          </div>
          <div className="text-white">
            <a href="https://www.pmi.org/membership">
              <span className="mr-2">Membership</span>
            </a>
          </div>
          <div className="text-white">
            <a href="https://www.pmi.org/learning">
              <span className="mr-2">Learning &amp; Events</span>
            </a>
          </div>
          <div className="text-white">
            <a href="https://www.pmi.org/pmbok-guide-standards">
              <span className="mr-2">PMBOK&reg; Guide &amp; Standards</span>
            </a>
          </div>
          <div className="text-white">
            <a href="https://www.pmi.org/business-solutions">
              <span className="mr-2">Business Solutions</span>
            </a>
          </div>
          <div className="text-white">
            <span className="mr-2">More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
