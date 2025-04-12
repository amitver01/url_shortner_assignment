const express=require("express");
const router=express.Router();
const { shortURL, redirectURL , analytics } = require('../controllers/urlController');
const url = require("../models/URL");
router.post('/create' , shortURL);
router.get('/:shortId', redirectURL);
router.get('/analytics/:shortId', analytics);

  

module.exports = router;