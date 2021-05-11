import {apiService} from "src/store/apiService";

export const actions = {
  async getAcct({ commit }) {
    const accts = await apiService.fetchAcct()
    const { AcctPos } = accts.data

    commit('setAccts', AcctPos)

    return accts
  }
}
