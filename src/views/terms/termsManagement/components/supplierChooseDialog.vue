<template>
  <iDialog
    :title="$t('TM_GONGYINGSHANGLIEBIAO')"
    :visible.sync="openDialog"
    width="95%"
    top="5vh"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <div class="search_title">
      <div class="search">
        <el-form>
          <el-row>
            <!-- 供应商身份  -->
            <el-form-item :label="$t('TM_GONGYINGSHANGSHENFEN')">
              <iSelect
                :placeholder="$t('TM_QUANBU')"
                v-model="form.formalStatus"
                clearable
              >
                <el-option
                  :value="item.value"
                  :label="$t(item.i18n)"
                  v-for="item of supplierIdentityList"
                  :key="item.value"
                ></el-option>
              </iSelect>
            </el-form-item>
            <!-- 供应商类型 -->
            <el-form-item :label="$t('TM_GONGYINGSHANGLEIXING')">
              <iSelect
                :placeholder="$t('TM_QUANBU')"
                v-model="form.supplierType"
                clearable
              >
                <el-option
                  :value="item.value"
                  :label="$t(item.i18n)"
                  v-for="item of supplierRangeList"
                  :key="item.value"
                ></el-option>
              </iSelect>
            </el-form-item>
            <el-form-item :label="$t('TM_GONGYINGSHANGMINGCHENG')">
              <iInput v-model="form.shortNameZh"></iInput>
            </el-form-item>
            <el-form-item :label="$t('TM_GONGYINGSHANGSAPHAO')">
              <iInput v-model="form.sapCode"></iInput>
            </el-form-item>
            <el-form-item :label="$t('TM_GONGYINGSHANGLINSHIHAO')">
              <iInput v-model="form.svwTempCode"></iInput>
            </el-form-item>
            <el-form-item :label="$t('TM_GONGYINGSHANGSVWHAO')">
              <iInput v-model="form.svwCode"></iInput>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div class="button__list">
        <iButton @click="getTableList" class="cancel">{{
          $t('TM_CHAXUN')
        }}</iButton>
        <iButton @click="handleSearchReset">{{ $t('TM_CHONGZHI') }}</iButton>
      </div>
    </div>
    <div class="divider"></div>
    <div class="table_title">
      <div class="choose">{{ $t('TM_KEXUANXIANG') }}</div>
      <iButton @click="addTableData">{{ $t('TM_TIANJIA') }}</iButton>
    </div>
    <iTableML
      style="height: 30rem; overflow-y: scroll"
      tooltip-effect="light"
      :data="tableListOptional"
      :tableLoading="tableLoading"
      :border="true"
      class="customer-table"
      @selectionChange="handleOptionalChange"
    >
      <el-table-column
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('TM_XUHAO')"
        type="index"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        align="center"
        :label="$t('TM_GONGYINGSHANGZHONGWENMING')"
        ><template slot-scope="scope">
          <span>{{ scope.row['shortNameZh'] }}</span>
        </template></el-table-column
      >
      <el-table-column
        align="center"
        :label="$t('TM_GONGYINGSHANGYINGWENMING')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row['shortNameEn'] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('TM_GONGYINGSHANGSHENFEN')"
        ><template slot-scope="scope">
          <span>{{
            scope.row.formalStatus == '0'
              ? this.$t('TM_LINSHI')
              : scope.row.formalStatus == '1'
              ? this.$t('TM_ZHENGSHI')
              : scope.row.formalStatus == '2'
              ? this.$t('TM_CHUXUCHI')
              : ''
          }}</span>
        </template></el-table-column
      >
      <el-table-column align="center" :label="$t('TM_GONGYINGSHANGLEIXING')"
        ><template slot-scope="scope">
          <span>{{
            scope.row.supplierType == 'PP'
              ? this.$t('TM_SHENGCHANGONGYINGSHANG')
              : scope.row.supplierType == 'GP'
              ? this.$t('TM_YIBANGONGYINGSHANG')
              : scope.row.supplierType == 'NT'
              ? 'N-Tier'
              : scope.row.supplierType == 'CM'
              ? this.$t('TM_ZIDINGYI')
              : ''
          }}</span>
        </template></el-table-column
      >
      <el-table-column align="center" :label="$t('TM_LINSHIHAO')">
        <template slot-scope="scope">
          <span>{{ scope.row['svwTempCode'] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('TM_SVWHAO')"
        ><template slot-scope="scope">
          <span>{{ scope.row['svwCode'] }}</span>
        </template></el-table-column
      >
      <el-table-column align="center" :label="$t('TM_SAPHAO')">
        <template slot-scope="scope">
          <span>{{ scope.row['sapCode'] }}</span>
        </template>
      </el-table-column>
    </iTableML>
    <iPagination
      style="padding-bottom: 20px"
      v-update
      @current-change="handleCurrentChange($event)"
      @size-change="handleSizeChange($event)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :prev-text="$t('TM_SHANGYIYE')"
      :next-text="$t('TM_XIAYIYE')"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.total"
    />
    <div class="divider"></div>
    <div class="table_title">
      <div class="choose">{{ $t('TM_YIXUANXIANG') }}</div>
      <iButton @click="deleteTableData">{{ $t('TM_SHANCHU') }}</iButton>
    </div>
    <div style="padding-bottom: 2rem">
      <iTableML
        style="height: 30rem; overflow-y: scroll"
        tooltip-effect="light"
        :data="tableListDataSelectedSub"
        :tableLoading="tableLoading"
        :border="true"
        class="customer-table"
        @selectionChange="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('TM_XUHAO')"
          type="index"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          align="center"
          :label="$t('TM_GONGYINGSHANGZHONGWENMING')"
          ><template slot-scope="scope">
            <span>{{ scope.row['shortNameZh'] }}</span>
          </template></el-table-column
        >
        <el-table-column
          align="center"
          :label="$t('TM_GONGYINGSHANGYINGWENMING')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row['shortNameEn'] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('TM_GONGYINGSHANGSHENFEN')"
          ><template slot-scope="scope">
            <span>{{
              scope.row.formalStatus == '0'
                ? this.$t('TM_LINSHI')
                : scope.row.formalStatus == '1'
                ? this.$t('TM_ZHENGSHI')
                : scope.row.formalStatus == '2'
                ? this.$t('TM_CHUXUCHI')
                : ''
            }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" :label="$t('TM_GONGYINGSHANGLEIXING')"
          ><template slot-scope="scope">
            <span>{{
              scope.row.supplierType == 'PP'
                ? this.$t('TM_SHENGCHANGONGYINGSHANG')
                : scope.row.supplierType == 'GP'
                ? this.$t('TM_YIBANGONGYINGSHANG')
                : scope.row.supplierType == 'NT'
                ? 'N-Tier'
                : scope.row.supplierType == 'CM'
                ? this.$t('TM_ZIDINGYI')
                : ''
            }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" :label="$t('TM_LINSHIHAO')">
          <template slot-scope="scope">
            <span>{{ scope.row['svwTempCode'] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('TM_SVWHAO')"
          ><template slot-scope="scope">
            <span>{{ scope.row['svwCode'] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" :label="$t('TM_SAPHAO')">
          <template slot-scope="scope">
            <span>{{ scope.row['sapCode'] }}</span>
          </template>
        </el-table-column>
      </iTableML>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iButton, iPagination, iSelect } from 'rise'
import iTableML from '@/components/iTableML'
import { pageMixins } from '@/utils/pageMixins'
import { findSupplierPage } from '@/api/terms/terms'
import { supplierIdentityList, supplierRangeList } from './data'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iTableML,
    iSelect,
    iButton,
    iPagination,
    iInput
  },
  props: {
    openDialog: { type: Boolean, default: false },
    supplierList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      form: {},
      supplierIdentityList,
      supplierRangeList,
      tableListOptional: [],
      tableListDataSelected: [],
      tableListDataSelectedSub: [],
      optionalTableData: [], // 可选项列表的数据-勾选
      selectedTableData: [] // 已选项列表的数据-勾选
      // typeObject: {},
      // supplierId: -1,
    }
  },
  mounted() {
    // let param = { termsId: this.id };
    this.getTableList()
    this.tableListDataSelectedSub = this.supplierList
    this.tableListDataSelected = this.tableListDataSelectedSub
  },
  watch: {
    tableListDataSelectedSub: {
      immediate: true,
      deep: true,
      handler() {
        if (this.tableListDataSelected != null) {
          let supplierIdList = this.tableListDataSelected.map((item) => {
            return item.supplierId
          })
          for (let i = 0; i < this.optionalTableData.length; i++) {
            if (
              !supplierIdList.includes(this.optionalTableData[i].supplierId)
            ) {
              this.tableListDataSelected?.push(this.optionalTableData[i])
            }
          }
        } else {
          this.tableListDataSelected = []
          let supplierIdList = []
          for (let i = 0; i < this.optionalTableData.length; i++) {
            if (
              !supplierIdList.includes(this.optionalTableData[i].supplierId)
            ) {
              this.tableListDataSelected?.push(this.optionalTableData[i])
            }
          }
        }
      }
    }
  },
  methods: {
    clearDiolog() {
      this.$emit('closeDialog', false)
      this.$emit('selectedTableData', this.tableListDataSelected)
    },
    handleSearchReset() {
      this.form = {}
      this.tableListDataSelectedSub = this.tableListDataSelected
      this.getTableList()
    },
    getTableList() {
      // this.tableListDataSelectedSub = this.tableListDataSelected;
      this.getChoosedTableList()
      this.page.currPage = 1
      let param = {
        ...this.form,
        pageNum: 1,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    query(e) {
      this.tableLoading = true
      findSupplierPage(e).then((res) => {
        this.tableListOptional = res.data
        this.page.total = res.total
        this.tableLoading = false
      })
    },
    getChoosedTableList() {
      // form是查询条件
      // 备份了一下数据
      let arr = this.tableListDataSelected
      // 通过遍历key值来循环处理
      Object.keys(this.form).forEach((e) => {
        // 调用自己定义好的筛选方法
        arr = this.filterFunc(this.form[e], e, arr)
      })
      // 为表格赋值
      this.tableListDataSelectedSub = arr
    },
    // val: 查询条件的值
    // target: 目标参数，就是你这个值对应的key
    // filterarr: 被筛选的数组
    filterFunc(val, target, filterArr) {
      // 参数不存在或为空时，就相当于查询全部
      if (val == undefined || val == '' || val == null) return filterArr
      return filterArr.filter((p) => p[target]?.indexOf(val) > -1)
    },
    handleCurrentChange(e) {
      this.page.currPage = e
      let param = {
        ...this.formData,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    handleSizeChange(e) {
      this.page.pageSize = e
      let param = {
        ...this.formData,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    // 表格选中值集-可选
    handleOptionalChange(val) {
      this.optionalTableData = val
    },
    addTableData() {
      if (this.tableListDataSelectedSub != null) {
        let supplierIdList = this.tableListDataSelectedSub.map((item) => {
          return item.supplierId
        })
        for (let i = 0; i < this.optionalTableData.length; i++) {
          if (!supplierIdList.includes(this.optionalTableData[i].supplierId)) {
            this.tableListDataSelectedSub?.push(this.optionalTableData[i])
          }
        }
      } else {
        this.tableListDataSelectedSub = []
        let supplierIdList = []
        for (let i = 0; i < this.optionalTableData.length; i++) {
          if (!supplierIdList.includes(this.optionalTableData[i].supplierId)) {
            this.tableListDataSelectedSub?.push(this.optionalTableData[i])
          }
        }
      }
    },
    // 表格选中值集-已选
    handleSelectionChange(val) {
      this.selectedTableData = val
    },
    deleteTableData() {
      this.selectedTableData.map((i) => {
        this.tableListDataSelected.map((item) => {
          if (item.supplierId == i.supplierId) {
            let index = this.tableListDataSelected.indexOf(item)
            this.tableListDataSelected.splice(index, 1)
          }
        })
        this.tableListDataSelectedSub.map((item) => {
          if (item.supplierId == i.supplierId) {
            let index = this.tableListDataSelectedSub.indexOf(item)
            this.tableListDataSelectedSub.splice(index, 1)
          }
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.search_title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .search {
    ::v-deep .el-form {
      .el-form-item {
        float: left;
        margin-right: 30px;
      }
    }
  }
  .button__list {
    display: flex;
    align-items: center;
  }
}
.table_title {
  display: flex;
  justify-content: space-between;
  margin: 33px 0 19px 0;
  .choose {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 25px;
    color: #000000;
    opacity: 1;
  }
}

.divider {
  border-bottom: 1px dashed #ebeef5;
}
::v-deep .customer-table th {
  border: none;
}
::v-deep .customer-table td,
.customer-table th.is-leaf {
  border: none;
}
::v-deep .el-table--border,
.el-table--group {
  border: none;
}
::v-deep .customer-table thead tr th.is-leaf {
  border: 1px solid #ebeef5;
  border-right: none;
}
::v-deep .customer-table thead tr th:nth-last-of-type(2) {
  border-right: 1px solid #ebeef5;
}
::v-deep .el-table--border::after,
.el-table--group::after {
  width: 0;
}
::v-deep .customer-table::before {
  width: 0;
}
::v-deep .customer-table .el-table__fixed-right::before,
.el-table__fixed::before {
  width: 0;
}
::v-deep .el-table--border th.gutter:last-of-type {
  border: 1px solid #ebeef5;
  border-left: none;
}
</style>
