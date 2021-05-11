<template>
  <div style="padding: 15px">
    <OpEntryGrid
      :opEntries="opEntries"
      :readonly="false"
      @delete="deleteHandle"
      @view="view"
    />
  </div>
</template>

<script>
import OpEntryGrid from "src/components/OpEntryGrid"
export default {
  name: 'opers',
  components: { OpEntryGrid },
  data() {
    return {
      opEntries: []
    }
  },
  mounted() {
    this.loadOpEntries()
  },
  methods: {
    loadOpEntries() {
      this.opEntries = this.$store.getters['opEntry/opEntry']
    },
    deleteHandle() {
      this.loadOpEntries()
    },
    view(obj) {
      console.log(obj)
    }
  }
}

</script>
