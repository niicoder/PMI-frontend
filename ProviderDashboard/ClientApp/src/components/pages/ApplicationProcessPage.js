import React from 'react';
import useSWR, { mutate } from 'swr';
import { Redirect, useParams } from 'react-router';
import TopMenu from '../common/TopMenu';
import { fetcher } from '../../utils/request';
import ApplicationSteps from '../application/ApplicationSteps';

const ApplicationProcessPage = () => {
  const { step } = useParams();
  const { data: applications } = useSWR('/api/providerapplication', fetcher);
  const { data: application } = useSWR(
    applications && applications[0] && applications[0].id ? `/api/providerapplication/${applications[0].id}` : null,
    fetcher,
  );
  const { data: plans } = useSWR(application ? `/api/plans/${application.id}` : null, fetcher);

  if (applications && applications.length === 0) return <Redirect to="/application-submit" />;
  if (!application) return <div>Loading...</div>;

  const myApp = applications.map((i) => i.id).includes(application.id);

  const revalidateApplication = async () => {
    await mutate(`/api/providerapplication/${application.id}`);
  };

  return (
    <div className="">
      <TopMenu />

      {application && (
        <div className="mt-5 container mx-auto flex flex-col lg:flex-row px-3">
          <ApplicationSteps
            application={application}
            onSuccess={revalidateApplication}
            step={step || ''}
            plans={plans}
            myApp={myApp}
          />
        </div>
      )}
    </div>
  );
};

export default ApplicationProcessPage;
