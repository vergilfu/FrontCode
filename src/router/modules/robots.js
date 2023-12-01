/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const robotsRouter = {
  path: '/robots',
  component: Layout,
  redirect: '/robots/robots',
  name: 'robots',
  meta: {
    title: 'gpt-4.0',
    icon: 'robot'
  },
  children: [{
    path: 'robots',
    component: () =>
      import('@/views/robots/robots'),
    name: '对话机器人',
    meta: { title: 'gpt' }
  },
  {
    path: 'audio',
    component: () =>
      import('@/views/robots/audio'),
    name: '语音',
    meta: { title: 'audio' }
  }
]
}
export default robotsRouter
