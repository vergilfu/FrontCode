/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const boardRouter = {
    path: '/board',
    component: Layout,
    redirect: '/board/firstimepassrate',
    name: 'Table',
    meta: {
        title: '通过率看板',
        icon: 'table'
    },
    children: [{
            path: 'firstimepassrate',
            component: () =>
                import ('@/views/board/firstimepassrate'),
            name: '通过率看板',
            meta: { title: '通过率看板' }
        // },
        // {
        //     path: 'Normal_task',
        //     component: () =>
        //         import ('@/views/task/Normal_task'),
        //     name: '日常任务管理',
        //     meta: { title: '日常任务管理' }
        // },
        // {
        //     path: 'EmergencyTask',
        //     component: () =>
        //         import ('@/views/task/EmergencyTask'),
        //     name: '紧急任务列表',
        //     meta: { title: '紧急任务列表' }
        // },
        // {
        //     path: 'Mapping_config',
        //     component: () =>
        //         import ('@/views/task/Mapping_config'),
        //     name: '整合报表映射配置',
        //     meta: { title: '整合报表映射配置' }
        }
    ]
}
export default boardRouter