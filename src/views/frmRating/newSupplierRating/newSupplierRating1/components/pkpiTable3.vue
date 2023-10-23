<!--
 * @Author: zbin
 * @Date: 2021-05-21 10:39:35
 * @Descripttion: your project
-->
<template>
  <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange">
    <template #ratingResult='scope'>
      <span class="requiredNo" v-if="scope.row.ratingResult==='通过'">{{scope.row.ratingResult}}</span>
      <span class="required" v-else>{{scope.row.ratingResult}}</span>
    </template>
  </tableList>
</template>

<script>
import tableList from '@/components/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { pkpiTitle3 } from './data';

export default {
  mixins: [pageMixins, generalPageMixins],
  components: {
    tableList,
  },
  props: ['resultVO'],
  data() {
    return {
      tableListData: [],
      tableTitle: pkpiTitle3,
      tableLoading: false,
    };
  },
  watch: {
    resultVO(data) {
      this.tableListData = data
    }
  },
  methods: {
  },
};
</script>

<style scoped>
.required {
  color: #e30b0d;
}
.requiredNo {
  color: #67C23A;
}
</style>
