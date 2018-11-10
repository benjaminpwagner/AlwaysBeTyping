const { addResult } = require('../game/results')

module.exports = (io, Lobby) => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join-lobby', (name='Anonymous') => {
      const playerState = Lobby.playerJoined(socket.id, name)
      socket.broadcast.emit('update-player', socket.id, playerState)
      io.to(`${socket.id}`).emit('joined-game', Lobby.game, Lobby.getOtherPlayers(socket.id))
    })

    socket.on('update-player', playerState => {
      Lobby.updatePlayer(socket.id, playerState)
      socket.broadcast.emit('update-player', socket.id, playerState);
    })

    socket.on('send-result', result => {
      addResult(socket.id, result)
    })

    socket.on('done-typing', () => {
      Lobby.playerFinished(socket.id)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      Lobby.playerLeft(socket.id)
      socket.broadcast.emit('remove-player', socket.id)
    })
  })
}
