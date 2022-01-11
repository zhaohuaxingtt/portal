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
        <span>{{scope.row.isEffect?language('SHENPITONGGUO','审批通过'):language('SHENPIZHONG','审批中')}}</span>
      </template>
      <template #bdlType="scope">
        <span>{{scope.row.bdlType==='2'?language('SHI','是'):language('FOU','否')}}</span>
      </template>
    </table-list>
    <iPagination v-update
                 @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)"
                 background
                 :current-page="page.currPage"
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :total="page.totalCount" />
    <iDialog :visible="show"
             :title="papgeTitle"
             :destroy-on-close="true"
             @close="closeDialog"
             width="200">
      <el-form :model="form"
               ref="formName"
               label-position="left"
               :inline-message="true">
        <el-row :gutter="20"
                align='middle'>
          <el-col :span="10">
            <el-form-item label-width="120px"
                          prop="deptId"
                          :rules="{required: true, message: '请选择'}"
                          :label="type==='QQCGY'?language('QIANQICAIGOUKESHI','前期采购科室'):language('LINIEKESHICSS3','LINIE科室')">
              <iSelect v-permission="SUPPLIER_APPLYBDL_VW_LINIE_DEPT"
                       @change="handleUser"
                       :disabled="isAcc"
                       :placeholder="$t('LK_QINGXUANZE')"
                       v-model="form.deptId">
                <el-option :value="item.id"
                           :label="item.nameZh"
                           v-for="(item, index) in formGroup.deptList"
                           :key="index"></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="linieId"
                          label-width="120px"
                          :rules="isAcc ? [] : [{required: true, message: '请选择',}]"
                          :label="type==='QQCGY'?language('QIANQICAIGOUYUAN','前期采购员'):language('LINICAIGOUYUAN','LINIE采购员')">
              <iSelect v-permission="SUPPLIER_APPLYBDL_VW_LINIE_SOURCER"
                       :placeholder="$t('LK_QINGSHURU')"
                       :disabled="isAcc"
                       v-model="form.linieId">
                <el-option :value="item.id"
                           :label="item.nameZh"
                           v-for="(item, index) in formGroup.userList"
                           :key="index"></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot='footer'
           class="flex-between-center ">
        <div style="font-size:14px;font-weight:bold">tips:{{language('RUOXIANGXUANZESHANGSHUFANWEIYIWAIDECAIGOUYUANQINGLIANXIXITONGGUANLIYUANWEIQITIANJIADANGQIANCAILIAOZUCAOZUOQUANXIAN','若想选择上述范围以外的采购员，请联系系统管理员为其添加当前材料组操作权限。')}}</div>
        <div>
          <iButton @click="cancel">{{language('QUXIAO','取消')}}</iButton>
          <iButton @click="sure">{{language('QUEDING','确定')}}</iButton>
        </div>

      </div>
    </iDialog>
  </i-card>
</template>

<script>
import { iCard, iButton, iMessage, iPagination, iDialog, iSelect } from "rise";
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable'
import { materialTableTitle } from './data'
import { addControl, getPageMaterialGroup, updateUncontrol, updateAssociated, updateControl, mbdlCancelAssociated, checkCategory } from "../../../../api/supplier360/material";
import { getDictByCode } from "../../../../api/dictionary/index";
import { getPurchaseDeptList, getPurchaseUserList, associated } from '@/api/supplier360/material'

