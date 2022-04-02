<!--框架首页表格-->
<template>
  <iTableCustom
    ref="testTable"
    :loading="tableLoading"
    :columns="columns"
    :data="tableData"
    @handle-selection-change="handleSelectionChange"
    @open-page="openPage"
    :treeExpand="treeExpand"
    @purchaseAmount="purchaseAmount"
    @switchChange="switchChange"
    @handle-current-change="handleaaaaa"
  >
  </iTableCustom>
</template>

<script>
/*import {
  iTableCustom
} from "rise";*/
import iTableCustom from '@/components/iTableCustom'
import ISwitch from './iSwitch.vue'
// import aa from '@/store/module/approval.js'
export default {
  name: 'HomeFrameWork',
  props: {
    tableData: { type: Array },
    contractStatus: { type: Array },
    tableLoading: { type: Boolean, default: false }
  },

  computed: {
    contractState(type) {
      if (
        null != this.contractStatus &&
        this.contractStatus.length > 0 &&
        this.contractStatus != undefined
      )
        return this.contractStatus.find(
          (i) => i.code.toUpperCase() == type.toUpperCase()
        )?.name
      return type
    }
  },
  created() {
    console.log(this.$store.state.approval.switchData)
  },
  watch:{
    "$store.state.approval.switchData":{
      handler(newval){
        this.requestData.push({id:newval.id,isActive:newval.bool})

        let aa = [{id:newval.id,isActive:newval.bool}]
        // 实时更新原数据
        // let sit = newval.coordinate.split("-")
    
        // if(sit.length==1){
        //   this.tableData[sit[0]].isActive=newval.bool
        //   this.tableData.splice(0,0)
        // }
        // if(sit.length==2){
        //   this.tableData[sit[0]].subMaterialGroupList[sit[1]].isActive=newval.bool
        // }
        // if(sit.length==3){
        //   this.tableData[sit[0]].subMaterialGroupList[sit[2]].subMaterialGroupList[sit[2]].isActive=newval.bool
        // }
        
        this.$emit('returnData',this.requestData)
      } 
      
    }
  },
  data() {
    return {
      requestData:[],
      columns: [
        {
          type: 'selection',
          width: 50
        },
        {
          prop: 'indexCode',
          width: 67,
          i18n: '#',
          label: ''
        },
        {
          prop: 'materialGroupCode',
          label: '采购分类编号',
          i18n: '采购分类编号',
          tooltip: false,
          headerAlign: 'center',
          align: 'center',
          // width: 108
          minWidth: 120,
          type: 'expanded',
          
        },

        {
          prop: 'materialGroupName',
          label: '采购分类名称',
          i18n: '采购分类名称',
          tooltip: false,
          headerAlign: 'center',
          align: 'center',
          minWidth: 100,
          customRender: (h, scope) => {
            return (
              <span class="open-link-text">
                {scope.row.materialGroupName}
              </span>
            )
          },
          emit: 'purchaseAmount'
        },
        {
          prop: 'materialGroupLevel',
          label: '级别',
          i18n: '级别',
          tooltip: true,
          headerAlign: 'center',
          align: 'center'
        },
        {
          prop: 'organizationCode',
          label: '股别',
          i18n: '股别',
          tooltip: false,
          headerAlign: 'center',
          align: 'left',
          customRender: (h, scope, column) => {}
        },
        {
          prop: 'isActive',
          label: '是否生效',
          i18n: '是否生效',
          headerAlign: 'center',
          align: 'center',
           customRender: (h, scope, column) => {
             const isActive=scope.row.isActive
             return scope.row.isMinimumPurchase==true?(<ISwitch currVal={ scope.row.isActive } currItem = { scope.row } activeText={'Y'}  inactiveText={'N'} />):''
           },
          minWidth: 100,
          emit:'switchChange',
        },
        {
          prop: 'materialGroupDesc',
          label: '备注',
          i18n: '备注',
          tooltip: true,
          headerAlign: 'center',
          align: 'left',
          // width: 100,
          minWidth: 150,
          
        }
      ],
      treeExpand: {
        expandKey: 'materialGroupCode',
        childrenKey: 'subMaterialGroupList'
      }
    }
  },
  mounted(){
    
  },
  components: {
    iTableCustom
  },
  methods: {
    switchChange(val){
      console.log(val)
    },
    // 展开功能
    expandAll() {
      this.$refs.testTable.expandAll()
    },
    //收起
    collapseAll() {
      this.$refs.testTable.collapseAll()
    },
    //设置表头
    openSetting() {
      this.$refs.testTable.openSetting()
    },
    //
    handleSelectionChange(row) {
      this.$emit('handleSelectionChange', row)
    },
    openPage(row) {
      this.$emit('open-page', row)
    },
    //打开修改页面
    purchaseAmount(val) {
      this.$emit('changePage', val)
    }
  }
}
</script>

<style scoped>
.g-orange {
  color: orange;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
}
.g-grey {
  color: grey;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
}
</style>
