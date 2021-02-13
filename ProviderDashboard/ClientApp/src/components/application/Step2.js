import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import ApplicationForm from '../forms/ApplicationForm';

const Step2 = ({ application, onSuccess, admin }) => {
  const [submitForm, setSubmitForm] = useState(false);
  const history = useHistory();
  const path = admin ? `/admin/application/${application.id}/step3` : `/application/${application.id}/step3`;

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">
          <span className="font-bold">Demographics</span>
          <>: Organization information</>
        </div>

        {application.canEdit && (
          <div className="text-right" style={{ width: '350px' }}>
            <ButtonWithIcon onClick={() => setSubmitForm(true)} title="Save & Move Next">
              <span className="w-6 text-xl">
                <i className="fas fa-edit" />
              </span>
            </ButtonWithIcon>
          </div>
        )}
      </div>

      <div className="px-8 py-4">
        <ApplicationForm
          application={application}
          submitForm={submitForm}
          submitText="Save & Move Next"
          fullForm
          admin={admin}
          onSuccess={() => {
            onSuccess();
            history.push(path);
          }}
        />
      </div>
    </div>
  );
};

export default Step2;
