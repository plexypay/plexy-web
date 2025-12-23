const { CHECKOUT_API_KEY, MERCHANT_ACCOUNT, API_VERSION = 'v2', TESTING_ENVIRONMENT = 'test' } = process.env;

const serviceUrls = {
    test: `https://api.plexypay.com/${API_VERSION}`
};

const CHECKOUT_SERVICE_URL = serviceUrls[TESTING_ENVIRONMENT] || TESTING_ENVIRONMENT;

// Validate required environment variables
const missingVars = [];
if (!CHECKOUT_API_KEY) missingVars.push('CHECKOUT_API_KEY');
if (!MERCHANT_ACCOUNT) missingVars.push('MERCHANT_ACCOUNT');

if (missingVars.length > 0) {
    console.error(JSON.stringify({
        level: 'ERROR',
        message: 'Missing required environment variables',
        timestamp: new Date().toISOString(),
        missingVariables: missingVars,
        help: 'Set these in Vercel Dashboard → Project → Settings → Environment Variables'
    }));
}

// Log configuration on module load (only logs existence, not values)
console.log(JSON.stringify({
    level: 'CONFIG',
    message: 'Serverless function configuration loaded',
    timestamp: new Date().toISOString(),
    config: {
        hasCheckoutApiKey: !!CHECKOUT_API_KEY,
        checkoutApiKeyLength: CHECKOUT_API_KEY ? CHECKOUT_API_KEY.length : 0,
        checkoutApiKeyPreview: CHECKOUT_API_KEY ? `${CHECKOUT_API_KEY.substring(0, 8)}...` : 'NOT_SET',
        hasMerchantAccount: !!MERCHANT_ACCOUNT,
        merchantAccountPrefix: MERCHANT_ACCOUNT ? MERCHANT_ACCOUNT.substring(0, 4) + '...' : 'NOT_SET',
        apiVersion: API_VERSION,
        testingEnvironment: TESTING_ENVIRONMENT,
        checkoutUrl: CHECKOUT_SERVICE_URL
    }
}));

module.exports = {
    CHECKOUT_API_KEY,
    CHECKOUT_URL: CHECKOUT_SERVICE_URL,
    MERCHANT_ACCOUNT
};
