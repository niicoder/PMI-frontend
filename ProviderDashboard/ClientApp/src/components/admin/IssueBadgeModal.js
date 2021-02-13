import React, { useState } from 'react';
import { makeRequest } from '../../utils/request';
import ButtonNoIcon from '../buttons/ButtonNoIcon';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import constants from '../../constants';

const IssueBadgeModal = ({ badgeModalType, application, onClose }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const issueBadge = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setSuccess('');

    try {
      let reqUrl = '';

      if (badgeModalType === constants.modalType.atp) {
        if (application.partyId == null) {
          setError('Application is missing Provider PartyId');
          return;
        }

        reqUrl = `api/admin/badges/IssueAtpBadge/${application.partyId}`;
      } else {
        reqUrl = `api/admin/badges/IssueInstructorBadge/${application.id}/${application.personId}`;
      }
      setLoading(true);
      await makeRequest('post', reqUrl);
      setLoading(false);
      setSuccess('Badge Issued Successfully');
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
          <h2 className="flex-1 text-2xl p-2 font-agrandir">Issue Badge</h2>
          <div className="flex-none p-2">
            <button className="text-3xl" onClick={onClose} type="button">
              <i className="far fa-times-circle" />
            </button>
          </div>
        </div>
        <div className="bg-white px-8 py-4">
          <div className="flex justify-center py-5">
            <span className="px-4">
              <ButtonWithIcon isLoading={loading} onClick={issueBadge} title="Issue Badge">
                <span className="w-6 text-xl">
                  <i className="fas fa-award" />
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

export default IssueBadgeModal;
