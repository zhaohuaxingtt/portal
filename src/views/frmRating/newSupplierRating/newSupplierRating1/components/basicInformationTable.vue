<!--
 * @Author: zbin
 * @Date: 2021-05-21 10:39:35
 * @Descripttion: your project
-->
<template>
  <iCard collapse :title="$t('SPR_FRM_XGYSPJ_GYSZRPGMO_JBXX')">
    <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange">
      <template #dataCategory="scope">
        <div v-if="scope.row.dataCategory==='注册资本（元）'">
          {{scope.row.dataCategory}}
          <span style="color:red">*</span>
          <el-popover trigger="hover" :content="$t('SPR_FRM_XGYSPJ_QSRDWRMBDZCZBJES')" placement="top-start">
            <icon slot="reference" symbol name="iconxinxitishi" class="font-size16 marin-left5" />
          </el-popover>
        </div>
        <div v-else>{{scope.row.dataCategory}}</div>
      </template>
      <template #dataValue="scope">
        <div v-if="scope.row.dataCategory==='注册资本（元）'">
          <i-input v-model="scope.row.dataValue" />
        </div>
        <div v-else>{{scope.row.dataValue}}</div>
      </template>
    </tableList>
  </iCard>
</template>

<script>
import { iCard, icon, iInput } from 'rise';
import tableList from '@/components/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import { tableTitle } from './data';

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    tableList,
    icon,
    iInput,
  },
  props: {
    basicDTO: {
      type: Array, default: () => {
        return []
      }
    }
  },
  watch: {
    basicDTO(data) {
      this.tableListData = data
    }
  },
  data() {
    return {
      tableListData: [],
      tableTitle,
      tableLoading: false,
      regMoney: ''
    };
  },
  methods: {
    backRemark() {
      this.tableListData.forEach(item => {
        if (item.dataCategory === '注册资本（元）') {
          this.regMoney = item.dataValue
        }
      })
      return this.regMoney
    },
  },
};
</script>

<style scoped>
</style>
