<template>
  <iDialog
    :title="$t('MT_WEIHUJIELUN')"
    :visible.sync="open"
    width="54.875rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <iEditForm>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
        class="form-box"
      >
        <iFormItem prop="conclusionCsc">
          <div class="operate">
            <div class="operate-title">
              <span class="conclusion">{{ $t('MT_JIELUN') }}</span>
              <span class="required-icon">*</span>
            </div>
            <iSelect
              v-model="ruleForm.conclusion"
              :placeholder="$t('MT_JIELUN')"
              @change="changeConclusion($event)"
              class="operate-select"
              value-key="conclusionCsc"
              :disabled="isOther"
            >
              <el-option
                :value="item"
                :label="$t(item.i18n)"
                v-for="(item, index) of themenConclusionArrObj"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
        </iFormItem>
        <iFormItem prop="conclusionCsc" v-show="isShowTable">
          <div class="next-meeting">
            <div class="operate-title">
              <span class="conclusion">{{ $t('MT_XIACIHUIYI') }}</span>
              <span class="required-icon">*</span>
            </div>
            <iTableML
              tooltip-effect="light"
              :data="tableListData"
              :border="true"
              @selectionChange="handleSelectionChange"
              :currentRow="currentRow"
              :isSingle="true"
            >
              <el-table-column
                align="center"
                label=""
                width="57"
                type="selection"
              >
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="left"
                :label="$t('MT_HUIYIMINGCHENG')"
                prop="name"
              >
              </el-table-column>
            </iTableML>
          </div>
        </iFormItem>
        <iFormItem
          prop="isFrozenRs"
          v-show="ruleForm.conclusion.conclusionCsc === '02'"
        >
          <div class="switch-content">
            <div class="freeze">{{ $t('MT_DONGJIERSDAN') }}</div>
            <div class="swicth">
              <div class="text" v-if="ruleForm.isFrozenRs" ref="sliderText">
                {{ $t('MT_SHI') }}
              </div>
              <div class="text" v-else ref="sliderText">{{ $t('MT_FOU') }}</div>
              <div class="circle" @click="handleSwitch" ref="slider"></div>
            </div>
          </div>
        </iFormItem>
        <iFormItem
          :label="$t('MT_RENWU')"
          prop="taskCsc"
          :hideRequiredAsterisk="true"
          class="task"
        >
          <iLabel
            :label="$t('MT_RENWU')"
            slot="label"
            class="task-title"
          ></iLabel>
          <iInput
            type="textarea"
            v-model="ruleForm.taskCsc"
            class="task-input"
            :placeholder="$t('MT_QINGSHURURENWU')"
          ></iInput>
        </iFormItem>
      </el-form>
    </iEditForm>
    <div class="button-list">
      <iButton class="sure" @click="handleSure" :loading="loading">{{
        $t('MT_QUEDING')
      }}</iButton>
      <iButton class="cancel" @click="handleCancel">{{
        $t('MT_QUXIAO')
      }}</iButton>
    </div>
  </iDialog>
</template>
<script>
import iEditForm from '@/components/iEditForm'
import iTableML from '@/components/iTableML'
import {
  iDialog,
  iFormItem,
  iSelect,
  iLabel,
  iInput,
  iButton,
  iMessage
} from 'rise'
import { themenConclusionArrObj, themenConclusion } from './data'
import { getMettingList } from '@/api/meeting/home'
import { updateThemen } from '@/api/meeting/details'
import dayjs from 'dayjs'

