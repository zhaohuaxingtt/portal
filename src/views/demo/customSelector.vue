<!--
/**
 * iSelectInput
 * @param   {string}       tagLabel      required:true      tag 显示的名字               默认：label
 * @param   {Array}        v-model       required:true      绑定值                       ——
 * @events  click          点击事件
 */
 -->
<!--
/**
 * iSelectDialog
 * @param   {Boolean}       show              required:true      tag 显示的名字               默认：'label'
 * @param   {Array}         tableSetting      required:true      表格列config                 默认：[]
 * @param   {Array}         filter            required:true      过滤条件                     默认：[]
 * @param   {String}        title             required:true      dialog 名称                  默认：'选择器'
 * @param   {Function}      search-method     required:true      获取tableData的方法          默认：null
 * @param   {String}        tag-label         required:true      选中值显示的名字对应的key     默认：'label'
 * @param   {Array}         v-model           required:true      绑定值                       ——
 * @events  change          model值改变触发
 */
 -->
<template>
  <div class="selector-demo">
    <el-form
      :model="demoForm"
      :rules="rules"
      ref="demoForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="选择器demo" prop="roles">
        <iSelectorInput
          :tagLabel="'fullNameZh'"
          v-model="demoForm.roles"
          @click.native="handleClick"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </el-form-item>
    </el-form>
    <i-selector-dialog
      :show.sync="dialogRoleVisible"
      @change="handleCallback"
      v-model="demoForm.roles"
      :tableSetting="selectorTableSetting"
      :filter="selectorQuery"
      :title="'角色选择'"
      :search-method="handleSearch"
      :tag-label="'fullNameZh'"
    ></i-selector-dialog>
  </div>
</template>

