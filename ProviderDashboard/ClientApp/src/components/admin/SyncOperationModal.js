import React, { useState } from 'react';

import { makeRequest } from '../../utils/request';
import ButtonNoIcon from '../buttons/ButtonNoIcon';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import constants from '../../constants';

const SyncOperationModal = ({ application, onClose, syncModalType }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const isATP = syncModalType === constants.modalType.atp;

  const syncOperation = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setSuccess('');

    try {
      let reqUrl = '';

      if (isATP) {
        reqUrl = `/api/admin/operations/sync/provider/${application.providerNumber}`;
      } else {
        reqUrl = `/api/admin/operations/sync/instructor/${application.personId}`;
      }

      setLoading(true);
      await makeRequest('post', reqUrl);
      setLoading(false);
      setSuccess('Sync Operation Successful');
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
          <h2 className="flex-1 text-2xl p-2 font-agrandir">{isATP ? 'Sync Provider' : 'Sync Instructor'}</h2>
          <div className="flex-none p-2">
            <button className="text-3xl" onClick={onClose} type="button">
              <i className="far fa-times-circle" />
            </button>
          </div>
        </div>
        <div className="bg-white px-8 py-4">
          <div className="flex justify-center py-5">
            <span className="px-4">
              <ButtonWithIcon
                isLoading={loading}
                onClick={syncOperation}
                title={isATP ? 'Sync Provider' : 'Sync Instructor'}
              >
                <span className="w-6 text-xl">
                  <i className="fas fa-sync" />
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

export default SyncOperationModal;
