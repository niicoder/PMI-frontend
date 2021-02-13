import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import cn from 'classnames';
import { useHistory } from 'react-router';
import { parseAsync } from 'json2csv';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { makeRequest } from '../../utils/request';
import useQuery from '../../hooks/useQuery';
import Spinner from '../common/Spinner/Spinner';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import InstructorApplicationQuickView from './InstructorApplicationQuickView';
import constants, { instructorStatusById, getApplicationTypeById, getApplicationName } from '../../constants';

import { getUserData } from '../../utils/persist';

const formatStatusLabel = (label) => {
  const formattedStr = label.toLowerCase().replace(' ', '_');
  return formattedStr;
};

const statusFilters = {
  assignTo: {
    label: 'My Assigned Applications',
    combined: true,
  },
  actionable: {
    label: 'Active Applications (Submitted, In Review, Resubmitted)',
    value: [
      constants.instructorAppStatus.submitted.statusId,
      constants.instructorAppStatus.pending.statusId,
      constants.instructorAppStatus.inReview.statusId,
    ],
    combined: true,
  },
  awaiting: {
    label: 'Awaiting ATP Action (Additional Information Required, Eligible For Trainning, Invoice Sent)',
    value: [
      constants.instructorAppStatus.additionalInformationRequired.statusId,
      constants.instructorAppStatus.eligibleForTraining.statusId,
      constants.instructorAppStatus.invoiced.statusId,
    ],
    combined: true,
  },
  all: {
    label: 'All',
    value: [],
    combined: true,
  },
  inactive: {
    label: 'Inactive (Closed - Withdrawn, Closed - Denied, Closed - Failed)',
    value: [
      constants.instructorAppStatus.closedWithdrawn.statusId,
      constants.instructorAppStatus.closedDenied.statusId,
      constants.instructorAppStatus.closedFailed.statusId,
    ],
    combined: true,
  },
  opened: {
    label: constants.instructorAppStatus.opened.title,
    value: [constants.instructorAppStatus.opened.statusId],
  },
  submitted: {
    label: constants.instructorAppStatus.submitted.title,
    value: [constants.instructorAppStatus.submitted.statusId],
  },
  pending: {
    label: constants.instructorAppStatus.pending.title,
    value: [constants.instructorAppStatus.pending.statusId],
  },
  inReview: {
    label: constants.instructorAppStatus.inReview.title,
    value: [constants.instructorAppStatus.inReview.statusId],
  },
  additionalInformationRequired: {
    label: constants.instructorAppStatus.additionalInformationRequired.title,
    value: [constants.instructorAppStatus.additionalInformationRequired.statusId],
  },
  invoiced: {
    label: constants.instructorAppStatus.invoiced.title,
    value: [constants.instructorAppStatus.invoiced.statusId],
  },
  eligibleForTraining: {
    label: constants.instructorAppStatus.eligibleForTraining.title,
    value: [constants.instructorAppStatus.eligibleForTraining.statusId],
  },
  registrationInitiated: {
    label: constants.instructorAppStatus.registrationInitiated.title,
    value: [constants.instructorAppStatus.registrationInitiated.statusId],
  },
  awaitingTraining: {
    label: constants.instructorAppStatus.awaitingTraining.title,
    value: [constants.instructorAppStatus.awaitingTraining.statusId],
  },
  inTraining: {
    label: constants.instructorAppStatus.inTraining.title,
    value: [constants.instructorAppStatus.inTraining.statusId],
  },
  trainingComplete: {
    label: constants.instructorAppStatus.trainingComplete.title,
    value: [constants.instructorAppStatus.trainingComplete.statusId],
  },
  closedPassed: {
    label: constants.instructorAppStatus.closedPassed.title,
    value: [constants.instructorAppStatus.closedPassed.statusId],
  },
  closedFailed: {
    label: constants.instructorAppStatus.closedFailed.title,
    value: [constants.instructorAppStatus.closedFailed.statusId],
  },
  closedWithdrawn: {
    label: constants.instructorAppStatus.closedWithdrawn.title,
    value: [constants.instructorAppStatus.closedWithdrawn.statusId],
  },
  closedDenied: {
    label: constants.instructorAppStatus.closedDenied.title,
    value: [constants.instructorAppStatus.closedDenied.statusId],
  },
};

const formatDateTime = (date) => {
  return moment.utc(date).local().format('MM/DD/YYYY hA');
};

const formatDuration = (start, end) => {
  const momentEnd = moment(end);
  const momentStart = moment(start);
  const diff = momentEnd.diff(momentStart);
  const dur = moment.duration(diff);
  return `${dur.days()} day(s), ${dur.hours()} hour(s), ${dur.minutes()} minute(s)`;
};

