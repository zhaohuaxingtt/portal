<template>
  <iPage>
    <div class="main">
      <iSearch @sure="search" @reset="reset" class="margin-bottom20">
        <el-form>
          <el-row :gutter="20">
            <el-col :span="6">
              <iFormItem :label="searchOptionTitles.name">
                <iInput
                  :placeholder="searchOptionTitles.input"
                  v-model="formData.appNameCn"
                />
              </iFormItem>
            </el-col>
            <el-col :span="6">
              <iFormItem :label="searchOptionTitles.nameEN">
                <iInput
                  :placeholder="searchOptionTitles.input"
                  v-model="formData.appNameEn"
                />
              </iFormItem>
            </el-col>
          </el-row>
        </el-form>
      </iSearch>
      <div class="tableList">
        <iCard>
          <div class="tableButtons">
            <iButton @click="create">{{ buttonTitles.create }}</iButton>
            <iButton @click="edit" :disabled="selectedData.length !== 1">
              {{ language('编辑') }}
            </iButton>
            <iButton @click="deleteData" :disabled="selectedData.length === 0">
              {{ buttonTitles.delete }}
            </iButton>
            <iButton @click="exportData">{{ buttonTitles.export }}</iButton>
            <create-sys-mgm
              v-if="dialogFormVisible"
              :visible="dialogFormVisible"
              :isRead="isRead"
              :id="id"
              @close="dialogFormVisible = false"
              @update="getTableList"
            />
          </div>
          <iTableCustom
            ref="sysMgm"
            :columns="tableColumnSetting"
            :data="tableData"
            :loading="loading"
            @open-detail="enterDetail"
            @handle-selection-change="handleSelectionChange"
          />
          <iPagination
            v-update
            background
            @size-change="handleSizeChange($event, getTableList)"
            @current-change="handleCurrentChange($event, getTableList)"
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
          >
          </iPagination>
        </iCard>
      </div>
    </div>
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iInput,
  iButton,
  iPagination,
  iMessage,
  iSearch,
  iFormItem
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { tableColumnSetting } from './data/data'
import CreateSysMgm from './components/CreateSysMgm'
import { pageMixins } from '@/utils/pageMixins'
import { sysList, deleteSys, sysExport } from '@/api/provider/index'
import {
  queryApplicationByPages,
  deleteApplicationDetail
} from '@/api/applications'
import deleteMixin from '@/mixins/deleteMixin'
export default {
  name: 'UserApplicationDetail',
  components: {
    iPage,
    iCard,
    iInput,
    iButton,
    iPagination,
    iTableCustom,
    CreateSysMgm,
    iSearch,
    iFormItem
  },
  mixins: [pageMixins, deleteMixin],
  created() {
    //获取列表数据
    this.getTableList()
  },

  data() {
    return {
      loading: false,
      id: null,
      tableColumnSetting: tableColumnSetting,
      dialogFormVisible: false,
      isRead: true,
      selectedData: [],
      tableData: [],
      formData: {
        appNameCn: '',
        appNameEn: '',
        description: '',
        systemType: ''
      },
      searchOptionTitles: {
        name: '中文名称',
        nameEN: '英文名称',
        buttons: {
          search: '查询',
          reset: '重置'
        },
        input: '请输入',
        iselect: '请选择'
      },
      title: '供应商系统/SCENARIO管理',
      buttonTitles: {
        create: '新建',
        delete: '删除',
        export: '导出'
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
      systemTagOptions: [
        {
          id: '3',
          label: 'N-Tier'
        },
        {
          id: '1',
          label: '生产采购'
        },
        {
          id: '2',
          label: '一般采购'
        }
      ]
    }
  },
  methods: {
    search() {
      this.page.currPage = 1
      this.getTableList()
    },
    reset() {
      this.page.currPage = 1
      this.formData = this.defaultFormData()
      this.getTableList()
    },
    getTableList() {
      //获取系统列表数据
      let param = {
        ...this.formData,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      queryApplicationByPages(param)
        .then((val) => {
          if (val.code == 200) {
            //
            this.loading = false
            this.tableData = val.data
            this.page.totalCount = val.total
          } else {
            iMessage.error(val.desZh || '获取数据失败')
          }
        })
        .catch(() => {
          this.loading = false
          iMessage.error('获取数据失败')
        })
    },
    enterDetail(val) {
      this.isRead = true
      this.id = val.id
      this.dialogFormVisible = true
    },
    create() {
      //创建
      this.id = ''
      this.isRead = false
      this.dialogFormVisible = true
    },
    handleSelectionChange(val) {
      //选中处理
      this.selectedData = val
    },
    edit() {
      this.isRead = true
      this.id = this.selectedData[0].id
      this.dialogFormVisible = true
    },
    deleteData() {
      //删除选中数据
      this.onDelete().then(() => {
        const params = this.selectedData.map((item) => {
          return item.id
        })
        this.loading = true
        deleteApplicationDetail(params)
          .then((val) => {
            this.loading = false
            //批量删除系统
            if (val.code == 200) {
              //删除成功
              iMessage.success(val.desZh || '删除成功')
              this.getTableList()
            } else {
              iMessage.error(val.desZh || '删除失败')
            }
          })
          .catch((err) => {
            this.loading = false
            iMessage.error(err.desZh || '删除失败')
          })
      })
    },
    exportData() {
      //导出数据
      let newFormData = _.cloneDeep(this.formData)
      newFormData.supplierType = newFormData.supplierType.join(',')
      let param = {
        ...newFormData
      }
      sysExport(param)
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
  }
}
</script>

<style lang="scss" scoped>
.headerTitle {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.searchOptions {
  margin-bottom: 20px;
}

.searchButtons {
  // width: 100%;
  display: flex;
  justify-content: flex-end;
}

.tableButtons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>
