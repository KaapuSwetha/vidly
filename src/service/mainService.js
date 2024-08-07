import helpers from "./crypto";
import http from "./httpServer";

const apiUrl = import.meta.env.VITE_API_URL;

export async function backEndCall(route) {
  console.log("entered")
// http.setJwt(getJwt()); 

  const { data } = await http.post(apiUrl + route);
  return helpers.decryptobj(data);
}
export async function backEndCallObj(route, obj) {
  const drreqpob = await helpers.encryptobj(obj);

  const { data } = await http.post(apiUrl + route, {
    enc: drreqpob,
  });
  return helpers.decryptobj(data);
}