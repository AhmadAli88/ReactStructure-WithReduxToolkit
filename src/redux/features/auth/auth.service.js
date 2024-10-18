/* eslint-disable */
import api from "../../../utils/api";

const signInApi = async (userAccount) => {
  const response = await api.post(`/login`, userAccount);
  return response.data;
};

const createAccountApi = async (userAccount) => {
  const response = await api.post(`/register`, userAccount);
  return response.data;
};

const auth = {
  signInApi,
  createAccountApi,
};

export default auth;
