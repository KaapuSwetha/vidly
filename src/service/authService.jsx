import jwtDecode from "jwt-decode";
import http from "./httpServer";
import { apiUrl } from "./configlog.json";

const tokenkey = "token";

const apiUrlLogin = apiUrl + "auth";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiUrlLogin, { email, password });
  localStorage.setItem(tokenkey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenkey);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenkey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function loginWithJwt() {
  localStorage.setItem(tokenkey, jwt);
}

export function getJwt() {
  return localStorage.getItem(tokenkey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
