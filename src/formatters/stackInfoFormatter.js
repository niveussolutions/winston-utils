const { format } = require('logform');

// Constant values required for the log formatter.
const cwd = process.cwd();
const cwdLength = cwd.length;

const getStackInfo = function getStackInfo(opts) {
  const oldStackTrace = Error.prepareStackTrace;

  const filterRules = line => line &&
    line.getFileName() &&
    line.getFileName().includes(cwd) &&
    (line.getFileName().indexOf('/node_modules/') < 0)

  try {
    // eslint-disable-next-line handle-callback-err
    Error.prepareStackTrace = (err, structuredStackTrace) => structuredStackTrace;
    Error.captureStackTrace(this, getStackInfo);

    const callSites = this.stack.filter(filterRules);

    if (callSites.length === 0) {
      // bail gracefully: even though we shouldn't get here, we don't want to crash for a log print!
      return undefined;
    }

    const callSite = callSites.pop();

    let fileName = callSite.getFileName();
    fileName = fileName.includes(cwd) ? fileName.slice(cwdLength + 1) : fileName;
    const lineNumber = callSite.getLineNumber();
    const fnName = callSite.getFunctionName();

    if (opts.isJson) {

      return { fileName, lineNumber, fnName };
    } else {

      return `${fileName}:${lineNumber}  fnName: ${fnName}`;
    }

  } finally {
    Error.prepareStackTrace = oldStackTrace;
  }
}

// Options are disabled as of now.
const stackInfoFormatter = ({
  keyName = 'stackInfo',
  isJson = true,
} = {}) => {

  return format((info, opts) => {
    const stackInfo = getStackInfo({ isJson }) || {};

    return { ...info, [keyName]: stackInfo };
  })();
};

module.exports = stackInfoFormatter;
