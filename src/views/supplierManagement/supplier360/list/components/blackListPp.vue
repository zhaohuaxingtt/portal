<!--
 * @Author: caopeng
 * @Date: 2021-010-19 
-->
<template>
  <iDialog @close="closeDiolog()"
           :visible.sync="value"
           :title="'供应商⿊名单记录 - 生产采购  -'+ clickTableList.nameZh"
           top="5%"
           width="85%">
    <div class="box">
      <el-tabs class="tabsHeader"
               type="card"
               style="margin-left:20px;"
               v-model="tabVal"
               @tab-click="changeTab">
        <el-tab-pane name="1"
                     :label="
            language('GONGYINGSHANGHEIMINGDANZHUANGTAI', '供应商⿊名单状态')
          ">
        </el-tab-pane>
        <el-tab-pane name="2"
                     :label="language('GONGYINGSHANGHEIMINGDANJILU', '供应商⿊名单记录')">
        </el-tab-pane>
      </el-tabs>
      <div class="dilogHeader">
        <el-form label-width="80"
                 inline
                 label-position="top">
          <el-form-item v-if="tabVal == 2"
                        style="width:220px"
                        :label="language('KESHI', '科室')">
            <iSelect multiple
                     filterable
                     collapse-tag
                     :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                     v-model="form.deptIds">
              <el-option v-for="item in deptList"
                         :key="item.deptId"
                         :label="item.deptName"
                         :value="item.deptId">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item v-if="tabVal == 2"
                        style="width:220px"
                        :label="language('CAIGOUYUAN', '采购员')">
            <iSelect remote
                     :remote-method="remoteGetPurchaseList"
                     collapse-tags
                     multiple
                     filterable
                     :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                     v-model.trim="form.purchaserIds">
              <el-option v-for="item in purchaseList"
                         :key="item.purchaserId"
                         :label="item.purchaserName"
                         :value="item.purchaserId">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item style="width:220px"
                        :label="language('CAILIAOZU', '材料组')">
            <iSelect remote
                     :remote-method="remoteGetCategoryList"
                     collapse-tags
                     multiple
                     @change="getStuffFitel()"
                     filterable
                     :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                     v-model.trim="form.categoryCodes">
              <el-option v-for="item in categoryList"
                         :key="item.categoryCode"
                         :label="item.categoryCode+'-'+item.categoryName"
                         :value="item.categoryCode">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item style="width:220px"
                        :label="language('GONGYIZU', '工艺组')">
            <iSelect remote
                     :remote-method="remoteGetStuffList"
                     collapse-tags
                     multiple
                     filterable
                     :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                     v-model.trim="form.stuffCodes">
              <el-option v-for="item in stuffList"
                         :key="item.stuffCode"
                         :label="item.stuffCode+'-'+item.stuffName"
                         :value="item.stuffCode">
              </el-option>
            </iSelect>
          </el-form-item>

          <el-form-item v-if="tabVal == 1"
                        style="width:220px"
                        :label="language('SHOUKONGZHUANGTAI', '受控状态')">
            <iSelect :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                     v-model="form.measuresStatus">
              <el-option v-for="item in typeList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item style="width:220px"
                        :label="language('SHOUKONGCUOSHI', '受控措施')">
            <iSelect :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                     v-model="form.measures">
              <el-option v-for="item in measuresList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('SHOUKONGKAISHISHIJIAN', '受控开始时间')">
            <iDatePicker style="width:220px"
                         type="daterange"
                         :range-separator="$t('SUPPLIER_ZHI')"
                         :placeholder="''"
                         v-model="daterange"
                         value-format="yyyy-MM-dd"
                         clearable />
          </el-form-item>
          <el-form-item :label="language('SHOUKONGJIESHUJIAN', '受控结束时间')">
            <iDatePicker style="width:220px"
                         type="daterange"
                         :range-separator="$t('SUPPLIER_ZHI')"
                         :placeholder="''"
                         v-model="daterange2"
                         value-format="yyyy-MM-dd"
                         clearable />
          </el-form-item>
        </el-form>
        <div class="btnBox">
          <iButton @click="sure">{{ language('CHAXUN', '查询') }}</iButton>
          <iButton @click="clickReset(tabVal)">{{
            language('CHONGZHI', '重置')
          }}</iButton>
        </div>
      </div>
      <p class="tableTitle">
        详情列表
      </p>
      <div class="tableBox">

      <table-list v-if="tabVal == 1"
                  style="margin-top:20px"
                  :tableData="tableListData"
                  :tableTitle="tableTitlePpBlackList"
                  :tableLoading="tableLoading"
                  :index="true"
                  :selection="false">
      </table-list>
      <table-list v-if="tabVal == 2"
                  style="margin-top:20px"
                  :tableData="tableListDataRecord"
                  :tableTitle="tableTitlePpBlackListRecord"
                  :tableLoading="tableLoadingRecord"
                  :index="true"
                  :selection="false">
      </table-list>
      <!-- <iPagination style="margin-top:20px"
                   v-if="tabVal == 2"
                   v-update
                   @size-change="handleSizeChange($event, sure)"
                   @current-change="handleCurrentChange($event, getListRecord)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :current-page="page.currPage"
                   :total="page.totalCount" /> -->
       </div>
    </div>
  </iDialog>
