<!--
 * @Date: 2021-11-23 15:29:59
 * @LastEditors: YoHo && 917955345@qq.com
 * @LastEditTime: 2023-02-01 22:49:08
 * @FilePath: \front-portal\src\views\frmRating\supplierOverview\components\cRatingRouter.vue
-->
<template>
  <div>
    <div class="boxTitle">
      <p>
        {{language(
              'GONGYINGSHANGXUNJIADINGDIANQINGKUANG',
              '供应商询价定点情况'
            )}}
      </p>
      <iButton slot="header-control"
               v-if="$route.query.isSupplier!=1"
               @click="$emit('back')">{{$t('LK_FANHUI')}}</iButton>
    </div>

    <div class="mtz_ndys_nav">
      <div class="mtz_ndys_nav_all">
        <div v-for="(item,index) in subNavList" :key="index" :class="tabVal===item.code?'active':''" @click="changeTab(item.code)" v-permission="item.permissionKey">{{language(item.key, item.name)}}</div>
      </div>
    </div>

    <!-- <el-tabs class="tabsHeader"
             type="card"
             style="margin-left: 20px"
             v-model="tabVal"
             @tab-click="changeTab">
      <el-tab-pane name="1" v-permission="PORTAL_SUPPLIER_NAV_GAILAN_GYSXJDDQK_SSCRGYSQDYQ"
                   :label="
            language(
              'SHISHICRATINGGONGYINGSHANGQINGDAN',
              '实时C-Rating供应商清单'
            )
          ">
      </el-tab-pane>
      <el-tab-pane name="2" v-permission="PORTAL_SUPPLIER_NAV_GAILAN_GYSXJDDQK_CRGYSXJDDQK"
                   :label="
            language(
              'CRATINGGONGYINGSHANGXUNJIADINGDIANQINGKUANG',
              'C-Rating供应商询价定点情况'
            )
          ">
      </el-tab-pane>
    </el-tabs> -->

    <iSearch @sure="sure"
             @reset="clickReset"
             class="header">
      <el-form inline
               label-position="top">
        <el-form-item :label="language('SAPHAO', 'SAP号')">
          <iSelect collapse-tags
                   filterable
                   multiple
                   :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                   v-model.trim="form.sapCode">
            <el-option v-for="item in sapList"
                       :key="item.kvalue"
                       :label="item.vvalue"
                       :value="item.kvalue">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')">
          <iSelect collapse-tags
                   filterable
                   multiple
                   :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                   v-model.trim="form.supplierName">
            <el-option v-for="item in supplierList"
                       :key="item.kvalue"
                       :label="item.vvalue"
                       :value="item.kvalue">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('XIANGGUANKESHI', '相关科室')">
          <iSelect collapse-tags
                   filterable
                   multiple
                   @change="deptChange"
                   :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                   v-model.trim="form.deptIds">
            <el-option v-for="item in deptList"
                       :disabled="disabled"
                       :key="item.name"
                       :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                       :value="item.code">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('FUZECAIGOUYUAN', '负责采购员')">
          <iSelect collapse-tags
                   filterable
                   multiple
                   :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                   v-model.trim="form.usersIds">
            <el-option v-for="item in userList"
                       :key="item.kvalue"
                       :label="item.vvalue"
                       :value="item.kvalue">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('JIARUCRATINGYUANYIN', '加入C-Rating原因')">
          <iSelect collapse-tags
                   filterable
                   multiple
                   :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                   v-model.trim="form.ratingSource">
            <el-option v-for="item in cratingLsit"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item v-if="tabVal == 2"
                      :label="language('SHIFOUCRATING', '是否C-Rating')">
          <iSelect :placeholder="language('QINGXUANZE', '请选择')"
                   v-model.trim="form.iscRating">
            <el-option v-for="item in iscRatingList"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item v-if="tabVal == 2"
                      :label="language('YICHUCRATINGYUANYIN', '移出C-Rating原因')">
          <iSelect collapse-tags
                   filterable
                   multiple
                   :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                   v-model.trim="form.cancelReason">
            <el-option v-for="item in removeCratingLsit"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item v-if="tabVal == 2"
                      :label="$t('LK_LINGJIANZHUANGTAI')">
          <iSelect :placeholder="language('QINGXUANZE', '请选择')"
                   v-model.trim="form.rfqStatus"
                   multiple>
            <el-option v-for="item in supplierStatus"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item v-if="tabVal == 2"
                      :label="language('LINGJIANXINXI', '零件信息')">
          <iSelect collapse-tags
                   filterable
                   multiple
                   :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                   v-model.trim="form.partNum">
            <el-option v-for="item in partList"
                       :key="item.kvalue"
                       :label="item.vvalue"
                       :value="item.kvalue">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item v-if="tabVal == 2"
                      :label="language('RFQHAO', 'RFQ号')">
          <iSelect collapse-tags
                   filterable
                   multiple
                   :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                   v-model.trim="form.rfq">
            <el-option v-for="item in resRfqList"
                       :key="item.kvalue"
                       :label="item.vvalue"
                       :value="item.kvalue">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item v-if="tabVal == 2"
                      :label="language('XIANGMUBIANHAO', '项目编号')">
          <iSelect collapse-tags
                   filterable
                   multiple
                   :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                   v-model.trim="form.motorProject">
            <el-option v-for="item in projectList"
                       :key="item.kvalue"
                       :label="item.vvalue"
                       :value="item.kvalue">
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item v-if="tabVal == 2"
                      :label="language('BAOJIACHEXING', '报价车型')">
          <iSelect collapse-tags
                   multiple
                   filterable
                   :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                   v-model.trim="form.motorType">
            <el-option v-for="item in motorList"
                       :key="item.kvalue"
                       :label="item.vvalue"
                       :value="item.kvalue">
            </el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="tableBox"
           style="margin-top:20px">
      <div class="sectionTitle">
        <span class="ptext">
          {{ language('XIANGQINGLIEBIAO', '详情列表') }}
        </span>
        <iButton v-if="tabVal == 1"
                v-permission="PORTAL_SUPPLIER_NAV_GAILAN_GYSXJDDQK_YICHUCRATING"
                 @click="handleSaveBtn">{{
            language('YICHUCRATING', '移出C-Rating')
        }}</iButton>
      </div>
      <table-list v-if="tabVal == 1"
                  style="margin-top: 20px"
                  :tableData="tableListData"
                  @handleSelectionChange="handleSelectionChange"
                  :tableTitle="tableTitleMonitor"
                  :tableLoading="tableLoading"
                  :index="true">
        <template #ratingSource="scope">
          <span v-if="
                scope.row.ratingSource != '100' &&
                  scope.row.ratingSource != null
              ">{{
                cratingLsit.length ? cratingLsit.find(res => {
                  return res.code == scope.row.ratingSource
                }).name : scope.row.ratingSource
            }}</span>
          <span v-if="scope.row.ratingSource == '100'">深入评级-
            <icon class="early"
                  symbol
                  name="iconcaiwuyujing-hongdeng"></icon>
          </span>
        </template>
      </table-list>
      <table-list v-if="tabVal == 2"
                  style="margin-top: 20px"
                  :tableData="tableListData"
                  :tableTitle="tableTitleMonitorRecord"
                  :tableLoading="tableLoading"
                  :index="true"
                  :selection="false">
        <template #rfqStatus="scope">
          <!-- <span>{{  supplierStatus.find((res) => {
                return res.code == scope.row.rfqStatus
              }).name}}</span> -->
          <span v-if="scope.row.rfqStatus == 0">{{
              language('WEIBAOJIA', '未报价')
          }}</span>
          <span v-if="scope.row.rfqStatus == 1">{{
              language('XUNJIAZHONG', '询价中')
          }}</span>
        </template>
        <template #ratingSource="scope">
          <span v-if="
                scope.row.ratingSource != '100' &&
                  scope.row.ratingSource != null
              ">{{
                cratingLsit.length ? cratingLsit.find(res => {
                  return res.code == scope.row.ratingSource
                }).name : scope.row.ratingSource
            }}</span>
          <span v-if="scope.row.ratingSource == '100'">深入评级-
            <icon class="early"
                  symbol
                  name="iconcaiwuyujing-hongdeng"></icon>
          </span>
        </template>
      </table-list>
      <iPagination v-update
                   @size-change="handleSizeChange($event, getTaleList)"
                   @current-change="handleCurrentChange($event, getTaleList)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :current-page="page.currPage"
                   :total="page.totalCount" />
    </iCard>
    <div style="height: 30px"></div>
    <iDialog destroy-on-close
             @close="closeDiologDetail()"
             :visible.sync="visibleDetal"
             top="2%"
             width="85%">
      <div class="section-box">
        <div>
          <span>{{ language('YICHUYUANYIN', '移出原因') }}
            <span style="color: red">*</span></span>
        </div>
        <iButton @click="handleSave">{{ language('QUEREN', '确认') }}</iButton>
      </div>
      <iInput style="margin-top: 20px"
              :placeholder="language('QINGSHURU', '请输入…')"
              type="textarea"
              v-model="takeStepsContent"
              maxlength="200"
              show-word-limit></iInput>
      <div style="height: 30px"></div>
    </iDialog>
  </div>
