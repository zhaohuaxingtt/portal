<!--
 * @Author: caopeng
 * @Date: 2021-010-20 
-->
<template>
  <iDialog
    @close="closeDiolog()"
    :title="'移除⿊名单 - ⽣产采购 -' + clickTableList.nameZh"
    :visible.sync="value"
    width="70%"
  >
    <div class="box">
      <el-form inline label-position="top">
        <div class="searchHeader">
          <div>
            <el-form-item
              style="width: 220px"
              :label="language('CAIGOUYUAN', '采购员')"
            >
              <iSelect
                remote
                :remote-method="remoteGetPurchaseList"
                collapse-tags
                multiple
                filterable
                :placeholder="language('QINGSHURUXUANZE', '请输入/选择')"
                v-model.trim="form.purchaserIds"
              >
                <el-option
                  v-for="item in purchaseList"
                  :key="item.purchaserId"
                  :label="item.purchaserName"
                  :value="item.purchaserId"
                >
                </el-option>
              </iSelect>
            </el-form-item>
            <el-form-item
              style="width: 220px"
              :label="language('CAILIAOZU', '材料组')"
            >
              <iSelect
                remote
                :remote-method="remoteGetCategoryList"
                collapse-tags
                multiple
                @change="getStuffFitel"
                filterable
                :placeholder="language('QINGSHURUXUANZE', '请输入/选择')"
                v-model.trim="form.categoryCodes"
              >
                <el-option
                  v-for="item in categoryList"
                  :key="item.categoryCode"
                  :label="item.categoryCode + '-' + item.categoryName"
                  :value="item.categoryCode"
                >
                </el-option>
              </iSelect>
            </el-form-item>
            <el-form-item
              style="width: 220px"
              :label="language('GONGYIZU', '工艺组')"
            >
              <iSelect
                remote
                :remote-method="remoteGetStuffList"
                collapse-tags
                multiple
                filterable
                :placeholder="language('QINGSHURUXUANZE', '请输入/选择')"
                v-model.trim="form.stuffCodes"
              >
                <el-option
                  v-for="item in stuffList"
                  :key="item.stuffCode"
                  :label="item.stuffCode + '-' + item.stuffName"
                  :value="item.stuffCode"
                >
                </el-option>
              </iSelect>
            </el-form-item>
            <el-form-item
              style="width: 220px"
              :label="language('SHOUKONGCUOSHI', '受控措施')"
            >
              <iSelect
                :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                v-model="form.measures"
              >
                <el-option
                  v-for="item in measuresList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </iSelect>
            </el-form-item>
            <el-form-item
              style="width: 220px"
              :label="language('SHOUKONGQIZHISHIJIAN', '受控起止时间')"
            >
              <iDatePicker
                type="daterange"
                :range-separator="$t('SUPPLIER_ZHI')"
                :placeholder="''"
                v-model="daterange"
                value-format="yyyy-MM-dd"
                clearable
              />
            </el-form-item>
          </div>
          <div class="btn-box">
            <i-button @click="sure">{{ language('CHAXUN', '查询') }}</i-button>
            <i-button @click="reset">{{
              language('CHONGZHI', '重置')
            }}</i-button>
          </div>
        </div>
      </el-form>
      <div class="header">
        <p>{{ language('XIANGQINGLIEBIAO', '详情列表') }}</p>
        <i-button @click="handleRemove">{{
          language('YICHU', '移除')
        }}</i-button>
      </div>
      <table-list
        style="margin-top:20px"
        :tableData="tableListData"
        :tableTitle="tableTitlePp"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
      >
        <template #stuffNameEnDe="scope">
          <span>{{ scope.row.stuffName }}-{{ scope.row.stuffNameDe }}</span>
        </template></table-list
      >
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getList)"
        @current-change="handleCurrentChange($event, getList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </div>
  </iDialog>
</template>

