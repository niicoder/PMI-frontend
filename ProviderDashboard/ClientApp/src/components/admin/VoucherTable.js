import React, { useState } from 'react';
import cn from 'classnames';
import useSWR from 'swr';
import moment from 'moment';
import { fetcher } from '../../utils/request';
import { getApplicationTypeById } from '../../constants';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import AddVoucherModal from './AddVoucherModal';

const formatDate = (date) => {
  return moment.utc(date).local().format('MM/DD/YYYY');
};

const VoucherTable = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data: vouchers } = useSWR(`/api/voucher/all`, fetcher);

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      {showAddModal && <AddVoucherModal onClose={() => setShowAddModal(false)} vouchers={vouchers} />}
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">Vouchers</div>
      </div>
      <div className="py-5 px-3">
        <div className="flex flex-col">
          <div className="mb-5">
            <ButtonWithIcon title="Add Voucher" onClick={() => setShowAddModal(true)} size={2}>
              <span className="w-6 text-xl">
                <i className="fas fa-plus" />
              </span>
            </ButtonWithIcon>
          </div>
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      Voucher ID
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      Provider Id
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      Application Type
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      Date Created
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      Status
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer" />
                  </tr>
                </thead>
                <tbody>
                  {vouchers &&
                    vouchers
                      .filter((item) => item.applicationTypeId === 2)
                      .map((item, index) => (
                        <tr
                          key={item.id}
                          className={cn({
                            'bg-white': index % 2 === 1,
                            'bg-gray-50': index % 2 === 0,
                            'border-b border-solid border-gray-500': vouchers.length !== index + 1,
                          })}
                        >
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {item.id}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {item.providerId}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {getApplicationTypeById(item.applicationTypeId)}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {formatDate(item.dateCreated)}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {item.status}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                            {item.applicationId && (
                              <a className="text-primary-light" href={`/admin/pmp/application/${item.applicationId}`}>
                                Show Application
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherTable;
