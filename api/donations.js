const makePostRequest = require('./_utils/makePostRequest');
const handleCallback = require('./_utils/handleCallback');
const { MERCHANT_ACCOUNT: merchantAccount } = require('./_utils/config');
const withCors = require('./_utils/withCors');
const withLogging = require('./_utils/withLogging');

async function handler(req, res) {
    const response = await makePostRequest('donations', { merchantAccount, shopperInteraction: 'ContAuth', ...req.body });
    await handleCallback(response, res);
}

module.exports = withCors(withLogging('donations', handler));
