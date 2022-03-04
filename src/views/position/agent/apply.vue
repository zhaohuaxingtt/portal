<template>
  <iPage>
    <pageHeader class="margin-bottom20">
      <span>{{ this.form.id ? '编辑' : '新增' }}岗位代理</span>
    </pageHeader>

    <iCard class="margin-top20" v-loading="loading">
      <el-form label-width="80px" :model="form" :rules="rules" ref="ruleForm">
        <el-row>
          <el-col :span="6">
            <iFormItem label="代理岗位" prop="positionList">
              <div class="selected-tags-panel">
                <div class="tags">
                  <span
                    class="tag"
                    v-for="item of form.positionList"
                    :key="item.id"
                    >{{ item.fullNameZh }}
                    <span
                      class="el-icon-close btn-close"
                      @click="deletePosition(item)"
                    >
                    </span>
                  </span>
                </div>
                <iInput placeholder="" v-model="form.positionId" readonly>
                  <template slot="suffix">
                    <span @click="handleOpenChoosePositionDialog" disabled>
                      <icon symbol name="icontianjia" />
                    </span>
                  </template>
                </iInput>
              </div>
            </iFormItem>
          </el-col>
          <el-col :span="18">
            <div class="agent-date">
              <iFormItem label="代理时间" prop="startDate">
                <iDatePicker
                  v-model="form.startDate"
                  type="date"
                  :placeholder="language('请选择')"
                  :disabled="!canEdit"
                  value-format="yyyy-MM-dd"
                  :picker-options="startDateOptions"
                />
              </iFormItem>
              <iFormItem label="至" prop="endDate" label-width="35px">
                <iDatePicker
                  v-model="form.endDate"
                  type="date"
                  :placeholder="language('请选择')"
                  :picker-options="endDateOptions"
                  :disabled="!canEdit"
                  value-format="yyyy-MM-dd"
                />
              </iFormItem>
              <div class="duration" v-show="duration">
                共 <span>{{ duration }}</span> 天
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <el-form-item label="代理原因" style="width: 100%">
              <iInput
                :placeholder="language('请输入')"
                v-model="form.description"
                style="width: 100%"
                :disabled="!canEdit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right">
              <iButton @click="handleSubmit" :disabled="!canEdit">提交</iButton>
              <iButton @click="saveSubmit" :disabled="!canEdit">保存</iButton>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </iCard>

    <choosePosition
      v-if="dialogChoosePositionVisible"
      :visible="dialogChoosePositionVisible"
      :multiple="false"
      :relative="false"
      :default-choose="form.positionList"
      @success="handleChoosePositionSuccess"
      @close="dialogChoosePositionVisible = false"
    />
  </iPage>
</template>

