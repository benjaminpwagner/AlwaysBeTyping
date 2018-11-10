const randomWords = require('random-words')

module.exports = class Game {
  constructor(amountOfWords) {
    this.words = randomWords(amountOfWords).join(' ')
    this.startedAt = new Date()
    this.onGoing = true
  }
}