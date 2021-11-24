<template>
  <iPage>
    <div class="main">
      <div class="searchOptions">
        <iCard>
          <el-form>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.name">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="formData.appNameCn"
                  ></iInput>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.nameEN">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="formData.appNameEn"
                  ></iInput>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <div class="searchButtons">
                  <iButton @click="search">
                    {{ searchOptionTitles.buttons.search }}
                  </iButton>
                  <iButton @click="reset">
                    {{ searchOptionTitles.buttons.reset }}
                  </iButton>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </iCard>
      </div>
      <div class="tableList">
        <iCard>
          <div class="tableButtons">
            <iButton @click="create">{{ buttonTitles.create }}</iButton>
            <iButton @click="deleteData" :disabled="selectedData.length == 0">
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
  iSelect,
  iButton,
  iPagination,
  iMessage
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { tableColumnSetting } from './data/data'
import CreateSysMgm from './components/CreateSysMgm'
import { pageMixins } from '@/utils/pageMixins'
import { sysList, deleteSys, sysExport } from '@/api/provider/index'
export default {
  name: 'UserApplicationDetail',
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
      this.id = null //重置数据
      this.loading = true
      let newFormData = _.cloneDeep(this.formData)
      newFormData.supplierType = newFormData.supplierType
        ? newFormData.supplierType.join(',')
        : ''
      let param = {
        ...newFormData,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      sysList(param)
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
      this.isRead = false
      this.dialogFormVisible = true
    },
    handleSelectionChange(val) {
      //选中处理
      this.selectedData = val
    },
    deleteData() {
      //删除选中数据
      this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = this.selectedData.map((item) => {
          return item.id
        })
        this.loading = true
        deleteSys(param)
          .then((val) => {
            //批量删除系统
            if (val.code == 200) {
              //删除成功
              this.loading = false
              this.getTableList()
            } else {
              iMessage.error(val.desZh || '删除失败')
            }
          })
          .catch(() => {
            //
            this.loading = false
            iMessage.error('删除失败')
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
  },
  created() {
    //获取列表数据
    this.getTableList()
  },
  components: {
    iPage,
    iCard,
    iInput,
    iSelect,
    iButton,
    iPagination,
    iTableCustom,
    CreateSysMgm
  },
  mixins: [pageMixins],
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