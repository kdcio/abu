import crypto from "crypto";

const decrypt = (encdata, masterkey) => {
  // base64 decoding
  const bData = Buffer.from(encdata, "base64");

  // convert data to buffers
  const salt = bData.slice(0, 64);
  const iv = bData.slice(64, 80);
  const tag = bData.slice(80, 96);
  const text = bData.slice(96);

  // derive key using; 32 byte key length
  const key = crypto.pbkdf2Sync(masterkey, salt, 2145, 32, "sha512");

  // AES 256 GCM Mode
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  // encrypt the given text
  const decrypted =
    decipher.update(text, "binary", "utf8") + decipher.final("utf8");

  return decrypted;
};

export default decrypt;