</template>

<script>
import {
  ppSupplerBlackListHistoryPage,
  categoryListSearch,
  purchaseListSearch,
  stuffListSearch,
  ppSupplerBlackListStatusPage,
  deptListSearch
} from '@/api/supplier360/blackList'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitlePpBlackList, tableTitlePpBlackListRecord } from './data'
import tableList from '@/components/commonTable'
import {
  iButton,
  iDatePicker,
  iSelect,
  iMessage,
  iPagination,
  iDialog
} from 'rise'
export default {
  mixins: [pageMixins],
  props: {
    clickTableList: { type: Object },
    value: {
      type: Boolean,
      default: false
    }
  },
  components: {
    iButton,
    tableList,
    iDatePicker,
    iSelect,
    iPagination,
    iDialog
  },
  data() {
    return {
      isShow: false,
      stuffList: [],
      categoryList: [],
      purchaseList: [],
      tableLoading: false,
      tableLoadingRecord: false,
      form: {
        measuresStatus: ''
      },
      processingList: [],
      tableTitlePpBlackList: tableTitlePpBlackList,
      tableTitlePpBlackListRecord: tableTitlePpBlackListRecord,
      tableListData: [],
      tableListDataRecord: [],
      selectTableData: [],
      deptList: [],
      typeList: [
        {
          label: this.language('ZHENGCHANG', '正常'),
          value: 0
        },
        {
          label: this.language('SHOUKONG', '受控'),
          value: 1
        }
      ],
      daterange: [],
      daterange2: [],
      tabVal: '1',
      measuresList: [
        {
          label: this.language('LK_BUKEXUNJIABUKEDINGDIAN', '不可询价不可定点'),
          value: 1
        },
        {
          label: this.language('LK_KEXUNJIABUKEDINGDIAN', '可询价不可定点'),
          value: 2
        }
      ]
    }
  },
  created() {
    this.getList()
    this.getDeptListSearch()
  },
  computed: {},
  methods: {
    //采购员
    remoteGetPurchaseList(query) {
      if (!query.match(/^[ ]*$/)) {
        const params = {
          keyword: query,
          supplierId: this.clickTableList.subSupplierId,
          deptIds: this.form.deptIds
        }
        purchaseListSearch(params).then((res) => {
          if (res && res.code == 200) {
            this.purchaseList = res.data
          } else iMessage.error(res.desZh)
        })
      }
    },
    getDeptListSearch() {
      const params = {
        keyword: '',
        supplierId: this.clickTableList.subSupplierId
      }
      deptListSearch(params).then((res) => {
        if (res && res.code == 200) {
          this.deptList = res.data
        } else iMessage.error(res.desZh)
      })
    },

    //材料组
    remoteGetCategoryList(query) {
      if (!query.match(/^[ ]*$/)) {
        const params = {
          keyword: query,
          supplierId: this.clickTableList.subSupplierId
        }
        categoryListSearch(params).then((res) => {
          if (res && res.code == 200) {
            this.categoryList = res.data
          } else iMessage.error(res.desZh)
        })
      }
    },
    //工艺组
    remoteGetStuffList(query) {
      if (!query.match(/^[ ]*$/)) {
        const params = {
          keyword: query,
          supplierId: this.clickTableList.subSupplierId,
          categoryCodes: this.form.categoryCodes
        }
        stuffListSearch(params).then((res) => {
          if (res && res.code == 200) {
            this.stuffList = res.data
          } else iMessage.error(res.desZh)
        })
      }
    },
    getStuffFitel() {
      this.form.stuffCodes = []
      this.stuffList = []
      //   this.remoteGetStuffList()
    },
    getList() {
      this.isShow = true
      this.tableLoading = true
      const params = {
        supplierId: this.clickTableList.subSupplierId,
        endTime: this.daterange[1],
        startTime: this.daterange[0],
        stopEndTime: this.daterange2[1],
        stopStartTime: this.daterange2[0],
        pageNo: 1,
        pageSize: 9999,
        ...this.form
      }
      console.log(this.form)
      ppSupplerBlackListStatusPage(params).then((res) => {
        if (res && res.code == 200) {
          this.tableLoading = false
          this.tableListData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    getListRecord() {
      this.tableLoadingRecord = true
      const params = {
        supplierId: this.clickTableList.subSupplierId,
        pageNo: 1,
        pageSize: 9999,
        endTime: this.daterange[1],
        startTime: this.daterange[0],
        stopEndTime: this.daterange2[1],
        stopStartTime: this.daterange2[0],
        ...this.form
      }
      ppSupplerBlackListHistoryPage(params).then((res) => {
        if (res && res.code == 200) {
          this.page.totalCount = res.total
          this.tableLoadingRecord = false
          this.tableListDataRecord = res.data
        } else iMessage.error(res.desZh)
      })
    },
    changeTab() {
      this.isShow = true
      this.clickReset(this.tabVal)
      console.log(this.form)
    },
    sure() {
      // this.page.currPage = 1
      // this.page.pageSize = 10
      console.log(this.form)
      if (this.tabVal == 1) {
        this.getList()
      } else {
        this.getListRecord()
      }
    },
    clickReset(v) {
      this.form = {
        measuresStatus: '',
        purchaserIds: [],
        categoryCodes: [],
        stuffCodes: [],
        measures: '',
        deptIds: []
      }
      this.categoryList = []
      this.purchaseList = []
      this.stuffList = []
      // this.page.pageSize = 10
      // this.page.currPage = 1
      this.daterange = []
      this.daterange2 = []
      if (v == 1) {
        this.getList()
      } else {
        this.getListRecord()
      }
    },
    // 关闭弹窗
    closeDiolog() {
      this.$emit('closeDiolog')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding-bottom: 20px;
}
.tableBox{
  max-height: 600px;
  overflow-y: scroll;
}
.header {
  display: flex;
  justify-content: flex-end;
}
.tableTitle {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  color: #000000;
  padding: 20px 0 30px;
}
.dilogHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
::v-deep .el-form--inline .el-form-item {
  margin-right: 30px;
}
.btnBox {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-top: 60px;
  align-items: center;
  width: 300px;
}
.tabsHeader {
  margin-left: 0 !important;
  ::v-deep .el-tabs__item.is-active {
    font-weight: bold;
    background: #ffffff;
    opacity: 1;
  }
  ::v-deep .el-tabs__item {
    border: none;
    font-weight: 500;
    background: #f5f6f7;
    border-radius: 0px 10px 10px 0px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
    font-size: 16px;
    width: 200px;
    height: 35px;
    line-height: 35px;
  }
  ::v-deep .el-tabs__nav {
    border: none !important;
  }
  ::v-deep .el-tabs__nav {
    background: transparent;
    border: none;
    padding: 10px 0;
  }
  ::v-deep .el-tabs__item:focus.is-active.is-focus:not(:active) {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  ::v-deep .el-tabs__header {
    border: none;
  }
  ::v-deep .el-tabs__item:first-child {
    border-radius: 10px 0px 0px 10px;
  }
}
v::v-deep .el-tabs__nav-wrap::after {
  height: 0 !important;
}
v::v-deep .el-tabs__nav-wrap:hover {
  font-weight: bold;
}
</style>
