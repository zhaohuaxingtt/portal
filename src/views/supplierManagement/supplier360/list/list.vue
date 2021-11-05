<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <div>
    <iSearch class="margin-bottom20 "
             style="margin-top: 20px"
             @sure="getLsitBtn"
             @reset="handleSearchReset"
             :resetKey="PARTSPROCURE_RESET"
             :searchKey="PARTSPROCURE_CONFIRM">
      <el-form>
        <el-form-item :label="$t('SUPPLIER_SUPPLIERTYPE')">
          <iSelect @change="changeSupplierType"
                   :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                   v-model="form.supplierType">
            <el-option v-for="(item, index) in fromGroup.supplierTypeList"
                       :key="index"
                       :value="item.code"
                       :label="item.name">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_GONGYINGSHANGMINGCHENG')">
          <iInput :placeholder="$t('APPROVAL.PLEASE_INPUT')"
                  v-model="form.supplierName"></iInput>
        </el-form-item>
        <el-form-item :label="$t('UnifySocialCreditCode')">
          <iInput :placeholder="$t('APPROVAL.PLEASE_INPUT')"
                  v-model="form.socialcreditNo"></iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_CAILIAOZU_DUNSHAO')">
          <iInput :placeholder="$t('APPROVAL.PLEASE_INPUT')"
                  v-model="form.dunsCode"></iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_LINGSHIHAO')">
          <iInput :placeholder="$t('APPROVAL.PLEASE_INPUT')"
                  v-model="form.svwTempCode"></iInput>
        </el-form-item>
        <el-form-item v-if="form.supplierType === 'PP'"
                      :label="$t('SUPPLIER_VWHAO')">
          <iInput :placeholder="$t('APPROVAL.PLEASE_INPUT')"
                  v-model="form.vwCode">
          </iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_SAPHAO')">
          <iInput :placeholder="$t('APPROVAL.PLEASE_INPUT')"
                  v-model="form.sapCode"></iInput>
        </el-form-item>
        <el-form-item v-if="form.supplierType === 'PP'"
                      :label="$t('SUPPLIER_SVWHAO')">
          <iInput :placeholder="$t('APPROVAL.PLEASE_INPUT')"
                  v-model="form.svwCode"></iInput>
        </el-form-item>
        <el-form-item :label="$t('companyAddress')">
          <iInput :placeholder="$t('APPROVAL.PLEASE_INPUT')"
                  v-model="form.address"></iInput>
        </el-form-item>
        <!-- 材料组/工艺组编号 -->
        <el-form-item :label="$t('SUPPLIER_CAILIAOZU_GONGYIZUBIANHAO')">
          <iInput :placeholder="$t('APPROVAL.PLEASE_INPUT')"
                  v-model="form.materialOrCraftCode"></iInput>
        </el-form-item>
        <el-form-item :label="$t('GONGHUO')">
          <iSelect :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                   v-model="form.isActive">
            <el-option v-for="(item, index) in fromGroup.supplierStatusList"
                       :key="index"
                       :value="item.code"
                       :label="item.name">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_CAILIAOZU_XIANGGUANKESHI')">
          <iSelect :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                   v-model="form.dept">
            <el-option v-for="(item, index) in fromGroup.deptList"
                       :key="index"
                       :value="item.name"
                       :label="item.name">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_CAILIAOZU_ISXIANGGUNA')">
          <iSelect :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
                   v-model="form.relatedToMe">
            <el-option v-for="(item, index) in fromGroup.relatedToMeList"
                       :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <i-card class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <i-button @click="lacklistBtn('join',language('JIARU', '加入'))">{{
            $t('SUPPLIER_CAILIAOZU_JIARUHEIMINGDAN')
          }}</i-button>
          <i-button @click="lacklistBtn('remove',language('YICHU', '移除'))">{{
            $t('SUPPLIER_CAILIAOZU_YICHUHEIMINGDAN')
          }}</i-button>
          <i-button @click="handleRating">{{
            $t('SUPPLIER_CAILIAOZU_FAQICHUPINGQINGDAN')
          }}</i-button>
          <i-button @click="handleRegister">{{
            $t('SUPPLIER_CAILIAOZU_YAOQINGZHUCE')
          }}</i-button>
        </div>
      </div>
      <table-list :tableData="tableListData"
                  :tableTitle="tableTitle"
                  :tableLoading="tableLoading"
                  @handleCurrentChange="handleClickRow"
                  :highlightCurrentRow="true"
                  @handleSelectionChange="handleSelectionChange"
                  :openPageProps="'nameZh'"
                  @openPage="openPage"
                  :openPageGetRowData="true"
                  :index="true">
        <template #supplierStatus="scope">
          <div v-if="form.supplierType=='GP'">
            <i-button v-if="scope.row.isGpBlackList != 1"
                      type="text"
                      @click="handleBlackList(scope.row)">{{
            language('ZHENGCHANG', '正常')
          }}</i-button>
            <i-button type="text"
                      v-if="scope.row.isGpBlackList == 1"
                      @click="handleBlackList(scope.row)">{{ language('SHOUKONG', '受控') }}</i-button>
          </div>
          <div v-if="form.supplierType=='PP'">
            <i-button v-if="scope.row.isPpBlackList != 1"
                      type="text"
                      @click="handleBlackList(scope.row)">{{
            language('ZHENGCHANG', '正常')
          }}</i-button>
            <i-button type="text"
                      v-if="scope.row.isPpBlackList == 1"
                      @click="handleBlackList(scope.row)">{{ language('SHOUKONG', '受控') }}</i-button>
          </div>

        </template>

      </table-list>
      <iPagination v-update
                   @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :current-page="page.currPage"
                   :total="page.totalCount" />
      <listDialog @getTableList="getTableList"
                  v-model="listDialog"></listDialog>
      <!-- 一般供应商加入黑名单 -->
      <joinlacklistGp v-if="clickTableList.id!=''"
                      :key="gpJoinParams.key+1"
                      @closeDiolog="closeDiolog"
                      v-model="gpJoinParams.visible"
                      :clickTableList="clickTableList">
      </joinlacklistGp>
      <!-- 一般供应商移除黑名单 -->
      <removelacklistGp v-if="clickTableList.id!=''"
                        :key="gpRemoveParams.key+2"
                        v-model="gpRemoveParams.visible"
                        @closeDiolog="closeDiolog"
                        :clickTableList="clickTableList">
      </removelacklistGp>
      <!-- 一般供应商黑命单记录 -->

      <blackListGp v-if="rowList.id!=''"
                   :key="gpBlackParams.key+3"
                   v-model="gpBlackParams.visible"
                   @closeDiolog="closeDiolog"
                   :clickTableList="rowList">
      </blackListGp>
      <!-- 生产供应商加入黑名单 -->
      <joinlacklistPP v-if="clickTableList.id!=''"
                      :key="ppJoinParams.key+4"
                      v-model="ppJoinParams.visible"
                      @closeDiolog="closeDiolog"
                      :clickTableList="clickTableList">
      </joinlacklistPP>
      <!-- 生产供应商移除黑名单 -->
      <removelacklistPP v-if="clickTableList.id!=''"
                        :key="ppremoveParams.key+5"
                        v-model="ppremoveParams.visible"
                        @closeDiolog="closeDiolog"
                        :clickTableList="clickTableList">
      </removelacklistPP>
      <!-- 生产供应商黑命单记录 -->
      <blackListPp v-if="rowList.id!=''"
                   :key="ppBlackParams.key+6"
                   v-model="ppBlackParams.visible"
                   @closeDiolog="closeDiolog"
                   :clickTableList="rowList">
      </blackListPp>
    </i-card>
  </div>
