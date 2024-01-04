import axios from "axios";
const base = "http://localhost:3000/api/v1";
export default async function login(body, options = {}) {
  const { data } = await axios.post(`${base}/login`, body);
  localStorage.setItem("token", data.data.token);
  return data;
}
