import React from 'react';
import ButtonWithIcon from '../buttons/ButtonWithIcon';

const CourseInfo = ({ onClose, onEdit }) => {
  const mock = {
    title: 'Project Management Risk Control ',
    provider: 'Acme Corporation',
    instructor: 'Jane Sutherland',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ridiculus quisque a purus.',
    classType: 'Project Managment',
    modality: 'Project Manager',
    dates: ['Feb 15, 2020 10:30AM - 02:30PM (EST)', 'Feb 16, 2020 10:30AM - 02:30PM (EST)'],
    urls: ['http://www.goodworksco.com', 'http://www.goodworkspmptraining.com'],
    location: '321 One Good Works Way Atlanta, GA 34787 United States',
    maxCapapcity: '150',
    language: 'English',
  };

  return (
    <div className="font-agrandir w-screen">
      <div
        className="md-modal md-effect md-show border-2 border-white rounded-t-sm"
        id="course-info-modal"
        style={{ width: '80%' }}
      >
        <div className="inline-flex bg-primary text-white w-full items-center">
          <div className="flex-none text-2xl p-2">
            <svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.7188 15.8438V3.65625H12.1875V25.3081C13.6982 24.5083 15.0503 23.6387 16.2437 22.6992C19.2271 20.3633 20.7188 18.0781 20.7188 15.8438ZM24.375 1.21875V15.8438C24.375 16.9355 24.1623 18.0178 23.7371 19.0906C23.3118 20.1633 22.7849 21.1155 22.1565 21.947C21.5281 22.7786 20.7791 23.5879 19.9094 24.375C19.0398 25.1621 18.2368 25.8159 17.5005 26.3364C16.7642 26.8569 15.9961 27.3489 15.1963 27.8123C14.3965 28.2756 13.8284 28.5898 13.4919 28.7549C13.1555 28.9199 12.8857 29.0469 12.6826 29.1357C12.5303 29.2119 12.3652 29.25 12.1875 29.25C12.0098 29.25 11.8447 29.2119 11.6924 29.1357C11.4893 29.0469 11.2195 28.9199 10.8831 28.7549C10.5466 28.5898 9.97852 28.2756 9.17871 27.8123C8.37891 27.3489 7.61085 26.8569 6.87451 26.3364C6.13818 25.8159 5.33521 25.1621 4.46558 24.375C3.59594 23.5879 2.84692 22.7786 2.21851 21.947C1.59009 21.1155 1.06323 20.1633 0.637939 19.0906C0.212653 18.0178 0 16.9355 0 15.8438V1.21875C0 0.888678 0.120599 0.603034 0.361816 0.361816C0.603034 0.120599 0.888678 0 1.21875 0H23.1562C23.4863 0 23.772 0.120599 24.0132 0.361816C24.2544 0.603034 24.375 0.888678 24.375 1.21875Z"
                fill="white"
              />
            </svg>
          </div>
          <h2 className="flex-1 text-2xl p-2">Course Information</h2>
          <div className="flex-none p-2">
            <button className="text-3xl" onClick={onClose} type="button">
              <i className="far fa-times-circle" />
            </button>
          </div>
        </div>
        <div className="bg-gray-200 inline-flex w-full items-center">
          <div className="w-5/6 pl-2">{mock.title}</div>
          <div className="w-1/6 text-right">
            <ButtonWithIcon title="Edit" onClick={onEdit} size="2">
              <span>
                <i className="fas fa-edit" />
              </span>
            </ButtonWithIcon>
          </div>
        </div>
        <div className="bg-white p-4">
          <div className="flex flex-row">
            <table className="table-fixed w-1/2 text-sm mx-4">
              <tbody>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    Provider
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin">{mock.provider}</td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    Instructor
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">{mock.instructor}</td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    Description
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">
                    {mock.description}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    Class Type
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">{mock.classType}</td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-r-2" valign="top">
                    Modality
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 font-thin relative">{mock.modality}</td>
                </tr>
              </tbody>
            </table>
            <table className="table-fixed w-1/2 text-sm mx-4">
              <tbody>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    Dates
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin">
                    {mock.dates.map((date) => (
                      <p>{date}</p>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    More Info
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">
                    {mock.urls.map((date) => (
                      <p>{date}</p>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    Location
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">{mock.location}</td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    Max Capacity
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">
                    {mock.maxCapapcity}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-r-2" valign="top">
                    Language
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 font-thin relative">{mock.language}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="md-overlay" />
    </div>
  );
};

export default CourseInfo;
