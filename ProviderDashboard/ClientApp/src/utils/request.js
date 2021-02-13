/* eslint-disable consistent-return */
import axios from 'axios';
import _ from 'lodash';
import { getToken } from './persist';
import getEnvEndpoints from '../config/endpoints';

const endpoints = getEnvEndpoints();

const axiosInstance = axios.create({
  baseURL: endpoints.baseApiUrl,
});

const parseErrors = (err) => {
  console.log(err);
  if (err.response) {
    switch (err.response.status) {
      case 401:
        if (getToken()) {
          window.location = '/';
        } else {
          window.location = '/login';
        }
        break;
      default:
        throw err.response.data;
    }
  } else if (err.request) {
    console.log(err, 'network error');
  } else {
    console.log('something unique happened');
  }
};

const createHeaders = (additionalHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const makeRequest = async (method, url, data = {}, additionalHeaders = {}) => {
  const headers = createHeaders(additionalHeaders);

  try {
    const res = await axiosInstance({
      method,
      url,
      data,
      headers,
    });
    return res.data;
  } catch (err) {
    parseErrors(err);
  }
};

export const makeFormDataRequest = async ({ url, method, data }) => {
  const headers = await createHeaders();
  const formData = new FormData();
  _.forEach(data, (val, key) => {
    formData.append(key, val);
  });

  try {
    const res = await axiosInstance({
      method,
      url,
      data: formData,
      headers: { ...headers, 'Content-Type': 'multipart/form-data' },
    });

    return res.data;
  } catch (err) {
    await parseErrors(err);
  }
};

export const fetcher = async (path, method = 'get') => {
  try {
    const headers = createHeaders();
    const res = await axiosInstance[method](path, { headers });
    return res.data;
  } catch (err) {
    parseErrors(err);
  }
};

export const postFetcher = async (path, data) => {
  try {
    const headers = createHeaders();
    const res = await axiosInstance.post(path, data, { headers });
    return res.data;
  } catch (err) {
    parseErrors(err);
  }
};

export const anonymousFetcher = async (path) => {
  try {
    const res = await axiosInstance.get(path);
    return res.data;
  } catch (err) {
    parseErrors(err);
  }
};
