<template>
  <iPage>
    <div class="contract-list-page">
      <div class="title margin-bottom20">
        {{ (tableData && tableData.length && tableData[0].name) || '参数管理' }}
      </div>
      <div class="content flex-between-center">
        <iCard class="left">
          <div class="search-wrapper flex-between-center-center">
            <contract-search
              :datasource="originData"
              ref="contractSearch"
              custom-selection
              :tree-expand="tableExpanded"
              @handle-search="handleSearch"
            />
          </div>
          <div class="btn-wrapper">
            <iButton @click="handleAdd">新建</iButton>
          </div>
          <div class="tree-wrapper">
            <i-table-custom
              :data="tableData"
              ref="treeTable"
              :columns="columns"
              :loading="tableLoading"
              row-key="id"
              current-row-key="id"
              cascade
              :height="tableHeight"
              :max-height="tableHeight"
              :tree-expand="tableExpanded"
              child-num-visible
              highlight-current-row
              :default-expand="true"
              @handle-current-change="handleCurrentChange"
            />
          </div>
        </iCard>
        <iCard class="right" v-if="contractForm.id">
          <div class="card-title flex-between-center-center">
            <div>参数详情</div>
            <div v-if="disabled">
              <iButton @click="handleEdit">编辑</iButton>
              <iButton @click="handleDel">删除</iButton>
            </div>
            <div v-else>
              <iButton @click="handleSave">保存</iButton>
              <iButton @click="handleCancel">取消</iButton>
            </div>
          </div>
          <div class="detail margin-top20">
            <iFormGroup
              :row="2"
              :model="contractForm"
              :rules="rules"
              ref="contractForm"
            >
              <iFormItem prop="code">
                <iLabel :label="'编码'" :required="true" slot="label"></iLabel>
                <i-input
                  v-model="contractForm.code"
                  type="text"
                  placeholder="请输入编码"
                  :disabled="true"
                />
              </iFormItem>
              <iFormItem prop="name">
                <iLabel
                  :label="'中文名'"
                  :required="true"
                  slot="label"
                ></iLabel>
                <i-input
                  v-model="contractForm.name"
                  type="text"
                  placeholder="请输入中文名"
                  :disabled="disabled"
                />
              </iFormItem>
              <iFormItem prop="nameEn">
                <iLabel
                  :label="'英文名'"
                  :required="true"
                  slot="label"
                ></iLabel>
                <i-input
                  v-model="contractForm.nameEn"
                  type="text"
                  placeholder="请输入英文名"
                  :disabled="disabled"
                />
              </iFormItem>
              <iFormItem prop="orderNum">
                <iLabel :label="'排序'" :required="true" slot="label"></iLabel>
                <i-input
                  v-model="contractForm.orderNum"
                  type="number"
                  placeholder="请输入排序"
                  :disabled="disabled"
                />
              </iFormItem>
              <iFormItem prop="describe">
                <iLabel :label="'描述'" :required="true" slot="label"></iLabel>
                <i-input
                  v-model="contractForm.describe"
                  type="text"
                  placeholder="请输入描述"
                  :disabled="disabled"
                />
              </iFormItem>
              <iFormItem prop="parent">
                <iLabel :label="'上级节点'" slot="label"></iLabel>
                <iText>{{ parent.name }}</iText>
              </iFormItem>
            </iFormGroup>
          </div>
        </iCard>
      </div>
    </div>
    <addContractDialog
      :show.sync="dialogAddVisiable"
      :parent="contractForm"
      @callback="handleCallback"
    />
  </iPage>
</template>

<script>
import {
  iPage,
  iButton,
  iInput,
  icon,
  iCard,
  iFormItem,
  iFormGroup,
  iText,
  iLabel,
  iMessage
} from 'rise'
import contractSearch from './components/contractSearch'
import iTableCustom from '@/components/iTableCustom'
import addContractDialog from './components/addContractDialog'
import { getDictList, deleteDict, updateDict } from '@/api/params'
import { treeToArray } from '@/utils'
export default {
  components: {
    iPage,
    iButton,
    iInput,
    icon,
    iCard,
    contractSearch,
    iTableCustom,
    iFormItem,
    iFormGroup,
    iText,
    iLabel,
    addContractDialog
  },
  computed: {
    tableHeight() {
      const bodyHeight = document.body.clientHeight
      if (bodyHeight) {
        return bodyHeight - 250 + 'px'
      }
      return '500px'
    },
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo
    })
  },
  data() {
    return {
      parent: {},
      index: 0,
      code: '',
      dialogAddVisiable: false,
      disabled: true,
      originForm: {},
      contractForm: {},
      tableExpanded: { expandKey: 'name', childrenKey: 'subDictResultVo' },
      tableLoading: false,
      columns: [
        // {
        //   type: 'fullIndex',
        //   width: '80',
        //   align: 'left'
        // },
        {
          prop: 'name',
          label: '名称',
          i18n: '名称',
          type: 'expanded',
          align: 'left'
        }
      ],
      tableData: [],
      originData: [],
      rules: {
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入中文名', trigger: 'blur' }],
        nameEn: [{ required: true, message: '请输入英文名', trigger: 'blur' }],
        orderNum: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        describe: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.code = this.$route.query.code
    this.getTreeList()
  },
  methods: {
    handleAdd() {
      this.dialogAddVisiable = true
    },
    handleSearch(val) {
      if (val) {
        this.tableData = [val]
      } else {
        this.tableData = _.cloneDeep(this.originData)
      }
      this.$forceUpdate()
    },
    handleCurrentChange(val) {
      this.originForm = _.cloneDeep(val)
      this.contractForm = _.cloneDeep(val)
      const array = treeToArray(this.originData, 'subDictResultVo')
      this.parent =
        array.find((item) => {
          if (item.id === val.parentId) {
            return item
          }
        }) || {}
    },
    async getTreeList() {
      this.tableLoading = true
      const result = await getDictList({ code: this.code })

      this.tableLoading = false
      if (result.code === '200' && result.data) {
        this.originData = _.cloneDeep(result.data)
        this.tableData = _.cloneDeep(result.data)
      }
      // this.$nextTick(async () => {
      //   result.data && result.data.length
      //     ? this.$refs.treeTable.$refs.theCustomTable.setCurrentRow(
      //         this.tableData[this.index]
      //       )
      //     : ''
      //   this.$forceUpdate()
      // })
    },
    handleEdit() {
      this.disabled = false
    },
    handleDel() {
      this.$alert('是否删除该参数', {
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            const result = await deleteDict({
              id: this.contractForm.id,
              deleteBy: this.userInfo.id
            })
            if (result.code === '200') {
              iMessage.success('删除参数成功')
              this.contractForm = {}
              this.getTreeList()
            }
            done()
          } else {
            done()
          }
        }
      })
        .then((action) => {})
        .catch((err) => {
          console.log(err)
        })
    },
    handleSave() {
      this.$refs['contractForm'].validate(async (valid) => {
        if (valid) {
          const result = await updateDict(this.contractForm)
          if (result.code === '200') {
            iMessage.success('更新参数成功')
            this.disabled = true
            this.getTreeList()
          }
        } else {
          return false
        }
      })
    },
    handleCancel() {
      this.contractForm = _.cloneDeep(this.originForm)
      this.disabled = true
    },
    handleCallback() {
      this.getTreeList()
    }
  }
}
</script>

<style lang="scss" scoped></style>
