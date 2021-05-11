export const getters = {
  opDate: state => state.entities,
  lastOpDate: state => state.entities[state.entities.length - 1]
}
