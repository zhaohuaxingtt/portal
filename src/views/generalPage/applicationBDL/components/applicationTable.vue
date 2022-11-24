<!--
 * @Author: moxuan
 * @Date: 2021-04-15 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: 材料表格
-->
<template>
  <div>
    <i-card>
      <div class="font18 font-weight margin-bottom10">{{$t('SUPPLIER_FUJIANCAILIAOZUBUXUYAOXUANZE_LINIE_KESHIHE_LINIE')}}</div>
      <el-form :model="form"
               ref="formName">
        <el-row :gutter="20"
                justify='space-between'
                align='middle'>
          <el-col :span="5">
            <!-- <el-form-item :label="mbdl?language('QIANQICAIGOUKESHI','前期采购科室'):language('LINIEKESHICSS3','LINIE科室')"> -->
              <el-form-item :label="$t('SUPPLIER_KESHI')">
              <iSelect v-permission="SUPPLIER_APPLYBDL_VW_LINIE_DEPT"
                       @change="handleUser"
                       :placeholder="$t('LK_QINGXUANZE')"
                       v-model="form.deptId"
                       :disabled="isAcc">
                <el-option :value="item.id"
                           :label="item.nameZh"
                           v-for="(item, index) in formGroup.deptList"
                           :key="index"></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <!-- <el-form-item prop="linieId"
                          :rules="isAcc ? [] : [{required: true, message: '请选择',}]"
                          :label="mbdl?language('QIANQICAIGOUYUAN','前期采购员'):language('LINICAIGOUYUAN','LINIE采购员')"> -->
            <el-form-item prop="linieId"
            :rules="isAcc ? [] : [{required: true, message: '请选择',}]"
            :label="$t('SPR_FRM_XGYSPJ_CGY')">
              <iSelect v-permission="SUPPLIER_APPLYBDL_VW_LINIE_SOURCER"
                       :placeholder="$t('LK_QINGSHURU')"
                       v-model="form.linieId"
                       :disabled="isAcc">
                <el-option :value="item.id"
                           :label="item.nameZh"
                           v-for="(item, index) in formGroup.userList"
                           :key="index"></el-option>
              </iSelect>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <div class="info-btn">
              <i-button v-permission="SUPPLIER_APPLYBDL_RESET"
                        @click="getReset">{{$t('LK_ZHONGZHI')}}</i-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </i-card>
    <i-card class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <i-button v-permission="SUPPLIER_APPLYBDL_ADD"
                    @click="addBDL">{{$t('LK_TIANJIA')}}</i-button>
          <i-button v-permission="SUPPLIER_APPLYBDL_SUBMIT"
                    @click="submit">{{$t('LK_TIJIAO')}}</i-button>
          <i-button v-permission="SUPPLIER_APPLYBDL_EXPORT"
                    @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
        <buttonTableSetting @click="$refs.tableListRef.openSetting()"></buttonTableSetting>
        </div>
      </div>
      <!-- v-permission="SUPPLIER_APPLYBDL_TABEL" -->
      <!-- <table-list 
                  :height="400"
                  :tableData="tableListData"
                  :tableTitle="tableTitle"
                  :tableLoading="tableLoading"
                  :index="true"
                  @handleSelectionChange="handleSelectionChange" /> -->

      <iTableCustom
        ref="tableListRef"
        :data="tableListData"
        :columns="tableTitle"
        :loading="tableLoading"
        @handle-selection-change="handleSelectionChange"
      >
      </iTableCustom>
      
      <add-bdl-dialog :title="$t('LK_TIANJIA')"
                      @handleSelection='handleSelection'
                      v-model="addBdldialog" />
    </i-card>
  </div>
</template>

<script>
import { iCard, iButton, iMessage, iSelect, } from "rise";
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import iTableCustom from '@/components/iTableCustom'
import tableList from '@/components/commonTable'
import buttonTableSetting from '@/components/buttonTableSetting'
import { pageMixins } from "@/utils/pageMixins";
import { applicationBDLTableTitle } from './data'
import addBdlDialog from './addBdlDialog'
import { getStuffMaterials, submitBdl, getUserList, getDeptList, getPreDeptList, getPreUserList, checkCategory } from "../../../../api/supplier360/material";
// import { getPurchaseDeptList, getPurchaseUserList } from '@/api/supplier360/material'


