import React from 'react';
import { useHistory } from 'react-router';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import Circle from '../common/Circle';
import { makeRequest } from '../../utils/request';
import constants, { getRequirementByKey } from '../../constants';

const Step3 = ({ application, onSuccess, admin, isInstructor }) => {
  const history = useHistory();
  const path = admin
    ? `/admin/pmp/application/${application.id}/step4`
    : `/instructor/pmp/application/${application.id}/step4`;

  const next = async () => {
    await makeRequest('post', `/api/instructorapplication/SubmitApp/${application.id}`);

    onSuccess();

    history.push(path);
  };

  const canEdit =
    isInstructor &&
    (application.statusId === constants.instructorAppStatus.pending.statusId ||
      application.statusId === constants.instructorAppStatus.additionalInformationRequired.statusId);

  const reqsMet =
    getRequirementByKey(application, constants.requirements.documentUploaded) &&
    getRequirementByKey(application, constants.requirements.documentUploaded);

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">Submit Application</div>

        {canEdit && reqsMet && (
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
        <div className="mt-4 flex flex-row items-center">
          <Circle isChecked={getRequirementByKey(application, constants.requirements.documentUploaded)} />
          <div className="ml-4">Proof of experience</div>
        </div>
        <div className="mt-4 flex flex-row items-center">
          <Circle isChecked={getRequirementByKey(application, constants.requirements.agreementChecked)} />
          <div className="ml-4">Agreement</div>
        </div>
      </div>

      <div className="flex justify-center py-5">
        {canEdit && reqsMet && (
          <ButtonWithIcon onClick={next} title="Submit Application">
            <span className="w-6 text-xl">
              <i className="fas fa-edit" />
            </span>
          </ButtonWithIcon>
        )}
      </div>
    </div>
  );
};

export default Step3;
