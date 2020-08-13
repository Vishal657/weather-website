const path = require('path');
const express = require('express');
const hbs = require('hbs');
const gioCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

//Define pths for express routing
const publicDirectoryPath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

//setup handle bars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'vishal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{    
        title:'About Me',
        name:'Vishal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        message:'We are here to help your out with your problems',
        name:'Vishal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please send the value of location'
        })
    }
    gioCode(req.query.location,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        msg:'Help Artical not found',
        name:'Vishal'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        msg:'404 Page',
        name:'Vishal'
    })
})

app.listen(3030,()=>{
    console.log('Server is up')
})