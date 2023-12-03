/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const robotsRouter = {
    path: '/robots',
    component: Layout,
    redirect: '/robots/robots',
    name: 'robots',
    meta: {
        title: '人工智能',
        icon: 'robot'
    },
    children: [{
            path: 'robots',
            component: () =>
                import ('@/views/robots/robots'),
            name: '对话机器人',
            meta: { title: '对话机器人' }
        },
        {
            path: 'audio',
            component: () =>
                import ('@/views/robots/audio'),
            name: '语音',
            meta: { title: '语音' }
        }
    ]
}
export default robotsRouter