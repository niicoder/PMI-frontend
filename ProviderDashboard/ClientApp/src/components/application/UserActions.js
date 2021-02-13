import React, { useState } from 'react';
import { mutate } from 'swr';
import { useHistory } from 'react-router';
import _ from 'lodash';

import constants from '../../constants';
import { makeRequest } from '../../utils/request';

import ButtonWithIcon from '../buttons/ButtonWithIcon';
import ActionsModal from '../common/ActionsModal';

const UserActions = ({ application }) => {
  const history = useHistory();
  const [modalInfo, setModalInfo] = useState(null);

  const validWidthdrawlList = [constants.appStatus.submitted.value, constants.appStatus.resubmitted.value];

  const enableUserButton = (validStatuses) => {
    return _.includes(validStatuses, application.statusId);
  };

  const withdrawApplication = async () => {
    const url = `/api/providerapplication/withdraw/${application.id}`;
    await makeRequest('post', url);
    await mutate(`/api/providerapplication/${application.id}`);
    history.push(`/application`);
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
                color="red-800"
                colorLight="red-600"
                title="Withdraw Application"
                fullWidth
                textSize="lg"
                onClick={() => setModalInfo(constants.appStatus.withdrawn)}
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
