import React from 'react'

export default ({ WPM, accuracy, prefix, words, addSpace, message }) => {
  
  return words ? (
    <div className='row'>
      {prefix}
      <div 
        style={{marginLeft: addSpace ? 4 : 0}}
      >{words.slice(0,24)}</div>
    </div>
  ) : <div>{message}</div>
}
  