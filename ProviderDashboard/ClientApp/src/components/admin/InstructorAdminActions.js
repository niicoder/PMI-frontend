import React, { useState } from 'react';
import { useHistory } from 'react-router';
import cn from 'classnames';
import _ from 'lodash';

import constants from '../../constants';
import { makeRequest } from '../../utils/request';

import ButtonWithIcon from '../buttons/ButtonWithIcon';
import ActionsModal from '../common/ActionsModal';
import IssueBadgeModal from './IssueBadgeModal';
import SyncOperationrModal from './SyncOperationModal';
import InvoicePaidModal from './T3InvoicePaidModal';

const AdminActions = ({ application, onSuccess }) => {
  const history = useHistory();
  const [modalInfo, setModalInfo] = useState(null);
  const [issueBadgeModal, setIssueBadgeModal] = useState(false);
  const [invoicePaidModal, setInvoicePaidModal] = useState(false);
  const [syncInstructorModal, setSyncInstructorModal] = useState(false);
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminInputValue, setAdminInputValue] = useState('');
  const [error, setError] = useState('');

  const validDisableAllList = [
    constants.instructorAppStatus.closedWithdrawn.statusId,
    constants.instructorAppStatus.closedDenied.statusId,
    constants.instructorAppStatus.closedFailed.statusId,
  ];
  const validAssignAdminList = [constants.instructorAppStatus.submitted.statusId];

  const validInfoRequiredAppList = [constants.instructorAppStatus.inReview.statusId];

  const validEligibleTrainingList = [constants.instructorAppStatus.inReview.statusId];

  const validInvoiceList = [constants.instructorAppStatus.registrationInitiated.statusId];

  const validPaidList = [constants.instructorAppStatus.invoiced.statusId];

  const validDenyList = [
    constants.instructorAppStatus.opened.statusId,
    constants.instructorAppStatus.pending.statusId,
    constants.instructorAppStatus.submitted.statusId,
    constants.instructorAppStatus.inReview.statusId,
    constants.instructorAppStatus.additionalInformationRequired.statusId,
    constants.instructorAppStatus.eligibleForTraining.statusId,
    constants.instructorAppStatus.registrationInitiated.statusId,
    constants.instructorAppStatus.invoiced.statusId,
    constants.instructorAppStatus.awaitingTraining.statusId,
    constants.instructorAppStatus.inTraining.statusId,
  ];

  const validIssueBadgeList = [
    constants.instructorAppStatus.trainingComplete.statusId,
    constants.instructorAppStatus.closedPassed.statusId,
  ];

  const validSyncInstructorList = [constants.instructorAppStatus.closedPassed.statusId];

  const enableAdminButton = (validStatuses) => {
    return _.includes(validStatuses, application.statusId);
  };

  const changeStatus = async (status) => {
    let url = '';

    if (status !== constants.instructorAppStatus.additionalInformationRequired.statusId) {
      url = `/api/instructorapplication/SetAppStatus/${application.id}/${status}`;
    } else {
      url = `/api/instructorapplication/SetAdditionalInfo/${application.id}`;
    }

    await makeRequest('post', url);
    await onSuccess();

    if (
      status === constants.instructorAppStatus.closedDenied.statusId ||
      status === constants.instructorAppStatus.closedWithdrawn.statusId
    ) {
      history.push(`/admin/pmp`);
    } else {
      history.push(`/admin/pmp/application/${application.id}/status`);
    }
  };

  const assignToAdmin = async () => {
    if (!adminInputValue.trim().length) {
      return;
    }
    const url = `/api/instructorapplication/AssignToAdmin/${application.id}/${adminInputValue}`;
    try {
      await makeRequest('post', url);
      setAdminInputValue('');
      setShowAdminInput(false);
      await onSuccess();
      setError('');
      history.push(`/admin/pmp/application/${application.id}/status`);
    } catch (error) {
      setError('Invalid Admin.');
      console.log(error);
    }
  };

  return (
    <div>
      {/* MODALS */}
      {modalInfo && (
        <ActionsModal
          onSubmit={() => changeStatus(modalInfo.statusId)}
          onClose={() => setModalInfo(null)}
          yesBtnColor="green-500"
          noBtnColor="red-600"
          modalText={modalInfo.modalText}
        />
      )}
      {invoicePaidModal && (
        <InvoicePaidModal
          application={application}
          onClose={async () => {
            await onSuccess();
            setInvoicePaidModal(false);
          }}
        />
      )}
      {issueBadgeModal && (
        <IssueBadgeModal
          badgeModalType={constants.modalType.pmpT3}
          application={application}
          onClose={() => setIssueBadgeModal(false)}
        />
      )}
      {syncInstructorModal && (
        <SyncOperationrModal
          syncModalType={constants.modalType.pmpT3}
          application={application}
          onClose={() => setSyncInstructorModal(false)}
        />
      )}
      {/* ADMIN BUTTONS */}
      {!enableAdminButton(validDisableAllList) && (
        <div className="bg-gray-100 rounded shadow py-3 px-2">
          <div className="flex flex-col">
            {enableAdminButton(validInfoRequiredAppList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="yellow-600"
                  colorLight="yellow-400"
                  title="Additional Info Required"
                  fullWidth
                  textSize="lg"
                  onClick={() => setModalInfo(constants.instructorAppStatus.additionalInformationRequired)}
                >
                  <span className="w-8 text-4xl">
                    <i className="fas fa-file-alt" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validEligibleTrainingList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="blue-600"
                  colorLight="blue-400"
                  title="Eligible Training"
                  fullWidth
                  textSize="lg"
                  onClick={() => setModalInfo(constants.instructorAppStatus.eligibleForTraining)}
                >
                  <span className="w-8 text-4xl">
                    <i className="fas fa-search" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validInvoiceList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="primary"
                  colorLight="primary-light"
                  title="Invoice Sent"
                  fullWidth
                  textSize="lg"
                  onClick={() => setModalInfo(constants.instructorAppStatus.invoiced)}
                >
                  <span className="w-8 text-4xl">
                    <i className="fas fa-file-export" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validPaidList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="green-600"
                  colorLight="green-400"
                  title="Paid"
                  fullWidth
                  textSize="lg"
                  onClick={() => setInvoicePaidModal(true)}
                >
                  <span className="w-8 text-4xl">
                    <i className="far fa-thumbs-up" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validIssueBadgeList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="green-600"
                  colorLight="green-400"
                  title="Issue Badge"
                  fullWidth
                  textSize="lg"
                  onClick={() => setIssueBadgeModal(true)}
                >
                  <span className="w-8 text-4xl">
                    <i className="fas fa-award" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validSyncInstructorList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="green-600"
                  colorLight="green-400"
                  title="Sync Instructor"
                  fullWidth
                  textSize="lg"
                  onClick={() => {
                    setSyncInstructorModal(true);
                  }}
                >
                  <span className="w-8 text-4xl">
                    <i className="fas fa-sync" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validDenyList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="red-800"
                  colorLight="red-600"
                  title="Close: Deny"
                  fullWidth
                  textSize="lg"
                  onClick={() => setModalInfo(constants.instructorAppStatus.closedDenied)}
                >
                  <span className="w-8 text-4xl">
                    <i className="far fa-thumbs-down" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validAssignAdminList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  title="Assign to Admin"
                  fullWidth
                  colorLight={showAdminInput ? 'primary' : 'primary-light'}
                  color={showAdminInput ? 'primary' : 'primary-light'}
                  textSize="lg"
                  onClick={() => {
                    setShowAdminInput(!showAdminInput);
                    setAdminInputValue('');
                  }}
                >
                  <svg width="36px" height="36px" viewBox="0 0 26 26">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g fill="currentColor" fillRule="nonzero">
                        <path d="M10.5,0.15625 C7.483,0.15625 5.0625,2.2285 5.0625,6.1875 C5.0625,8.7735 6.09225,11.40825 7.65625,13.03125 C8.26525,14.65425 7.1665,15.25775 6.9375,15.34375 C3.7815,16.50175 0.09375,18.6015 0.09375,20.6875 L0.09375,21.46875 C0.09375,24.31075 5.50825,24.96875 10.53125,24.96875 C11.63325,24.96875 12.7395,24.92175 13.8125,24.84375 C12.4935,23.44375 11.6875,21.574 11.6875,19.5 C11.6875,17.709 12.2975,16.068 13.3125,14.75 C13.1615,14.398 13.102,13.843 13.375,13 C14.93,11.375 15.9375,8.7635 15.9375,6.1875 C15.9375,2.2285 13.514,0.15625 10.5,0.15625 Z M19.5,13.1875 C16.014,13.1875 13.1875,16.013 13.1875,19.5 C13.1875,22.987 16.013,25.8125 19.5,25.8125 C22.987,25.8125 25.8125,22.987 25.8125,19.5 C25.8125,16.013 22.986,13.1875 19.5,13.1875 Z M18.625,16 L20.375,16 L20.375,18.59375 L22.96875,18.59375 L22.96875,20.40625 L20.375,20.40625 L20.375,23 L18.625,23 L18.625,20.40625 L16,20.40625 L16,18.59375 L18.625,18.59375 L18.625,16 Z" />
                      </g>
                    </g>
                  </svg>
                </ButtonWithIcon>
              </div>
            )}
            {showAdminInput && (
              <div className="w-full mt-4">
                <div className="flex items-center border rounded py-2 px-1 bg-white">
                  <input
                    type="text"
                    className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                    placeholder="Type username here"
                    aria-label="Admin To Assign"
                    value={adminInputValue}
                    autoFocus
                    onChange={(event) => setAdminInputValue(event.target.value)}
                  />
                  <button
                    className={cn('flex-shrink-0 hover:text-purple-700 text-sm text-purple-500 p-1 mr-1', {
                      'opacity-50 cursor-not-allowed': !adminInputValue.trim().length,
                    })}
                    type="button"
                    disabled={!adminInputValue.trim().length}
                    onClick={assignToAdmin}
                  >
                    <svg width="20px" height="20px" viewBox="0 0 24 22">
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g fill="currentColor">
                          <polygon id="Path" points="0 0 0 9.5 19 11 0 12.5 0 22 24 11" />
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
                {error !== '' && <p className="bg-transparent text-sm text-red-600">{error}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActions;
