<template>
  <iPage>
    <div class="Main">
      <!-- <div class='header'>
          <span class="">员工用户管理</span>
          <el-divider direction="vertical"></el-divider>
          <span>系统管理</span>
        </div> -->
      <!-- 搜索条件 -->
      <div class="SearchMenu">
        <div class="SearchOptions">
          <i-search @sure="sure" @reset="reset">
            <el-form>
              <el-form-item
                :label="$t('staffManagement.EMPLOYEENUMBER')"
                class="SearchOption"
              >
                <i-input
                  :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                  class=""
                  v-model="formData.userNum"
                ></i-input>
              </el-form-item>
              <el-form-item :label="$t('中文名')" class="SearchOption">
                <i-input
                  :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                  class=""
                  v-model="formData.nameZh"
                ></i-input>
              </el-form-item>
              <el-form-item
                :label="$t('staffManagement.ENGLISHNAME')"
                class="SearchOption"
              >
                <i-input
                  :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                  class=""
                  v-model="formData.nameEn"
                ></i-input>
              </el-form-item>
              <el-form-item
                :label="$t('staffManagement.DEPARTMENT')"
                class="SearchOption"
              >
                <i-select
                  :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                  filterable
                  v-model="formData.deptId"
                  :filter-method="orgFilter"
                >
                  <el-option
                    v-for="item in orgOptions"
                    :key="item.id"
                    :label="item.deptNum"
                    :value="item.id"
                  >
                  </el-option>
                </i-select>
              </el-form-item>
              <el-form-item
                :label="$t('staffManagement.JOBS')"
                class="SearchOption"
              >
                <i-input
                  :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
                  class=""
                  v-model="formData.positionName"
                ></i-input>
              </el-form-item>
              <el-form-item
                :label="$t('staffManagement.STATEEMPLOYEES')"
                class="SearchOption"
              >
                <i-select
                  :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                  v-model="formData.status"
                >
                  <el-option
                    v-for="item in status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </i-select>
              </el-form-item>
            </el-form>
          </i-search>
        </div>
        <!-- 列表 -->
        <div class="OrganizationListContainer">
          <iCard>
            <div class="OperationButtonContainer">
              <iButton @click="handleDelete" :disabled="delDisabled">{{
                $t('staffManagement.DELETE')
              }}</iButton>
              <iButton @click="handleEdit" :disabled="editDisabled">{{
                $t('staffManagement.EDIT')
              }}</iButton>
              <iButton @click="$router.push('/authorityMgmt/add')">{{
                $t('staffManagement.NEW')
              }}</iButton>
              <button-download :download-method="handleExport" />
              <button-table-setting @click="$refs.userTable.openSetting()" />
            </div>
            <div class="OrganizationTable">
              <iTableCustom
                ref="userTable"
                :loading="tableLoading"
                :data="tableListData"
                :columns="tableSetting"
                :tree-expand="exData"
                permission-key="ADMIN/STAFF_MANAGEMENT/USER"
                @go-detail="handleGoDetail"
                @handle-selection-change="handleSelectChange"
              />
              <iPagination
                v-update
                @size-change="handleSizeChange($event)"
                @current-change="handleCurrentChange($event)"
                background
                :current-page="page.currPage"
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                :layout="page.layout"
                :total="page.totalCount"
              >
              </iPagination>
            </div>
          </iCard>
        </div>
      </div>
    </div>
  </iPage>
</template>

