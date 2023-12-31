<template>
  <iDialog
    :title="language(dialogTitle)"
    :visible.sync="contentShow"
    v-if="contentShow"
    width="60%"
    @close="close"
    append-to-body
  >
    <el-form
      label-position="left"
      :model="newContentForm"
      :rules="newContentRules"
      label-width="120px"
      class="contentForm validate-required-form"
      v-loading="loading"
      ref="knowledgeContentForm"
    >
      <iFormItem :label="language('知识分享类型')" prop="knowledgeSection">
        <iSelect
          v-model="newContentForm.knowledgeSection"
          filterable
          :placeholder="language('请选择knowledge类型')"
          clearable
          @change="handleSection"
        >
          <el-option
            :disabled="disabled"
            v-for="item in knowledgeSectionList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem :label="language('知识标题')" prop="title">
        <iInput
          v-model="newContentForm.title"
          :placeholder="language('请输入知识标题')"
          maxLength="50"
        ></iInput>
      </iFormItem>
      <iFormItem :label="language('知识概要')" prop="summary">
        <iInput
          resize="none"
          :rows="2"
          type="textarea"
          v-model="newContentForm.summary"
          placeholder=""
          maxLength="100"
        ></iInput>
      </iFormItem>
      <iFormItem :label="language('主讲人')" prop="speaker">
        <iInput
          v-model="newContentForm.speaker"
          :placeholder="language('请输入主讲人')"
        ></iInput>
      </iFormItem>
      <iFormItem :label="language('开课日期')" prop="beginDate">
        <el-date-picker
          v-model="newContentForm.beginDate"
          type="date"
          :placeholder="language('请选择开课日期')"
        >
        </el-date-picker>
      </iFormItem>
      <iFormItem :label="language('知识分类')" prop="knowledgeCategory">
        <iSelect
          v-model="newContentForm.knowledgeCategory"
          filterable
          :placeholder="language('请选择知识分类')"
          clearable
          multiple
        >
          <el-option
            v-for="item in knowledgeCategoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem :label="language('所属科室')" prop="organizations">
        <iSelect
          v-model="newContentForm.organizations"
          filterable
          :placeholder="language('请选择所属科室')"
          clearable
          multiple
        >
          <el-option
            v-for="item in organizationsList"
            :key="item.id"
            :label="item.fullCode || item.nameEn"
            :value="item.id"
          >
          </el-option>
        </iSelect>
      </iFormItem>
      <iFormItem :label="language('上传附件')">
        <iUpload
          v-model="fileList"
          maxSize="10"
          :limit="1"
          :uploadHandle="uploadHandle"
          :removeHandle="removeHandle"
          :isCustHttp="true"
        >
          <div>
            <iButton>{{ language('添加附件') }}</iButton>
            <!-- CIRW2-697 【Pro CS】知识管理，上传附件，页面提示一个最大10兆的文案 -->
            <span style="margin-left: 20px" @click.stop="">
              {{ language('文件大小最大限制10MB！') }}
            </span>
          </div>
        </iUpload>
      </iFormItem>
      <iFormItem :label="language('上传知识封面')" prop="coverFile">
        <el-radio-group v-model="newContentForm.coverFile"></el-radio-group>

        <ImgCutter
          class="avatar-uploader"
          fileType=".jpg, .jpeg, .png"
          :rate="imgCutterRate"
          @cutDown="upload"
        >
          <div slot="open">
            <img
              v-if="imageUrl"
              :src="imageUrl"
              @error="handleImageError"
              class="avatar"
            />
            <!-- <img v-else src="../../../assets/images/popupPic.png"   class="avatar"> -->
            <i v-else class="el-icon-circle-plus-outline avatar-uploader-icon">
            </i>
          </div>
        </ImgCutter>
        <div v-if="imgName" class="delete-box" @click="deleteImg">
          {{ `移除${imgName}` }}
        </div>
      </iFormItem>
    </el-form>
    <div class="flex justify-end btn">
      <iButton @click="close">{{ language('取消') }}</iButton>
      <iButton @click="sure">{{ language('确定') }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput, iSelect, iButton } from 'rise'
