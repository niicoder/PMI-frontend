import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import { mutate } from 'swr';
import useQuery from '../../hooks/useQuery';
import { makeRequest } from '../../utils/request';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import ApplicationInfo from './ApplicationInfo';
import ApplyVoucherModal from './ApplyVoucherModal';
import AddInstructorModal from './AddInstructorModal';
import ActionModal from '../common/ActionsModal';
import constants, { instructorStatusById, getApplicationTypeById } from '../../constants';

const formatDate = (date) => {
  return date ? moment.utc(date).local().format('MM/DD/YYYY h a') : 'No Date';
};

const InstructorApplications = ({ providerId, pmpT3Vouchers }) => {
  const hideAddVoucherList = [
    constants.instructorAppStatus.registrationInitiated.statusId,
    constants.instructorAppStatus.invoiced.statusId,
    constants.instructorAppStatus.awaitingTraining.statusId,
    constants.instructorAppStatus.inTraining.statusId,
    constants.instructorAppStatus.trainingComplete.statusId,
    constants.instructorAppStatus.closedWithdrawn.statusId,
    constants.instructorAppStatus.closedDenied.statusId,
    constants.instructorAppStatus.closedFailed.statusId,
    constants.instructorAppStatus.closedPassed.statusId,
  ];
  const history = useHistory();
  const [instructors, setInstructors] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [keyword, setKeyword] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchWord, setSearchWord] = useState('');

  // **** Apply Voucher ****
  const [showApplyVoucher, setShowApplyVoucher] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(-1);
  // **** END ****

  // **** Show Info ****
  const [showInfo, setShowInfo] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  // **** END ****

  const query = useQuery();

  const page = Number(query.get('page')) || 1;

  const changePage = (direction) => {
    const path = `/provider?page=${direction === 'next' ? page + 1 : page - 1}`;
    history.push(path);
  };

  const reloadData = () => {
    const filters = {
      page,
      pageSize: 4,
      keyword,
      providerId,
    };

    makeRequest('post', `/api/instructor/byprovider`, filters)
      .then((data) => {
        setInstructors(
          data.results.map((item) => ({
            id: item.id,
            instructorId: item.id,
            instructorName: `${item.firstName} ${item.lastName}`,
            qualifications: item.instructorQualification,
            applications: item.instructorApplications,
          })),
        );
        setPageCount(data.pageCount);
      })
      .catch(() => setInstructors([]));
  };

  useEffect(() => {
    reloadData();
  }, [page, keyword]);

  return (
    <div>
      {showDeleteModal && (
        <ActionModal
          modalText="Are you sure?"
          onClose={() => setShowDeleteModal(false)}
          onSubmit={async () => {
            await makeRequest('post', `/api/instructor/remove`, {
              parentId: providerId,
              childId: selectedInstructor,
            })
              .then((result) => {
                if (result) {
                  mutate(`/api/voucher/byprovider/${providerId}`);
                  reloadData();
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        />
      )}
      {showAddModal && (
        <AddInstructorModal
          providerId={providerId}
          setInstructors={setInstructors}
          onClose={() => {
            setShowAddModal(false);
          }}
          reloadData={reloadData}
        />
      )}
      {showApplyVoucher && selectedInstructor !== -1 && (
        <ApplyVoucherModal
          instructors={instructors}
          providerId={providerId}
          instructorId={selectedInstructor}
          applicationId={selectedApplication.id}
          onClose={() => {
            setShowApplyVoucher(false);
            setSelectedInstructor(-1);
          }}
        />
      )}
      {showInfo && selectedApplication && (
        <ApplicationInfo
          onClose={() => {
            setShowInfo(false);
            setSelectedApplication(null);
          }}
        >
          <p className="mb-4">
            <b>Name: </b>
            {getApplicationTypeById(selectedApplication.applicationTypeId)}
          </p>
          <p className="mb-4">
            <b>Status: </b>
            {instructorStatusById(selectedApplication.statusId).title}
          </p>
          <p className="mb-4">
            <b>Created At: </b>
            {formatDate(selectedApplication.dateCreated)}
          </p>
          <div className="mb-4">
            <b>Assigned Classes: </b>
            {selectedApplication.trainingEventRegistrations ? (
              <div className="mt-1">
                {selectedApplication.trainingEventRegistrations.map(({ isActive, id, eventName, registrationDate }) => {
                  return isActive ? (
                    <div key={id}>
                      {eventName}
                      <>:</>
                      {formatDate(registrationDate)}
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              'No'
            )}
          </div>
        </ApplicationInfo>
      )}
      <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
        <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
          <div className="font-semibold text-lg font-agrandir py-3 pr-4">Instructors</div>
        </div>
        <div className="py-5 px-3">
          <div className="flex flex-row justify-between mb-8">
            <div className="mr-3">
              <ButtonWithIcon title="Add Instructor" onClick={() => setShowAddModal(true)} size={2}>
                <span className="w-6 text-xl">
                  <i className="fas fa-plus" />
                </span>
              </ButtonWithIcon>
            </div>
            <div className="lg:mt-0 mt-2">
              <button
                className="flex-shrink-0 bg-primary-light border-primary-light text-sm border-4 text-white py-1 px-2 rounded-r-md float-right"
                type="button"
                onClick={() => setKeyword(searchWord)}
              >
                Search
              </button>
              <input
                className="appearance-none border rounded-l-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline float-right"
                type="search"
                placeholder="Search"
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                  if (e.target.value === '') {
                    setKeyword('');
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setKeyword(searchWord);
                  }
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 justify-center mb-8">
            {instructors.map((item) => (
              <div
                key={item.id}
                className="flex flex-col app-tile m-auto rounded border-2 border-gray-500 border-solid w-full mb-4 h-full"
              >
                <div className="app-tile-title">
                  <b>{item.instructorName}</b>
                </div>
                <div className="ml-8 mb-8">
                  <div className="mb-4">
                    <b>Qualifications:</b>
                    <ul className="pl-8 list-disc">
                      {item.qualifications &&
                        item.qualifications.map((qualification) => (
                          <li key={`${item.id}_${qualification.id}`}>
                            {`${qualification.name} - ${qualification.status}`}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <b>Applications:</b>
                    <ul className="pl-8 list-disc">
                      {item.applications &&
                        item.applications
                          .filter((application) => application.isActive === true)
                          .map((application) => {
                            const showApplyVoucherButton =
                              application.isActive &&
                              !pmpT3Vouchers.find((item) => item.applicationId === application.id) &&
                              hideAddVoucherList.indexOf(application.statusId) === -1;
                            return (
                              <li key={`${item.id}_${application.id}`}>
                                <button
                                  className="app-tile-link"
                                  onClick={() => {
                                    setSelectedApplication(application);
                                    setShowInfo(true);
                                  }}
                                  type="button"
                                >
                                  {getApplicationTypeById(application.applicationTypeId)}
                                </button>
                                {` - ${instructorStatusById(application.statusId).title}`}
                                <div>
                                  - Assigned Class:&nbsp;
                                  {application.trainingEventRegistrations ? (
                                    <div className="ml-2">
                                      {application.trainingEventRegistrations.map(
                                        ({ isActive, id, eventName, registrationDate }) => {
                                          return isActive ? (
                                            <div key={id}>
                                              {eventName}
                                              <>:</>
                                              {formatDate(registrationDate)}
                                            </div>
                                          ) : null;
                                        },
                                      )}
                                    </div>
                                  ) : (
                                    'No'
                                  )}
                                </div>

                                {pmpT3Vouchers.find((item) => item.applicationId === application.id) && (
                                  <div>
                                    - Assigned Voucher:&nbsp;
                                    <div className="ml-2">
                                      {pmpT3Vouchers.find((item) => item.applicationId === application.id).id}
                                    </div>
                                  </div>
                                )}

                                {showApplyVoucherButton && (
                                  <button
                                    className="app-tile-link"
                                    onClick={() => {
                                      setSelectedInstructor(item.id);
                                      setSelectedApplication(application);
                                      setShowApplyVoucher(true);
                                    }}
                                    type="button"
                                  >
                                    Apply Voucher
                                  </button>
                                )}
                              </li>
                            );
                          })}
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedInstructor(item.id);
                      setShowDeleteModal(true);
                    }}
                    className="app-tile-link"
                    type="button"
                  >
                    Remove Instructor
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 flex justify-between sm:justify-end">
            {page > 1 && (
              <button
                onClick={() => changePage('prev')}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                type="button"
              >
                Previous
              </button>
            )}
            {page < pageCount && (
              <button
                onClick={() => changePage('next')}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                type="button"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorApplications;
