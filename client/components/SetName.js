import React from 'react'
import { connect } from 'react-redux'
import {setName} from '../store'

const SetName = ({setName}) => {
  let name = ''
  const handleChange = e => {
    name = e.target.value
  }
  return <div className='column'>
    <h1>Always Be Typing...</h1>
    <input type='text' onChange={handleChange} />
    <button onClick={()=>setName(name)}>Set Name</button>
  </div>

}
export default connect( null, {setName})(SetName)