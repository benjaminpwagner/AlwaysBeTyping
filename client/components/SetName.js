import React from 'react'
import { connect } from 'react-redux'
import {setName} from '../store'

const SetName = ({setName}) => {
  let name = ''
  const handleChange = e => {
    name = e.target.value
  }
  return <div className='column set-name'>
    <input type='text' placeholder='display name' onChange={handleChange} maxLength='15' />
    <button className='button' onClick={()=>setName(name)}>Set Name</button>
  </div>

}
export default connect( null, {setName})(SetName)