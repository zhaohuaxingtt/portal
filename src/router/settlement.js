export default [
  {
    path: '/supplierSettlement',
    name: 'supplierSettlement',
    meta: {
      title: '结算中心',
      activeMenu: ['SUPPLIER_WORKBENCH', 'SETTLEMENT-101'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/settlement/supplierSettlement'),
    redirect: 'supplierSettlement/overview',
    children: [
      {
        path: 'overview',
        name: 'supplierSettlement-overview',
        meta: {
          title: '概览'
        },
        component: () => import('@/views/settlement/supplierSettlement/components/overview')
      },
      {
        path: 'payApplyList',
        name: 'supplierSettlement-payApplyList',
        meta: {
          title: '支付申请列表'
        },
        component: () => import('@/views/settlement/supplierSettlement/components/pay-apply-list')
      },
      {
        path: 'unpaidContractList',
        name: 'supplierSettlement-unpaidContractList',
        meta: {
          title: '合同列表'
        },
        component: () => import('@/views/settlement/supplierSettlement/components/contract-list')
      }
    ]
  },
  // 支付申请单详情
  {
    path: '/supplier/settlement/payApplyDetail',
    name: 'PayApplyDetail',
    component: () => import('@/views/settlement/supplierSettlement/components/pay-apply-detail'),
    meta: {
      activeMenu: ['SUPPLIER_WORKBENCH', 'SETTLEMENT-101']
    }
  },
  // 审批相关信息
  {
    path: '/supplier/settlement/payApplyApproval',
    name: 'PayApplyApproval',
    component: () => import('@/views/settlement/supplierSettlement/components/pay-apply-detail/components/approval'),
    meta: {
      activeMenu: ['SUPPLIER_WORKBENCH', 'SETTLEMENT-101']
    }
  },
  // 发票信息
  {
    path: '/supplier/settlement/payApplyInvoice',
    name: 'PayApplyInvoice',
    component: () => import('@/views/settlement/supplierSettlement/components/pay-apply-detail/components/invoice'),
    meta: {
      activeMenu: ['SUPPLIER_WORKBENCH', 'SETTLEMENT-101']
    }
  }
];
