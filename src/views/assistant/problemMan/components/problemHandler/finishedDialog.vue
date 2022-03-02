<template>
  <iDialog :title="language('问题归档')" top="30px" :visible.sync="show" v-if="show" width="70%" class="qs-dialog" @close='closeDiologBtn' append-to-body>
    <div class="content">
      <el-form label-position="left" label-width="100px" :model="editForm" :rules="editFormRules" ref="editForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <iFormItem :label="$t('问题模块')" prop="questionModuleId">
              <iSelect v-model="editForm.questionModuleId" filterable clearable="true" @change="changeModule"  @clear="clearModuleHandle">
                <el-option v-for="item in problemModuleList" :key="item.id" :label="item.menuName" :value="item.id"></el-option>
              </iSelect>
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="$t('问题标签')" prop="questionLableId">
              <iSelect v-model="editForm.questionLableId" filterable :disabled="!editForm.questionModuleId">
                <el-option v-for="item in labelList" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
              </iSelect>
            </iFormItem>
          </el-col>
          <el-col :span="8">
            <iFormItem :label="$t('问题来源')">
              <iSelect v-model="editForm.source" disabled>
                  <el-option label="供应商用户" value="supplier"></el-option>
                  <el-option label="内部用户" value="inner"></el-option>
              </iSelect>
            </iFormItem>
          </el-col>
        </el-row>
        <div class="content-title mt20 mb20">{{language('问题')}}</div>
        <el-input v-model="questionItem.questionTitle" class="mb20" rows="3" type="textarea" placeholder="" ></el-input>
        <!-- <div class="qs-tlt" style="height:auto;">{{questionItem.questionTitle}}</div> -->
        <div class="content-title mt20 mb20">{{language('答复')}}</div>
        <iFormItem prop="answerContent">
          <iEditor ref="iEditor" style="height:300px;" v-model="editForm.answerContent" v-if="editable" />
          <div v-else class="content" v-html="editForm.answerContent"></div>
        </iFormItem>
      </el-form>
      <div class="flex mt20 mb20">
        <!-- <iUpload ref="upload" @callback="uploadFileHandelCallback" style="display:none;" />
        <iButton @click="startUploadFile" v-if="!fileName">{{language('请选择文件')}}</iButton>
        <a v-else href="javscript:void(0);" style="color: #2369f1"><i class="el-icon-link"></i>{{fileName}}</a>
        <iButton @click="uploadFileHandle" style="margin-left: 5px;">{{language('上传')}}</iButton> -->

          <div>{{language('附件')}}：</div>
          <iUpload
            ref="attachment"
            v-model="uploadFileList"
          >
            <div class="upload-txt flex" style="align-items: end;">
              <iButton>{{language('添加附件')}}</iButton>
              <span class="upload-txt" @click.stop=";">{{language('只能上传不超过20MB的文件')}}</span>
            </div>
          </iUpload>
        </div>
        <!-- <div v-if="attachFileList.length > 0"></div> -->
    </div>
    <div class="reset_style">
      <iButton @click="save">{{language('确认')}}</iButton>
      <iButton @click="close">{{language('取消')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iFormItem, iInput, iSelect } from 'rise'
import iEditor from '../../../components/iEditor';
import iUpload from '@/views/assistant/components/iUpload.vue'
import {assistantFaqSaveFaqApi} from '@/api/assistant';
export default {
  name: 'finishedDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    labelList: {
      type: Array,
      default:() => [],
    },
    problemModuleList: {
      type: Array,
      default:() => [],
    },
    source: {
      type: String,
      default: '',
    },
    questionItem: {
      type: Object,
      default: () => {},
    }
  },
  data () {
    return {
      visible: false,
      query: {
        type: '',
      },
      editForm: {
        source: this.source,
        answerContent: '',
        questionModuleId:'',
        questionLableId:'',
      },
      editFormRules: {
        answerContent: [
          {required: true, trigger: 'blur',message: '请输入内容'}
        ],
        questionModuleId: [
          {required: true, trigger: 'change',message: '请选择模块'},
          {required: true, trigger: 'blur',message: '请选择模块'}
        ],
        questionLableId: [
          {required: true, trigger: 'change',message: '请选择标签'},
          {required: true, trigger: 'blur',message: '请选择标签'}
        ]
      },
      editable: true,
      fileName: '',
      uploadFileList: [],
      attachFileList: []
    }
  },
  mounted() {
    this.initDialog()
  },
  methods: {
    initDialog() {
      let questionItem = this.questionItem
      console.log(questionItem, "questionItem")
      this.editForm.questionModuleId = questionItem.questionModuleId
      this.editForm.questionLableId = questionItem.questionLableId
      // 获取该问题对话内容
      if (questionItem.replyQuestionList.length > 0) {
        questionItem.replyQuestionList.map(item => {
          if (item.replyType !== 'transfer') {
            this.editForm.answerContent += `${item.content}<br />`
          }
        })
      }
      // 获取该问题的附件
      let currQuesFileList = []
      if (questionItem.attachmentDTOList.length > 0) {
        currQuesFileList = questionItem.attachmentDTOList || []
      }
      if (questionItem.replyQuestionList.length > 0) {
        questionItem.replyQuestionList.map(item => {
          if (item.attachmentList.length > 0) {
            currQuesFileList = currQuesFileList.concat(item.attachmentList)
          }
        })
      }
      this.attachFileList = currQuesFileList
    },
    closeDiologBtn () {
      this.$emit('update:show', false)
    },
    close () {
      this.closeDiologBtn();
    },
    save () {
      // if (!this.uploadFileList.length) {
      //   this.$message.error('请上传附件');
      //   return;
      // }
      console.log(this.editForm, '===',this.questionItem, this.uploadFileList);
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          const data = {
            ...this.editForm,
            questionTitle: this.questionItem.questionTitle,
            questionId:this.questionItem.id,
            attachmentList:this.uploadFileList,
          };
          const reponse = await assistantFaqSaveFaqApi(data);
          if (reponse?.code === '200') {
            this.$message.success('保存成功');
            this.$emit('loadData');
            this.closeDiologBtn();
          } else {
            this.$message.error('保存失败');
          }
        }
      })
    },
    clearModuleHandle() {
      this.editForm = Object.assign(this.editForm, {questionModuleId:'',questionLableId:''});
    },
    changeModule(val) {
      this.editForm = Object.assign(this.editForm, {
        questionLableId:'',
      })
      this.$emit('queryLabelByModuleId',val);
    },
  },
  components: {
    iDialog,
    iButton,
    iFormItem,
    iInput,
    iSelect,
    iEditor,
    iUpload,
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
.reset_style {
  margin-top: 50px;
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
.content-title {
  font-weight: bold;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}
::v-deep .el-form-item__content{
  margin-left: 0!important;
}

.qs-tlt{
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid #D0D4D9;
  border-radius: 6px;
}

</style>
