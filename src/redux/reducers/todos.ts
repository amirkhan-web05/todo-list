const initialState = {
  todos:[],
}

export const todos = (state = initialState, action:any) => {
  switch (action.type) {
    case 'SET_TODOS': {
      return {
        ...state,
        todos:action.payload
      }
    }

    case 'ADD_TODO': {
      return {
        ...state,
        todos:[...state.todos, action.payload]
      }
    }

    case 'REMOVE_TODO': {
      return {
        ...state,
        todos:state.todos.filter((item:any) => item.id !== action.payload)
      }
    }

    case 'TOGGLE_TODO': {
      return {
        ...state,
        todos:state.todos.map((item:any) => {
          return item.id === action.payload.id ? {...item, completed:!item.completed} : item
        })
      }
    }

    default: {
      return state
    }
  }
}