<script>
import {
  iButton,
  iCard,
  Icon,
  iDatePicker,
  iFormItem,
  iInput,
  iPage,
  iMessage
} from 'rise'
import choosePosition from '../transfer/components/choosePosition'
import {
  applyPositionAgent,
  positionAgentDetail,
  positionAgentSave
} from '@/api/position/agent'
import pageHeader from '@/components/pageHeader'
export default {
  name: 'PositionAgentApply',
  components: {
    iCard,
    iPage,
    Icon,
    iFormItem,
    iInput,
    iButton,
    choosePosition,
    iDatePicker,
    pageHeader
  },
  data() {
    return {
      form: {
        positionId: '',
        positionName: '',
        startDate: '',
        endDate: '',
        description: '',
        durationDays: '',
        positionList: ''
      },
      canEdit: true,
      dialogChoosePositionVisible: false,
      endDateOptions: {
        disabledDate(time) {
          // 不能超过90天
          return time.getTime() > moment(new Date()).add(90, 'days').valueOf()
        }
      },
      startDateOptions: {
        disabledDate(time) {
          // 不能超过90天
          return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000
        }
      },
      loading: false,
      rules: {
        startDate: [
          {
            required: true,
            message: '开始日期不能为空',
            trigger: 'blur'
          }
        ],
        endDate: [
          {
            required: true,
            message: '结束日期不能为空',
            trigger: 'blur'
          }
        ],
        positionList: [
          {
            required: true,
            message: '代理岗位不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    duration() {
      if (this.form.startDate && this.form.endDate) {
        // const start = moment(this.form.startDate)
        // const end = moment(this.form.endDate)
        // return moment.duration(end.diff(start)).days()
        const startDate = moment(this.form.startDate).format('YYYY-MM-DD')
        const endDate = moment(this.form.endDate).format('YYYY-MM-DD')
        return moment(endDate).diff(startDate, 'day')
      }
      return 0
    }
  },
  watch: {
    'form.startDate'(val) {
      this.endDateOptions = {
        disabledDate(time) {
          const timestampNow = time.getTime()
          const timestampPlus90 = moment(val).add(90, 'days').valueOf()
          const timestampStart = moment(val).valueOf()
          // 不能超过90天
          return timestampNow > timestampPlus90 || timestampNow < timestampStart
        }
      }
    }
  },
  created() {
    let idStr = this.$route.params.id
    if (idStr && idStr == '0') {
      return
    }
    let param = { id: idStr, type: 3 }
    positionAgentDetail(param)
      .then((value) => {
        if (value.code == 200) {
          this.form = value.data
          this.canEdit = [1, 5].includes(value.data.status) //不可编辑
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    handleOpenChoosePositionDialog() {
      if (!this.canEdit) {
        return
      }
      this.dialogChoosePositionVisible = true
    },
    handleChoosePositionSuccess(items) {
      console.log('items', items)
      let newitems = items.map((value) => {
        value.status = null
        return value
      })
      Vue.set(this.form, 'positionList', newitems)
      this.dialogChoosePositionVisible = false
    },
    handleSubmit() {
      //创建
      this.addPositionAgent()
    },
    saveSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          //保存
          this.form.durationDays = this.duration
          // this.form.startDate = this.form.startDate + " 23:59:59";
          let startSuffix = ' 00:00:00'
          let suffix = ' 23:59:59'
          if (
            this.form.startDate &&
            this.form.startDate.indexOf(startSuffix) === -1
          ) {
            this.form.startDate = this.form.startDate + startSuffix
          }
          if (this.form.endDate && this.form.endDate.indexOf(suffix) === -1) {
            this.form.endDate = this.form.endDate + suffix
          }
          let param = {
            ...this.form,
            type: 3,
            sourceId: this.$store.state.permission.userInfo.positionDTO.id
          }
          if (param.positionList && param.positionList.length > 0) {
            param.positionId = param.positionList[0].positionId
          }
          positionAgentSave(param)
            .then((value) => {
              if (value.code == 200) {
                //
                iMessage.success(value.desZh || '保存成功')
                if (window.opener) {
                  setTimeout(() => {
                    window.close()
                  }, 2000)
                  window.opener.postMessage('refresh')
                } else {
                  this.$router.go(-1)
                }
              } else {
                iMessage.error('保存失败')
              }
            })
            .catch((err) => {
              console.log('err', err)
              iMessage.error(err.desZh || '')
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    addPositionAgent() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.form.durationDays = this.duration
          // this.form.startDate = this.form.startDate + " 23:59:59";
          let startSuffix = ' 00:00:00'
          let suffix = ' 23:59:59'
          if (
            this.form.startDate &&
            this.form.startDate.indexOf(startSuffix) == -1
          ) {
            this.form.startDate = this.form.startDate + startSuffix
          }
          if (this.form.endDate && this.form.endDate.indexOf(suffix) == -1) {
            this.form.endDate = this.form.endDate + suffix
          }
          let param = {
            ...this.form,
            type: 3,
            sourceId: this.$store.state.permission.userInfo.positionDTO.id
          }
          this.loading = true
          applyPositionAgent(param)
            .then((value) => {
              // console.log("====oooo", value);
              if (value.code == 200) {
                //创建成功
                iMessage.success(value.desZh || '提交成功')
                if (window.opener) {
                  setTimeout(() => {
                    window.close()
                  }, 2000)
                  window.opener.postMessage('refresh')
                } else {
                  this.$router.go(-1)
                }
              } else {
                iMessage.error(value.desZh || '提交失败')
              }
            })
            .catch((err) => {
              iMessage.error(err.desZh || '')
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    deletePosition(value) {
      if (!this.canEdit) {
        return
      }
      let index = this.form.positionList.indexOf(value)
      if (index > -1) {
        this.form.positionList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.agent-date {
  display: flex;
  align-items: center;

  .date-divider {
    margin: 0px 10px;
  }

  .duration {
    margin-left: 30px;
    margin-bottom: 20px;
    span {
      margin: 0px 20px;
    }
  }
}

.selected-tags-panel {
  position: relative;

  .tags {
    z-index: 10;
    position: absolute;
    width: calc(100% - 40px);
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;

    .tag {
      display: inline-block;
      background: #f7f7f7;
      border-radius: 30px;
      text-align: center;
      margin: 0px 5px;
      padding: 0px 10px;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
