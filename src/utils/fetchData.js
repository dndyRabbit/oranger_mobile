import axios from 'axios';

import {REACT_NATIVE_BASE_URL, REACT_NATIVE_PRODUCT_URL} from './url';

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${REACT_NATIVE_PRODUCT_URL}/api/${url}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  // console.log(post);
  const res = await axios.post(`${REACT_NATIVE_PRODUCT_URL}/api/${url}`, post, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`${REACT_NATIVE_PRODUCT_URL}/api/${url}`, post, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(
    `${REACT_NATIVE_PRODUCT_URL}/api/${url}`,
    post,
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true,
    },
  );
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`${REACT_NATIVE_PRODUCT_URL}/api/${url}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
  });
  return res;
};
