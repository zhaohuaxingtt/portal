<template>
  <div class="flex flex-row content" v-loading="loading">
    <div class="left-content" >
      <el-row :gutter="20">
        <el-col span="14">
          <iInput v-model="keyWord" placeholder="搜索.." @keydown.native.enter="keyWordBlurHandle" />
        </el-col>
        <el-col span="10">
          <iSelect v-model="questionModuleId" filterable placeholder="问题模块" clearable="true" @change="questionModuleHandle" @clear="clearModuleHandle">
            <el-option v-for="item in problemModuleList" :key="item.id" :label="item.menuName" :value="item.id"></el-option>
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
        <!-- <div class="card-list" @scroll="scrollHandle($event)" v-loading="l_loading"> -->
        <div class="card-list" 
          v-infinite-scroll="loadmore"
          infinite-scroll-distance="20"
          infinite-scroll-disabled="disabled"
          v-loading="l_loading">
          <el-card class="card mb20 cursor" v-for="item of categoryCardList" :key="item.id" @click.native="cardSelectHandler(item)" :shadow="cardSelectItem.id === item.id ? 'always' : 'never'">
            <div class="flex flex-row justify-between">
              <div class="title ellipsis">{{ item.questionTitle }}</div>
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
              <div class="label">{{ item.currModuleName }}</div>
              <div>{{ item.createDate }}</div>
            </div>
          </el-card>
          <p class="no-data" v-if="categoryCardList.length == 0 && !l_loading">暂无数据</p>
          <p class="no-data" style="margin-top:20px" v-if="noMore && !l_loading && categoryCardList.length">没有更多了</p>
        </div>
      </div>
    <div class="right-content ml20">
      <div class="content">
        <div class="flex flex-row justify-end">
          <template v-if="cardSelectItem.questionStatus === 'unreply'">
            <template v-if="!isReplyStatus">
              <i-button @click="replyHandler">{{ language('答复') }}</i-button>
              <i-button @click="dispatchHandler">{{ language('转派') }}</i-button>
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
                    <iFormItem :label="$t('问题模块')" prop="questionModuleId">
                      <iSelect v-model="editForm.questionModuleId" filterable :disabled="isDisabledModule" @change="changeModuleHandle">
                        <el-option v-for="item in problemModuleList" :key="item.id" :label="item.menuName" :value="item.id"></el-option>
                      </iSelect>
                    </iFormItem>
                  </el-col>
                  <el-col :span="8">
                    <iFormItem :label="$t('标签')" prop="questionLableId">
                      <iSelect v-model="editForm.questionLableId" filterable :disabled="isDisabledModule">
                        <el-option v-for="item in labelList" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                      </iSelect>
                    </iFormItem>
                  </el-col>
                  <el-col :span="8">
                    <iFormItem :label="$t('问题来源')">
                      <iSelect v-model="editForm.source" :disabled="isDisabledQuestion">
                        <el-option v-for="(v,k) in userTypes" :key="k" :label="v" :value="k"></el-option>
                      </iSelect>
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
            <div class="content flex flex-column" :key="item.id">
              <div v-if="item.replyType === 'transfer'" class="transfer-content flex flex-row items-center justify-center">
                <img src="@/assets/images/icon/horn.png" alt="" class="horn-png">
                <div>{{`管理员${item.replyUserName}将任务转派给了管理员${item.handlerToUserName}`}}</div>
              </div>
              <div v-else class="flex flex-row">
                <div class="name">{{item.replyUserName}}</div>
                <div class="content-text">
                  <p class="html" v-html="item.content"></p>
                  <p class="time">{{item.createDate}}</p>
                </div>
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
          <div class="mt20 mb20" v-show="attachShowFlag">
            <attachmentDownload :load="loadText" ref="attachment" @getFilesList="getFilesList" />
          </div>
        </template>
      </div>
    </div>
    <dispatchDialog v-if="showDialog" :show.sync="showDialog" :questionId="cardSelectItem.id" @loadData="initData" />
    <finishedDialog v-if="finishedDialog" :show.sync="finishedDialog" :problemModuleList="problemModuleList" :labelList="labelList" :source="userType" :questionItem="questionDetail" @loadData="initData" @queryLabelByModuleId="queryLabelByModuleId" />
  </div>
</template>

