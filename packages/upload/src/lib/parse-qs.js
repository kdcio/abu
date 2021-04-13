import { QS_KEYS } from "../constants";

const parseQs = (qs) => {
  const params = {};

  if (!qs) return params;

  const parameterKeyValue = qs.split("&");
  parameterKeyValue.forEach((value) => {
    const keyValue = value.split("=");
    const key = decodeURIComponent(keyValue[0]);
    const val = decodeURIComponent(keyValue[1]);
    if (QS_KEYS.indexOf(key) < 0) return;
    params[key] = key === "f" ? val : parseInt(val, 10);
  });

  return params;
};

export default parseQs;
