/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const robotsRouter = {
  path: '/robots',
  component: Layout,
  redirect: '/robots/robots',
  name: 'robots',
  meta: {
    title: 'gpt-4.0',
    icon: 'table'
  },
  children: [{
    path: 'robots',
    component: () =>
      import('@/views/robots/robots'),
    name: 'gpt-4.0',
    meta: { title: 'gpt-4.0' }
  }]
}
export default robotsRouter
