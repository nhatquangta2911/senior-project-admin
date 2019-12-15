import axios from "axios";

const baseUrl =
  "https://oakhosndol.execute-api.us-east-1.amazonaws.com/dev/api";

export default function Caller(
  endpoint,
  method = "GET",
  body = {},
  id = "",
  token = ""
) {
  return axios(`${baseUrl}/${endpoint}`, {
    method: method,
    data: body,
    headers: {}
  });
}
