<template>
  <iDialog :visible.sync="visible" width="90%">
    <div class="Main">
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
              <iButton @click="confirm">{{ language('确认') }}</iButton>
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
  </iDialog>
</template>

<script>
import {
  iDialog,
  iSearch,
  iInput,
  iSelect,
  iCard,
  iButton,
  iPagination,
  iMessage
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { tableSetting } from './data.js'
import { pageMixins } from '@/utils/pageMixins'
import { getPageListByParams, getDeptDropDownList } from '@/api/authorityMgmt'
import { transfer, isAllowedToTransfer } from '@/api/approval/monitor'
export default {
  components: {
    iDialog,
    iSearch,
    iInput,
    iSelect,
    iCard,
    iButton,
    iTableCustom,
    iPagination
  },
  mixins: [pageMixins],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tableSetting: tableSetting,
      tableListData: [],
      formData: {},
      organizationMenu: [],
      selectData: [],
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
  methods: {
    orgFilter(query = '') {
      if (!query) {
        return (this.orgOptions = this.organizationMenu.slice(0, 100))
      }
      const filterLists = this.organizationMenu.filter((e) => {
        const nameEn = e.nameEn || ''
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
    // 改变page操作
    handleSizeChange(event) {
      this.page.pageSize = event
      this.getList()
    }, // 改变页码操作
    handleCurrentChange(event) {
      this.page.currPage = event
      this.getList()
    },
    // 复选
    handleSelectChange(x) {
      this.selectData = x
    },
    // 确认修改
    confirm() {
      if (this.selectData.length != 1)
        return iMessage.warn('请选择一个转派的人员')
      console.log('confirm=>',this.row)
      let params = {
        taskId: this.row.taskNodeId,
        assignee: this.selectData[0].id
      }
      isAllowedToTransfer(params).then((res) => {
        if (res?.data) {
          transfer({
            targetUserId: this.selectData[0].id,
            taskId: this.row.taskNodeId
          }).then((res) => {
            if (res?.data) {
              iMessage.success('转派成功')
              this.$emit('getData')
              this.$emit('update:visible', false)
            } else {
              iMessage.error(res?.desZh || '操作失败')
            }
          })
        }
      })
      return
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
