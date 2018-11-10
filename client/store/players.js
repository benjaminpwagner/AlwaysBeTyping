
const initState = {
 // obj keyed by socket id 
 /*
    "SOCKET_ID1": {
      prevChars: ''
      typed: ''
    },
    "SOCKET_ID2": {
      prevChars: ''
      typed: ''
    }

 */
}

const GOT_PLAYER_UPDATE = 'GOT_PLAYER_UPDATE'
const REMOVE_PLAYER = 'REMOVE_PLAYER'
const GOT_PLAYERS = 'GOT_PLAYERS'

export const addPlayers = players => ({
  type: GOT_PLAYERS, players
})

export const updatePlayer = (socketId, gameState) => ({
  type: GOT_PLAYER_UPDATE, socketId, gameState
})

export const removePlayer = socketId => ({
  type: REMOVE_PLAYER, socketId
})

export default function(state = initState, action) {
  switch (action.type) {
    case GOT_PLAYERS:
      return action.players
    case GOT_PLAYER_UPDATE:
      return {
        ...state,
        [action.socketId]: {
          ...state[action.socketId],
          ...action.gameState
        }
      }
    case REMOVE_PLAYER:
      const { [action.socketId]: _ , ...players} = {...state}
      return players
    default:
      return state
  }
}
