const makePostRequest = require('../_utils/makePostRequest');
const handleCallback = require('../_utils/handleCallback');
const { MERCHANT_ACCOUNT: merchantAccount } = require('../_utils/config');
const withCors = require('../_utils/withCors');
const withLogging = require('../_utils/withLogging');

async function handler(req, res) {
    const response = await makePostRequest('paymentMethods/balance', { merchantAccount, ...req.body });
    await handleCallback(response, res);
}

module.exports = withCors(withLogging('paymentMethods/balance', handler));
