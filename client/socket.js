import io from 'socket.io-client'
import store, { showResults, newGame, updateWPM, updatePlayer, removePlayer, addPlayers } from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('joined-game', (gameState, players) => {
    // console.log('players',players)
    store.dispatch(addPlayers(players))
    store.dispatch(newGame(gameState))
  })

  socket.on('show-results', () => {
    store.dispatch(showResults())
  })

  socket.on('update-wpm', (socketId, WPM, accuracy) => {
    if (socketId === socket.id)
      store.dispatch(updateWPM(WPM, accuracy))
  })

  socket.on('update-player', (socketId, gameState) => {
    if (socketId !== socket.id) {
      // console.log('got player update:',gameState)
      store.dispatch(updatePlayer(socketId, gameState))
    }
  })

  socket.on('remove-player', socketId => {
    store.dispatch(removePlayer(socketId))
  })

  socket.on('start-game', async (game, players) => {
    // const {oldGame} = store.getState()

    // const username = oldGame.username === 'Anonymous'
    //   ? 'Anonymous'
    //   : oldGame.username

    // const game = {
    //   ...newGame,
    //   username
    // }
    // console.log('players',players)
    console.log("client starting game!")
    const {[socket.id]: myGame, ...otherPlayers} = players

    await store.dispatch(newGame({...game,...myGame}))
    await store.dispatch(addPlayers(otherPlayers))
    // const myGame = store.getState().game
    // socket.emit('update-player', game )
  })

  socket.on('done-typing', () => {
    socket.emit('done-typing', socket.id)
  })
})


export default socket
