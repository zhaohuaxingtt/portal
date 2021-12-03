<!--
 * @Author: moxuan
 * @Date: 2021-04-15 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: 材料表格
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <el-dropdown v-permission="SUPPLIER_MATERIALGROUP_LIST_CONTORL"
                     split-button
                     trigger="click"
                     size="small"
                     type="primary"
                     @command="materialGroup"
                     class="meterial">
          材料组受控
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in controlListData"
                              :key="index"
                              :command="item.controlledState">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <i-button v-permission="SUPPLIER_MATERIALGROUP_LIST_EXPORT"
                  @click="handleSave">{{$t('LK_BAOCUN')}}</i-button>
        <i-button v-permission="SUPPLIER_MATERIALGROUP_LIST_BDL"
                  @click="toApplicationMBDL">{{language('SHENQINGMBDL','申请MBDL')}}</i-button>
        <i-button v-permission="SUPPLIER_MATERIALGROUP_LIST_BDL"
                  @click="toApplicationBDL">{{$t('SUPPLIER_SHENQINGBDL')}}</i-button>
        <i-button v-permission="SUPPLIER_MATERIALGROUP_LIST_CANCLE"
                  @click="getUncontrol">{{$t('SUPPLIER_QUXIAOSHOUKONG')}}</i-button>
        <i-button v-permission="SUPPLIER_MATERIALGROUP_LIST_CANCELBDL_RELATION"
                  @click="handleMbdlCance">{{language('YICHUMDBL','移除MBDL')}}</i-button>
        <i-button v-permission="SUPPLIER_MATERIALGROUP_LIST_CANCELBDL_RELATION"
                  @click="handleAssociated">{{language('YIICHUBDL','移除BDL')}}</i-button>

        <i-button v-permission="SUPPLIER_MATERIALGROUP_LIST_EXPORTALL"
                  @click="exportsAllTable">{{$t('SUPPLIER_DAOCHUQUANBU')}}</i-button>
        <i-button @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
    <table-list v-permission="SUPPLIER_MATERIALGROUP_LIST"
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                :index="true"
                :inputProps="['remark']"
                @handleSelectionChange="handleSelectionChange">
      <template #isEffect="scope">
        <span>{{scope.row.isEffect?$t('SUPPLIER_SPWC'):$t('SUPPLIER_SPZ')}}</span>
      </template>
    </table-list>
  </i-card>
</template>

<script>
import { iCard, iButton, iMessage } from "rise";
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { materialTableTitle } from './data'
import { addControl, getPageMaterialGroup, updateUncontrol, updateAssociated, updateControl, mbdlCancelAssociated } from "../../../../api/supplier360/material";
import { getDictByCode } from "../../../../api/dictionary/index";

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList
  },
  data () {
    return {
      inputProps: [],
      tableListData: [],
      tableTitle: materialTableTitle,
      tableLoading: false,
      selectTableData: [],
      controlListData: [],
      total: 0
    }
  },
  created () {
    this.getTableList()
    this.getControl()
  },
  methods: {
    async getControl () {
      const res = await getDictByCode('STU_CONTROLLED_STATE')
      this.controlListData = res.data[0].subDictResultVo
      this.controlListData.map((item) => {
        if (item.name === '可询价不可报价') {
          return item.controlledState = 1
        } else if (item.name === '可询价不可定点') {
          return item.controlledState = 2
        }
      })
    },
    async getTableList (form) {
      this.tableLoading = true
      const pms = {
        pageNo: 1,
        pageSize: 10,
        ...form
      }
      const res = await getPageMaterialGroup(pms)
      this.tableListData = res.data
      this.total = res.total
      this.tableLoading = false
    },
    handleSelectionChange (e) {
      this.selectTableData = e
    },
    async getUncontrol () {
      if (this.selectTableData.length === 1) {
        const res = await updateUncontrol({ controlledId: this.selectTableData[0].controlledId })
        this.resultMessage(res, () => {
          this.getTableList()
          this.nextStep = true
          this.tableLoading = false
        }, () => {
          this.tableLoading = false
        })
      }
    },
    async materialGroup (e) {
      if (this.selectTableData.length) {
        const pms = {
          stuControlledRecordSaveList: []
        }
        this.selectTableData.forEach((item) => {
          pms.stuControlledRecordSaveList.push({
            stuffSupplierId: item.id,
            controlledState: e
          })
        })
        const res = await addControl(pms)
        this.resultMessage(res, () => {
          this.getTableList()
          this.nextStep = true
          this.tableLoading = false
        }, () => {
          this.tableLoading = false
        })
      } else {
        this.iMessage.warn("请选择一条数据")
      }
    },
    async handleSave () {
      if (this.selectTableData.length !== 1) {
        iMessage.warn('只能选择一条数据')
        return
      }
      if (this.selectTableData[0].remark === '') {
        iMessage.warn('请填写受控原因')
        return
      }
      const pms = {
        id: this.selectTableData[0].controlledId,
        remark: this.selectTableData[0].remark
      }
      const res = await updateControl(pms)
      this.resultMessage(res, () => {
        this.getTableList()
      })
    },
    async handleAssociated () {
      if (this.selectTableData.length !== 1) {
        iMessage.warn('只能提交一条数据')
        return
      }
      const pms = {
        stuffBdlId: this.selectTableData[0].id
      }
      const res = await updateAssociated(pms)
      this.resultMessage(res, () => {
        this.getTableList()
      })
    },
    async handleMbdlCance () {
      if (this.selectTableData.length !== 1) {
        iMessage.warn('只能提交一条数据')
        return
      }
      const pms = {
        stuffBdlId: this.selectTableData[0].id
      }
      const res = await mbdlCancelAssociated(pms)
      this.resultMessage(res, () => {
        this.getTableList()
      })
    },
    toApplicationBDL () {
      this.$router.push({ path: '/supplier/application-BDL', query: { supplierToken: this.$route.query.supplierToken } })
    },
    toApplicationMBDL () {
      this.$router.push({ path: '/supplier/application-BDL', query: { supplierToken: this.$route.query.supplierToken, mbdl: true } })
    },
    async exportsAllTable () {
      const pms = {
        pageNo: 1,
        pageSize: this.total
      }
      const res = await getPageMaterialGroup(pms)
      this.selectTableData = res.data
      this.exportsTable()
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep {
  .floatright {
    .el-dropdown .el-button-group {
      margin-right: 0.7rem !important;
    }
    .el-button--primary {
      background-color: #eef2fb !important;
      color: #1763f7 !important;
      border: transparent !important;
      font-size: 1rem;
    }
  }
}
</style>