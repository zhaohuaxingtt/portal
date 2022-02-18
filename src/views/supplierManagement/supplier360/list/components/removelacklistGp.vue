<!--
 * @Author: caopeng
 * @Date: 2021-010-21
-->
<template>
  <iDialog @close="closeDiolog()"
           :title="'移除⿊名单 - 一般采购 -'+ clickTableList.nameZh"
           :visible.sync="value"
           top="2%"
           width="85%">
    <div class="box">
      <div class="header">
        <i-button @click="handleRemove">{{
          language('YICHU', '移除')
        }}</i-button>
        <!-- <buttonTableSetting @click="$refs.tableListRef.openSetting()"></buttonTableSetting> -->
      </div>
      <!-- <table-list style="margin-top:20px"
                  :tableData="tableListData"
                  :tableTitle="tableTitleGp"
                  :tableLoading="tableLoading"
                  @handleSelectionChange="handleSelectionChange"
                  :index="true">
      </table-list> -->

      <iTableCustom
        ref="tableListRef"
        :data="tableListData"
        :columns="tableTitleGp"
        :loading="tableLoading"
        @handle-selection-change="handleSelectionChange"
      >
      </iTableCustom>
    </div>
  </iDialog>
</template>

<script>
import {
  gpSupplierBlackList,
  gpSupplierBlackRemove
} from '@/api/supplier360/blackList'
import { tableTitleGp } from './data'
import tableList from '@/components/commonTable'
import buttonTableSetting from '@/components/buttonTableSetting'
import iTableCustom from '@/components/iTableCustom'
import { iButton, iMessage, iMessageBox, iDialog } from 'rise'
export default {
  props: {
    clickTableList: { type: Object },
    value: {
      type: Boolean,
      default: false
    }
  },
  components: {
    iButton,
    tableList,
    iDialog,
    iTableCustom,
    buttonTableSetting
  },

  data() {
    return {
      daterange: '',
      form: {},
      processingList: [],
      tableTitleGp: tableTitleGp,
      tableListData: [],
      selectTableData: [],
      tableLoading: true
    }
  },
  created() {
    // this.$nextTick(() => {
    this.getList()
    // })
  },
  methods: {
    getList() {
      this.tableLoading = true
      const params = {
        supplierId: this.clickTableList.subSupplierId
      }
      gpSupplierBlackList(params).then((res) => {
        if (res && res.code == 200) {
          this.tableLoading = false
          this.tableListData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    //移除
    handleRemove() {
      let ids = this.selectTableData.map((x) => {
        return x.id
      })
      const params = {
        ids: ids
      }
      if (ids.length == 0) {
        this.$message({
          type: 'warning',
          message: this.language(
            'QINGXUANZEXUYAOYICHUDESHOUKONGYEWULEIXING',
            '请选择需要移除的受控业务类型！'
          )
        })
      } else {
        this.value = false
        iMessageBox(
          this.language('SHIFOUQUERENYICHUHEIMINGDAN?', '是否确认移除黑名单'),
          this.language('TIJIAO', '提交'),
          {
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消')
          }
        )
          .then(async () => {
            gpSupplierBlackRemove(params).then((res) => {
              if (res && res.code == 200) {
                iMessage.success(res.desZh)
                this.$emit('closeDiolog', 1)
              } else iMessage.error(res.desZh)
            })
          })
          .catch(() => {
            this.value = true
          })
      }
    },
    handleSelectionChange(e) {
      this.selectTableData = e
    },
    // 关闭弹窗
    closeDiolog() {
      this.$emit('closeDiolog')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding-bottom: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
