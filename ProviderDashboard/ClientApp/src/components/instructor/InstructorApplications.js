import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import moment from 'moment';
import useQuery from '../../hooks/useQuery';
import { makeRequest } from '../../utils/request';
import { getApplicationName } from '../../constants';

const formatDate = (date) => {
  return moment.utc(date).local().format('MM/DD/YYYY h a');
};

const InstructorApplications = () => {
  const query = useQuery();
  const history = useHistory();
  const [applications, setApplications] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const page = Number(query.get('page')) || 1;

  const changePage = (direction) => {
    const path = `/instructor?page=${direction === 'next' ? page + 1 : page - 1}`;
    history.push(path);
  };

  const updateTable = () => {
    const filters = {
      page,
      pageSize: 2,
    };
    makeRequest('post', '/api/instructor/applications', filters).then((data) => {
      setApplications(data.results);
      setPageCount(data.pageCount);
    });
  };

  useEffect(() => {
    updateTable();
  }, [page]);

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">Applications</div>
      </div>
      <div className="py-5 px-3">
        <div className="grid grid-cols-2 gap-8 justify-center mb-8">
          {applications.map((item) => (
            <div
              key={item.id}
              className="flex flex-col app-tile m-auto rounded border-2 border-gray-500 border-solid w-full h-full"
            >
              <div className="app-tile-title">
                <b>{getApplicationName(item.applicationName)}</b>
              </div>
              <div className="ml-8 mb-8">
                <p>
                  <b>Provider: </b>
                  {item.providerName}
                </p>
                <p>
                  <b>Status: </b>
                  {item.status}
                </p>
                {item.requirementName && (
                  <div>
                    <p>
                      <b>Requirements:</b>
                    </p>
                    <div className="mx-8 mb-8">
                      <p>
                        <b>{item.requirementName}</b>
                      </p>
                      <p>
                        Date / Time:
                        {item.requirementDate ? formatDate(item.requirementDate) : 'N/A'}
                      </p>
                      <p>
                        Duration:
                        {item.requirementDuration}
                      </p>
                    </div>
                  </div>
                )}
                <Link className="app-tile-link" to={`/instructor/pmp/application/${item.id}`}>
                  View Application
                </Link>
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
  );
};

export default InstructorApplications;
