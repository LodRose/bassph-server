
import express from 'express'
import methodOverride from 'method-override'
import apiRouter from './routers/apiRouter'
import { serverPort } from './config'

const app = express()

app.use([express.json(), express.urlencoded({ extended:true })])
app.use(methodOverride())

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

app.use('/api', apiRouter)

app.use(function(req, res, next){
  res.status(404).send('404', { url: req.originalUrl })
})

app.listen(serverPort)

export default app