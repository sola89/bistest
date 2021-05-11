import { date } from 'quasar'

export const fDate = function (dateList, format = 'DD.MM.YYYY') {
  if (Array.isArray(dateList)) {
    return dateList.map(item => date.formatDate(item.OpDate, format))
  } else {
    return date.formatDate(dateList.OpDate, format)
  }

}
