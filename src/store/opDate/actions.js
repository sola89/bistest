import {apiService} from "src/store/apiService";

export const actions = {
  async getOpDates({ commit }) {
    const data = await apiService.fetchOpDate()
    const { OpDate } = data.data

    const sorted = OpDate.sort((a, b) => new Date(a.OpDate) - new Date(b.OpDate))

    commit('setOpDate', sorted)
  }
}
