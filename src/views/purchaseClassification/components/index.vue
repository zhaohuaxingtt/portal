<template>
  <div>
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
          :tableData="tableListData"
          ref="homeframeworktab"
          @handleSelectionChange="handleSelectionChange"
          @open-page="openPage"
        ></HomeFrameWorkTab>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getList)"
          @current-change="handleCurrentChange($event, getList)"
          background
        />
      </div>
    </iCard>
    <!-- 新增弹窗 -->
    <addClassification  :isShow="isShow" @input="(val) => (isShow = val)" />
  </div>
</template>
<script>
import { iCard, iButton, iPagination } from 'rise'
import HomeFrameWorkTab from './HomeFrameWorkTab'
import addClassification from './addClassification'
export default {
  components: {
    iCard,
    iButton,
    iPagination,
    HomeFrameWorkTab,
    addClassification
  },
  data() {
    return {
      isShow: true //控制新增弹窗
    }
  },
  methods: {
    add() {
      this.isShow = true
    }
  }
}
</script>
<style scoped lang='scss'>
</style>