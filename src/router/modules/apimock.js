/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const apimockRouter = {
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
      name: 'mock接口管理',
      meta: { title: 'mock接口管理' }
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
export default apimockRouter
