export default[
    {
        path:'/popup-window-management',
        name:'popup-window-management',
        meta:{
            title:'popup-window-management'
        },
        component:()=>import('@/views/popupWindowManagement')
    },
    {
        path:'/popup-window-management/create',
        name:'create-new',
        meta:{
            title:'create-new'
        },
        component:()=> import('@/views/popupWindowManagement/createNew')
    }
]