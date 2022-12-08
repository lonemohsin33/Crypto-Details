const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema( {
    symbol :{
        type:String,
        unique:true
    },
    name: {
        type:String,
        unique:true
    },
    marketCapUsd:{
        type:String
    },
     priceUsd:{
        type:String
     } 

  
    });

module.exports = mongoose.model('crypto', cryptoSchema) //users