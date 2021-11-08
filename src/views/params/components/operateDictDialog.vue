<template>
  <div class="dict-modal">
    <i-dialog
      :title="title"
      :visible.sync="isShow"
      width="50%"
      @open="handleOpen"
      @close="handleClose"
    >
      <div class="dict-wrapper">
        <el-form :inline="true" :model="dictForm" ref="dictForm" :rules="rules">
          <el-form-item label="编码" prop="code">
            <i-input
              v-model="dictForm.code"
              placeholder="请输入编码"
              :disabled="type === 'add' ? false : true"
            ></i-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <i-input v-model="dictForm.name" placeholder="请输入名称"></i-input>
          </el-form-item>
          <el-form-item label="描述" prop="describe">
            <i-input
              v-model="dictForm.describe"
              placeholder="请输入描述"
            ></i-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn-wrapper">
        <iButton @click="handleAdd">新建</iButton>
      </div>
      <div class="table-wrapper">
        <iTableCustom
          :ref="'dictChildTable'"
          :data="tableData"
          :columns="tableSetting"
          :loading="tableLoading"
        >
        </iTableCustom>
      </div>
      <span slot="footer" class="dialog-footer">
        <i-button @click="handleSave">保存</i-button>
        <i-button @click="handleReset">重置</i-button>
      </span>
    </i-dialog>
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { iDialog, iButton, iMessage, iInput } from 'rise'
import { addDict, updateDict, getDictList } from '@/api/params'
export default {
  components: { iTableCustom, iDialog, iButton, iInput },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    show: {
      type: Boolean
    },
    title: {
      type: String,
      default: () => {
        return ''
      }
    },
    type: {
      type: String,
      default: () => {
        return 'add'
      }
    }
  },
  computed: {
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    },
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo
    })
  },
  data() {
    const _self = this
    return {
      rules: {
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        describe: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      },
      dictForm: { parentId: -1, level: 1 },
      tableLoading: false,
      tableData: [],
      originData: [],
      tableSetting: [
        {
          type: 'index',
          width: 30
        },
        {
          prop: 'code',
          label: '编码',
          tooltip: false,
          align: 'center',
          customRender: (h, scope) => {
            return h('div', [
              h('i-input', {
                on: {
                  input: value => {
                    scope.row.code = value
                  }
                },
                props: {
                  value: scope.row.code,
                  placeholder: '请输入编码',
                  disabled: scope.row.codeDisabled
                }
              })
            ])
          }
        },
        {
          prop: 'name',
          label: '中文名',
          align: 'center',
          tooltip: false,
          customRender: (h, scope) => {
            return h('div', [
              h('i-input', {
                on: {
                  input: value => {
                    scope.row.name = value
                  }
                },
                props: {
                  value: scope.row.name,
                  placeholder: '请输入中文名'
                }
              })
            ])
          }
        },
        {
          prop: 'nameEn',
          label: '英文名',
          align: 'center',
          tooltip: false,
          customRender: (h, scope) => {
            return h('div', [
              h('i-input', {
                on: {
                  input: value => {
                    scope.row.nameEn = value
                  }
                },
                props: {
                  value: scope.row.nameEn,
                  placeholder: '请输入英文名'
                }
              })
            ])
          }
        },
        {
          prop: 'describe',
          label: '描述',
          align: 'center',
          tooltip: false,
          customRender: (h, scope) => {
            return h('div', [
              h('i-input', {
                on: {
                  input: value => {
                    scope.row.describe = value
                  }
                },
                props: {
                  value: scope.row.describe,
                  placeholder: '请输入描述'
                }
              })
            ])
          }
        },
        {
          align: 'center',
          width: 50,
          tooltip: false,
          customRender: (h, scope) => {
            return h('div', [
              h('i', {
                class: 'el-icon-delete',
                style: 'color:#5F6879;',
                on: {
                  click: () => {
                    _self.tableData.splice(scope.$index, 1)
                  }
                }
              })
            ])
          }
        }
      ]
    }
  },
  methods: {
    handleClose() {
      this.tableData = []
      this.tableLoading = false
      this.$refs['dictForm'].resetFields()
      this.dictForm = {
        parentId: -1,
        level: 1,
        createOrUpdBy: this.userInfo.id
        // type: 1
      }
    },
    async handleOpen() {
      if (this.type === 'edit') {
        this.dictForm = _.cloneDeep(this.data)
        this.tableLoading = true
        const result = await getDictList({ code: this.data.code })
        this.tableLoading = false
        if (result.code === '200' && result.data) {
          result.data[0].subDictResultVo.forEach(item => {
            item.codeDisabled = true
          })
          this.tableData = _.cloneDeep(result.data[0].subDictResultVo) || []
          this.originData = _.cloneDeep(result.data[0].subDictResultVo) || []
        }
      }
      this.dictForm.parentId = -1
      this.dictForm.level = 1
      this.dictForm.createOrUpdBy = this.userInfo.id
      // this.dictForm.type = 1
    },
    checkItemEmpty() {
      const emptyItem = this.tableData.find(data => {
        if (!data.code || !data.name) {
          return data
        }
      })
      return emptyItem
    },
    handleAdd() {
      const row = {
        code: '',
        name: '',
        nameEn: '',
        describe: '',
        level: 2,
        createOrUpdBy: this.userInfo.id
      }
      this.tableData.push(row)
    },
    handleSave() {
      const emptyItem = this.checkItemEmpty()
      this.$refs['dictForm'].validate(async valid => {
        if (valid) {
          if (emptyItem) {
            iMessage.warn('子节点编码及中文名不能为空')
            return
          }
          this.dictForm.subDictDto = _.cloneDeep(this.tableData)
          const result =
            this.type === 'add'
              ? await addDict(this.dictForm)
              : await updateDict(this.dictForm)
          if (result.code === '200') {
            this.isShow = false
            this.$emit('callback')
          }
        } else {
          return false
        }
      })
    },
    handleReset() {
      if (this.type === 'add') {
        this.dictForm = {
          parentId: -1,
          level: 1,
          createOrUpdBy: this.userInfo.id
          // type: 1
        }
        this.tableData = []
      } else {
        this.dictForm = _.cloneDeep(this.data)
        this.dictForm.parentId = -1
        this.dictForm.level = 1
        // this.dictForm.type = 1
        this.dictForm.createOrUpdBy = this.userInfo.id
        this.tableData = _.cloneDeep(this.originData)
      }
    }
  }
}
</script>
