<template>
  <div>
    <div class="Main">
      <!-- 搜索条件 -->
      <div class="SearchMenu">
        <div class="SearchOptions">
          <i-search @sure="sure" @reset="reset" icon="false">
            <el-form>
              <!-- 需求变更，去除该筛选条件 -->
              <!-- <el-form-item
                  :label="language('SUOSHUBUMEN','所属部门')"
                  class="SearchOption"
                >
                  <i-select
                    :placeholder="language('QINGXUANZE','请选择')"
                    v-model="formData.scoreDeptId">
                    <el-option value="" label="所有"></el-option>
                    <el-option
                      v-for="item in organizationMenu"
                      :key="item.existShareId"
                      :label="item.existShareName"
                      :value="item.existShareId">
                    </el-option>
                  </i-select>
                </el-form-item> -->
              <el-form-item
                :label="language('CAILIAOZU', '材料组')"
                class="SearchOption"
              >
                <i-select
                  :placeholder="language('QINGXUANZE', '请选择')"
                  v-model="formData.categoryCode"
                >
                  <el-option value="" label="所有"></el-option>
                  <el-option
                    v-for="item in categoryList"
                    :key="item.categoryId"
                    :label="item.categoryName"
                    :value="item.categoryCode"
                  >
                  </el-option>
                </i-select>
              </el-form-item>
              <el-form-item
                :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')"
                class="SearchOption"
              >
                <i-input
                  :placeholder="
                    language(
                      'CHAXUNGONGYINGSHANGMINGCHENGSAPHAO',
                      '查询供应商名称，SAP号'
                    )
                  "
                  class=""
                  v-model="formData.name"
                ></i-input>
              </el-form-item>
            </el-form>
          </i-search>
        </div>
        <!-- 列表 -->
        <div class="OrganizationListContainer">
          <iCard>
            <tableFold
              v-if="isRender"
              :tabelTittle="tabSetting"
              :tableDataBefore="tableListData"
              :titleLength="titleLength"
            ></tableFold>
            <!-- 分页标签 -->
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
              style="margin:20px 0"
            >
            </iPagination>
          </iCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  iSearch,
  iInput,
  iSelect,
  iPage,
  iCard,
  iButton,
  iPagination,
  iMessage
} from 'rise'
import tableFold from './components/tableFold'
import { pageMixins } from '@/utils/pageMixins'
import { tabSetting } from './components/data'
import {
  getTableData,
  getCategoryData,
  getDeptData
} from '@/api/kpiChart/index.js'
import publicHeaderMenu from './commonHeardNav/headerNav'
import { iNavMvp } from 'rise'
import {
  tabRouterList,
  categoryManagementAssistantListkpi
} from './commonHeardNav/navData'
import logButton from '@/components/logButton'

