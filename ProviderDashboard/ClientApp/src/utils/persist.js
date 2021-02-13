import jwt from 'jsonwebtoken';
import _ from 'lodash';
import getEnvEndpoints from '../config/endpoints';

const endpoints = getEnvEndpoints();

export const persistUser = (data) => {
  localStorage.setItem(endpoints.ls_name, JSON.stringify(data));
};

export const getUserData = () => {
  return JSON.parse(localStorage.getItem(endpoints.ls_name));
};

export const clearUserData = () => {
  localStorage.removeItem(endpoints.ls_name);
};

const isExpired = (token) => {
  const decoded = jwt.decode(token);
  return decoded.exp * 1000 < Date.now();
};

export const getUserId = () => {
  const userData = getUserData();

  if (userData && !isExpired(userData.token)) {
    return userData.id;
  }

  return null;
};

export const getToken = () => {
  const userData = getUserData();

  if (userData && !isExpired(userData.token)) {
    return userData.token;
  }

  return null;
};

export const hasUserData = () => {
  return !!localStorage.getItem(endpoints.ls_name);
};

export const getPermissions = () => {
  const token = getToken();
  if (token) {
    return jwt.decode(token).permissions;
  }

  return '';
};

export const isAdminR = () => {
  const permissions = getPermissions();

  if (permissions && Array.isArray(permissions)) {
    return _.includes(permissions, 'PVRSVC:ADMR');
  }

  return permissions && permissions === 'PVRSVC:ADMR';
};
export const isAdminA = () => {
  const permissions = getPermissions();

  if (permissions && Array.isArray(permissions)) {
    return _.includes(permissions, 'PVRSVC:ADMA');
  }

  return permissions && permissions === 'PVRSVC:ADMA';
};
export const isAnyAdmin = () => {
  const permissions = getPermissions();

  if (permissions && Array.isArray(permissions)) {
    return _.includes(permissions, 'PVRSVC:ADMA') || _.includes(permissions, 'PVRSVC:ADMR');
  }

  return permissions && (permissions === 'PVRSVC:ADMA' || permissions === 'PVRSVC:ADMR');
};
