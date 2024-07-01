import { legacy_createStore as createStore } from 'redux'
import { combineReducers } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'dark',
}

const changeState = (state = initialState, { type, ...rest }) => {
  // console.log(`change State ${JSON.stringify(state)}`)
  // console.log(`type:${type}`)
  // console.log(`rest:${JSON.stringify({ ...rest })}`)
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const initialSignin = {
  token: undefined,
  name: 'Login',
  email: undefined,
}

const siginChange = (state = initialSignin, { type, ...rest }) => {
  // console.log(`signin state ${JSON.stringify(state)}`)
  // console.log(`signin type is ${type}`)
  // console.log(`sign in rest is ${{ ...rest }}`)
  let data = { ...rest }
  switch (type) {
    case 'get':
      return state
    case 'login':
      // console.log(data)
      return {
        ...state,
        ...rest,
      }
    case 'logout':
      state.token = undefined
      state.name = 'Login'
      state.email = undefined
      return state
    default:
      return state
  }
}

const store = createStore(combineReducers({ changeState, siginChange }))
// const store = createStore(changeState)
export default store
// export {store2}
