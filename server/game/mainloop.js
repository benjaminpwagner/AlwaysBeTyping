// const { results, clearResults } = require('./results')

const pauseSecs = timeSecs => 
  new Promise(resolve => setTimeout(resolve, timeSecs*1000))

module.exports = async Lobby => {
  const gameTimeSecs = 30
  const wordsPerGame = 10
  
  while(true) {

    Lobby.newGame(wordsPerGame, gameTimeSecs)

    for (let i=0; i < gameTimeSecs*2; i++) {
      Lobby.updateWPM()
      await pauseSecs(0.5)
    }
  }

}