import socket from '../socket'
const initState = {
  newChars: '',
  prevChars: '',
  typed: '',
  timeSecs: 0,
  WPM: 0,
  isActive: false,
  username: 'Anonymous',
  startedAt: new Date(),
  onGoing: true
}

const NEW_GAME = 'NEW_GAME'
const INPUT_CHARACTER = 'INPUT_CHARACTER'
const BACKSPACE = 'BACKSPACE'
const END_GAME = 'END_GAME'
const UPDATE_WPM = 'UPDATE_WPM'
const SHOW_RESULTS = 'SHOW_RESULTS'
const SET_NAME = 'SET_NAME'

export const setName = name => {
  socket.emit('change-name', name)
  return {
    type: SET_NAME, name
  }
}

export const showResults = () => ({
  type: SHOW_RESULTS
})

export const inputChar = char => ({
  type: INPUT_CHARACTER, char
})

export const backspace = () => ({
  type: BACKSPACE
})

export const newGame = game => ({
  type: NEW_GAME, game
})

export const endGame = () => ({
  type: END_GAME
})

export const updateWPM = WPM => ({
  type: UPDATE_WPM, WPM
})

export default function(state = initState, action) {
  switch (action.type) {
    case NEW_GAME:
      return {
        ...initState,
        ...action.game
      }
    case END_GAME: {
      return {
        ...state,
        active: false
      }
    }
    case UPDATE_WPM:
      return {
        ...state,
        WPM: action.WPM
      }
    case SHOW_RESULTS:
      return {
        ...state, onGoing: false
      }
    case INPUT_CHARACTER:
      return { ...state, 
        typed: `${state.typed}${action.char}`,
        prevChars: `${state.prevChars}${state.newChars.charAt(0)}`,
        newChars: state.newChars.slice(1)
      }
    case BACKSPACE:
      return { ...state, 
        typed: state.typed.slice(0, state.typed.length-1),
        prevChars: state.prevChars.slice(0, state.prevChars.length-1),
        newChars: `${state.prevChars.charAt(state.prevChars.length-1)}${state.newChars}`
      }
    case SET_NAME:
       return {
         ...state,
         username: action.name
       }
    default:
      return state
  }
}
