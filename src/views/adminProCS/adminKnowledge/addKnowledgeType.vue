<template>
  <iDialog
    :title="language(dialogTitle)"
    style="margin-top: 10vh"
    :visible.sync="typeShow"
    v-if="typeShow"
    v-loading="loading"
    width="60%"
    @close="close"
    append-to-body
  >
    <el-form
      label-position="left"
      :model="newTypeForm"
      ref="knowledgeTypeForm"
      :rules="newTypeRules"
      label-width="100px"
      class="typeForm validate-required-form"
    >
      <iFormItem :label="language('知识类型')" prop="name">
        <iInput
          v-model="newTypeForm.name"
          :placeholder="language('请输入类型名称')"
        ></iInput>
      </iFormItem>
      <iFormItem :label="language('英文名')" prop="enName">
        <iInput
          v-model="newTypeForm.enName"
          :placeholder="language('请输入知识英文名称')"
        ></iInput>
      </iFormItem>
      <iFormItem :label="language('封面图片')" prop="coverFile">
        <el-radio-group v-model="newTypeForm.coverFile"></el-radio-group>

        <div class="photo-content">
          <ImgCutter
            class="avatar-uploader"
            fileType=".jpg, .jpeg, .png"
            :rate="imgCutterRate"
            @cutDown="upload"
            :file-list="fileList"
          >
            <div slot="open">
              <div class="photo-text">{{ language('请上传封面图片') }}</div>
              <img
                v-if="imageUrl"
                :src="imageUrl"
                @error="handleImageError"
                class="avatar"
              />
              <!-- <img v-else src="../../../assets/images/popupPic.png"   class="avatar"> -->
              <i
                v-else
                class="el-icon-circle-plus-outline avatar-uploader-icon"
              >
              </i>
            </div>
          </ImgCutter>
          <div v-if="imgName" class="delete-box" @click="deleteImg">
            {{ `移除${imgName}` }}
          </div>
        </div>
      </iFormItem>
      <iFormItem :label="language('发布范围')">
        <iSelect v-model="newTypeForm.rangeType">
          <el-option
            v-for="item in scopeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </iSelect>
      </iFormItem>
      <iFormItem
        :label="language('选择用户')"
        prop="rangeUser"
        v-if="newTypeForm.rangeType === 15"
      >
        <userSelector
          v-model="newTypeForm.rangeUser"
          label-key="nameZh"
          value-key="accountId"
          @change="userListChange"
        />
      </iFormItem>
    </el-form>
    <div class="flex justify-end btn">
      <iButton @click="close">{{ language('取消') }}</iButton>
      <iButton @click="sure">{{ language('确定') }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput, iButton, iSelect } from 'rise'
