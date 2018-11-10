import React from 'react'
import { connect } from 'react-redux'
import { endGame } from '../store'
import Game from './Game'
import ReactCountdownClock from 'react-countdown-clock'


const Lobby = ({ players, game, endGame }) => <div id='lobby-container'>
  <div className='row'>
    {/* <h1>Welcome!</h1> */}

  {game.active ? <ReactCountdownClock 
    seconds={game.timeSecs}
    color="#000"
    alpha={0.9}
    size={50}
    onComplete={() => endGame()} 
    /> : <div></div>
  }   
    <div className='column' style={{marginLeft: 20}}>
      <Game 
        local={true} 
        typed={game.typed} 
        prevChars={game.prevChars} 
        newChars={game.newChars} 
        username={game.username}
        startedAt={game.startedAt}
        WPM={game.WPM}
      />



      { Object.keys(players)
        .filter(key => players[key])
        .map(key => {
        
        const {WPM, typed, prevChars, newChars, username, startedAt} = players[key]
        
        return <div key={key}>
          <Game 
            local={false} 
            typed={typed} 
            prevChars={prevChars} 
            newChars={newChars} 
            username={username}
            startedAt={startedAt}
            WPM={WPM}
          />
        </div>

      })}
    </div>
  </div>
</div>

export default connect( ({players, game})=>({players, game}), {
  endGame
} )(Lobby)