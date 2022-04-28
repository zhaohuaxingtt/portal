<template>
  <div v-loading="loading">
    <el-form
      :model="form"
      :rules="rules"
      label-width="120px"
      ref="form"
      :inline="type == 'edit'"
      class="validate-required-form process-form"
    >
      <iFormItem
        :label="language('流程标题')"
        prop="name"
        :class="{ 'form-item': type === 'edit' }"
      >
        <iInput
          v-model="form.name"
          class="w-300"
          :placeholder="language('请输入流程标题')"
        ></iInput>
      </iFormItem>
      <iFormItem
        :label="language('首字母')"
        prop="firstLetter"
        :class="{ 'form-item': type === 'edit' }"
      >
        <iInput
          v-model="form.firstLetter"
          class="w-300"
          :placeholder="language('请输入标题首字母')"
        ></iInput>
      </iFormItem>
      <iFormItem
        :label="language('英文标题')"
        prop="nameEn"
        :class="{ 'form-item': type === 'edit' }"
      >
        <iInput
          v-model="form.nameEn"
          class="w-300"
          :placeholder="language('请输入英文标题')"
        ></iInput>
      </iFormItem>
      <iFormItem
        :label="language('英文首字母')"
        prop="firstLetterEn"
        :class="{ 'form-item': type === 'edit' }"
      >
        <iInput
          v-model="form.firstLetterEn"
          class="w-300"
          :placeholder="language('请输入英文标题首字母')"
        ></iInput>
      </iFormItem>
      <iFormItem
        :label="language('版本号')"
        prop="version"
        :class="{ 'form-item': type === 'edit' }"
      >
        <iInput
          v-model="form.version"
          class="w-300"
          :placeholder="language('请输入版本号')"
        ></iInput>
      </iFormItem>

      <iFormItem
        :label="language('更新日期')"
        prop="updateDt"
        :class="{ 'form-item': type === 'edit' }"
      >
        <iDatePicker
          type="date"
          v-model="form.updateDt"
          class="w-300"
          :placeholder="language('请选择')"
        />
      </iFormItem>
      <iFormItem
        :label="language('流程专家')"
        prop="experts"
        :class="{ 'form-item': type === 'edit' }"
      >
        <iSelect
          v-model="form.experts"
          class="w-300"
          filterable
          remote
          reserve-keyword
          :remote-method="queryUser"
          :loading="experts_loading"
          multiple
          :placeholder="language('可进行搜索')"
        >
          <el-option
            v-for="user in userList"
            :key="user.id"
            :label="user.name"
            :value="user.id"
          ></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem
        :label="language('关联机构')"
        prop="organizations"
        :class="{ 'form-item': type === 'edit' }"
      >
        <iSelect
          v-model="form.organizations"
          class="w-300"
          remote
          reserve-keyword
          :remote-method="queryOrg"
          :loading="org_loading"
          filterable
          multiple
          :placeholder="language('可进行搜索')"
        >
          <el-option
            v-for="org in orgList"
            :key="org.id"
            :label="org.nameEn"
            :value="org.id"
          ></el-option>
        </iSelect>
      </iFormItem>
      <iFormItem
        :label="language('发布范围')"
        :class="{ 'form-item': type === 'edit' }"
      >
        <iSelect v-model="form.rangeType" class="w-300">
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
        :class="{ 'form-item': type === 'edit' }"
        v-if="form.rangeType === 15"
      >
        <userSelector
          v-model="form.rangeUser"
          label-key="nameZh"
          value-key="accountId"
          class="w-300"
          @change="userListChange"
        />
      </iFormItem>
      <iFormItem
        v-if="form.rangeType === 15"
        prop="rangeSupplier"
        :label="language('选择供应商')"
        :class="{ 'form-item': type === 'edit' }"
      >
        <supplierSelect
          v-model="form.rangeSupplier"
          @change="supplierListChange"
          class="w-300"
        />
      </iFormItem>
    </el-form>
    <div class="flex felx-row mt20 pb20 justify-end">
      <iButton @click="reset" v-if="type == 'add'">
        {{ language('取消') }}
      </iButton>
      <iButton @click="$router.back()" v-else>{{ language('返回') }}</iButton>
      <iButton @click.native="save">{{ language('保存') }}</iButton>
    </div>
  </div>
