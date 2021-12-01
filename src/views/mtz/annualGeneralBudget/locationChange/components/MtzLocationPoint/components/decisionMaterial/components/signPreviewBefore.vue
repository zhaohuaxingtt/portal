<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2021-11-10 13:43:16
 * @LastEditors: Please set LastEditors
 * @Description: mtz
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\mtz.vue
-->
<template>
  <div ref="qrCodeDiv" class="sign_swap" style="padding-bottom:30px;">
    <iCard>
      <div slot="header" class="headBox">
        <p class="headTitle">{{title}}</p>
      </div>
      <div class="tabsBoxInfor">
        <div class="inforDiv"
            v-for="(item,index) in formList"
            :key="index">
          <span>{{language(item.key,item.label)}}</span>
          <span
                class="inforText"
                >{{formData[item.prop]}}</span>
        </div>
      </div>
      <el-divider/>
      <p class="tableTitle">{{language('GUIZEQINGDAN', '规则清单')}}</p>
        <tableList
          class="margin-top20"
          :tableData="ruleTableListData"
          :tableTitle="ruleTableTitle1"
          :tableLoading="loading"
          :index="true"
          :selection="false"
          @handleSelectionChange="handleSelectionChange">
          <template slot-scope="scope" slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
          <template slot-scope="scope" slot="thresholdCompensationLogic">
            <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
          </template>
        </tableList>
        <iPagination
        v-update
        @size-change="handleSizeChange($event, getPageAppRule)"
        @current-change="handleCurrentChange($event, getPageAppRule)"
        background
        :page-sizes="page.pageSizes"
        :page-size="rulePageParams.pageSize"
        :layout="page.layout"
        :current-page='rulePageParams.currPage'
        :total="rulePageParams.totalCount"/>
      <el-divider class="margin-top20"/>
      <p class="tableTitle">{{language('LJQD', '零件清单')}}</p>
        <tableList
          class="margin-top20"
          :tableData="partTableListData"
          :tableTitle="partTableTitle1"
          :tableLoading="loading"
          :index="true"
          :selection="false"
          @handleSelectionChange="handleSelectionChange">
          <template slot-scope="scope" slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
          <template slot-scope="scope" slot="thresholdCompensationLogic">
            <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
          </template>
        </tableList>
        <iPagination
        v-update
        @size-change="handleSizeChange($event, getPagePartMasterData)"
        @current-change="handleCurrentChange($event, getPagePartMasterData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="partPageParams.pageSize"
        :layout="page.layout"
        :current-page='partPageParams.currPage'
        :total="partPageParams.totalCount"/>
    </iCard>
    <iCard class="margin-top20">
      <div slot="header"
          class="headBox">
        <p class="headTitle">{{language('BEIZHU', '备注')}}</p>
      </div>
      <iInput
              v-model="formData.linieMeetingMemo"
              class="margin-top10"
              :rows="8"
              type="textarea" />
    </iCard>
    <iCard v-if="isMeeting && applayDateData.length>0" class="margin-top20">
        <p>{{language('SHENQINGRIQI','申请日期')}}:{{moment(new Date()).format('YYYY-MM-DD')}}</p>
        <div class="applayDateBox1">
          <div class="applayDateContent"
               v-for="(item, index) in applayDateData"
               :key="index">
            <icon v-if="item.taskStatus==='同意'"
                  class="margin-left5 applayDateIcon"
                  symbol
                  name="iconrs-wancheng"></icon>
            <icon v-else
                  class="margin-left5 applayDateIcon"
                  symbol
                  name="iconrs-quxiao"></icon>
            <div class="applayDateContentItem">
              <span>部门：</span>
              <span class="applayDateDeptTitle">{{item.deptNameZh}}</span>
            </div>
            <div class="applayDateContentItem">
              <span>日期：</span>
              <span>{{item.endTime}}</span>
            </div>
          </div>
        </div>
      </iCard>
  </div>
</template>

