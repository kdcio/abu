const makeSignedUrl = ({ getSignedUrl }) => {
  const signedUrl = async ({ filename, type }) => {
    return getSignedUrl({ filename, type });
  };
  return signedUrl;
};

export default makeSignedUrl;
