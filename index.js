var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var axios = require('axios')

var server = express()

server.use(logger('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false}))

server.set('view engine', 'ejs')
server.use(express.static('views'))
server.set('views', __dirname+'/views')

server.get('/', function(request, response){
   response.render('home.ejs')
})
server.get('/about', function(request, response){
   response.render('about.ejs')
})
server.get('/portfolio', function(request, response){
   response.render('portfolio.ejs')
})
server.get('/contact', function(request,response){
   response.render('contact.ejs')
})
var uri = 'https://api.fortnitetracker.com/v1/profile/'
// https://api.fortnitetracker.com/v1/profile/{platform}/{epic-nickname}
server.post('/portfolio', function(req, res){
    var gamingHandle = req.body.gamerId
    
    axios.get(uri + 'psn/'+gamingHandle, {
        headers:{
            'TRN-Api-Key': '100a0140-91ee-40bd-a594-277fd2b955c4'
            
        }
    })
    .then( res => res.data )
    .then( data => {
            console.log(data)
            // res.json(body)
            res.render('portfolio.ejs', {data: data})
    })
    .catch( err => console.log(err))
})
var port = process.env.PORT

server.listen(port, () => {
   console.log('Sever running on port: '+port)
})