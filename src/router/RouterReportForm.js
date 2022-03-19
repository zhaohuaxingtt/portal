export default [
    {
        path: '/reportForm/admin/typeMaintain',
		name: 'typeMaintain',
		meta: {
			title: 'typeMaintain'
		},
		component: () => import('@/views/reportForm/admin/typeMaintain')
    },
    {
        path: '/reportForm/web/reportCards',
		name: 'reportCards',
		meta: {
			title: 'reportCards'
		},
		component: () => import('@/views/reportForm/web/reportCards')
    },
    {
        path: '/reportForm/web/reportCardsDetail',
		name: 'reportCardsDetail',
		meta: {
			title: 'reportCardsDetail'
		},
		component: () => import('@/views/reportForm/web/reportCardsDetail')
    },
]