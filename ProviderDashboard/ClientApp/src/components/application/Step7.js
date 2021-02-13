import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import Circle from '../common/Circle';
import { makeRequest } from '../../utils/request';

const Step7 = ({ application, onSuccess }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const readyToSubmit =
    application.isCriterionComplete &&
    application.isDemograhicsComplete &&
    application.isDocumentationUploadComplete &&
    application.isAgreementAndSignatureComplete &&
    application.isComplianceSignatureComplete &&
    application.isPlanSelectionComplete;

  const next = async () => {
    setLoading(true);
    await makeRequest('post', `/api/providerapplication/SubmitApplication/${application.id}`);
    setLoading(false);
    onSuccess();
    history.push(`/application`);
  };

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">Submit Application</div>
      </div>

      {!readyToSubmit && (
        <div
          className="flex items-center bg-orange-100 border-l-4 border-orange-500 text-orange-700 text-sm font-semibold px-4 py-3 mx-12 mt-4"
          role="alert"
        >
          <svg className="fill-current w-4 h-4 mr-2" viewBox="0 0 20 20">
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <p>You are missing step(s) before you can submit.</p>
        </div>
      )}

      <div className="flex justify-center">
        <div className="w-1/2 py-4">
          <div className="flex justify-start mt-5">
            <Circle isChecked={application.isCriterionComplete} />
            <span className="font-bold text-lg ml-2">Step 01: Criterion</span>
          </div>

          <div className="flex justify-start mt-5">
            <Circle isChecked={application.isDemograhicsComplete} />
            <span className="font-bold text-lg ml-2">Step 02: Demographics / Organization Information</span>
          </div>

          <div className="flex justify-start mt-5">
            <Circle isChecked={application.isDocumentationUploadComplete} />
            <span className="font-bold text-lg ml-2">Step 03: Documents</span>
          </div>

          <div className="flex justify-start mt-5">
            <Circle isChecked={application.isAgreementAndSignatureComplete} />
            <span className="font-bold text-lg ml-2">Step 04: Agreement &amp; Signature</span>
          </div>

          <div className="flex justify-start mt-5">
            <Circle isChecked={application.isComplianceSignatureComplete} />
            <span className="font-bold text-lg ml-2">Step 05: Contact Signatures</span>
          </div>

          <div className="flex justify-start mt-5">
            <Circle isChecked={application.isPlanSelectionComplete} />
            <span className="font-bold text-lg ml-2">Step 06: Choose Plan</span>
          </div>
        </div>
      </div>

      {readyToSubmit && (application.canEdit || application.canEditDocuments) && (
        <div className="flex justify-center py-5">
          <ButtonWithIcon isLoading={loading} onClick={next} title="Submit Application">
            <span className="w-6 text-xl">
              <i className="far fa-paper-plane" />
            </span>
          </ButtonWithIcon>
        </div>
      )}

      <div className="flex flex-col justify-center py-2 px-12">
        <div className="font-bold mb-2">Authorized Training Partner Support Contact Information</div>
        <div>
          <p>
            <span className="font-bold">Email: </span>
            <a className="text-primary" href="mailto:atpsupport@pmi.org">
              atpsupport@pmi.org
            </a>
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold">Phone: </span>
            +1-610-356-4600
          </p>
        </div>
        <div className="mt-2">
          <p className="font-bold">Project Management Institute Attention:</p>
          <p>Authorized Training Partner Support</p>
          <p>14 Campus Boulevard Newtown Square,</p>
          <p>PA 19073-3299 USA</p>
        </div>
      </div>

      <div className="flex flex-col justify-center py-2 px-12">
        <div className="font-bold mb-2">What to Expect from PMI</div>
        <div>
          <p>
            <span className="font-bold">Approval: </span>
            If approved, you will receive a welcome e-mail with further instructions on how to maximize the benefits
            associated with the Authorized Training Partner designation.
          </p>
          <p>
            <span className="font-bold">Rejection: </span>
            If rejected, you will have 30 calendar days to appeal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step7;
