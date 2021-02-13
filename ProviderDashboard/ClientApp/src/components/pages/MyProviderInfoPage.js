import React, { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../utils/request';
import TopMenu from '../common/TopMenu';
import ProviderTab from '../providers/ProviderTab';
import EditButton from '../buttons/EditButton';

const MyProviderInfoPage = () => {
  const [tab] = useState(1);

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

      <ProviderTab tab={tab} />

      <div className="container mx-auto mt-12 text-center font-agrandir">
        <h2 className="relative text-black font-bold text-2xl bg-gray-400 py-2 rounded-tl-md rounded-tr-md border border-solid border-gray-300">
          Good Works Company
          <div className="flex flex-col text-blue-500 absolute top-0 right-0 mt-2 mr-4">
            <span className="text-base leading-none">Provider Since:</span>
            <span className="text-sm italic">01/01/2020</span>
          </div>
        </h2>
        <div className="bg-gray-200 px-4 py-2">
          <div className="flex flex-row">
            <table className="table-fixed w-1/2 text-sm mx-4">
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
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">
                    <EditButton />
                    123 One Good Works Way Atlanta, GA 34787 United States
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    Locations and Trainers
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">
                    <EditButton />
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
                    Primary Aministrative Contact
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">
                    <EditButton />
                    John Smith
                    <br />
                    VP Operations
                    <br />
                    (P) 011-455-554-6678
                    <br />
                    (E) john@goodworks.com
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    Compliance Administrative Contact
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">
                    <EditButton />
                    John Smith
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
                    Secondary Contact
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 font-thin relative">
                    <EditButton />
                    Michael Scott
                    <br />
                    Branch Manager
                    <br />
                    (P) 011-455-554-6678
                    <br />
                    (E) michael@goodworks.com
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table-fixed w-1/2 text-sm mx-4">
              <tbody>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    Status
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin">Active</td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    DUN & Bradstreet
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">
                    <EditButton />
                    654646546546546
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    EINS (or local equivalent)
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">
                    <EditButton />
                    65-4654654
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    Websites
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">
                    <EditButton />
                    <a href="http://www.goodworksco.com">http://www.goodworksco.com</a>
                    <br />
                    <a href="http://www.goodworkspmptraining.com">http://www.goodworkspmptraining.com</a>
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-b-2 border-r-2" valign="top">
                    Company Email
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">
                    <EditButton />
                    atpinbox@goodworksco.com
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-r-2" valign="top">
                    PMI ID Number
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 border-b-2 font-thin relative">
                    <EditButton />
                    123456789
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 p-3 text-left text-black font-bold border-t-2 border-r-2" valign="top">
                    Language(s)
                  </td>
                  <td className="w-2/3 p-3 text-left text-gray-600 font-thin relative">
                    <EditButton />
                    (EN-US) English
                    <br />
                    (ES-MX) Spanish
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="my-8">
          <h2 className="relative text-black font-bold text-2xl bg-gray-400 py-2 rounded-tl-md rounded-tr-md border border-solid border-gray-300">
            <EditButton />
            Organization Description for CCRS
          </h2>
          <div className="bg-gray-200 px-8 py-4 text-left text-xs text-gray-700">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id magna adipiscing venenatis, tortor dictumst
              purus a quis vel. Pretium arcu, lectus egestas ullamcorper facilisi mattis ut eu, ipsum. Fusce et nulla
              elit molestie egestas diam eu. Turpis volutpat, pretium urna vitae urna imperdiet diam non, urna.
              Scelerisque ornare ac mauris risus. Velit tincidunt vel aenean est egestas. At cras amet, aliquam a.
              Auctor ut urna in sit enim, facilisis vivamus sit. Molestie suspendisse augue nisi urna. Faucibus
              consectetur egestas scelerisque sed amet feugiat. Tempus, tristique et imperdiet pulvinar erat ut eu amet.
            </p>
            <br />
            <p>
              Arcu in interdum enim, velit quam. Orci eu amet faucibus lectus dictum in enim. Vitae hac orci, felis
              aenean rutrum convallis praesent felis morbi. Massa molestie malesuada ipsum vel bibendum in. Et dignissim
              in nullam massa urna orci tempor, imperdiet. Eu proin fames vitae aenean nec, vel hendrerit. Sed dictum
              quam semper elit maecenas tristique praesent eu, ornare. Quam blandit sagittis ultrices felis proin odio.
              Integer bibendum fringilla id vitae mi diam turpis. Orci eu orci mauris orci, arcu duis. Accumsan
              pellentesque volutpat amet rutrum rhoncus. Mauris, lectus arcu nec nulla. Velit odio et pellentesque
              sollicitudin sit eu enim at accumsan. Tortor vulputate viverra cursus tincidunt sed lectus orci diam. Et
              sit dignissim nulla erat turpis metus justo, sem amet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProviderInfoPage;
