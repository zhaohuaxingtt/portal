<template>
  <!--转派-->
  <iDialog
    :title="$t('MT_HUIYIJIYAO')"
    :visible.sync="open"
    width="50rem"
    :close-on-click-modal="false"
    @close="handleCancel"
  >
    <iEditForm>
      <el-form
        :model="resultData"
        :rules="rules"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
        class="new-summary"
      >
        <el-row class="form-row">
          <iFormItem class="meet-desc">
            <iLabel :label="resultData.name" slot="label" required></iLabel>
            <iSelect v-model="resultData.attendeeGroupName" :disabled="true">
              <el-option
                v-for="(item, index) in [
                  {
                    value: resultData.attendeeGroupName,
                    label: resultData.attendeeGroupName
                  }
                ]"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </iFormItem>
          <iFormItem prop="attendees" class="meet-desc">
            <iInput
              v-model="resultData.attendees"
              type="textarea"
              resize="none"
              rows="4"
            />
          </iFormItem>
        </el-row>
        <div>
          <p class="agenda-box-title">
            <span>Agenda items</span>
            <span
              >(Please click the following tittle which will lead to the detail
              content.)</span
            >
          </p>
          <ul class="agenda-item-box">
            <li
              v-for="(item, index) in resultData.themens"
              :key="item.id"
              :class="[
                choosedIndex == index + 1 ? 'active-agenda-item' : '',
                'agenda-item'
              ]"
            >
              <div class="agenda-item-title" @click="chooseItem(index + 1)">
                <div class="title-left">
                  <div class="title-index">{{ index + 1 }}</div>
                  <div class="title-name">{{ item.topic }}</div>
                </div>
                <div class="up-arrow" @click="taskUserResult(item)">
                  <img :src="upArrow" alt="" srcset="" />
                </div>
              </div>
              <div class="agenda-item-content">
                <p class="task">Task</p>
                <div class="task-title">
                  <div>
                    {{}}：<span>{{
                      taskDeptResult(item, 'supporterDept', 'presenterDept')
                    }}</span>
                  </div>
                  <div>{{ employeeStr }}</div>
                </div>
                <iFormItem prop="conclusion" class="meet-desc">
                  <iInput
                    v-model="item.conclusion"
                    type="textarea"
                    resize="none"
                    rows="4"
                  />
                </iFormItem>
                <p class="task">
                  Result：{{$t(
                    item.conclusionCsc === '01'
                      ? conclusionCscList[item.conclusionCsc]
                      : item.conclusionCsc === '02'
                      ? conclusionCscList[item.conclusionCsc]
                      : item.conclusionCsc === '07'
                      ? conclusionCscList[item.conclusionCsc]
                      : '')
                  }}
                </p>
                <iFormItem class="meet-desc">
                  <el-table
                    v-if="item.conclusionCsc === '02'"
                    :data="tableData"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="date"
                      align="center"
                      label="零件名/Partname"
                      :render-header="renderHeader"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      align="center"
                      label="车型/Carline"
                      :render-header="renderHeader"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      align="center"
                      label="零件号/PartNo."
                      :render-header="renderHeader"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      align="center"
                      label="定点供应商/NomlSupplier"
                      :render-header="renderHeader"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      align="center"
                      label="份额/Share"
                      :render-header="renderHeader"
                    >
                    </el-table-column>
                  </el-table>
                  <div v-if="item.conclusionCsc === '03'">
                    <p>对于车型，发 LOI 给</p>
                    <p>For carline send LOI to</p>
                  </div>
                  <div v-if="item.conclusionCsc === '04'">
                    <p>转 TER/TOP TER</p>
                    <p>Present in TER/TOP TER</p>
                  </div>
                  <div v-if="item.conclusionCsc === '05'">
                    <p>在 {{ toDoMeetingName(item) }} 周预备会上展示</p>
                    <p>Present in {{ toDoMeetingName(item) }} SVW Pre CSC</p>
                  </div>
                  <div v-if="item.conclusionCsc === '06'">
                    <p>在 {{ toDoMeetingName(item) }} 周正式会上展示</p>
                    <p>Present in {{ toDoMeetingName(item) }} SVW CSC</p>
                  </div>
                  <div v-if="item.conclusionCsc === '07'">
                    <p>议题关闭</p>
                    <p>The items are closed</p>
                  </div>
                </iFormItem>
              </div>
            </li>
          </ul>
        </div>
        <div class="button-list">
          <el-form-item>
            <iButton @click="handleCancel" plain class="cancel">{{
              $t('LK_QUXIAO')
            }}</iButton>
            <iButton @click="handleOK" plain>{{ 'MT_CHUANGJIAN' }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import {
  iDialog,
  iInput,
  iFormItem,
  iLabel,
  iButton,
  iSelect,
  iMessage
} from 'rise'
import { numToLetter } from './data'
import iEditForm from '@/components/iEditForm'
import { getMeetingSummary, saveMeetingMinutes } from '@/api/meeting/home'
import upArrow from '@/assets/images/up-arrow.svg'
import { getReceiverById } from '@/api/meeting/type'
export default {
  components: {
    iDialog,
    iSelect,
    iFormItem,
    iInput,
    iLabel,
    iButton,
    iEditForm
  },
  props: {
    loading: { type: Boolean, default: false },
    open: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    id: {
      type: Number || String,
      default: () => {
        return ''
      }
    },
    receiverId: {
      type: Number || String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      numToLetter,
      upArrow,
      choosedIndex: -1,
      form: {},
      tableData: [],
      resultData: {
        name: '',
        attendeeGroupName: '',
        attendees: '',
        themens: []
      },
      rules: {
        attendees: [
          { required: true, message: this.$t('MT_QINGSHURUYITIJIELUN'), trigger: 'blur' },
          { min: 0, max: 2048, message: this.$t('MT_ZUIDACHANGDU2048ZIFU'), trigger: 'blur' }
        ],
        conclusion: [
          { min: 0, max: 2048, message: this.$t('MT_ZUIDACHANGDU2048ZIFU'), trigger: 'blur' }
        ]
      },
      employeeDTOS: [],
      conclusionCscList: {
        '01': 'MT_DAIDING',
        '02': 'MT_DINGDIAN',
        '03': 'MT_FALOI',
        '04': 'MT_ZHUANTER',
        '05': 'MT_XIACIPRE',
        '06': 'MT_ZHUANCSC',
        '07': 'MT_GUANBI'
      },
      employeeStr: ''
    }
  },
  computed: {},
  mounted() {
    this.getMeetingSummary()
    const data = {
      id: this.receiverId
    }
    //查询收件人
    getReceiverById(data).then((res) => {
      this.employeeDTOS = res?.employeeDTOS
    })
  },
  methods: {
    taskDeptResult(item, field, field1) {
      if (item[field] && item[field1] && item[field] === item[field1]) {
        return item[field]
      } else if (!item[field] && !item[field1]) {
        return '暂无'
      } else {
        return item[field1] + '/' + item[field]
      }
    },
    taskUserResult(item) {
      let supporter = this.employeeDTOS?.filter(
        (e) => e.id === item.supporter
      )[0] || { name: '' }
      let presenter = this.employeeDTOS?.filter(
        (e) => e.id === item.presenter
      )[0] || { name: '' }
      this.employeeStr = supporter?.name + '/' + presenter?.name
      console.log(265, this.employeeStr)
    },
    toDoMeetingName(item) {
      return item.toDoMeetingName?.substring(0, 9)
    },
    //表头汉子两行展示
    renderHeader(h, { column }) {
      return h('span', {}, [
        h('span', {}, column.label.split('/')[0]),
        h('br'),
        h('span', {}, column.label.split('/')[1])
      ])
    },
    getMeetingSummary() {
      let param = {
        id: this.id
      }
      getMeetingSummary(param).then((res) => {
        console.log(242, res)
        this.resultData = res
        // this.$set(this.resultData.name, res.name)
        // this.resultData.name = res.name;
        // this.resultData.attendeeGroupName = res.attendeeGroupName;
        // this.resultData.attendeeGroupName = res.attendeeGroupName;
        // this.resultData.attendees = res.attendees;
        // res.themens.forEach((item,index) => {
        //   Vue.set(this.resultData.themens, this.resultData.themens.length, item.conclusion)
        // })
      })
    },
    handleOK() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          saveMeetingMinutes(this.resultData).then(() => {
            iMessage.success(this.$t('MT_BAOCUNCHENGGONG'))
            this.$emit('handleOK')
          })
        }
      })
    },
    handleCancel() {
      this.$emit('handleCancel')
    },
    chooseItem(e) {
      if (this.choosedIndex == e) {
        this.choosedIndex = -1
      } else {
        this.choosedIndex = e
      }
    }
  }
}
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  width: 0px;
  opacity: 0;
  -webkit-overflow-scrolling: touch;
  display: none;
  scrollbar-width: none;
}

