<template>
  <iPage>
    <iCard class="OrganizationListContainer margin-top20">
      <template #header-control>
        <div>
          <iButton @click="add">{{ language('LK_XINZENG', '新增') }}</iButton>
          <iButton @click="done">{{ language('完成', '完成') }}</iButton>
        </div>
      </template>
      <div class="OrganizationTable">
        <HomeFrameWorkTab
          :tableLoading="tableLoading"
          :tableData="tablelist"
          ref="homeframeworktab"
          @handleSelectionChange="handleSelectionChange"
          @open-page="openPage"
          @changePage="purchaseAmount"
          @returnData="returnData"
        >
        </HomeFrameWorkTab>
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
    <addClassification
      :isShow="isShow"
      @input="(val) => (isShow = val)"
      @saveDataList="saveDataList"
    />
    <!-- 修改弹窗 -->
    <changeClassification
      :isChange="isChange"
      @input="(val) => (isChange = val)"
      @saveChangeList="saveChangeList"
    />
  </iPage>
</template>
<script>
import { iCard, iButton, iPagination, iPage } from 'rise'
import HomeFrameWorkTab from './HomeFrameWorkTab'
import addClassification from './addClassification'
import changeClassification from './changeClassification'
import { page, getMaterialGroupById, finish } from '@/api/authorityMgmt'
import { SEARCH_DATA, SEARCH_ADD_DATA } from './data'
import { pageMixins } from '@/utils/pageMixins'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iPagination,
    HomeFrameWorkTab,
    addClassification,
    iPage,
    changeClassification
  },
  data() {
    return {
      isShow: false, //控制新增弹窗
      formData: SEARCH_DATA,
      tablelist: [],
      isChange: false, //修改弹窗
      finash: [],
      addlist: SEARCH_ADD_DATA
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //新增
    add() {
      this.isShow = true
      for (let i in this.addlist) {
        if (i !== 'isActive') {
          this.addlist[i] = ''
        }
      }
    },
    //获取列表值
    getList() {
      this.formData.current = this.page.currPage
      this.formData.size = this.page.pageSize
      page(this.formData).then((res) => {
        if (+res.code == 200) {
          this.tablelist = res.data.data.map((k, i) => {
            k.indexCode = i + 1
            return k
          })
          this.page.totalCount = res.data.total
        }
      })
    },
    //修改采购分类
    purchaseAmount(val) {
      this.isChange = true
      getMaterialGroupById(val.id).then((res) => {
        this.formData.parentMaterialGroupCode = res.data.parentMaterialGroupCode
        this.formData.parentMaterialGroupName = res.data.parentMaterialGroupName
        this.formData.parentMaterialGroupLevel =
          res.data.parentMaterialGroupLevel + 1
        this.formData.materialGroupCode = res.data.materialGroupCode
        this.formData.materialGroupName = res.data.materialGroupName
        this.formData.materialGroupDesc = res.data.materialGroupDesc
        this.formData.isActive = res.data.isActive
        this.formData.isActive1 = res.data.isActive1
      })
    },
    //新增后保存
    saveDataList() {
      this.isShow = false
      this.getList()
    },
    //修改后保存
    saveChangeList() {
      this.isChange = false
      this.getList()
    },
    //实时保存
    returnData(x) {
      this.finash = x
      console.log(this.finash)
      let aa = { id: this.finash[0].id, isActive: this.finash[0].isActive }
      console.log(aa)
      finish(aa).then((res) => {})
    }
  }
}
</script>
<style scoped lang='scss'>
.routerpage {
  height: calc(100vh - 100px);
}
::v-deep .el-switch {
  position: relative;
  color: transparent;
  .el-switch__label {
    position: absolute;
    color: transparent;
  }
  .el-switch__label--left {
    left: 25px;
    z-index: 1;
  }
  .el-switch__label--right {
    left: 5px;
  }
  .el-switch__label--left.is-active {
    color: #000;
  }
  .el-switch__label--right.is-active {
    color: #fff;
  }
}
</style>