<!-- Chip申请单详情 -->
<template>
  <div>
    <iCard>
      <div slot="header" class="flex-between-center" style="width: 100%">
        <div>
          <span>{{ language('SHENQINGDANXINXI', '申请单信息') }}</span>
        </div>
        <div class="opration">
          <iButton @click="edit" v-show="disabled && canEdit" 
          v-permission="PORTAL_CHIP_POINT_DETAIL_BIANJI">{{
            language('BIANJI', '编辑')
          }}</iButton>
          <iButton @click="cancel" v-show="!disabled">{{
            language('QUXIAO', '取消')
          }}</iButton>
          <iButton @click="save" v-show="!disabled">{{
            language('BAOCUN', '保存')
          }}</iButton>
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
      <div class="remark-box">
        <span>{{ language('决策单备注', '决策单备注') }}</span>
        <!-- autosize -->
        <el-input
          :disabled="disabled"
          type="textarea"
          class="textarea"
          :rows="1"
          :placeholder="
            language('请输入决策单备注,用于审批', '请输入决策单备注,用于审批')
          "
          v-model="inforData.remark"
        ></el-input>
      </div>
    </iCard>
    <theTabs
      ref="theTabs"
      :canEdit="canEdit"
      :type="inforData.type"
      :chipDetailList="chipDetailList"
      :baseData="baseData"
      @init="init"
    >
    </theTabs>
  </div>
</template>

<script>
import { iInput, iDialog, iMessage, iCard, iButton, iMessageBox } from 'rise'
import { tabsInforList } from './data'
import theTabs from './theTabs'
import { updateApp } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
export default {
  name: 'searchTabs',
  components: {
    iDialog,
    iInput,
    iCard,
    iButton,
    theTabs
  },
  props: {
    baseData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
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
      appIdType: true
    }
  },
  computed: {
    // 申请单能否编辑
    canEdit() {
      // 草稿，已提交，不通过状态可以编辑
      return ['NEW', 'NOTPASS', 'SUBMIT'].includes(this.inforData.status)
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
    edit() {
      this.disabled = false
    },
    save() {
      if (this.inforData.appName == '') {
        return iMessage.error(
          this.language('SHENQINGDANMINGBUNENGWEIKONG', '申请单名不能为空')
        )
      }
      this.saveEdit()
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
      this.init()
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
    saveClose(val) {
      this.applyNumber = val
      this.init()
    },
    chioce(e, name) {
      this.inforData[name] = e
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
.remark-box {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 15px;
    margin-right: 40px;
  }
  .textarea {
    // flex: 1;
    // width: auto;
    width: 90.8%;
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
  