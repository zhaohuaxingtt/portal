<template>
  <div class="flex flex-row content" v-loading="loading">
    <div class="left-content">
      <el-row :gutter="20">
        <el-col span="14">
          <iInput v-model="keyWord" placeholder="搜索.." @blur="keyWordBlurHandle" />
        </el-col>
        <el-col span="10">
          <iSelect v-model="questionModuleId" filterable placeholder="问题模块" clearable="true" @change="questionModuleHandle" @clear="clearModuleHandle">
            <el-option v-for="item in problemModuleList" :key="item.menuId" :label="item.menuName" :value="item.menuId"></el-option>
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
          <el-switch v-model="selfOnly" active-text="仅看自己" @change="changeSelfHandle"></el-switch>
        </el-col>
      </el-row>
      <template v-if="categoryCardList.length">
        <div class="card-list" @scroll="scrollHandle($event)">
          <el-card class="card mb20 cursor" v-for="item of categoryCardList" :key="item.id" @click.native="cardSelectHandler(item)" :shadow="cardSelectItem.id === item.id ? 'always' : 'never'">
            <div class="flex flex-row justify-between">
              <div class="title">{{ item.questionTitle }}</div>
              <div class="status">
                <template v-if="item.questionStatus === 'unreply'"><span style="color: #e30d0d; font-weight: bold;">未处理</span></template>
                <template v-else-if="item.questionStatus === 'reply'"><span style="color:#FF8E00; font-weight: bold;">已处理</span></template>
                <template v-else-if="item.questionStatus === 'finished'"><span style="color:#05BB8B; font-weight: bold;">已完成</span></template>
              </div>
            </div>
            <div class="flex flex-row justify-between mt20 mb20 gray-color">
              <div>提问人:{{ item.createByUerName }}</div>
              <div>管理员:{{ item.handlerUserName }}</div>
            </div>
            <div class="flex flex-row justify-between items-center gray-color">
              <div class="label">{{ item.questionDescription }}</div>
              <div>{{ item.createDate }}</div>
            </div>
          </el-card>
        </div>
      </template>
    </div>
    <div class="right-content ml20">
      <div class="flex flex-row justify-end">
        <template v-if="cardSelectItem.questionStatus === 'unreply'">
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
        <template v-else-if="cardSelectItem.questionStatus === 'finished'">
          <i-button @click="finishedHandler">{{ language('归档') }}</i-button>
        </template>
        <template v-else-if="cardSelectItem.questionStatus === 'reply'">
          <i-button @click="closeQuestionHandler">{{ language('关闭问题') }}</i-button>
          <i-button @click="dispatchHandler">{{ language('转派') }}</i-button>
        </template>
      </div>
      <template v-if="cardSelectItem.questionStatus">
        <div class="search-box flex-between-center-center mt20 mb20 border">
          <div class="input-box flex-align-center margin-right30">
            <el-form label-position="top" :model="editForm" :rules="editFormRules" ref="editForm">
              <el-row :gutter="20">
                <el-col :span="8">
                  <iFormItem :label="$t('问题模块')">
                    <iSelect v-model="editForm.questionModuleId" filterable :disabled="isDisabledModule" @change="changeModuleHandle">
                      <el-option v-for="item in problemModuleList" :key="item.menuId" :label="item.menuName" :value="item.menuId"></el-option>
                    </iSelect>
                  </iFormItem>
                </el-col>
                <el-col :span="8">
                  <iFormItem :label="$t('标签')">
                    <iSelect v-model="editForm.questionLableId" filterable :disabled="isDisabledModule">
                      <el-option v-for="item in labelList" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                    </iSelect>
                  </iFormItem>
                </el-col>
                <el-col :span="8">
                  <iFormItem :label="$t('问题来源')">
                    <iInput v-model="editForm.source" :disabled="isDisabledQuestion" />
                  </iFormItem>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="btn-box margin-top25">
            <i-button v-if="!editFormBtn" class="edit-btn" @click="editHandler">{{ language('编辑') }}</i-button>
            <i-button v-else class="edit-btn" @click="saveHandler">{{ language('保存') }}</i-button>
          </div>
        </div>
        <div class="content-title mb20">{{ language('消息') }}</div>
        <!-- 正常状态 -->
        <template v-for="item of questionDetail.replyQuestionList">
          <div class="content flex flex-row" :key="item.id">
            <div class="name">{{item.replyUserName}}</div>
            <div class="content-text">
              <p class="html" v-html="item.content"></p>
              <p class="time">{{item.createDate}}</p>
            </div>
          </div>
        </template>

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
          <attachmentDownload :load="loadText" @getFilesList="getFilesList" />
        </div>
      </template>
    </div>
    <dispatchDialog v-if="showDialog" :show.sync="showDialog" :questionId="cardSelectItem.id" @loadData="initData" />
    <finishedDialog v-if="finishedDialog" :show.sync="finishedDialog" :problemModuleList="problemModuleList" :labelList="labelList" :source="userType" :questionItem="cardSelectItem" @loadData="initData" @queryLabelByModuleId="queryLabelByModuleId" />
  </div>
