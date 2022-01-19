<!--
 * @Date: 2021-11-29 10:20:21
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-19 10:28:08
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\userManage\index.vue
-->
<template>
  <div>
    <!-- <baseInfo style="margin-top:20px"></baseInfo> -->
        <userTable ></userTable>
  </div>
</template>

<script>
import baseInfo from '../components/baseInfo'
import userTable from './components/userTable'
export default {
  components: { baseInfo,userTable },
  data() {
    return {}
  }
}
</script>

<style></style>
