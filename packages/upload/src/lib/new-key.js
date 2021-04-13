import path from "path";
import { OUTPUT_FORMATS } from "../constants";

const createNewKey = ({ qs, key }) => {
  const { w, h, f, q } = qs;
  const file = path.parse(key);

  let newKey = "";
  if (file.dir !== "") newKey += `${file.dir}/`;
  newKey += file.name;
  if (w) newKey += `-w${w}`;
  if (h) newKey += `-h${h}`;
  if (q && f && (f === "jpg" || f === "jpeg")) {
    newKey += `-q${q}`;
  } else if (q && !f && (file.ext === ".jpg" || file.ext === ".jpeg")) {
    newKey += `-q${q}`;
  }

  if (!f && (file.ext === ".jpg" || file.ext === ".jpeg")) {
    newKey += ".jpg";
    return newKey;
  } else if (!f) {
    newKey += file.ext;
    return newKey;
  }

  if (f && OUTPUT_FORMATS.indexOf(f) < 0) {
    // invalid format
    return key;
  }

  newKey += f === "jpg" || f === "jpeg" ? `.jpg` : `.${f}`;

  return newKey;
};

export default createNewKey;
