const makeSignedUrl = ({ getSignedUrl }) => {
  const signedUrl = async ({ filename, type }) => {
    if (!filename) throw new Error("Missing filename");
    if (!type) throw new Error("Missing type");

    return getSignedUrl({ filename, type });
  };
  return signedUrl;
};

export default makeSignedUrl;
