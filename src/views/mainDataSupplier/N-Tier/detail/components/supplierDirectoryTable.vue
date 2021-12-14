<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
         language('LIANXIREN', '联系人')
      }}</span>
      <div class="floatright">
        <i-button :disabled="tableListData.length>=1"
                  @click="addTableItem">新增</i-button>
        <i-button @click="deleteCl()">{{
          $t('LK_SHANCHU')
        }}</i-button>
        <i-button @click="exportsTable">{{
          $t('LK_DAOCHU')
        }}</i-button>
      </div>
    </div>
    <table-list ref="commonTable"
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :input-props="[
        'name',
        'position',
        'dept',
        'telephoneAreaCode',
        'telephoneM',
        'email',
      ]"
                :index="true">

    </table-list>
  </i-card>
</template>

<script>
import { iCard, iButton, iMessageBox } from 'rise'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { supplierDirectoryTableTitle } from './data'
export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList
  },
  props: {
    tableListData: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      tableTitle: supplierDirectoryTableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  created() {},
  methods: {
    deleteCl() {
      iMessageBox(
        this.$t('LK_SHIFOUQUERENSHANCHU'),
        this.$t('LK_WENXINTISHI'),
        {
          confirmButtonText: this.$t('LK_QUEDING'),
          cancelButtonText: this.$t('LK_QUXIAO')
        }
      ).then(async () => {
         this.selectTableData.map((v) => {
          this.tableListData.map((val, index) => {
            if (val == v) {
              this.tableListData.splice(index, 1)
            }
          })
        })
      })
    }
  }
}
</script>

<style scoped></style>
