const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'url is required..!' });
    }
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: url,
        visitHistory: [],
    });
    return res.json({ id: shortID });
}

module.exports = {
    handleGenerateNewShortUrl,
}