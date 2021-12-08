<template>
  <iDialog title="问题归档" :visible.sync="show" v-if="show" width="70%" @close='closeDiologBtn' append-to-body>
    <el-form label-position="left" label-width="100px" :model="editForm" :rules="editFormRules" ref="editForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <iFormItem :label="$t('问题模块')" prop="questionModuleId">
            <iSelect v-model="editForm.questionModuleId" filterable clearable="true" @change="changeModule"  @clear="clearModuleHandle">
              <el-option v-for="item in problemModuleList" :key="item.menuId" :label="item.menuName" :value="item.menuId"></el-option>
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
            <iInput v-model="editForm.source" disabled/>
          </iFormItem>
        </el-col>
      </el-row>
      <div class="content-title mt20 mb20">问题</div>
      <div style="height:auto;">{{questionItem.questionTitle}}</div>
      <div class="content-title mt20 mb20">答复</div>
      <iFormItem prop="answerContent">
        <iEditor ref="iEditor" v-model="editForm.answerContent" v-if="editable" />
        <div v-else class="content" v-html="editForm.answerContent"></div>
      </iFormItem>
    </el-form>
    <div class="mt20 mb20">
      <!-- <iUpload ref="upload" @callback="uploadFileHandelCallback" style="display:none;" />
      <iButton @click="startUploadFile" v-if="!fileName">{{language('请选择文件')}}</iButton>
      <a v-else href="javscript:void(0);" style="color: #2369f1"><i class="el-icon-link"></i>{{fileName}}</a>
      <iButton @click="uploadFileHandle" style="margin-left: 5px;">{{language('上传')}}</iButton> -->
      <attachmentDownload load="up" @getFilesList="getFilesList" />
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
import AttachmentDownload from '@/views/assistant/components/attachmentDownload.vue'
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
    }
  },
  methods: {
    closeDiologBtn () {
      this.$emit('update:show', false)
    },
    close () {
      this.closeDiologBtn();
    },
    save () {
      if (!this.uploadFileList.length) {
        this.$message.error('请上传附件');
        return;
      }
      const attachmentList = this.uploadFileList.map(item => {
        return {
          fileName: item.name,
          fileUrl: item.path,
        };
      });
      console.log(this.editForm, '===',this.questionItem, this.uploadFileList);
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          const data = {
            ...this.editForm,
            questionTitle: this.questionItem.questionTitle,
            questionId:this.questionItem.id,
            attachmentList,
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
    getFilesList (fileList) {
      console.log(fileList, '上传文件');
      this.uploadFileList = fileList;
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
    AttachmentDownload,
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
  margin-bottom: 40px;
}
::v-deep .el-form-item__content{
  margin-left: 0!important;
}
</style>
