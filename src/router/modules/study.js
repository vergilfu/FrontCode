/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const studyRouter = {
  path: '/study',
  component: Layout,
  redirect: '/study/marknotes',
  name: '学习',
  meta: {
    title: '学习',
    icon: 'table'
  },
  children: [{
    path: 'marknotes',
    component: () =>
      import('@/views/study/marknotes'),
    name: '笔记本',
    meta: { title: '笔记本' }
  }]
}
export default studyRouter
