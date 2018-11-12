import React from 'react'
import { connect } from 'react-redux'
import keydown, { Keys } from 'react-keydown'
import { inputChar, backspace, endGame } from './store'
import Lobby from './components/Lobby';
import SetName from './components/SetName'
import socket from './socket';

const { SPACE, BACKSPACE } = Keys

// console.log(Keys)

@keydown( [
  ...`abcdefghijklmnopqrstuvwxyz`.split(''),
  SPACE, BACKSPACE
])
class app extends React.Component {

  componentDidMount() {
    // let the other clients know we're here!
    socket.emit('join-lobby', this.props.game.username)
  }

  componentDidUpdate() {
    // update the other clients
  }
  
  async componentWillReceiveProps({ keydown }) {
    if ( keydown.event && this.props.game.isActive && this.props.game.username !== 'Anonymous') {
      
      // let redux know whats going on
      if (keydown.event.which === SPACE ) {
        keydown.event.preventDefault() // stop autoscroll
        await this.props.inputChar(' ')  
        
      } else if (keydown.event.which === BACKSPACE ) {
        await this.props.backspace()
        
      } else {
        const char = String.fromCharCode(keydown.event.which).toLowerCase()
        await this.props.inputChar(char)
      }
      
      if (this.props.game.newChars === '') {
        socket.emit('done-typing')
        await this.props.endGame()
      }
      
      socket.emit('update-player', this.props.game )
    } 
  }
  
  render() {
    return <div id='app'>
      <div className='header'>
        <p>Always be typing...</p>
      </div>
      { this.props.game.username === 'Anonymous'
        ? <SetName />
        : <div id='app'>
            <Lobby />
          </div>
      }
    </div>
  }

}

export default connect( ({game})=>({game}), {
  inputChar, backspace, endGame
})(app)