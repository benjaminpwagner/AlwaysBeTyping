import React from 'react'

export default ({ WPM, accuracy, prefix, words, addSpace, message }) => {
  
  return words ? (
    <div className='scrolling-words'>
      {prefix}
      <div className={`current-letter ${words.charAt(0) === ' ' ? 'empty-current' : ''}`}>
        {words.charAt(0)}
      </div>

      {words.charAt(1) === ' ' &&
        <div className='empty' />
      }

      <div className='next-letters'
        style={{marginLeft: addSpace ? 3 : 0}}
      >{words.slice(1,30)}</div>
    </div>
  ) : <div className='message'>{message}</div>
}
  