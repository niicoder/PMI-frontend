const uiEnvIdentifiers = {
  local: 'localhost',
  devModel: 'cav-providerdashboard-webapp',
  integration: {
    defaultUrl: 'cav-int-providerdashboard-webapp',
    customUrl: 'atp.erpint',
  },
  qa: {
    defaultUrl: 'cav-qa-providerdashboard-webapp',
    customUrl: 'atp.erpqa',
  },
  candidate: {
    defaultUrl: 'cav-can-providerdashboard-webapp',
    customUrl: 'atp.candidate',
  },
  production: '',
};

const hostname = window && window.location && window.location.hostname;

const localEndpoints = {
  loginWidgetESM: 'https://idp.int.pmi.org/js/login/pmi-login.esm.js',
  loginWidget: 'https://idp.int.pmi.org/js/login/pmi-login.js',
  loginRedirect: `https://${hostname}:6701/signin-oidc`,
  baseApiUrl: `https://${hostname}:${window.location.port}`,
  providerApiUrl: 'https://cics-int-provider-apiapp.azurewebsites.net',
  clientID: 'provider_dashboard_client',
  ls_name: 'prd.sid',
};

const devModelEndpoints = {
  loginWidgetESM: 'https://idp.int.pmi.org/js/login/pmi-login.esm.js',
  loginWidget: 'https://idp.int.pmi.org/js/login/pmi-login.js',
  loginRedirect: `https://${hostname}/signin-oidc`,
  baseApiUrl: `https://${hostname}`,
  providerApiUrl: 'https://cics-devmodel-provider-apiapp.azurewebsites.net',
  clientID: 'provider_dashboard_client',
  ls_name: 'prd.sid',
};

const integrationEndpoints = {
  loginWidgetESM: 'https://idp.int.pmi.org/js/login/pmi-login.esm.js',
  loginWidget: 'https://idp.int.pmi.org/js/login/pmi-login.js',
  loginRedirect: `https://${hostname}/signin-oidc`,
  baseApiUrl: `https://${hostname}`,
  providerApiUrl: 'https://cics-int-provider-apiapp.azurewebsites.net',
  clientID: 'provider_dashboard_client',
  ls_name: 'prd.sid',
};

const qaEndpoints = {
  loginWidgetESM: 'https://idp.qa.pmi.org/js/login/pmi-login.esm.js',
  loginWidget: 'https://idp.qa.pmi.org/js/login/pmi-login.js',
  loginRedirect: `https://${hostname}/signin-oidc`,
  baseApiUrl: `https://${hostname}`,
  providerApiUrl: 'https://cics-qa-provider-apiapp.azurewebsites.net',
  clientID: 'provider_dashboard_client',
  ls_name: 'prd.sid',
};

const candidateEndpoints = {
  loginWidgetESM: 'https://idp.candidate.pmi.org/js/login/pmi-login.esm.js',
  loginWidget: 'https://idp.candidate.pmi.org/js/login/pmi-login.js',
  loginRedirect: `https://${hostname}/signin-oidc`,
  baseApiUrl: `https://${hostname}`,
  providerApiUrl: 'https://cics-can-provider-apiapp.azurewebsites.net',
  clientID: 'provider_dashboard_client',
  ls_name: 'prd.sid',
};

const productionEndpoints = {
  loginWidgetESM: 'https://idp.pmi.org/js/login/pmi-login.esm.js',
  loginWidget: 'https://idp.pmi.org/js/login/pmi-login.js',
  loginRedirect: `https://${hostname}/signin-oidc`,
  baseApiUrl: `https://${hostname}`,
  providerApiUrl: 'https://cics-prod-provider-apiapp.azurewebsites.net',
  clientID: 'provider_dashboard_client',
  ls_name: 'prd.sid',
};

const getEnvEndpoints = () => {
  if (hostname.includes(uiEnvIdentifiers.local)) {
    return localEndpoints;
  }
  if (hostname.includes(uiEnvIdentifiers.devModel)) {
    return devModelEndpoints;
  }
  if (
    hostname.includes(uiEnvIdentifiers.integration.defaultUrl) ||
    hostname.includes(uiEnvIdentifiers.integration.customUrl)
  ) {
    return integrationEndpoints;
  }
  if (hostname.includes(uiEnvIdentifiers.qa.defaultUrl) || hostname.includes(uiEnvIdentifiers.qa.customUrl)) {
    return qaEndpoints;
  }
  if (
    hostname.includes(uiEnvIdentifiers.candidate.defaultUrl) ||
    hostname.includes(uiEnvIdentifiers.candidate.customUrl)
  ) {
    return candidateEndpoints;
  }
  if (hostname.includes(uiEnvIdentifiers.production)) {
    return productionEndpoints;
  }
  return null;
};

export default getEnvEndpoints;
