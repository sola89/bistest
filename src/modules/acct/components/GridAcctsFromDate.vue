<template>
  <div>
    <q-table
      :data="accts"
      :columns="columns"
      row-key="name"
      title="Счета с остатками на дату"
    >
      <template v-slot:top-right>
        <b style="padding-right: 15px">Опердень</b>
        <q-select
          v-model="model"
          :options="dateList"
          option-label="OpDate"
          @input="choiceDate"
        ></q-select>

      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <b>{{ col.label }}</b>
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            {{ props.row.AcctNum }}
          </q-td>
          <q-td>
            <b>{{ props.row.Balance }}</b>
          </q-td>
          <q-td>
            <q-btn
              round
              dense
              color="primary"
              icon="visibility"
              size="small"
              @click="loadOpEntryFromAcct(props.row)"
            />
            &nbsp;
            <q-btn
              round
              dense
              color="primary"
              icon="edit"
              size="small"
              @click="$emit('edit', props.row.id)"
            />
            &nbsp;
            <q-btn
              round
              dense
              color="primary"
              icon="delete"
              size="small"
              @click="deleteEntity(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <OpEntryGrid
      :opEntries="opEntries"
      :readOnly="true"
      @delete="loadOpEntryFromAcct"
    />

  </div>
</template>

<script>
import { date } from 'quasar'
import OpEntryGrid from "src/components/OpEntryGrid"
import {fDate} from "src/utils/date";

export default {
  name: 'GridAcctsFromDate',
  components: { OpEntryGrid },
  props: {
    accts: Array,
    opDates: Array,
    lastOpDate: Object
  },
  data() {
    return {
      columns: [
        {
          name: 'AcctNum',
          required: true,
          label: 'Номер счета',
          align: 'left',
          sortable: true
        },
        {
          name: 'Balance',
          required: true,
          label: 'Остаток',
          align: 'left',
          sortable: true
        },
        {
          name: 'Actions',
          required: true,
          label: 'Действия',
          align: 'left'
        }
      ],
      model: fDate(this.lastOpDate),
      dateList: fDate(this.opDates),
      opEntries: []
    }
  },
  methods: {
    loadOpEntryFromAcct(obj) {
      const num = obj.AcctNumCr ? obj.AcctNumCr : obj.AcctNum
      this.opEntries = this.$store.getters['opEntry/opEntryFromCr'](num)
    },
    choiceDate() {
      this.$emit('input', this.model)
    },
    deleteEntity(obj) {
      this.$q.dialog({
        title: 'Подтверждение',
        message: 'Вы действительно хотите удалить эту запись?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.commit('acctPos/deleteAcct', obj)
        this.$emit('delete', this.model)
      })
    }
  },
  filters: {
    dateFormat: function (value) {
      if (!value) return
      return date.formatDate(value, 'DD.MM.YYYY')
    }
  }
}

</script>

<style lang="sass">
  h4
    padding: 0
    margin: 0
    margin-bottom: 25px
</style>
