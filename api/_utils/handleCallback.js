const logger = require('./logger');

module.exports = async (response, res) => {
    const endpoint = res.req.url;

    try {
        if (!response.ok) {
            logger.error('handleCallback', 'Plexy API returned error', {
                endpoint,
                status: response.status,
                statusText: response.statusText
            });

            // Try to get error details from response body
            let errorBody;
            try {
                errorBody = await response.json();
                logger.info('handleCallback', 'Error response body', errorBody);
            } catch (e) {
                logger.error('handleCallback', 'Could not parse error response body', e);
            }

            return res.status(response.status).send({
                status: response.status,
                message: response.statusText,
                details: errorBody
            });
        }

        const body = await response.json();

        logger.info('handleCallback', 'Success response', {
            endpoint,
            hasData: !!body,
            dataKeys: body ? Object.keys(body) : []
        });

        res.send(body);
    } catch (error) {
        logger.error('handleCallback', 'Error processing response', error);
        res.status(500).send({ error: 'Internal Server Error', message: error.message });
    }
};
