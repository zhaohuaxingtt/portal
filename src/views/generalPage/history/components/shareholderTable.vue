<!--
* @author:shujie
* @Date: 2021-4-15 10:33:19
* @Description: 历史变更信息
 -->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button @click="exportsTable" v-permission="SUPPLIER_ENTERPRISEHISTORY_CHANGEOFSHAREHOLDERTABLE_EXPORT">{{
            $t('LK_DAOCHU')
          }}
        </i-button>
      </div>
    </div>
    <!-- v-permission="SUPPLIER_ENTERPRISEHISTORY_CHANGEOFSHAREHOLDERTABLE" -->
    <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
    />
  </i-card>
</template>

<script>
import {iCard, iButton} from 'rise';
import tableList from '@/components/commonTable';
import {subSupplierTableTitle} from './data';
import {generalPageMixins} from '@/views/generalPage/commonFunMixins';
import {getHistory} from '@/api/supplier360/history';

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList
  },
  data() {
    return {
      tableListData: [],
      tableTitle: subSupplierTableTitle,
      tableLoading: false,
      selectTableData: []
    };
  },
  created() {
    this.getHistory();
  },
  methods: {
    getHistory() {
      getHistory({historyType: 1}).then(res => {
        if (res.data && res.data.list) {
          this.tableListData = res.data.list;
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
