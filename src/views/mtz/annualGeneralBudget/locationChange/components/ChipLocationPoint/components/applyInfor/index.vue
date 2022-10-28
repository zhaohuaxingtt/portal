<!-- Chip申请单详情 -->
<template>
  <div>
    <iCard>
      <div slot="header" class="flex-between-center" style="width: 100%">
        <div>
          <span>{{ language('SHENQINGDANXINXI', '申请单信息') }}</span>
          <a v-if="applyNumber !== ''">-</a>
          <a class="number_color" @click="jumpInforBtn">{{ applyNumber }}</a>
          <el-tooltip
            effect="light"
            placement="right"
            v-if="applyNumber !== ''"
          >
            <div slot="content">
              <p>
                {{
                  language(
                    'CSQDYYGLLDDDSQDJCLJKCKXQHQXGL',
                    '此申请单已有关联零点定点申请，点击超链接可查看详情，或取消关联'
                  )
                }}
              </p>
            </div>
            <i
              class="el-icon-warning-outline margin-left10"
              style="color: blue"
            ></i>
          </el-tooltip>
        </div>
        <div class="opration">
          <iButton
            @click="edit"
            v-show="
              disabled &&
              status &&
              (inforData.status == 'NEW' || inforData.status == '未通过')
            "
            >{{ language('BIANJI', '编辑') }}</iButton
          >
          <!-- v-show="disabled && appIdType && inforData.appStatus!=='草稿'">{{ language('BIANJI', '编辑') }}</iButton> -->
          <iButton @click="cancel" v-show="!disabled">{{
            language('QUXIAO', '取消')
          }}</iButton>
          <iButton @click="save" v-show="!disabled">{{
            language('BAOCUN', '保存')
          }}</iButton>
          <iButton
            @click="relation"
            v-permission="PORTAL_MTZ_POINT_INFOR_GLLJDDSQ"
            v-if="applyNumber === '' && showType && disabled"
            >{{ language('GLLJDDSQ', '关联零件定点申请') }}</iButton
          >
          <iButton
            @click="cancelRelation"
            v-if="applyNumber !== '' && showType && disabled"
            >{{ language('QUXIAOGUANLIAN', '取消关联') }}</iButton
          >
        </div>
      </div>
      <div class="tabsBoxInfor">
        <div
          class="inforDiv"
          v-for="(item, index) in tabsInforList"
          :key="index"
        >
          <span>{{ language(item.key, item.name) }}</span>
          <el-tooltip
            class="item"
            effect="light"
            :placement="item.tooltipStyle"
            :content="inforData[item.prop]"
            v-if="item.type == 'tooltip' && inforData[item.prop] !== null"
          >
            <iInput
              :disabled="
                item.prop == 'appNo' ||
                item.prop == 'linieName' ||
                item.prop == 'statusDesc' ||
                item.prop == 'meetingName'
                  ? true
                  : disabled
              "
              class="inforText"
              v-model="inforData[item.prop]"
            ></iInput>
          </el-tooltip>
          <iInput
            :disabled="
              item.prop == 'appNo' ||
              item.prop == 'linieName' ||
              item.prop == 'statusDesc' ||
              item.prop == 'meetingName'
                ? true
                : disabled
            "
            class="inforText"
            v-model="inforData[item.prop]"
            v-else
          ></iInput>
        </div>
      </div>
      <span style="display: block; margin-bottom: 20px">{{
        language('LINIEBEIAN', 'Linie备注')
      }}</span>
      <el-input
        :disabled="disabled"
        type="textarea"
        :rows="4"
        :placeholder="language('QINGSHURUBEIAN', '请输入备注')"
        v-model="inforData.remark"
      ></el-input>
    </iCard>
    <theTabs
      ref="theTabs"
      @isNomiNumber="isNomiNum"
      @handleReset="handleReset"
      :appStatus="inforData.statusDesc"
      :type="inforData.type"
      :chipDetailList="chipDetailList"
      :baseData="baseData"
      @init="init"
    >
    </theTabs>
    <iDialog
      :title="language('LINGJIANDINGDIANSHENQING', '零件定点申请')"
      :visible.sync="mtzAddShow"
      v-if="mtzAddShow"
      width="85%"
      @close="closeDiolog"
    >
      <partApplication
        @close="saveClose"
        :numIsNomi="numIsNomi"
        :inforData="inforData"
      ></partApplication>
    </iDialog>
  </div>
