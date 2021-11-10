export default [
  {
		path: '/assistant/helpCenter',
		name: 'helpCenter',
		meta: {
			title: '帮助中心',
			top: 'admin'
		},
		component: () => import('@/views/assistant/helpCenter')
	}
]