const { calculateAdjustedWPM } = require('../../utils')


module.exports = class Player {
  constructor(socketId, name) {
    this.socketId = socketId
    this.username = name
    this.isActive = false
    this.prevChars = ''
    this.newChars = ''
    this.typed = ''
    this.startedAt = null
    this.finishedAt = null
    this.WPM = 0
  }

  newWords(words) {
    this.newChars = words
    this.prevChars = ''
    this.typed = ''
    this.isActive = true
    this.startedAt = new Date()
    this.finishedAt = null
  }

  update(info) {
    const {username, prevChars, newChars, typed} = info
    this.username = username
    this.prevChars = prevChars
    this.newChars = newChars
    this.typed = typed
  }

  done() {
    this.finishedAt = new Date()
    this.isActive = false
  }

  calculateWPM() {
    let timeElapsed
    if (this.finishedAt !== null) {
      timeElapsed = new Date(this.finishedAt) - new Date(this.startedAt)
    } else {
      timeElapsed = new Date() - new Date(this.startedAt)
    }
    this.WPM = calculateAdjustedWPM(this.typed, this.prevChars, timeElapsed)
  }
}