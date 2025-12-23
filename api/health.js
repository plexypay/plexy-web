const withCors = require('./_utils/withCors');
const withLogging = require('./_utils/withLogging');

async function handler(req, res) {
    res.status(200).send('OK');
}

module.exports = withCors(withLogging('health', handler));