<script>
import { iInput, iSelect, iButton, iFormItem } from 'rise'
import DispatchDialog from './dispatchDialog';
import FinishedDialog from './finishedDialog';
import iEditor from '@/components/iEditor';
import AttachmentDownload from '@/views/assistant/components/attachmentDownload.vue';
import { queryModuleBySource, queryProblemListApi, queryDetailByIdApi, getCurrLabelList, answerQuestionApi, closeQuestionApi, modifyModuleAndLabelApi } from '@/api/assistant';
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
      selfOnly: true,
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
      editForm: {},
      editFormBtn: false,
      isDisabledModule: true,
      isDisabledLabel: true,
      isDisabledQuestion: true,
      finishedDialog: false,
      loading: false,
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
      editFormRules: {
        questionModuleId: [
          { required: true, trigger: 'change', message: '请选择模块' },
          { required: true, trigger: 'blur', message: '请选择模块' }
        ],
        questionLableId: [
          { required: true, trigger: 'change', message: '请选择标签' },
          { required: true, trigger: 'blur', message: '请选择标签' }
        ]
      },

      l_loading:false,
      noMore:false,
      attachShowFlag: false,
      userTypes:{
        inner: "内部用户",
        supplier:"供应商用户"
      },
    }
  },
  async mounted () {
    await this.getModuleListByUserType(this.userType);
    this.initData();
  },
  methods: {
    initData () {
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
      return new Promise(async (resolve,reject) => {
        const response = await queryModuleBySource(userType);
        if (response?.code === '200') {
          this.problemModuleList = response.data;
          resolve()
        } else {
          console.error('获取模块接口失败');
          reject()
        }
      })
    },
    // 获取问题列表
    async queryProblemList (queryForm) {
      this.l_loading = true
      try {
        const response = await queryProblemListApi(queryForm);
        if (response?.code === '200') {
          const { data } = response;
            let list = data.records || []
            list.map(item => {
              item.currModuleName = this.getCurrModuleName(item.questionModuleId)
            })
            if(queryForm.pageNum == 1 && data.total == 0) {
							this.noMore = true
							this.categoryCardList = []
						}else{
							if(queryForm.pageNum == 1){
								this.categoryCardList = list
							}else{
								this.categoryCardList.push(...list)
							}
							if(queryForm.pageNum >= data.pages) {
								this.noMore = true
							}
						}
            // 默认选中第一个
            this.cardSelectItem = this.categoryCardList[0] || {};
            if(this.cardSelectItem.id){
              // 查询问题详情
              this.queryDetailById(this.cardSelectItem.id);
            }
            
        } else {
          console.error('获取问题列表失败');
        }
      } finally {
        this.l_loading = false
      }
    },
    // 根据模块id获取模块名称
    getCurrModuleName(id) {
      let m = this.problemModuleList.find(pm => pm.id === id)
      return m ? m.menuName : ""
    },
    // 监听左侧滚动条
    loadmore(){
      if(this.noMore) return
      this.queryProblemList(this._queryForm({ pageNum: this.pageNum + 1}));
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
    clearModuleHandle () {
      this.questionModuleId = '';
      this.queryProblemList(this._queryForm({ questionModuleId: '', pageNum: 1 }));
    },
    // 根据问题id查询问题详情
    async queryDetailById (questionId) {
      const response = await queryDetailByIdApi(questionId);
      if (response?.code === '200') {
        const { data } = response;
        this.questionDetail = data;
        // 获取当前问题的附件(用户上传及管理员回复的附件)
        let currQuesFileList = []
        if (data.attachmentDTOList.length > 0) {
          currQuesFileList = data.attachmentDTOList || []
        }
        if (data.replyQuestionList.length > 0) {
          data.replyQuestionList.map(item => {
            if (item.attachmentList.length > 0) {
              currQuesFileList = currQuesFileList.concat(item.attachmentList)
            }
          })
        }
        this.attachShowFlag = currQuesFileList.length > 0 ? true : false
        this.$refs.attachment.fileList = currQuesFileList || []
        this.editForm = {
          questionLableId: data?.questionLableId,
          questionModuleId: data?.questionModuleId,
          source: data?.source
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
      this.$refs.attachment.fileList = []
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
      // if (!this.uploadFileList.length) {
      //  return this.$message.error('请上传附件');
      // }
      if (!this.replyContent) {
        return this.$message.error('请填写回复内容');
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
        this.replyContent = ""
        this.categoryCardList = []
        this.noMore = false
        this.queryProblemList(this._queryForm({ pageNum:1 }));
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
    changeModuleHandle (val) {
      this.queryLabelByModuleId(val);
      this.editForm = Object.assign(this.editForm, { questionLableId: '' });
    },
    saveHandler () {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          const response = await modifyModuleAndLabelApi(Object.assign(this.editForm, { id: this.cardSelectItem.id }));
          if (response?.code === '200') {
            this.$message.success('保存成功');
            this.editFormBtn = false;
            this.isDisabledModule = true;
            this.isDisabledQuestion = true;
            this.isDisabledLabel = true;
          } else {
            this.$message.error('保存失败');
          }
        }
      })
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
    disabled(){
      return this.noMore || this.loadmore
    }
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
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
    opacity: 1;
    border-radius: 5px;
    padding: 15px 20px 0px 20px;
    ::v-deep .el-switch__core {
      width: 40px !important;
    }
    ::v-deep .el-switch__label {
      margin-right: 5px;
      margin-left: 5px;
      color: #999999;
    }
    .card-list {
      // height: calc(100vh - 350px);
      flex: 1;
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
        padding: 5px 10px;
        margin-right: 10px;
        background: #ededed;
        border-radius: 10px;
        color: #4b5c7d;
      }

      .title{
        width: 70%;
      }
    }
  }
  .right-content {
    width: 70%;
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
    opacity: 1;
    border-radius: 5px;
    padding: 30px 40px 20px 40px;
    .content{
      overflow-y: auto;
      max-height: calc(100vh - 350px);
    }
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
      // border: 1px solid #f2f2f2;
      width: 100%;
      height: auto;
      padding: 30px;
      box-sizing: border-box;
      .name {
        width: 100px;
      }
      .content-text {
        background: #f8f8fa;
        margin-left: 20px;
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
.no-data{
  margin-top: 50px;
  margin-bottom: 20px;
  color: #999;
  text-align: center;
}
.transfer-content {
		width: 100%;
	}
	.horn-png {
		width: 16px;
		height: 16px;
		margin-right: 10px;
	}
</style>
