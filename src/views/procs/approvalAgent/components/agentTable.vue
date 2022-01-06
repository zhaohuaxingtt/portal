<template>
  <div class="agent-table">
    <div class="flex-end-center margin-bottom20">
      <iButton @click="$emit('add')">
        {{ language('新增') }}
      </iButton>
      <iButton @click="$emit('remove', selectedRows)">
        {{ language('删除') }}
      </iButton>
      <iButton @click="save">
        {{ language('保存') }}
      </iButton>
      <iButton @click="$router.go(-1)">
        {{ language('返回') }}
      </iButton>
    </div>
    <el-form
      ref="ruleForm"
      label-width="0px"
      class="edit-form"
      :rules="rules"
      :model="ruleData"
    >
      <el-table
        :data="ruleData.data"
        :stripe="false"
        @selection-change="handleSelectionChange"
        class="full-table-form"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column :label="language('授权人')" align="center" width="220">
          <template slot-scope="scope">
            <el-form-item
              label=""
              :prop="'data.' + scope.$index + '.assignee'"
              :rules="rules.assignee"
            >
              <userSearch
                v-model="scope.row.assignee"
                :default-options="userDefaultOptions"
                :disabled="!isAdminUser"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label="language('代理内容')" align="center">
          <template slot-scope="scope">
            <el-form-item
              label=""
              :prop="'data.' + scope.$index + '.category'"
              :rules="rules.category"
            >
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
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label="language('代理人')" align="center" width="220">
          <template slot-scope="scope">
            <el-form-item
              label=""
              :prop="'data.' + scope.$index + '.attorney'"
              :rules="rules.attorney"
            >
              <userSearch
                v-model="scope.row.attorney"
                :filter-user-id="scope.row.assignee"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label="language('代理时间')" align="center">
          <template slot-scope="scope">
            <div class="agent-date">
              <el-form-item
                label=""
                :prop="'data.' + scope.$index + '.startTime'"
                :rules="rules.startTime"
              >
                <iDatePicker
                  type="date"
                  v-model="scope.row.startTime"
                  :placeholder="language('请选择')"
                  :picker-options="startTimePickerOptions"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="(val) => startTimeChange(val, scope.row)"
                />
              </el-form-item>
              <span class="date-divider">至</span>
              <el-form-item
                label=""
                :prop="'data.' + scope.$index + '.endTime'"
                :rules="rules.endTime"
              >
                <iDatePicker
                  v-model="scope.row.endTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :placeholder="language('请选择')"
                  :picker-options="scope.row.endTimeOptions"
                />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
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
    },
    ruleData() {
      return {
        data: this.data
      }
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
      endTemePickOptions: [],
      rules: {
        assignee: [
          {
            required: true,
            message: '请选择授权人',
            trigger: 'blur'
          }
        ],
        category: [
          {
            required: true,
            message: '请选择代理内容',
            trigger: 'blur'
          }
        ],
        attorney: [
          {
            required: true,
            message: '请选择代理人',
            trigger: 'blur'
          }
        ],
        startTime: [
          {
            required: true,
            message: '请选择代理开始时间',
            trigger: 'blur'
          }
        ],
        endTime: [
          {
            required: true,
            message: '请选择授代理结束时间',
            trigger: 'blur'
          }
        ]
      }
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
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('save')
        }
      })
    }
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
