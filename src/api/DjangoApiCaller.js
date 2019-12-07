import axios from "axios";

const baseUrl = "http://model.shawnta.tech:8000/api/";
// const baseUrl = "http://127.0.0.1:8000/api/";

export default function Caller(endpoint, method = "GET", body = {}) {
  return axios(`${baseUrl}${endpoint}`, {
    method: method,
    data: body,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
