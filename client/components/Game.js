import React from 'react'
import ScrollingWords from './ScrollingWords' 
import { calculateAdjustedWPM } from '../../utils'
import ProgressBar from  "react-prog-bar";
 
export default ({WPM, typed, prevChars, newChars, username, startedAt}) => {

  const lastIdx = typed.length - 1

  const prefixChars = [
    typed.charAt(lastIdx-6) || '',
    typed.charAt(lastIdx-5) || '',
    typed.charAt(lastIdx-4) || '',
    typed.charAt(lastIdx-3) || '',
    typed.charAt(lastIdx-2) || '',
    typed.charAt(lastIdx-1) || '',      
    typed.charAt(lastIdx) || '',
  ]

  const prefix = prefixChars.map( (char, idx) => {
    const prevIdx = prevChars.length - prefixChars.length + idx
    let className = char === prevChars.charAt(prevIdx)
      ? 'valid-char'
      : 'invalid-char'

    if (char === '' || char === ' ') {
      if (className==='invalid-char')
        char = prevChars.charAt(prevIdx)
      else className += ' empty'
    }

    return <div className={`${className} 'game-component'`} key={idx}>
      {char}
    </div>
  })

  const addSpace = newChars.charAt(0) === ' '
  const message = prevChars === ''
    ? 'joining next round...'
    : 'Finished!'


  const timeElapsed = new Date() - new Date(startedAt)
  const percent = 100*( typed.length / (prevChars.length + newChars.length) )

  return <div className='game-container'>
    <div style={{marginRight: 10}}>{WPM} WPM</div>
    <div style={{marginRight: 10}}>{username}:</div>
    <ScrollingWords 
      message={message} 
      prefix={prefix} 
      words={newChars} 
      addSpace={addSpace} 
    />
 
 {/* <ProgressBar
  trigger={percent}
/> */}
  </div>
}
