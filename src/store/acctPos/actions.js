import {apiService} from "src/store/apiService";

export const actions = {
  async getAcctPos({ commit }) {
    const accts = await apiService.fetchAcctPos()
    const { AcctPos } = accts.data

    commit('setAccts', AcctPos)

    return accts
  }
}
