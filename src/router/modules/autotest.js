/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const autotestRouter = {
    path: '/autotest',
    component: Layout,
    redirect: '/autotest/system_configs',
    name: 'Table',
    meta: {
        title: '自动化配置',
        icon: 'table'
    },
    children: [{
            path: 'system_configs',
            component: () =>
                import ('@/views/autotest/system_configs'),
            name: '公共系统配置',
            meta: { title: '公共系统配置' }
        },

        {
            path: 'group_configs',
            component: () =>
                import ('@/views/autotest/group_configs'),
            name: '用户组配置',
            meta: { title: '用户组配置' }
        }
    ]
}
export default autotestRouter