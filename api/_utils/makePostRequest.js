const { CHECKOUT_API_KEY, CHECKOUT_URL } = require('./config');
const logger = require('./logger');

module.exports = async (endpoint, request) => {
    // Validate that CHECKOUT_API_KEY is set
    if (!CHECKOUT_API_KEY) {
        const error = new Error('CHECKOUT_API_KEY environment variable is not set');
        logger.error('makePostRequest', 'Missing API key', {
            endpoint,
            error: error.message
        });
        throw error;
    }

    const body = JSON.stringify(request);
    const url = `${CHECKOUT_URL}/${endpoint}`;

    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body, 'utf8').toString(),
        'X-Api-Key': CHECKOUT_API_KEY
    };

    logger.info('makePostRequest', 'Sending request to Plexy API', {
        endpoint,
        url,
        headers: {
            'Content-Type': headers['Content-Type'],
            'Content-Length': headers['Content-Length'],
            'X-Api-Key': CHECKOUT_API_KEY ? `${CHECKOUT_API_KEY.substring(0, 8)}...` : 'NOT_SET'
        },
        requestBodySize: body.length,
        merchantAccount: request.merchantAccount
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            body,
            headers
        });

        logger.info('makePostRequest', 'Received response from Plexy API', {
            endpoint,
            status: response.status,
            statusText: response.statusText,
            ok: response.ok
        });

        return response;
    } catch (error) {
        logger.error('makePostRequest', 'Error calling Plexy API', {
            endpoint,
            error: error.message,
            stack: error.stack
        });
        throw error;
    }
};
