export const getters = {
  opEntry: state => state.entities,
  opEntryFromCr: state => cr => state.entities.filter(item => item.AcctNumCr === cr),
  opEntryFromOpDate: state => date => state.entities.filter(item => item.OpDate === date)
}
