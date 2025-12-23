const logger = require('./logger');

module.exports = (endpointName, handler) => async (req, res) => {
    const startTime = Date.now();

    // Log incoming request
    logger.request(endpointName, req);

    try {
        // Execute handler
        await handler(req, res);

        // Log successful completion
        const duration = Date.now() - startTime;
        logger.info('withLogging', 'Request completed successfully', {
            endpoint: endpointName,
            duration: `${duration}ms`
        });
    } catch (error) {
        // Log error
        const duration = Date.now() - startTime;
        logger.error('withLogging', 'Request failed', {
            endpoint: endpointName,
            duration: `${duration}ms`,
            error: error.message,
            stack: error.stack
        });

        // Send error response if not already sent
        if (!res.headersSent) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }
};
