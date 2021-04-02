var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;

const kebabCase = (str) => {
  return str.replace(KEBAB_REGEX, function (match) {
    return "-" + match.toLowerCase();
  });
};

export default kebabCase;
