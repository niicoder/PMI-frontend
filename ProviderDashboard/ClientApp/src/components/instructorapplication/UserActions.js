import React, { useState } from 'react';
import { useHistory } from 'react-router';
import _ from 'lodash';

import constants from '../../constants';
import { makeRequest } from '../../utils/request';

import ButtonWithIcon from '../buttons/ButtonWithIcon';
import ActionsModal from '../common/ActionsModal';

const UserActions = ({ application, onSuccess }) => {
  const history = useHistory();
  const [modalInfo, setModalInfo] = useState(null);

  const validWidthdrawlList = [
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

  const enableUserButton = (validStatuses) => {
    return _.includes(validStatuses, application.statusId);
  };

  const withdrawApplication = async () => {
    const url = `/api/instructorapplication/WithdrawApplication/${application.id}`;
    await makeRequest('post', url);
    onSuccess();
    history.push(`/`);
  };

  return (
    <div>
      {/* MODALS */}
      {modalInfo && (
        <ActionsModal
          onSubmit={() => withdrawApplication()}
          onClose={() => setModalInfo(null)}
          yesBtnColor="green-500"
          noBtnColor="red-600"
          modalText={modalInfo.modalText}
        />
      )}
      {/* USER BUTTONS */}
      {enableUserButton(validWidthdrawlList) && (
        <div className="bg-gray-100 rounded shadow py-3 px-2">
          <div className="flex flex-col">
            <div className="mt-5">
              <ButtonWithIcon
                color="teal-800"
                colorLight="teal-600"
                title="Withdraw Application"
                fullWidth
                textSize="lg"
                onClick={() => setModalInfo(constants.instructorAppStatus.closedWithdrawn)}
              >
                <span className="w-8 text-4xl">
                  <i className="fas fa-file-excel" />
                </span>
              </ButtonWithIcon>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActions;
