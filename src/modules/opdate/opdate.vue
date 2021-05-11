<template>
  <div style="padding: 15px">
    <q-table
      :data="opDates"
      :columns="columns"
      row-key="name"
      title="Операционные дни"
    >
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
            {{ props.row.OpDate }}
          </q-td>
          <q-td>
            <q-btn
              round
              dense
              color="primary"
              icon="visibility"
              size="small"
              @click="loadOpEntryFromOpDate(props.row.OpDate)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <OpEntryGrid
      :opEntries="opEntries"
      :readOnly="true"
      @delete="deleteHandle"
    />

  </div>
</template>

<script>
import OpEntryGrid from "src/components/OpEntryGrid"
export default {
  name: 'opdate',
  components: { OpEntryGrid },
  data() {
    return {
      columns: [
        {
          name: 'OpDate',
          required: true,
          label: 'Oпердень',
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
      opDates: [],
      opEntries: []
    }
  },
  mounted() {
    this.loadOpDates()
  },
  methods: {
    loadOpDates() {
      this.opDates = this.$store.getters['opDate/opDate']
    },
    loadOpEntryFromOpDate(date) {
      this.opEntries = this.$store.getters['opEntry/opEntryFromOpDate'](date)
    },
    deleteHandle(obj) {
      this.loadOpEntryFromOpDate(obj.OpDate)
    }
  },
}

</script>