export default {
  mixins: [generalPageMixins, pageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    addBdlDialog,
    iSelect,
    iTableCustom,
    buttonTableSetting
  },
  data () {
    return {
      form: {
        deptId: '',
        linieId: ''
      },
      tableListData: [],
      tableTitle: applicationBDLTableTitle,
      tableLoading: false,
      selectTableData: [],
      addBdldialog: false,
      formGroup: {
        userList: [],
        deptList: []
      },
      index: null,
      isAcc: false,
      mbdl: false
    }
  },
  created () {
    this.mbdl = this.$route.query.mbdl
    this.getDeptList()
    // this.getTableList()
  },
  methods: {
    async handleUser (val) {
      let obj = this.formGroup.deptList.find(item => item.id === val)
      this.formGroup.userList = []
      this.form.linieId = ''
      if (this.mbdl) {
        const res = await getPreUserList({ supplierToken: this.$route.query.supplierToken, deptNum: obj.deptNum, queryDeptId: obj.id })
        this.formGroup.userList = res.data
      } else {
        const res = await getUserList({ id: val, deptNum: obj.deptNum })
        this.formGroup.userList = res.data
      }

    },
    getReset () {
      this.form = {
        deptId: '',
        linieId: ''
      }
    },
    submit () {
      if (this.selectTableData.length === 0) {
        iMessage.warn(this.$t('SPR_FRM_XGYSPJ_QXZYTSJTJ'))
        return
      }
      if (this.selectTableData.length > 1) {
        iMessage.warn(this.$t('SPR_FRM_ZNXZYTSJ'))
        return
      }
      if (this.selectTableData[0].categoryCode === '9999') {
        this.handleSubmit()
      } else {
        this.$refs.formName.validate((valid) => {
          if (valid) {
            this.handleSubmit()
          }
        })
      }
    },
    handleSubmit () {
      checkCategory({
        categoryIds: this.selectTableData.map(item => item.categoryId),
        checkUserId: this.form.linieId
      }).then(async res => {
        if (res.code === '200') {
          if (res.data) {
            const pms = {
              "linieId": this.form.linieId,
              supplierToken: this.$route.query.supplierToken,
              taskId: this.$route.query.id,
              "bdlSaveList": [],
            }
            this.selectTableData.forEach((item) => {
              pms.bdlSaveList.push({
                stuffId: item.id,
                stuffCode: item.stuffCode,
                categoryId: item.categoryId,
                categoryCode: item.categoryCode,
                categoryNameZh: item.categoryNameZh,
                bdlType: this.$route.query.mbdl ? 2 : 1
              })
            })
            const res = await submitBdl(pms)
            this.resultMessage(res, () => {
              // this.getTableList()
              this.tableListData = window._.difference(this.tableListData, this.selectTableData)
              this.selectTableData = []
            })
          } else {
            iMessage.error(this.language('NINXUANZEDECAIGOUYUANMEIYOUGAICAILIAOZUDECAOZUOQUANXIANQINGLIANXIXITONGGUANLIYUANTIANJIACAOZUOQUANXIAN', '您选择的采购员没有该材料组的操作权限，请联系系统管理员添加操作权限'))
          }
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    async getDeptList () {
      if (this.$route.query.mbdl) {
        const dept = await getPreDeptList({ supplierToken: this.$route.query.supplierToken })
        this.formGroup.deptList = dept.data
      } else {
        const dept = await getDeptList()
        this.formGroup.deptList = dept.data
      }
    },
    // async getTableList() {
    //   this.tableLoading = true
    //   const pms = {
    //     pageNo: this.page.currPage,
    //     pageSize: this.page.pageSize,
    //     supplierToken: this.$route.query.supplierToken,
    //   }
    //   const res = await getStuffMaterials(pms)
    //   this.page.currPage = res.pageNum
    //   this.page.pageSize = res.pageSize
    //   this.page.totalCount = res.total
    //   this.tableLoading = false
    //   this.tableListData = res.data
    //   this.index = res.data.length - 1
    // },
    handleOpenPage () {
    },
    handleSelectionChange (e) {
      this.selectTableData = e
    },
    handleSelection (e) {
      checkCategory({
        categoryIds: e.map(item => item.categoryId),
        checkUserId: this.$store.state.permission.userInfo.id
      }).then(res => {
        if (res.code === '200') {
          if (res.data) {
            var ids = []
            e.forEach(item => {
              this.tableListData.forEach(item => {
                ids.push(item.id)
              })
              if (!ids.includes(item.id)) {
                if (item.categoryCode == "9999") {
                  this.isAcc = true;
                  Vue.set(this.form, "deptId", "")
                  Vue.set(this.form, "linieId", "")
                }
                this.tableListData.push(item)
                this.addBdldialog = false
                // this.selectTableData = this.tableListData
              }
            })
          } else {
            iMessage.error(this.language('QINGLIANXIXITONGGUANLIYUANTIANJIAGAICAILIAOZUDECAOZUOQUANXIAN', '请联系系统管理员添加该材料组的操作权限'))
            return
          }
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    addBDL () {
      this.addBdldialog = true
    }
  }
}
</script>

<style scoped>
.info-btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>