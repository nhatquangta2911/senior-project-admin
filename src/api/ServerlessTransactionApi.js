import Caller from "./ServerlessApi";

const prefix = "v2/transactions";

export default {
  getAll() {
    return Caller(prefix, "GET");
  },
  add(item) {
    return Caller(prefix, "POST", item);
  }
};
