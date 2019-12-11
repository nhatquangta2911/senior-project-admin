import Caller from "./ServerlessApi";

const prefix = "v2/transactions";

export default {
  getAll() {
    return Caller(prefix, "GET");
  },
  getCurrent() {
    return Caller(prefix + "/current", "GET");
  },
  getByPage(page) {
    return Caller(prefix + `/${page}`, "GET");
  },
  add(item) {
    return Caller(prefix, "POST", item);
  }
};
