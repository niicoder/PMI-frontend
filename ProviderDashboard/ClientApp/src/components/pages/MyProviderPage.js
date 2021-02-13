import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../../utils/request';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import TopMenu from '../common/TopMenu';

const MyProvidersPage = () => {
  const { data: providers } = useSWR('/api/providers', fetcher);
  const { data: provider } = useSWR(
    providers && providers[0] && providers[0].id ? `/api/providers/${providers[0].id}` : null,
    fetcher,
  );

  if (!provider) return <div>Loading...</div>;

  // TODO replace mock data with provider data

  return (
    <div>
      <TopMenu />

      <div className="container mx-auto mt-12 text-center font-agrandir">
        <h2 className="text-black font-bold text-2xl bg-gray-400 py-2 rounded-tl-md rounded-tr-md border border-solid border-gray-300">
          Good Works Company
        </h2>
        <p className="text-blue-500 text-sm bg-gray-300 py-1">Provider Since 1/01/2020</p>
        <div className="bg-gray-200 p-8">
          <table className="table-fixed w-full">
            <tbody>
              <tr>
                <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                  Organization Name
                </td>
                <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin">Good Works Company</td>
              </tr>
              <tr>
                <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                  Address
                </td>
                <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin">
                  123 One Good Works Way Atlanta, GA 34787
                  <br />
                  United States
                </td>
              </tr>
              <tr>
                <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                  Locations and
                  <br />
                  Trainers
                </td>
                <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin">
                  <span className="text-gray-900 font-extrabold">1</span>
                  &nbsp;Location
                  <br />
                  <span className="text-gray-900 font-extrabold">2</span>
                  &nbsp;Full Time Trainers
                  <br />
                  <span className="text-gray-900 font-extrabold">4</span>
                  &nbsp;Contract Trainers
                </td>
              </tr>
              <tr>
                <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                  Primary
                  <br />
                  Aministrative
                  <br />
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
          <div className="mt-4">
            <Link to="/my-provider/info">
              <ButtonWithIcon title="View Details">
                <span className="w-6 text-xl">
                  <i className="fas fa-folder-open" />
                </span>
              </ButtonWithIcon>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProvidersPage;
