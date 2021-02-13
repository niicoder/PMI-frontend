import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import cn from 'classnames';
import Select from 'react-select';
import moment from 'moment';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import { makeRequest } from '../../utils/request';
import constants from '../../constants';

const formatDate = (date) => {
  return moment.utc(date).local().format('MM/DD/YYYY');
};

const Step4 = ({ application, onSuccess, admin, isInstructor }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [events, setEvents] = useState(null);
  const [modalityFilters, setModalityFilters] = useState(null);
  const [error, setError] = useState('');

  const path = admin
    ? `/admin/pmp/application/${application.id}/step5`
    : `/instructor/pmp/application/${application.id}/step5`;

  const [currentModality, setCurrentModality] = useState([]);

  const canEdit =
    (isInstructor && application.statusId === constants.instructorAppStatus.eligibleForTraining.statusId) ||
    (admin && application.statusId === constants.instructorAppStatus.eligibleForTraining.statusId);

  const waitingReview =
    !canEdit &&
    (application.statusId === constants.instructorAppStatus.submitted.statusId ||
      application.statusId === constants.instructorAppStatus.inReview.statusId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await makeRequest('get', `/api/instructorapplication/GetModalities`);
        setModalityFilters(
          list.map(({ id, value }) => ({
            label: value,
            value: id,
          })),
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTableLoading(true);
    makeRequest('post', `/api/instructorapplication/GetTrainingEvents`, {
      applicationTypeId: application.applicationTypeId,
      modalityId: currentModality.length === 0 ? null : currentModality.map(({ value }) => value),
    })
      .then((data) => {
        let updatedData = data;
        if (application.trainingEventRegistrations && application.trainingEventRegistrations.length > 0) {
          const { eventId } = application.trainingEventRegistrations[0];
          updatedData = data.map((item) => {
            if (item.id === eventId) {
              return { ...item, checked: true };
            }
            return item;
          });
        }
        setEvents(updatedData);
        setTableLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setTableLoading(false);
      });
  }, [modalityFilters, currentModality]);

  const selectEvent = (eventId) => {
    const newEvents = events.map((e) => {
      if (eventId === e.id) {
        return { ...e, checked: true };
      }
      return { ...e, checked: false };
    });

    setEvents(newEvents);
  };

  const next = async () => {
    const selectedEvent = events.find((e) => e.checked === true);
    if (!selectedEvent) return;

    setLoading(true);
    try {
      await makeRequest('post', `/api/instructorapplication/RegisterTrainingEvent`, {
        applicationId: application.id,
        referenceId: selectedEvent.vendorReference,
      });
    } catch (err) {
      setLoading(false);
      setError(err);
      return;
    }
    setLoading(false);

    onSuccess();

    history.push(path);
  };

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">Select Training</div>

        {canEdit && (
          <div className="text-right" style={{ width: '350px' }}>
            <ButtonWithIcon isLoading={loading} onClick={next} title="Select Training & Move Next">
              <span className="w-6 text-xl">
                <i className="fas fa-edit" />
              </span>
            </ButtonWithIcon>
          </div>
        )}
      </div>

      <div className="px-8 pt-4">
        <Select
          value={currentModality}
          isMulti
          name="modalityFilter"
          options={modalityFilters}
          onChange={(value) => setCurrentModality(value || [])}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Modality"
        />
      </div>

      {events ? (
        <div className="px-8 py-4 overflow-x-scroll">
          {!admin && waitingReview && (
            <div className="mb-2 text-sm text-red-600 ">
              * When your application is marked Eligible For Training, you will be able to select a class
            </div>
          )}

          <div className="align-middle inline-block min-w-full overflow-y-auto p-3" style={{ height: '400px' }}>
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
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Register
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((item, index) => (
                  <tr
                    key={item.id}
                    className={cn({
                      'bg-white': index % 2 === 1,
                      'bg-gray-50': index % 2 === 0,
                      'border-b border-solid border-gray-500': events.length !== index + 1,
                    })}
                  >
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {formatDate(item.startDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {formatDate(item.endDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      <input
                        type="checkbox"
                        disabled={!canEdit}
                        checked={item.checked || ''}
                        onChange={() => selectEvent(item.id)}
                        className={cn('form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out mt-1')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {error !== '' && <div className="text-red-600 p-2">{error}</div>}
          </div>
        </div>
      ) : (
        <div className="px-8 py-4 overflow-x-scroll">
          <div className="mb-2 text-sm ">{tableLoading ? 'Loading...' : 'No events avaialble'}</div>
        </div>
      )}

      <div className="flex justify-center py-5">
        {canEdit && (
          <ButtonWithIcon isLoading={loading} onClick={next} title="Select Training & Move Next">
            <span className="w-6 text-xl">
              <i className="fas fa-edit" />
            </span>
          </ButtonWithIcon>
        )}
      </div>
    </div>
  );
};

export default Step4;
