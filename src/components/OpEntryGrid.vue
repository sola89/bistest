<template>
  <div>
    <q-table
      :columns="opColumns"
      :data="opEntries"
      style="margin-top: 25px"
      row-key="name"
      title="Проводки"
      no-data-label="Нет данных"
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
        <q-tr :props="props" :key="props.row.id">
          <q-td>
            {{ props.row.OpDate }}
          </q-td>
          <q-td>
            {{ props.row.AcctNumCr }}
          </q-td>
          <q-td>
            {{ props.row.AcctNumDB }}
          </q-td>
          <q-td>
            {{ props.row.Amount }}
          </q-td>
          <q-td>
            <q-btn
              v-if="!readOnly"
              round
              dense
              color="primary"
              icon="visibility"
              size="small"
              @click="$emit('view', props.row)"
            />
            &nbsp;
            <q-btn
              round
              dense
              color="primary"
              icon="delete"
              size="small"
              @click="deleteEntry(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'OpEntryGrid',
  props: {
    opEntries: Array,
    readOnly: Boolean
  },
  data() {
    return {
      opColumns: [
        {
          name: 'OpDate',
          required: true,
          label: 'Дата операционного дня',
          align: 'left',
          sortable: true
        },
        {
          name: 'AccNumCr',
          required: true,
          label: 'Счет дебета',
          align: 'left',
          sortable: true
        },
        {
          name: 'AccNumDb',
          required: true,
          label: 'Счет кредита',
          align: 'left'
        },
        {
          name: 'Amount',
          required: true,
          label: 'Сумма',
          align: 'left'
        },
        {
          name: 'Actions',
          required: true,
          label: 'Действия',
          align: 'left'
        }
      ],
    }
  },
  methods: {
    deleteEntry(obj) {
      this.$q.dialog({
        title: 'Подтверждение',
        message: 'Вы действительно хотите удалить эту проводку?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.commit('opEntry/deleteEntry', obj)
        this.$emit('delete', obj)
      })
    }
  }
}
</script>
