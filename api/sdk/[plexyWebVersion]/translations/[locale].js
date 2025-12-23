const fs = require('fs');
const path = require('path');
const withCors = require('../../../_utils/withCors');
const withLogging = require('../../../_utils/withLogging');
const logger = require('../../../_utils/logger');

function handler(req, res) {
    const locale = req.query.locale;

    // Validate locale format to prevent path traversal (e.g., en-US, fr-FR, zh-CN)
    if (!/^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/.test(locale)) {
        logger.error('translations', 'Invalid locale format', { locale });
        return res.status(400).json({ error: 'Invalid locale format' });
    }

    try {
        // Vercel serverless functions run in the project root
        // Translation files are in packages/server/translations
        const translationPath = path.resolve(process.cwd(), `packages/server/translations/${locale}.json`);

        logger.info('translations', 'Loading translation file', { locale, translationPath });

        const jsonString = fs.readFileSync(translationPath, { encoding: 'utf-8' });
        res.json(JSON.parse(jsonString));
    } catch (error) {
        logger.error('translations', 'Failed to load translation file', {
            locale,
            error: error.message,
            attemptedPath: path.resolve(process.cwd(), `packages/server/translations/${locale}.json`)
        });
        res.status(500).end();
    }
}

module.exports = withCors(withLogging('translations', handler));