</template>

<script>
import {
  icon,
  iDialog,
  iSelect,
  iButton,
  iInput,
  iMessage,
  iPagination,
  iCard,
  iSearch
} from 'rise'
import tableList from '@/components/commonTable'
import { tableTitleMonitor, tableTitleMonitorRecord, dictByCode } from './data'
import { userDropDown } from '@/api/frmRating/supplierOverview/index'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { pageMixins } from '@/utils/pageMixins'
import { selectDictByKeys } from '@/api/dictionary';
import {
  currentList,
  sapDropDown,
  historyList,
  cancel
} from '@/api/frmRating/supplierOverview/index'
export default {
  mixins: [generalPageMixins, pageMixins],
  components: {
    iSelect,
    iButton,
    iDialog,
    tableList,
    iInput,
    icon,
    iPagination,
    iCard,
    iSearch
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    supplierId: {
      type: String
    },
    sapCode: {
      type: String
    }
  },
  data () {
    return {
      subNavList:[
        {
          code:'1',
          key:'SHISHICRATINGGONGYINGSHANGQINGDAN',
          name:'实时C-Rating供应商清单',
          permissionKey:'PORTAL_SUPPLIER_NAV_GAILAN_GYSXJDDQK_SSCRGYSQDYQ'
        },{
          code:'2',
          key:'CRATINGGONGYINGSHANGXUNJIADINGDIANQINGKUANG',
          name:'C-Rating供应商询价定点情况',
          permissionKey:'PORTAL_SUPPLIER_NAV_GAILAN_GYSXJDDQK_CRGYSXJDDQK'
        }
      ],
      tabVal: '1',
      visibleDetal: false,
      info: {},
      visible: false,
      tableListData: [],
      tableTitleMonitor: tableTitleMonitor,
      tableTitleMonitorRecord: tableTitleMonitorRecord,
      form: {
        sapCode: [],
        supplierName: [],
        iscRating: '',
        supplierIds: [],
        rfqStatus: [],
        userIds: []
      },
      cratingLsit: [{ name: '' }],
      tableLoading: true,
      sapList: [],
      takeStepsContent: '',
      deptList: [],
      removeCratingLsit: [],
      userList: [],
      supplierList: [],
      selectData: [],
      iscRatingList: [
        { code: '', name: this.language('QUANBU', '全部') },
        { code: 1, name: this.language('SHI', '是') },
        { code: 0, name: this.language('FOU', '否') }
      ],
      supplierStatus: [
        { code: '', name: this.language('QUANBU', '全部') },
        { code: 0, name: this.language('WEIBAOJIA', '未报价') },
        { code: 1, name: this.language('XUNJIAZHONG', '询价中') }
      ],
      queryList:{},
      disabled:false
    }
  },
  watch: {},
  mounted () {
    this.$nextTick(_ => {
      var navList = document.querySelectorAll(".mtz_ndys_nav_all>div");
      if (navList.length !== 0) {
        navList[0].click();
      }
    })
  },
  created () {
    if(this.$route.query && this.$route.query.sapCode){
      this.queryList = this.$route.query;
    }
    this.tabVal = '1';
    if (this.sapCode && this.supplierId) {
      this.form.sapCode[0] = this.sapCode || ''
      this.form.supplierName[0] = this.supplierId || ''
    }

    this.getInit()
  },
  methods: {
    gysmcChange(val,num){
      this.form[num] = val;
    },
    handleDialog () {
      this.visible = true
      this.getInit()
    },
    // //选择相关科室
    deptChange (v) {
      if (v.length > 0) {
        if(this.disabled) return
        this.disabled = true
        let req = {
          type: 'user',
          deptIds: v
        }
        userDropDown(req).then((res) => {
          this.userList = res.data
          var arr2 = []
          if (this.form.userIds.length > 0) {
            this.userList.forEach((v) => {
              this.form.userIds.forEach((i) => {
                if (v.kvalue == i) {
                  arr2.push(i)
                }
              })
            })
          }
          this.form.userIds = arr2
        }).finally(()=>{
          this.disabled = false
        })
      }
    },
    getTaleList () {
      this.tableLoading = true
      if (this.form.sapCode.length > 0 || this.form.supplierName.length > 0) {
        this.form.supplierIds = this.form.sapCode.concat(this.form.supplierName)
      }else{
        this.form.supplierIds = []
      }
      const req = {
        ...this.form,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }

      req.sapCode = undefined
      req.supplierName = undefined
      if (this.tabVal == '1') {
        currentList(req).then((res) => {
          this.page.totalCount = res.data.total
          this.tableLoading = false
          this.tableListData = res.data.records
        })
      } else {
        // let form = {
        //   ...req,
        //   pageNo: this.page.currPage,
        //   pageSize: this.page.pageSize
        // }
        historyList(req).then((res) => {
          this.page.totalCount = res.data.total
          this.tableLoading = false
          this.tableListData = res.data.records
        })
      }
    },
    async getInit () {
      const res = await dictByCode('C_RATING')
      this.cratingLsit = res

      
      const resRemoveCrating = await dictByCode('CANCEL_C_RATING')
      this.removeCratingLsit = resRemoveCrating
      const res2 = await sapDropDown({ type: 'sap' })
      //const resDept = await sapDropDown({ type: 'dept' })
      const res3 = await sapDropDown({ type: 'supplier' })
      //   const res4 = await dictByCode('RFQ_STATE')
      const resPart = await sapDropDown({ type: 'part' })
      const resRfq = await sapDropDown({ type: 'rfq' })
      const resProject = await sapDropDown({ type: 'project' })
      const resMotor = await sapDropDown({ type: 'motor' })


      const data = [
        'SUPPLIER_STATUS',
        'QUALITATIVE_GRADE_STATUS',
        'LEGALSTATUS',
        'RELEVANT_DEPT',
        'ADJUSTED_RATING_LEVEL',
        'TEST_RESULT',
        'DEEP_COMMENT_STATUS',
      ];
      let req = 'keys=';
      req = req + data.join('&keys=');
      const red = await selectDictByKeys(req);
      this.deptList = red.data.RELEVANT_DEPT;
      
      //this.deptList = resDept.data
      this.partList = resPart.data
      this.resRfqList = resRfq.data
      this.projectList = resProject.data
      this.motorList = resMotor.data
      this.sapList = res2.data
      for(var i=0;i<this.sapList.length;i++){
        if(this.sapList[i].vvalue == this.queryList.sapCode){
          this.form.sapCode = [this.sapList[i].kvalue]
          break;
        }
      }

      this.supplierList = res3.data
      for(var i=0;i<this.supplierList.length;i++){
        if(this.supplierList[i].vvalue == this.queryList.nameZh){
          this.form.supplierName = [this.supplierList[i].kvalue]
          break;
        }
      }

      this.getTaleList()
      //   this.supplierStatus = res4
    },
    handleSelectionChange (val) {
      this.selectData = val
    },
    handleSaveBtn () {
      if (this.selectData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      this.visibleDetal = true
    },
    //移除
    handleSave () {
      if (this.takeStepsContent == '') {
        iMessage.warn(this.language('QINGSHURUYICHUYUANYINS', '请输入移出原因'))
        return false
      }
      let req = {
        ids: this.selectData.map((res) => {
          return res.recordId
        }),
        reason: this.takeStepsContent
      }
      cancel(req).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.visibleDetal = false
          this.getTaleList()
        } else iMessage.error(res.desZh)
      })
    },

    sure () {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTaleList()
    },

    clickReset (val) {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.userList = []
      this.form = {
        supplierIds: [],
        deptIds: [],
        userIds: [],
        iscRating: '',
        ratingSource: [],
        cancelReason: [],
        rfqStatus: [],
        partNum: [],
        rfq: [],
        motorProject: [],
        motorType: [],
        sapCode: [],
        supplierName: []
      }
      this.getTaleList()
    },
    changeTab (val) {
      this.tabVal = val;
      this.userList = []
      this.form = {
        ...this.form,
        deptIds: [],
        userIds: [],
        iscRating: '',
        ratingSource: [],
        cancelReason: [],
        rfqStatus: [],
        partNum: [],
        rfq: [],
        motorProject: [],
        motorType: []
      }
      this.getTaleList()
    },

    closeDiologDetail () {
      this.takeStepsContent = ''
      this.visibleDetal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.boxTitle {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    color: #131523;
  }
}
.early {
  display: inline-block;
  font-size: 20px;
}
.center1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chartStyle {
  width: 100%;
  height: 320px;
}
::v-deep .el-textarea {
  height: 580px;
}
::v-deep .el-textarea .el-textarea__inner {
  height: 100%;
}
.section-box {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  span {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
  }
}
.header {
  ::v-deep.el-form-item {
    margin: 0 20px;
  }
  ::v-deep.el-select {
    width: 250px;
  }
  ::v-deep.el-select__tags-text {
    display: inline-block;
    max-width: 100px;
    overflow: hidden;
    vertical-align: middle;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.sectionTitle {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tabsHeader {
  margin-left: 0 !important;
  ::v-deep .el-tabs__item.is-active {
    font-weight: bold;
    background: #ffffff;
    opacity: 1;
  }
  ::v-deep .el-tabs__item {
    border: none;
    font-weight: 500;
    background: #f5f6f7;
    border-radius: 0px 10px 10px 0px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
    font-size: 16px;
    min-width: 250px;
    height: 35px;
    line-height: 35px;
  }
  ::v-deep .el-tabs__nav {
    border: none !important;
  }
  ::v-deep .el-tabs__nav {
    background: transparent;
    border: none;
    padding: 10px 0;
  }
  ::v-deep .el-tabs__item:focus.is-active.is-focus:not(:active) {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  ::v-deep .el-tabs__header {
    border: none;
  }
  ::v-deep .el-tabs__item:first-child {
    border-radius: 10px 0px 0px 10px;
  }
}
v::v-deep .el-tabs__nav-wrap::after {
  height: 0 !important;
}
v::v-deep .el-tabs__nav-wrap:hover {
  font-weight: bold;
}

.mtz_ndys_nav{
  margin-top:20px;
  display: flex;
  margin-bottom:20px;
  font-size:1rem;
  font-weight: bold;
  color:#727272;
  // box-shadow: 0 0 1.25rem rgb(0 0 0 / 8%);
  border: none;
  text-align: center;
  min-width: 9.375rem;
  .mtz_ndys_nav_all>div{
    cursor: pointer;
    min-width:140px;
    float:left;
    height: 2.5rem;
    box-sizing: border-box;
    line-height: 2.5rem;
    box-shadow: 0 0 1.25rem rgb(0 0 0 / 8%);
    padding-left:20px;
    padding-right:20px;
  }
  .mtz_ndys_nav_all>div:nth-child(1){
    border-top-left-radius: 0.625rem;
    border-bottom-left-radius: 0.625rem;
    border-right: solid 1px #ececec;
  }
  .mtz_ndys_nav_all>div:nth-child(3){
    border-left: solid 1px #ececec;
    border-top-right-radius: 0.625rem;
    border-bottom-right-radius: 0.625rem;
  }

  .active{
    background-color: #ffffff;
    background: #ffffff;
    color:#67C23A;
  }
}
</style>
