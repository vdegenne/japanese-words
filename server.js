const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-body')
const cors = require('@koa/cors')
const fs = require('fs')

const file = './data/jlpt1-words.json'

// Load the data and initiate the save timer
let data = JSON.parse(fs.readFileSync(file))
setInterval(() => fs.writeFileSync(file, JSON.stringify(data).toString()), 2000)

const app = new Koa
const router = new Router

app.use(cors())
app.use(bodyParser())

router.post('/acc', function (ctx) {
  data = data.concat(ctx.request.body)
  ctx.body = ''
})

app.use(router.routes())


app.listen(3333, function() {
  console.log(`http://localhost:3333/`)
})