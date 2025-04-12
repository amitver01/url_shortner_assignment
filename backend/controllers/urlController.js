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
        const url = await Url.findOne({ shortId: shortId });

        if (!url) {
            return res.status(404).json({ msg: 'Short URL not found' });
        }
        url.clicks += 1;
        const userAgent = req.headers['user-agent'];
        const device = userAgent.includes('Mobile') ? 'Mobile' : 'Desktop';
        url.deviceBreakdown.set(device, (url.deviceBreakdown.get(device) || 0) + 1);

        const clickDetail = {
            ipAddress: req.ip,  // You might need a middleware like 'request-ip' to capture IP
            device: device,
            browser: userAgent,  // Just for demo purposes, you could use more specific libraries for browsers
            clickedAt: new Date(),
          };
          url.clickDetails.push(clickDetail);

  await url.save();

        res.redirect(url.originalUrl);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
    }
};

const analytics = async (req, res) => {
    try {
        const  shortId  = req.params.shortId;  
        // Get shortId from route parameters
        //console.log("hello backend");

        if (shortId) {
            // Find a specific URL with the given shortId
            //console.log("checking")
            const url = await Url.findOne({ shortId });

            if (!url) {
                return res.status(404).json({ msg: 'Short URL not found' });
            }
            
            // If the short URL is found, return the details
            return res.json(url);  // Return the analytics for the specific shortId
        }

        // If no shortId is provided, return all URLs with their analytics
        const urls = await Url.find();
        console.log(urls);
        res.json(urls);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
    }
};


  

module.exports = { shortURL , redirectURL, analytics };
