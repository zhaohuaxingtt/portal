<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <div v-loading="loadPage">
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button @click="saveInfos()"
                  v-if="this.comparisonTableData[0].dataChannelName !== '资信报告'">
          {{ $t("LK_BAOCUN") }}
        </i-button>
      </div>
    </div>
    <template v-if="tabValue !== 'infor'">
      <tableList v-if="showTable"
                :selection="false"
                :tableData="tableListData"
                :tableTitle="tableTitle"
                v-loading="loading"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                border
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
    </template>
    <template v-else>
      <tableList :selection="false"
                :tableData="tableListData2"
                :tableTitle="tableTitle2"
                :tableLoading="tableLoading"
                border
                :index="true"
        >
        <template #displayName="scope">
          <p class="field-0">{{scope.row.displayName}}</p>
        </template>
        <template #year="scope">
          <iDatePicker style="width:100%"
                      value-format="yyyy-MM-dd"
                      type="date"
                      v-model="scope.row.year"
                      v-if="scope.row.isEdit && scope.row.displayName === '成立时间'">
          </iDatePicker>
          <iSelect v-if="scope.row.isEdit && scope.row.displayName === '是否上市'" v-model="scope.row.year">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </iSelect>
          <iInput v-else-if="scope.row.isEdit"
                  v-model="scope.row.year" />
          <span v-else>{{ scope.row.year }}</span>
        </template>
      </tableList>
    </template>
  </div>
</template>

<script>
import { iButton, iInput, iDatePicker,iSelect,iMessage } from "rise";
import tableList from "@/components/commonTable";
import { generalPageMixins } from "@/views/generalPage/commonFunMixins";
import { pageMixins } from "@/utils/pageMixins";
import { getComparisonTableTitle } from "./data";
import {
  financeFieldDisplayList,
  financeFieldDisplaySave,
  getByParam,
  saveOrUpdate
} from "../../../../api/register/financialData";

export default {
  mixins: [generalPageMixins, pageMixins],
  components: {
    iButton,
    tableList,
    iInput,
    iDatePicker,
    iSelect
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
      this.tabValue = n;
      this.$nextTick(() => {
        if(n == "infor"){
          this.getInfor();
        }else{
          this.getTableList(n);
        }
      });
    },
    deep: true
  },
  data () {
    return {
      showTable: true, //重新渲染
      tableTitle: [],
      tableTitle2:[],
      tableLoading: false,
      tableListData: [],
      tableListData2: [],
      selectTableData: [],
      id: "",
      loading: false,
      loadPage: false,
      dataList:[],
    };
  },
  created () {
  },
  methods: {
    getInfor(){
      this.tableLoading = true;
      const pms = {
        financeIds: [],
      };
      this.comparisonTableData.forEach((item) => {
        pms.financeIds.push(item.id);
      });
      getByParam(pms).then(res=>{
        if(res.result){
          this.dataList = res.data;
          this.tableTitle2 = [
            {
              props: 'displayName',
              name: '字段',
              key: 'SUPPLIER_ZHIDUAN',
              width: 400,
              tooltip: true
            },{
              props: 'year',
              name: this.comparisonTableData[0].year,
              width: 180,
              tooltip: true
            },{
              props: '',
              name: "",
              tooltip: true
            }
          ];

          var isEdit = false;
          if(this.comparisonTableData[0].dataChannelName == "供应商数据"){
            isEdit = true;
          }

          if(res.data.length>0){
            this.tableListData2 = [
              {
                displayName:"成立时间",
                year:res.data[0].establishDate,
                isEdit:isEdit,
              },{
                displayName:"是否上市",
                year:res.data[0].listing,
                isEdit:isEdit,
              },{
                displayName:"企业类型",
                year:res.data[0].enterpriseType,
                isEdit:isEdit,
              },{
                displayName:"最终控股股东所在国家",
                year:res.data[0].shareholderCountry,
                isEdit:isEdit,
              },{
                displayName:"最终控股股东类型(自然人/法人)",
                year:res.data[0].shareholderType,
                isEdit:isEdit,
              },
            ]
          }else{
            this.tableListData2 = [
              {
                displayName:"成立时间",
                year:"",
                isEdit:isEdit,
              },{
                displayName:"是否上市",
                year:"",
                isEdit:isEdit,
              },{
                displayName:"企业类型",
                year:"",
                isEdit:isEdit,
              },{
                displayName:"最终控股股东所在国家",
                year:"",
                isEdit:isEdit,
              },{
                displayName:"最终控股股东类型(自然人/法人)",
                year:"",
                isEdit:isEdit,
              },
            ]
          }
        }
        this.tableLoading = false;
        this.loadPage = false;
      }).catch(e=>{
        this.tableLoading = false;
        this.loadPage = false;
      })
    },
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
      this.loadPage = true
      this.tableLoading = true
      if(this.tabValue == "infor"){
        const pms = {
          financeId: this.comparisonTableData[0].id,
          supplierId: this.comparisonTableData[0].supplierId,
          id: this.dataList.length>0?this.dataList[0].id:null
        };
        
        var num = 0;
        this.tableListData2.forEach(e=>{
          if(e.displayName=="成立时间"){
            pms.establishDate = e.year;
            if(!e.year) num++;
          }else if(e.displayName=="是否上市"){
            pms.listing = e.year;
            if(!e.year) num++;
          }else if(e.displayName=="企业类型"){
            pms.enterpriseType = e.year;
            if(!e.year) num++;
          }else if(e.displayName=="最终控股股东所在国家"){
            pms.shareholderCountry = e.year;
            if(!e.year) num++;
          }else if(e.displayName=="最终控股股东类型(自然人/法人)"){
            pms.shareholderType = e.year;
            if(!e.year) num++;
          }
        })
        if(num == 0){
          saveOrUpdate(pms).then(res=>{
            if(res.result){
              iMessage.success(res.desZh)
              this.getInfor();
            }else{
              iMessage.error(res.desZh)
              this.loadPage = false
              this.tableLoading = false
            }
          }).catch(e=>{
            iMessage.error(this.$t(APPROVAL.OPERATION_FAILED))
            this.loadPage = false
            this.tableLoading = false
          })
        }else{
          iMessage.error(this.$t("请填写完以下信息"))
          this.loadPage = false
          this.tableLoading = false
        }
      }else{
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
      }
      
    },
    async getTableList () {
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
          item.info && item.info.length && item.info.forEach((i, index) => {
            if (i.value !== null && !isNaN(i.value)) {
              return item.info[index].value = String(parseFloat(i.value).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          })
        })
        res.data &&
          res.data.list.map((item) => {
            item.info &&
              item.info.forEach((i, x) => {
                item["value" + x] = i.value;
                return (item["financeId" + x] = i.financeId);
              });
          });
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

        this.$nextTick(async () => {
          this.loadPage = false
          this.id = res.data && res.data.id;
          this.tableListData = res.data && res.data.list;
          this.page.currPage = res.data.current;
          this.page.pageSize = res.data.size;
          this.page.totalCount = res.data.total;
          await this.handleTitle();
          this.tableLoading = false;
          console.log(this.tableListData, "tableListData")
        });
      } catch {
        this.tableLoading = false
      }
    },

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

::v-deep .el-table__header-wrapper{
  background:#E0E7FE;
}
</style>