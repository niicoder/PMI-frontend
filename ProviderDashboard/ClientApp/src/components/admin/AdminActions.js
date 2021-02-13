import React, { useState } from 'react';
import { mutate } from 'swr';
import { useHistory } from 'react-router';
import cn from 'classnames';
import _ from 'lodash';

import constants from '../../constants';
import { makeRequest } from '../../utils/request';

import ButtonWithIcon from '../buttons/ButtonWithIcon';
import ActionsModal from '../common/ActionsModal';
import SyncATPStatusModal from './SyncATPStatusModal';
import IssueBadgeModal from './IssueBadgeModal';
import SyncOperationrModal from './SyncOperationModal';
import AssignProviderNumberModal from './AssignProviderNumberModal';

const AdminActions = ({ application, revalidateApp }) => {
  const history = useHistory();
  const [modalInfo, setModalInfo] = useState(null);
  const [syncATPModal, setSyncATPModal] = useState(null);
  const [issueBadgeModal, setIssueBadgeModal] = useState(false);
  const [syncProviderModal, setSyncProviderModal] = useState(false);
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminInputValue, setAdminInputValue] = useState('');
  const [invoice, setInvoice] = useState({});
  const [selectedApp, setSelectedApp] = useState(false);
  const [error, setError] = useState('');

  const validDisableAllList = [
    constants.appStatus.withdrawn.value,
    constants.appStatus.needInfoProcurement.value,
    constants.appStatus.needInfo.value,
    constants.appStatus.denied.value,
    constants.appStatus.inProgress.value,
  ];
  const validAssignAdminList = [constants.appStatus.submitted.value];
  const validInfoRequiredAppList = [constants.appStatus.underReview.value, constants.appStatus.resubmitted.value];
  const validProcurementReviewList = [constants.appStatus.underReview.value, constants.appStatus.resubmitted.value];
  const validInfoRequiredProcurementList = [constants.appStatus.procurementReview.value];
  const validApprovePaymentList = [constants.appStatus.procurementReview.value];
  const validOrderProcessedList = [constants.appStatus.approved.value];
  const validInvoiceSentList = [constants.appStatus.orderProcessed.value];
  const validPaidList = [constants.appStatus.invoiceSent.value];
  const validSyncList = [constants.appStatus.paid.value];
  const validIssueBadgeList = [constants.appStatus.paid.value];
  const validDenyList = [
    constants.appStatus.underReview.value,
    constants.appStatus.resubmitted.value,
    constants.appStatus.procurementReview.value,
    constants.appStatus.approved.value,
    constants.appStatus.orderProcessed.value,
    constants.appStatus.invoiceSent.value,
  ];

  const enableAdminButton = (validStatuses) => {
    return _.includes(validStatuses, application.statusId);
  };

  const changeStatus = async (status) => {
    const url = `/api/admin/applications/status/${application.id}/${status}`;
    await makeRequest('post', url);
    await mutate(`/api/admin/applications/${application.id}`);
    history.push(`/admin/application/${application.id}/status`);
  };

  const assignToAdmin = async () => {
    if (!adminInputValue.trim().length) {
      return;
    }

    const url = `/api/admin/applications/assigntoadmin/${application.id}/${adminInputValue}`;
    try {
      await makeRequest('post', url);
      setAdminInputValue('');
      setShowAdminInput(false);
      await mutate(`/api/admin/applications/${application.id}`);
      setError('');
      history.push(`/admin/application/${application.id}/status`);
    } catch (error) {
      setError('Invalid Admin.');
      console.log(error);
    }
  };

  const onSyncStatusSetup = () => {
    try {
      makeRequest('get', `/api/admin/invoices/app/${application.id}`).then((data) => {
        if (data && data !== '') setInvoice(data);
        if (invoice.statusId !== 2) {
          setSyncATPModal(constants.appStatus.paid);
        } else if (enableAdminButton(validPaidList)) {
          setModalInfo(constants.appStatus.paid);
        }
      });
    } catch (err) {
      // setErrors(err);
    }
  };

  const handleSaveInvoice = async (invoice) => {
    setInvoice(invoice);
    setSyncATPModal(null);
    if (enableAdminButton(validPaidList)) {
      setModalInfo(constants.appStatus.paid);
    }
  };

  return (
    <div>
      {/* MODALS */}
      {selectedApp && (
        <AssignProviderNumberModal
          application={selectedApp}
          onSuccess={async () => {
            await revalidateApp();
            setSelectedApp(false);
            if (enableAdminButton(validSyncList) || enableAdminButton(validPaidList)) {
              onSyncStatusSetup();
            } else if (enableAdminButton(validAssignAdminList)) {
              setShowAdminInput(!showAdminInput);
              setAdminInputValue('');
            }
          }}
          onClose={() => setSelectedApp(false)}
        />
      )}
      {modalInfo && (
        <ActionsModal
          onSubmit={() => changeStatus(modalInfo.value)}
          onClose={() => setModalInfo(null)}
          yesBtnColor="green-500"
          noBtnColor="red-600"
          modalText={modalInfo.modalText}
        />
      )}
      {syncATPModal && (
        <SyncATPStatusModal
          application={application}
          invoice={invoice}
          onClose={() => setSyncATPModal(null)}
          onSaveInvoice={(invoice) => handleSaveInvoice(invoice)}
        />
      )}
      {issueBadgeModal && (
        <IssueBadgeModal
          badgeModalType={constants.modalType.atp}
          application={application}
          onClose={() => setIssueBadgeModal(false)}
        />
      )}
      {syncProviderModal && (
        <SyncOperationrModal
          syncModalType={constants.modalType.atp}
          application={application}
          onClose={() => setSyncProviderModal(false)}
        />
      )}
      {/* ADMIN BUTTONS */}
      {!enableAdminButton(validDisableAllList) && (
        <div className="bg-gray-100 rounded shadow py-3 px-2">
          <div className="flex flex-col">
            {enableAdminButton(validApprovePaymentList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="green-600"
                  colorLight="green-400"
                  title="Approve for Payment"
                  fullWidth
                  textSize="lg"
                  onClick={() => setModalInfo(constants.appStatus.approved)}
                >
                  <span className="w-8 text-4xl">
                    <i className="far fa-thumbs-up" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validInfoRequiredAppList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="yellow-600"
                  colorLight="yellow-400"
                  title="Additional Info Required"
                  fullWidth
                  textSize="lg"
                  onClick={() => setModalInfo(constants.appStatus.needInfo)}
                >
                  <span className="w-8 text-4xl">
                    <i className="fas fa-file-alt" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validProcurementReviewList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="blue-600"
                  colorLight="blue-400"
                  title="Procurement Review"
                  fullWidth
                  textSize="lg"
                  onClick={() => setModalInfo(constants.appStatus.procurementReview)}
                >
                  <span className="w-8 text-4xl">
                    <i className="fas fa-search" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validInfoRequiredProcurementList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="yellow-600"
                  colorLight="yellow-400"
                  title="Additional Info Required - Procurement"
                  fullWidth
                  textSize="lg"
                  onClick={() => setModalInfo(constants.appStatus.needInfoProcurement)}
                >
                  <span className="w-8 text-4xl">
                    <i className="fas fa-file-alt" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validOrderProcessedList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="primary"
                  colorLight="primary-light"
                  title="Sales Order Processed"
                  fullWidth
                  textSize="lg"
                  onClick={() => setModalInfo(constants.appStatus.orderProcessed)}
                >
                  <span className="w-8 text-4xl">
                    <i className="fas fa-file-invoice-dollar" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validInvoiceSentList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="primary"
                  colorLight="primary-light"
                  title="Invoice Sent"
                  fullWidth
                  textSize="lg"
                  onClick={() => setModalInfo(constants.appStatus.invoiceSent)}
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
                  title="Close: Paid"
                  fullWidth
                  textSize="lg"
                  onClick={() => {
                    if (!application.providerNumber) {
                      setSelectedApp(application);
                    } else {
                      onSyncStatusSetup();
                    }
                  }}
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
            {enableAdminButton(validSyncList) && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="green-600"
                  colorLight="green-400"
                  title="Sync ATP Status"
                  fullWidth
                  textSize="lg"
                  onClick={() => {
                    if (application.providerNumber) {
                      onSyncStatusSetup();
                    } else {
                      setSelectedApp(application);
                    }
                  }}
                >
                  <span className="w-8 text-4xl">
                    <i className="fas fa-sync" />
                  </span>
                </ButtonWithIcon>
              </div>
            )}
            {enableAdminButton(validSyncList) && application.providerNumber && (
              <div className="mt-5">
                <ButtonWithIcon
                  color="green-600"
                  colorLight="green-400"
                  title="Sync Provider"
                  fullWidth
                  textSize="lg"
                  onClick={() => setSyncProviderModal(true)}
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
                  onClick={() => setModalInfo(constants.appStatus.denied)}
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
                    if (application.providerNumber) {
                      setShowAdminInput(!showAdminInput);
                      setAdminInputValue('');
                    } else {
                      setSelectedApp(application);
                    }
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
              <form className="w-full mt-4">
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
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActions;
