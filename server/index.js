const path = require('path')
const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
const LobbyClass = require('./game/Lobby')

module.exports = app

const createApp = () => {

  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  const Lobby = new LobbyClass(io.sockets)
  require('./socket')(io, Lobby)
  require('./game/mainloop')(Lobby)
}

async function bootApp() {
  await createApp()
  await startListening()
}

bootApp()