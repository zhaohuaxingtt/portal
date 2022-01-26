<!--合同归档首页表格-->
<template>
  <iTableCustom ref="testTable" :columns="columns" :data="tableData" @handle-selection-change="handleSelectionChange" @open-page="openPage" @ContractUpload="ContractUpload"></iTableCustom>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import ContractCoverCodeComponents from './ContractCoverCodeComponents'
import ContractBtn from './ContractBtn'

export default {
  name: 'HomeFrameWork',
  props: {
    tableData: { type: Array },
    contractStatus: { type: Array },
    signWayObj: { type: Object, default:()=>({}) },
    typeObj: { type: Object, default:()=>({}) },
  },
  computed: {
    contractState(type) {
      if (null != this.contractStatus && this.contractStatus.length > 0 && this.contractStatus != undefined) return this.contractStatus.find((i) => i.code.toUpperCase() == type.toUpperCase())?.name
      return type
    },
  },
  data() {
    return {
      columns: [
        {
          prop: 'termsCode',
          label: '条款编码',
          // i18n: 'LK_HETONGHAO',
          tooltip: false,
          headerAlign: 'center',
          align: 'center',
          width: 130,
        },
        {
          prop: 'termsCode',
          label: '条款Cover号',
          // i18n: 'LK_HETONGCOVERHAO',
          tooltip: false,
          headerAlign: 'center',
          align: 'center',
          width: 160,
          emit: 'open-page',
          customRender: (h, scope) => {
            let {termsCode, svwTempCodePp, id} = scope.row
            return <span class="underline g-blue">{termsCode+svwTempCodePp+'CV'+id}</span>
          },
        },
        {
          prop: 'termsType',
          label: '条款描述',
          // i18n: 'LK_HETONGMIAOSHU',
          tooltip: true,
          headerAlign: 'center',
          align: 'center',
          customRender: (h, scope) => {
            let desc = this.typeObj[scope.row.termsType]=='标准采购条款'?'国产零部件和生产材料采购条款':
            this.typeObj[scope.row.termsType]=='附件采购条款'?'原装附件采购条款':
            this.typeObj[scope.row.termsType]=='其它采购条款'?'其它采购条款修订版':''
            return <span>{desc}</span>
          },
        },
        {
          prop: 'termsType',
          label: '条款类型',
          // i18n: 'LK_HETONGLEIXING',
          tooltip: true,
          headerAlign: 'center',
          align: 'center',
          width: 140,
          customRender: (h, scope) => {
            return <span>{this.typeObj[scope.row.termsType]}</span>
          },
        },
        {
          prop: 'signWay',
          label: '签署方式',
          // i18n: 'LK_HETONGMIAOSHU',
          tooltip: true,
          headerAlign: 'center',
          align: 'center',
          customRender: (h, scope) => {
            return <span>{this.signWayObj[scope.row.signWay]}</span>
          },
        },
        {
          prop: 'supplierName',
          label: '供应商',
          i18n: 'LK_GONGYINSHNAG',
          headerAlign: 'center',
          align: 'center',
          minWidth: 140,
          customRender: (h, scope) => {
            let { svwTempCodePp, supplierName } = scope.row
            return <span>{svwTempCodePp+'-'+supplierName}</span>
          },
        },
        {
          prop: 'linieDeptName',
          label: '科室',
          i18n: 'LK_KESHI',
          tooltip: true,
          headerAlign: 'center',
          align: 'center',
          width: 130,
        },
        {
          prop: 'linieName',
          label: '采购员',
          i18n: 'LK_CHAIGOUYUAN',
          tooltip: false,
          headerAlign: 'center',
          align: 'center',
          width: 130,
        },
        {
          prop: 'termsStatus',
          label: '条款状态',
          // i18n: 'LK_HETONGZHUANGTAI',
          tooltip: false,
          headerAlign: 'center',
          align: 'center',
          width: 130,
          customRender: (h, scope) => {
            let { termsStatus } = scope.row
            return <span>{termsStatus=='06'?'已生效':'已归档'}</span>
          },
        },
        {
          prop: 'updateDate',
          label: '更新日期',
          // i18n: 'LK_GUIDANGRIQI',
          tooltip: false,
          headerAlign: 'center',
          align: 'center',
          width: 120,
          customRender: (h, scope) => {
            if (scope.row['updateDate'] != null) {
              let date = window.moment(new Date(scope.row.updateDate)).format('yyyy-MM-DD HH:mm:SS')
              return <span>{date}</span>
            }
            else{
              return <span>{scope.row['updateDate']}</span>
            }
          },
        },

        {
          prop: 'operation',
          label: '确认归档',
          // i18n: 'LK_CAOZUO',
          tooltip: false,
          headerAlign: 'center',
          align: 'center',
          width: 120,
          emit: 'ContractUpload',
          customRender: (h, scope, column) => {
            if(this.signWayObj[scope.row.signWay]=='线下签署'){
              let buttonText = ''
              if (scope.row.termsStatus == '06') { // 06: 已生效
                buttonText = '确认'
              } else if (scope.row.termsStatus == '07') { // 07: 已归档
                buttonText = '取消'
              }
              return <ContractBtn row={scope.row} buttonText={buttonText} />
            }else{
              return ''
            }
          },
        },
      ],
    }
  },
  components: {
    iTableCustom,
  },
  methods: {
    // 展开功能
    expandAll() {
      this.$refs.testTable.expandAll()
    },
    //收起
    collapseAll() {
      this.$refs.testTable.collapseAll()
    },
    //
    handleSelectionChange(row) {
      this.$emit('handleSelectionChange', row)
    },
    openPage(row) {
      this.$emit('open-page', row)
    },
    ContractUpload(row) {
      this.$emit('ContractUpload', row)
    },
  },
}
</script>

<style lang='scss' scoped>
.switch-text{
  font-size: 14px;
  vertical-align: middle;
}
::v-deep .g-blue {
    color: $color-blue
}
</style>
