import React from 'react'
import ordinal from 'ordinal'

export default ({place, name, wpm, accuracy}) => <div className='result'>
  <div className='name row'>
    
    <div className='row' style={{marginRight: 10}}>
      <div style={{marginRight: 4, width: 42}}>{ordinal(place)}.</div>
      <div>{name}</div>

    </div>

    <div className='row name' style={{width: 260}}>
        <div >{wpm} WPM</div>
        <div >{accuracy ? accuracy : '0'}% accuracy</div>
      </div>
    {/* <div>{wpm} WPM, {accuracy ? accuracy : '0'}% accuracy</div> */}
  </div>
  
</div>