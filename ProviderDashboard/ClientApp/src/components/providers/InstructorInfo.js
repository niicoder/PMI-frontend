import React from 'react';
import ButtonWithIcon from '../buttons/ButtonWithIcon';

const InstructorInfo = ({ onClose, onEdit }) => {
  const mock = {
    provider: 'Good Works Company',
    location: '321 One Good Works Way Atlanta, GA 34787 United States',
    pmpValidUntil: 'May, 25 2023',
    trainerStatus: 'Course in Progress',
    contact: {
      name: 'Jane Sutherland',
      phone: '(407) 659-8749',
      email: 'JSutherland@mail.com',
      title: 'VP Operations',
    },
    website: 'http://www.goodworks.com',
  };

  return (
    <div className="font-agrandir w-screen">
      <div className="md-modal md-effect md-show border-2 border-white rounded-t-sm" id="instructor-info-modal">
        <div className="inline-flex bg-primary text-white w-full items-center">
          <div className="flex-none text-2xl p-2">
            <i className="fas fa-user" />
          </div>
          <h2 className="flex-1 text-2xl p-2">Instructor Information</h2>
          <div className="flex-none p-2">
            <button className="text-3xl" onClick={onClose} type="button">
              <i className="far fa-times-circle" />
            </button>
          </div>
        </div>
        <div className="bg-gray-200 inline-flex w-full items-center">
          <div className="w-5/6 pl-2">{mock.contact.name}</div>
          <div className="w-1/6 text-right">
            <ButtonWithIcon title="Edit" onClick={onEdit} size="2">
              <span>
                <i className="fas fa-edit" />
              </span>
            </ButtonWithIcon>
          </div>
        </div>
        <div className="bg-white p-4">
          <table className="table-fixed w-full">
            <tbody>
              <tr>
                <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                  Provider(s)
                </td>
                <td className="w-2/3 p-3 text-left text-blue-600 border-b-2 font-thin">Good Works Company</td>
              </tr>
              <tr>
                <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                  Location
                </td>
                <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin">
                  321 One Good Works Way
                  <br />
                  Atlanta, GA 34787
                  <br />
                  United States
                </td>
              </tr>
              <tr>
                <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                  PMP Valid Until
                </td>
                <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin">{mock.pmpValidUntil}</td>
              </tr>
              <tr>
                <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                  Contact
                </td>
                <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin">
                  <span className="text-gray-900 font-extrabold">John Smith</span>
                  <br />
                  VP Operations
                  <br />
                  (P) 011-455-554-6678
                  <br />
                  (E) john@goodworks.com
                </td>
              </tr>
              <tr>
                <td className="w-1/3 p-3 text-left text-black font-bold border-r-2" valign="top">
                  Website(s)
                </td>
                <td className="w-2/3 p-3 text-left text-gray-600 font-thin">http://www.goodworksco.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="md-overlay" />
    </div>
  );
};

export default InstructorInfo;
