import React, { useState } from 'react';
import cn from 'classnames';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import TopMenu from '../common/TopMenu';
import ProviderTab from '../providers/ProviderTab';
import EditButton from '../buttons/EditButton';
import AddCourse from '../providers/AddCourse';
import CourseInfo from '../providers/CourseInfo';

const MyProviderCoursePage = () => {
  const [tab] = useState(3);
  const [courseVisible, setCourseVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [edit, setEdit] = useState(false);

  const mock = {
    instructor: {
      name: 'Jane Sutherland',
    },
    title: 'Project Management Risk Control',
    classType: 'Project Management',
    modality: 'Mattis quis morbi amet lorem varius consequat enim.',
    location: {
      address: '123 One Good Works Way',
      address1: 'Atlanta, GA 34787',
      address2: 'United States',
    },
    language: 'English',
    maxCapacity: 150,
  };

  return (
    <div>
      <TopMenu />

      <ProviderTab tab={tab} />

      <div className="container mx-auto mt-8">
        <div className="pr-4 text-right">
          <ButtonWithIcon
            title="Add Course"
            size={1}
            rounded={false}
            onClick={() => {
              setEdit(false);
              setCourseVisible(true);
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
              <th className="pt-3 px-2 w-1/12">Title</th>
              <th className="pt-3 px-2 w-1/12">Class Type</th>
              <th className="pt-3 px-2 w-1/6">Modality</th>
              <th className="pt-3 px-2 w-1/4">Location</th>
              <th className="pt-3 px-2 w-1/12">Language</th>
              <th className="pt-3 px-2 w-1/12">Max Capacity</th>
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
                  </td>
                  <td valign="top" className="p-2 w-1/12">
                    {mock.title}
                  </td>
                  <td valign="top" className="p-2 w-1/12">
                    {mock.classType}
                  </td>
                  <td valign="top" className="p-2 w-1/6">
                    <p>{mock.modality}</p>
                  </td>
                  <td valign="top" className="p-2 w-1/4">
                    <p>{mock.location.address}</p>
                    <p>{mock.location.address1}</p>
                    <p>{mock.location.address2}</p>
                  </td>
                  <td className="p-2 w-1/12" valign="top">
                    <p>{mock.language}</p>
                  </td>
                  <td className="p-2 w-1/12" valign="top">
                    <p>{`${mock.maxCapacity} Students`}</p>
                  </td>
                  <td className="relative w-1/12">
                    <EditButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setEdit(true);
                        setCourseVisible(true);
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

      {courseVisible && (
        <AddCourse
          edit={edit}
          onClose={() => setCourseVisible(false)}
          onSubmit={() => {
            setCourseVisible(false);
          }}
        />
      )}

      {infoVisible && (
        <CourseInfo
          onClose={() => setInfoVisible(false)}
          onEdit={() => {
            setInfoVisible(false);
            setEdit(true);
            setCourseVisible(true);
          }}
        />
      )}
    </div>
  );
};

export default MyProviderCoursePage;