.new-summary {
  box-sizing: border-box;
  max-height: calc(80vh - 120px);
  overflow: auto;
  padding: 0 1px;
  padding-bottom: 30px;
  &:before {
    content: ''; /*空 内容*/
    display: block; /*块元素*/
    clear: both; /*两边不能有浮动元素*/
  }
  &:after {
    content: ''; /*空 内容*/
    display: block; /*块元素*/
    clear: both; /*两边不能有浮动元素*/
  }

  .meet-desc {
    color: #000;
    margin-bottom: 27px;
  }
  .agenda-box-title {
    > span:nth-of-type(1) {
      font-size: 14px;
      letter-spacing: 0;
      line-height: 20px;
      margin-right: 10px;
    }
    > span:nth-of-type(2) {
      font-size: 10px;
      color: #909399;
      letter-spacing: 0;
      line-height: 20px;
    }
  }

  .agenda-item-box {
    margin: 20px 0;

    .agenda-item {
      padding: 0 10px 10px;
      margin-bottom: 10px;
      box-shadow: 0 0 3px 0 rgba(0, 38, 98, 0.15);
      border-radius: 4px;
      box-sizing: border-box;
      height: 60px;
      overflow-y: hidden;
      transition: 0.4s;

      .agenda-item-title {
        padding: 5px 0;
        line-height: 50px;
        font-size: 16px;
        color: #000000;
        text-align: center;
        display: flex;
        justify-content: space-between;

        .title-left {
          display: flex;
          justify-content: start;
          .title-index {
            width: 50px;
            border-right: 1px solid rgba(0, 38, 98, 0.15);
          }
          .title-name {
            width: 540px;
            text-align: left;
            padding-left: 10px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        .up-arrow {
          width: 100px;
          padding-right: 10px;
          text-align: right;
          cursor: pointer;
          img {
            transition: 0.4s;
            width: 21px;
          }
        }
      }

      .agenda-item-content {
        position: relative;
        background: #f8f8fa;
        border-radius: 4px;
        padding: 10px 20px;

        .task {
          line-height: 20px;
          margin-bottom: 6px;
          font-size: 14px;
          color: #000000;
          letter-spacing: 0;
          line-height: 16px;
        }
        .task-title {
          width: 80%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .max-length {
          color: #ef3737;
          font-size: 0.75rem;
          line-height: 1;
          padding-top: 0.25rem;
          padding-left: 0.9375rem;
          margin-top: 4px;
        }

        .item-info-box {
          display: flex;
          justify-content: space-between;

          > ul {
            width: 310px;
            font-weight: 700;
            font-size: 16px;
            color: #000000;
            letter-spacing: 0;

            li {
              border-bottom: 1px solid #d8d8d8;
              display: flex;
              justify-content: space-between;
              padding: 10px;
              line-height: 34px;
            }
          }
        }
        ::v-deep .el-table {
          .el-table__header tr {
            background-color: #fff;
          }
          th {
            font-weight: normal;
          }
        }
      }
    }

    .active-agenda-item {
      height: unset;

      .up-arrow {
        img {
          transform: rotate(180deg);
        }
      }
    }
  }
}

.el-upload__tip {
  text-align: center;
}
.button-list {
  display: flex;
  height: 35px;
  margin: 30px 0px 0px 0px;
  line-height: 35px;
  justify-content: flex-end;
  align-items: center;
  .el-form-item {
    margin-bottom: 0;
    .el-button {
      height: 35px;
      width: 100px;
    }
    .cancel {
      margin-right: 20px;
    }
  }
}

::v-deep {
  .start {
    display: none;
  }
}
</style>
