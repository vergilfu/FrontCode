/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const photolineRouter = {
  path: '/littlethings',
  component: Layout,
  redirect: '/littlethings/photoline',
  name: 'littlethings',
  meta: {
    title: '点点滴滴',
    icon: 'table'
  },
  children: [{
    path: 'photoline',
    component: () =>
      import('@/views/littlethings/photoline'),
    name: '浪漫时间线',
    meta: { title: '浪漫时间线' }
  },
  {
    path: 'savingpot',
    component: () =>
      import('@/views/littlethings/savingpot'),
    name: '存钱罐',
    meta: { title: '存钱罐' }
  }]
}
export default photolineRouter
