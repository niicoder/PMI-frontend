import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import cn from 'classnames';
import { useHistory } from 'react-router';
import moment from 'moment';
import { parseAsync } from 'json2csv';
import { saveAs } from 'file-saver';
import useQuery from '../../hooks/useQuery';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import { makeRequest } from '../../utils/request';
import { getUserData } from '../../utils/persist';
import constants from '../../constants';

const statusFilters = {
  assignTo: {
    label: 'My Assigned Applications',
    combined: true,
  },
  actionable: {
    label: 'Active Applications (Submitted, Under Review, Resubmitted, Approved For Payment)',
    value: [
      constants.appStatus.submitted.value,
      constants.appStatus.underReview.value,
      constants.appStatus.resubmitted.value,
      constants.appStatus.approved.value,
    ],
    combined: true,
  },
  awaiting: {
    label: 'Awaiting ATP Action (Additional Information Required, Sales Order Processed, Invoice Sent)',
    value: [
      constants.appStatus.needInfo.value,
      constants.appStatus.needInfoProcurement.value,
      constants.appStatus.orderProcessed.value,
      constants.appStatus.invoiceSent.value,
    ],
    combined: true,
  },
  all: {
    label: 'All',
    value: [],
    combined: true,
  },
  inactive: {
    label: 'Inactive (Closed - Withdrawn, Closed - Denied)',
    value: [constants.appStatus.withdrawn.value, constants.appStatus.denied.value],
    combined: true,
  },
  submitted: {
    label: constants.appStatus.submitted.title,
    value: [constants.appStatus.submitted.value],
  },
  resubmitted: {
    label: constants.appStatus.resubmitted.title,
    value: [constants.appStatus.resubmitted.value],
  },
  approved: {
    label: constants.appStatus.approved.title,
    value: [constants.appStatus.approved.value],
  },
  invoiceSent: {
    label: constants.appStatus.invoiceSent.title,
    value: [constants.appStatus.invoiceSent.value],
  },
  paid: {
    label: constants.appStatus.paid.title,
    value: [constants.appStatus.paid.value],
  },
  orderProcessed: {
    label: constants.appStatus.orderProcessed.title,
    value: [constants.appStatus.orderProcessed.value],
  },
  inProgress: {
    label: constants.appStatus.inProgress.title,
    value: [constants.appStatus.inProgress.value],
  },
  underReview: {
    label: constants.appStatus.underReview.title,
    value: [constants.appStatus.underReview.value],
  },
  procurementReview: {
    label: constants.appStatus.procurementReview.title,
    value: [constants.appStatus.procurementReview.value],
  },
  needInfo: {
    label: constants.appStatus.needInfo.title,
    value: [constants.appStatus.needInfo.value],
  },
  needInfoProcurement: {
    label: constants.appStatus.needInfoProcurement.title,
    value: [constants.appStatus.needInfoProcurement.value],
  },
  withdrawn: {
    label: constants.appStatus.withdrawn.title,
    value: [constants.appStatus.withdrawn.value],
  },
  denied: {
    label: constants.appStatus.denied.title,
    value: [constants.appStatus.denied.value],
  },
  deleted: {
    label: constants.appStatus.deleted.title,
    value: [constants.appStatus.deleted.value],
  },
};

const SortColumns = {
  providerNumber: 'ProviderNumber',
  orgName: 'OrgName',
  lastUpdated: 'LastUpdated',
  status: 'Status',
  assignedAdminId: 'AssignedAdminId',
};

const formatDate = (date) => {
  return moment.utc(date).local().format('MM/DD/YYYY');
};

const formatStatusLabel = (label) => {
  const formattedStr = label.toLowerCase().replace(' ', '_');
  return formattedStr;
};

// eslint-disable-next-line consistent-return
const findStatusLabel = (statusValue) => {
  for (const key of Object.keys(statusFilters)) {
    const { combined } = statusFilters[key];
    if (!combined && _.includes(statusFilters[key].value, statusValue)) {
      return statusFilters[key].label;
    }
  }
};

const ApplicationsTable = () => {
  const history = useHistory();
  const query = useQuery();

  const page = Number(query.get('page')) || 1;
  const currentStatus = query.get('status') || 'actionable';
  const isAssignedStatus = currentStatus === 'assignTo';

  const [applications, setApplications] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [appCount, setAppCount] = useState(0);
  const [sorting, setSorting] = useState({
    column: 'OrgName',
    direction: 'ASC',
  });
  const [viewInactive, setViewInactive] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [keyword, setKeyword] = useState('');
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

  const setFilter = (status) => {
    const path = `/admin?page=1&status=${status}`;
    history.push(path);
  };

  const changePage = (direction) => {
    const path = `/admin?page=${direction === 'next' ? page + 1 : page - 1}&status=${currentStatus}`;
    history.push(path);
  };

  const exportData = async () => {
    setExportLoading(true);
    await makeRequest('post', `/api/admin/applications`, {
      page: 1,
      pageSize: appCount,
      status: statusFilters[currentStatus].value,
    }).then(async (data) => {
      await parseAsync(data.results)
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
        _.remove(statuses, (s) => s === constants.appStatus.withdrawn.value || s === constants.appStatus.denied.value);
        filters.status = statuses;
      }
      filters.assignedAdminId = user.sub;
    }

    filters.sortColumn = sorting.column;
    filters.sortDirection = sorting.direction;

    makeRequest('post', `/api/admin/applications`, filters)
      .then((data) => {
        setApplications(data.results);
        setPageCount(data.pageCount);
        setAppCount(data.rowCount);
        setTableLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setTableLoading(false);
      });
  }, [page, currentStatus, sorting, viewInactive, keyword]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isAssignedStatus) {
      return null;
    }
  }, [viewInactive]);

  const handleSorting = (column) => {
    if (column === sorting.column) {
      setSorting({
        ...sorting,
        direction: sorting.direction === 'ASC' ? 'DESC' : 'ASC',
      });
    } else {
      setSorting({ column, direction: 'ASC' });
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 mb-4">
            <div className=" mr-3">
              <ButtonWithIcon
                title="Export Data"
                onClick={() => exportData()}
                size={2}
                isLoading={tableLoading || exportLoading}
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
                  <span className="text-sm">View Inactive Applications</span>
                </label>
              )}
            </div>
            <div className="lg:hidden" />
            <div className=" lg:mt-0 mt-2">
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
                  <th
                    className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSorting(SortColumns.providerNumber)}
                  >
                    Provider Number
                  </th>
                  <th
                    className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSorting(SortColumns.orgName)}
                  >
                    Organization Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Application Date
                  </th>
                  <th
                    className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSorting(SortColumns.lastUpdated)}
                  >
                    Status Update Date
                  </th>
                  <th
                    className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSorting(SortColumns.status)}
                  >
                    Status
                  </th>
                  <th
                    className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSorting(SortColumns.assignedAdminId)}
                  >
                    Assigned Admin User
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => history.push(`/admin/application/${item.id}`)}
                    className={cn('cursor-pointer', {
                      'bg-white': index % 2 === 1,
                      'bg-gray-50': index % 2 === 0,
                      'border-b border-solid border-gray-500': applications.length !== index + 1,
                    })}
                  >
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {item.providerNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {item.orgName.length > 30 ? `${item.orgName.slice(0, 30)}...` : item.orgName}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {item.submitDate ? formatDate(item.submitDate) : formatDate(item.dateCreated)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {item.lastUpdated ? formatDate(item.lastUpdated) : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {findStatusLabel(item.statusId)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {item.assignedAdminId}
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

export default ApplicationsTable;