</template>

<script>
import {
  iInput,
  iSelect,
  iDialog,
  iMessage,
  iDatePicker,
  iCard,
  iButton,
  iMessageBox
} from 'rise'
import { tabsInforList } from './data'
import theTabs from './theTabs'
import theDataTabs from './theDataTabs'
import partApplication from './partApplication'
import store from '@/store'
import { page } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails'
import {
  getAppFormInfo,
  modifyAppFormInfo,
  // getFlowTypeList,
  disassociate,
  fetchAppNomiDecisionDataPage
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { updateApp } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import { syncAuther } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/approve'
import chip from '@/i18n/zh/chip'
export default {
  name: 'searchTabs',
  components: {
    iDialog,
    iInput,
    iDatePicker,
    iCard,
    iButton,
    theTabs,
    partApplication,
    theDataTabs,
    iSelect
  },
  props: {
    baseData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      mtzAddShow: false,
      disabled: true,
      textarea: '',
      tabsInforList: tabsInforList,
      inforData: {},
      searchForm: {
        idList: [],
        sapPayBalanceNos: [],
        mgroups: [],
        materialNos: [],
        createBys: [],
        fsupplierId: '',
        ssupplierIds: [],
        departments: [],
        statuss: [],
        monthFrom: '',
        monthTo: '',
        types: []
      },
      value: '',
      value1: '',
      mtzDocNos: [], //补差单号
      sapPayBalanceNos: [], //sap补差单号下拉
      typesList: [],
      deptList: [], //部门数据
      mgroups: [], //材料中类编号
      rawMaterialNos: [], //原材料编号

      applyNumber: '',
      showType: false,
      appIdType: true,
      numIsNomi: 0
    }
  },
  computed: {
    // 申请单状态
    status() {
      return (
        this.baseData?.chipAppBase?.status == 'NEW' ||
        this.baseData?.chipAppBase?.status == '未通过'
      )
    },
    mtzObject() {
      return this.$store.state.location.mtzObject
    },
    chipDetailList() {
      return this.baseData.chipDetailList || []
    }
  },
  watch: {
    baseData: {
      handler(val) {
        this.$set(this, 'inforData', this.baseData?.chipAppBase || {})
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    init() {
      this.$emit('getAppById')
    },
    getsyncAuther() {
      syncAuther({ mtzAppId: this.$route.query.mtzAppId, tag: '' })
    },
    // getListData () {
    // getFlowTypeList({}).then(res => {
    //   this.getFlowTypeList = res.data;
    // })
    // },
    handleChange(val) {
      // this.searchForm.monthFrom = window.moment(val[0]).format('yyyy-MM-DD')
      // this.searchForm.monthTo = window.moment(val[1]).format('yyyy-MM-DD')
    },
    handleChange1(val) {},
    handleReset() {
      modifyAppFormInfo({
        ...this.inforData,
        type: 'MEETING'
      }).then((res) => {
        if (res.code == 200) {
          setTimeout(() => {
            disassociate({
              mtzAppId:
                this.$route.query.mtzAppId ||
                JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
            }).then((res) => {
              if (res.code == 200) {
                this.applyNumber = ''
                this.init()
              } else {
                iMessage.error(res.desZh)
              }
            })
          }, 100)
        }
      })
    },
    edit() {
      this.disabled = false
    },
    save() {
      if (this.inforData.appName == '') {
        return iMessage.error(
          this.language('SHENQINGDANMINGBUNENGWEIKONG', '申请单名不能为空')
        )
      }
      if (this.inforData.type == 'SIGN' && this.numIsNomi !== 0) {
        //流转
        return iMessage.error(
          this.language(
            'WHMTZYCLGZCZXGZSQDLXWFXZLZ',
            '维护MTZ原材料规则存在新规则，申请单类型无法选择流转'
          )
        )
      } else {
        this.saveEdit()
      }
    },
    saveEdit() {
      iMessageBox(
        this.language('QUERENBAOCUN', '确认保存？'),
        this.language('LK_WENXINTISHI', '温馨提示'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      )
        .then((res) => {
          const chipTTO = {
            chipDetailList: this.baseData.chipDetailList,
            chipAppBase: this.inforData
          }
          updateApp(chipTTO).then((res) => {
            console.log(res)
            iMessage.success(this.language('BAOCUNCHENGGONG', '保存成功！'))
            this.disabled = true
            this.init()
          })
        })
        .catch((res) => {})
    },
    cancel() {
      this.disabled = true
      this.init('取消')
    },
    relation() {
      //关联零件定点申请
      iMessageBox(
        this.language(
          'GLSQDHWFCMTZJMFQTJCHHWLZDJQXDDDCZ',
          '关联申请单后，无法从MTZ界面发起提交、撤回、会外流转、冻结、取消定点等操作'
        ),
        this.language('LK_WENXINTISHI', '温馨提示'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      ).then((res) => {
        this.mtzAddShow = true
      })
    },
    cancelRelation() {
      iMessageBox(
        this.language('QDYQXGL', '确定要取消关联？'),
        this.language('LK_WENXINTISHI', '温馨提示'),
        {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }
      )
        .then((res) => {
          disassociate({
            mtzAppId:
              this.$route.query.mtzAppId ||
              JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
          }).then((res) => {
            if (res.code == 200) {
              iMessage.success(res.desZh)
              this.applyNumber = ''
              this.getsyncAuther()
              this.init()
            } else {
              iMessage.error(res.desZh)
            }
          })
        })
        .catch((res) => {})
    },
    reset() {
      this.searchForm = {
        idList: [],
        sapPayBalanceNos: [],
        mgroups: [],
        materialNos: [],
        createBys: [],
        fsupplierId: [],
        ssupplierIds: [],
        departments: [],
        statuss: [],
        monthFrom: '',
        monthTo: ''
      }
    },
    handleClickFsupplierName(val) {},
    closeDiolog() {
      this.mtzAddShow = false
    },
    saveClose(val) {
      this.applyNumber = val
      this.closeDiolog()
      this.init()
    },
    chioce(e, name) {
      this.inforData[name] = e
    },
    isNomiNum(val) {
      this.numIsNomi = val
    },

    // getLjLocation(){
    //   page({
    //     current: 1,
    //     size: 9999,
    //     nominateId:this.applyNumber
    //   }).then(res=>{
    //     if(res.code == 200 && res.result){
    //       this.relationType = res.data.records[0].nominateProcessType;
    //     }else{
    //       iMessage.error(this.language(res.desEn,res.desZh))
    //     }
    //   })
    // },
    jumpInforBtn() {
      page({
        current: 1,
        size: 9999,
        nominateId: this.applyNumber
      }).then((res) => {
        if (res.code == 200 && res.result) {
          var jumpData = res.data.records[0]
          var partProjType = ''
          if (jumpData.partProjType == null) {
            partProjType = ''
          } else {
            partProjType = jumpData.partProjType
          }
          var path = ''
          path =
            'designate/decisiondata/rs?desinateId=' +
            jumpData.id +
            '&designateType=' +
            jumpData.nominateProcessType +
            '&partProjType' +
            partProjType +
            '&applicationStatus=' +
            jumpData.applicationStatus
          window.open(process.env.VUE_APP_SOURCING_URL + path)
        } else {
          iMessage.error(this.language(res.desEn, res.desZh))
        }
      })
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
$tabsInforHeight: 35px;
.openPage {
  position: relative;
  color: $color-blue;
  font-size: 14px;
  cursor: pointer;
  width: 90%;
}
.operation {
  display: none !important;
}
.serch {
  margin-right: 0 !important;
}
.tabsBoxInfor {
  margin-bottom: 10px;
  display: flex;
  flex-flow: wrap;
  .inforDiv {
    width: 29%;
    height: $tabsInforHeight;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    margin-bottom: 20px;
    margin-left: 6.5%;
    span {
      font-size: 15px;
    }
    .inforText {
      font-size: 14px;
      width: 68%;
      background: #f8f8fa;
      text-align: center;
      height: $tabsInforHeight;
      line-height: $tabsInforHeight;
    }
  }
  .inforDiv:nth-child(3n-2) {
    margin-left: 0 !important;
  }
}
.number_color {
  color: #1763f7;
  border-bottom: 1px solid #1763f7;
}
.number_color:hover {
  font-weight: bold;
  cursor: pointer;
  border-bottom: 2px solid #1763f7;
}
</style>
  