<script>
import {
  iSearch,
  iInput,
  iSelect,
  iPage,
  iCard,
  iButton,
  iPagination
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { tableSetting, exportTableSetting } from './data1.js'
import { pageMixins } from '@/utils/pageMixins'
import {
  deleteUsers,
  getPageListByParams,
  getDeptDropDownList,
  exportExcel
} from '@/api/authorityMgmt'
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iPage,
    iCard,
    iButton,
    iTableCustom,
    iPagination
  },
  mixins: [pageMixins],
  data() {
    return {
      tableSetting: tableSetting,
      exportTableSetting: exportTableSetting,
      tableListData: [],
      formData: {},
      organizationMenu: [],
      selectData: [],
      delDisabled: true,
      editDisabled: true,
      status: [
        {
          value: '',
          label: '全部'
        },
        {
          value: true,
          label: '有效'
        },
        {
          value: false,
          label: '无效'
        }
      ],
      tableLoading: false,
      exportLoading: false,
      orgOptions: []
    }
  },
  created() {
    this.getList()
    // 查询部门列表
    getDeptDropDownList({}).then((res) => {
      this.organizationMenu = [
        {
          deptNum: '未分配组织',
          id: 0
        },
        ...res.data
      ]
      this.orgOptions = this.organizationMenu.slice(0, 200)
    })
  },
  mounted() {
    // this.tableHeight=document.body.clientHeight-430
  },
  methods: {
    orgFilter(query = '') {
      if (!query) {
        return (this.orgOptions = this.organizationMenu.slice(0, 100))
      }
      const filterLists = this.organizationMenu.filter((e) => {
        const nameEn = e.nameEn || ''
        /* const nameEn = e.nameEn || ''
        const code = e.fullCode || '' */
        const q = query.toLowerCase()
        return nameEn.toLowerCase().includes(q)
      })
      if (filterLists.length > 100) {
        this.orgOptions = filterLists.slice(0, 200)
      }
      this.orgOptions = filterLists
    },
    sure() {
      this.page.currPage = 1
      this.getList()
    },
    handleGoDetail(val) {
      this.$router.push({
        path: '/authorityMgmt/detail',
        query: { id: val.id }
      })
    },
    getList() {
      const requestData = {
        ...this.formData,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      /* this.formData.current = this.page.currPage
      this.formData.size = this.page.pageSize */
      this.tableLoading = true
      getPageListByParams(requestData).then((res) => {
        this.tableLoading = false
        this.tableListData = res.data
        this.page.totalCount = res.total
        this.tableListData.forEach((x) => {
          x.status = x.status ? '有效' : '无效'
          x.updateDate = x.updateDate ? x.updateDate.substring(0, 10) : ''
        })
      })
    },
    // 重置数据
    reset() {
      for (const key in this.formData) {
        this.formData[key] = ''
      }
      this.page.currPage = 1
      this.getList()
    },
    // 导出
    handleExport() {
      return exportExcel(this.formData)
    },
    // 改变page操作
    handleSizeChange(event) {
      this.page.pageSize = event
      this.getList()
    }, // 改变页码操作
    handleCurrentChange(event) {
      this.page.currPage = event
      this.getList()
    },
    // 修改操作
    handleEdit() {
      this.$router.push({
        path: '/authorityMgmt/detail',
        query: { id: this.selectData[0].id }
      })
    },
    // 删除操作
    handleDelete() {
      // 判断当前用户下是否分配了岗位
      let idList = []
      let havePositions = []
      this.selectData.forEach((x) => {
        x.positionList ? havePositions.push(x.nameZh) : ''
        idList.push(x.id)
      })
      if (havePositions.length > 0) {
        let nameStr = havePositions.toString()
        this.$confirm(
          `${nameStr}员工已经使用过，当前操作是撤销操纵，二次确认后将该员工逻辑删除。`,
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          deleteUsers(idList).then((res) => {
            if (res.code == 200) {
              this.getList()
            }
          })
        })
      } else {
        deleteUsers(idList).then((res) => {
          if (res.code == 200) {
            this.getList()
          }
        })
      }
    },
    // 按钮状态
    handleSelectChange(x) {
      this.selectData = x
      if (x.length == 1) {
        this.editDisabled = false
        this.delDisabled = false
      } else {
        if (x.length < 1) {
          this.delDisabled = true
          this.editDisabled = true
        } else {
          this.delDisabled = false
          this.editDisabled = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.Main {
  width: 100%;
  overflow: visible;
}
.LastSearchOption {
  margin-top: 20px;
}

.OrganizationListContainer {
  margin-top: 20px;
}

.OrganizationTable {
  margin-top: 20px;
}

.OperationButtonContainer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
