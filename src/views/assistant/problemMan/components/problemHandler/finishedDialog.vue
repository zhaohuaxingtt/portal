<template>
  <iDialog title="问题归档" style="margin-top:20vh" :visible.sync="show" v-if="show" width="70%" @close='closeDiologBtn' append-to-body>
    <el-form label-position="left" label-width="60px" :model="editForm" :rules="editFormRules" ref="editForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <iFormItem :label="$t('问题模块')">
            <iSelect placeholder="请选择" v-model="editForm.problemModule">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.value">
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('问题标签')">
            <iSelect placeholder="请选择" v-model="editForm.problemModule">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.value">
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('问题来源')">
            <iInput v-model="editForm.name" disabled/>
          </iFormItem>
        </el-col>
      </el-row>
      <div class="content-title mt20 mb20">问题</div>
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="editForm.textarea" style="width:100%;">
      </el-input>
      <div class="content-title mt20 mb20">答复</div>
      <iFormItem prop="replyContent">
        <iEditor ref="iEditor" v-model="editForm.replyContent" :toolbar="editToolbar" v-if="editable" />
        <div v-else class="content" v-html="editForm.replyContent"></div>
      </iFormItem>
    </el-form>
    <div class="mt20 mb20">
      附件:
      <iUpload ref="upload" @callback="uploadFileHandelCallback" style="display:none;" />
      <iButton @click="startUploadFile" v-if="!fileName">{{language('请选择文件')}}</iButton>
      <a v-else href="javscript:void(0);" style="color: #2369f1"><i class="el-icon-link"></i>{{fileName}}</a>
      <iButton @click="uploadFileHandle" style="margin-left: 5px;">{{language('上传')}}</iButton>
    </div>
    <div class="reset_style">
      <iButton @click="save">{{language('确认')}}</iButton>
      <iButton @click="close">{{language('取消')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iFormItem, iInput, iSelect,iUpload } from 'rise'
import iEditor from '@/components/iEditor'
export default {
  name: 'finishedDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      query: {
        type: '',
      },
      options: [],
      editForm: {},
      editFormRules: {},
      editable: true,
      fileName: '',
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
      this.closeDiologBtn();
    },
    startUploadFile() {
      this.$refs.upload.$el.querySelector("input[type='file']").click()
    },
    uploadFileHandelCallback(fileList) {
      console.log(fileList, '上传文件返回');
      setTimeout(() => {
        this.fileName = '文件名称';
      },1000);
    },
    uploadFileHandle() {},
  },
  computed: {
    computed: {
      editToolbar () {
        return []
      },
    },
  },
  components: {
    iDialog,
    iButton,
    iFormItem,
    iInput,
    iSelect,
    iEditor,
    iUpload
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
