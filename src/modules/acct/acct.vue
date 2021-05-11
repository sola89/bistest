<template>
  <div style="padding: 15px">
    <GridAcctsFromDate
      :accts="accts"
      :opDates="opDateList"
      :last-op-date="sDate"
      @input="input"
      @delete="updateEntities"
      @edit="handleEdit"
    />

    <EntityDialog
      v-if="DialogEntityShow"
      :isShow="DialogEntityShow"
      :entityId="editEntityId"
      @hide="DialogEntityShow = false"
      @ok="okHandle"
    />
  </div>
</template>

<script>
import GridAcctsFromDate from "src/modules/acct/components/GridAcctsFromDate"
import EntityDialog from "src/modules/acct/components/EntityDialog"

import {date} from "quasar";

export default {
  name: 'acct',
  components: { GridAcctsFromDate, EntityDialog },
  data() {
    return {
      sDate: this.$store.getters['opDate/lastOpDate'],
      accts: [],
      DialogEntityShow: false,
      editEntityId: null,
      currentDate: null
    }
  },
  mounted() {
    this.updateEntities(this.sDate.OpDate)
  },
  computed: {
    opDateList: function () {
      return this.$store.getters['opDate/opDate']
    }
  },
  methods: {
    okHandle () {
      this.updateEntities(this.currentDate)
      this.DialogEntityShow = false
    },
    input(date) {
      this.currentDate = date
      this.updateEntities(this.currentDate)
    },
    getAcctsFromDate(date = this.sDate.OpDate) {
      return this.$store.getters['acctPos/acctsFromDate'](date)
    },
    updateEntities(data) {
      let splitDate = ''
      if (data) {
        splitDate = data.split('.')
      } else {
        splitDate = this.sDate.OpDate.split('.')
      }

      const newDate = date.buildDate({ year:splitDate[2], date:splitDate[0], month:splitDate[1]})
      this.accts = this.getAcctsFromDate(date.formatDate(newDate, 'YYYY-MM-DD'))
    },
    handleEdit(id) {
      this.editEntityId = id
      this.DialogEntityShow = true
    }
  }
}

</script>
