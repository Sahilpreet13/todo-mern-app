import axios from "axios";

const registerUser = (data) => {
  return axios.post("/api/v1/user/register", data);
};

const loginUSer = (data) => {
  return axios.post("/api/v1/user/login", data);
};

const AuthServices = { registerUser, loginUSer };

export default AuthServices;
