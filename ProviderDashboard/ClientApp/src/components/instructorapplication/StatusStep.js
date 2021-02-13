import React from 'react';
import moment from 'moment';
import useSWR from 'swr';
import cn from 'classnames';
import { fetcher } from '../../utils/request';
import { isAnyAdmin } from '../../utils/persist';
import { instructorStatusById } from '../../constants';
import Spinner from '../common/Spinner/Spinner';

const formatDate = (date) => {
  return moment.utc(date).local().format('MM/DD/YYYY');
};

const StatusStep = ({ application }) => {
  const isAdmin = isAnyAdmin();

  const { data: overviewData } = useSWR(
    `/api/instructorapplication/GetInstructorOverviewApplication/${application.id}`,
    fetcher,
  );

  if (!overviewData) {
    return (
      <div className="flex justify-center my-5">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="">
      <div className="text-lg font-agrandir py-3 pr-4">
        <span className="font-bold">Status</span>
        <div className="text-sm mt-4">{instructorStatusById(application.statusId).title}</div>
      </div>
      <div className="text-lg font-agrandir py-3 pr-4">
        <span className="font-bold">Provider Information</span>
        <div className="text-sm  mt-4">
          <span className="font-bold">Name: </span>
          {overviewData.provider.name}
        </div>
        <div className="text-sm  mt-4">
          <span className="font-bold">Contact: </span>
          {`${overviewData.provider.contactFirstName} ${overviewData.provider.contactLastName}`}
        </div>
        <div className="text-sm  mt-4">
          <p className="font-bold block mb-2">Address: </p>

          {overviewData.provider.address1 ? <p>{overviewData.provider.address1}</p> : null}

          {overviewData.provider.address2 ? <p>{overviewData.provider.address2}</p> : null}

          {overviewData.provider.address3 ? <p>{overviewData.provider.address3}</p> : null}

          <span>
            {`${overviewData.provider.city} ${overviewData.provider.state} ${overviewData.provider.postalCode}`}
          </span>
        </div>
        <div className="text-sm  mt-4">
          <span className="font-bold">Status: </span>
          {overviewData.provider.providerStatusType}
        </div>
      </div>
      <div className="font-semibold text-lg font-agrandir py-3 pr-4">
        <span className="font-bold">Qualification Information</span>
        {overviewData.qualifications.length > 0 ? (
          <div className="px-8 py-4">
            <div className="align-middle inline-block min-w-full overflow-y-auto p-3" style={{ maxHeight: '400px' }}>
              <table className="min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      Name
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      Person Id
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      Status
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      Is Active
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {overviewData.qualifications.map((item, index) => (
                    <tr
                      key={item.id}
                      className={cn({
                        'bg-white': index % 2 === 1,
                        'bg-gray-50': index % 2 === 0,
                        'border-b border-solid border-gray-500': overviewData.qualifications.length !== index + 1,
                      })}
                    >
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                        {item.personId}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                        {item.status}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                        {item.isActive ? 'True' : 'False'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-4 font-agrandir text-sm font-normal">No qualifications to show</div>
        )}
      </div>
      <div className="font-semibold text-lg font-agrandir py-3 pr-4">
        <span className="font-bold">Scheduled Class</span>
        {overviewData.trainingEvent ? (
          <div className="px-8 py-4">
            <div className="align-middle inline-block min-w-full overflow-y-auto p-3" style={{ maxHeight: '400px' }}>
              <table className="min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      Name
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      Start Date
                    </th>
                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      End Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-solid border-gray-500">
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {overviewData.trainingEvent.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {formatDate(overviewData.trainingEvent.startDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 text-left">
                      {formatDate(overviewData.trainingEvent.endDate)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-4 font-agrandir text-sm font-normal">No class information to show</div>
        )}
      </div>
      {!isAdmin && (
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">
          <span className="font-bold">Processing Notes</span>
          {overviewData.notes.length > 0 ? (
            overviewData.notes.map((item) => (
              <div key={item.id} className="px-8 py-4">
                <div className="container mx-auto bg-gray-50 overflow-hidden rounded-t-lg shadow mb-5">
                  <div className="bg-gray-200 flex justify-between px-3 items-center sm:rounded-t-lg border-b">
                    <div className="text-sm leading-4 font-medium text-gray-500 capitalize tracking-wider py-4">
                      {item.createdByName}
                    </div>
                    <div className="text-right text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      <span>{moment(item.dateCreated).format('MM/DD/YYYY')}</span>
                    </div>
                  </div>
                  <div className="px-8 py-4 text-sm">{item.body}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-4 font-agrandir text-sm font-normal">No notes to show</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusStep;
