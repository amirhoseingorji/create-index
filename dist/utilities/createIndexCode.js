"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const safeVariableName = fileName => {
  const indexOfDot = fileName.indexOf('.');

  if (indexOfDot === -1) {
    return fileName;
  } else {
    return fileName.slice(0, indexOfDot);
  }
};

const buildExportBlock = files => {
  let importBlock;
  importBlock = _lodash.default.map(files, fileName => {
    if (fileName.indexOf(".") == -1) return "export * as " + safeVariableName(fileName) + "  from './" + fileName + "';";
    return "export { default as " + safeVariableName(fileName) + " } from './" + fileName + "';";
  });
  importBlock = importBlock.join('\n');
  return importBlock;
};

var _default = function _default(filePaths) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let code;
  let configCode;
  code = '';
  configCode = '';

  if (options.banner) {
    const banners = _lodash.default.isArray(options.banner) ? options.banner : [options.banner];
    banners.forEach(banner => {
      code += banner + '\n';
    });
    code += '\n';
  }

  if (options.config && _lodash.default.size(options.config) > 0) {
    configCode += ' ' + JSON.stringify(options.config);
  }

  code += '// @create-index' + configCode + '\n\n';

  if (filePaths.length) {
    const sortedFilePaths = filePaths.sort();
    code += buildExportBlock(sortedFilePaths) + '\n\n';
  }

  return code;
};

exports.default = _default;
//# sourceMappingURL=createIndexCode.js.map