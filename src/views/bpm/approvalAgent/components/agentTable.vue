<template>
  <div class="agent-table">
    <div class="flex-end-center margin-bottom20">
      <iButton @click="$emit('add')">
        {{ language('新增') }}
      </iButton>
      <iButton @click="$emit('remove', selectedRows)">
        {{ language('删除') }}
      </iButton>
      <iButton @click="$emit('save')">
        {{ language('保存') }}
      </iButton>
      <iButton @click="$router.go(-1)">
        {{ language('返回') }}
      </iButton>
    </div>

    <el-table
      :data="data"
      :stripe="false"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="language('授权人')" align="center" width="220">
        <template slot-scope="scope">
          <userSearch
            v-model="scope.row.assignee"
            :default-options="userDefaultOptions"
            :disabled="!isAdminUser"
          />
        </template>
      </el-table-column>
      <el-table-column :label="language('代理内容')" align="center">
        <template slot-scope="scope">
          <iSelect
            :placeholder="language('请选择')"
            v-model="scope.row.category"
          >
            <el-option
              v-for="item in templateOptions(scope.row)"
              :key="item.category"
              :value="item.category"
              :label="item.modelName"
            />
          </iSelect>
        </template>
      </el-table-column>
      <el-table-column :label="language('代理人')" align="center" width="220">
        <template slot-scope="scope">
          <userSearch
            v-model="scope.row.attorney"
            :filter-user-id="scope.row.assignee"
          />
        </template>
      </el-table-column>
      <el-table-column :label="language('代理时间')" align="center">
        <template slot-scope="scope">
          <div class="agent-date">
            <iDatePicker
              type="date"
              v-model="scope.row.startTime"
              :placeholder="language('请选择')"
              :picker-options="startTimePickerOptions"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="(val) => startTimeChange(val, scope.row)"
            />
            <span class="date-divider">至</span>
            <iDatePicker
              v-model="scope.row.endTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :placeholder="language('请选择')"
              :picker-options="scope.row.endTimeOptions"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <chooseStaff v-if="visible" :visible="visible" />
  </div>
</template>

<script>
import { iSelect, iDatePicker, iButton } from 'rise'
import { userSelect } from '@/components/remoteSelect'

export default {
  name: 'agentTable',
  components: { iSelect, iDatePicker, iButton, userSearch: userSelect },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    approvalTodos: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    isAdminUser() {
      return this.$store.state.permission.userInfo.id === 1
    },
    selectedTodos() {
      return this.data.map((e) => {
        return e.taskId
      })
    },
    userDefaultOptions() {
      return [
        {
          id: this.$store.state.permission.userInfo.id,
          nameZh: this.$store.state.permission.userInfo.nameZh
        }
      ]
    }
  },
  data() {
    return {
      visible: false,
      selectedRows: [],
      startTimePickerOptions: {
        disabledDate(time) {
          return (
            moment(time).format('YYYY-MM-DD') <
            moment(new Date()).format('YYYY-MM-DD')
          )
        }
      },
      endTemePickOptions: []
    }
  },
  methods: {
    startTimeChange(val, row) {
      row.endTimeOptions = {
        disabledDate(time) {
          return (
            moment(time).format('YYYY-MM-DD') < moment(val).format('YYYY-MM-DD')
          )
        }
      }
    },
    handleSelectionChange(rows) {
      this.selectedRows = rows
    },
    templateOptions(item) {
      return this.approvalTodos.filter(
        (e) =>
          !this.selectedTodos.includes(e.taskId) || e.taskId === item.taskId
      )
    },
    handleSelectAgentUser(item, row) {
      row.attorney = item.id
    }
    /* handleTaskIdChange(taskId, row) {
      const approvalTodoItem = this.approvalTodos.filter(
        e => e.taskId === taskId
      )
      if (approvalTodoItem && approvalTodoItem.length > 0) {
        row.processId = approvalTodoItem[0].instanceId
      }
    } */
  }
}
</script>

<style lang="scss" scoped>
.agent-table {
  ::v-deep .el-table .el-table__row .el-input {
    width: 100% !important;
  }
  ::v-deep .el-table .el-table__row .el-autocomplete {
    width: 100% !important;
  }
  ::v-deep .el-table .el-table__row .el-select {
    width: 100% !important;
  }
  ::v-deep .el-input__suffix {
    display: flex;
    align-items: center;
  }
}

.defatil-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.agent-date {
  display: flex;
  align-items: center;
  .date-divider {
    margin: 0px 10px;
  }
  .duration {
    margin-left: 30px;
    span {
      margin: 0px 20px;
    }
  }
}
</style>
