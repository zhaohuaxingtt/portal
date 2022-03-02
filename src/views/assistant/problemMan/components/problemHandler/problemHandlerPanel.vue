<template>
  <div class="flex flex-row content" v-loading="loading">
    <div class="left-content" >
      <!-- <el-row :gutter="20">
        <el-col span="13">
          <iInput v-model="queryForm.keyWord" placeholder="搜索..." @keydown.native.enter="keyWordBlurHandle" />
        </el-col>
        <el-col span="11">
          <iSelect v-model="questionModuleId" filterable placeholder="全部模块" clearable="true" @change="questionModuleHandle" @clear="clearModuleHandle">
            <el-option v-for="item in problemModuleList" :key="item.id" :label="item.menuName" :value="item.id"></el-option>
          </iSelect>
        </el-col>
      </el-row> -->
      <div class="search-box flex flex-row">
        <iInput 
          class="input-style"
          :placeholder="language('搜索...')"
          @keyup.enter.native="keyWordBlurHandle"
          v-model="queryForm.keyWord"
        />
        <iSelect
          class="select-style"
          :placeholder="language('全部模块')"
          v-model="questionModuleId"
          filterable
          clearable
          @change="questionModuleHandle"
          @clear="clearModuleHandle"
        >
          <el-option
            v-for="(item) in problemModuleList"
            :key="item.id"
            :value="item.id"
            :label="item.menuName"
          >
          </el-option>
        </iSelect>
      </div>
      <el-row class="mt20 mb20" :gutter="10">
        <el-col span="14">
          <ul class="flex flex-row justify-between category-list">
            <li v-for="item of catgoryList" :key="item.value" :class="{
                active: currentCategoryItem === item.value
              }" @click="changeCategoryItem(item)">
              {{ item.label }}
            </li>
          </ul>
        </el-col>
        <el-col span="8" push="4">
          <el-switch v-model="selfOnly" :active-text="language('仅看自己')" @change="changeSelfHandle"></el-switch>
        </el-col>
      </el-row>
        <div class="card-list" 
          v-infinite-scroll="loadmore"
          infinite-scroll-distance="20"
          infinite-scroll-disabled="disabled"
          v-loading="l_loading">
          <el-card class="card mb20 cursor" v-for="item of categoryCardList" :key="item.id" @click.native="cardSelectHandler(item)" :shadow="cardSelectItem.id === item.id ? 'always' : 'never'">
            <div class="flex flex-row justify-between">
              <div class="title ellipsis">{{ item.questionTitle }}</div>
              <div class="status">
                <template v-if="item.questionStatus === 'unreply'"><span style="color: #e30d0d; font-weight: bold;">{{language('未处理')}}</span></template>
                <template v-else-if="item.questionStatus === 'reply'"><span style="color:#FF8E00; font-weight: bold;">{{language('已处理')}}</span></template>
                <template v-else-if="item.questionStatus === 'finished'"><span style="color:#05BB8B; font-weight: bold;">{{language('已完成')}}</span></template>
              </div>
            </div>
            <div class="flex flex-row justify-between mt20 mb20 gray-color">
              <div>{{language('提问人')}}:{{ item.createByUerName }}</div>
              <div>{{language('管理员')}}:{{ item.handlerUserName }}</div>
            </div>
            <div class="flex flex-row justify-between items-center gray-color">
              <div class="label">{{ item.currModuleName }}</div>
              <div>{{ item.updateDate }}</div>
            </div>
          </el-card>
          <p class="no-data" v-if="categoryCardList.length == 0 && !l_loading">{{language('暂无数据')}}</p>
          <p class="no-data" style="margin-top:20px" v-if="noMore && !l_loading && categoryCardList.length">{{language('没有更多了')}}</p>
        </div>
      </div>
    <div class="right-content ml20">
      <div class="content r-c-box">
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
              <el-form :model="editForm" inline :rules="editFormRules" ref="editForm">
                <el-row :gutter="20">
                  <el-col :span="7">
                    <iFormItem :label="language('模块')" prop="questionModuleId">
                      <iSelect v-model="editForm.questionModuleId" filterable :disabled="isDisabledModule" @change="changeModuleHandle">
                        <el-option v-for="item in problemModuleList" :key="item.id" :label="item.menuName" :value="item.id"></el-option>
                      </iSelect>
                    </iFormItem>
                  </el-col>
                  <el-col :span="7">
                    <iFormItem :label="language('标签')" prop="questionLableId">
                      <iSelect v-model="editForm.questionLableId" filterable :disabled="isDisabledModule">
                        <el-option v-for="item in labelList" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                      </iSelect>
                    </iFormItem>
                  </el-col>
                  <el-col :span="7">
                    <iFormItem :label="language('来源')">
                      <iSelect v-model="editForm.source" :disabled="isDisabledQuestion">
                        <el-option v-for="(v,k) in userTypes" :key="k" :label="v" :value="k"></el-option>
                      </iSelect>
                    </iFormItem>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="btn-box">
              <i-button v-if="!editFormBtn" class="edit-btn" @click="editHandler">{{ language('编辑') }}</i-button>
              <i-button v-else class="edit-btn" @click="saveHandler">{{ language('保存') }}</i-button>
            </div>
          </div>
          <div class="msg-c">
            <div class=" r-c-box-title mb20">{{ language('消息') }}</div>
            <!-- 正常状态 -->
            
            <div class="msg-box" >
              <div class="flex flex-row mt20 ml20">
                <div class="name">{{questionDetail.createByUerName}}</div>
                <div class="content-text">
                  <p class="html" v-html="questionDetail.questionTitle"></p>
                  <p class="time">{{questionDetail.createDate}}</p>
                </div>
              </div>
              <div v-if="questionDetail.replyQuestionList && questionDetail.replyQuestionList.length > 0">
                <template v-for="item of questionDetail.replyQuestionList">
                  <div class=" r-c-box flex flex-column ml20 mb20" :key="item.id">
                    <div v-if="item.replyType === 'transfer'" style="display: flex; flex-direction: row;" class="transfer- r-c-box flex flex-row items-center justify-center">
                      <div><img src="@/assets/images/icon/horn.png" alt="" class="horn-png"></div>
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
              </div>
            </div>

            <!-- 答复状态 -->
            <div v-if="isReplyStatus" class="reply-content mt20">
              <el-form>
                <iFormItem prop="replyContent">
                  <iEditor ref="iEditor" v-model="replyContent" v-if="editable" />
                  <div v-else class="content" v-html="replyContent"></div>
                </iFormItem>
              </el-form>
            </div>
            <div class="mt20 mb20 flex">
              <div>{{language('附件')}}：</div>
              <iUpload :disabled="loadText" ref="attachment" v-model="uploadFileList"  >
                <iButton>{{ language('添加附件') }}</iButton>
              </iUpload>
              <div v-if="loadText && uploadFileList.length == 0">{{language('无')}}</div>
            </div>
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
import iEditor from '../../../components/iEditor';
// import { getFileId } from "@/api/assistant/uploadFile.js"
import iUpload from '@/views/assistant/components/iUpload.vue';
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
      pageNum: 0,
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
        keyWord: '',
        pageNum: 1,
        pageSize: 10,
        questionStatus: this.currentCategoryItem,
        selfOnly: this.selfOnly ? 0 : 1,
      },
      questionDetail: {},
      labelList: [],
      uploadFileList: [],
      testEditFormRules: {
        questionModuleId: [
          { required: true, trigger: 'change', message: '请选择模块' },
          { required: true, trigger: 'blur', message: '请选择模块' }
        ],
        questionLableId: [
          { required: true, trigger: 'change', message: '请选择标签' },
          { required: true, trigger: 'blur', message: '请选择标签' }
        ]
      },
      editFormRules: null,
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
    let params = this.$route.query
    if(params.id && params.source == this.userType){
      this.currentCategoryItem = params.questionStatus || "unreply"
      this.queryForm.keyWord = params.questionTitle
      this.queryForm.id = params.id
      this.selfOnly = false
      console.log(params.id);
    }
    await this.getModuleListByUserType(this.userType);
    // this.initData();
  },
  methods: {
    initData () {
      this.queryProblemList(this._queryForm({
        source: this.userType,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        questionStatus: this.currentCategoryItem == "all" ? "" : this.currentCategoryItem,
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
      console.log(queryForm);
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
      } catch(err){ 
				this.noMore = true    
      }finally {
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
      this.pageNum++
      this.queryProblemList(this._queryForm({
        source: this.userType,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        questionStatus: this.currentCategoryItem == "all" ? "" : this.currentCategoryItem,
        selfOnly: this.selfOnly ? 1 : 0,
      }));
    },
    // 点击导航
    changeCategoryItem (item) {
      this.isReplyStatus = false
      this.currentCategoryItem = item.value;
			this.categoryCardList = []
      this.noMore = false
      this.queryForm.id = ""
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
      this.categoryCardList = []
      this.noMore = false
      this.queryForm.id = ""
      this.queryProblemList(this._queryForm({ selfOnly: val ? 1 : 0, pageNum: 1 }));
      this.$emit('changeSelfHandle', val ? 1 : 0);
    },
    keyWordBlurHandle () {
      this.categoryCardList = []
      this.noMore = false
      this.queryForm.id = ""
      this.queryProblemList(this._queryForm({ pageNum: 1 }));
    },
    questionModuleHandle (val) {
      this.categoryCardList = []
      this.noMore = false
      this.queryForm.id = ""
      this.queryProblemList(this._queryForm({ questionModuleId: val, pageNum: 1 }));
    },
    clearModuleHandle () {
      this.questionModuleId = '';
      this.categoryCardList = []
      this.noMore = false
      this.queryForm.id = ""
      this.queryProblemList(this._queryForm({ questionModuleId: '', pageNum: 1 }));
    },
    // 根据问题id查询问题详情
    async queryDetailById (questionId) {
      const response = await queryDetailByIdApi(questionId);
      if (response?.code === '200') {
        const { data } = response;
        this.questionDetail = data || {};
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
        this.uploadFileList = currQuesFileList || []
    
        this.editForm = {
          questionLableId: data?.questionLableId,
          questionModuleId: data?.questionModuleId,
          source: data?.source
        }
        // 查询标签列表
        this.queryLabelByModuleId(data?.questionModuleId);
        this.$props
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
    replyHandler () {
      this.isReplyStatus = true
      this.uploadFileList = []
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
          // this.$message.error('关闭失败');
        }
      }).catch(() => {
        // this.$message.error('关闭失败');
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
      const data = {
        attachmentList:this.uploadFileList,
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
      this.editFormRules = this.testEditFormRules
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
    loadText () {
      if (this.isReplyStatus) {
        return false;
      } else {
        return true;
      }
    },
    disabled(){
      return this.noMore || this.l_loading
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
    iUpload,
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
    .search-box {
			width: 100%;
			height: 40px;
			margin-bottom: 20px;
			.input-style {
				width: 100%;
			}
			.select-style {
				margin-left: 30px;
			}
		}
    .card-list {
      // height: calc(100vh - 350px);
      // flex: 1;
      min-height: 50px;
      padding: 10px;
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
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          display: block;
          transform: translateY(-50%);
          // width: 3px;
          height: 60%;
          border-left: 3px solid #1763f7;
          // background: #1763f7;
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
      // overflow-y: auto;
      // max-height: calc(100vh - 350px);
    }
    .r-c-box{
      display: flex;
      flex-direction: column;
      height: 100% !important;
    }
    .msg-c{
      flex: 1;
      overflow: auto;
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
      padding: 20px;
      box-sizing: border-box;
      .name {
        width: 100px;
      }
      .content-text {
        background: #f8f8fa;
        margin-left: 20px;
        // width: 700px;
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
.msg-box{
  padding: 10px;
  border: 1px solid #F2F2F2;
  border-radius: 6px;
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
::v-deep .card.is-always-shadow {
  box-shadow: 0px 4px 4px rgba(209, 230, 245, 0.16);
	border-radius: 2px;
	background: rgb(209, 230, 245);
border: 1px solid #E5E5E5;
}
	.name {
        width: 100px;
      }
      .content-text {
        background: #f8f8fa;
        padding: 10px 30px 10px;
        box-sizing: border-box;
				margin-bottom: 20px;
				margin-left: 20px;
        .html {
          color: #000;
        }
        .time {
          margin-top: 20px;
          color: #888888;
        }
      }
</style>
