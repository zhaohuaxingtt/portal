<template>
  <!--财报比较-->
  <iDialog
      title=""
      :visible.sync="value"
      width="90%"
      @close="clearDiolog"
      :close-on-click-modal="false"
  >
    <div class="content">
      <dialogTabs @handleClick="handleTabsClick" :list="list" class="margin-bottom20"/>
      <tableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          :selection="false"
      />
    </div>
  </iDialog>
</template>

<script>
import {iDialog} from 'rise';
import dialogTabs from '../../../../../components/dialogTabs';
import tableList from '@/components/commonTable';
import {
  financialReportRatingComparison,
  financialReportLevel3Comparison,
} from '../../../../../api/frmRating/preliminaryRating/preliminaryRatingPage';

export default {
  components: {
    iDialog,
    dialogTabs,
    tableList,
  },
  props: {
    value: {type: Boolean},
    selectTableData: {
      type: Array, default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      list: [
        {title: 'SPR_FRM_CBPJ_SJZB'},
        {title: 'SPR_FRM_CBPJ_RJZB'},
        {title: 'SPR_FRM_CBPJ_YJZB'},
        {title: 'SPR_FRM_CBPJ_PJBJ'},
      ],
      tableListData: [],
      tableTitle: [],
      tableLoading: false,
      current: 1,
      ids: [],
      tids: [],
    };
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    handleTabsClick(val) {
      this.current = val;
      this.getTableList();
    },
    getTableList() {
      this.handleTableParamsList();
      if (this.current === 4) {
        this.getFinancialReportRatingComparisonList();
      } else {
        this.getFinancialReportLevel3ComparisonList();
      }
    },
    async getFinancialReportRatingComparisonList() {
      this.tableLoading = true;
      this.tableListData = [];
      this.tableTitle = [];
      try {
        const req = {
          ids: this.ids,
          tids: this.tids,
        };
        const res = await financialReportRatingComparison(req);
        this.handleTableTitle(res);
        this.tableListData = res.data.detailList;
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableTitle = [];
        this.tableLoading = false;
      }
    },
    async getFinancialReportLevel3ComparisonList() {
      this.tableLoading = true;
      this.tableListData = [];
      this.tableTitle = [];
      let level = null;
      if (this.current === 1) {
        level = 3;
      } else if (this.current === 2) {
        level = 2;
      } else if (this.current === 3) {
        level = 1;
      }
      try {
        const req = {
          ids: this.ids,
          tids: this.tids,
          level,
        };
        const res = await financialReportLevel3Comparison(req);
        console.log(res)
        this.handleTableTitle(res.data.tableTitle);
        this.tableListData = res.data.detailList.map(item => {
          Object.keys(item).map(itemChildren => {
            if (!['field', 'zb', 'weight'].includes(itemChildren)) {
              console.log(Number(item[itemChildren],10))
              if(isNaN(Number(item[itemChildren],10))){
                item[itemChildren]= item[itemChildren]
              }else{
              item[itemChildren] = this.toFixed(item[itemChildren], 2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');

              }
            }
          });
          return item;
        });
        console.log( this.tableListData )

        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableTitle = [];
        this.tableLoading = false;
      }
    },
    handleTableTitle(list) {
      if (Array.isArray(list) && list.length !== 0) {
        this.tableTitle = list.map(item => {
          Object.keys(item).map(objectItem => {
            item.key = objectItem;
            item.value = item[objectItem];
            return item;
          });
          const width = item.value.length > 5 ? (item.value.length - 10) * 16 + 'px' : 150 + 'px';
          return {
            width: width,
            props: item.key,
            name: item.value,
            tooltip: true
          };
        });
      } else {
        this.tableTitle = [];
      }
    },
    handleTableParamsList() {
      const ids = [], tids = [];
      this.selectTableData.map(item => {
        ids.push(item.supplierId);
        tids.push(item.id);
      });
      this.ids = ids;
      this.tids = tids;
    },
    toFixed(number, m) {
      let result = Math.round(Math.pow(10, m) * number) / Math.pow(10, m);
      result = String(result);
      if (result.indexOf(".") === -1) {
        result += ".";
        result += new Array(m + 1).join('0');
      } else {
        let arr = result.split('.');
        if (arr[1].length < m) {
          arr[1] = arr[1] += new Array(m - arr[1].length + 1).join('0')
        }
        result = arr.join('.')
      }
      return result
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.getTableList();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  padding-bottom: 20px;
}

::v-deep .el-table__header-wrapper .cell {
  white-space: normal;
}

</style>
