<!--
 * @Date: 2021-12-16 17:21:59
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-17 17:56:36
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\userManage\components\Systemdetail.vue
-->
<template>
  <iDialog :visible.sync="value"
           width="90%"
           top="2%"
           @close="clearDiolog"
           :title="language('GUANLIANYINGYONG', '关联应用')">
    <div class="btnbox">
      <i-button @click="add">{{ language('TIANJIA', '添加') }}
      </i-button>
      <i-button @click="del">{{ language('SHANCHU', '删除') }}
      </i-button>
      <i-button @click="save">{{ language('BAOCUN', '保存') }}
      </i-button>
    </div>
    <table-list style="padding-bottom:20px" :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :index="true"
                ref="commonTable">

    </table-list>
      <systeamDetailAdd @closeDiolog="closeDiolog" @selectTableDataDetail="selectTableDataDetail"   v-model="isdialog" :rowList="rowList"></systeamDetailAdd>
  </iDialog>
</template>

<script>
import tableList from '@/components/commonTable'
import  systeamDetailAdd  from './systeamDetailAdd'
import { iDialog, iButton, iMessage } from 'rise'
import { tableTitleDetail } from './data'
import { operationAdd, operationQuery } from '@/api/opcs/system'
export default {
  components: {
    iDialog,
    iButton,
    tableList,
    systeamDetailAdd
  },
  props: {
    value: { type: Boolean },
    rowList:{type:Object}
  },
  watch:{
      rowList(val){
          console.log(val)
          if(val){
          this.getTableData()
          }
      }
  },
  data() {
    return {
        isdialog:false,
      tableLoading: false,
      tableTitle: tableTitleDetail,
      selectTableData: [],
      tableListData: []
    }
  },
  created(){
      console.log(this.rowList)
  },
  methods: {
    //获取列表接口
    getTableData() {
      this.tableLoading = true
      const params = {
        opcsSupplierId: this.$route.query.opcsSupplierId,
        pageNo: 1,
        pageSize: 99999,
        opcsUserId: this.rowList.id
      }
      operationQuery(params).then((res) => {
        this.tableLoading = false
        if (res && res.code == 200) {
            this.tableListData=res.data
        } else iMessage.error(res.desZh)
      })
    },
    save() {
      let parmars = {
        saveUserList: this.tableListData,
        opcsSupplierKeyId: this.$route.query.opcsSupplierId
      }
      operationAdd(parmars).then((res) => {
        if (res && res.code == 200) {
          this.getTableData()
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    add(){
        this.isdialog=true
    },
    selectTableDataDetail(val){
        console.log(val)
        val.forEach(v => {
            this.tableListData.push(v)
        });
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    clearDiolog() {
      this.$emit('closeDiolog')
    },
    closeDiolog(){
            this.isdialog=false
    }
  }
}
</script>

<style>
.btnbox {
  text-align: right;
  padding: 0 0 20px 0px;
}
</style>