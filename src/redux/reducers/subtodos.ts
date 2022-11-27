const initialState = {
  subtodos:[],
}

export const subtodos = (state = initialState, action:any) => {
  switch (action.type) {
    case 'SET_SUBTODOS': {
      return {
        ...state,
        subtodos:action.payload
      }
    }

    case 'ADD_SUBTODO': {
      return {
        ...state,
        subtodos:[...state.subtodos, action.payload]
      }
    }

    case 'REMOVE_SUBTODO': {
      return {
        ...state,
        subtodos:state.subtodos.filter((item:any) => item.id !== action.payload)
      }
    }

    case 'TOGGLE_SUBTODO': {
      return {
        ...state,
        subtodos:state.subtodos.map((item:any) => {
          return item.id === action.payload.id ? {...item, completed:!item.completed} : item
        })
      }
    }

    default: {
      return state
    }
  }
}