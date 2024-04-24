const fastRedact = require('fast-redact');
const { format } = require('logform');

const piiRedact = ({
    paths = [],
    censor = '[REDACTED]',
} = {}) => {

    const redact = fastRedact({ paths, censor, serialize: false });

    return format((info, opts) => {
        info = redact(info);

        return info;
    })();
};

module.exports = piiRedact;
