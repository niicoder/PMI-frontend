import React from 'react';
import { Redirect, useHistory } from 'react-router';
import useSWR from 'swr';
import ApplicationForm from '../forms/ApplicationForm';
import { fetcher } from '../../utils/request';

const ApplicationSubmitPage = () => {
  const history = useHistory();
  const { data: applications } = useSWR('/api/providerapplication', fetcher);

  if (!applications) return <div>Loading...</div>;

  if (applications.length > 0) return <Redirect to="/application" />;

  return (
    <div className="container mx-auto mt-5 px-3">
      <h2 className="mt-1 text-3xl text-center tracking-tight leading-10 font-bold text-gray-900 sm:leading-snug font-agrandir">
        Application Request
      </h2>
      <h3 className="text-center text-sm font-bold mt-2">
        Fill out the form below to request to be considered for the Authorized Training Program
      </h3>

      <div>
        <ApplicationForm showPrint onSuccess={() => history.push('/application-submitted')} />
      </div>
    </div>
  );
};

export default ApplicationSubmitPage;
