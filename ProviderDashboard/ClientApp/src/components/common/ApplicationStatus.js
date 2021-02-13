import React from 'react';
import moment from 'moment';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import constants, { statusLine } from '../../constants';

const formatDate = (date) => {
  return moment.utc(date).local().format('MM/DD/YYYY');
};
const formatTime = (date) => {
  return moment.utc(date).local().format('hh:mm a');
};

const ApplicationStatus = ({ application, showButton }) => {
  const status = statusLine(application.statusId);

  const validInProgressStates = [
    constants.appStatus.inProgress.value,
    constants.appStatus.needInfo.value,
    constants.appStatus.needInfoProcurement.value,
  ];
  const validUnderReviewStates = [
    constants.appStatus.submitted.value,
    constants.appStatus.resubmitted.value,
    constants.appStatus.underReview.value,
    constants.appStatus.procurementReview.value,
  ];
  const validPendingPaymentStates = [constants.appStatus.approved.value];
  const validPaymentReceivedStates = [constants.appStatus.orderProcessed.value, constants.appStatus.invoiceSent.value];
  const validFinishedStates = [constants.appStatus.paid.value];
  const validDeniedStates = [constants.appStatus.denied.value, constants.appStatus.withdrawn.value];

  const hideSubmitDateStatusList = [constants.appStatus.needInfo.value, constants.appStatus.needInfoProcurement.value];

  const showStatusInfo = (statusList) => {
    return _.includes(statusList, application.statusId);
  };

  return (
    <div className={cn('container mx-auto px-3 bg-gray-50 overflow-hidden rounded mt-5 shadow')}>
      <div className="bg-gray-200">
        <h2 className="font-semibold text-center text-lg font-agrandir py-3">{application.orgName}</h2>
      </div>
      <div className="text-white font-agrandir font-semibold py-3 text-center" style={{ backgroundColor: '#553bff' }}>
        {status}
      </div>

      <div className="py-4 px-5">
        <div className="flex justify-start">
          <div className="w-1/3 mr-4 sm:mr-8 relative">
            {application.dateCreated && (
              <div className="absolute right-0 flex flex-col" style={{ top: '3%' }}>
                <span className="font-bold text-base sm:text-xl">{formatDate(application.dateCreated)}</span>
                <span className="italic">{formatTime(application.dateCreated)}</span>
              </div>
            )}
            {!showStatusInfo(hideSubmitDateStatusList) && (application.submitDate || application.resubmitDate) && (
              <div className="absolute right-0  flex flex-col" style={{ top: '46%' }}>
                <span className="font-bold text-base sm:text-xl">
                  {formatDate(application.resubmitDate ? application.resubmitDate : application.submitDate)}
                </span>
                <span className="italic">
                  {formatTime(application.resubmitDate ? application.resubmitDate : application.submitDate)}
                </span>
              </div>
            )}
            {application.approvedDate && (
              <div className="absolute right-0 flex flex-col" style={{ top: '59%' }}>
                <span className="font-bold text-base sm:text-xl">{formatDate(application.approvedDate)}</span>
                <span className="italic">{formatTime(application.approvedDate)}</span>
              </div>
            )}
            {application.paymentReceivedDate && (
              <div className="absolute right-0 flex flex-col" style={{ top: '75%' }}>
                <span className="font-bold text-base sm:text-xl">{formatDate(application.paymentReceivedDate)}</span>
                <span className="italic">{formatTime(application.paymentReceivedDate)}</span>
              </div>
            )}
            {application.applicationResolutionDate && (
              <div className="absolute right-0 flex flex-col" style={{ top: '90%' }}>
                <span className="font-bold text-base sm:text-xl">
                  {formatDate(application.applicationResolutionDate)}
                </span>
                <span className="italic">{formatTime(application.applicationResolutionDate)}</span>
              </div>
            )}
          </div>

          <div className="app-status-img">
            {showStatusInfo(validInProgressStates) && (
              <img className="w-full h-full" src="images/TimeLine1.svg" alt="timeline status in progress" />
            )}
            {showStatusInfo(validUnderReviewStates) && (
              <img className="w-full h-full" src="images/TimeLine3.svg" alt="timeline status under review" />
            )}
            {showStatusInfo(validPendingPaymentStates) && (
              <img className="w-full h-full" src="images/TimeLine7.svg" alt="timeline status pending payment" />
            )}
            {showStatusInfo(validPaymentReceivedStates) && (
              <img className="w-full h-full" src="images/TimeLine11.svg" alt="timeline status payemnt received" />
            )}
            {showStatusInfo(validFinishedStates) && (
              <img className="w-full h-full" src="images/TimeLine9.svg" alt="timeline status finished" />
            )}
            {showStatusInfo(validDeniedStates) && (
              <img className="w-full h-full" src="images/TimeLine4.svg" alt="timeline status denied" />
            )}
          </div>

          <div className="w-1/2 ml-4 sm:ml-8 relative">
            <div className="absolute left-0 flex flex-col" style={{ top: '3%' }}>
              <div className="font-agrandir font-bold text-sm sm:text-xl md:text-2xl">Request Created</div>
              <div className="text-xs sm:text-base">A new application was started by the Applicant</div>
            </div>
            <div className="absolute left-0 flex flex-col" style={{ top: '18%' }}>
              <div className="font-agrandir font-bold text-sm sm:text-xl md:text-2xl">Application in Progress</div>
              <div className="text-xs sm:text-base">Applicant is filling out the application, pending submission</div>
            </div>
            <div className="absolute left-0 flex flex-col" style={{ top: '33.5%' }}>
              <div className="font-agrandir font-bold text-sm sm:text-xl md:text-2xl">Application Submitted</div>
              <div className="text-xs sm:text-base">Applicant has submitted the application</div>
            </div>
            <div className="absolute left-0 flex flex-col" style={{ top: '46%' }}>
              <div className="font-agrandir font-bold text-sm sm:text-xl md:text-2xl">Application Under Review</div>
              <div className="text-xs sm:text-base">Application is under review by PMI</div>
            </div>
            <div className="absolute left-0 flex flex-col" style={{ top: '59%' }}>
              <div className="font-agrandir font-bold text-sm sm:text-xl md:text-2xl">Pending Payment</div>
              <div className="text-xs sm:text-base">Application has been approved and it is pending payment</div>
            </div>
            <div className="absolute left-0 flex flex-col" style={{ top: '75%' }}>
              <div className="font-agrandir font-bold text-sm sm:text-xl md:text-2xl">Payment Received</div>
              <div className="text-xs sm:text-base">Payment has been received and it is being processed</div>
            </div>
            <div className="absolute left-0 flex flex-col" style={{ top: '90%' }}>
              <div className="font-agrandir font-bold text-sm sm:text-xl md:text-2xl">Finished</div>
              <div className="text-xs sm:text-base">
                Payment has been processed, your provider account is now active
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          {showButton && (
            <Link to={`/application/${application.id}`}>
              <ButtonWithIcon title="Open Application">
                <span className="w-6 text-xl">
                  <i className="far fa-folder-open" />
                </span>
              </ButtonWithIcon>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
