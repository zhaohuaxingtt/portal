<template>
  <div class="flex flex-row content" v-loading="loading">
    <div class="left-content">
      <el-row :gutter="20">
        <el-col span="14">
          <iInput placeholder="搜索.." />
        </el-col>
        <el-col span="10">
          <iSelect v-model="query.type" filterable placeholder="问题模块">
            <el-option v-for="item in options" :key="item.code" :label="item.value" :value="item.code"></el-option>
          </iSelect>
        </el-col>
      </el-row>
      <el-row class="mt20 mb20" :gutter="10">
        <el-col span="16">
          <ul class="flex flex-row justify-between category-list">
            <li v-for="item of catgoryList" :key="item.value" :class="{
                active: currentCategoryItem === item.value
              }" @click="changeCategoryItem(item)">
              {{ item.label }}
            </li>
          </ul>
        </el-col>
        <el-col span="8">
          <el-switch v-model="value1" active-text="仅看自己"></el-switch>
        </el-col>
      </el-row>
      <template v-if="categoryCardList.length">
        <el-card class="card mb20 cursor" v-for="item of categoryCardList" :key="item.id" @click.native="cardSelectHandler(item)" :shadow="cardSelectItem.id === item.id ? 'always' : 'never'">
          <div class="flex flex-row justify-between">
            <div class="title">{{ item.title }}</div>
            <div class="status">
              <template v-if="item.status === 'unreply'"><span style="color: #e30d0d; font-weight: bold;">未处理</span></template>
              <template v-else-if="item.status === 'reply'"><span style="color:#FF8E00; font-weight: bold;">已处理</span></template>
              <template v-else-if="item.status === 'finished'"><span style="color:#05BB8B; font-weight: bold;">已完成</span></template>
            </div>
          </div>
          <div class="flex flex-row justify-between mt20 mb20 gray-color">
            <div>提问人:{{ item.name1 }}</div>
            <div>管理员:{{ item.name2 }}</div>
          </div>
          <div class="flex flex-row justify-between items-center gray-color">
            <div class="label">{{ item.label }}</div>
            <div>{{ item.time }}</div>
          </div>
        </el-card>
      </template>
    </div>
    <div class="right-content ml20">
      <div class="flex flex-row justify-end">
        <template v-if="cardSelectItem.status === 'unreply'">
          <template v-if="!isReplyStatus">
            <i-button @click="replyHandler">{{ language('答复') }}</i-button>
            <i-button @click="dispatchHandler">{{ language('指派') }}</i-button>
          </template>
          <template v-else>
            <i-button @click="sendMessageHandler">{{
              language('发送')
            }}</i-button>
            <i-button @click="sendAndCloseHandler">{{
              language('发送并关闭问题')
            }}</i-button>
          </template>
        </template>
        <template v-else-if="cardSelectItem.status === 'finished'">
          <i-button @click="finishedHandler">{{ language('归档') }}</i-button>
        </template>
        <template v-else-if="cardSelectItem.status === 'reply'">
          <i-button @click="closeQuestionHandler">{{ language('关闭问题') }}</i-button>
          <i-button @click="dispatchHandler">{{ language('转派') }}</i-button>
        </template>
      </div>
      <div class="search-box flex-between-center-center mt20 mb20 border">
        <div class="input-box flex-align-center margin-right30">
          <el-form label-position="top" :model="editForm" :rules="editFormRules" ref="editForm">
            <el-row :gutter="20">
              <el-col :span="8">
                <iFormItem :label="$t('问题模块')">
                  <iInput :value="editForm.channelStr" :disabled="isDisabledModule" />
                </iFormItem>
              </el-col>
              <el-col :span="8">
                <iFormItem :label="$t('标签')">
                  <iInput v-model="editForm.code" :disabled="isDisabledLabel"></iInput>
                </iFormItem>
              </el-col>
              <el-col :span="8">
                <iFormItem :label="$t('问题来源')">
                  <iInput v-model="editForm.name" :disabled="isDisabledQuestion" />
                </iFormItem>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="btn-box margin-top25">
          <i-button class="edit-btn" @click="editHandler">{{ language('编辑') }}</i-button>
        </div>
      </div>
      <div class="content-title mb20">{{ language('消息') }}</div>
      <!-- 正常状态 -->
      <div class="content flex flex-row">
        <div class="name">张三</div>
        <div class="content-text">
          <p>
            一个材料组可关联多个工艺组，如果该工艺组为Heavy iTem，则引用此工艺组
            的材料组为Heavy Item
          </p>
          <p>2021-10-28 16:20:12</p>
        </div>
      </div>
      <!-- 答复状态 -->
      <div v-if="isReplyStatus" class="reply-content mt20">
        <el-form>
          <iFormItem prop="replyContent">
            <iEditor ref="iEditor" v-model="replyContent" :toolbar="editToolbar" v-if="editable" />
            <div v-else class="content" v-html="replyContent"></div>
          </iFormItem>
        </el-form>
      </div>
      <div class="mt20 mb20">
        <attachmentDownload :load="loadText"/>
      </div>
    </div>
    <dispatchDialog v-if="showDialog" :show.sync="showDialog" />
    <finishedDialog v-if="finishedDialog" :show.sync="finishedDialog" />
  </div>
</template>