<script>
import iSelectorInput from '@/components/iSelector/iSelectorInput.vue'
import iSelectorDialog from '@/components/iSelector/iSelectorDialog.vue'
import { fetchRoles } from '@/api/role'
export default {
  components: {
    iSelectorInput,
    iSelectorDialog
  },
  data() {
    return {
      rules: {
        roles: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      disabled: false,

      demoForm: {
        // roles: []
        roles: [
          {
            current: 1,
            size: 20,
            id: 1,
            code: 'GZ',
            fullNameZh: 'admin',
            fullNameEn: 'Purchase Lead',
            fullNameDe: 'Purchase Lead',
            shortNameZh: '股长',
            shortNameEn: 'Purchase Lead',
            shortNameDe: 'Purchase Lead',
            description: null,
            type: true,
            level: '1',
            status: true,
            createBy: 1,
            createDate: null,
            updateBy: null,
            updateDate: null,
            isDelete: false,
            tagDTOList: null,
            menuList: null,
            resourceList: null,
            permissionList: null,
            permissionConfig:
              '{"261":{"permission":"DEPARTMENT","department":{"id":"","nameZh":""},"properties":[],"unCols":[]},"262":{"permission":"DEPARTMENT","department":{"id":"","nameZh":""},"properties":["所有者","材料","车型","项目"],"unCols":[]},"department":{"id":"","nameZh":""},"properties":["所有者","材料","车型","项目"]}'
          },
          {
            current: 1,
            size: 20,
            id: 7,
            code: 'ZYCGKZ',
            fullNameZh: '专业采购科长',
            fullNameEn: 'Purchase Staff',
            fullNameDe: 'Purchase Staff',
            shortNameZh: '专业采购科长',
            shortNameEn: 'Purchase Staff',
            shortNameDe: 'Purchase Staff',
            description: null,
            type: false,
            level: '1',
            status: true,
            createBy: 1,
            createDate: null,
            updateBy: null,
            updateDate: null,
            isDelete: false,
            tagDTOList: null,
            menuList: null,
            resourceList: null,
            permissionList: null,
            permissionConfig: null
          },
          {
            current: 1,
            size: 20,
            id: 9,
            code: 'ZYCGYA',
            fullNameZh: '专业采购员',
            fullNameEn: 'Purchase Staff',
            fullNameDe: 'Purchase Staff',
            shortNameZh: '专业采购员A',
            shortNameEn: 'Purchase Staff',
            shortNameDe: 'Purchase Staff',
            description: null,
            type: false,
            level: '1',
            status: true,
            createBy: 1,
            createDate: null,
            updateBy: null,
            updateDate: null,
            isDelete: false,
            tagDTOList: null,
            menuList: null,
            resourceList: null,
            permissionList: null,
            permissionConfig:
              '{"261":{"permission":1,"department":{"id":"","nameZh":""},"properties":["材料"],"unCols":[],"scope":1},"262":{"permission":1,"department":{"id":"","nameZh":""},"properties":["材料"],"unCols":[],"scope":1},"263":{"permission":1,"department":{"id":"","nameZh":""},"properties":["材料"],"unCols":[]},"264":{"permission":1,"department":{"id":"","nameZh":""},"properties":["材料"],"unCols":[]},"265":{"permission":1,"department":{"id":"","nameZh":""},"properties":["材料"],"unCols":[]},"266":{"permission":1,"department":{"id":"","nameZh":""},"properties":["材料"],"unCols":[]},"267":{"permission":1,"department":{"id":"","nameZh":""},"properties":["材料"],"unCols":[]},"268":{"permission":1,"department":{"id":"","nameZh":""},"properties":["材料"],"unCols":[]},"269":{"permission":1,"department":{"id":"","nameZh":""},"properties":["材料"],"unCols":[]},"department":{"id":"","nameZh":""},"properties":["材料"]}'
          },
          {
            current: 1,
            size: 20,
            id: 11,
            code: 'ADMIN',
            fullNameZh: '业务管理员',
            fullNameEn: 'Purchase Staff',
            fullNameDe: 'Purchase Staff',
            shortNameZh: '业务管理员',
            shortNameEn: 'Purchase Staff',
            shortNameDe: 'Purchase Staff',
            description: null,
            type: false,
            level: '1',
            status: true,
            createBy: 1,
            createDate: null,
            updateBy: null,
            updateDate: null,
            isDelete: false,
            tagDTOList: null,
            menuList: null,
            resourceList: null,
            permissionList: null,
            permissionConfig: null
          },
          {
            current: 1,
            size: 20,
            id: 29,
            code: 'WS1SYSTEMADMIN',
            fullNameZh: 'WS1系统管理员',
            fullNameEn: 'Purchase Staff',
            fullNameDe: 'Purchase Staff',
            shortNameZh: 'WS1系统管理员',
            shortNameEn: 'Purchase Staff',
            shortNameDe: 'Purchase Staff',
            description: null,
            type: false,
            level: '1',
            status: true,
            createBy: 1,
            createDate: null,
            updateBy: null,
            updateDate: null,
            isDelete: false,
            tagDTOList: null,
            menuList: null,
            resourceList: null,
            permissionList: null,
            permissionConfig: null
          }
        ]
      },
      dialogRoleVisible: false,
      selectorQuery: [
        {
          value: 'code',
          label: this.language('角色代码'),
          type: 'input',
          initVal: ''
        },
        {
          value: 'fullNameZh',
          label: this.language('角色名称'),
          type: 'input',
          initVal: ''
        }
        // {
        //   value: 'selectValue',
        //   label: '测试',
        //   type: 'select',
        //   initVal: '',
        //   options: [
        //     { label: '1111', value: '1' },
        //     { label: '2222', value: '2' }
        //   ]
        // }
      ],
      selectorTableSetting: [
        {
          type: 'selection'
        },
        {
          type: 'index',
          label: '序号',
          width: 80
        },
        {
          prop: 'id',
          label: '角色ID',
          tooltip: false,
          align: 'center'
        },
        {
          prop: 'code',
          label: '角色代码',
          align: 'center',
          tooltip: false,
          emit: 'go-detail',
          customRender: (h, scope) => {
            return <span class="open-link-text">{scope.row.fullNameEn}</span>
          }
        },
        {
          prop: 'fullNameZh',
          label: '角色名称',
          align: 'center',
          tooltip: false
        },
        {
          prop: 'description',
          label: '角色描述',
          align: 'center',
          tooltip: false
        }
      ]
    }
  },
  methods: {
    submitForm() {
      this.$refs['demoForm'].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClick() {
      console.log('>><<此处用于唤起iSelectorDialog>><<')
      this.dialogRoleVisible = !this.disabled
    },
    handleCallback() {
      console.log('callback', this.demoForm.roles)
    },
    async handleSearch(val) {
      const res = await fetchRoles(val)
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.selector-demo {
  margin: 30px auto;
  width: 500px;
}
</style>
