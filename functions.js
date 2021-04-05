const fs = require("fs");
const yaml = require("yaml");

const renameFunctions = (serviceName, basePath, funcs) => {
  const keys = Object.keys(funcs);
  const functions = {};
  keys.forEach((k) => {
    const func = funcs[k];
    func.handler = `${basePath}${func.handler}`;
    if (func.events) {
      func.events = func.events.map((e) => {
        if (!e.http) return e;
        if (serviceName.match(/admin/)) {
          e.http.path = `${serviceName.replace("-", "/")}${e.http.path}`;
        } else {
          e.http.path = `${serviceName}${e.http.path}`;
        }

        return e;
      });
    }
    functions[`${serviceName}-${k}`] = funcs[k];
  });
  return functions;
};

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name.match(/^api-/))
    .map(({ name }) => name.replace("api-", ""));

module.exports = () => {
  const services = getDirectories("packages");

  let functions = {};
  services.forEach((serviceName) => {
    const basePath = `./packages/api-${serviceName}/`;
    let file = fs.readFileSync(`${basePath}functions.yml`, "utf8");
    file = file.replace(/\$\{self\:service\}/g, serviceName);
    file = file.replace(/\$\{self\:provider.stage\}/g, "dev");
    const funcs = yaml.parse(file);

    functions = {
      ...functions,
      ...renameFunctions(serviceName, basePath, funcs),
    };
  });

  return functions;
};
