/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '表格',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dragTable'),
      name: 'DynamicTable',
      meta: { title: '动态表格' }
    },
    {
      path: 'basic-table',
      component: () => import('@/views/table/basicTable'),
      name: 'BasicTable',
      meta: { title: '基本表格' }
    }
  ]
}
export default tableRouter
