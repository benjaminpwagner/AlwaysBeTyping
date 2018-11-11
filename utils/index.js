
const calculateWPM = (lettersAmt, timeMs) => 
  Math.round(
    (lettersAmt/5) / ( timeMs / 1000 / 60 ) 
  )

const calculatorErrors = (actual, expected) => {
  let errors = 0
  const actualWords = actual.split('')
  const expectedWords = expected.split('')

  actualWords.forEach( (word, idx) => {
    if (word !== expectedWords[idx] )
      errors++
  })

  return errors
}

const calculateAdjustedWPM = (actual, expected, timeMs) => {
  const errors = calculatorErrors(actual, expected)
  const WPM = calculateWPM(actual.length, timeMs)
  let adjustedWPM = WPM - ( errors / ( timeMs / 1000 / 60 ) )
  if (adjustedWPM < 0) adjustedWPM = 0
  return Math.round(adjustedWPM)
}

const calculateAccuracy = (actual, expected) => {
  return Math.round( 100 *
    ( (actual.length - calculatorErrors(actual, expected) )
    / actual.length)
  )
}

module.exports = {
  calculateWPM, 
  calculatorErrors, 
  calculateAdjustedWPM,
  calculateAccuracy
}