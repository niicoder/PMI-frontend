import React from 'react';
import { Link } from 'react-router-dom';
import ButtonWithIcon from '../buttons/ButtonWithIcon';

const ApplicationModal = ({ onClose, application }) => {
  return (
    <div className="w-screen">
      <div className="md-modal md-effect md-show border-2 border-white rounded-t-sm" id="instructor-modal">
        <div className="inline-flex bg-primary text-white w-full items-center">
          <div className="flex-none text-2xl p-2">
            <i className="fas fa-clipboard-list" />
          </div>
          <h2 className="flex-1 text-2xl p-2 font-agrandir">Application Information</h2>
          <div className="flex-none p-2">
            <button className="text-3xl" onClick={onClose} type="button">
              <i className="far fa-times-circle" />
            </button>
          </div>
        </div>
        <div className="bg-gray-200 text-left pl-2 py-2">{application.orgName}</div>
        <div className="bg-white px-8 py-4 flex">
          <div className="w-1/2">
            <div className="bg-gray-50 rounded border border-gray-100 text-left">
              <div className="flex border-b border-gray-100 py-3">
                <div className="font-bold w-1/2 pr-3 border-r border-gray-100">Organization Name</div>
                <div className="w-1/2">{application.orgName}</div>
              </div>

              <div className="flex border-b border-gray-100">
                <div className="font-bold w-1/2 pr-3 border-r border-gray-100">Address</div>
                <div className="w-1/2">
                  <p>{application.addressLine1}</p>
                  <p>{`${application.addressCity},${application.addressState} ${application.addressZip}`}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center py-5">
              <Link to={`/admin/application/${application.id}`}>
                <ButtonWithIcon title="Open Application">
                  <span className="w-6 text-xl">
                    <i className="far fa-folder-open" />
                  </span>
                </ButtonWithIcon>
              </Link>
            </div>
          </div>
          <div className="w-1/2" />
        </div>
      </div>
      <div className="md-overlay" />
    </div>
  );
};

export default ApplicationModal;
