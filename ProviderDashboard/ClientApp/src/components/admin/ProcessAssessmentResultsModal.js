import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import cn from 'classnames';

import { makeRequest } from '../../utils/request';
import ButtonNoIcon from '../buttons/ButtonNoIcon';
import ButtonWithIcon from '../buttons/ButtonWithIcon';

const ProcessAssessmentResultsModal = ({ onClose }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [currentEvent, setCurrentEvent] = useState();
  const INSTRUCTOR_APPLICATION_TYPE = 2;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await makeRequest('post', `/api/instructorapplication/GetTrainingEvents`, {
          applicationTypeId: INSTRUCTOR_APPLICATION_TYPE,
        });
        setEventsData(data);
        setCurrentEvent(0);
      } catch (err) {
        console.log('error', err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const updateAttendance = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);

      await makeRequest(
        'post',
        `/api/instructorapplication/EventAssessment/${eventsData[currentEvent].vendorReference}`,
      );

      setLoading(false);

      setSuccess(
        `Event Assessment Results processed for Event ${eventsData[currentEvent].vendorReference} – 
        ${eventsData[currentEvent].name} records processed.`,
      );

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return (
    <div className="w-screen">
      <div className="md-modal md-effect md-show border-2 border-white rounded-t-sm">
        <div className="inline-flex bg-primary text-white w-full items-center">
          <h2 className="flex-1 text-2xl p-2 font-agrandir">Process Assessment Results</h2>
          <div className="flex-none p-2">
            <button className="text-3xl" onClick={onClose} type="button">
              <i className="far fa-times-circle" />
            </button>
          </div>
        </div>
        <div className="bg-white px-8 py-4">
          <div>
            <select
              name="eventsSelect"
              id="eventsSelect"
              disabled={loading}
              value={currentEvent}
              onChange={(e) => setCurrentEvent(e.target.value)}
              className={cn('form-select block w-full sm:text-sm sm:leading-5')}
            >
              {_.map(eventsData, (val, key) => (
                <option value={key} key={key}>
                  {`${val.vendorReference} -${val.name}`}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center py-5">
            <span className="px-4">
              <ButtonWithIcon isLoading={loading} onClick={updateAttendance} title="Update Assessment Results">
                <span className="w-6 text-xl">
                  <i className="fas fa-check" />
                </span>
              </ButtonWithIcon>
            </span>
            <span className="px-4">
              <ButtonNoIcon title="Cancel" onClick={() => onClose()} />
            </span>
          </div>
          <div className="flex justify-center py-2">
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
          </div>
        </div>
      </div>
      <div className="md-overlay" />
    </div>
  );
};

export default ProcessAssessmentResultsModal;
