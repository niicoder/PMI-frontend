import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { persistUser, isAnyAdmin } from '../../utils/persist';
import { makeRequest } from '../../utils/request';
import useLoginWidget from '../../hooks/useLoginWidget';
import getEnvEndpoints from '../../config/endpoints';

const endpoints = getEnvEndpoints();

const LoginPage = () => {
  const loaded = useLoginWidget();
  const history = useHistory();

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    window.onLogin = async (data) => {
      const user = {
        token: data.access_token,
        email: data.email,
        id: data.id,
        sub: data.sub,
        name: data.name,
      };

      await persistUser(user);

      if (await isAnyAdmin()) {
        await history.push('/admin');
      } else {
        try {
          const userType = await makeRequest('get', '/api/getaccess');
          if (userType === 'PVRSVC:PVD') {
            return history.push('/provider');
          }
          if (userType === 'PVRSVC:ITR') {
            return history.push('/instructor');
          }
        } catch (err) {
          console.error(err);
        }
        await history.push('/application-submit');
      }
    };
  }, [history]);

  return (
    <div className="pt-24">
      <div className="container mx-auto">
        {loaded && (
          <pmi-login-iframe
            client-id={endpoints.clientID}
            on-logged-in="onLogin"
            scope="PVRSVC"
            modal="false"
            return-url={endpoints.loginRedirect}
            style={{
              display: 'block',
              height: '550px',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