<script>
import { pageMixins } from '@/utils/pageMixins'
import {
  ppSupplierBlackRemove,
  ppSupplerBlackListPage,
  categoryListSearch,
  purchaseListSearch,
  stuffListSearch
} from '@/api/supplier360/blackList'
import { tableTitlePp } from './data'
import tableList from '@/components/commonTable'
import {
  iButton,
  iSelect,
  iDatePicker,
  iDialog,
  iMessageBox,
  iMessage
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
    iSelect,
    iDatePicker,
    iDialog
  },

  data() {
    return {
      stuffList: [],
      tableLoading: true,
      daterange: '',
      form: {},
      selectTableData: [],
      processingList: [],
      categoryList: [],
      purchaseList: [],
      stuff: [],
      tableTitlePp: tableTitlePp,
      measuresList: [
        {
          value: null,
          label: this.language('QUANXUAN', '全选')
        },
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
    // this.$nextTick(() => {
    this.getList()
    // })
  },
  methods: {
    getList() {
      this.tableLoading = true
      const params = {
        supplierId: this.clickTableList.subSupplierId,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.form,
        endTime: this.daterange[1],
        startTime: this.daterange[0]
      }
      ppSupplerBlackListPage(params).then(res => {
        if (res && res.code == 200) {
          this.tableLoading = false
          this.tableListData = res.data
          this.page.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    //移除
    handleRemove() {
      let ids = this.selectTableData.map(x => {
        return x.id
      })
      const params = {
        ids: ids,
        supplierId: this.clickTableList.subSupplierId
      }
      if (ids.length == 0) {
        this.$message({
          type: 'warning',
          message: this.language(
            'QINGXUANZEXUYAOYICHUDECAILIAOZUYUGONGYIZU!',
            '请选择需要移除的材料组与工艺组！'
          )
        })
      } else {
        this.value = false
        iMessageBox(
          this.language('SHIFOUQUERENYICHUHEIMINGDAN?', '是否确认移除黑名单'),
          this.language('TIJIAO', '提交'),
          {
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消')
          }
        )
          .then(async () => {
            ppSupplierBlackRemove(params).then(res => {
              if (res && res.code == 200) {
                iMessage.success(res.desZh)
                // this.$emit('closeDiolog', 1)
              } else iMessage.error(res.desZh)
            })
          })
          .catch(() => {
            this.value = true
          })
      }
    },
    //采购员
    remoteGetPurchaseList(query) {
      if (!query.match(/^[ ]*$/)) {
        const params = {
          keyword: query,
          supplierId: this.clickTableList.subSupplierId
        }
        purchaseListSearch(params).then(res => {
          if (res && res.code == 200) {
            this.purchaseList = res.data
          } else iMessage.error(res.desZh)
        })
      }
    },
    getStuffFitel() {
      this.form.stuffCodes = []
      this.stuffList = []
      //   this.remoteGetStuffList()
    },
    //材料组
    remoteGetCategoryList(query) {
      if (!query.match(/^[ ]*$/)) {
        const params = {
          keyword: query,
          supplierId: this.clickTableList.subSupplierId
        }
        categoryListSearch(params).then(res => {
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
        stuffListSearch(params).then(res => {
          if (res && res.code == 200) {
            this.stuffList = res.data
          } else iMessage.error(res.desZh)
        })
      }
    },
    handleSelectionChange(e) {
      this.selectTableData = e
    },
    sure() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getList()
    },
    reset() {
      this.form = {
        purchaserIds: [],
        categoryCodes: [],
        stuffCodes: [],

        measures: ''
      }
      this.daterange = []
      this.categoryList = []
      this.purchaseList = []
      this.stuffList = []
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getList()
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
.btn-box {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  width: 200px;
  margin-top: 60px;
}
.searchHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 20px;
}
::v-deep .el-form--inline .el-form-item {
  margin-right: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 20px;
  p {
    font-size: 18px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
  }
}
</style>
