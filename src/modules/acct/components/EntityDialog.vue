<template>
  <div>
    <q-dialog ref="dialog" v-model="show" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Редактирование записи</div>
        </q-card-section>

        <q-card-section class="bg-white text-teal">
          <q-input
            v-model.number="formData.Balance"
            type="number"
            label="Баланс"
          />
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn color="primary" label="OK" @click="onOKClick" />
          <q-btn color="primary" label="Cancel" @click="onCancelClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'EntityDialog',
  props: {
    isShow: Boolean,
    entityId: Number
  },
  data() {
    return {
      formData: {
        Balance: 0
      }
    }
  },
  mounted() {
    this.formData.Balance = this.$store.getters['acctPos/acctById'](this.entityId)[0].Balance
  },
  computed: {
    show: function () {
      return this.isShow
    }
  },
  methods: {
    onOKClick () {
      const editData = {
        id: this.entityId,
        Balance: this.formData.Balance
      }

      this.$store.commit('acctPos/updateAcctBalance', editData)
      this.$emit('ok')
    },

    onCancelClick () {
      this.$emit('hide')
    }
  }
}
</script>
