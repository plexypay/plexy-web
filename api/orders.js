const makePostRequest = require('./_utils/makePostRequest');
const handleCallback = require('./_utils/handleCallback');
const { MERCHANT_ACCOUNT: merchantAccount } = require('./_utils/config');

module.exports = async (req, res) => {
    const response = await makePostRequest('orders', { merchantAccount, ...req.body });
    handleCallback(response, res);
};
