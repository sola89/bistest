export const getters = {
  accts: state => state.entities,
  acctsFromDate: state => date => state.entities.filter(item => item.OpDate === date),
  acctById: state => id => state.entities.filter(item => item.id === id)
}
