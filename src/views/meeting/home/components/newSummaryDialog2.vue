<template>
  <!--转派-->
  <iDialog
    :title="$t('MT_HUIYIJIYAO')"
    :visible.sync="open"
    width="50rem"
    :close-on-click-modal="false"
    @close="handleCancel"
    class="summary-dialog-box"
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
          <iFormItem>
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
            <iFormItem prop="attendees" class="meet-desc">
              <iLabel slot="label" required></iLabel>
              <iInput
                v-model="resultData.attendees"
                type="textarea"
                resize="none"
                rows="4"
              />
            </iFormItem>
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
                <div class="title-index">{{ index + 1 }}</div>
                <div class="title-name">{{ item.topic }}</div>
                <div class="up-arrow">
                  <img :src="upArrow" alt="" srcset="" />
                </div>
              </div>
              <div class="agenda-item-content">
                <p class="task">Task</p>
                <iFormItem :prop="'conclusion' + index" class="meet-desc">
                  <iInput
                    v-model="item.conclusion"
                    type="textarea"
                    resize="none"
                    rows="4"
                  />
                </iFormItem>
                <p class="task">Result</p>
                <iFormItem :prop="'conclusion' + index" class="meet-desc">
                  <iInput
                    v-model="item.result"
                    type="textarea"
                    resize="none"
                    rows="4"
                  />
                </iFormItem>
                <!-- <iInput v-model="item.conclusion" type="textarea" resize="none" rows="4" @blur='blur(item.conclusion, index)'/> -->
                <!-- <div class="item-info-box">
                  <ul>
                    <li>
                      <span>Count</span>
                      <span>{{item.count}}</span>
                    </li>
                    <li>
                      <span>Presenter</span>
                      <span>{{item.presenter}}</span>
                    </li>
                    <li>
                      <span>Supporter</span>
                      <span>{{item.supporter}}</span>
                    </li>
                    <li>
                      <span>Time</span>
                      <span>{{item.startTime && item.startTime.substring(0,5)}}~{{item.endTime && item.endTime.substring(0,5)}}</span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>Duration</span>
                      <span>{{item.duration}}</span>
                    </li>
                    <li>
                      <span>Presenter Department</span>
                      <span>{{item.presenterDept}}</span>
                    </li>
                    <li>
                      <span>Supporter Department</span>
                      <span>{{item.supporterDept}}</span>
                    </li>
                    <li>
                      <span>Remark</span>
                      <span>{{item.remark}}</span>
                    </li>
                  </ul>
                </div> -->
              </div>
            </li>
          </ul>
        </div>
        <div class="button-list">
          <el-form-item>
            <iButton @click="handleCancel" plain class="cancel">{{
              $t('LK_QUXIAO')
            }}</iButton>
            <iButton @click="handleOK" plain>{{ $t('MT_CHUANGJIAN') }}</iButton>
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
    }
  },
  data() {
    return {
      numToLetter,
      upArrow,
      choosedIndex: -1,
      form: {},
      resultData: {
        themens: [
          { conclusion: '' },
          { conclusion: '' },
          { conclusion: '' },
          { conclusion: '' },
          { conclusion: '' },
          { conclusion: '' },
          { conclusion: '' },
          { conclusion: '' },
          { conclusion: '' }
        ]
      },
      rules: {
        attendees: [
          { required: true, message: this.$t('请输入议题结论！'), trigger: 'blur' }
        ]
        // conclusion0: [
        //   { required: true, message: "请输入议题结论！", trigger: "blur" },
        //   { min: 1, max: 10, message: "最大长度1024字符", trigger: "blur" },
        // ],
      }
    }
  },
  mounted() {
    this.getMeetingSummary()
  },
  methods: {
    getMeetingSummary() {
      let param = {
        id: this.id
      }
      getMeetingSummary(param).then((res) => {
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
          saveMeetingMinutes(this.resultData).then((res) => {
            if (Number(res.code) === 200) {
              iMessage.success(this.$t('保存成功'))
              this.$emit('handleOK')
            }
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
.summary-dialog-box {
  display: flex;
}
.new-summary {
  box-sizing: border-box;
  max-height: calc(80vh - 120px);
  overflow: auto;
  padding: 0 1px;
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
        .up-arrow {
          width: 100px;
          padding-right: 10px;
          text-align: right;
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
  margin: 30px 0 10px;
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
