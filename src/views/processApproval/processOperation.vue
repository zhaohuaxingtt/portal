<template>
  <iPage>
    <pageHeader>{{ language('审批流编辑') }}</pageHeader>
    <iCard class="margin-top20">
      <el-table :data="tableData" border>
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
            <span
              >{{ scope.row.approverDept }} {{ scope.row.approverName }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          :label="language('状态')"
          prop="statusName"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="language('审批时间')"
          prop="approveDate"
          align="center"
        ></el-table-column>
        <el-table-column :label="language('操作')" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.statusCode == '4'">
              <iButton
                type="text"
                class="column-btn"
                @click="openTransfer(scope.row)"
                >转派</iButton
              >
              <iButton
                type="text"
                class="column-btn"
                @click="openSkip(scope.row)"
                >Skip</iButton
              >
            </template>
          </template>
        </el-table-column>
      </el-table>
    </iCard>
    <transferDialog :visible.sync="visible" :row="row" @getData="getData" />
    <skipDialog :visible.sync="skipVisible" :row="row" @getData="getData" />
  </iPage>
</template>

<script>
import { iPage, iCard, iButton } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import pageHeader from '@/components/pageHeader'
import transferDialog from './transferDialog'
import skipDialog from './skipDialog'
import { listTaskTransfer } from '@/api/approval/monitor'
export default {
  components: {
    iPage,
    pageHeader,
    iCard,
    iTableCustom,
    iButton,
    transferDialog,
    skipDialog
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      row: {},
      visible: false,
      skipVisible: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let params = {
        processInstanceId: this.$route.query.processInstanceId,
        businessId: this.$route.query.businessId
      }
      listTaskTransfer(params).then((res) => {
        if (res?.data) {
          this.tableData = res.data
        }
      })
    },
    openTransfer(row) {
      this.row = row
      this.visible = true
    },
    openSkip(row) {
      this.row = row
      this.skipVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.column-btn {
  padding: 0;
}
</style>