const InstructorApplicationTable = ({ forceRefreshTable }) => {
  const history = useHistory();
  const query = useQuery();

  const page = Number(query.get('page')) || 1;
  const currentStatus = query.get('status') || 'actionable';
  const isAssignedStatus = currentStatus === 'assignTo';
  const [appCount, setAppCount] = useState(0);
  const [applications, setApplications] = useState([]);
  const [quickViewIndex, setQuickViewIndex] = useState(-1);
  const [quickViewLoading, setQuickViewLoading] = useState(false);
  const [viewInactive, setViewInactive] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const allStatus = useMemo(() => {
    let statusArr = [];
    for (const key in statusFilters) {
      if (statusFilters.hasOwnProperty(key)) {
        const filter = statusFilters[key];
        if (!filter.combined) {
          statusArr = statusArr.concat(filter.value);
        }
      }
    }
    return statusArr;
  }, [statusFilters]);

  const [selectedApplicationDetails, setSelectedApplicationDetails] = useState(null);

  const getApplicationDetails = async () => {
    const app = applications.find((app) => app.id === quickViewIndex);
    setSelectedApplicationDetails(app);
    setQuickViewLoading(false);
  };

  const setFilter = (status) => {
    const path = `/admin/pmp?page=1&status=${status}`;
    history.push(path);
  };

  useEffect(() => {
    if (quickViewIndex === -1) setSelectedApplicationDetails(null);
    else getApplicationDetails();
  }, [quickViewIndex]);

  const [keyword, setKeyword] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    const filters = {
      page,
      pageSize: 10,
      status: statusFilters[currentStatus].value,
      keyword,
    };
    setTableLoading(true);

    if (isAssignedStatus) {
      const user = getUserData();
      if (viewInactive) {
        delete filters.status;
      } else {
        const statuses = allStatus.slice();
        _.remove(
          statuses,
          (s) =>
            s === constants.instructorAppStatus.closedDenied.statusId ||
            s === constants.instructorAppStatus.closedFailed.statusId ||
            s === constants.instructorAppStatus.closedPassed.statusId ||
            s === constants.instructorAppStatus.closedWithdrawn.statusId,
        );
        filters.status = statuses;
      }

      filters.assignedAdminId = user.sub || user.email;
    }

    makeRequest('post', `api/admin/instructorapplications`, filters)
      .then((data) => {
        setApplications(data.results);
        setPageCount(data.pageCount);
        setAppCount(data.rowCount);
        setTableLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setTableLoading(false);
      });
  }, [page, currentStatus, keyword, viewInactive, isAssignedStatus, forceRefreshTable]);

  const changePage = (direction) => {
    const path = `/admin/pmp?page=${direction === 'next' ? page + 1 : page - 1}&status=${currentStatus}`;
    history.push(path);
  };

  const exportData = async () => {
    setExportLoading(true);
    await makeRequest('post', `api/admin/instructorapplications`, {
      page: 1,
      pageSize: appCount,
      status: statusFilters[currentStatus].value,
    }).then(async (data) => {
      await parseAsync(
        data.results.map((item) => {
          const entries = new Map([...item.requirements.map((req) => [req.name, req.satisfied])]);

          const requirements = Object.fromEntries(entries);
          return {
            id: item.id,
            applicationTypeId: item.applicationTypeId,
            applicationName: getApplicationName(item.name),
            instructorId: item.personId,
            instructorName: `${item.instructorFirstName} ${item.instructorLastName}`,
            providerId: item.providerId,
            providerName: item.providerName,
            dateCreated: item.dateCreated,
            dateCompleted: item.dateCompleted,
            assignedAdminId: item.assignedAdminId,
            status: instructorStatusById(item.statusId).title,
            ...requirements,
          };
        }),
      )
        .then((csv) => {
          const blob = new Blob([`\uFEFF${csv}`], {
            type: 'text/csv;charset=utf-8',
          });
          saveAs(
            blob,
            `applications_${formatStatusLabel(statusFilters[currentStatus].label)}_${moment().format(
              'YYYY_MM_DD_HH_mm_ss',
            )}.csv`,
          );
        })
        .catch((err) => console.error('Error Creating CSV:', err));
    });
    setExportLoading(false);
  };

  return (
    <div>
      {quickViewIndex !== -1 && (
        <InstructorApplicationQuickView onClose={() => setQuickViewIndex(-1)}>
          {quickViewLoading || !selectedApplicationDetails ? (
            <Spinner />
          ) : (
            <>
              <div className="mb-4">
                <strong>Name: </strong>
                {getApplicationName(selectedApplicationDetails.name)}
              </div>
              <div className="mb-4">
                <strong>Qualification: </strong>
                PMP Exam Trainer
              </div>
              <div className="mb-4">
                <strong>Provider: </strong>
                {selectedApplicationDetails.providerName}
              </div>
              <div className="mb-4">
                <strong>Instructor: </strong>
                {`${selectedApplicationDetails.instructorFirstName} ${selectedApplicationDetails.instructorLastName}`}
              </div>
              <div className="mb-4">
                <strong>Status: </strong>
                {instructorStatusById(selectedApplicationDetails.statusId).title}
              </div>
              <div className="mb-4">
                <strong>Attended Training Events: </strong>
                <div className="text-sm ml-6">
                  <ul className="list-disc">
                    {selectedApplicationDetails.trainingEventRegistrations &&
                      selectedApplicationDetails.trainingEventRegistrations.map((event) => (
                        <li key={event.id}>
                          <strong>{event.eventName}</strong>
                          <br />
                          Start:
                          {formatDateTime(event.startDate)}
                          <br />
                          End:
                          {formatDateTime(event.endDate)}
                          <br />
                          Duration:&nbsp;
                          {formatDuration(event.startDate, event.endDate)}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </InstructorApplicationQuickView>
      )}
      <div className="flex flex-col">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 mb-4">
            <div className="mr-3">
              <ButtonWithIcon
                isLoading={exportLoading || tableLoading}
                title="Export Data"
                onClick={() => exportData()}
                size={2}
              >
                <span className="w-6 text-xl">
                  <i className="fas fa-download" />
                </span>
              </ButtonWithIcon>
            </div>
            <div className="">
              <select
                name="statusFilter"
                id="statusFilter"
                value={currentStatus}
                onChange={(e) => setFilter(e.target.value)}
                className={cn('form-select block w-full sm:text-sm sm:leading-5')}
              >
                {_.map(statusFilters, (val, key) => (
                  <option value={key} key={key}>
                    {val.label}
                  </option>
                ))}
              </select>
              {isAssignedStatus && (
                <label className="float-right mt-2">
                  <input
                    className="mr-2 leading-tight"
                    type="checkbox"
                    checked={viewInactive}
                    onChange={() => setViewInactive(!viewInactive)}
                  />
                  <span className="text-sm">View All Applications</span>
                </label>
              )}
            </div>
            <div className="lg:hidden" />
            <div className="lg:mt-0 mt-2">
              <button
                className="flex-shrink-0 bg-primary-light border-primary-light text-sm border-4 text-white py-1 px-2 rounded float-right"
                type="button"
                onClick={() => setKeyword(searchWord)}
              >
                Search
              </button>
              <div className="flex justify-end relative">
                <input
                  className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline float-right"
                  type="text"
                  placeholder="Search"
                  id="search-bar"
                  value={searchWord}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setKeyword(searchWord);
                    }
                  }}
                  onChange={(e) => {
                    setSearchWord(e.target.value);
                  }}
                />
                <div
                  className={cn(
                    'absolute z-10 h-full right-2 top-0 items-center',
                    searchWord === '' ? 'hidden' : 'flex',
                  )}
                >
                  <span
                    onClick={() => {
                      setSearchWord('');
                      setKeyword('');
                      document.getElementById('search-bar').focus();
                    }}
                    className={cn(
                      'w-4 h-4 rounded-full bg-gray-400 items-center justify-center text-white text-xs text-center cursor-pointer',
                    )}
                  >
                    X
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Application Type
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Instructor
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Instructor Id
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Provider Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Provider Id
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Created
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Status
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Assigned Admin User
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer" />
                </tr>
              </thead>
              <tbody>
                {applications.map((item, index) => (
                  <tr
                    key={item.id}
                    className={cn({
                      'bg-white': index % 2 === 1,
                      'bg-gray-50': index % 2 === 0,
                      'border-b border-solid border-gray-500': applications.length !== index + 1,
                    })}
                  >
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {getApplicationTypeById(item.applicationTypeId)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {`${item.instructorFirstName} ${item.instructorLastName}`}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {item.personId}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {item.providerName}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {item.providerId}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {formatDateTime(item.dateCreated)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {instructorStatusById(item.statusId).title}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {item.assignedAdminId}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      <button
                        className="text-primary-light"
                        onClick={() => {
                          document.querySelector('body').classList.add('overflow-hidden');
                          setQuickViewLoading(true);
                          setQuickViewIndex(item.id);
                        }}
                        type="button"
                      >
                        Quick View
                      </button>
                      &nbsp;|&nbsp;
                      <a className="text-primary-light" href={`/admin/pmp/application/${item.id}`}>
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden">
                <p className="text-sm leading-5 text-gray-700">
                  Showing
                  <span className="font-medium">1</span>
                  to
                  <span className="font-medium">10</span>
                  of
                  <span className="font-medium">20</span>
                  results
                </p>
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
      </div>
    </div>
  );
};

export default InstructorApplicationTable;
