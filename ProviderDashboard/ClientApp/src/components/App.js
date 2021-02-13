import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import Spinner from './common/Spinner/Spinner';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';
import HomePage from './pages/HomePage';
import ApplicationSubmitPage from './pages/ApplicationSubmitPage';
import LoginPage from './pages/LoginPage';
import ApplicationSubmittedPage from './pages/ApplicationSubmittedPage';
import { getToken, isAnyAdmin, getUserId } from '../utils/persist';
import ApplicationPage from './pages/ApplicationPage';
import InstructorApplicationProcessPage from './pages/InstructorApplicationProcessPage';
import ApplicationProcessPage from './pages/ApplicationProcessPage';
import LogoutPage from './pages/LogoutPage';
import AdminPage from './pages/AdminPage';
import ATPResourcesPage from './pages/ATPResourcesPage';
import ProgramHandbookPage from './pages/ProgramHandbookPage';
import MyProviderPageMock from './pages/MyProviderPageMock';
import InstructorDashboard from './pages/InstructorDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import { makeRequest } from '../utils/request';
// import MyProviderPage from "./pages/MyProviderPage";
// import MyProviderInfoPage from "./pages/MyProviderInfoPage";
// import MyProviderInstructorPage from "./pages/MyProviderInstructorPage";
// import MyProviderCoursePage from "./pages/MyProviderCoursePage";
// import MessagesPage from "./pages/MessagesPage";

const App = () => {
  const isAuthenticated = !!getToken();
  const location = useLocation();
  const history = useHistory();
  const isAdmin = isAnyAdmin();
  const userId = getUserId();
  const [isInstructor, setIsInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      if (isAuthenticated && !isAdmin) {
        try {
          const data = await makeRequest('get', '/api/getaccess');
          if (data === 'PVRSVC:PVD') {
            setIsInstructor(false);
          } else if (data === 'PVRSVC:ITR') {
            setIsInstructor(true);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, isAdmin]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!loading) {
      const allowedGuestRoutes = ['/', '/login'];

      if (isAuthenticated && location.pathname === '/') {
        if (isAdmin) {
          return history.push('/admin');
        }
        if (isInstructor === false) {
          return history.push('/provider');
        }
        if (isInstructor) {
          return history.push('/instructor');
        }
        return history.push('/application-submit');
      }

      if (!isAuthenticated && !allowedGuestRoutes.includes(location.pathname)) {
        return history.push('/login');
      }
    }
  }, [isAuthenticated, userId, location.pathname, history, isInstructor, loading]);

  if (loading)
    return (
      <div>
        <div className="flex justify-center my-5">
          <Spinner />
        </div>
      </div>
    );

  return (
    <div>
      <SiteHeader isLoggedIn={isAuthenticated} />
      <div className="min-h-screen">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/application/:id/:step?">
            <ApplicationProcessPage />
          </Route>

          {!isAdmin && (
            <Route path="/instructor/pmp/application/:id/:step?" exact>
              <InstructorApplicationProcessPage isInstructor={isInstructor} />
            </Route>
          )}

          <Route path="/application-submit" exact>
            <ApplicationSubmitPage />
          </Route>
          <Route path="/application-submitted" exact>
            <ApplicationSubmittedPage />
          </Route>

          <Route path="/application/:id?" exact>
            <ApplicationPage />
          </Route>

          <Route path="/instructor" exact>
            <InstructorDashboard />
          </Route>

          <Route path="/provider" exact>
            <ProviderDashboard />
          </Route>

          {/* Messages hidden for now */}
          {/*  <Route path="/messages" exact>
                            <MessagesPage />
                          </Route> */}

          <Route path="/program-handbook" exact>
            <ProgramHandbookPage />
          </Route>

          <Route path="/atp-resources" exact>
            <ATPResourcesPage />
          </Route>

          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/logout" exact>
            <LogoutPage />
          </Route>
        </Switch>

        {!isAdmin && (
          <Switch>
            {/* Hidden for now */}
            {/*
            <Route path="/my-provider/info" exact>
              <MyProviderInfoPage />
            </Route>
            <Route path="/my-provider/instructor" exact>
              <MyProviderInstructorPage />
            </Route>
            <Route path="/my-provider/course" exact>
              <MyProviderCoursePage />
           </Route> */}
            <Route path="/my-provider" exact>
              <MyProviderPageMock />
            </Route>
          </Switch>
        )}

        {isAdmin && (
          <Switch>
            <Route path="/admin">
              <AdminPage />
            </Route>
          </Switch>
        )}
      </div>
      <SiteFooter />
    </div>
  );
};

export default App;
