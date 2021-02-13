import React from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';
import useSWR from 'swr';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import { fetcher } from '../../utils/request';
import constants from '../../constants';

const formatDate = (date) => {
  return moment.utc(date).local().format('MM/DD/YYYY');
};

const Step5 = ({ application, onSuccess, admin, isInstructor }) => {
  const history = useHistory();

  const path = admin
    ? `/admin/pmp/application/${application.id}/step6`
    : `/instructor/pmp/application/${application.id}/step6`;

  const canEdit =
    isInstructor &&
    (application.statusId === constants.instructorAppStatus.awaitingTraining.statusId ||
      application.statusId === constants.instructorAppStatus.inTraining.statusId);

  const waitingPayment =
    !canEdit &&
    (application.statusId === constants.instructorAppStatus.registrationInitiated.statusId ||
      application.statusId === constants.instructorAppStatus.invoiced.statusId);

  const eventRegistration =
    application.trainingEventRegistrations && application.trainingEventRegistrations.length > 0
      ? application.trainingEventRegistrations[0]
      : null;

  const { data: eventLink } = useSWR(
    eventRegistration
      ? `/api/instructorapplication/GetTrainingEventLoginLink/${application.id}/${eventRegistration.id}`
      : null,
    fetcher,
  );

  const submit = async () => {
    if (eventRegistration && eventRegistration.event && eventLink) {
      onSuccess();

      window.open(eventLink, '_blank');
    }
  };

  const next = async () => {
    history.push(path);
  };

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">Attend Training</div>

        {canEdit && (
          <div className="text-right" style={{ width: '350px' }}>
            <ButtonWithIcon onClick={next} title="Save & Move Next">
              <span className="w-6 text-xl">
                <i className="fas fa-edit" />
              </span>
            </ButtonWithIcon>
          </div>
        )}
      </div>

      <div className="px-8 py-4">
        <div className="mt-4 flex flex-row items-center text-xl">Class Information</div>
        {!admin && waitingPayment && (
          <div className="mb-2 text-sm text-red-600 ">
            * You will be able to attend your class after payment has been processed
          </div>
        )}
        <div className="py-3 pr-4 overflow-x-scroll">
          {eventRegistration && eventRegistration.event ? (
            <div className="px-8 py-4 font-semibold text-lg font-agrandir">
              <div className="align-middle inline-block min-w-full overflow-y-auto p-3" style={{ maxHeight: '400px' }}>
                <table className="min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                        Name
                      </th>
                      <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                        Start Date
                      </th>
                      <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                        End Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-solid border-gray-500">
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                        {eventRegistration.event.name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                        {formatDate(eventRegistration.event.startDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                        {formatDate(eventRegistration.event.endDate)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>After registering for training, class information will appear here</div>
          )}
        </div>
      </div>

      <div className="flex justify-center py-5">
        {canEdit && eventLink && (
          <ButtonWithIcon onClick={submit} title="Attend Training">
            <span className="w-6 text-xl">
              <i className="fas fa-edit" />
            </span>
          </ButtonWithIcon>
        )}
      </div>
    </div>
  );
};

export default Step5;
