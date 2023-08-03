/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const taskRouter = {
    path: '/task',
    component: Layout,
    redirect: '/task/Task_list',
    name: 'Table',
    meta: {
        title: '任务管理',
        icon: 'table'
    },
    children: [{
            path: 'Task_list',
            component: () =>
                import ('@/views/task/Task_list'),
            name: '任务列表',
            meta: { title: '任务列表' }
        },
        {
            path: 'Normal_task',
            component: () =>
                import ('@/views/task/Normal_task'),
            name: '日常任务管理',
            meta: { title: '日常任务管理' }
        },
        {
            path: 'EmergencyTask',
            component: () =>
                import ('@/views/task/EmergencyTask'),
            name: '紧急任务列表',
            meta: { title: '紧急任务列表' }
        },
        {
            path: 'Mapping_config',
            component: () =>
                import ('@/views/task/Mapping_config'),
            name: '整合报表映射配置',
            meta: { title: '整合报表映射配置' }
        }
    ]
}
export default taskRouter