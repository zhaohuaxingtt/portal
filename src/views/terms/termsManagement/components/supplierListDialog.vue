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
            <!-- 供应商 -->
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
    <div style="padding-bottom: 20px">
      <iTableML
        style="height: 30rem; overflow-y: scroll"
        tooltip-effect="light"
        :data="supplierList"
        :tableLoading="tableLoading"
        :border="true"
        class="customer-table"
        @selectionChange="handleSelectionChange"
      >
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
                ? $t('TM_LINSHI')
                : scope.row.formalStatus == '1'
                ? $t('TM_ZHENGSHI')
                : scope.row.formalStatus == '2'
                ? $t('TM_CHUXUCHI')
                : ''
            }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" :label="$t('TM_GONGYINGSHANGLEIXING')"
          ><template slot-scope="scope">
            <span>{{
              scope.row.supplierType == 'PP'
                ? $t('TM_SHENGCHANGONGYINGSHANG')
                : scope.row.supplierType == 'GP'
                ? $t('TM_YIBANGONGYINGSHANG')
                : scope.row.supplierType == 'NT'
                ? 'N-Tier'
                : scope.row.supplierType == 'CM'
                ? $t('TM_ZIDINGYI')
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
    <!-- <iPagination
      v-update
      @current-change="handleChangePage($event)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      prev-text="上一页"
      next-text="下一页"
      layout="prev, pager, next"
      :current-page="page.currPage"
      :total="page.total"
      style="padding-bottom: 20px"
    /> -->
  </iDialog>
</template>

<script>
import { iDialog, iInput, iButton, iSelect } from 'rise'
import iTableML from '@/components/iTableML'
// import { getSignatureResult } from "@/api/terms/terms";
import { pageMixins } from '@/utils/pageMixins'
import { supplierIdentityList, supplierRangeList } from './data'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iTableML,
    iSelect,
    iButton,
    iInput
    // iPagination,
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
      // tableListData: [],
      tableListDataSub: []
      // typeObject: {},
      // form: {
      //   termsId: this.id,
      // },
      // supplierId: -1,
    }
  },
  mounted() {
    // console.log("supplierList", this.supplierList);
    // let param = { termsId: this.id };
    // this.getTableList(param);
    this.tableListDataSub = this.supplierList
  },
  methods: {
    clearDiolog() {
      this.$emit('closeDialog', false)
    },
    handleSearchReset() {
      this.form = {}
      this.supplierList = this.tableListDataSub
    },
    getTableList() {
      // form是查询条件
      // 备份了一下数据
      let arr = this.tableListDataSub
      // 通过遍历key值来循环处理
      Object.keys(this.form).forEach((e) => {
        // 调用自己定义好的筛选方法
        arr = this.filterFunc(this.form[e], e, arr)
      })
      // 为表格赋值
      this.supplierList = arr
    },
    // val: 查询条件的值
    // target: 目标参数，就是你这个值对应的key
    // filterarr: 被筛选的数组
    filterFunc(val, target, filterArr) {
      // 参数不存在或为空时，就相当于查询全部
      if (val == undefined || val == '' || val == null) return filterArr
      return filterArr.filter((p) => p[target]?.indexOf(val) > -1)
    }
    // handleChangePage(e) {
    //   this.page.currPage = e;
    //   this.tableListDataSub = this.tableListData.slice(
    //     (this.page.currPage - 1) * 10,
    //     (this.page.currPage - 1) * 10 + 10
    //   );
    // },
    // query(e) {
    //   getSignatureResult(e).then((res) => {
    //     this.tableListData = res?.termsSupplierList;
    //     this.tableListDataSub = this.tableListData.slice(0, 10);
    //     this.page.total = res?.termsSupplierList.length;
    //   });
    // },
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
