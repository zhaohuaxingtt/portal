<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:54:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-09 15:32:34
 * @Descripttion: your project
-->
<template>
  <iCard :title="$t('SUPPLIER_SHENRUPINGJI')">
    <el-button slot="header-control"
               type="primary"
               @click="$emit('back')">{{$t('LK_FANHUI')}}</el-button>
    <tableList :mergeValue="'furtherRatingCard'"
               :selection="false"
               :tableData="deepGradeVOList"
               :tableTitle="tableTitle"
               :tableLoading="tableLoading"
               :index="false"
               @handleSelectionChange="handleSelectionChange"
               openPageProps="view"
               @openPage="handleOpenPage"
               :openPageGetRowData="true"
               :customOpenPageWord="$t('LK_CHAKAN')">
      <template #progress='scope'>
        <el-popover trigger="hover"
                    :content="scope.row.status+','+scope.row.progress"
                    placement="top-end">
          <el-progress slot="reference"
                       :percentage="scope.row.progress?scope.row.progress:'0'"></el-progress>
        </el-popover>
      </template>
      <template #deepCommentResult='scope'>
        <icon class="icon"
              symbol
              :name="scope.row.deepCommentResult==='GREEN'?'iconlvdeng':scope.row.deepCommentResult==='RED'?'iconhongdeng':scope.row.deepCommentResult==='YELLOW'?'iconhuangdeng':''"></icon>
      </template>
    </tableList>
  </iCard>
</template>

<script>
import { iCard, icon } from "rise";
import tableList from '@/components/commonTable';
import { tableTitle } from "./data";
export default {
  components: { iCard, icon, tableList },
  props: {
    deepGradeVOList: {
      type: Array, default: () => {
        return []
      }
    }
  },
  data () {
    return {
      tableListData: [
        { name: 3123, value: 2321 },
        { name: 3123, value: 2321 },
        { name: 3123, value: 2321 },
        { name: 3123, value: 2321 },
        { name: 3123, value: 2321 },
      ],
      tableTitle,
      tableLoading: false
    }
  },
  created () { },
  methods: {

  }

}
</script>

<style>
.icon {
  font-size: 20px;
}
</style>