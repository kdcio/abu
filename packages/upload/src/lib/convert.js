import sharp from "sharp";

const convert = ({ data, options }) => {
  const { w, h, f } = options;
  let sh = sharp(data);
  if (w && h) sh = sh.resize(w, h);
  else if (w) sh = sh.resize(w);
  if (f) sh = sh.toFormat(f);
  return sh.toBuffer();
};

export default convert;
