import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/";

export default function Caller(
  endpoint,
  method = "GET",
  body = {},
  id = "",
  token = ""
) {
  return axios(`${baseUrl}${endpoint}`, {
    method: method,
    data: body,
    headers: {
      id,
      "x-access-token": token
    }
  });
}
