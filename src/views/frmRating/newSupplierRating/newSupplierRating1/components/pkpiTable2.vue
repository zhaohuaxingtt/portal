<!--
 * @Author: zbin
 * @Date: 2021-05-21 10:39:35
 * @Descripttion: your project
-->
<template>
  <div class="cell">
    <commonPkpiTable :tableData="tableListData" :tableTitle="tableTitle" :inputProps="['description','result']" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange">
    </commonPkpiTable>
  </div>
</template>

<script>
import { iCard, iButton } from 'rise';
import commonPkpiTable from './commonPkpiTable';
import { pageMixins } from '@/utils/pageMixins';
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { pkpiTitle2 } from './data';
import { save } from "@/api/frmRating/newSupplierRating/newSupplierRating";

export default {
  mixins: [pageMixins, generalPageMixins],
  components: {
    iCard,
    commonPkpiTable,
    iButton,
  },
  props: {
    otherVO: {
      type: Array, default: () => {
        return []
      }
    }
  },
  data() {
    return {
      tableListData: [],
      tableTitle: pkpiTitle2,
      tableLoading: false,
    };
  },
  watch: {
    otherVO(data) {
      this.tableListData = data
    }
  },
  methods: {
    async saveInfos(remark, regMoney, flag, basicDTO) {
      const pms = {
        regMoney: regMoney,
        otherScore: this.tableListData[0].result || '',
        otherRemark: this.tableListData[0].description || '',
        remark: remark,
        ratingId: this.$route.query.id,
        basicDTO: basicDTO
      }
      const res = await save(pms)
      if (flag === 'save') {
        this.resultMessage(res, () => {
        })
      } else {
        if (!res.result) {
          this.resultMessage(res, () => {
          })
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cell{
  ::v-deep .el-table .el-table__row .el-input {
  width: 120px !important;
}
}
</style>
