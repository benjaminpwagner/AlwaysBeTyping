import React from 'react'
import Result from './Result'
import ReactCountdownClock from 'react-countdown-clock'
import {setName} from '../store'
import { connect} from 'react-redux'

const Results =  ({setName, game, players}) => {
  players['me'] = game
  return (
      <div id='results-container'>
        <h1>Game Over!</h1>
          <button id='change-name'
            onClick={()=>setName('Anonymous')}
          >
            Change Name
          </button>
          <div className='row' >
            <ReactCountdownClock
              seconds={15}
              color="#000"
              alpha={0.9}
              size={50}
              onComplete={() => endGame()} 
            />
            <div className='column' style={{marginLeft: 20}}>

              { Object.keys(players)
                .filter(key => players[key])
                .sort( (a, b) => {
                  if (players[a].WPM < players[b].WPM)
                  return 1
                  else if (players[a].WPM > players[b].WPM)
                  return -1
                  else return 0
                })
                .map((key,idx) => 
                <Result place={idx+1} name={players[key].username} wpm={players[key].WPM} />
                )
              }
          </div>
        </div>
      </div>
  )
}

export default connect(null, {setName})(Results)