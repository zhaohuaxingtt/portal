<template>
  <iDialog
    :visible.sync="dialogFormVisible"
    width="90%"
    miniHeight="80%"
    @close="onClose"
    lock-scroll="false"
    destroy-on-close="true"
  >
    <div class="main" v-loading="loading">
      <div class="titleHeader">
        <span v-if="!isRead && !isEdit">{{ formTitles.createTitle }}</span>
        <span v-if="isEdit || isRead">{{ formTitles.editTitle }}</span>
      </div>
      <div class="content">
        <el-form label-position="left" label-width="110px">
          <el-row gutter="20">
            <el-col :span="8">
              <iFormItem :label="formTitles.name">
                <iInput
                  :placeholder="formTitles.input"
                  :disabled="isRead"
                  v-model="formData.appNameCn"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="formTitles.nameEN">
                <iInput
                  :placeholder="formTitles.input"
                  :disabled="isRead"
                  v-model="formData.appNameEn"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="formTitles.description">
                <iInput
                  :placeholder="formTitles.input"
                  :disabled="isRead"
                  v-model="formData.description"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="formTitles.sysType">
                <iSelect v-model="formData.systemType" :disabled="isRead">
                  <el-option
                    v-for="item in systemOptions"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="8" v-if="formData.systemType === '2'">
              <iFormItem :label="$t('父级菜单')">
                <iSelect v-model="formData.parentResourceId" :disabled="isRead">
                  <el-option
                    v-for="item in rootMenus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="8" v-if="formData.systemType === '2'">
              <iFormItem :label="$t('Url')">
                <iInput v-model="formData.url" :disabled="isRead"></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="formTitles.sysTag">
                <iSelect
                  v-model="formData.supplierType"
                  :disabled="isRead"
                  multiple
                >
                  <el-option
                    v-for="item in systemTagOptions"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="8" v-if="formData.systemType === '1'">
              <iFormItem label="App Code">
                <iInput v-model="formData.appCode" :disabled="isRead"></iInput>
              </iFormItem>
            </el-col>
          </el-row>
          <el-row gutter="20">
            <el-col :span="24">
              <div class="buttons">
                <iButton v-if="isRead" @click="edit">
                  {{ buttonTitles.edit }}
                </iButton>
                <iButton v-if="!isRead" @click="comfirm">
                  {{ buttonTitles.true }}
                </iButton>
                <iButton v-if="!isRead" @click="reset">
                  {{ buttonTitles.reset }}
                </iButton>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iFormItem, iInput, iSelect, iButton, iDialog, iMessage } from 'rise'
import {
  createSys,
  editSys,
  sysDetail,
  fetchSupplierRootMenu
} from '@/api/provider/index'
import { SYSTEM_TAGS } from '@/views/provider/data'
export default {
  name: 'UserApplicationDetail',
  methods: {
    onClose() {
      this.$emit('close')
    },
    edit() {
      this.isRead = false
      this.isEdit = true
    },
    getDetail() {
      this.loading = true
      let param = { id: this.id }
      sysDetail(param)
        .then((val) => {
          if (val.code == 200) {
            this.loading = false
            let {
              appNameCn,
              appNameEn,
              description,
              systemType,
              supplierType,
              url,
              parentResourceId,
              appCode
            } = val.data

            systemType = '' + systemType
            supplierType = supplierType ? supplierType.split(',') : []
            this.formData = {
              appNameCn,
              appNameEn,
              description,
              systemType,
              supplierType,
              url,
              parentResourceId,
              appCode
            }
          } else {
            iMessage.error(val.desZh || '获取数据失败')
          }
        })
        .catch((error) => {
          this.loading = false
          console.log('-----error ==', error)
          iMessage.error('获取数据失败')
        })
    },
    comfirm() {
      //确认
      if (this.isEdit) {
        //编辑系统
        this.loading = true
        let newFormData = _.cloneDeep(this.formData)
        newFormData.supplierType = newFormData.supplierType.join(',')
        let param = { ...newFormData, id: this.id }
        editSys(param)
          .then((val) => {
            if (val.code == 200) {
              //编辑成功
              this.loading = false
              this.dialogFormVisible = false
              this.$emit('update')
            } else {
              iMessage.error(val.desZh || '编辑失败')
            }
          })
          .catch(() => {
            this.loading = false
            iMessage.error('编辑失败')
          })
      } else {
        //创建系统
        this.loading = true
        let newFormData = _.cloneDeep(this.formData)
        newFormData.supplierType = newFormData.supplierType.join(',')
        let param = { ...newFormData, id: this.id }
        createSys(param)
          .then((val) => {
            if (val.code == 200) {
              //创建成功
              this.loading = false
              this.dialogFormVisible = false
              this.$emit('update')
            } else {
              iMessage.error(val.desZh || '创建失败')
            }
          })
          .catch(() => {
            this.loading = false
            iMessage.error('创建失败')
          })
      }
    },
    reset() {
      //重置
      this.formData = this.defaultFormData()
    },
    defaultFormData() {
      return {
        appNameCn: '',
        appNameEn: '',
        description: '',
        systemType: '',
        supplierType: []
      }
    }
  },
  created() {
    this.dialogFormVisible = this.visible
    if (this.isRead) {
      this.getDetail()
    }
    fetchSupplierRootMenu().then((res) => {
      this.rootMenus = res.data
    })
  },
  components: {
    iFormItem,
    iInput,
    iSelect,
    iButton,
    iDialog
  },
  watch: {
    visible() {
      this.dialogFormVisible = this.visible
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isRead: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      formData: {
        appNameCn: '',
        appNameEn: '',
        description: '',
        systemType: '',
        supplierType: [],
        appCode: ''
      },
      formTitles: {
        name: '中文名称',
        nameEN: '英文名称',
        group: '门户用户组',
        ldap: 'LDAP属性',
        type: '功能类型',
        sysType: '系统类型',
        sysTag: '系统标签',
        description: '系统功能说明',
        createTitle: '新建/编辑页面',
        editTitle: 'Infomess应用',
        input: '请输入',
        iselect: '请选择',
        appCode: 'App Code'
      },
      buttonTitles: {
        edit: '编辑',
        true: '确认',
        reset: '重置'
      },
      systemOptions: [
        {
          id: '1',
          label: '系统'
        },
        {
          id: '2',
          label: 'Scenario'
        }
      ],
      systemTagOptions: SYSTEM_TAGS,
      rootMenus: []
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 60vh;
}

.titleHeader {
  font-size: 20px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
