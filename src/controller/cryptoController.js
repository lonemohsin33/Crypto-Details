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
        let sortedData = lodash.sortBy(top, 'changePercent24Hr')   
        for(let i=0; i<100;i++){  // 
            await cryptoModel.create(sortedData[i])   
        }
        let finalData= await cryptoModel.find().select({_id:0,__v:0})
        await cryptoModel.deleteMany({})
        res.status(200).send({ msg: finalData, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports={getcoins}
















