import _ from 'lodash';

const safeVariableName = (fileName) => {
  const indexOfDot = fileName.indexOf('.');

  if (indexOfDot === -1) {
    return fileName;
  } else {
    return fileName.slice(0, indexOfDot);
  }
};

const buildExportBlock = (files) => {
  let importBlock;

  importBlock = _.map(files, (fileName) => {
    if (fileName.indexOf(".") == -1)
      return (
        "export * as " +
        safeVariableName(fileName) +
        "  from './" +
        fileName +
        "';"
      );
    return (
      "export { default as " +
      safeVariableName(fileName) +
      " } from './" +
      fileName +
      "';"
    );
  });

  importBlock = importBlock.join('\n');

  return importBlock;
};

export default (filePaths, options = {}) => {
  let code;
  let configCode;

  code = '';
  configCode = '';

  if (options.banner) {
    const banners = _.isArray(options.banner) ? options.banner : [options.banner];

    banners.forEach((banner) => {
      code += banner + '\n';
    });

    code += '\n';
  }

  if (options.config && _.size(options.config) > 0) {
    configCode += ' ' + JSON.stringify(options.config);
  }

  code += '// @create-index' + configCode + '\n\n';

  if (filePaths.length) {
    const sortedFilePaths = filePaths.sort();

    code += buildExportBlock(sortedFilePaths) + '\n\n';
  }

  return code;
};
