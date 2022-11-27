const initialState = {
  comments:[],
}

export const comments = (state = initialState, action:any) => {
  switch (action.type) {
    case 'SET_COMMENTS': {
      return {
        ...state,
        comments:action.payload
      }
    }

    case 'ADD_COMMENT': {
      return {
        ...state,
        comments:[...state.comments, action.payload]
      }
    }

    default: {
      return state
    }
  }
}