export default {
  mixins: [generalPageMixins, pageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination,
    iDialog,
    iSelect
  },
  data () {
    return {
      inputProps: [],
      tableListData: [],
      tableTitle: materialTableTitle,
      tableLoading: false,
      selectTableData: [],
      controlListData: [],
      show: false,
      isAcc: false,
      type: "",
      papgeTitle: "",
      form: {
        deptId: "",
        linieId: ""
      },
      formGroup: {
        deptList: [],
        userList: []
      }
      // total: 0
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
    closeDialog () {
      this.show = false
      this.isAcc = false
      this.form = {
        deptId: "",
        linieId: ""
      }
    },
    async getTableList (form) {
      console.log(this.$store.state, "2222")
      this.tableLoading = true
      const pms = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...form
      }
      const res = await getPageMaterialGroup(pms)
      this.tableListData = res.data
      this.page.currPage = res.pageNum
      this.page.pageSize = res.pageSize
      this.page.totalCount = res.total
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
      if (!this.selectTableData[0].isEffect) {
        iMessage.warn('审批中不能申请移除BDL')
        return
      }
      checkCategory({
        categoryIds: this.selectTableData.map(item => item.categoryId),
        checkUserId: this.$store.state.permission.userInfo.id
      }).then(async res => {
        if (res.code === '200') {
          if (res.data) {
            var ids = []
            this.selectTableData.forEach(item => {
              this.tableListData.forEach(item => {
                ids.push(item.id)
              })
              if (ids.includes(item.id)) {
                if (item.categoryCode == "9999") {
                  this.isAcc = true;
                  Vue.set(this.form, "deptId", "")
                  Vue.set(this.form, "linieId", "")
                }
              }
            })
            this.papgeTitle = '附件材料组不需要选择Linie科室和Linie'
            this.show = true
            this.type = 'LINIE'
            let req = await getPurchaseDeptList({
              categoryId: this.selectTableData[0].categoryId,
              supplierId: this.selectTableData[0].supplierId,
              supplierToken: this.$route.query.supplierToken,
              type: this.type
            })
            this.formGroup.deptList = req.data
          } else {
            iMessage.error(this.language('QINGLIANXIXITONGGUANLIYUANTIANJIAGAICAILIAOZUDECAOZUOQUANXIAN', '请联系系统管理员添加该材料组的操作权限'))
          }
        } else {
          iMessage.error(res.desZh)
        }
      })

    },
    async handleMbdlCance () {
      if (this.selectTableData.length !== 1) {
        iMessage.warn('只能提交一条数据')
        return
      }
      checkCategory({
        categoryIds: this.selectTableData.map(item => item.categoryId),
        checkUserId: this.$store.state.permission.userInfo.id
      }).then(async res => {
        if (res.code === '200') {
          if (res.data) {
            var ids = []
            this.selectTableData.forEach(item => {
              this.tableListData.forEach(item => {
                ids.push(item.id)
              })
              if (ids.includes(item.id)) {
                if (item.categoryCode == "9999") {
                  this.isAcc = true;
                  Vue.set(this.form, "deptId", "")
                  Vue.set(this.form, "linieId", "")
                }
              }
            })
            this.papgeTitle = '附件材料组不需要选择前期采购员所属科室和前期采购员'
            this.show = true
            this.type = 'QQCGY'
            let req = await getPurchaseDeptList({
              categoryId: this.selectTableData[0].categoryId,
              supplierId: this.selectTableData[0].supplierId,
              supplierToken: this.$route.query.supplierToken,
              type: this.type
            })
            this.formGroup.deptList = req.data
          } else {
            iMessage.error(this.language('QINGLIANXIXITONGGUANLIYUANTIANJIAGAICAILIAOZUDECAOZUOQUANXIAN', '请联系系统管理员添加该材料组的操作权限'))
          }
        } else {
          iMessage.error(res.desZh)
        }

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
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
      }
      const res = await getPageMaterialGroup(pms)
      this.selectTableData = res.data
      this.exportsTable()
    },
    handleUser (val) {
      getPurchaseUserList({
        categoryId: this.selectTableData[0].categoryId,
        supplierId: this.selectTableData[0].supplierId,
        supplierToken: this.$route.query.supplierToken,
        queryDeptId: val,
        type: this.type
      }).then(res => {
        this.formGroup.userList = res.data
        this.form.linieId = ""
      })
    },
    cancel () {
      this.show = false
    },
    async sure () {
      const pms = {
        stuffBdlId: this.selectTableData[0].id,
        categoryName: this.selectTableData[0].categoryNameZh,
        categoryCode: this.selectTableData[0].categoryCode,
        categoryId: this.selectTableData[0].categoryId,
        supplierToken: this.$route.query.supplierToken,
        // supplierId: this.selectTableData[0].supplierId,
        purchaseId: this.form.linieId
      }
      if (this.type === 'QQCGY') {
        const res = await mbdlCancelAssociated(pms)
        this.resultMessage(res, () => {
          this.cancel()
          this.getTableList()
        })
      } else if (this.type === 'LINIE') {
        const res = await associated(pms)
        this.resultMessage(res, () => {
          this.cancel()
          this.getTableList()
        })
      }
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