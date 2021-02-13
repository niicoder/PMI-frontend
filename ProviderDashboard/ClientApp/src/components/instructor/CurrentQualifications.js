import React, { useEffect, useState } from 'react';
import moment from 'moment';
import cn from 'classnames';
import { makeRequest } from '../../utils/request';
import { getUserId } from '../../utils/persist';

const formatDate = (date) => {
  return moment.utc(date).local().format('MM/DD/YYYY');
};

const CurrentQualifications = () => {
  const [qualifications, setQualifications] = useState(null);

  useEffect(() => {
    makeRequest('get', `/api/instructor/qualifications/${getUserId()}`).then((data) => {
      setQualifications(data);
    });
  }, []);

  return (
    <div>
      {qualifications && (
        <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
          <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
            <div className="font-semibold text-lg font-agrandir py-3 pr-4">Current Qualifications</div>
          </div>
          {qualifications.length > 0 ? (
            <div className="flex flex-col py-5 px-3">
              <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Qualification
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Status
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Date Achieved
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Expiration Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {qualifications.map((item, index) => (
                        <tr
                          key={item.id}
                          className={cn('cursor-pointer', {
                            'bg-white': index % 2 === 1,
                            'bg-gray-50': index % 2 === 0,
                            'border-b border-solid border-gray-500': qualifications.length !== index + 1,
                          })}
                        >
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {item.status}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {item.dateCreated ? formatDate(item.dateAchieved) : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {item.expirationDate ? formatDate(item.expirationDate) : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">No Qualifications to show</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentQualifications;
