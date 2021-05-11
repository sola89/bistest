import axios from "axios";

export const apiService = {
  async fetchAcctPos() {
    return await axios.get('/db/acctPos.json').then(res => res)
  },
  async fetchOpDate() {
    return await axios.get('/db/opDate.json').then(res => res)
  },
  async fetchAcct() {
    return await axios.get('/db/acct.json').then(res => res)
  },
  async fetchOpEntry() {
    return await axios.get('/db/opEntry.json').then(res => res)
  },
}
