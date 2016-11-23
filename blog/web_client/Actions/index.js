import { FETCH_BEGIN, FETCH_SUCCESS, FETCH_ERROR, CLEAR_STATE } from '../Constants/ActionTypes'
import { fetch } from "redux-auth"

const apiUrl="/api/v0/"

export function articleListFetchBegin() {
  return {
    type: FETCH_BEGIN,
  }
}

export function articleListFetchSuccess(payload, keyword) {
  return {
    type: FETCH_SUCCESS,
    payload,
    keyword
  }
}
export function fetchError(payload) {
  return {
    type: FETCH_ERROR,
    payload
  }
}

export function clearState(keyword) {
  return {
    type: CLEAR_STATE,
    keyword
  }
}

export function fetchApi(fetchUrl, keyword) { return function(dispatch) {
  dispatch(articleListFetchBegin())
  return fetch(apiUrl + fetchUrl)
    .then(response => response.json())
    .then(json => dispatch(articleListFetchSuccess(json, keyword)))
    .catch(json => dispatch(fetchError(json)))
}
}
