import _ from 'lodash';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import AgreementCheckbox from '../common/AgreementCheckbox';
import { makeRequest } from '../../utils/request';
import constants, { getRequirementByKey } from '../../constants';

const validators = {
  agreement01Checked: (val) => (val ? null : 'You need to agree to this point to proceed'),
};

const Step2 = ({ application, onSuccess, admin, isInstructor }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const path = admin
    ? `/admin/pmp/application/${application.id}/step3`
    : `/instructor/pmp/application/${application.id}/step3`;

  const canEdit = isInstructor && application.statusId === constants.instructorAppStatus.pending.statusId;

  const [fields, setFields] = useState({
    agreement01Checked: getRequirementByKey(application, constants.requirements.agreementChecked),
  });

  const validate = () => {
    const err = {};

    _.forEach(validators, (fn, key) => {
      const result = fn(fields[key]);
      if (result) err[key] = result;
    });
    return { isValid: Object.keys(err).length === 0, err };
  };

  // eslint-disable-next-line consistent-return
  const next = async () => {
    const { isValid, err } = validate();
    if (!isValid) return setErrors(err);

    setLoading(true);
    await makeRequest('post', `/api/instructorapplication/AgreeAndSign/${application.id}`, fields);
    setLoading(false);
    onSuccess();
    history.push(path);
  };

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">
          <span className="font-bold">Agreement</span>
        </div>

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
        <form onSubmit={next}>
          <p className="font-bold">
            You must agree to all items below and must check every box. If every box is not checked the application will
            be returned.
          </p>

          <AgreementCheckbox id="agreement01Checked" fields={fields} setFields={setFields} disabled={!canEdit}>
            In checking this box, I confirm awareness that all PMI Members are bound by the PMI Code of Ethics. I
            confirm that I have read and understand the ATP Program Requirements. I confirm awareness that PMI Chapter
            Leaders may not deliver certification exam prep under the ATP Program. I confirm that I am not a Chapter
            Leader, and I will not volunteer for the chapter while I am an ATP Trainer.
          </AgreementCheckbox>
          {errors.agreement01Checked && <p className="mt-2 text-sm text-red-600">{errors.agreement01Checked}</p>}
        </form>

        <div className="mt-2 text-sm leading-5 text-gray-900">
          Policy Manual for PMI Chapters, 2.1 Definition of a Chapter Leader: A Chapter Leader is a volunteer who is in
          a chapter elected or appointed position
        </div>

        <div className="flex justify-center py-5">
          {canEdit && (
            <ButtonWithIcon isLoading={loading} onClick={next} title="Save">
              <span className="w-6 text-xl">
                <i className="fas fa-edit" />
              </span>
            </ButtonWithIcon>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;
