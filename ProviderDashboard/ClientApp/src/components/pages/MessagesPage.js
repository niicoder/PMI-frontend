import React from 'react';
import useSWR from 'swr';
import { Redirect } from 'react-router';
import TopMenu from '../common/TopMenu';
import Messages from '../admin/Messages';
import { dummyMessages } from '../../utils/dummyData';
import { fetcher } from '../../utils/request';

const MessagesPage = () => {
  const { data: applications } = useSWR('/api/providerapplication', fetcher);
  const { data: application } = useSWR(
    applications && applications[0] && applications[0].id ? `/api/providerapplication/${applications[0].id}` : null,
    fetcher,
  );

  if (applications && applications.length === 0) return <Redirect to="/application-submit" />;

  if (!application) return <div>Loading...</div>;

  return (
    <div>
      <TopMenu />

      <div className="pt-24">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <div className="font-bold text-3xl mb-3">Messages Page</div>
            <div className="font-bold text-xl">Placeholder. Coming soon...</div>
          </div>
        </div>
      </div>

      <div className="hidden">
        <Messages messages={dummyMessages} application={application} />
      </div>
    </div>
  );
};

export default MessagesPage;
