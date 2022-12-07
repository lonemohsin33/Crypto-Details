const cryptoModel=require("../model/cryptoModel")
const axios=require("axios")
const lodash= require("lodash")


let getcoins = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://api.coincap.io/v2/assets'
        }
        let result = await axios(options);
        let data = result.data.data
        let top = lodash.sortBy(data, parseInt("rank"))
        top= top.splice(0,100)
        let obj = {}
        let sortedData = lodash.sortBy(top, 'changePercent24Hr')   
        for(let i=0; i<100;i++){  // 
            obj.symbol=sortedData[i].symbol
            obj.name = sortedData[i].name
            obj.marketCapUsd=sortedData[i].marketCapUsd
            obj.priceUsd= sortedData[i].priceUsd
            await cryptoModel.create(obj)   
        }
        let finalData= await cryptoModel.find().select({_id:0, updatedAt:0, createdAt:0,__v:0})
        await cryptoModel.deleteMany({})
        res.status(200).send({ msg: finalData, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
let getcoinsReal = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://api.coincap.io/v2/assets'
        }
        let result = await axios(options);
        // console.log(result)
        let data = result.data.data
        let top = lodash.sortBy(data, parseInt("rank"))
        top= top.splice(0,100)
        let sortedData = lodash.sortBy(top, 'changePercent24Hr')
        
        

        res.status(200).send({ msg: sortedData, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
module.exports={getcoins,getcoinsReal}
















