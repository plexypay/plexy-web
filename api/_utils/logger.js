const logger = {
    info: (context, message, data = {}) => {
        console.log(JSON.stringify({
            level: 'INFO',
            context,
            message,
            timestamp: new Date().toISOString(),
            ...data
        }));
    },

    error: (context, message, error = {}) => {
        console.error(JSON.stringify({
            level: 'ERROR',
            context,
            message,
            timestamp: new Date().toISOString(),
            error: error.message || error,
            stack: error.stack
        }));
    },

    request: (endpoint, req) => {
        console.log(JSON.stringify({
            level: 'REQUEST',
            endpoint,
            method: req.method,
            timestamp: new Date().toISOString(),
            body: req.body,
            query: req.query,
            headers: {
                'content-type': req.headers['content-type'],
                'user-agent': req.headers['user-agent'],
                'origin': req.headers['origin']
            }
        }));
    },

    response: (endpoint, status, data = {}) => {
        console.log(JSON.stringify({
            level: 'RESPONSE',
            endpoint,
            status,
            timestamp: new Date().toISOString(),
            ...data
        }));
    }
};

module.exports = logger;
