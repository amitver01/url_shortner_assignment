const Url = require("../models/URL");

const shortURL = async (req, res) => {
    const body = req.body;
    const { nanoid } = await import('nanoid');

    if (!body.url) {
        return res.status(400).json({ msg: 'URL is required' });
    }

    try {
        const shortID = nanoid(8);

        await Url.create({
            originalUrl: body.url,
            shortId: shortID,
            createdAt: new Date(), // or Date.now()
        });

        return res.json({ id: shortID });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
    }
};

const redirectURL = async (req, res) => {
    const { shortId } = req.params;  // Get the shortId from the URL params

    try {
        // Find the original URL by the shortId
        const urlDoc = await Url.findOne({ shortId: shortId });

        if (!urlDoc) {
            return res.status(404).json({ msg: 'Short URL not found' });
        }

        // Redirect to the original URL
        return res.redirect(urlDoc.originalUrl);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { shortURL , redirectURL };
