import React, { useMemo } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import AdminTab from '../admin/AdminTab';
import constants from '../../constants';
import AdminDashboard from './admin/AdminDashboard';
import ApplicationReview from './admin/ApplicationReview';
import InstructorAdminDashboard from './admin/InstructorAdminDashboard';
import InstructorApplicationReview from './admin/InstructorApplicationReview';

const AdminPage = () => {
  const location = useLocation();
  const tab = useMemo(() => {
    if (location.pathname.includes(constants.adminTabs.pmp)) {
      return constants.adminTabs.pmp;
    }
    return constants.adminTabs.dashboard;
  }, [location.pathname]);

  return (
    <div>
      <AdminTab tab={tab} />

      <div className="container mx-auto mt-12">
        <div className="mt-4">
          <Switch>
            <Route path="/admin" exact>
              <AdminDashboard />
            </Route>

            <Route path="/admin/application/:id/:step?" exact>
              <ApplicationReview />
            </Route>

            <Route path="/admin/pmp" exact>
              <InstructorAdminDashboard />
            </Route>

            <Route path="/admin/pmp/application/:id/:step?" exact>
              <InstructorApplicationReview />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
