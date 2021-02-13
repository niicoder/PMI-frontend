import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import ProcessMenu from './ProcessMenu';
import Step1 from './Step1';
import StatusStep from './StatusStep';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import { isAnyAdmin } from '../../utils/persist';
import ProcessingNotes from '../pages/admin/ProcessingNotes';
import AdminActions from '../admin/InstructorAdminActions';
import UserActions from './UserActions';
import { makeRequest } from '../../utils/request';
import constants from '../../constants';

const InstructorApplicationSteps = ({ step, application, onSuccess, isInstructor }) => {
  const isAdmin = isAnyAdmin();

  const path = isAdmin ? '/admin/pmp/application/:id' : '/instructor/pmp/application/:id';

  useEffect(() => {
    const updateAppStatus = async () => {
      await makeRequest('post', `api/instructorapplication/SetPending/${application.id}`);
      onSuccess();
    };

    if (!isAdmin && application.statusId === constants.instructorAppStatus.opened.statusId) {
      updateAppStatus();
    }
  }, [isAdmin, application]);

  return (
    <>
      <div className="w-full lg:w-1/4 mr-5 mb-5 lg:mb-0">
        <ProcessMenu step={step} application={application} admin={isAdmin} />
        <div className="my-5 px-3 hidden lg:block">
          <UserActions application={application} onSuccess={onSuccess} />
        </div>
        {isAdmin && (
          <div className="my-5 px-3 hidden lg:block">
            <AdminActions application={application} onSuccess={onSuccess} />
          </div>
        )}
      </div>
      <div className="w-full lg:w-3/4">
        <Switch>
          <Route path={`${path}`} exact>
            <Step1 isInstructor={isInstructor} application={application} onSuccess={onSuccess} admin={isAdmin} />
          </Route>
          <Route path={`${path}/status`} exact>
            <StatusStep application={application} admin={isAdmin} />
          </Route>

          {isAdmin && (
            <Route path={`${path}/notes`} exact>
              <ProcessingNotes application={application} onSuccess={onSuccess} isInstructorApp />
            </Route>
          )}

          {/* Messages hidden for now */}
          {/* <Route path={`${path}/messages`} exact>
            <MessagesSection application={application} />
          </Route> */}

          <Route path={`${path}/step2`} exact>
            <Step2 isInstructor={isInstructor} application={application} onSuccess={onSuccess} admin={isAdmin} />
          </Route>
          <Route path={`${path}/step3`} exact>
            <Step3 isInstructor={isInstructor} application={application} onSuccess={onSuccess} admin={isAdmin} />
          </Route>
          <Route path={`${path}/step4`} exact>
            <Step4 isInstructor={isInstructor} application={application} onSuccess={onSuccess} admin={isAdmin} />
          </Route>
          <Route path={`${path}/step5`} exact>
            <Step5 isInstructor={isInstructor} application={application} onSuccess={onSuccess} admin={isAdmin} />
          </Route>
          <Route path={`${path}/step6`} exact>
            <Step6 isInstructor={isInstructor} application={application} onSuccess={onSuccess} admin={isAdmin} />
          </Route>
        </Switch>
        <div className="my-5 px-3 block lg:hidden">
          <UserActions application={application} onSuccess={onSuccess} />
        </div>
        {isAdmin && (
          <div className="my-5 px-3 block lg:hidden">
            <AdminActions application={application} onSuccess={onSuccess} />
          </div>
        )}
      </div>
    </>
  );
};

export default InstructorApplicationSteps;
