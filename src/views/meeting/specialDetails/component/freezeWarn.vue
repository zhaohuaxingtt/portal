<template>
  <!--转派-->
  <iDialog
    :title="$t('提示')"
    :visible.sync="openFreezeDialog"
    width="45rem"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <span>
      <img src="@/assets/images/icon/warning.svg" class="img-icon"
    /></span>
    <span>有定点议题未冻结RS单，请确认是否关闭会议?</span>
    <iTableML :data="warnTableData" class="table-content">
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="#"
        width="40"
      >
        <template slot-scope="scope">
          <span style="span-index">{{ scope.row.itemNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Present Item"
        min-width="75"
      >
        <template slot-scope="scope">
          {{ scope.row.topic }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Sourcing"
        min-width="75"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isBreak ? '-' : scope.row.supporter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Linie"
        min-width="75"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isBreak ? '-' : scope.row.presenter }}</span>
        </template>
      </el-table-column>
    </iTableML>
    <div class="button-area">
      <iButton @click="clearDiolog">否</iButton>
      <iButton @click="handleYes">是</iButton>
    </div>
  </iDialog>
</template>
<script>
import { iDialog, iButton } from 'rise'
import iTableML from '@/components/iTableML'
export default {
  props: {
    openFreezeDialog: {
      type: Boolean,
      default: false
    },
    warnTableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    iDialog,
    iTableML,
    iButton
  },
  mounted() {
    console.log('warnTableData', this.warnTableData)
  },
  methods: {
    handleYes() {
      this.$emit('stillYesCloseDialog')
    },
    clearDiolog() {
      this.$emit('closeDialog')
    },
    handleCancel() {
      this.clearDiolog()
    }
  }
}
</script>
<style lang="scss" scoped>
.img-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
  transform: translateY(2px);
}
.table-content {
  margin-top: 30px;
}
.button-area {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding-bottom: 20px;
}
</style>
