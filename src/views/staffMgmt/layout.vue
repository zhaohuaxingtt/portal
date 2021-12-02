<template>
  <layoutCommon :menus="menus" />
</template>

<script>
import layoutCommon from '@/layout/common'
export default {
    components:{
        layoutCommon
    },
    data(){
        return{
            menus:[
                {
                    value: 1,
                    name: '员工用户管理',
                    message: 0,
                    url: '/authorityMgmt/index',
                    activePath: '/authorityMgmt',
                    key: '员工用户管理'
                },
                {
                    value: 1,
                    name: '系统管理',
                    message: 0,
                    url: '/authorityMgmt/system-management',
                    activePath: '/authorityMgmt',
                    key: '系统管理'
                }
            ]
        }
    }
}
</script>

<style>

</style>