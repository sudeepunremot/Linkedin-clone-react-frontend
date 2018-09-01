import constants from '../constants/auth'
import TokenStore from '../lib/token-store'

export const authenticate = ({ email, password }) => async dispatch => {
  dispatch({
    type: constants.AUTH_REQUEST
  })

  const response = await fetch('http://localhost:3000/v1/auth/sign_in', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/vnd.api+json'
    },
    body: JSON.stringify({
      data: {
        type: 'users',
        attributes: {
          email,
          password
        }
      }
    })
  })

  if (response.ok) {
    const json = await response.json()

    TokenStore.apiToken = json.auth_token

    dispatch({
      type: constants.AUTH_SUCCESS
    })
  } else {
    dispatch({
      type: constants.AUTH_FAILURE,
      errorMessage: response.statusText
    })
  }
}