</template>

<script>
import { iInput, iSelect, iButton, iFormItem } from 'rise'
import DispatchDialog from './dispatchDialog';
import FinishedDialog from './finishedDialog';
import iEditor from '@/components/iEditor';
import AttachmentDownload from '@/views/assistant/components/attachmentDownload.vue';
import { getModuleListByUserTypeApi, queryProblemListApi, queryDetailByIdApi, getCurrLabelList, answerQuestionApi,closeQuestionApi } from '@/api/assistant';
// 来源 inner:内部用户 supplier:供应商用户
export default {
  props: {
    userType: {
      type: String,
      default: 'supplier',
    }
  },
  data () {
    return {
      // 问题模块下拉框
      problemModuleList: [],
      // 搜索关键词
      keyWord: '',
      questionModuleId: '',
      selfOnly: false,
      showDialog: false,
      isReplyStatus: false,
      editable: true,
      currentCategoryItem: 'unreply',
      cardSelectItem: {
        questionStatus: '',
        id: null,
      },
      replyContent: '',
      pageNum: 1,
      pageSize: 10,
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
      flag: false,
      editForm: {},
      editFormBtn: false,
      editFormRules: {},
      isDisabledModule: true,
      isDisabledLabel: true,
      isDisabledQuestion: true,
      finishedDialog: false,
      loading: true,
      queryForm: {
        source: this.userType,
        pageNum: 1,
        pageSize: 10,
        questionStatus: this.currentCategoryItem,
        selfOnly: this.selfOnly ? 0 : 1,
      },
      questionDetail: {},
      labelList: [],
      uploadFileList: [],
      total: 0,
    }
  },
  mounted () {

    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getModuleListByUserType(this.userType);
    this.initData();
  },
  methods: {
    initData() {
      this.queryProblemList(this._queryForm({
        source: this.userType,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        questionStatus: this.currentCategoryItem,
        selfOnly: this.selfOnly ? 1 : 0,
      }));
    },
    // 根据用户类型获取模块下拉框
    async getModuleListByUserType (userType) {
      const response = await getModuleListByUserTypeApi(userType);
      if (response?.code === '200') {
        this.problemModuleList = response.data;
      } else {
        console.error('获取模块接口失败');
      }
    },
    // 获取问题列表
    async queryProblemList (queryForm) {
      const response = await queryProblemListApi(queryForm);
      if (response?.code === '200') {
        const { data } = response;
        if (data.records.length) {
          if (this.flag) {
            this.categoryCardList = this.categoryCardList.concat(data.records);
          } else {
            this.categoryCardList = data.records;
          }
          // 默认选中第一个
          this.cardSelectItem = this.categoryCardList[0];
          // 查询问题详情
          this.queryDetailById(this.cardSelectItem.id);
          this.total = data.total;
        } else {
          if (!this.flag) {
            this.cardSelectItem = {
              questionStatus: '',
              id: null,
            };
            this.categoryCardList = [];
          }
        }
        console.log(this.categoryCardList, '======>>>>');
        this.flag = false;
      } else {
        console.error('获取问题列表失败');
      }
    },
    // 监听左侧滚动条
    scrollHandle (e) {
      let Scroll = e.target
      let scrollHeight = Scroll.scrollHeight - Scroll.clientHeight
      if (scrollHeight - Scroll.scrollTop < 100 && !this.flag) {
        this.flag = true
        const pageNum = this.pageNum + 1;
        console.log(pageNum, '当前页面');
        this.queryProblemList(this._queryForm({ pageNum }));
      }
    },
    // 点击导航
    changeCategoryItem (item) {
      this.isReplyStatus = false
      this.currentCategoryItem = item.value;
      // 重新请求数据
      this.queryProblemList(this._queryForm({
        questionStatus: item.value == 'all' ? '' : item.value,
        pageNum: 1,
      }));
      this.isDisabledModule = true;
      this.isDisabledLabel = true;
      this.isDisabledQuestion = true;
      this.editFormBtn = false;
    },
    changeSelfHandle (val) {
      this.queryProblemList(this._queryForm({ selfOnly: val ? 1 : 0, pageNum: 1 }));
      this.$emit('changeSelfHandle', val ? 1 : 0);
    },
    keyWordBlurHandle () {
      this.queryProblemList(this._queryForm({ keyWord: this.keyWord, pageNum: 1 }));
    },
    questionModuleHandle (val) {
      this.queryProblemList(this._queryForm({ questionModuleId: val, pageNum: 1 }));
    },
    clearModuleHandle() {
      this.questionModuleId = '';
      this.queryProblemList(this._queryForm({ questionModuleId: '', pageNum: 1 }));
    },
    // 根据问题id查询问题详情
    async queryDetailById (questionId) {
      const response = await queryDetailByIdApi(questionId);
      if (response?.code === '200') {
        const { data } = response;
        this.questionDetail = data;
        this.editForm = {
          questionLableId: data?.questionLableId,
          questionModuleId: data?.questionModuleId,
          source: data?.source,
        }
        // 查询标签列表
        this.queryLabelByModuleId(data?.questionModuleId);
      } else {
        console.error('根据id获取问题详情失败');
      }
    },
    // 根据模块id查询标签
    async queryLabelByModuleId (moduleId) {
      const response = await getCurrLabelList(moduleId);
      if (response?.code === '200') {
        console.log(response.data);
        this.labelList = response.data;
      } else {
        console.error('根据模块id查询标签失败');
      }
    },
    // 点击卡片
    cardSelectHandler (item) {
      console.log(item, '点击了');
      this.editFormBtn = false;
      this.isReplyStatus = false
      this.cardSelectItem = item;
      this.isDisabledModule = true;
      this.isDisabledQuestion = true;
      this.isDisabledLabel = true;
      this.queryDetailById(item.id);
    },
    // 上传文件回调
    getFilesList (fileList) {
      console.log(fileList, '上传文件');
      this.uploadFileList = fileList;
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
        const response = await closeQuestionApi(this.cardSelectItem.id);
        if (response?.code === '200') {
          this.$message.success('关闭成功');
          this.initData();
        } else {
          this.$message.error('关闭失败');
        }
      }).catch(() => {
        this.$message.error('关闭失败');
      })
    },
    async answerQuestion (hasClosed) {
      console.log(this.uploadFileList);
      if (!this.uploadFileList.length) {
        this.$message.error('请上传附件');
      }
      if (!this.replyContent) {
        this.$message.error('请填写回复内容');
      }
      const attachmentList = this.uploadFileList.map(item => {
        return {
          fileName: item.name,
          fileUrl: item.path,
        };
      });
      const data = {
        attachmentList,
        content: this.replyContent,
        // 是否关闭 0：否 1：是
        hasClosed,
        questionId: this.cardSelectItem.id,
      };
      console.log(data);
      const response = await answerQuestionApi(data);
      if (response?.code === '200') {
        this.$message.success(response.desZh);
        this.isReplyStatus = false;
      } else {
        this.$message.error('保存失败');
      }
    },
    // 回复
    sendMessageHandler () {
      // answerQuestionApi
      this.answerQuestion(0);
    },
    // 回复和关闭
    sendAndCloseHandler () {
      this.answerQuestion(1);
    },
    // 点击编辑按钮
    editHandler () {
      if (Object.is(this.currentCategoryItem, 'finished')) {
        this.isDisabledModule = false;
        this.isDisabledQuestion = false;
      } else {
        this.isDisabledModule = false;
        this.isDisabledLabel = false;
      }
      this.editFormBtn = true;
    },
    // 表单中切换模块
    changeModuleHandle(val) {
      this.queryLabelByModuleId(val);
      this.editForm = Object.assign(this.editForm, {questionLableId:''});
    },
    saveHandler () {
      this.editFormBtn = false;
      this.isDisabledModule = true;
      this.isDisabledQuestion = true;
      this.isDisabledLabel = true;
    },
    finishedHandler () {
      this.finishedDialog = true;
    },
    _queryForm (params) {
      return Object.assign(this.queryForm, params);
    }
  },
  computed: {
    editToolbar () {
      return []
    },
    loadText () {
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
    .card-list {
      height: calc(100vh - 300px);
      overflow-y: auto;
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
        width: 100px;
      }
      .content-text {
        background: #f8f8fa;
        margin-left: 30px;
        width: 700px;
        padding: 10px 30px 10px;
        box-sizing: border-box;
        .html {
          color: #000;
        }
        .time {
          margin-top: 20px;
          color: #888888;
        }
      }
    }
  }
}
</style>
