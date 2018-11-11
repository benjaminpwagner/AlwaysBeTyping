import React from 'react'
import ordinal from 'ordinal'

export default ({place, name, wpm}) => <div className='result'>
  <div style={{width: 320}} className='name row'>
    
    <div className='row'>
      <div style={{marginRight: 6}}>{ordinal(place)}.</div>
      <div>{name}:</div>

    </div>
    <div>{wpm} WPM</div>
  </div>
  
</div>