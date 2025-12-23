const makePostRequest = require('../_utils/makePostRequest');
const handleCallback = require('../_utils/handleCallback');

module.exports = async (req, res) => {
    const response = await makePostRequest('paypal/updateOrder', { ...req.body });
    handleCallback(response, res);
};
