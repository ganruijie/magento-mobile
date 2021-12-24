const path = require("path");
const glob = require("glob");

const resolve = function(...str) {
  return path.resolve(__dirname, ...str);
};

/**
 * @return {string}
 */
const toPosix = function(pathString) {
  return pathString.split(path.sep).join(path.posix.sep);
};

const getRelativeMap = function(folderPath, globExtensions) {
  let files = glob.sync(folderPath + "/**/*." + globExtensions);
  return files.map(filePath => {
    return path.posix.join(
      ...path.relative(folderPath, filePath).split(path.sep)
    );
  });
};

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  resolve,
  isProd,
  toPosix
};
