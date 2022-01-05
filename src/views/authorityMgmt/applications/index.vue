<template>
  <iPage>
    <div class="main">
      <iSearch class="margin-bottom20">
        <el-form>
          <el-row :gutter="20">
            <el-col :span="6">
              <iFormItem :label="language('中文名称')">
                <iInput
                  :placeholder="language('请输入')"
                  v-model="formData.appNameCn"
                />
              </iFormItem>
            </el-col>
            <el-col :span="6">
              <iFormItem :label="language('英文名称')">
                <iInput
                  :placeholder="language('请输入')"
                  v-model="formData.appNameEn"
                />
              </iFormItem>
            </el-col>
          </el-row>
        </el-form>
        <div slot="button">
          <iButton @click="search">{{ $t('LK_INQUIRE') }}</iButton>
          <iButton @click="reset">{{ $t('rfq.RFQRESET') }}</iButton>
        </div>
      </iSearch>
      <div class="tableList">
        <iCard>
          <div class="tableButtons">
            <iButton @click="create">{{ language('新建') }}</iButton>
            <iButton @click="edit" :disabled="selectedData.length !== 1">
              {{ language('编辑') }}
            </iButton>
            <iButton @click="deleteData" :disabled="selectedData.length === 0">
              {{ language('删除') }}
            </iButton>
            <button-download :download-method="exportData">
              {{ language('导出') }}
            </button-download>
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
import {
  queryApplicationByPages,
  deleteApplicationDetail,
  exportApplications
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
        appNameEn: ''
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
      this.loading = true
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
      this.isRead = false
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
      const params = this.selectedData
      if (this.selectedData.length > 0) {
        params.applicationIdList = this.selectedData.map((e) => e.id)
      }
      return exportApplications({ ...params, systemType: 3 })
    },
    defaultFormData() {
      return {
        appNameCn: '',
        appNameEn: ''
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