</template>

<script>
import {
  iCard,
  iButton,
  iSearch,
  iMessage,
  iInput,
  iSelect,
  iPagination
} from 'rise'
import { getBuyerType } from '@/api/supplier360/blackList'
import blackListPp from './components/blackListPp'
import blackListGp from './components/blackListGp'
import removelacklistGp from './components/removelacklistGp'
import joinlacklistGp from './components/joinlacklistGp'
import removelacklistPP from './components/removelacklistPP'
import joinlacklistPP from './components/joinlacklistPP'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle, dictByCode } from './data'
import listDialog from './listDialog'
import { getBasicList } from '@/api/basic/basic'
import { addInitial } from '@/api/frmRating/overView/overView.js'
export default {
  mixins: [generalPageMixins, pageMixins],
  components: {
    iCard,
    iButton,
    iInput,
    tableList,
    iSelect,
    iPagination,
    listDialog,
    iSearch,
    joinlacklistGp,
    removelacklistGp,
    joinlacklistPP,
    removelacklistPP,
    blackListGp,
    blackListPp
  },
  data() {
    return {
      supplierId: '',
      gpRemoveParams: {
        key: 0,
        visible: false
      },
      gpJoinParams: {
        key: 0,
        visible: false
      },
      gpBlackParams: {
        key: 0,
        visible: false
      },
      ppremoveParams: {
        key: 0,
        visible: false
      },
      ppJoinParams: {
        key: 0,
        visible: false
      },
      ppBlackParams: {
        key: 0,
        visible: false
      },
      isShowPpBlackList: false,
      listDialog: false,
      fromGroup: {
        deptList: [],
        supplierStatusList: [],
        supplierTypeList: [],
        relatedToMeList: [
          {
            label: this.$t('SUPPLIER_SHI'),
            value: true
          },
          {
            label: this.$t('SUPPLIER_FOU'),
            value: false
          }
        ]
      },
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      selectTableList: {},

      userType: 'PRE',
      form: {
        supplierName: '',
        socialcreditNo: '',
        address: '',
        dunsCode: '',
        svwTempCode: '',
        sapCode: '',
        svwCode: '',
        vwCode: '',
        isActive: '',
        supplierType: 'GP',
        dept: '',
        relatedToMe: '',
        materialOrCraftCode: ''
      },
      carTypeOptions: [],
      partTypeOptions: [],
      rfqStatusOptions: [],
      assignmentRfqIdList: [],
      tab: 'source',
      selectDatalist: [],
      clickTableList: {
        id: ''
      },
      rowList: {
        id: ''
      }
    }
  },
  created() {
    this.handleInfo()
    this.getTableList()
  },
  methods: {
    getUserType() {
      //   getBuyerType().then((res) => {
      //   if (res && res.code == 200) {
      //     this.userType = res.data
      //     if (res.data == 'LINIE') {
      //      this.form.supplierType=""
      //       this.getprePurchaseDept()
      //     } else if (res.data == 'PRE') {
      //       //   this.getliniePurchase()
      //       this.getliniePurchaseDept()
      //     }
      //     this.getLinieList()
      //   } else iMessage.error
      //   })
    },
    //加入黑名单
    lacklistBtn(type, text) {
      if (this.selectTableData.length == 0) {
        this.supplierId = ''
      } else {
        this.supplierId = this.selectTableData[0].id
        this.clickTableList = this.selectTableData[0]
      }

      if (this.selectTableData.length == 0) {
        this.$message({
          type: 'warning',
          message: this.language(
            'QINGXUANZEXUYAO' + text + 'HEIMINGDANDEGONGYINGSHANG',
            '请选择需要' + text + '黑名单的供应商'
          )
        })
      } else if (this.selectTableData.length > 1) {
        this.$message({
          type: 'warning',
          message: this.language(
            text + 'HEIMINGDANJINKEDANXUAN,QINGCHOMGXINXUANZE',
            text + '黑名单仅可单选，请重新选择'
          )
        })
      } else if (type == 'join') {
        if (this.form.supplierType == 'GP') {
        //   if (this.clickTableList.isGpBlackList == 1) {
        //     this.$message({
        //       type: 'warning',
        //       message: this.language(
        //         'GAIGONGYINGSHANGSUOYOUYEWULEIXINGJUNYISHOUKONG,WUXUCHONGFUTIANJIA',
        //         '该供应商所有业务类型均已受控，无需重复添加！'
        //       )
        //     })
        //   } else {
            this.gpJoinParams = {
              ...this.gpJoinParams,
              key: Math.random(),
              visible: true
            }
        //   }
        } else if (this.form.supplierType == 'PP') {
        //   if (this.clickTableList.isPpBlackList == 1) {
        //     this.$message({
        //       type: 'warning',
        //       message: this.language(
        //         'GAIGONGYINGSHANGSUOYOUCAILIAOZUGONGYIZUYIZAIHEIMINGDANZHONG',
        //         '该供应商所有材料组，工艺组已在黑名单中，无需重复添加'
        //       )
        //     })
        //   } else {
            this.ppJoinParams = {
              ...this.ppJoinParams,
              key: Math.random(),
              visible: true
            }
        //   }
        }
      } else if (type == 'remove') {
        if (this.form.supplierType == 'GP') {
          if (this.clickTableList.isGpBlackList != 1) {
            this.$message({
              type: 'warning',
              message: this.language(
                'GAIGONGYINGSHANGBUZAIHEIMINGDANZHONG,WUXUYICHU',
                '该供应商不在黑名单中，无需移除！'
              )
            })
          } else {
            this.gpRemoveParams = {
              ...this.gpRemoveParams,
              key: Math.random(),
              visible: true
            }
          }
        } else if (this.form.supplierType == 'PP') {
          if (this.clickTableList.isPpBlackList != 1) {
            this.$message({
              type: 'warning',
              message: this.language(
                'GAIGONGYINGSHANGBUZAIHEIMINGDANZHONG,WUXUYICHU',
                '该供应商不在黑名单中，无需移除！'
              )
            })
          } else if (this.form.supplierType == 'PP') {
            this.ppremoveParams = {
              ...this.ppremoveParams,
              key: Math.random(),
              visible: true
            }
          }
        }
      }
    },

    async handleInfo() {
      const res2 = await dictByCode('RELEVANT_DEPT')
      const res3 = await dictByCode('supplier_active')
      const res4 = await dictByCode('supplier_main_type')
      this.fromGroup.deptList = res2
      this.fromGroup.supplierStatusList = res3
      this.fromGroup.supplierTypeList = res4
    },
    async handleRating() {
      if (this.selectTableData.length === 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      var pms = {
        supplierIdList: []
      }
      this.selectTableData.map((item) => {
        pms.supplierIdList.push(item.subSupplierId)
      })
      const res = await addInitial(pms)
      this.resultMessage(res, () => {
        this.$router.push({
          path: '/supplier/frmrating/frmintegratedmanagement'
        })
      })
    },
    handleRegister() {
      this.listDialog = true
    },
    openPage(params) {
        console.log(params)
      let routeData = this.$router.resolve({
        path: '/supplier/supplierList/details',
        query: { supplierType: this.form.supplierType || '',subSupplierId: params.subSupplierId || ''  }
      })
      window.open(routeData.href)
      // this.$router.push({ name: 'ViewSuppliers', query: { supplierToken: params.supplierToken || '', supplierType: "4" } })
    },
    handleSearchReset() {
      this.form = {
        supplierName: '',
        socialcreditNo: '',
        address: '',
        dunsCode: '',
        svwTempCode: '',
        sapCode: '',
        svwCode: '',
        vwCode: '',
        isActive: '',
        supplierType: 'GP',
        dept: ''
      }
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableList()
    },

    async getTableList() {
      this.tableLoading = true
      const pms = {
        ...this.form,
        sortColumn: 'string',
        sortType: 'ASC',
        stepCode: 'string',
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        supplierType: this.form.supplierType
      }
      const res = await getBasicList(pms)
      this.tableListData = res.data
      this.page.currPage = res.pageNum
      this.page.pageSize = res.pageSize
      this.page.totalCount = res.total
      this.tableLoading = false
    },
    handleSelectionChange(e) {
      this.selectTableData = e
    },
    handleBlackList(row) {
      this.rowList = row
      if (this.form.supplierType == 'GP') {
        this.gpBlackParams = {
          ...this.gpBlackParams,
          key: Math.random(),
          visible: true
        }
      }
      if (this.form.supplierType == 'PP') {
        this.ppBlackParams = {
          ...this.ppBlackParams,
          key: Math.random(),
          visible: true
        }
      }
    },
    // 选中数据
    handleClickRow(val) {
      this.selectTableList = val
    },
    changeSupplierType() {
      this.closeDiolog()
    },
    getLsitBtn() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableList()
    },
    closeDiolog(v) {
      if (v == 1) {
        this.getLsitBtn()
      }

      this.ppJoinParams.visible = false
      this.ppBlackParams.visible = false
      this.gpBlackParams.visible = false
      this.gpJoinParams.visible = false
      this.gpRemoveParams.visible = false
      this.ppremoveParams.visible = false
    }
  }
}
</script>

<style scoped lang="scss">
.info-btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
