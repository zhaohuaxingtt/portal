export default [
    {
        path:'offline-download',
        name:'offlineDownload',
        meta:{
            title:'离线下载',
            activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
        },
        component:()=>import('@/views/offlineDownload')
    }
]