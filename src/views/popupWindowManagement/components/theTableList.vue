<!--
 * @Author: your name
 * @Date: 2021-11-10 11:11:03
 * @LastEditTime: 2021-11-10 11:34:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\popupWindowManagement\components\theTableList.vue
-->
<template>
  <iCard style="margin-top:20px">
    <div class="btnList" >
      <iButton @click="newCreate">{{language('新建')}}</iButton>
      <iButton @click="checkView">{{language('查看')}}</iButton>
      <iButton @click="del">{{language('删除')}}</iButton>
      <iButton @click="exportExcell">{{language('导出')}}</iButton>
    </div>
    <div class="tableList">
      <iTabelCustom
        ref="paritiesList"
        :loading="loading"
        :data="tabelListData"
        :columns="columns"
        :extra-data='extraData'
        @handle-selection-change="handleSelectionChange"
      />
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getPage)"
        @current-change="handleCurrentChange($event, getPage)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </div>
  </iCard>
</template>
<script>
import {iCard,iButton,iPagination} from 'rise'
import iTabelCustom from '@/components/iTableCustom'
import {pageMixins} from '@/utils/pageMixins'
import {TABLE_COLUMNS} from './data'
export default {
  name:'theTableList',
  components:{iCard,iButton,iPagination,iTabelCustom},
  mixins:[pageMixins],
  data(){
    return{
      loading:false,
      columns:TABLE_COLUMNS,
      selectedItems:[1,2],
      tabelListData:[],
      timer:null
    }
  },
  methods:{
    del(){

    },
    handleSelectionChange(val){
      this.selectedItems = val
    },
    checkView(){
      this.selectedItems.forEach(() => {
        window.setTimeout(()=>{
            this.$notify({
            title: '自定义位置',
            message: '右下角弹出的消息',
            position: 'bottom-right'
          })
        },0)

      })
    },
    newCreate(){
        window.open('portal/#/popup-window-management/create')
    },
    exportExcell(){

    }
  }

}
</script>

<style lang="scss" scoped>
.btnList{
  display: flex;
  justify-content: flex-end;
  margin-top:20px ;
}
.tableList{
  margin-top: 20px;
}
</style>