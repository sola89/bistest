export const mutations = {
  setAccts(state, payload) {
    state.entities = payload
  },
  deleteAcct(state, payload) {
    state.entities = state.entities.filter(item => item.id !== payload.id)
  },
  updateAcctBalance(state, payload) {
    const entity = state.entities.filter(item => item.id === payload.id)[0]
    entity.Balance = payload.Balance
  }
}
