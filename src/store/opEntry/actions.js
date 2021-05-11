import {apiService} from "src/store/apiService";

export const actions = {
  async getOpEntry({ commit }) {
    const opEntries = await apiService.fetchOpEntry()
    const { OpEntry } = opEntries.data

    commit('setOpEntry', OpEntry)

    return opEntries
  }
}
