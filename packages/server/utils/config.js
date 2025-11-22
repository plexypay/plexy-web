const { CHECKOUT_API_KEY, MERCHANT_ACCOUNT, API_VERSION = 'v2', TESTING_ENVIRONMENT = 'test' } = process.env;

const serviceUrls = {
    test: `https://sandbox-api.plexypay.com/${API_VERSION}`
};

const CHECKOUT_SERVICE_URL = serviceUrls[TESTING_ENVIRONMENT] || TESTING_ENVIRONMENT;

module.exports = {
    CHECKOUT_API_KEY,
    CHECKOUT_URL: CHECKOUT_SERVICE_URL,
    MERCHANT_ACCOUNT
};
