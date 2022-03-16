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
  ></iTableCustom>
</template>

<script>
/*import {
  iTableCustom
} from "rise";*/
import iTableCustom from '@/components/iTableCustom'

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
  created() {},
  data() {
    return {
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
          prop: 'erpMaterialNo',
          label: '采购分类编号',
          i18n: '采购分类编号',
          tooltip: false,
          headerAlign: 'center',
          align: 'center',
          // width: 108
          minWidth: 120,
          customRender: (h, scope) => {
            return (
              <span class="open-link-text"> {scope.row.erpMaterialNo} </span>
            )
          },
          emit: 'purchaseAmount'
        },

        {
          prop: 'remark',
          label: '采购分类名称',
          i18n: '采购分类名称',
          tooltip: false,
          headerAlign: 'center',
          align: 'center',
          minWidth: 100,
          type: 'expanded'
        },
        {
          prop: 'price',
          label: '级别',
          i18n: '级别',
          tooltip: true,
          headerAlign: 'center',
          align: 'center'
        },
        {
          prop: 'quantity',
          label: '股别',
          i18n: '股别',
          tooltip: false,
          headerAlign: 'center',
          align: 'left',
          customRender: (h, scope, column) => {}
        },
        {
          prop: 'priceUnit',
          label: '是否生效',
          i18n: '是否生效',
          tooltip: true,
          headerAlign: 'center',
          align: 'center',
          minWidth: 100
        },
        {
          prop: 'totalPrice	',
          label: '备注',
          i18n: '备注',
          tooltip: true,
          headerAlign: 'center',
          align: 'left',
          // width: 100,
          minWidth: 150,
          customRender: (h, scope) => {}
        }
      ],
      treeExpand: {
        expandKey: 'remark',
        childrenKey: 'priceLibraryCbdList'
      }
    }
  },
  components: {
    iTableCustom
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
