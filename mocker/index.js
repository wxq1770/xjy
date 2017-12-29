require('babel-register')

const http = require('http');
const argv = require('minimist')(process.argv.slice(2));

const port = argv.p || 3003;

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const routerLogger = function(req, res, next) {
  console.log('REQUEST: ', req.url, ' ; BODY:', JSON.stringify(req.body))
  next()
}
app.use(routerLogger)

app.get('/api/helloword/:param', function(req, res) {
  res
    .status(200)
    .json(req.params)
    .end()
})

app.get('/mobile/user/mobileExist', function(req, res) {
  res
    .status(200)
    .json(req.params)
    .end()
})

app.listen(port, function() {
  console.log(`listening at http://localhost:${port}`)
})
