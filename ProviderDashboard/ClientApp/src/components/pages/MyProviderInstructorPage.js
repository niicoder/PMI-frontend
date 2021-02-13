import React, { useState } from 'react';
import cn from 'classnames';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import TopMenu from '../common/TopMenu';
import ProviderTab from '../providers/ProviderTab';
import EditButton from '../buttons/EditButton';
import AddInstructor from '../providers/AddInstructor';
import InstructorInfo from '../providers/InstructorInfo';

const MyProviderInstructorPage = () => {
  const [tab] = useState(2);
  const [instVisible, setInstVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [edit, setEdit] = useState(false);

  const mock = {
    instructor: {
      name: 'Jane Sutherland',
      phone: '(407) 659-8749',
      email: 'JSutherland@mail.com',
    },
    pmiId: '123456789',
    pmpSince: '02/21/2020',
    contact: {
      phone: '(407) 659-8749',
      email: 'JSutherland@mail.com',
      address: '321 One Good Works Way',
      address1: 'Atlanta, GA 34787 United States',
    },
    profile: ['http://www.goodworksco.com/JaneS', 'http://www.goodworkspmptraining.com'],
    trainerStatus: {
      status: 'Active',
      lastUpdated: '02/15/2020',
    },
    status: {
      status: 'Active',
      lastUpdated: '02/15/2020',
    },
  };

  return (
    <div>
      <TopMenu />

      <ProviderTab tab={tab} />

      <div className="container mx-auto mt-8">
        <div className="pr-4 text-right">
          <ButtonWithIcon
            title="Add Instructor"
            size={1}
            rounded={false}
            onClick={() => {
              setEdit(false);
              setInstVisible(true);
            }}
          >
            <span className="w-6 text-sm">
              <i className="fas fa-plus" />
            </span>
          </ButtonWithIcon>
        </div>
      </div>
      <div className="container mx-auto text-center font-agrandir">
        <table className="table-fixed text-sm mx-4 rounded-tl-md">
          <thead className="bg-gray-300 bold">
            <tr className="text-left" valign="top">
              <th className="pt-3 pr-2 pl-6 w-1/6">Instructor</th>
              <th className="pt-3 px-2 w-1/12">PMI ID</th>
              <th className="pt-3 px-2 w-1/12">PMP Since</th>
              <th className="pt-3 px-2 w-1/4">Contact Information</th>
              <th className="pt-3 px-2 w-1/6">Profile Url</th>
              <th className="pt-3 px-2 w-1/12">Train the Trainer Status</th>
              <th className="pt-3 px-2 w-1/12">Status Last Updated</th>
              <th className="pt-3 w-4 w-1/12" />
            </tr>
          </thead>
        </table>
        <div className="bg-gray-200 p-4 mx-4 mb-12">
          <table className="table-fixed text-sm mb-12">
            <tbody className="text-xs font-thin">
              {Array.from(Array(6)).map((_, index) => (
                <tr
                  className={cn('border-b-2 text-left p-3 text-black', {
                    'bg-white': index % 2 === 1,
                    'bg-gray-100': index % 2 === 0,
                  })}
                  onClick={() => setInfoVisible(true)}
                >
                  <td valign="top" align="left" className="p-2 w-1/6">
                    <p>{mock.instructor.name}</p>
                    <p>{mock.instructor.phone}</p>
                    <p>{mock.instructor.email}</p>
                  </td>
                  <td valign="top" className="p-2 w-1/12">
                    {mock.pmiId}
                  </td>
                  <td valign="top" className="p-2 w-1/12">
                    {mock.pmpSince}
                  </td>
                  <td valign="top" className="p-2 w-1/4">
                    <p>{mock.contact.phone}</p>
                    <p>{mock.contact.email}</p>
                    <p>{mock.contact.address}</p>
                    <p>{mock.contact.address1}</p>
                  </td>
                  <td valign="top" className="p-2 w-1/6">
                    {mock.profile.map((url) => (
                      <p key={url}>{url}</p>
                    ))}
                  </td>
                  <td className="text-center p-2 w-1/12" valign="top">
                    <p className="font-extrabold">{mock.trainerStatus.status}</p>
                    <p>{mock.trainerStatus.lastUpdated}</p>
                  </td>
                  <td className="text-center p-2 w-1/12" valign="top">
                    <p className="font-extrabold">{mock.status.status}</p>
                    <p>{mock.status.lastUpdated}</p>
                  </td>
                  <td className="relative w-1/12">
                    <EditButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setEdit(true);
                        setInstVisible(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-blue-500 mb-4">
            <span>{'<<'}</span>
            {Array.from(Array(6)).map((_, index) => {
              return (
                <>
                  <span className="mx-1">
                    <> </>
                    <>{index + 1}</>
                  </span>
                  <span
                    className={cn('mx-1', {
                      hidden: index === 5,
                    })}
                  >
                    |
                  </span>
                </>
              );
            })}
            <span>{'>>'}</span>
          </div>
        </div>
      </div>

      {instVisible && (
        <AddInstructor
          edit={edit}
          onClose={() => setInstVisible(false)}
          onSubmit={() => {
            setInstVisible(false);
          }}
        />
      )}

      {infoVisible && (
        <InstructorInfo
          onClose={() => setInfoVisible(false)}
          onEdit={() => {
            setInfoVisible(false);
            setEdit(true);
            setInstVisible(true);
          }}
        />
      )}
    </div>
  );
};

export default MyProviderInstructorPage;
