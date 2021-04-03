const previewField = (fields) => {
  let field = fields.find((i) => i.type === "text");
  if (field) return field.id;
  return null;
};

export default previewField;
