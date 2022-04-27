<!--
* @author:shujie
* @Date: 2021-4-15 10:33:19
* @Description: 历史变更信息
 -->
<template>
  <i-card :title="$t('SUPPLIER_LISHIYANGE')" tabCard>
    <template slot="header-control">
			<i-button v-permission="SUPPLIER_BACKSUPPLIER360" v-if="$route.query.subSupplierType!=='GP'">{{ $t('FANHUIGONGYINSHANG360') }}</i-button>
      <i-button @click="exportsTable" v-if="$route.query.subSupplierType!=='GP'" v-permission="SUPPLIER_ENTERPRISEHISTORY_ENTERPRISEHISTORYTABLE_EXPORT">{{ $t('LK_DAOCHU') }}</i-button>
      <i-button @click="exportsTable" v-if="$route.query.subSupplierType=='GP'" v-permission="SUPPLIER_ENTERPRISEHISTORY_ENTERPRISEHISTORYTABLE_EXPORT_GP">{{ $t('LK_DAOCHU') }}</i-button>
		</template>
                <!-- v-permission="SUPPLIER_ENTERPRISEHISTORY_ENTERPRISEHISTORYTABLE" -->
    <table-list :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange" :index="true" border
    >
      <template #open="scope">
        <span @click="open(scope.row)" class="open">{{ $t('LK_CHAKAN') }}</span>
      </template>
    </table-list>
    <iDialog :visible.sync="visible" :title="$t('SUPPLIER_LISHIYANGEXIANGQING')+ ':'" width="80%">
      <div class="flex-between-center rowDetail">
        <p>
          <span>{{ $t('BANGENLEIRONG') }}：</span>
          <span>{{ row.historyChangedItem }}</span>
        </p>
        <p>
          <span>{{ $t('BANGENGQIAN') }}：</span>
          <span>{{ row.historyAfter }}</span>
        </p>
        <p>
          <span>{{ $t('BIANGENGHOU') }}：</span>
          <span>{{ row.historyBefore }}</span>
        </p>
      </div>
    </iDialog>
  </i-card>
</template>

<script>
import {iCard, iButton, iMessage, iDialog, iText} from "rise";
import tableList from '@/components/commonTable';
import {historyTableTitle} from './data';
import {generalPageMixins} from '@/views/generalPage/commonFunMixins';
import {getHistory} from '@/api/supplier360/history';

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList, iDialog
  },
  data() {
    return {
      tableListData: [],
      tableTitle: historyTableTitle,
      tableLoading: false,
      selectTableData: [],
      row: {},//当前查看详情
      visible: false
    }
  },
  created() {
    this.getHistory()
  },
  methods: {
    getHistory() {
      getHistory({historyType: 0}).then(res => {
        if (res.data && res.data.list) {
          this.tableListData = res.data.list
        }
      })
    },
    open(row) {
      this.visible = true
      this.row = row
    }
  }
}
</script>

<style scoped lang="scss">
.open {
  color: $color-blue;
  cursor: pointer;
}

.rowDetail {
  min-height: 100px;
  padding-bottom: 100px;

  p {
    display: flex;
    flex: 1;
    padding-right: 40px;

    span:nth-of-type(1) {
      font-weight: bold;
    }

    span:nth-of-type(2) {
      flex: 1;
      margin-left: 16px;
    }
  }

  p:nth-last-of-type(1) {
    padding-right: 0;
  }
}
</style>