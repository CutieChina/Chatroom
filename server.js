const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:92e4f6de-3deb-467a-ab4c-727ac80d3f75',
    key: '523eb1f2-58e7-43d2-8b4a-264276c80fe6:N5Zn2kI7+VbhLEPnLhKVbUksr4kLgATpMb2p4yGEGsI=',
  })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
 const { username } = req.body
 chatkit
   .createUser({
     id: username,
     name: username
   })
   .then(() => res.sendStatus(201))
   .catch(error => {
     if (error.error === 'services/chatkit/user_already_exists') {
       res.sendStatus(200)
     } else {
       res.status(error.status).json(error)
     }
   })
  })
  
  app.post('/authenticate', (req, res) => {
 const authData = chatkit.authenticate({ userId: req.query.user_id })
 res.status(authData.status).send(authData.body)
  })

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