import userSelector from '@/components/userSelector'
import ImgCutter from 'vue-img-cutter'
import { uploadFileWithNOTokenTwo } from '@/api/file/upload'
import { createKnowledgeType, modifyKnowledgeTypeById } from '@/api/adminProCS'
export default {
  name: 'addKnowledgeType',
  components: {
    iDialog,
    iFormItem,
    iInput,
    ImgCutter,
    iButton,
    userSelector,
    iSelect
  },
  props: {
    operateType: {
      type: String,
      default: 'add'
    },
    typeShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let enName_valid = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.language('请输入英文名')))
        return
      }
      var reg = /^[ a-zA-Z]+$/ //验证规则
      if (reg.test(value)) {
        callback()
        return
      } else {
        callback(new Error(this.language('请输入英文名')))
      }
    }
    const validateUserList = (rule, value, callback) => {
      if (value.length === 0 && this.form.rangeType === 15) {
        callback(new Error('请选择用户'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      newTypeForm: {
        name: '',
        enName: '',
        coverFile: '',
        rangeType: 0,
        rangeUser: []
      },
      newTypeRules: {
        name: {
          required: 'true',
          message: this.language('请输入类型名称'),
          trigger: 'blur'
        },
        enName: { required: 'true', validator: enName_valid, trigger: 'blur' },
        coverFile: {
          required: 'true',
          message: this.language('请上传文件'),
          trigger: 'change'
        },
        rangeUser: [{ validator: validateUserList, trigger: 'change' }]
      },
      imgCutterRate: '16 : 9',
      fileList: [],
      imageUrl: '',
      loading: false,
      modifyFlag: false,
      modifyTypeId: null,
      scopeOptions: [
        {
          label: '全体用户',
          value: 0
        },
        {
          label: '全体采购员工用户',
          value: 1
        },
        {
          label: '全体内部员工用户',
          value: 2
        },
        {
          label: '全体供应商用户',
          value: 3
        },
        {
          label: '全体供应商主联系人用户',
          value: 4
        },
        {
          label: '全体生产采购供应商用户',
          value: 5
        },
        {
          label: '全体生产采购供应商主联系人用户',
          value: 6
        },
        {
          label: '全体生产采购正式供应商用户',
          value: 7
        },
        {
          label: '全体生产采购正式供应商主联系人用户',
          value: 8
        },
        {
          label: '全体一般采购供应商用户',
          value: 9
        },
        {
          label: '全体一般采购供应商主联系人用户',
          value: 10
        },
        {
          label: '全体一般采购正式供应商用户',
          value: 11
        },
        {
          label: '全体一般采购正式供应商主联系人用户',
          value: 12
        },
        {
          label: '全体N_Tier供应商用户',
          value: 13
        },
        {
          label: '全体N_Tier供应商主联系人用户',
          value: 14
        },
        {
          label: '自定义',
          value: 15
        }
      ]
    }
  },
  methods: {
    closeDialogBtn() {
      this.$emit('update:typeShow', false)
    },
    close() {
      this.closeDialogBtn()
      this.clearFormVal()
      this.$emit('refresh')
      this.imageUrl = ''
      this.imgName = ''
      this.coverFile = ''
      this.modifyFlag = false
    },
    clearFormVal() {
      Object.keys(this.newTypeForm).map((key) => (this.newTypeForm[key] = ''))
    },
    handleImageError() {
      let img = document.querySelector('avatar')
      img.src = this.linkUrl()
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
      this.coverFile = content.dataURL
      uploadFileWithNOTokenTwo(form).then((result) => {
        if (result.code == '200') {
          console.log(result, '12222')
          let data = result.data
          this.imageUrl = data.path
          this.newTypeForm.coverFile = data.path
          this.imgName = `${data?.name.split('.')[0]}.${data?.extensionName}`
          this.$emit('imgUrl', this.imageUrl)
        } else {
          this.$message.error(result.desZh)
        }
      })
    },
    deleteImg() {
      this.imageUrl = ''
      this.imgName = ''
      this.coverFile = ''
    },
    sure() {
      this.$refs.knowledgeTypeForm.validate(async (v) => {
        if (v) {
          try {
            if (this.modifyFlag) {
              // this.newTypeForm.coverFile = this.coverFile ? this.coverFile : this.newTypeForm.coverFile
              // this.newTypeForm.coverFile = this.imageUrl || ""
              this.newTypeForm.coverFileName = this.imgName
                ? this.imgName
                : this.newTypeForm.coverFileName
              if (this.newTypeForm.rangeUser) {
                this.newTypeForm.rangeUser = this.newTypeForm.rangeUser.map(
                  (e) => e.accountId
                )
              }
              let formData = new FormData()
              Object.keys(this.newTypeForm).forEach((key) => {
                formData.append(key, this.newTypeForm[key])
              })
              await modifyKnowledgeTypeById(this.modifyTypeId, formData).then(
                (res) => {
                  if (res) {
                    this.$message({
                      type: 'success',
                      message: '修改知识类型成功.'
                    })
                    this.modifyFlag = false
                    this.loading = false
                  }
                }
              )
            } else {
              // this.newTypeForm.coverFile = this.coverFile
              // this.newTypeForm.coverFile = this.imageUrl || ""

              this.newTypeForm.coverFileName = this.imgName
              if (this.newTypeForm.rangeUser) {
                this.newTypeForm.rangeUser = this.newTypeForm.rangeUser.map(
                  (e) => e.accountId
                )
              }
              let formData = new FormData()
              Object.keys(this.newTypeForm).forEach((key) => {
                formData.append(key, this.newTypeForm[key])
              })
              this.loading = true
              await createKnowledgeType(formData).then((res) => {
                if (res) {
                  this.$message({
                    type: 'success',
                    message: '新增知识类型成功.'
                  })
                  this.loading = false
                }
              })
            }
            this.close()
          } finally {
            this.loading = false
            this.modifyFlag = false
          }
        }
      })
    },
    initModify(currVa) {
      console.log(currVa, '1111')
      const row = _.cloneDeep(currVa)
      this.modifyFlag = true
      this.modifyTypeId = row.id
      // this.newTypeForm = JSON.parse(JSON.stringify(currVa))
      this.newTypeForm.name = row.name
      this.newTypeForm.enName = row.enName
      this.newTypeForm.rangeType = row.rangeType
      if (row.rangeUser) {
        console.log('row.rangeUser', row.rangeUser)
        this.newTypeForm.rangeUser = row.rangeUser.map((e) => {
          return {
            nameZh: e.name,
            accountId: parseInt(e.accountId)
          }
        })
      } else {
        this.newTypeForm.rangeUser = []
      }

      this.imageUrl = currVa?.cover.split('uploader/')[1]
      this.newTypeForm.coverFile = this.imageUrl
      this.newTypeForm.coverFileName = `${currVa.name}.png`
    },
    userListChange(val) {
      console.log('userListChange', val)
      this.newTypeForm.rangeUser = val
        .filter((e) => e.accountId)
        .map((e) => {
          return {
            nameZh: e.name || e.nameZh,
            accountId: parseInt(e.accountId)
          }
        })
    }
  },
  computed: {
    dialogTitle() {
      return this.operateType === 'add' ? '新增知识类型' : '修改知识类型'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
.typeForm {
  padding-bottom: 20px;
}
.photo-content {
  .photo-text {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #d0d4d9;
    cursor: pointer;
  }
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