// import {
//   deleteUsers,
//   getPageListByParams,
//   getDeptDropDownList
// } from '@/api/authorityMgmt'
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iPage,
    iCard,
    iButton,
    iPagination,
    tableFold,
    publicHeaderMenu,
    categoryManagementAssistantListkpi,
    tabRouterList,
    iNavMvp,
    logButton
  },
  mixins: [pageMixins],
  data() {
    return {
      activeName: '/supplier/kpiList',
      tabRouterList: tabRouterList,
      categoryManagementAssistantList: categoryManagementAssistantListkpi,
      tableListData: [],
      tableTitle: [],
      tabSetting: _.cloneDeep(tabSetting),
      formData: {},
      organizationMenu: [],
      categoryList: [],
      tableLoading: false,
      isRender: true,
      deptCode: null,
      titleLength: []
    }
  },
  created() {
    this.getTableData()
    this.getCategoryData()
    this.getDeptData()
    this.deptCode = this.$store.state.permission.userInfo.deptDTO.deptNum
      .toLowerCase()
      .substring(0, 2)
  },
  mounted() {},
  methods: {
    handleleftClick(tab, event) {
      this.$router.push(tab.name)
    },
    handlerightClick(tab) {
      this.activeName = '/supplier/kpiList'
      this.$router.push(tab.name)
    },
    //获取表格数据（包含表头和表格数据）
    getTableData() {
      this.isRender = false
      const params = {
        ...this.formData,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      getTableData(params).then(res => {
        if (res && res.code == 200) {
          this.titleLength = res.data.titles
          this.tableLoading = false
          this.page.totalCount = res.data.data.total
          this.initTableTitle(res.data.titles)
          this.initTableData(res.data.data.data)
          this.isRender = true
        } else {
          iMessage.error(res.data.desZh)
          this.isRender = true
        }
      })
    },
    // 初始化表头数据
    initTableTitle(values) {
      this.tabSetting = _.cloneDeep(tabSetting)
      values.map((item, index) => {
        const titleColumnIndex = this.tabSetting.findIndex(
          titleItem => titleItem.start == true
        )
        const target = {
          prop: item.key,
          label: item.value,
          permission: 'cs'
        }
        if (index == values.length - 1) {
          target['start'] = false
          target['icon'] = 'el-icon-plus'
        }
        this.tabSetting.splice(titleColumnIndex + 1 + index, 0, target)
      })
      console.log('tabSetting', this.tabSetting)
      this.tableTitle = []
      this.tabSetting.map(item => {
        let code = ''
        switch (this.deptCode) {
          case 'cs':
            code = 'cs'
            this.tableTitle.push(item)
            break
          case 'mq':
            code = 'mq'
            break
          case 'ep':
            code = 'ep'
            break
          case 'pl':
            code = 'pl'
            break
          case 'sa':
            code = 'sa'
            break
          default:
            code = 'all'
            break
        }
        if (
          code != 'cs' &&
          (item.permission == 'all' || item.permission == code)
        )
          this.tableTitle.push(item)
      })
      this.tabSetting = [...this.tableTitle]
    },
    // 初始化表格数据.
    initTableData(values) {
      this.tableListData = []
      values.map(item => {
        for (const key in item.rows) {
          item[key] = item.rows[key]
        }
      })
      this.tableListData = values
    },
    // 获取材料组数据
    getCategoryData() {
      getCategoryData({}).then(res => {
        if (res && res.code == 200) {
          this.categoryList = res.data
        } else {
          iMessage.error(res.data.desZh)
        }
      })
    },
    // 获取科股（部门）数据
    getDeptData() {
      getDeptData({}).then(res => {
        if (res && res.code == 200) {
          this.organizationMenu = res.data
        } else {
          iMessage.error(res.data.desZh)
        }
      })
    },

    sure() {
      this.page.currPage = 1
      this.getTableData()
    },
    // 重置数据
    reset() {
      for (const key in this.formData) {
        this.formData[key] = null
      }
      this.page.currPage = 1
      this.getTableData()
    },
    // //改变page操作
    handleSizeChange(event) {
      this.page.pageSize = event
      this.getTableData()
    }, // //改变页码操作
    handleCurrentChange(event) {
      this.page.currPage = event
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.Main {
  width: 100%;
  height: calc(100vh - 100px);
  overflow-y: auto;
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
}
::v-deep.navBox {
  position: relative;
  // border-bottom: 1px solid #E3E3E3;
  .logButton .icon + span {
    vertical-align: top;
  }
  margin-bottom: 20px;
  div {
    font-size: 20px;
  }
  .el-tabs__nav-wrap::after {
    width: 0;
  }
  .el-tabs__item {
    line-height: 24px;
  }
  .el-tabs__item.is-active {
    font-weight: Bold;
  }
  .leftNav {
    float: left;
  }
  .rightNav {
    float: right;
    margin-right: 110px;
    .el-tabs__active-bar {
      background-color: transparent !important;
    }
  }

  .logButton {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
.clearfix:after {
  content: '020';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  /* 触发 hasLayout */
  zoom: 1;
}
</style>