<script>
import { iCard, icon, iInput, iButton, iMessage, iPagination } from 'rise'
import { formList } from './data'
import tableList from '@/components/commonTable/index.vue'
import { ruleTableTitle1, partTableTitle1} from './data'
import { getAppFormInfo, pageAppRule, pagePartMasterData,approvalList } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { pageMixins } from '@/utils/pageMixins'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    icon,
    iInput,
    iButton,
    iPagination,
    tableList
  },
  props:{
    RsType:{type:Boolean}
  },
  data () {
    return {
      formData: {},
      formList,
      ruleTableTitle1:ruleTableTitle1,
      partTableTitle1:partTableTitle1,
      ruleTableListData: [],
      rulePageParams: {
        totalCount: 0,
        currPage: 1,
        pageSizes: 10,
        layout: 'sizes, prev, pager, next, jumper',
      },
      partTableListData: [],
      partPageParams: {
        totalCount: 0,
        currPage: 1,
        pageSizes: 10,
        layout: 'sizes, prev, pager, next, jumper',
      },
      applayDateData: [],
      moment: window.moment
    }
  },
  watch: {
    mtzObject(newVlue,oldValue){
      
    }
  },
  created() {
    this.initApplayDateData()
    this.getAppFormInfo()
    this.getPageAppRule()
    this.getPagePartMasterData()
  },
  computed: {
    mtzObject(){
      return this.$store.state.location.mtzObject;
    },
    title() {
      let res = ''
      switch (this.formData.flowType) {
        case 'MEETING':
          // 上会
          res = 'CSC 定点推荐 - MTZ  CSC Nomination Recommendation - MTZ'
          break;
        case 'SIGN':
          // 流转
          res = '流转定点推荐 - MTZ Nomination Recommendation - MTZ'
          break;
        case 'FILING':
          // 备案
          res = '备案定点推荐 - MTZ Nomination Recommendation - MTZ'
          break;
        default:
          break;
      }
      return res 
    },
    isMeeting() {
      return this.formData.flowType == 'MEETING' || this.formData.flowType == 'SIGN'
    }
  },
  methods: {
    initApplayDateData () {
      approvalList({ mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId }).then(res => {
        if (res?.code === '200') {
          let data = res.data
          this.applayDateData = data
        } else {
          iMessage.error(res.desZh)
        }
      })

    },
    // 获取申请单信息
    getAppFormInfo() {
      getAppFormInfo({
        mtzAppId:this.$route.query.mtzAppId
      }).then(res => {
        if(res && res.code == 200) {
          this.formData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取规则清单表格数据
    getPageAppRule() {
      var list = {};
      list = {
        mtzAppId:this.$route.query.mtzAppId,
        pageNo: this.rulePageParams.currPage,
        pageSize: this.rulePageParams.pageSize,
      }
      
      pageAppRule(list).then(res => {
        if(res && res.code == 200) {
          this.ruleTableListData = res.data
          this.rulePageParams.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    // 获取零件清单表格数据
    getPagePartMasterData() {
      var list = {};
      list = {
        mtzAppId:this.$route.query.mtzAppId,
        pageNo: this.partPageParams.currPage,
        pageSize: this.partPageParams.pageSize,
      }

      pagePartMasterData(list).then(res => {
        if(res && res.code == 200) {
          this.partTableListData = res.data
          this.partPageParams.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
  }
}
</script>

<style lang='scss' scoped>
$tabsInforHeight: 35px;

.sign_swap{
  position:fixed!important;
  left:0;
  right:0;
  top:0;
  right:0;
  width:100%;
  height:100%;
  z-index:2000;
  overflow-y:auto;
  background:white!important;
}
.tableTitle {
  display: inline-block;
  font-weight: bold;
  font-family: Arial;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 0;
  }
}
.applayDateBox1 {
  display: flex;
  align-items: center;
  flex-flow: wrap;
  margin-top: 20px;
}
.applayDateIcon {
  margin-top: 10px;
  font-size: 30px;
}
.applayDateContentItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0 20px;
  font-size: 16px;
  .applayDateDeptTitle {
    font-weight: bold;
  }
}
.applayDateContent {
  display: inline-block;
  background-color: #cdd4e2;
  height: 178px;
  width: 16%;
  margin: 10px 0.3% 0;
  border-radius: 15px;
  text-align: center;
}
.tabsBoxInfor {
  margin-bottom: 10px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  .inforDiv {
    width: 29%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    margin-bottom: 20px;
    span {
      font-size: 15px;
    }
    .inforText {
      font-size: 14px;
      padding:10px 10px;
      width: 68%;
      min-height: $tabsInforHeight;
      height:auto;
      background: #f8f8fa;
      text-align: center;
    }
  }
}
</style>
