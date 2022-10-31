<!--
 * @Author: youyuan
 * @Date: 2021-11-04 10:02:28
 * @LastEditTime: 2021-11-10 14:12:02
 * @LastEditors: Please set LastEditors
 * @Description: 会外流转单pdf预览
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\signPreview.vue
  tabsBoxWrap打印div
  tabsBoxTitle打印页眉
-->
<template>
  <div style="padding-bottom: 30px">
    <div id="content">
      <!-- class="content_dialog" -->
      <!-- 水印 -->
      <iCard class="upload_hr" id="tabsBoxTitle">
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
          :disabled="true"
          :rows="8"
          type="textarea"
        />
      </iCard>
      <iCard v-if="applayDateData.length > 0" class="margin-top20">
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
</template>

<script>
import { iCard, icon, iInput, iButton, iMessage, iPagination } from 'rise'
import tableList from '@/components/commonTable/index.vue'
import { ruleTableTitle1_1 } from './data'
import {
  fetchSignPreviewDept,
  approvalList
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { pageMixins } from '@/utils/pageMixins'
import {
  getAppById,
  getLocationApplyStatus
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
export default {
  mixins: [pageMixins],
  props: ['m1'],
  components: {
    iCard,
    icon,
    iInput,
    iButton,
    iPagination,
    tableList
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
      applayDateData: [],
      deptData: [],
      moment: window.moment
    }
  },
  async created() {
    await this.getLocationApplyStatus()
    // this.$nextTick(e=>{
    console.log(this.m1)
    this.getAppById()
    this.initApplayDateData()
    // this.getSignPreviewDept()
    // })
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
      return this.formInfo.type == 'MEETING'
    }
  },
  methods: {
    getDay(date) {
      console.log(date)
      return date ? date.split(' ')[0] : date
    },

    async getLocationApplyStatus() {
      getLocationApplyStatus({}).then((res) => {
        this.statusList = res.data
      })
    },
    getStatus(status) {
      return (
        this.statusList?.find((item) => item.code == status)?.message || status
      )
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
    },

    getAppById() {
      getAppById({
        appId: this.$route.query.appId
      }).then((res) => {
        let data = res.data.chipAppBase
        data.statusDesc = this.getStatus(data.status)
        this.locationId = data.appNo
        this.$set(this, 'formInfo', data)
        this.$set(this, 'ruleTableListData', res.data.chipDetailList || [])
        this.appStatus = this.getStatus(data.status)
        this.ttNominateAppId = data.id
        this.appName = data.appName
        this.user = data.linieName
        this.dept = data.depteCode
        this.baseData = res.data
        console.log(this.baseData)
      })
    },
    // 获取部门数据
    getSignPreviewDept() {
      fetchSignPreviewDept({
        mtzAppId: this.$route.query.mtzAppId
      }).then((res) => {
        if (res && res.code == 200) {
          this.deptData = res.data
        } else iMessage.error(res.error)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
$tabsInforHeight: 35px;

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
.first_one {
  margin-top: 30px !important;
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
.deptBox {
  margin-left: 30px;
  display: flex;
  .deptItem {
    flex: auto;
    display: flex;
    p {
      font-weight: bold;
    }
    div {
      border-bottom: 1px solid black;
      margin-left: 10px;
      width: 60%;
    }
  }
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
  padding-top: 10px;
  padding-bottom: 20px;
}
#content {
  position: relative;
}
.content_dialog {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('~@/assets/images/icon/pass.png');
  z-index: 100000;
  opacity: 0.07;
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
  .samll_val {
  }
  .samll_title {
    width: 80px;
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
  .small_text {
    float: left;
  }
  .big_text {
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
// .over_flow_y_ture{
//   ::v-deep .el-table__body-wrapper{
//     max-height: 300px;
//     overflow-y: auto;
//   }
// }
::v-deep .el-form-item__content {
  line-height: 20px !important;
}
</style>
