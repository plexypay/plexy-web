const { CHECKOUT_API_KEY, MERCHANT_ACCOUNT, CHECKOUT_URL } = require('./_utils/config');
const withCors = require('./_utils/withCors');
const withLogging = require('./_utils/withLogging');

async function handler(req, res) {
    // Validate environment variables
    const missingVars = [];
    if (!CHECKOUT_API_KEY) missingVars.push('CHECKOUT_API_KEY');
    if (!MERCHANT_ACCOUNT) missingVars.push('MERCHANT_ACCOUNT');

    res.json({
        status: missingVars.length > 0 ? 'ERROR' : 'OK',
        message: missingVars.length > 0
            ? `Missing required environment variables: ${missingVars.join(', ')}`
            : 'All required environment variables are set',
        environment: {
            hasCheckoutApiKey: !!CHECKOUT_API_KEY,
            hasMerchantAccount: !!MERCHANT_ACCOUNT,
            checkoutUrl: CHECKOUT_URL,
            // Don't expose actual values for security - only show preview
            checkoutApiKeyLength: CHECKOUT_API_KEY ? CHECKOUT_API_KEY.length : 0,
            checkoutApiKeyPreview: CHECKOUT_API_KEY ? `${CHECKOUT_API_KEY.substring(0, 8)}...` : 'NOT_SET',
            merchantAccountValue: MERCHANT_ACCOUNT ? `${MERCHANT_ACCOUNT.substring(0, 4)}...` : 'NOT_SET'
        },
        requestInfo: {
            method: req.method,
            url: req.url,
            hasBody: !!req.body,
            bodyKeys: req.body ? Object.keys(req.body) : [],
            body: req.body
        },
        headers: {
            'content-type': req.headers['content-type'],
            'user-agent': req.headers['user-agent'],
            'origin': req.headers['origin']
        },
        help: {
            setEnvVars: 'Vercel Dashboard → Project → Settings → Environment Variables',
            requiredVars: ['CHECKOUT_API_KEY', 'MERCHANT_ACCOUNT'],
            optionalVars: ['API_VERSION', 'TESTING_ENVIRONMENT']
        }
    });
}

module.exports = withCors(withLogging('debug', handler));
