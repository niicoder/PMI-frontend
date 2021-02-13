import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { mutate } from 'swr';
import Dropzone from '../common/Dropzone';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import { makeRequest, makeFormDataRequest } from '../../utils/request';
import getEnvEndpoints from '../../config/endpoints';

import constants from '../../constants';

const endpoints = getEnvEndpoints();

const Step1 = ({ application, onSuccess, admin, isInstructor }) => {
  const history = useHistory();

  const path = admin
    ? `/admin/pmp/application/${application.id}/step2`
    : `/instructor/pmp/application/${application.id}/step2`;

  const canEdit =
    isInstructor &&
    (application.statusId === constants.instructorAppStatus.pending.statusId ||
      application.statusId === constants.instructorAppStatus.additionalInformationRequired.statusId);

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const data = await makeRequest('get', `api/pmpdocument/GetInstructorDocuments/${application.id}`);
      setDocs(data);
    };

    fetchDocs();
  }, [application]);

  const [errors, setErrors] = useState({});

  const checkErrors = (key, file) => {
    const approvedFileTypes = ['doc', 'docx', 'jpg', 'jpeg', 'pdf', 'csv', 'xlsx'];
    const fileType = file.name.split('.').pop().toLowerCase();

    if (!_.includes(approvedFileTypes, fileType)) {
      setErrors({
        ...errors,
        [key]: 'File has to be of type .doc, .docx, .pdf, .csv, .xlsx, or .jpg',
      });
      return true;
    }
    setErrors({
      ...errors,
      [key]: false,
    });
    return false;
  };

  const getDownloadUrl = (file) => {
    return `${endpoints.providerApiUrl}/api/File/Download/${file.fileRelativePath}`;
  };

  const uploadItem = async (itemType, files) => {
    if (checkErrors(itemType, files[0]) || !canEdit) return;

    const res = await makeFormDataRequest({
      url: `/api/pmpdocument/UploadInstructorDocument/${application.id}/${itemType}`,
      method: 'post',
      data: { files: files[0] },
    });

    setDocs([...docs, res]);

    await makeRequest('post', '/api/pmpapplicationrequirement/UpdateApplicationRequirement', {
      key: constants.requirements.documentUploaded,
      satisfied: true,
      applicationID: application.id,
    });

    onSuccess();
  };

  const onDelete = async (filePath) => {
    if (!canEdit) return;

    const didDelete = await makeRequest('delete', `/api/pmpdocument/DeleteInstructorDocument/${filePath}`);

    await mutate(`/api/pmpdocument/GetInstructorDocuments/${application.id}`);

    if (didDelete) {
      const newDocs = docs.filter((item) => item.fileRelativePath !== filePath);
      setDocs(newDocs);
    }
  };

  const next = () => {
    history.push(path);
  };

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">Proof of experience</div>

        {canEdit && (
          <div className="text-right" style={{ width: '350px' }}>
            <ButtonWithIcon onClick={() => next()} title="Save & Move Next">
              <span className="w-6 text-xl">
                <i className="fas fa-edit" />
              </span>
            </ButtonWithIcon>
          </div>
        )}
      </div>

      <div className="px-8 py-4">
        <div>
          Please add your resume/CV which includes at least one (1) year of Agile experience and/or Agile certification.
        </div>

        <div className="flex justify-center my-5">
          <div className="w-4/5 rounded border">
            <Dropzone onDrop={(files) => uploadItem('PMP_T3_APP_EXPERIENCE', files)} />

            {errors.PMP_T3_APP_EXPERIENCE && (
              <div className="mt-5 px-5 text-red-600">{errors.PMP_T3_APP_EXPERIENCE}</div>
            )}

            {docs.length > 0 && (
              <div className="mt-5 px-5">
                <div className="flex border-b border-solid border-gray-300">
                  {canEdit && <div className="text-gray-600 border-r border-solid border-gray-300 px-3">Edit</div>}
                  <div className="text-gray-600 px-3">File Name</div>
                </div>
                <div className="flex flex-col">
                  {docs.map((item) => (
                    <div key={item.id} className="flex font-bold items-center border-b border-solid border-gray-300">
                      {canEdit && (
                        <div
                          className="text-gray-600 border-r border-solid border-gray-300 py-1 px-2 ml-3 cursor-pointer"
                          onClick={() => onDelete(item.fileRelativePath)}
                        >
                          <i className="far fa-times-circle text-red-600 text-2xl" />
                        </div>
                      )}
                      <div className="py-1 px-2">
                        <a
                          className="underline hover:text-primary"
                          download={getDownloadUrl(item)}
                          href={getDownloadUrl(item)}
                        >
                          {item.fileName}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
