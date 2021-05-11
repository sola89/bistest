export const mutations = {
  setOpEntry(state, payload) {
    state.entities = payload
  },
  deleteEntry(state, payload) {
    state.entities = state.entities.filter(item => item.id !== payload.id)
  }
}
