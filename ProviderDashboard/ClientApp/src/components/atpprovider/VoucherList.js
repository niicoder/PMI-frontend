import React from 'react';
import cn from 'classnames';
import { getApplicationTypeById } from '../../constants';

const VoucherList = ({ pmpT3Vouchers }) => {
  return (
    <div>
      <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
        <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
          <div className="font-semibold text-lg font-agrandir py-3 pr-4">Vouchers</div>
        </div>
        <div className="py-5 px-3">
          {pmpT3Vouchers && pmpT3Vouchers.length > 0 ? (
            <div className="flex flex-col">
              <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Voucher ID
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Application Type
                        </th>
                        <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pmpT3Vouchers.map((item, index) => (
                        <tr
                          key={item.id}
                          className={cn({
                            'bg-white': index % 2 === 1,
                            'bg-gray-50': index % 2 === 0,
                            'border-b border-solid border-gray-500': pmpT3Vouchers.length !== index + 1,
                          })}
                        >
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {item.id}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {getApplicationTypeById(item.applicationTypeId)}
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
            <div>No Vouchers to show</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherList;
