/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'Table',
    meta: {
        title: 'Table',
        icon: 'table'
    },
    children: [{
            path: 'system_configs',
            component: () =>
                import ('@/views/table/system_configs'),
            name: '公共系统配置',
            meta: { title: '公共系统配置' }
        },

        {
            path: 'group_configs',
            component: () =>
                import ('@/views/table/group_configs'),
            name: '用户组配置',
            meta: { title: '用户组配置' }
        }
    ]
}
export default tableRouter