/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const preciseRouter = {
  path: '/precise',
  component: Layout,
  redirect: '/precise/',
  name: 'precise',
  meta: {
    title: '精准测试工具',
    icon: 'table'
  },
  children: [

    {
      path: 'index',
      component: () =>
        import ('@/views/precise-test/export-excel'),
      name: '精准测试工具',
      meta: { title: '精准测试工具' }
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
export default preciseRouter
