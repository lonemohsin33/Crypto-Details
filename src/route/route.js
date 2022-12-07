const express = require('express');
const {getcoins,getcoinsReal}=require("../controller/cryptoController")
const router = express.Router();



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.get("/getcoins",getcoins)
router.get("/getcoinsreal",getcoinsReal)



module.exports=router