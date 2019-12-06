import Caller from "./DjangoApiCaller";

export default {
  train(params) {
    return Caller("train", "POST", params);
  },
  predict(params) {
    return Caller("predict", "POST", params);
  }
};