</template>

<script>
import { iFormItem, iInput, iDatePicker, iButton, iSelect } from 'rise'
import userSelector from '@/components/userSelector'
import supplierSelect from '@/views/popupWindowManagement/components/supplierSelect'
import {
  getOrganizationList,
  getUsersList,
  addProcess,
  updateProcess,
  getProcess
} from '@/api/adminProCS'
import moment from 'moment'
export default {
  components: {
    iFormItem,
    iInput,
    iDatePicker,
    iButton,
    userSelector,
    iSelect,
    supplierSelect
  },
  props: {
    type: {
      type: String,
      default: 'add'
    }
  },
  data() {
    let firstLetter_valid = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.language('请输入标题首字母')))
        return
      }
      if (value.length > 1)
        return callback(new Error(this.language('只能填写一个字母')))
      var reg = /^[A-Z]+$/ //验证规则
      if (reg.test(value)) {
        callback()
        return
      } else {
        callback(new Error(this.language('请输入大写字母')))
      }
    }
    let enName_valid = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.language('请输入英文名')))
        return
      }
      var reg = /^[a-z A-Z]+$/ //验证规则
      if (reg.test(value)) {
        callback()
        return
      } else {
        callback(new Error(this.language('请输入英文名')))
      }
    }
    const validateUserList = (rule, value, callback) => {
      if (
        value.length === 0 &&
        this.form.rangeSupplier.length === 0 &&
        this.form.rangeType === 15
      ) {
        callback(new Error('请选择用户'))
      } else {
        callback()
      }
    }
    const validateSupplierList = (rule, value, callback) => {
      if (
        value.length === 0 &&
        this.form.rangeUser.length === 0 &&
        this.form.rangeType === 15
      ) {
        callback(new Error('请选择供应商'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      form: {
        name: '',
        firstLetter: '',
        nameEn: '',
        firstLetterEn: '',
        version: '',
        updateDt: '',
        experts: [],
        organizations: [],
        rangeType: 0,
        rangeUser: [],
        rangeSupplier: []
      },
      rules: {
        name: [
          {
            required: true,
            message: this.language('请输入流程标题'),
            trigger: 'blur'
          },
          { max: 50, message: this.language('流程标题长度不能超过50个字符！') }
        ],
        firstLetter: {
          required: true,
          validator: firstLetter_valid,
          trigger: 'blur'
        },
        nameEn: [
          { required: true, validator: enName_valid, trigger: 'blur' },
          {
            max: 100,
            message: this.language('英文标题长度不能超过100个字符！')
          }
        ],
        firstLetterEn: {
          required: true,
          validator: firstLetter_valid,
          trigger: 'blur'
        },
        version: [
          {
            required: true,
            message: this.language('请输入版本号'),
            trigger: 'blur'
          },
          {
            max: 20,
            message: this.language('版本号长度不能超过20个字符！'),
            trigger: 'blur'
          }
        ],
        updateDt: {
          required: true,
          message: this.language('请选择更新时间'),
          trigger: 'change'
        },
        experts: {
          required: true,
          message: this.language('请输入用户名、邮箱进行搜索'),
          trigger: 'blur'
        },
        organizations: {
          required: true,
          message: this.language('请至少输入2个字符进行搜索'),
          trigger: 'blur'
        },
        rangeUser: [{ validator: validateUserList, trigger: 'change' }],
        rangeSupplier: [{ validator: validateSupplierList, trigger: 'change' }]
      },
      orgList: [],
      allOrgList: [],
      userList: [],
      loading: false,
      experts_loading: false,
      org_loading: false,
      onceGetUser: true,
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
  created() {
    this.organizationList()
    this.queryUsersList()
  },

  methods: {
    async queryDetail(id) {
      try {
        this.loading = true
        const formData = await getProcess(id)
        const experts = formData.experts
          ? formData.experts.map((e) => e.id)
          : []
        const rangeUser = formData.rangeUser
          ? formData.rangeUser.map((e) => {
              return {
                nameZh: e.name || e.nameZh,
                accountId: parseInt(e.accountId || e.id)
              }
            })
          : []
        const rangeSupplier = formData.rangeSupplier
          ? formData.rangeSupplier.map((e) => {
              return {
                nameZh: e.name || e.nameZh,
                id: parseInt(e.id)
              }
            })
          : []
        const organizations = formData.organizations
          ? formData.organizations.map((e) => e.id)
          : []
        this.form = {
          ...formData,
          experts,
          rangeUser,
          organizations,
          rangeSupplier
        }
        this.loading = false
        return this.form
      } finally {
        this.loading = false
      }
    },
    queryUser(v) {
      this.queryUsersList(v)
    },
    queryOrg(v) {
      // if(this.type != "add"){
      // 	this.org_loading = true
      // 	this.orgList = this.allOrgList.filter(e => e.name.includes(v))
      // 	this.org_loading = false
      // }
      this.org_loading = true
      this.orgList = this.allOrgList.filter((e) => e.name.includes(v))
      this.org_loading = false
    },
    save() {
      this.$refs.form.validate(async (v) => {
        if (v) {
          // 保存
          try {
            this.loading = true
            this.form.updateDt = moment(this.form.updateDt).format(
              'YYYY-MM-DD HH:mm:ss'
            )
            const submitData = _.cloneDeep(this.form)

            if (submitData.rangeUser) {
              submitData.rangeUser = submitData.rangeUser
                .map((e) => e.accountId)
                .join(',')
            }
            if (submitData.rangeSupplier) {
              submitData.rangeSupplier = submitData.rangeSupplier
                .map((e) => e.id)
                .join(',')
            }
            let formData = new FormData()
            Object.keys(submitData).forEach((key) => {
              if (key === 'Experts' || key === 'organizations') {
                submitData[key].forEach((e) => {
                  if (e) {
                    formData.append(key, e)
                  }
                })
              } else {
                formData.append(key, submitData[key])
              }
            })
            formData.append('type', 'WorkFlow')
            if (this.type == 'add') {
              await addProcess(formData).then((res) => {
                if (res) {
                  this.$message({ type: 'success', message: '新增流程成功' })
                  this.reset()
                  this.$emit('refresh')
                  this.$emit('close')
                }
              })
            } else {
              await updateProcess(this.form.id, formData)
              this.$message({ type: 'success', message: '保存成功' })
            }
          } finally {
            this.loading = false
          }
        }
      })
    },
    async organizationList() {
      this.allOrgList = await getOrganizationList()
      if (this.type == 'add') {
        this.orgList = this.allOrgList.splice(0, 20)
      } else {
        this.orgList = this.allOrgList
      }
    },
    async queryUsersList(keyword) {
      let params = {
        keyword: keyword || ''
      }
      try {
        this.experts_loading = true
        let res = await getUsersList(params)
        console.log('usersList')
        if (this.type != 'add' && this.onceGetUser) {
          let uIds = res.map((e) => e.id)
          let many = this.form.Experts
            ? this.form.Experts.filter((e) => !uIds.includes(e.id))
            : []
          this.userList = [...res, ...many]
          this.onceGetUser = false
        } else {
          this.userList = res
        }
      } finally {
        this.experts_loading = false
      }
    },
    reset() {
      this.form = {
        name: '',
        firstLetter: '',
        nameEn: '',
        firstLetterEn: '',
        version: '',
        updateDt: '',
        experts: '',
        organizations: '',
        rangeType: 0,
        rangeUser: [],
        rangeSupplier: []
      }
      this.$refs.form.resetFields()
      this.$emit('close')
    },
    userListChange(val) {
      this.form.rangeUser = val
        .filter((e) => e.accountId)
        .map((e) => {
          return {
            nameZh: e.name || e.nameZh,
            accountId: parseInt(e.accountId)
          }
        })
    },
    supplierListChange(val) {
      this.form.rangeSupplier = val
        .filter((e) => e.subSupplierId)
        .map((e) => {
          return {
            nameZh: e.name || e.nameZh,
            id: parseInt(e.subSupplierId)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../comon.scss';
// .process-form {
//   ::v-deep &.el-form--inline {
//     .el-form-item {
//       margin-right: 30px !important;
//     }
//   }
// }

::v-deep .el-loading-mask {
  z-index: 2000;
}
.form-item {
  width: 25%;
  margin-right: 0px !important;
}
</style>
