<template>
  <iPage>
        <div class="page-header">
            <div class="header">
                <pageHeader class="title">{{language('弹窗管理')}}</pageHeader>
                <div>
                    <iButton @click="save">{{language('保存')}}</iButton>
                    <iButton @click="reset">{{language('重置')}}</iButton>
                    <iButton @click="preview">{{language('预览')}}</iButton>
                </div>
            </div>
        </div>
        <iCard style="margin-top:20px">
            <div class="content">
                <new-left />
                <new-right />
            </div>
        </iCard>
  </iPage>
</template>

<script>
import {iPage,iButton,iCard} from 'rise'
import{newLeft,newRight} from './components/index'
import pageHeader from '@/components/pageHeader'
export default {
    name:'createNew',
    components:{iPage,pageHeader,iButton,iCard,newLeft,newRight}
}
</script>

<style lang="scss" scoped>
.header{
    display: flex;
    justify-content: space-between;
}
.content{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
</style>