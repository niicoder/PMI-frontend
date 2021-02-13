import React, { useState } from 'react';
import { useHistory } from 'react-router';
import _ from 'lodash';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import InputGroup from '../common/InputGroup';
import { makeRequest } from '../../utils/request';
import { lengthValidator } from '../../utils/validate';

const validators = {
  adminContactSignature: (val) => (val ? null : "This field can't be blank"),
  complianceContactSignature: (val) => (val ? null : "This field can't be blank"),
};

const maxLengths = {
  adminContactSignature: 255,
  complianceContactSignature: 255,
};

const Step5 = ({ application, onSuccess, admin }) => {
  const history = useHistory();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    adminContactSignature: application.adminContactSignature || '',
    complianceContactSignature: application.complianceContactSignature || '',
  });

  const path = admin ? `/admin/application/${application.id}/step6` : `/application/${application.id}/step6`;

  const revalidateField = (key, val) => {
    const result = validators[key](val);
    setErrors({ ...errors, [key]: result });
  };
  const onTextChange = (e) => {
    if (errors[e.target.name]) {
      revalidateField(e.target.name, e.target.value);
    }
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};
    _.forEach(fields, (val, key) => {
      const result = lengthValidator(val, maxLengths[key]);
      if (result) err[key] = result;
    });
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
    await makeRequest('post', `/api/providerapplication/ComplianceAgreeAndSign/${application.id}`, fields);
    setLoading(false);
    onSuccess();

    history.push(path);
  };

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">
          Item C - Administrative & Compliance Contacts
        </div>

        {application.canEdit && (
          <div className="text-right" style={{ width: '350px' }}>
            <ButtonWithIcon isLoading={loading} onClick={next} title="Agree, Sign & Move Next">
              <span className="w-6 text-xl">
                <i className="fas fa-edit" />
              </span>
            </ButtonWithIcon>
          </div>
        )}
      </div>

      <div className="px-8 py-4">
        <p className="font-bold">Electronic signatures are needed for the Primary and Compliance contacts.</p>

        <div className="mt-5">
          <div className="flex items-center border-gray-300 border-solid border-b">
            <div className="w-1/5 font-bold">What to Submit</div>
            <div className="w-full p-5 border-gray-300 border-solid border-l">
              <p>
                The primary administrative contact has the authority and responsibility to administer reports,
                documentation, and communication requested from the PMI ATP Program team in the event information is
                requested.
              </p>

              <div className="mt-3">
                <InputGroup
                  onChange={onTextChange}
                  value={fields.adminContactSignature}
                  isRequired
                  label="Signature of primary contact"
                  name="adminContactSignature"
                  error={errors.adminContactSignature}
                  disabled={!application.canEdit}
                />
              </div>

              <p className="mt-5">
                The compliance contact responsible for ensuring that your organization has and follows a clear, and
                measurable process to ensure that all PMI ATP Program criteria are met at all times during program
                tenure. This person can be the same as the primary administrative contact.
              </p>

              <div className="mt-3">
                <InputGroup
                  onChange={onTextChange}
                  value={fields.complianceContactSignature}
                  isRequired
                  label="Signature of compliance contact"
                  name="complianceContactSignature"
                  error={errors.complianceContactSignature}
                  disabled={!application.canEdit}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <div className="w-1/5 font-bold">How it is assessed</div>
            <div className="w-full p-5 border-gray-300 border-solid border-l">
              <p>PMI will assess this item to ensure both contacts have signed above.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center py-5">
        {application.canEdit && (
          <ButtonWithIcon isLoading={loading} onClick={next} title="Agree, Sign & Move Next">
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
