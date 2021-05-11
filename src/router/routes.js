
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/acct', component: () => import('src/modules/acct/acct') },
      { path: '/opdate', component: () => import('src/modules/opdate/opdate') },
      { path: '/opers', component: () => import('src/modules/opers/opers') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
