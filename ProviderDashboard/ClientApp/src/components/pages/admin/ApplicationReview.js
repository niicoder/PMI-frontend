import React from 'react';
import useSWR, { mutate } from 'swr';
import { useParams } from 'react-router';
import { fetcher } from '../../../utils/request';
import ApplicationSteps from '../../application/ApplicationSteps';

const ApplicationReview = () => {
  const { id, step } = useParams();
  const { data: myApplications } = useSWR('/api/providerapplication', fetcher);
  const { data: application } = useSWR(`/api/admin/applications/${id}`, fetcher);
  const { data: plans } = useSWR(application ? `/api/plans/${application.id}` : null, fetcher);

  if (!application || !myApplications) return <div>Loading...</div>;

  const myApp = myApplications.map((i) => i.id).includes(application.id);

  const revalidateApplication = async () => {
    await mutate(`/api/admin/applications/${id}`);
  };

  return (
    <div className="mt-5 container mx-auto flex flex-col lg:flex-row px-3">
      <ApplicationSteps
        onSuccess={revalidateApplication}
        application={application}
        step={step || ''}
        admin
        myApp={myApp}
        plans={plans}
      />
    </div>
  );
};

export default ApplicationReview;