import iUpload from '../components/iUpload.vue'
import ImgCutter from 'vue-img-cutter'
import { uploadFileWithNOTokenTwo } from '@/api/file/upload'
import {
  queryCurrType,
  getCurrCategory,
  createKnowledgeContent,
  modifyKnowledgeContent
} from '@/api/adminProCS'
import { getDeptByCondition } from '@/api/usercenter'
export default {
  name: 'addKnowledgeContent',
  components: {
    iDialog,
    iFormItem,
    iInput,
    iSelect,
    iUpload,
    iButton,
    ImgCutter
  },
  data() {
    return {
      newContentForm: {
        knowledgeSection: '',
        title: '',
        summary: '',
        speaker: '',
        beginDate: '',
        knowledgeCategory: [],
        organizations: [],
        coverFile: ''
      },
      newContentRules: {
        knowledgeSection: {
          required: 'true',
          message: this.language('请选择知识分享类型'),
          trigger: 'select'
        },
        title: {
          required: 'true',
          message: this.language('请输入知识标题'),
          trigger: 'blur'
        },
        summary: {
          required: 'true',
          message: this.language('请输入知识概要'),
          trigger: 'blur'
        },
        speaker: {
          required: 'true',
          message: this.language('请输入主讲人'),
          trigger: 'blur'
        },
        beginDate: {
          required: 'true',
          message: this.language('请选择开课日期'),
          trigger: 'blur'
        },
        knowledgeCategory: {
          required: 'true',
          message: this.language('请选择知识分类'),
          trigger: 'change'
        },
        organizations: {
          required: 'true',
          message: this.language('请选择所属科室'),
          trigger: 'change'
        },
        coverFile: {
          required: 'true',
          message: this.language('请上传文件'),
          trigger: 'change'
        }
      },
      acceptPicType: 'image/*',
      // 调取接口
      knowledgeSectionList: [],
      // 选择知识类型时 获取知识分类
      knowledgeCategoryList: [],
      // 调取接口获取科室数据
      organizationsList: [],
      imgCutterRate: '16 : 9',
      imageUrl: '',
      uploadFileStream: null,
      coverFile: null,
      fileList: [],
      loading: false,
      modifyContentId: null,
      disabled:false
    }
  },
  props: {
    operateType: {
      type: String,
      default: 'add'
    },
    contentShow: {
      type: Boolean,
      default: false
    },
    manageType: {
      type: String,
      default: 'content'
    }
  },
  computed: {
    dialogTitle() {
      return this.operateType === 'add'
        ? '新增知识分享内容'
        : '修改知识分享内容'
    }
  },
  created() {
    if (this.manageType === 'content') {
      this.getCurrTypeList()
      this.organizationsInfo()
    }
  },
  methods: {
    async getCurrTypeList() {
      this.knowledgeSectionList = []
      await queryCurrType().then((res) => {
        if (res) {
          res.map((item) => {
            this.knowledgeSectionList.push({
              label: item.name,
              id: item.id
            })
          })
        }
      })
    },
    closeDialogBtn() {
      Object.keys(this.newContentForm).map(
        (key) => (this.newContentForm[key] = '')
      )
      this.$emit('update:contentShow', false)
    },
    close() {
      this.closeDialogBtn()
      Object.keys(this.newContentForm).map(
        (key) => (this.newContentForm[key] = '')
      )
      this.imageUrl = ''
      this.coverFile = null
      this.uploadFileStream = null
      this.imgName = ''
      this.fileList = []
      this.$emit('refresh')
    },
    handleImageError() {
      let img = document.querySelector('avatar')
      if (img) {
        img.src = this.linkUrl()
      }
    },
    linkUrl() {
      return this.imageUrl
    },
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 10240 / 10240 < 10
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isLt10M
    },
    async upload(content) {
      let form = new FormData()
      form.append('file', content.file)
      form.append('applicationName', 'popupImage')
      console.log(content, '12345')
      this.coverFile = content.dataURL
      uploadFileWithNOTokenTwo(form).then((result) => {
        if (result.code == '200') {
          console.log(result, '12222')
          let data = result.data
          this.imageUrl = data.path
          this.newContentForm.coverFile = data.path
          this.imgName = `${data?.name.split('.')[0]}.${data?.extensionName}`
          this.$emit('imgUrl', this.imageUrl)
        } else {
          this.$message.error(result.desZh)
        }
      })
    },
    deleteImg() {
      this.imageUrl = ''
    },
    async handleSection(va) {
      if(this.disabled) return
      this.disabled = true
      this.getCurrCategoryData(va)
    },
    async getCurrCategoryData(va) {
      this.newContentForm.knowledgeCategory = []
      await getCurrCategory(va).then((res) => {
        if (res) {
          this.knowledgeCategoryList = res
        }
      }).finally(()=>{
        this.disabled = false
      })
    },
    sure() {
      this.$refs.knowledgeContentForm.validate(async (v) => {
        if (v) {
          try {
            this.newContentForm.openingDate = moment(
              this.newContentForm.beginDate
            ).format('YYYY-MM-DD HH:mm:ss')
            this.newContentForm.file = this.uploadFileStream // 老系统修改的时候没有传值
            this.newContentForm.coverFileName =
              this.imgName || `${this.newContentForm.title}.png`
            // this.newContentForm.coverFile = this.coverFileName
            // this.newContentForm.coverFile = this.imageUrl || ""
            let formData = new FormData()
            Object.keys(this.newContentForm).forEach((key) => {
              formData.append(key, this.newContentForm[key])
            })
            this.loading = true
            if (this.operateType === 'add') {
              await createKnowledgeContent(formData).then((res) => {
                if (res) {
                  this.$message({
                    type: 'success',
                    message: '新增知识内容成功.'
                  })
                  this.loading = false
                }
              })
            } else {
              await modifyKnowledgeContent(this.modifyContentId, formData).then(
                (res) => {
                  if (res) {
                    this.$message({
                      type: 'success',
                      message: '修改知识内容成功.'
                    })
                    this.loading = false
                  }
                }
              )
            }
            this.close()
          } finally {
            this.loading = false
          }
        }
      })
    },
    async initModify(currVa) {
      console.log(currVa)
      this.loading = true
      await this.getCurrTypeList()
      await this.organizationsInfo()
      this.modifyContentId = currVa.id
      let obj = {
        speaker: currVa.speaker,
        summary: currVa.summary,
        title: currVa.title
      }
      Object.assign(this.newContentForm, obj)
      await this.getCurrCategoryData(currVa.section?.id)
      this.loading = false
      this.newContentForm.knowledgeSection = currVa.section?.id
      this.newContentForm.beginDate = currVa.openingDate
      this.newContentForm.organizations = currVa.organizations.map((e) => e.id)
      currVa.category.map((item) => {
        this.newContentForm.knowledgeCategory.push(item.id)
      })
      if (currVa.attachMents.length > 0) {
        this.fileList.push({
          fileName: currVa.attachMents[0].originalFileName,
          fileUrl: currVa.attachMents[0].url.split('uploader/')[1]
        })
      }
      this.imageUrl = currVa?.cover.split('uploader/')[1]
      this.coverFile = this.imageUrl
      this.newContentForm.coverFile = this.imageUrl
      // this.imgName = `${currVa.title}.png`
    },
    uploadHandle(file) {
      console.log(file, '2222')
      this.uploadFileStream = file
      return new Promise((resolve) => {
        resolve({
          name: file.name
        })
      })
    },
    removeHandle(file, idx) {
      this.fileList.splice(idx, 1)
    },
    async organizationsInfo() {
      await getDeptByCondition({ deptNum: 'CS', gradeAbove: 3 }).then((res) => {
        this.organizationMenu = res.data || []
        this.organizationsList = this.organizationMenu
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
.contentForm {
  padding-bottom: 20px;
}
.delete-box {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #d0d4d9;
  cursor: pointer;
  color: #f8f8fa;
  background-color: red;
}
.avatar-uploader {
  z-index: 9999;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 360px;
  height: 220px;
  line-height: 220px;
  text-align: center;
  background-color: #f8f8fa;
  border: 1px dashed #d0d4d9;
  border-radius: 2px;
  width: 100%;
  margin-top: 20px;
}
.avatar {
  width: 100%;
  margin-top: 20px;
}
.btn {
  padding-bottom: 20px;
}
</style>
