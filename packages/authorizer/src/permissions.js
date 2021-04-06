const permissions = (perms) => {
  const res = [];

  /**
   * Format: {httpVerb}/[{resource}/[{child-resources}]]
   */
  Object.keys(perms.read)
    .filter((modelId) => perms.read[modelId] === true)
    .forEach((modelId) => {
      res.push(`GET/content/${modelId}`);
      res.push(`GET/content/${modelId}/*`);
    });

  Object.keys(perms.write)
    .filter((modelId) => perms.write[modelId] === true)
    .forEach((modelId) => {
      res.push(`POST/content/${modelId}`);
      res.push(`POST/content/${modelId}/*`);
      res.push(`PUT/content/${modelId}`);
      res.push(`PUT/content/${modelId}/*`);
      res.push(`PATCH/content/${modelId}`);
      res.push(`PATCH/content/${modelId}/*`);
      res.push(`DELETE/content/${modelId}`);
      res.push(`DELETE/content/${modelId}/*`);
    });

  return res;
};

export default permissions;
