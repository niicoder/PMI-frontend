import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { makeRequest } from '../../utils/request';
import { getUserId } from '../../utils/persist';

const AssociatedProviders = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    makeRequest('get', `/api/instructor/providers/${getUserId()}`).then((data) => {
      setProviders(data);
    });
  }, []);

  return (
    <div>
      {providers && (
        <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
          <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
            <div className="font-semibold text-lg font-agrandir py-3 pr-4">Associated Providers</div>
          </div>
          {providers.length > 0 ? (
            <div className="flex flex-col py-5 px-3">
              <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Provider ID
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Provider Name
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Contact Information
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers.map((item, index) => (
                        <tr
                          key={item.id}
                          className={cn('cursor-pointer', {
                            'bg-white': index % 2 === 1,
                            'bg-gray-50': index % 2 === 0,
                            'border-b border-solid border-gray-500': providers.length !== index + 1,
                          })}
                        >
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {item.id}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {item.providerName}
                          </td>
                          <td className="px-6 py-4 whitespace-pre text-sm leading-5 text-gray-500 text-left">
                            {item.contactInformation}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {item.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">No Providers to show</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssociatedProviders;
