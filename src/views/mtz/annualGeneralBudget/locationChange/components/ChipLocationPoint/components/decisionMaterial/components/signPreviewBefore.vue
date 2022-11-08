<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2021-11-10 13:43:16
 * @LastEditors: Please set LastEditors
 * @Description: mtz
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\mtz.vue
-->
<template>
  <div class="tabsBoxWrap">
    <div id="tabsBoxWrap">
      <span class="download_btn" v-if="approve"> </span>
      <div ref="qrCodeDiv" class="sign_swap">
        <iCard class="upload_hr">
          <div slot="header" class="headBox">
            <p class="headTitle">{{ title }}</p>
            <div class="tabs_box_right">
              <div class="big_text">
                <span class="samll_val"
                  >{{ formInfo.appNo }}-{{ formInfo.appName }}</span
                >
              </div>
              <div class="small_text">
                <span>Application date：</span>
                <span class="samll_val">{{ formInfo.createDate }}</span>
              </div>
              <div class="small_text">
                <span>Commodity：</span>
                <span class="samll_val">{{ formInfo.depteName }}</span>
              </div>
              <div>
                <span>Buyer：</span>
                <span class="samll_val">{{ formInfo.linieName }}</span>
              </div>
            </div>
          </div>
          <el-divider v-if="ruleTableListData.length > 0" />
          <p class="tableTitle" v-if="ruleTableListData.length > 0">
            {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
          </p>
          <tableList
            class="margin-top20"
            :tableData="ruleTableListData"
            v-if="ruleTableListData.length > 0"
            :tableTitle="ruleTableTitle1_1"
            :tableLoading="loading"
            :index="true"
            :selection="false"
            border
          >
            <template slot-scope="scope" slot="method">
              <span>{{
                scope.row.method == '2' ? '变价单补差' : '一次性补差'
              }}</span>
            </template>
            <template slot-scope="scope" slot="sapCode">
              <span>{{ scope.row.sapCode }}</span>
            </template>
            <template slot-scope="scope" slot="startDate">
              <span>{{ getDay(scope.row.startDate) }}</span>
            </template>
            <template slot-scope="scope" slot="endDate">
              <span>{{ getDay(scope.row.endDate) }}</span>
            </template>
          </tableList>
        </iCard>
        <iCard class="margin-top20">
          <div slot="header" class="headBox">
            <p class="headTitle">{{ language('BEIZHU', '备注') }}-Remarks</p>
          </div>
          <iInput
            v-model="formInfo.remark"
            class="margin-top10"
            :rows="8"
            :disabled="true"
            type="textarea"
          />
        </iCard>
        <iCard
          v-if="isMeeting && applayDateData.length > 0"
          class="margin-top20"
        >
          <p>
            {{ language('SHENQINGRIQI', '申请日期') }}:{{
              moment(formInfo.updateDate).format('YYYY-MM-DD')
            }}
          </p>
          <div class="applayDateBox1">
            <div
              class="applayDateContent"
              v-for="(item, index) in applayDateData"
              :key="index"
            >
              <img
                class="margin-left5 applayDateIcon"
                :src="
                  item.taskStatus === '同意'
                    ? require('@/assets/images/icon/yes.png')
                    : require('@/assets/images/icon/no.png')
                "
                :fit="fit"
              />
              <div class="applayDateContentItem first_one">
                <span>部门：</span>
                <span class="applayDateDeptTitle">{{ item.deptFullCode }}</span>
              </div>
              <div class="applayDateContentItem">
                <span>审批人：</span>
                <span>{{ item.nameZh }}</span>
              </div>
              <div class="applayDateContentItem">
                <span>日期：</span>
                <span>{{ item.endTime }}</span>
              </div>
            </div>
          </div>
        </iCard>
      </div>
    </div>
  </div>
</template>

<script>
import {
  iCard,
  icon,
  iInput,
  iButton,
  iMessage,
  iPagination,
  iDialog
} from 'rise'
import tableList from '@/components/commonTable/index.vue'
import { ruleTableTitle1_1 } from './data'
import { pageMixins } from '@/utils/pageMixins'
import signPreview from './signPreview'
import {
  getAppById,
  approvalList
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    icon,
    iInput,
    iButton,
    iPagination,
    tableList,
    iDialog,
    signPreview
  },
  props: {
    RsType: { type: Boolean }
  },
  data() {
    return {
      formInfo: {},
      ruleTableTitle1_1,
      ruleTableListData: [],
      rulePageParams: {
        totalCount: 0,
        currPage: 1,
        pageSizes: 10,
        layout: 'sizes, prev, pager, next, jumper'
      },
      partTableListData: [],
      partPageParams: {
        totalCount: 0,
        currPage: 1,
        pageSizes: 10,
        layout: 'sizes, prev, pager, next, jumper'
      },
      loadingRule: false,
      loadingPart: false,
      applayDateData: [],
      moment: window.moment,
      approve: true,
      clickRulesNumber: 0
    }
  },
  async created() {
    this.getAppById()
    this.initApplayDateData()
  },
  computed: {
    title() {
      let res = '---'
      switch (this.formInfo?.type) {
        case 'MEETING':
          // 上会
          res = 'CSC 定点推荐 - 芯片补差  CSC Nomination Recommendation - Chip'
          break
        case 'SIGN':
          // 流转
          res = '流转定点推荐 - 芯片补差 Nomination Recommendation - Chip'
          break
        case 'FILING':
          // 备案
          res = '备案定点推荐 - 芯片补差 Nomination Recommendation - Chip'
          break
        default:
          break
      }
      return res
    },
    isMeeting() {
      return this.formInfo.type == 'MEETING' || this.formInfo.type == 'SIGN'
    }
  },
  methods: {
    getDay(date) {
      console.log(date)
      return date ? date.split(' ')[0] : date
    },
    getAppById() {
      getAppById({
        appId: this.$route.query.appId
      }).then((res) => {
        let data = res.data.chipAppBase
        this.$set(this, 'formInfo', data)
        this.$set(this, 'ruleTableListData', res.data.chipDetailList || [])
        this.ttNominateAppId = data.id
        this.appName = data.appName
        this.user = data.linieName
        this.dept = data.depteCode
        this.baseData = res.data
        console.log(this.baseData)
      })
    },
    initApplayDateData() {
      approvalList({
        appId: this.$route.query.appId
      }).then((res) => {
        if (res?.code === '200') {
          let data = res.data
          this.applayDateData = data
        } else {
          iMessage.error(res.desZh)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
$tabsInforHeight: 35px;

.tabsBoxWrap {
  position: fixed !important;
  left: 0;
  right: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  overflow-y: auto;
  background: white !important;
}
.sign_swap {
  width: 100%;
  height: 100%;
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
  display: flex;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 13px;
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
  width: 33px;
  height: 33px;
}
.applayDateContentItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
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
      padding: 10px 10px;
      width: 68%;
      min-height: $tabsInforHeight;
      height: auto;
      background: #f8f8fa;
      text-align: center;
    }
  }
}

.download_btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
}

::v-deep .el-form {
  .el-table {
    .cell {
      padding: 0 !important;

      span {
        margin-right: 0px !important;
      }
    }
  }
}

.tabs_box_right {
  .samll_title {
    width: 80px;
  }
  .small_text {
    float: left;
  }
  div {
    display: flex;
    align-items: flex-start;
    margin-right: 20px;
  }
  span {
    display: inline-block;
    font-size: 15px !important;
  }
}
.hr_divider {
  margin: 0 1.5rem 0 0;
}
::v-deep .cardHeader {
  padding: 1.875rem 1.5625rem 0 2.4rem !important;
}
.infor_futitle {
  padding: 0.5rem 0;
  font-size: 15px !important;
  line-height: 25px;
  .big_font {
    font-weight: bold;
  }
  .big_small {
    padding-left: 15px;
  }
}
.upload_hr {
  ::v-deep .cardBody {
    padding-top: 0px !important;
  }
}
.over_flow_y_ture {
  ::v-deep .el-table__body-wrapper {
    max-height: 300px;
    overflow-y: auto;
  }
}

::v-deep .el-form-item__content {
  line-height: 20px !important;
}
.first_one {
  margin-top: 30px !important;
}
</style>
