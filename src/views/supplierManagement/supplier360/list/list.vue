<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditors: caopeng
 * @Description: In User Settings Edit
 * @FilePath: \front-portal-new\src\views\supplierManagement\supplier360\list\list.vue
-->
<template>
  <div>
    <iSearch class="margin-bottom20"
             style="margin-top: 20px"
             @sure="getLsitBtn"
             @reset="handleSearchReset"
             :resetKey="PARTSPROCURE_RESET"
             :searchKey="PARTSPROCURE_CONFIRM">
      <el-form>
        <el-form-item :label="$t('SUPPLIER_SUPPLIERTYPE')">
          <iSelect @change="changeSupplierType"
                   :placeholder="language('请选择')"
                   v-model="form.supplierType">
            <el-option v-for="(item, index) in fromGroup.supplierTypeList"
                       :key="index"
                       :value="item.code"
                       :label="item.name"
                       :disabled="userType != '' && userType != 'PRE'">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_GONGYINGSHANGMINGCHENG')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.supplierName"></iInput>
        </el-form-item>
        <el-form-item :label="$t('UnifySocialCreditCode')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.socialcreditNo"></iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_CAILIAOZU_DUNSHAO')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.dunsCode"></iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_LINGSHIHAO')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.svwTempCode"></iInput>
        </el-form-item>
        <el-form-item v-if="form.supplierType === 'PP'"
                      :label="$t('SUPPLIER_VWHAO')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.vwCode">
          </iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_SAPHAO')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.sapCode"></iInput>
        </el-form-item>
        <el-form-item v-if="form.supplierType === 'PP'"
                      :label="$t('SUPPLIER_SVWHAO')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.svwCode"></iInput>
        </el-form-item>
        <el-form-item :label="$t('companyAddress')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.address"></iInput>
        </el-form-item>
        <!-- 材料组/工艺组编号 -->
        <el-form-item :label="$t('SUPPLIER_CAILIAOZU_GONGYIZUBIANHAO')">
          <iInput :placeholder="language('请输入')"
                  v-model="form.materialOrCraftCode"></iInput>
        </el-form-item>
        <el-form-item :label="$t('GONGHUO')">
          <iSelect :placeholder="language('请选择')"
                   v-model="form.isActive">
            <el-option v-for="(item, index) in fromGroup.supplierStatusList"
                       :key="index"
                       :value="item.code"
                       :label="item.name">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_CAILIAOZU_XIANGGUANKESHI')">
          <iSelect :placeholder="language('请选择')"
                   v-model="form.dept">
            <el-option v-for="(item, index) in fromGroup.deptList"
                       :key="index"
                       :value="item.name"
                       :label="item.name">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_CAILIAOZU_ISXIANGGUNA')">
          <iSelect :placeholder="language('请选择')"
                   @change="changTag"
                   v-model="form.relatedToMe">
            <el-option v-for="(item, index) in fromGroup.relatedToMeList"
                       :key="index"
                       :disabled="
                $store.state.permission.userInfo.userType == 2 && !item.value
              "
                       :value="item.value"
                       :label="item.label">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('JITUANGONGSI', '集团公司')">
          <iSelect
                   filterable
                   :placeholder="language('请选择')"
                   v-model="form.groupId">
            <el-option v-for="item in groupList"
                       :key="item.code"
                       :label="item.message"
                       :value="item.code">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('VWHAOZHUANGTAI', 'vw号状态')">
          <iSelect
                   :placeholder="language('请选择')"
                   v-model="form.vwStatus">
            <el-option v-for="item in vwStatuslist"
                       :key="item.code"
                       :label="item.message"
                       :value="item.code">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGBIAOQIAN', '供应商标签')">
          <iSelect multiple
                   collapse-tags
                   filterable
                   :placeholder="language('请选择')"
                   v-model="form.tagNameList">
            <el-option v-for="item in tagdropDownList"
                       :key="item.code"
                       :label="item.message"
                       :value="item.code">
            </el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <i-card class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <i-button @click="tagTab"
                    v-permission="PORTAL_SUPPLIER_GONGYINGSHANGBIAOQIAN">{{ language('GONGYINGSHANGBIAOQIANKU', '供应商标签库') }}</i-button>
          <i-button @click="setTagBtn"
                    v-permission="PORTAL_SUPPLIER_BIAOQIANSHEZHI">{{ language('BIAOQIANSHEZHI', '标签设置') }}</i-button>
          <i-button @click="lacklistBtn('join', language('JIARU', '加入'))"
                    v-permission="PORTAL_SUPPLIER_JIARUHEIMINGDAN">{{ $t('SUPPLIER_CAILIAOZU_JIARUHEIMINGDAN') }}</i-button>
          <i-button @click="lacklistBtn('remove', language('YICHU', '移除'))"
                    v-permission="PORTAL_SUPPLIER_YICHUHEIMINGDAN">{{ $t('SUPPLIER_CAILIAOZU_YICHUHEIMINGDAN') }}</i-button>
          <i-button @click="handleRating"
                    v-permission="PORTAL_SUPPLIER_FAQICHUPINGQINGDAN">{{$t('SUPPLIER_CAILIAOZU_FAQICHUPINGQINGDAN')}}</i-button>
          <i-button @click="handleRegister">{{$t('SUPPLIER_CAILIAOZU_YAOQINGZHUCE')}}</i-button>
          <i-button v-permission="SUPPLIER_MATERIALGROUP_LIST_BDL"
                    @click="toApplicationBDL">{{ language('SHENQINGBDL','申请BDL') }}</i-button>
          <i-button v-permission="SUPPLIER_MATERIALGROUP_LIST_MBDL_OUT"
                    @click="toApplicationMBDL">{{ language('SHENQINGMBDL', '申请MBDL') }}</i-button>
          <i-button @click="synchro">{{ language('TONGBUSAP', '同步SAP') }}</i-button>
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
        <template #supplierTagNameList="scope">
          <i-button type="text"
                    @click="handleTagsList(scope.row)">{{
            scope.row.supplierTagNameList
          }}</i-button>
        </template>
        <template #supplierType="scope">
          <span>{{scope.row.supplierType==='PP'?'生产供应商':scope.row.supplierType==='GP'?'一般供应商':''}} </span>
        </template>
        <template #supplierStatus="scope">
          <div v-if="form.supplierType == 'GP'">
            <i-button v-if="scope.row.isGpBlackList != 1"
                      type="text"
                      @click="handleBlackList(scope.row)">{{ language('ZHENGCHANG', '正常') }}</i-button>
            <i-button type="text"
                      v-if="scope.row.isGpBlackList == 1"
                      @click="handleBlackList(scope.row)">{{ language('SHOUKONG', '受控') }}</i-button>
          </div>
          <div v-if="form.supplierType == 'PP'">
            <i-button v-if="scope.row.isPpBlackList != 1"
                      type="text"
                      @click="handleBlackList(scope.row)">{{ language('ZHENGCHANG', '正常') }}</i-button>
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
      <!-- 标签设置 -->

      <setTagdilog @closeDiolog="closeDiolog"
                   v-model="isSetTag"
                   :selectTableData="selectTableData"
                   v-if="isSetTag">
      </setTagdilog>
      <setTagList @closeDiolog="closeDiolog"
                  v-model="issetTagList"
                  :rowList="rowList"
                  v-if="issetTagList">
      </setTagList>
      <!-- 一般供应商加入黑名单 -->
      <joinlacklistGp v-if="clickTableList.id != ''"
                      :key="gpJoinParams.key + 1"
                      @closeDiolog="closeDiolog"
                      v-model="gpJoinParams.visible"
                      :clickTableList="clickTableList">
      </joinlacklistGp>
      <!-- 一般供应商移除黑名单 -->
      <removelacklistGp v-if="clickTableList.id != ''"
                        :key="gpRemoveParams.key + 2"
                        v-model="gpRemoveParams.visible"
                        @closeDiolog="closeDiolog"
                        :clickTableList="clickTableList">
      </removelacklistGp>
      <!-- 一般供应商黑命单记录 -->

      <blackListGp v-if="rowList.id != ''"
                   :key="gpBlackParams.key + 3"
                   v-model="gpBlackParams.visible"
                   @closeDiolog="closeDiolog"
                   :clickTableList="rowList">
      </blackListGp>
      <!-- 生产供应商加入黑名单 -->
      <joinlacklistPP v-if="clickTableList.id != ''"
                      :key="ppJoinParams.key + 4"
                      v-model="ppJoinParams.visible"
                      @closeDiolog="closeDiolog"
                      :clickTableList="clickTableList">
      </joinlacklistPP>
      <!-- 生产供应商移除黑名单 -->
      <removelacklistPP v-if="clickTableList.id != ''"
                        :key="ppremoveParams.key + 5"
                        v-model="ppremoveParams.visible"
                        @closeDiolog="closeDiolog"
                        :clickTableList="clickTableList">
      </removelacklistPP>
      <!-- 生产供应商黑命单记录 -->
      <blackListPp v-if="rowList.id != ''"
                   :key="ppBlackParams.key + 6"
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
import { getBuyerType, checkAddBlackIsFull } from '@/api/supplier360/blackList'
import setTagList from './components/setTagList'
import { dropDownTagName,groupCompanyList,vwStatusList } from '@/api/supplierManagement/supplierTag/index'
import setTagdilog from './components/setTag'
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
import { getBasicList, synchronizationSap } from '@/api/basic/basic'
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
    blackListPp,
    setTagdilog,
    setTagList
  },
  data () {
    return {
      tagdropDownList: [],
      supplierId: '',
      vwStatuslist: [],
      groupList: [],
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
      isSetTag: false, //增加标签
      issetTagList: false, //标签列表

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
      relatedToMe: false,
      isCgy: false,
      userType: 'LINIE',
      form: {
        tagNameList: [],
        supplierName: '',
        socialcreditNo: '',
        address: '',
        dunsCode: '',
        svwTempCode: '',
        sapCode: '',
        svwCode: '',
        vwCode: '',
        isActive: '',
        tagdropDownList: [],
        supplierType: '',
        dept: '',
        relatedToMe: true,
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
  created () {
    this.handleInfo()
    // this.$nextTick(() => {
    this.getUserType()
    this.changTag()
    // })
  },
  methods: {
    remoteGetGroup (query) {
      if (!query.match(/^[ ]*$/)) {
        const params = {
          keyword: query,
          //   supplierId: this.clickTableList.subSupplierId,
          //   deptIds: this.form.deptIds
        }
        // purchaseListSearch(params).then((res) => {
        //   if (res && res.code == 200) {
        //     this.purchaseList = res.data
        //   } else iMessage.error(res.desZh)
        // })
      }
    },
    changTag () {
      this.form.tagNameList = []
      //获取标签列表
      //   let isMeRelated = 0
      //   if (this.form.relatedToMe) {
      //     isMeRelated = 1
      //   } else isMeRelated = 0
      //   isMeRelated ,supplierId:this.$store.state.permission.userInfo.id
      dropDownTagName({ isMeRelated: 0 }).then((res) => {
        if (res && res.code == 200) {
          this.tagdropDownList = res.data
        }
      })
    },
    getUserType () {
      getBuyerType({}).then((res) => {
        if (res && res.code == 200) {
          this.userType = res.data
          // this.userType = 'LINIE'
          if (res.data == null) {
            this.form.supplierType = 'PP'
            this.userType = ''
          }
          if (this.userType == 'LINIE' || this.userType == 'PRE') {
            this.form.supplierType = 'PP'
            this.isCgy = true
          }
          if (this.userType == 'GP') this.form.supplierType = 'GP'
          this.form.relatedToMe = true
          this.getTableList(this.form.supplierType)
        } else {
          this.userType = ''
          iMessage.error(res.desZh)
        }
      })
    },
    //加入黑名单
    lacklistBtn (type, text) {
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
        console.log(this.selectTableData)
        checkAddBlackIsFull({
          supplierId: this.selectTableData[0].subSupplierId
        }).then((res) => {
          if (res && res.code == '200') {
            if (this.form.supplierType == 'GP') {
              this.gpJoinParams = {
                ...this.gpJoinParams,
                key: Math.random(),
                visible: true
              }
            } else if (this.form.supplierType == 'PP') {
              this.ppJoinParams = {
                ...this.ppJoinParams,
                key: Math.random(),
                visible: true
              }
            }
          } else {
            iMessage.warn(
              this.language(
                'GAIGONGYINGSHANGYIZAISUOYOUKENENGDEGONGYIZUHEIMINGDANZHON',
                '该供应商已在所有可能的工艺组的黑名单中，无需重复添加！'
              )
            )
          }
        })
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
    toApplicationBDL () {
      if (this.selectTableData.length === 0) {
        return iMessage.error(this.language('QINGXUANZESHUJU', '请选择数据'))
      }
      if (this.selectTableData.length > 1) {
        return iMessage.error(
          this.language('ZHINENGXUANZEYITIAO', '只能选择一条')
        )
      }
      this.$router.push({
        path: '/supplier/application-BDL',
        query: { supplierToken: this.selectTableData[0].supplierToken }
      })
    },
    toApplicationMBDL () {
      if (this.selectTableData.length === 0) {
        return iMessage.error(this.language('QINGXUANZESHUJU', '请选择数据'))
      }
      if (this.selectTableData.length > 1) {
        return iMessage.error(
          this.language('ZHINENGXUANZEYITIAO', '只能选择一条')
        )
      }
      this.$router.push({
        path: '/supplier/application-BDL',
        query: { supplierToken: this.selectTableData[0].supplierToken, mbdl: true }
      })
    },
    synchro () {
      if (this.selectTableData.length === 0) {
        return iMessage.error(this.language('QINGXUANZESHUJU', '请选择数据'))
      }
      if (this.selectTableData.length > 1) {
        return iMessage.error(
          this.language('ZHINENGXUANZEYITIAO', '只能选择一条')
        )
      }
      synchronizationSap({
        supplierId: this.selectTableData[0].subSupplierId
      }).then((res) => {
        if (res?.code === '200') {
          iMessage.success(res.desZh)
        } else {
          iMessage.error(res.desZh)
        }
      })
    },

    async handleInfo () {
      const res2 = await dictByCode('RELEVANT_DEPT')
      const res3 = await dictByCode('supplier_active')
      const res4 = await dictByCode('supplier_main_type')
        const res6 = await groupCompanyList({})
        const res5 = await vwStatusList({})
        this.vwStatuslist = res5.data
        this.groupList = res6.data
      this.fromGroup.deptList = res2
      this.fromGroup.supplierStatusList = res3
      this.fromGroup.supplierTypeList = res4
    },
    //标签设置弹窗
    setTagBtn () {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
      } else this.isSetTag = true
    },
    //标签列表弹窗
    handleTagsList (row) {
      this.rowList = row
      this.issetTagList = true
    },
    tagTab () {
      let routeData = this.$router.resolve({
        path: '/supplier/supplierTag'
      })
      window.open(routeData.href)
    },
    async handleRating () {
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
        this.getTableList()
        // this.$router.push({
        //   path: '/supplier/frmrating/frmintegratedmanagement'
        // })
      })
    },
    handleRegister () {
      this.listDialog = true
    },
    openPage (params) {
      let routeData = this.$router.resolve({
        path: '/supplier/supplierList/details',
        query: {
          supplierType: this.form.supplierType || '',
          subSupplierId: params.subSupplierId || ''
        }
      })
      window.open(routeData.href)
      // this.$router.push({ name: 'ViewSuppliers', query: { supplierToken: params.supplierToken || '', supplierType: "4" } })
    },
    handleSearchReset () {
      this.form.relatedToMe == true
      this.relatedToMe = true
      this.form = {
        supplierName: '',
        socialcreditNo: '',
        address: '',
        dunsCode: '',
        svwTempCode: '',
        sapCode: '',
        svwCode: '',
        vwCode: '',
        tagdropDownList: [],
        isActive: '',
        groupId: '',
        vwStatus: '',
        supplierType: this.userType,
        dept: ''
      }
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getUserType()
    },

    async getTableList () {
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
      this.relatedToMe = this.form.relatedToMe
      this.tableListData = res.data
      this.tableListData.forEach((res) => {
        if (res.supplierTagNameList != null) {
          res.supplierTagNameList = res.supplierTagNameList.join(',')
        }
      })
      this.page.currPage = res.pageNum
      this.page.pageSize = res.pageSize
      this.page.totalCount = res.total
      this.tableLoading = false
    },
    handleSelectionChange (e) {
      this.selectTableData = e
    },
    handleBlackList (row) {
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
    handleClickRow (val) {
      this.selectTableList = val
    },
    changeSupplierType () {
      this.closeDiolog(1)
    },
    getLsitBtn () {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableList()
    },
    closeDiolog (v) {
      if (v == 1) {
        this.getLsitBtn()
      }
      this.isSetTag = false
      this.ppJoinParams.visible = false
      this.ppBlackParams.visible = false
      this.gpBlackParams.visible = false
      this.gpJoinParams.visible = false
      this.gpRemoveParams.visible = false
      this.ppremoveParams.visible = false
      this.issetTagList = false
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
