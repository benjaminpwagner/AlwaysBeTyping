const Game = require('./Game')
const Player = require('./Player')

module.exports = class Lobby {
  constructor(sockets) {
    this.sockets = sockets
    this.players = {}
    this.game = {}
    this.words = ''
  }

  showResults() {
    this.game.onGoing = false
    this.sockets.emit('show-results')
  }

  updateWPM() {
    Object.keys(this.players).forEach(socketId => {
      this.players[socketId].calculateWPM()
      this.broadcastWPM(socketId)
      // console.log(this.players[socketId].WPM)
      this.broadcastPlayer(socketId)
    })
  }

  broadcastWPM(socketId) {
    this.sockets.emit('update-wpm', socketId, this.players[socketId].WPM)
  }

  getOtherPlayers(socketId) {
    const {[socketId]: _, ...players} = this.players
    return players
  }

  newGame(amountOfWords, timeSecs) {
    this.game = new Game(amountOfWords, timeSecs)
    // console.log(this.players)
    Object.keys(this.players).forEach(socketId =>
      this.players[socketId].newWords(this.game.words)  
    )
    console.log('starting new game!')
    this.sockets.emit('start-game', this.game, this.players)
  }

  playerJoined(socketId, name) {
    const existingPlayer = this.players[socketId]
    if (existingPlayer) return existingPlayer
    // otherwise
    this.players[socketId] = new Player(socketId, name)
    return this.players[socketId]
  }

  updatePlayer(socketId, info) {
    if (this.players[socketId]) {
      this.players[socketId].update(info)
      this.broadcastPlayer(socketId)
    }
  }

  playerLeft(socketId) {
    const {[socketId]: _, ...players} = this.players
    this.players = players
  }

  playerFinished(socketId) {
    this.players[socketId].done()
  }

  broadcastPlayer(socketId) {
    this.sockets.emit('update-player', socketId, this.players[socketId])
  }


}