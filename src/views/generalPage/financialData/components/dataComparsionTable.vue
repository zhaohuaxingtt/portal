<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <div>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!-- <i-button @click="saveInfos()">
          {{ $t("LK_BAOCUN") }}
        </i-button> -->
      </div>
    </div>
    <tableList v-if="showTable"
               :selection="false"
               :tableData="tableListData"
               :tableTitle="tableTitle"
               :tableLoading="tableLoading"
               @handleSelectionChange="handleSelectionChange"
               :index="true">
      <template #value0="scope">
        <iDatePicker style="width:100%"
                     value-format="yyyy-MM-dd"
                     type="date"
                     v-model="scope.row.value0"
                     v-if="scope.row.isEdit && scope.row.fieldName === 'beginData'">
        </iDatePicker>
        <iInput v-else-if="scope.row.isEdit"
                v-model="scope.row.value0" />
        <span v-else>{{ scope.row.value0 }}</span>
      </template>
      <template #displayName="scope">
        <p :class="'field-'+scope.row.intent"
           :style="{textIndent:scope.row.intent+'em'}">{{scope.row.displayName}}</p>
      </template>
    </tableList>
  </div>
</template>

<script>
import { iButton, iInput, iDatePicker } from "rise";
import tableList from "@/components/commonTable";
import { generalPageMixins } from "@/views/generalPage/commonFunMixins";
import { pageMixins } from "@/utils/pageMixins";
import { getComparisonTableTitle } from "./data";
import {
  financeFieldDisplayList,
  financeFieldDisplaySave
} from "../../../../api/register/financialData";

export default {
  mixins: [generalPageMixins, pageMixins],
  components: {
    iButton,
    tableList,
    iInput,
    iDatePicker
  },
  props: {
    value: { type: Boolean },
    comparisonTableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tabValue: {
      type: String,
      default: () => {
        return "";
      },
      deep: true
    }
  },
  watch: {
    tabValue (n) {
      console.log(n)
      this.tabValue = n;
      this.$nextTick(() => {
        this.getTableList(n);
      });
    },
    deep: true
  },
  data () {
    return {
      showTable: true, //重新渲染
      tableTitle: [],
      tableLoading: false,
      tableListData: [],
      selectTableData: [],
      id: ""
    };
  },
  methods: {
    handleTitle () {
      this.showTable = false;
      this.$nextTick(() => {
        const info = this.tableListData[0].info;
        this.tableTitle = getComparisonTableTitle(
          this.tabValue,
          this.comparisonTableData,
          info
        );
        this.showTable = true;
      });
    },
    async saveInfos () {
      const pms = {
        displayType: this.tabValue,
        financeId: this.comparisonTableData[0].id,
        list: []
      };
      this.tableListData.forEach((item) => {
        pms.list.push({
          code: item.fieldName,
          value: item.value0,
          isEdit: item.isEdit
        });
      });
      pms.list.push({
        code: "id",
        value: this.id
      });
      pms.list.map(item => {
        if (item.value !== null && item.isEdit) {
          return item.value = item.value.replace(/,/g, '')
        }
      })
      const res = await financeFieldDisplaySave(pms);
      this.resultMessage(
        res,
        () => {
          this.getTableList();
        },
        () => {
          this.tableLoading = false;
        }
      );
    },
    async getTableList () {
      console.log(this.comparisonTableData)
      this.tableLoading = true;
      try {
        const pms = {
          displayType: this.tabValue,
          financeIds: [],
          pageNo: 1,
          pageSize: 999,
          sortColumn: "",
          step: ""
        };
        this.comparisonTableData.forEach((item) => {
          pms.financeIds.push(item.id);
        });
        const res = await financeFieldDisplayList(pms);
        console.log("111")
        res.data && res.data.list.map(item => {
          if (item.fieldName === 'isAudit') {
            item.info.forEach((i, index) => {
              return item.info[index].value = i.value ? this.$t('SUPPLIER_SHI') : this.$t('SUPPLIER_SHI')
            })
          } else if (item.fieldName === "isMergeReport") {
            item.info.forEach((i, index) => {
              return item.info[index].value = i.value ? this.$t('SUPPLIER_SHI') : this.$t('SUPPLIER_SHI')
            })
          }
          console.log(item.info, "info")
          item.info && item.info.length && item.info.forEach((i, index) => {
            if (i.value !== null && !isNaN(i.value)) {
              return item.info[index].value = String(parseFloat(i.value).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          })
        })
        console.log("121")
        res.data &&
          res.data.list.map((item) => {
            item.info &&
              item.info.forEach((i, x) => {
                item["value" + x] = i.value;
                return (item["financeId" + x] = i.financeId);
              });
          });
        console.log("131")
        res.data &&
          res.data.list.map((item) => {
            // 判断是否是数据对比
            if (this.comparisonTableData.length > 1) {
              return (item.isEdit = false);
            }
            // 资信报告不可编辑
            if (this.comparisonTableData[0].dataChannel === "reportData") {
              return (item.isEdit = false);
            }
          });
        console.log("141")
        this.$nextTick(async () => {
          this.id = res.data && res.data.id;
          this.tableListData = res.data && res.data.list;
          this.page.currPage = res.data.current;
          this.page.pageSize = res.data.size;
          this.page.totalCount = res.data.total;
          await this.handleTitle();
          this.tableLoading = false;
        });
      } catch {
        this.tableLoading = false
      }
    }
  }
};
</script>

<style lang='scss'  scoped>
::v-deep .el-table td.is-center:nth-child(2) {
  text-align: left;
}
.field-0 {
  font-weight: bold;
}
</style>