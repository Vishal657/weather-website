const request=require('request');

const foreCast =(latitude,longitude,callback) =>{

    const url = 'something';

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect',undefined)
        }else if(body.error){
            callback('unable to fatch the data',undefined)
        }else{
            console.log(body)
        }
    })   
}

module.exports = foreCast;
