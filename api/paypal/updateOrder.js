const makePostRequest = require('../_utils/makePostRequest');
const handleCallback = require('../_utils/handleCallback');
const withCors = require('../_utils/withCors');
const withLogging = require('../_utils/withLogging');

async function handler(req, res) {
    const response = await makePostRequest('paypal/updateOrder', { ...req.body });
    await handleCallback(response, res);
}

module.exports = withCors(withLogging('paypal/updateOrder', handler));
