import { FETCH_BEGIN, FETCH_SUCCESS, FETCH_ERROR, CLEAR_STATE } from '../Constants/ActionTypes'

const initialState = {
  article: {
    title: "",
    created_at: "",
    text: "",
    announce: ""
  },
  articles: [],
  isError: false,
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case FETCH_BEGIN: {
        return { ...state};
    }
    case FETCH_SUCCESS: {
        return { ...state, [action.keyword]: action.payload };
    }
    case FETCH_ERROR: {
        return { ...state, isError: true};
    }
    case CLEAR_STATE: {
        return (state[action.keyword] instanceof Array)?{ ...state, [action.keyword]:[]}:{ ...state, [action.keyword]:{}};
    }
    default:
        return state;
  }
}
