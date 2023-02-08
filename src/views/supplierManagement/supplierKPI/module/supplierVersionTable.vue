<!--
 * @Date: 2022-08-18 11:10:25
 * @LastEditors: caopeng
 * @LastEditTime: 2022-09-29 10:01:07
 * @FilePath: \front-order\src\views\ws2\productionCapacity\Bom\page\detail\contrast\index.vue
-->
<template>
  <div class="page">
    <div class="title">
      <div class="left">
        <p>数据版本日期：2022-12-20</p>
        <p>CS科室打分状态：待上传手工指标（2/4）</p>
        <p>其他科室打分状态：进行中（2/4）</p>
      </div>
      <div>
        <iButton @click="canel">查看进度 </iButton>
      </div>
    </div>
    <el-table style="margin-top:20px" border :data="tableData" >
      <column
        v-for="(item, index) in tableTitle"
        :key="index"
        :col="item"
      ></column>
    </el-table>
  </div>
</template>

<script>
import column from './column'
import {} from '@/api/supplierManagement/supplierIndexManage/index'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable'
import { cloneDeep } from 'lodash'
import { getDictByCode } from '@/api/dictionary'
import {
  iMessage,
  iMessageBox,
  iPagination,
  iCard,
  iSearch,
  iButton,
  iInput,
  iSelect,
  iDatePicker,
  iDialog
} from 'rise'
export default {
  mixins: [pageMixins],

  components: {
    column,

    iCard,
    iPagination,
    iSearch,
    iButton,
    iInput,
    iSelect,
    iDatePicker,
    tableList,
    iDialog
  },
  data() {
    return {
      tableTitle: [
        {
          name: '指标',
          children: [
            {
              name: '进出口类型',
              children: [{ name: '(时间)/(measures)', prop: 'time' }]
            }
          ]
        },
        {
          name: '总体',
          children: [
            {
              name: '进口',
              children: [
                { name: '初值', prop: 'istarter' },
                { name: '终值', prop: 'iinal' }
              ]
            },
            {
              name: '出口',
              children: [
                { name: '初值', prop: 'estarter' },
                { name: '终值', prop: 'einal' }
              ]
            }
          ]
        }
      ],
      tableData: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>

<style lang="scss" scoped>
.page {
  background: white;
  padding: 20px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        margin: 0 20px;
        font-size: 16px;
        font-weight: 600;
        color: #666;
      }
    }
  }
}
</style>