<script>
import { iInput, iSelect, iButton, iFormItem } from 'rise'
import DispatchDialog from './dispatchDialog';
import FinishedDialog from './finishedDialog';
import iEditor from '@/components/iEditor';
import AttachmentDownload from '@/views/assistant/components/attachmentDownload.vue'
export default {
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      options: [],
      query: {
        type: ''
      },
      value1: '',
      showDialog: false,
      isReplyStatus: false,
      editable: true,
      currentCategoryItem: 'unreply',
      cardSelectItem: {},
      replyContent: '',
      fileIds: [],
      extraData: { applicationName: 'rise-dev', type: '1', businessId: '01', isTemp: 0 },
      catgoryList: [
        {
          label: '未处理',
          value: 'unreply'
        },
        {
          label: '已处理',
          value: 'reply'
        },
        {
          label: '已完成',
          value: 'finished'
        },
        {
          label: '全部',
          value: 'all'
        },
      ],
      categoryCardList: [],
      // TODO 接口对接后就要删除
      mockDataList: [
        {
          id: 0,
          status: 'unreply',
          title: '如何配置',
          name1: '张三',
          name2: '李四',
          label: '主数据管理',
          time: '2021-10-28 10:20:20'
        },
        {
          id: 2,
          status: 'finished',
          title: '如何配置',
          name1: '张三',
          name2: '李四',
          label: '主数据管理',
          time: '2021-10-28 10:20:20'
        },
        {
          id: 3,
          status: 'reply',
          title: '如何配置',
          name1: '张三',
          name2: '李四',
          label: '主数据管理',
          time: '2021-10-28 10:20:20'
        }
      ],
      editForm: {},
      editFormRules: {},
      isDisabledModule: true,
      isDisabledLabel: true,
      isDisabledQuestion: true,
      finishedDialog: false,
      loading: true,
    }
  },
  mounted () {
    console.log(this.type, '???')
    this.changeCategoryItem({ value: this.currentCategoryItem });
    this.cardSelectHandler(this.categoryCardList[0]);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    // 点击导航
    changeCategoryItem (item) {
      this.isReplyStatus = false
      this.currentCategoryItem = item.value;
      this.categoryCardList = item.value != 'all' ? this.mockDataList.filter(it => it.status === item.value) : this.mockDataList;
      this.cardSelectHandler(this.categoryCardList[0]);
      this.isDisabledModule = true;
      this.isDisabledLabel = true;
      this.isDisabledQuestion = true;
    },
    // 点击卡片
    cardSelectHandler (item) {
      this.isReplyStatus = false
      this.cardSelectItem = item
    },
    
    replyHandler () {
      this.isReplyStatus = true
    },
    // 指派
    dispatchHandler () {
      this.showDialog = true
    },
    closeQuestionHandler () {
      this.$confirm('确定要关闭吗', {
        type: 'warning'
      }).then(async () => {
        this.$message.success('关闭成功');
      }).catch(() => {
        this.$message.error('关闭失败');
      })
    },
    sendMessageHandler () { },
    sendAndCloseHandler () { },
    // 点击编辑按钮
    editHandler () {
      if (Object.is(this.currentCategoryItem, 'finished')) {
        this.isDisabledModule = false;
        this.isDisabledQuestion = false;
      } else {
        this.isDisabledModule = false;
        this.isDisabledLabel = false;
      }
    },
    finishedHandler () {
      this.finishedDialog = true;
    },
  },
  computed: {
    editToolbar () {
      return []
    },
    loadText() {
      if (this.isReplyStatus) {
        return 'up';
      } else {
        return 'down';
      }
    },
  },
  components: {
    iInput,
    iSelect,
    iButton,
    DispatchDialog,
    iFormItem,
    iEditor,
    FinishedDialog,
    AttachmentDownload,
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
.content {
  width: 100%;
  height: 94%;
  .left-content {
    width: 35%;
    min-height: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
    opacity: 1;
    border-radius: 5px;
    padding: 15px 20px 0px 20px;
    overflow-y: auto;
    ::v-deep .el-switch__core {
      width: 40px !important;
    }
    ::v-deep .el-switch__label {
      margin-right: 5px;
      margin-left: 5px;
      color: #999999;
    }
    .category-list {
      padding-left: 10px;
      li {
        cursor: pointer;
        position: relative;
        padding-left: 8px;
        color: #999;
      }
      .active {
        color: #1763f7;
        font-weight: 600;
        &::before {
          position: absolute;
          left: 0;
          bottom: 4px;
          content: '';
          display: block;
          width: 3px;
          height: 15px;
          background: #1763f7;
          border-radius: 5px;
        }
      }
    }
    .card {
      .gray-color {
        color: #666666;
      }
      .label {
        background: #ededed;
        border-radius: 10px;
        color: #4b5c7d;
        padding: 5px 10px;
      }
    }
  }
  .right-content {
    width: 100%;
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
    opacity: 1;
    border-radius: 5px;
    padding: 30px 40px 20px 40px;
    .border {
      border-bottom: 1px solid #707070;
      border-top: 1px solid #707070;
      box-sizing: border-box;
      padding-bottom: 20px;
      padding-top: 20px;
    }
    .content-title {
      font-weight: bold;
      color: #000000;
      opacity: 1;
      font-size: 18px;
      margin-bottom: 40px;
    }
    .content {
      border: 1px solid #f2f2f2;
      width: 100%;
      height: auto;
      padding: 30px;
      box-sizing: border-box;
      .name {
        width: 50px;
      }
      .content-text {
        background: #f8f8fa;
        margin-left: 30px;
        width: 700px;
        padding: 10px 30px 30px;
        box-sizing: border-box;
        &:nth-child(1) {
          color: #000;
        }
        &:nth-child(2) {
          color: #888888;
        }
      }
    }
  }
}
</style>
