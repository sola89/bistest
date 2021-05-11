<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-toolbar-title>Тестовое задание</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="200"
      :breakpoint="700"
      elevated
      content-class="bg-primary text-white"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <div v-for="item in menuItems" :key="item.id">
            <router-link :to="item.url" class="menu-link">{{ item.name }}</router-link>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view v-if="isInit" />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      drawerLeft: false,
      isInit: false,
      menuItems: [
        {
          name: 'Счета',
          url: '/acct',
          id: 1
        },
        {
          name: 'Операционные дни',
          url: '/opdate',
          id: 2
        },
        {
          name: 'Операции',
          url: '/opers',
          id: 3
        }
      ]
    }
  },
  mounted() {
    const loadAcctPos = this.$store.dispatch('acctPos/getAcctPos')
    const loadOpDates = this.$store.dispatch('opDate/getOpDates')
    const loadOpEntry = this.$store.dispatch('opEntry/getOpEntry')

    Promise.all([loadAcctPos, loadOpDates, loadOpEntry]).then(() => {
      this.isInit = true
    })
  }
}
</script>

<style lang="sass">
  .menu-link
    color: #fff
    text-decoration: none
    font-size: 18px

    &:hover
      text-decoration: underline
</style>
