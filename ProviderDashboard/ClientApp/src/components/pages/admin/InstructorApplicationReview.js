import React from 'react';
import useSWR, { mutate } from 'swr';
import { useParams } from 'react-router';
import { fetcher } from '../../../utils/request';
import InstructorApplicationSteps from '../../instructorapplication/InstructorApplicationSteps';

const PMPApplicationReview = () => {
  const { id, step } = useParams();
  const { data: application } = useSWR(`/api/instructorapplication/${id}`, fetcher);

  if (!application) return <div>Loading...</div>;

  const revalidateApplication = async () => {
    await mutate(`/api/instructorapplication/${id}`);
  };

  return (
    <div className="mt-5 container mx-auto flex flex-col lg:flex-row px-3">
      <InstructorApplicationSteps onSuccess={revalidateApplication} application={application} step={step || ''} />
    </div>
  );
};

export default PMPApplicationReview;
