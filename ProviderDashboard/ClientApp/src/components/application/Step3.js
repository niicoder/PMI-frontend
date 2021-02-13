import React, { useState } from 'react';
import { useHistory } from 'react-router';
import _ from 'lodash';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import Dropzone from '../common/Dropzone';
import { makeFormDataRequest } from '../../utils/request';
import getEnvEndpoints from '../../config/endpoints';

const endpoints = getEnvEndpoints();

const Step3 = ({ application, onSuccess, admin }) => {
  const history = useHistory();
  const path = admin ? `/admin/application/${application.id}/step4` : `/application/${application.id}/step4`;

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

  const uploadItem = async (itemType, files) => {
    if (!application.canEdit && !application.canEditDocuments) return;

    if (checkErrors(itemType, files[0])) return;

    await makeFormDataRequest({
      url: `${endpoints.providerApiUrl}/api/Application/UploadFile/${application.id}/${itemType}`,
      method: 'post',
      data: { files: files[0] },
    });
    onSuccess();
  };

  const getDownloadUrl = (file) => {
    return `${endpoints.providerApiUrl}/api/File/Download/${file.fileRelativePath}`;
  };

  const next = () => {
    history.push(path);
  };

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">Documents</div>

        {(application.canEdit || application.canEditDocuments) && (
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
        <p className="font-agrandir">
          <span className="font-bold">NEW </span>
          ATP applicants must complete this section, regardless of course delivery method(s) offered. Submit a separate
          document for each item and name each as indicated below, where applicable. Acceptable file types include .doc,
          .docx, .pdf, and jpg. All ATP applications must be submitted in English. Supporting documentation may be
          submitted in any language other than English, however, it must be accompanied by a thorough English
          description. This description does not need to be a word-for-word translation, however, it will need to
          describe what the document is and what it contains.
        </p>

        <p className="font-agrandir font-bold mt-3">Operations and Administrative Process</p>

        <div className="flex justify-center my-5">
          <div className="w-4/5 rounded border">
            <div className="flex bg-gray-200">
              <div className="w-1/4 bg-gray-300 text-center py-3">Item A:</div>
              <div className="w-3/4 px-3 py-3">Compliance Documentation Needed</div>
            </div>

            <div className="mx-4">
              <div className="mt-3 xl:flex px-5">
                <div className="w-full xl:w-1/5 font-bold pr-3">What to Submit</div>
                <div className="w-full">
                  Submit a document that shows evidence of having been in business for at least three year.
                  Documentation could include your organization&apos;s articles of incorporation, accreditation by an
                  appropriate accrediting body, or evidence of recognized proprietorship.
                </div>
              </div>
              <div className="mt-3 xl:flex px-5">
                <div className="w-full xl:w-1/5 font-bold pr-3">Previous DA Partners</div>
                <div className="w-full">
                  In order to expedite processing of your application, please upload a copy of the signed Limited
                  Agreement.
                </div>
              </div>
              <div className="mt-3 xl:flex px-5">
                <div className="w-full xl:w-1/5 font-bold pr-3">How it is Assessed</div>
                <div className="w-full">
                  PMI will assess this item to determine whether your organization has been in business for at least
                  three calendar years preceding the date of this application.
                </div>
              </div>
              <div className="mt-3 xl:flex px-5">
                <div className="w-full xl:w-1/5 font-bold pr-3">Document File Name</div>
                <div className="w-full">
                  Name this file &quot;Item A - &quot; and then your organization&apos;s name (Ex. Item A - PMI .doc)
                </div>
              </div>
            </div>

            {(application.canEdit || application.canEditDocuments) && (
              <Dropzone
                disabled={!application.canEdit && !application.canEditDocuments}
                onDrop={(files) => uploadItem('FILE_ITEMA', files)}
              />
            )}

            {errors.FILE_ITEMA && <div className="mt-5 px-5 text-red-600">{errors.FILE_ITEMA}</div>}

            {application.itemAFiles.length > 0 && (
              <div className="mt-5 px-5">
                <div className="flex border-b border-solid border-gray-300">
                  {/* <div className="text-gray-600 border-r border-solid border-gray-300 px-3">
                    Edit
                  </div> */}
                  <div className="text-gray-600 px-3">File Name</div>
                </div>
                <div className="flex flex-col">
                  {application.itemAFiles.map((item) => (
                    <div key={item.id} className="flex font-bold items-center border-b border-solid border-gray-300">
                      {/* <div className="text-gray-600 border-r border-solid border-gray-300 py-1 px-2 ml-3">
                        <i className="far fa-times-circle text-red-600 text-2xl"></i>
                      </div> */}
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

        <br />
        <br />

        <div className="flex justify-center my-5">
          <div className="w-4/5 rounded border">
            <div className="flex bg-gray-200">
              <div className="w-1/4 bg-gray-300 text-center py-3">Item B:</div>
              <div className="w-3/4 px-3 py-3">Additional Documents</div>
            </div>

            <div className="mx-4">
              <div className="mt-3 xl:flex px-5">
                <div className="w-full xl:w-1/5 font-bold pr-3">What to Submit</div>
                <div className="w-full">
                  Submit a document that shows evidence of having provided project management training under your
                  organization name for a minimum of three years. Documentation could include, a letter from a customer,
                  a customer- completed evaluation form, or a dated invoice. Organization Resolution Process - Submit a
                  Customer Resolution Document which includes communication path for complaint and follow up/response
                  process.
                </div>
              </div>
              <div className="mt-3 xl:flex px-5">
                <div className="w-full xl:w-1/5 font-bold pr-3">How it is Assessed</div>
                <div className="w-full">
                  Submit a document that shows evidence of having provided project management training under your
                  organization name for a minimum of three years. Documentation could include, a letter from a customer,
                  a customer- completed evaluation form, or a dated invoice.
                </div>
              </div>
              {/* <div className="mt-3 flex px-5">
                <div className="w-1/5 font-bold pr-3">Document File Name</div>
                <div className="w-full">
                  Name this file "Item A - " and then your organization's name
                  (Ex. Item A - PMI .doc)
                </div>
              </div> */}
            </div>

            {(application.canEdit || application.canEditDocuments) && (
              <Dropzone
                disabled={!application.canEdit && !application.canEditDocuments}
                onDrop={(files) => uploadItem('FILE_ITEMB', files)}
              />
            )}

            {errors.FILE_ITEMB && <div className="mt-5 px-5 text-red-600">{errors.FILE_ITEMB}</div>}

            {application.itemBFiles.length > 0 && (
              <div className="mt-5 px-5">
                <div className="text-gray-600">File Name</div>
                {application.itemBFiles.map((item) => (
                  <div key={item.id} className="font-bold py-1">
                    <a
                      className="underline hover:text-primary"
                      download={getDownloadUrl(item)}
                      href={getDownloadUrl(item)}
                    >
                      {item.fileName}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center py-5">
        {(application.canEdit || application.canEditDocuments) && (
          <ButtonWithIcon onClick={next} title="Save & Move Next">
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
