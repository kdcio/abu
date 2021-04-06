import sharp from "sharp";

const convert = ({ data, options }) => {
  const { width, height, format } = options;
  let sh = sharp(data);
  if (width && height) sh = sh.resize(width, height);
  else if (width) sh = sh.resize(width);
  return sh.toFormat(format).toBuffer();
};

export default convert;
