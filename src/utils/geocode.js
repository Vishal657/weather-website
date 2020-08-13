const request=require('request');

const geocode = (address,callback)=>{
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicGF0ZWx2aXNoYWwxMjMiLCJhIjoiY2tkbDVrbDJhMHZxMTJxbGMzbXBobWh6MSJ9.8X7zjKQRt_mw2YnuxoGt8A&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect',undefined)
        }else if(body.features.length===0){
            callback('Try again',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode