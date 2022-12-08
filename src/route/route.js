const express = require('express');
const {getcoins}=require("../controller/cryptoController")
const router = express.Router();




router.get("/getcoins",getcoins)



module.exports=router