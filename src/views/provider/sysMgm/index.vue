<template>
  <iPage>
    <div class="main">
      <!-- <div class="headerTitle">
        <span>{{ title }}</span>
      </div> -->
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
              <!-- appNameCn:"",
          appNameEn:"",
          description:"", -->
              <!-- <el-col :span="6">
                <el-form-item :label="searchOptionTitles.sysDesc">
                  <iInput
                    :placeholder="searchOptionTitles.input"
                    v-model="formData.description"
                  ></iInput>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="6">
                <el-form-item :label="searchOptionTitles.ldap">
                  <iInput :placeholder="searchOptionTitles.input"></iInput>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="6">
                <el-form-item :label="searchOptionTitles.type">
                  <iSelect :placeholder="searchOptionTitles.iselect"> </iSelect>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.sysType">
                  <iSelect v-model="formData.systemType">
                    <el-option
                      v-for="item in systemOptions"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    >
                    </el-option>
                  </iSelect>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="searchOptionTitles.sysTag">
                  <iSelect v-model="formData.supplierType">
                    <el-option
                      v-for="item in systemTagOptions"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    >
                    </el-option>
                  </iSelect>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <div class="searchButtons">
                  <iButton @click="search">{{
                    searchOptionTitles.buttons.search
                  }}</iButton>
                  <iButton @click="reset">{{
                    searchOptionTitles.buttons.reset
                  }}</iButton>
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
            <iButton @click="deleteData" :disabled="selectedData.length == 0">{{
              buttonTitles.delete
            }}</iButton>
            <button-download :download-method="exportData" />
            <!-- <iButton @click="exportData">
              {{ buttonTitles.export }}
            </iButton> -->
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
import CreateSysMgm from './create/CreateSysMgm'
import { pageMixins } from '@/utils/pageMixins'
import { sysList, deleteSys, sysExport } from '@/api/provider/index'
export default {
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
      /* console.log('newFormData', newFormData)
      newFormData.supplierType = newFormData.supplierType
        ? newFormData.supplierType.join(',')
        : '' */
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
        .catch((err) => {
          this.loading = false
          iMessage.error(err.desZh || '获取数据失败')
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
      this.$confirm(
        this.language('此操作将永久删除该模板, 是否继续?'),
        this.language('提示'),
        {
          confirmButtonText: this.language('确定'),
          cancelButtonText: this.language('取消'),
          type: 'warning'
        }
      ).then(() => {
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
              iMessage.error(val.desZh || this.language('删除失败'))
            }
          })
          .catch(() => {
            //
            this.loading = false
            iMessage.error(this.language('删除失败'))
          })
      })
    },
    exportData() {
      return sysExport(this.formData)
      //导出数据
      /* let newFormData = _.cloneDeep(this.formData)
      newFormData.supplierType = newFormData.supplierType.join(',')
      let param = {
        ...newFormData
      }
      sysExport(param) */
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
        name: this.language('中文名称'),
        nameEN: this.language('英文名称'),
        // ldap: "安全中心LDAP属性",
        // type: "功能类型",
        sysDesc: this.language('系统功能说明'),
        sysType: this.language('系统类型'),
        sysTag: this.language('系统标签'),
        buttons: {
          search: this.language('查询'),
          reset: this.language('重置')
        },
        input: this.language('请输入'),
        iselect: this.language('请选择')
      },
      title: this.language('供应商系统/SCENARIO管理'),
      buttonTitles: {
        create: this.language('新建'),
        delete: this.language('删除'),
        export: this.language('导出')
      },
      systemOptions: [
        {
          id: '1',
          label: this.language('系统')
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
          label: this.language('生产采购')
        },
        {
          id: '2',
          label: this.language('一般采购')
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
