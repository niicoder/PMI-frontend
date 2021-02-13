import React from 'react';
import useSWR, { mutate } from 'swr';
import { Redirect, useParams } from 'react-router';
import { fetcher } from '../../utils/request';
import { getUserId } from '../../utils/persist';
import Spinner from '../common/Spinner/Spinner';
import InstructorApplicationSteps from '../instructorapplication/InstructorApplicationSteps';

const ApplicationProcessPage = ({ isInstructor }) => {
  const userId = getUserId();
  const { id, step } = useParams();

  const { data: applications } = useSWR(`/api/instructorapplication/GetApplicationByInstructorId/${userId}`, fetcher);

  if (!applications)
    return (
      <div className="flex justify-center my-5">
        <Spinner />
      </div>
    );

  const application = applications.results.find((app) => app.id === id);

  if (!application) return <Redirect to="/instructor" />;

  const revalidateApplication = async () => {
    await mutate(`/api/instructorapplication/GetApplicationByInstructorId/${userId}`);
  };

  return (
    <div className="">
      {application && (
        <div className="mt-5 container mx-auto flex flex-col lg:flex-row px-3">
          <InstructorApplicationSteps
            isInstructor={isInstructor}
            application={application}
            onSuccess={revalidateApplication}
            step={step || ''}
          />
        </div>
      )}
    </div>
  );
};

export default ApplicationProcessPage;