export default {
  components: {
    iDialog,
    iFormItem,
    iEditForm,
    iSelect,
    iLabel,
    iInput,
    iButton,
    iTableML
  },
  props: {
    autoOpenProtectConclusionObj: {
      type: Object,
      default: () => {
        return ''
      }
    },
    selectedTableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    open: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    meetingInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isOther: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    beforeResult: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    if (this.autoOpenProtectConclusionObj) {
      return {
        loading: false,
        themenConclusion,
        curChooseArr: [],
        isShowSwitch:
          this.autoOpenProtectConclusionObj.conclusionCsc === '02'
            ? this.autoOpenProtectConclusionObj.isFrozenRs
            : false,
        isShowTable:
          this.autoOpenProtectConclusionObj.conclusionCsc === '05' ||
          this.autoOpenProtectConclusionObj.conclusionCsc === '06'
            ? true
            : false,
        themenConclusionArrObj,
        tableListData: [],
        ruleForm: {
          conclusion: {
            conclusionCsc: this.autoOpenProtectConclusionObj.conclusionCsc
              ? this.autoOpenProtectConclusionObj.conclusionCsc
              : '01',
            conclusionName:
              themenConclusion[
                this.autoOpenProtectConclusionObj.conclusionCsc
                  ? this.autoOpenProtectConclusionObj.conclusionCsc
                  : '01'
              ]
          },
          taskCsc: this.autoOpenProtectConclusionObj.conclusion
            ? this.autoOpenProtectConclusionObj.conclusion
            : '',
          isFrozenRs:
            this.autoOpenProtectConclusionObj.type === 'MTZ'
              ? false
              : this.beforeResult === '02'
              ? this.autoOpenProtectConclusionObj.isFrozenRs
              : true
        },
        currentRow: {}
      }
    } else {
      return {
        loading: false,
        themenConclusion,
        curChooseArr: [],
        isShowSwitch:
          this.selectedTableData[0].conclusionCsc === '02'
            ? this.selectedTableData[0].isFrozenRs
            : false,
        isShowTable:
          this.selectedTableData[0].conclusionCsc === '05' ||
          this.selectedTableData[0].conclusionCsc === '06'
            ? true
            : false,
        themenConclusionArrObj,
        tableListData: [],
        ruleForm: {
          conclusion: {
            conclusionCsc: this.selectedTableData[0].conclusionCsc
              ? this.selectedTableData[0].conclusionCsc
              : '01',
            conclusionName:
              themenConclusion[
                this.selectedTableData[0].conclusionCsc
                  ? this.selectedTableData[0].conclusionCsc
                  : '01'
              ]
          },
          taskCsc: this.selectedTableData[0].conclusion
            ? this.selectedTableData[0].conclusion
            : '',
          isFrozenRs:
            this.selectedTableData[0].type === 'MTZ'
              ? false
              : this.beforeResult === '02'
              ? this.selectedTableData[0].isFrozenRs
              : true
        },
        currentRow: {}
      }
    }
  },
  mounted() {
    const curObj = this.autoOpenProtectConclusionObj
      ? this.autoOpenProtectConclusionObj
      : this.selectedTableData[0]
    // if (this.meetingInfo.meetingTypeName === 'CSC') {
    if (this.meetingInfo.isCSC) {
      this.themenConclusionArrObj = [
        {
          conclusionCsc: '05',
          conclusionName: '下次Pre CSC',
          i18n: 'MT_XIACIPRE'
        },
        {
          conclusionCsc: '02',
          conclusionName: '定点',
          i18n: 'MT_DINGDIAN'
        },
        {
          conclusionCsc: '03',
          conclusionName: '发LOI',
          i18n: 'MT_FALOI'
        },
        {
          conclusionCsc: '04',
          conclusionName: '转TER/TOP-TER',
          i18n: 'MT_ZHUANTER'
        },
        {
          conclusionCsc: '01',
          conclusionName: '待定',
          i18n: 'MT_DAIDING'
        },
        {
          conclusionCsc: '07',
          conclusionName: '关闭',
          i18n: 'MT_GUANBI'
        }
      ]
    }
    // if (
    //   // this.meetingInfo.meetingTypeName === 'Pre CSC' &&
    //   this.meetingInfo.isPreCSC &&
    //   curObj.type === 'MANUAL'
    // ) {
    //   this.themenConclusionArrObj = [
    //     {
    //       conclusionCsc: '01',
    //       conclusionName: '待定'
    //     },
    //     {
    //       conclusionCsc: '05',
    //       conclusionName: '下次Pre CSC'
    //     },
    //     {
    //       conclusionCsc: '06',
    //       conclusionName: '转CSC'
    //     },
    //     {
    //       conclusionCsc: '07',
    //       conclusionName: '关闭'
    //     }
    //   ]
    // }
    if (
      // this.meetingInfo.meetingTypeName === 'CSC' &&
      this.meetingInfo.isCSC &&
      curObj.type === 'MANUAL'
    ) {
      this.themenConclusionArrObj = [
        // {
        //   conclusionCsc: '01',
        //   conclusionName: '待定'
        // },
        // {
        //   conclusionCsc: '05',
        //   conclusionName: '下次Pre CSC'
        // },
        // {
        //   conclusionCsc: '06',
        //   conclusionName: '转CSC'
        // },
        // {
        //   conclusionCsc: '07',
        //   conclusionName: '关闭'
        // }
        {
          conclusionCsc: '05',
          conclusionName: '下次Pre CSC',
          i18n: 'MT_XIACIPRE'
        },
        {
          conclusionCsc: '02',
          conclusionName: '定点',
          i18n: 'MT_DINGDIAN'
        },
        {
          conclusionCsc: '03',
          conclusionName: '发LOI',
          i18n: 'MT_FALOI'
        },
        {
          conclusionCsc: '04',
          conclusionName: '转TER/TOP-TER',
          i18n: 'MT_ZHUANTER'
        },
        {
          conclusionCsc: '01',
          conclusionName: '待定',
          i18n: 'MT_DAIDING'
        },
        {
          conclusionCsc: '07',
          conclusionName: '关闭',
          i18n: 'MT_GUANBI'
        }
      ]
    }
    if (curObj.conclusionCsc === '05') {
      this.getUpdateDateTableList('Pre CSC', 'init')
    }
    if (curObj.conclusionCsc === '06') {
      this.getUpdateDateTableList('CSC', 'init')
    }
    if (curObj.fixedPointApplyType == 20) {
      this.themenConclusionArrObj = this.themenConclusionArrObj.filter(
        (item) => {
          return item.conclusionCsc !== '03' && item.conclusionCsc !== '04'
        }
      )
    }
    // this.$nextTick(() => {
    //   this.$refs.tableRef.setCurrentRow(this.currentRow)
    // })
  },
  watch: {
    'ruleForm.isFrozenRs': {
      handler(bol) {
        if (!bol) {
          this.$nextTick(() => {
            this.$refs['slider'].style.transform = 'translate(-1.25rem,-50%)'
            this.$refs['slider'].parentNode.style.backgroundColor = '#ccc'
            this.$refs['slider'].style.transition = '0.2s'
            this.$nextTick(() => {
              this.$refs['sliderText'].style.transition = '0.2s'
              this.$refs['sliderText'].style.transform = 'translate(1.25rem,0)'
            })
          })
        } else {
          this.$nextTick(() => {
            this.$refs['slider'].style.transform = 'translateY(-50%)'
            this.$refs['slider'].parentNode.style.backgroundColor = '#1663f6'
            this.$refs['slider'].style.transition = '0.2s'
            this.$nextTick(() => {
              this.$refs['sliderText'].style.transition = '0.2s'
              this.$refs['sliderText'].style.transform = 'translate(0.5rem,0)'
            })
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.curChooseArr = [...val]
      this.currentRow = val[val.length - 1]
    },
    handleSure() {
      const curObj = this.autoOpenProtectConclusionObj
        ? this.autoOpenProtectConclusionObj
        : this.selectedTableData[0]
      let param = {
        ...curObj
      }
      if (
        this.ruleForm.conclusion.conclusionCsc === '05' ||
        this.ruleForm.conclusion.conclusionCsc === '06'
      ) {
        if (this.curChooseArr.length === 0) {
          iMessage.error(this.$t('MT_QINGXUANZEYIGEXIACIHUIYI'))
          return
        }
        if (this.curChooseArr.length > 1) {
          iMessage.error(this.$t('MT_XIACIHUIYIZHINENGXUANZEYIGE'))
          return
        }
        param.toDoMeeting = this.curChooseArr[0].id
        param.conclusion = this.ruleForm.taskCsc
        param.conclusionCsc = this.ruleForm.conclusion.conclusionCsc
        param.isFrozenRs = false
        param.toDoMeetingName = this.curChooseArr[0].name
      } else if (this.ruleForm.conclusion.conclusionCsc === '02') {
        param.toDoMeetingName = ''
        param.toDoMeeting = ''
        param.conclusion = this.ruleForm.taskCsc
        param.conclusionCsc = this.ruleForm.conclusion.conclusionCsc
        param.isFrozenRs = this.ruleForm.isFrozenRs
      } else {
        param.toDoMeetingName = ''
        param.toDoMeeting = ''
        param.conclusion = this.ruleForm.taskCsc
        param.conclusionCsc = this.ruleForm.conclusion.conclusionCsc
        param.isFrozenRs = false
      }
      this.loading = true
      updateThemen(param).then((res) => {
        if (res.code === 200) {
          iMessage.success(this.$t('MT_WEIHUCHENGGONG'))
        }
        this.loading = false
        this.close()
      })
    },
    handleCancel() {
      this.close()
    },
    changeConclusion(e) {
      const curObj = this.autoOpenProtectConclusionObj
        ? this.autoOpenProtectConclusionObj
        : this.selectedTableData[0]
      this.isShowTable = false
      this.isShowSwitch = false
      if (e.conclusionCsc === '02') {
        this.isShowSwitch = true
        this.ruleForm.isFrozenRs = curObj.type === 'MTZ' ? false : true
      }
      if (e.conclusionCsc === '05' || e.conclusionCsc === '06') {
        this.isShowTable = true
        if (e.conclusionCsc === '05') {
          this.getUpdateDateTableList('Pre CSC').then(() => {
            this.currentRow = {}
          })
        } else {
          this.getUpdateDateTableList('CSC').then(() => {
            this.currentRow = {}
          })
        }
      }
    },
    //获取日期改期的更新的表格数据
    async getUpdateDateTableList(str, str2) {
      const curObj = this.autoOpenProtectConclusionObj
        ? this.autoOpenProtectConclusionObj
        : this.selectedTableData[0]
      let param = {
        pageNum: 1,
        pageSize: 10,
        states: ['02', '03'],
        meetingId: this.meetingInfo.id,
        themenId: curObj.id,
        startDateBegin: dayjs(new Date()).format('YYYY-MM-DD'),
        meetingTypeNames: [str]
      }
      await this.queryMettingList(param, str2).then(() => {
        this.currentRow = {}
      })
    },
    //会议改期调取会议大厅列表
    async queryMettingList(e, str2) {
      const curObj = this.autoOpenProtectConclusionObj
        ? this.autoOpenProtectConclusionObj
        : this.selectedTableData[0]
      const res = await getMettingList(e)
      this.tableListData = res.data
      if (str2 === 'init') {
        this.currentRow = this.tableListData.find((item) => {
          return item.id === curObj.toDoMeeting
        })
      }
    },
    close() {
      this.$emit('closeDialog', false)
      this.$emit('flushTable')
    },
    handleSwitch() {
      const curObj = this.autoOpenProtectConclusionObj
        ? this.autoOpenProtectConclusionObj
        : this.selectedTableData[0]
      if (curObj.type === 'MTZ') {
        return
      }
      this.ruleForm.isFrozenRs = !this.ruleForm.isFrozenRs
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-table__header {
  background-color: #fff;
  .el-table-column--selection {
    .el-checkbox__inner {
      display: none;
    }
  }
  .cell {
    color: #333333;
    font-size: 14px;
    font-weight: 400;
  }
}
.button-list {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 65px;
  .sure {
    width: 100px;
  }
  .cancel {
    margin-left: 30px;
    width: 100px;
  }
}
.switch-content {
  display: flex;
  align-items: center;
  height: 22px;
  .freeze {
    width: 84px;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    white-space: nowrap;
  }
  .swicth {
    position: relative;
    width: 42px;
    height: 22px;
    background-color: #1663f6;
    border-radius: 11px;
    .text {
      width: 12px;
      height: 22px;
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;
      line-height: 22px;
      transform: translateX(8px);
    }
    .circle {
      cursor: pointer;
      top: 50%;
      right: 1px;
      transform: translateY(-50%);
      position: absolute;
      height: 20px;
      width: 20px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}
.operate {
  display: flex;
  height: 35px;
  align-items: center;
  .operate-select {
    height: 35px;
    width: 240px;
  }
  .conclusion {
    width: 32px;
    height: 35px;
    font-size: 16px;
    font-weight: 400;
    line-height: 35px;
  }
  .required-icon {
    /* position: absolute; */
    margin-left: 4px;
    margin-right: 35px;
    color: red;
    /* top: 50%; */
    /* transform: translate(-10px, -50%); */
  }
}
.next-meeting {
  .operate-select {
    height: 35px;
    width: 240px;
  }
  .operate-title {
    margin-bottom: 10px;
  }
  .conclusion {
    width: 32px;
    height: 28px;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
  }
  .required-icon {
    /* position: absolute; */
    margin-left: 4px;
    margin-right: 35px;
    color: red;
    /* top: 50%; */
    /* transform: translate(-10px, -50%); */
  }
}
::v-deep .task-input {
  width: 798px;
  height: 170px;
  border-radius: 4px;
  border: dashed 1px #e4e7ee;
  background: #ffffff;
  .el-textarea__inner {
    resize: none !important;
    width: 100%;
    height: 100%;
  }
}
.task-title {
  width: 32px;
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  white-space: nowrap;
  color: #4d4f5c;
}
</style>
