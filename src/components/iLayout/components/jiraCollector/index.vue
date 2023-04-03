<!--
 * @Author: YoHo
 * @Date: 2023-03-31 13:56:31
 * @LastEditors: YoHo && 917955345@qq.com
 * @FilePath: \front-portal\src\components\iLayout\components\jiraCollector\index.vue
 * @Description: In User Settings Edit
-->
<template>
<div>
    <iButton @click="openJira">jira 收集器</iButton>
</div>
</template>
<script>
import { iButton } from "rise";
import './jquery.collector.js'
export default{
    components:{
        iButton
    },
    computed:{
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    }),
    },
    methods:{
        openJira(){
            // &userId=${this.userInfo.id}&url=${encodeURIComponent(window.location.href)}
            window.open(`http://jira.csvw.com/rest/collectors/1.0/template/form/6079ad15?os_authType=none`)
        }
    }
}
</script>

<style lang="scss">
.atlwdg-trigger{
    z-index: 9999;
}
</style>