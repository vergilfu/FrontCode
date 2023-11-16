/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const taskRouter = {
  path: '/apimock',
  component: Layout,
  redirect: '/apimock/',
  name: 'apimock',
  meta: {
    title: '接口mock',
    icon: 'table'
  },
  children: [

    {
      path: 'list',
      component: () =>
        import ('@/views/apimock/list'),
      name: '接口列表',
      meta: { title: '接口列表' }
    }
    // {
    //     path: 'test',
    //     component: () =>
    //         import ('@/views/apimock/test'),
    //     name: '接口测试',
    //     meta: { title: '接口测试' }
    // }
  ]
}
export default taskRouter
