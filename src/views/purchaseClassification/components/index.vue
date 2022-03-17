<template>
  <iPage>
    <iCard class="OrganizationListContainer margin-top20">
      <template #header-control>
        <div>
          <iButton @click="add">{{ language('LK_XINZENG', '新增') }}</iButton>
          <iButton @click="handleExport">{{
            language('完成', '完成')
          }}</iButton>
        </div>
      </template>
      <div class="OrganizationTable">
        <HomeFrameWorkTab
          :tableLoading="tableLoading"
          :tableData="tablelist"
          ref="homeframeworktab"
          @handleSelectionChange="handleSelectionChange"
          @open-page="openPage"
          @changePage='purchaseAmount'
        ></HomeFrameWorkTab>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getList)"
          @current-change="handleCurrentChange($event, getList)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        />
      </div>
    </iCard>
    <!-- 新增弹窗 -->
    <addClassification :isShow="isShow" @input="(val) => (isShow = val)" />
  </iPage>
</template>
<script>
import { iCard, iButton, iPagination, iPage } from 'rise'
import HomeFrameWorkTab from './HomeFrameWorkTab'
import addClassification from './addClassification'
import { page } from '@/api/authorityMgmt'
import { SEARCH_DATA } from './data'
import { pageMixins } from '@/utils/pageMixins'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iPagination,
    HomeFrameWorkTab,
    addClassification,
    iPage
  },
  data() {
    return {
      isShow: false, //控制新增弹窗
      formData: SEARCH_DATA,
      tablelist: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //新增
    add() {
      this.isShow = true
    },
    //获取列表值
    getList() {
      this.formData.currentPage = this.page.currPage
      this.formData.pageSize = this.page.pageSize
      page(this.formData).then((res) => {
        if (+res.code == 200) {
          this.tablelist = res.data.data.map((k,i)=>{
            k.indexCode=i+1
            return k
          })
          this.page.totalCount = res.data.total
        }
      })
    },
    purchaseAmount(val){
      console.log('111111111',val)
      this.isShow = true
    }
  }
}
</script>
<style scoped lang='scss'>
.routerpage {
  height: calc(100vh - 100px);
}
</style>