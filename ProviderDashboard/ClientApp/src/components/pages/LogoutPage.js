import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { clearUserData } from '../../utils/persist';
import useLoginWidget from '../../hooks/useLoginWidget';
import getEnvEndpoints from '../../config/endpoints';

const endpoints = getEnvEndpoints();

const LogoutPage = () => {
  const loaded = useLoginWidget();
  const history = useHistory();

  useEffect(() => {
    let logoutTriggered = false;
    let logoutTimeout = null;
    const doLogout = () => {
      if (logoutTimeout) {
        clearTimeout(logoutTimeout);
      }
      clearUserData();
      history.push('/');
    };

    window.onLogin = () => {
      const loginEl = document.querySelector('pmi-login-iframe');
      loginEl.logout();
      // wait for 1.5 seconds, then force logout if onLogout event is not triggered
      logoutTimeout = setTimeout(() => {
        if (logoutTriggered !== true) {
          doLogout();
        }
      }, 1500);
    };

    window.onLogout = () => {
      logoutTriggered = true;
      doLogout();
    };
  }, [history]);

  return (
    <div className="pt-24">
      <div className="container mx-auto invisible">
        {loaded && (
          <pmi-login-iframe
            client-id={endpoints.clientID}
            on-logged-in="onLogin"
            on-logged-out="onLogout"
            scope="PVRSVC"
            modal="false"
            return-url={endpoints.loginRedirect}
            style={{
              display: 'block',
              height: '0px',
              width: '0px',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LogoutPage;
