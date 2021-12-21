export default [
    {
        path:'offline-download',
        name:'offlineDownload',
        meta:{
            title:'离线下载',
            activeMenu: ['RISE_COMMON_FUNCTION', 'CF_DOWNLOAD']
        },
        component:()=>import('@/views/offlineDownload')
    }
]