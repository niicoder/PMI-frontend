import React from 'react';
import { Link } from 'react-router-dom';
import ButtonWithIcon from '../buttons/ButtonWithIcon';

const ApplicationSubmittedPage = () => {
  return (
    <div className="container mx-auto mt-5 px-3">
      <h2 className="mt-1 text-3xl text-center tracking-tight leading-10 font-bold text-gray-900 sm:leading-snug font-agrandir">
        Application Request Submitted
      </h2>
      <div className="text-center mt-4 bg-gray-100 rounded border border-1-gray-200 py-4 w-2/3 mx-auto">
        <div className="font-agrandir">
          Application Request has been submitted and received.
          <br />
          Click here to start application
        </div>

        <div className="mt-4">
          <Link to="/application">
            <ButtonWithIcon title="Start Application">
              <span className="w-6 text-xl">
                <i className="fas fa-edit" />
              </span>
            </ButtonWithIcon>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSubmittedPage;
