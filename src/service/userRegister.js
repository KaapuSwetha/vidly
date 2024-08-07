import jwtDecode from "jwt-decode";
import helpers from "./crypto";
import http from "./httpServer";
const apiUrl = import.meta.env.VITE_API_URL;
const tokenkey = "token";

http.setJwt(getJwt());

export async function backEndCall(route) {
  const { data } = await http.post(apiUrl + route);
  return helpers.decryptobj(data);
}

export async function register(route, obj) {
  const drreqpob = await helpers.encryptobj(obj);

  const { data } = await http.post(apiUrl + route, {
    enc: drreqpob,
  });
  return helpers.decryptobj(data);
}

export async function backEndCallObj(route, obj) {
  const drreqpob = await helpers.encryptobj(obj);
  
  const { data:jwt } = await http.post(apiUrl +route, {
    enc: drreqpob,
  });
  
  localStorage.setItem(tokenkey, jwt);
  
  return helpers.decryptobj(jwt);
}
export async function start(route, obj) {
  const drreqpob = await helpers.encryptobj(obj);

  const { data } = await http.post(apiUrl + route, {
    enc: drreqpob,
  });
  return helpers.decryptobj(data);
}
export async function game(route, obj) {
  const drreqpob = await helpers.encryptobj(obj);

  const { data } = await http.post(apiUrl + route, {
    enc: drreqpob,
  });
  return helpers.decryptobj(data);
}

  export function getCurrentUser() {
    try {
      const jwt = localStorage.getItem(tokenkey);
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  }
  
  export function getJwt() {
    return localStorage.getItem(tokenkey);
  }

  export default{
    backEndCallObj,
    getCurrentUser,
    getJwt
  }