<template>
  <iPage >
    <pageHeader class="title">{{language('弹窗管理')}}</pageHeader>
    <div class="content">
        <theTableFilter />
        <theTableList />
    </div>
      
  </iPage>
</template>

<script>
import {iPage} from 'rise'
import pageHeader from '@/components/pageHeader'
import {theTableFilter,theTableList} from './components'
export default {
    components:{iPage,theTableFilter,theTableList,pageHeader}
}
</script>

<style lang="scss" scoped>
.content{
  margin-top:20px ;
}
</style>