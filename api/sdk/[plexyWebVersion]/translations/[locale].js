const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const locale = req.query.locale;

    // Validate locale format to prevent path traversal (e.g., en-US, fr-FR, zh-CN)
    if (!/^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/.test(locale)) {
        console.log(`ERROR: Invalid locale format: ${locale}`);
        return res.status(400).json({ error: 'Invalid locale format' });
    }

    try {
        // Vercel serverless functions run in the project root
        // Translation files are in packages/server/translations
        const translationPath = path.resolve(process.cwd(), `packages/server/translations/${locale}.json`);

        const jsonString = fs.readFileSync(translationPath, { encoding: 'utf-8' });
        res.json(JSON.parse(jsonString));
    } catch (error) {
        console.log(`ERROR: Serverless function /translations endpoint error - ${error.message}`);
        console.log(`Failed to load translation for locale: ${locale}`);
        console.log(`Attempted path: ${path.resolve(process.cwd(), `packages/server/translations/${locale}.json`)}`);
        res.status(500).end();
    }
};
