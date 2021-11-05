<template>
  <div class="content">
    <iTableCustom
      ref="testTable"
      :columns="tableDetailColumnSetting"
      :data="tableListData"
    />
    <iPagination
      v-update
      background
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
    />
  </div>
</template>

<script>
import { familyCarTypList } from '@/api/mainData/productFamily'
import {iPagination } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { tableDetailColumnSetting } from './data'
export default {
  props:{
      PID:{
          type:String,
          default:''
      }
  },
  created() {
      this.getTableList()
  },
  methods: {
    getTableList() {
      let param = {
        productCode:this.PID,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      familyCarTypList(param)
        .then((val) => {
          if (val.code == 200) {
            this.tableListData = val.data
            this.page.totalCount = val.total
          }else{
              iMessage.error(val.desZh || '获取数据失败')
          }
        })
        .catch(() => {
            iMessage.error(val.desZh || '获取数据失败')
        })
    }
  },
  data() {
    return {
      tableDetailColumnSetting,
      tableListData: []
    }
  },
  mixins: [pageMixins],
  components: {
    iTableCustom,
    iPagination
  }
}
</script>

<style lang="scss" scoped>

.content{
    margin-top: 20px;
    padding-bottom: 20px;
}

</style>