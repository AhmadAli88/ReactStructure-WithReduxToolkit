import api from "../../../utils/api";

const getAllUserList = async (data) => {
  const response = await api.get(`/users/all`, {
    params: data,
  });
  return response.data;
};

const user = {
  getAllUserList,
};

export default user;
