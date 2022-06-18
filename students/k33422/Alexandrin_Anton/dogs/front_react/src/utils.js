export const formReducer = (state, e) => {
  return {
    ...state,
    [e.name]: e.value
  }
}