const express=require("express");
const router=express.Router();
const { shortURL, redirectURL  } = require('../controllers/urlController');

router.post('/create' , shortURL);
router.get('/:shortId', redirectURL);

module.exports = router;