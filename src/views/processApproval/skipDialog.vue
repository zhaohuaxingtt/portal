<template>
  <iDialog
    :visible.sync="visible"
    width="50%"
    :show-close="false"
    :before-close="close"
    title="Skip审批节点"
  >
    <p class="margin-bottom10 title">请确认是否跳过以下审批节点：</p>
    <el-table :data="[row]" border>
      <el-table-column
        type="index"
        label="#"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="language('审批节点')"
        prop="taskNodeName"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="language('审批人')"
        prop="approverName"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.approverDept }} {{ scope.row.approverName }}</span>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确认</el-button>
      <el-button @click="close">取消</el-button>
    </span>
  </iDialog>
</template>

<script>
import {
  iDialog,
  iSearch,
  iInput,
  iSelect,
  iCard,
  iButton,
  iMessage
} from 'rise'
import { skipTask } from '@/api/approval/monitor'
export default {
  components: {
    iDialog,
    iSearch,
    iInput,
    iSelect,
    iCard,
    iButton
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    // 关闭弹窗
    close() {
      this.$emit('update:visible', false)
    },
    // 确认修改
    confirm() {
      skipTask(this.row.taskNodeId).then((res) => {
        if (res?.data) {
          this.$emit('getData')
          this.close()
        } else {
          iMessage.error(res?.desZh || '操作失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
}
.column-btn {
  padding: 0;
}
</style>
