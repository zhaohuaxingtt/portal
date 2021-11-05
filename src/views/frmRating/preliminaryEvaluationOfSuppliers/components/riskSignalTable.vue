<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-07-16 13:58:11
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        <!-- 风险信号-->
        {{ $t('SPR_FRM_XGYSPJ_FXXH') }}
      </span>
      <div class="floatright">
        <iButton @click="exportAll" :loading="exportAllButtonLoading">{{ $t('SUPPLIER_DAOCHUQUANBU') }}</iButton>
      </div>
    </div>
    <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :index="true" :selection="false">
    </tableList>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page='page.currPage' :total="page.totalCount" />
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iDialog, iPagination, iCard, iButton } from 'rise';
import tableList from '@/components/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import { riskSignalTableTitle } from "./data.js";
import { excelExport } from '@/utils/filedowLoad';
import { getPageListRiskSignalComment } from '../../../../api/frmRating/preliminaryEvaluationOfSuppliers';
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    iDialog, iPagination, tableList, iCard, iButton
  },
  mixins: [pageMixins, resultMessageMixin],
  data() {
    // 这里存放数据
    return {
      tableLoading: false,
      selectTableData: [],
      allTableData: [],
      exportAllButtonLoading: false,
      tableTitle: riskSignalTableTitle,
      tableListData: [],
      tableLoading: false,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getTableList() {
      this.tableLoading = true;
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          supplierId: this.$route.query.supplierId,
          relType: '2'
        };
        const res = await getPageListRiskSignalComment(req);
        this.tableListData = res.data;
        this.page.currPage = res.pageNum;
        this.page.pageSize = res.pageSize;
        this.page.totalCount = res.total || 0;
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
    async exportAll() {
      try {
        this.exportAllButtonLoading = true;
        const req = {
          pageNo: 1,
          pageSize: this.page.totalCount,
          supplierId: this.$route.query.supplierId,
          relType: '2',
        };
        const res = await getPageListRiskSignalComment(req);
        this.allTableData = res.data;
        excelExport(this.allTableData, this.tableTitle);
        this.exportAllButtonLoading = false;
      } catch {
        this.allTableData = [];
        excelExport(this.allTableData, this.tableTitle);
        this.exportAllButtonLoading = false;
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTableList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
</style>
