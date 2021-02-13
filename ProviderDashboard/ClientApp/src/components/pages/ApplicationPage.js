import React from 'react';
import useSWR from 'swr';
import { Redirect } from 'react-router';
import { fetcher } from '../../utils/request';
import TopMenu from '../common/TopMenu';
import ApplicationStatus from '../common/ApplicationStatus';

const ApplicationPage = () => {
  const { data: applications } = useSWR('/api/providerapplication', fetcher);
  const { data: application } = useSWR(
    applications && applications[0] && applications[0].id ? `/api/providerapplication/${applications[0].id}` : null,
    fetcher,
  );

  if (applications && applications.length === 0) return <Redirect to="/application-submit" />;

  if (!application) return <div>Loading...</div>;

  return (
    <div className="">
      <TopMenu />

      {application && <ApplicationStatus application={application} showButton />}
    </div>
  );
};

export default ApplicationPage;
