<template>
  <div>
    <pageHeader class="margin-bottom20"> {{language('轮岗明细')}} </pageHeader>

    <iCard class="margin-top20" v-loading="loading">
      <el-form label-width="80px" :model="form" :rules="rules" ref="ruleForm">
        <el-row>
          <el-col :span="6">
            <iFormItem :label="language('申请人')">
              <div class="selected-tags-panel">
                <!-- <div class="tags" style="text-align: center">
                  <span>
                    {{ $store.state.permission.userInfo.nameZh }}
                  </span>
                </div> -->
                <iInput v-model="form.applyUserName" disabled>
                  <!-- <template slot="suffix">
                    <span @click="handleOpenChoosePositionDialog">
                      <icon symbol name="icontianjia" />
                    </span>
                  </template> -->
                </iInput>
              </div>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('原有岗位')" prop="sourceId">
              <i-select
                v-model="form.sourceName"
                @change="selectPosition"
                disabled
              >
                <el-option
                  v-for="item in myPositionList"
                  :key="item.fullNameZh"
                  :label="item.fullNameZh"
                  :value="item.id"
                >
                </el-option>
              </i-select>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('目标岗位')" prop="positionList">
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
                <iInput
                  :placeholder="language('请选择')"
                  v-model="form.positionId"
                  disabled
                >
                  <template slot="suffix">
                    <span @click="handleOpenChoosePositionDialog">
                      <icon symbol name="icontianjia" />
                    </span>
                  </template>
                </iInput>
              </div>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('交接时间')" prop="durationDays">
              <div class="agent-date">
                <iInput
                  v-Int
                  v-model="form.durationDays"
                  :placeholder="language('请输入')"
                  :disabled="!canEdit"
                />
                <span class="date-divider">{{language('天')}}</span>
              </div>
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>
    </iCard>
  </div>
</template>

<script>
import { iCard, Icon, iFormItem, iInput, iSelect, iMessage } from 'rise'

import pageHeader from '@/components/pageHeader'
import {
  positionAgentDetail,
  transferPositionApply,
  positionAgentSave
} from '@/api/position/agent'
export default {
  name: 'PositionAgentApply',
  components: {
    iCard,
    Icon,
    iFormItem,
    iInput,
    iSelect,
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
        sourceId: '',
        sourceName: '',
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
      rules: {
        durationDays: [
          {
            required: true,
            message: this.language('交接时间不能为空'),
            trigger: 'blur'
          }
        ],
        sourceId: [
          {
            required: true,
            message: this.language('原有岗位不能为空'),
            trigger: 'blur'
          }
        ],
        positionList: [
          {
            required: true,
            message: this.language('目标岗位不能为空'),
            trigger: 'blur'
          }
        ]
      },
      loading: false
    }
  },
  computed: {
    duration() {
      if (this.form.startDate && this.form.endDate) {
        const start = moment(this.form.startDate)
        const end = moment(this.form.endDate)
        return moment.duration(end.diff(start)).days()
      }
      return 0
    },
    myPositionList() {
      let list = this.$store.state.permission.userInfo.positionList
      if (list) {
        return list
      }
      return []
    }
  },
  watch: {
    'form.startDate'(val) {
      this.endDateOptions = {
        disabledDate(time) {
          // 不能超过90天
          return time.getTime() > moment(val).add(90, 'days').valueOf()
        }
      }
    }
  },
  created() {
    let idStr = this.$route.params.id
    if (idStr && idStr == '0') {
      return
    }
    let param = { id: idStr, type: 2 }
    positionAgentDetail(param)
      .then((value) => {
        if (value.code == 200) {
          this.form = value.data
          this.canEdit = value.data.status == 1 //不可编辑
        }
      })
      .catch((err) => {
        console.log('err', err)
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
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let param = {
            ...this.form,
            type: 2
          }
          this.loading = true
          transferPositionApply(param)
            .then((value) => {
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
                iMessage.error('提交失败')
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
    saveSubmit() {
      //保存
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let param = {
            ...this.form,
            type: 2
          }
          this.loading = true
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
    deletePosition(value) {
      if (!this.canEdit) {
        return
      }
      let index = this.form.positionList.indexOf(value)
      if (index > -1) {
        this.form.positionList.splice(index, 1)
      }
    },
    selectPosition(value) {
      console.log('Source==', value)
      let positions = this.myPositionList.filter((val) => {
        return val.id == value
      })
      this.form.sourceName = positions[0].fullNameZh
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
