const initialState = {
  cascadeComments:[]
}

export const cascadeComments = (state = initialState, action:any) => {
  switch (action.type) {
    case 'SET_CASECADE_COMMENTS': {
      return {
        ...state,
        cascadeComments:action.payload
      }
    }

    case 'SET_ADD_CASECADE_COMMENTS': {
      return {
        ...state,
        cascadeComments:[...state.cascadeComments, action.payload]
      }
    }

    default: {
      return state
    }
  }
}