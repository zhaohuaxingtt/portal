<template>
  <div style="padding-bottom: 30px; position: relative">
    <!-- RsObject?mtz决策资料:导出 -->
    <div ref="qrCodeDiv" id="qrCodeDiv" style="position: relative">
      <!-- 水印 class="content_dialog" -->
      <div
        class=""
        v-if="
          !RsObject &&
          (formData.statusDesc == '流转完成' || formData.statusDesc == '定点')
        "
      ></div>
      <iCard class="upload_hr" ref="tabsBoxTitle" id="tabsBoxTitle">
        <div slot="header" class="headBox">
          <p class="headTitle">{{ title }}</p>
          <div class="tabs_box_right">
            <template v-if="meetingType">
              <div class="big_text">
                <span class="samll_val"
                  >{{ formData.appNo }}-{{ formData.appName }}</span
                >
              </div>
              <div class="small_text">
                <span>Application Date：</span>
                <span class="samll_val">{{ getDay(formData.createDate) }}</span>
              </div>
              <div class="small_text">
                <span>Commodity：</span>
                <span class="samll_val">{{ formData.depteName }}</span>
              </div>
              <div>
                <span>Buyer：</span>
                <span class="samll_val">{{ formData.linieName }}</span>
              </div>
            </template>
          </div>
        </div>
        <div ref="ruleTableTitle">
          <el-divider class="hr_divider" />

          <p class="tableTitle padding-bottom20" v-if="RsObject">
            {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
          </p>
          <p
            class="tableTitle padding-bottom20"
            v-if="!RsObject && ruleTableListData.length > 0"
          >
            {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
          </p>
        </div>
        <!-- highlight-current-row -->
        <tableList
          ref="moviesTable"
          :tableData="ruleTableListData"
          :tableTitle="ruleTableTitle1_1"
          :tableLoading="loadingRule"
          :header-row-class-name="'ruleTableHeader'"
          :index="true"
          :rowClassName="'table-row'"
          v-if="RsObject"
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
        <!-- 导出规则表格 -->
        <tableList
          ref="moviesTable"
          :tableData="ruleTableListData"
          :tableTitle="ruleTableTitle1_1"
          :tableLoading="loadingRule"
          v-if="!RsObject && ruleTableListData.length > 0"
          :index="true"
          :rowClassName="'table-row'"
          :header-row-class-name="'ruleTableHeader'"
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
        <div class="padding-bottom30" ref="padding"></div>
      </iCard>
      <iCard class="margin-top20">
        <div slot="header" class="headBox">
          <p class="headTitle">{{ language('BEIZHU', '备注') }}-Remarks</p>
          <span class="buttonBox">
            <iButton
              v-if="
                RsObject &&
                (formData.statusDesc == '草稿' ||
                  formData.statusDesc == '未通过') &&
                meetingNumber == 0
              "
              @click="handleClickSave($event)"
              v-permission="PORTAL_MTZ_POINT_JUECEDATA_BAOCUN"
              >{{ language('BAOCUN', '保存') }}</iButton
            >
          </span>
        </div>
        <iInput
          v-model="formData.remark"
          :disabled="
            !(
              (formData.statusDesc == '草稿' ||
                formData.statusDesc == '未通过') &&
              RsObject &&
              meetingNumber == 0
            )
          "
          class="margin-top10"
          :rows="8"
          type="textarea"
        />
      </iCard>
      <iCard v-if="isMeeting && applayDateData.length > 0" class="margin-top20">
        <p>
          {{ language('SHENQINGRIQI', '申请日期') }}:{{
            moment(new Date()).format('YYYY-MM-DD')
          }}
        </p>
        <div :class="RsObject ? 'applayDateBox' : 'applayDateBox1'">
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
      <!-- 隐藏显示：用于获取相应元素高度 -->
      <div style="overflow: hidden; height: 0">
        <div>
          <iCard ref="remark-card" class="margin-top20 computed">
            <div slot="header" ref="remark-title" class="headBox">
              <p class="headTitle">{{ language('BEIZHU', '备注') }}-Remarks</p>
              <span class="buttonBox"> </span>
            </div>
            <div class="beizhu-value" ref="remark">
              <p
                class="remarkItem"
                v-for="(item, index) in getRemarkAll"
                :key="index"
              >
                {{ item }}<br />
              </p>
            </div>
          </iCard>
          <iCard
            ref="applayDateData"
            v-if="isMeeting && applayDateData.length > 0"
            class="margin-top20"
          >
            <div slot="header" class="headBox">
              <p class="headTitle">
                {{ language('SHENQINGRIQI', '申请日期') }}:{{
                  moment(new Date()).format('YYYY-MM-DD')
                }}
              </p>
            </div>
            <div :class="RsObject ? 'applayDateBox' : 'applayDateBox1'">
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
                  <span class="applayDateDeptTitle">{{
                    item.deptFullCode
                  }}</span>
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
        <div class="page-logo" ref="pageNum">
          <div>
            <p class="pageNum"></p>
          </div>
          <div>
            <p>{{ userName }}</p>
            <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD') }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- pdf导出页面分页 -->
    <div id="pdfPage-box" ref="pdfPage-box" class="pdfPage-box">
      <template v-for="(tableData, index) in ruleTableList">
        <div :key="index" class="page-item">
          <!-- class="content_dialog" -->
          <div
            v-if="
              !RsObject &&
              (formData.statusDesc == '流转完成' ||
                formData.statusDesc == '定点')
            "
          ></div>
          <div class="upload_hr" :style="{ height: pdfItemHeight + 'px' }">
            <iCard>
              <div slot="header" class="headBox">
                <p class="headTitle">{{ title }}</p>
                <div class="tabs_box_right" v-if="meetingType">
                  <div class="big_text">
                    <span class="samll_val"
                      >{{ formData.appNo }}-{{ formData.appName }}</span
                    >
                  </div>
                  <div class="small_text">
                    <span>Application Date：</span>
                    <span class="samll_val">{{ formData.createDate }}</span>
                  </div>
                  <div class="small_text">
                    <span>Commodity：</span>
                    <span class="samll_val">{{ formData.depteName }}</span>
                  </div>
                  <div>
                    <span>Buyer：</span>
                    <span class="samll_val">{{ formData.linieName }}</span>
                  </div>
                </div>
              </div>
              <el-divider class="hr_divider" />
              <p class="tableTitle" v-if="RsObject">
                {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
              </p>
              <p
                class="tableTitle"
                v-if="!RsObject && ruleTableListData.length > 0"
              >
                {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
              </p>
              <!-- highlight-current-row -->
              <tableList
                class="margin-top20"
                :tableData="tableData"
                :tableTitle="ruleTableTitle1_1"
                :tableLoading="loadingRule"
                :index="true"
                v-if="RsObject"
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
              <!-- 导出规则表格 -->
              <tableList
                class="margin-top20"
                :tableData="tableData"
                :tableTitle="ruleTableTitle1_1"
                :tableLoading="loadingRule"
                v-if="!RsObject && tableData.length > 0"
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
            <template v-if="oncePage">
              <iCard>
                <div slot="header" class="headBox">
                  <p class="headTitle">
                    {{ language('BEIZHU', '备注') }}-Remarks
                  </p>
                  <span class="buttonBox"> </span>
                </div>
                <div class="beizhu-value">
                  <p class="remarkItem" v-for="(item, i) in onceTabel" :key="i">
                    {{ item }}<br />
                  </p>
                </div>
              </iCard>
            </template>
          </div>
          <div class="page-logo">
            <div>
              <p class="pageNum"></p>
            </div>
            <div>
              <p>{{ userName }}</p>
              <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD') }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-for="(remark, index) in remarkList">
        <div :key="index" class="page-item remarkCard">
          <!-- class="content_dialog" -->
          <div
            v-if="
              !RsObject &&
              (formData.statusDesc == '流转完成' ||
                formData.statusDesc == '定点')
            "
          ></div>
          <div :style="{ height: remarkPageHeight + 'px', background: '#fff' }">
            <iCard>
              <div slot="header" class="headBox">
                <p class="headTitle">
                  {{ language('BEIZHU', '备注') }}-Remarks
                </p>
                <span class="buttonBox"> </span>
              </div>
              <div class="beizhu-value">
                <p class="remarkItem" v-for="(item, i) in remark" :key="i">
                  {{ item }}<br />
                </p>
              </div>
            </iCard>
            <iCard
              v-if="
                isMeeting &&
                applayDateData.length > 0 &&
                !appPage &&
                index == remarkList.length - 1
              "
              class="margin-top20"
            >
              <div slot="header" class="headBox">
                <p class="headTitle">
                  {{ language('SHENQINGRIQI', '申请日期') }}:{{
                    moment(new Date()).format('YYYY-MM-DD')
                  }}
                </p>
              </div>
              <div :class="RsObject ? 'applayDateBox' : 'applayDateBox1'">
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
                    <span class="applayDateDeptTitle">{{
                      item.deptFullCode
                    }}</span>
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
          <div class="page-logo">
            <div>
              <p class="pageNum"></p>
            </div>
            <div>
              <p>{{ userName }}</p>
              <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD') }}</p>
            </div>
          </div>
        </div>
      </template>
      <div v-if="appPage" class="page-item remarkCard">
        <!-- class="content_dialog" -->
        <div
          v-if="
            !RsObject &&
            (formData.statusDesc == '流转完成' || formData.statusDesc == '定点')
          "
        ></div>
        <div :style="{ height: remarkPageHeight + 'px', background: '#fff' }">
          <iCard
            v-if="isMeeting && applayDateData.length > 0"
            class="margin-top20"
          >
            <div slot="header" class="headBox">
              <p class="headTitle">
                {{ language('SHENQINGRIQI', '申请日期') }}:{{
                  moment(new Date()).format('YYYY-MM-DD')
                }}
              </p>
            </div>
            <div :class="RsObject ? 'applayDateBox' : 'applayDateBox1'">
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
                  <span class="applayDateDeptTitle">{{
                    item.deptFullCode
                  }}</span>
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
        <div class="page-logo">
          <div>
            <p class="pageNum"></p>
          </div>
          <div>
            <p>{{ userName }}</p>
            <p>{{ new Date().getTime() | dateFilter('YYYY-MM-DD') }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- loading -->
    <div class="percentage-box" id="pdfHide" v-if="loading">
      <el-progress
        :percentage="percentage"
        type="circle"
        color="#1660f1"
        :show-text="false"
        stroke-width="15"
      ></el-progress>
      <div class="percentage-text">
        {{ percentageText }}{{ point }}{{ percentage }}
      </div>
    </div>
    <!-- 截图区域 -->
    <div class="pdf-containr">
      <div ref="pdf-containr" class="page-item"></div>
    </div>
  </div>
</template>

<script>
import { iCard, icon, iInput, iButton, iMessage, iPagination } from 'rise'
import tableList from '@/components/commonTable/index.vue'
import { ruleTableTitle1_1 } from './data'
import {
  updateApp,
  approvalList
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import { pageMixins } from '@/utils/pageMixins'
import { dataURLtoFile, transverseDownloadPDF } from '@/utils/pdf'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
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
  props: {
    RsType: { type: Boolean },

    baseData: {
      type: Object,
      default: () => ({})
    }
  },
  inject: ['pageTitle'],
  data() {
    return {
      formData: {},
      ruleTableTitle1_1,
      ruleTableListData: [],
      loadingRule: false,
      applayDateData: [],
      RsObject: true,
      moment: window.moment,
      meetingNumber: Number(this.$route.query.meeting) || 0,
      meetingType: false,
      loading: false,
      ruleTableList: [],
      appPage: false,
      percentage: '0',
      pageHeight: 0,
      pdfItemHeight: 0,
      remarkPageHeight: 0,
      percentageText: '下载中，请稍后',
      remarkList: [[]],
      oncePage: true,
      onceTabel: [],
      residualHeight: 0
    }
  },
  watch: {
    getRemarkAll(val) {
      if (val.length)
        this.$nextTick(() => {
          this.computedRemark()
        })
    },
    baseData: {
      handler(val) {
        this.$set(this, 'formData', val.chipAppBase || {})
        this.$set(this, 'ruleTableListData', val.chipDetailList || [])
        if (
          this.formData.workflowType == 'SIGN' &&
          !(
            this.formData.statusDesc == '流转完成' ||
            this.formData.statusDesc == '定点' ||
            this.formData.statusDesc == '未通过'
          )
        ) {
          if (this.meetingNumber == 0) {
            if (this.RsObject) {
              this.meetingType = false
            } else {
              this.meetingType = true
            }
          } else {
            this.meetingType = true
          }
        } else {
          this.meetingType = true
        }
        this.$nextTick(() => {
          this.computedRuleTableHeight()
        })
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    if (this.RsType) {
      this.RsObject = false
    }
    this.initApplayDateData()
  },
  computed: {
    title() {
      let res = '---'
      switch (this.baseData?.chipAppBase?.workflowType) {
        case 'MEETING':
          // 上会
          res = 'CSC 定点推荐 - 芯片补差 CSC Nomination Recommendation - Chip'
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
      return (
        this.formData.workflowType == 'MEETING' ||
        this.formData.workflowType == 'SIGN'
      )
    },

    getRemarkAll() {
      return this.formData.remark?.split('\n') || [''] // 默认添加一个'',否者无数据时不显示
    },
    username() {
      return this.$store.state.permission.userInfo.userName
    }
  },
  filters: {
    // 日期格式化
    dateFilter(val, format = 'YYYY-MM-DD HH:mm:ss', sourceFormat) {
      return typeof val === 'string' || typeof val === 'number'
        ? window.moment(val, sourceFormat).format(format)
        : val
    }
  },
  methods: {
    getDay(date) {
      return date ? date.split(' ')[0] : date
    },
    // 计算备注高度
    computedRemark() {
      this.computedRuleTableHeight()
      // 考虑边框问题 test（28）.pdf
      let remarkCardHeight = this.$refs['remark-card']?.$el.offsetHeight
      let remarkContentHeight = this.$refs['remark']?.offsetHeight
      let applayDateData = this.$refs['applayDateData']?.$el.offsetHeight || 0
      let otherHeight = remarkCardHeight - remarkContentHeight // 备注标题高度
      let pageNumHeight = this.$refs.pageNum.offsetHeight // 页码高度
      // let remarkTitleHeight = this.$refs.remarkTitle.offsetHeight
      let list = this.$refs.remark.getElementsByClassName('remarkItem')
      let pageWidth = this.$refs.qrCodeDiv?.clientWidth || 0
      let pageHeight = (pageWidth / 841.89) * 595.28
      // 备注页面高度 = 完整高度 - 页码高度
      this.remarkPageHeight = pageHeight - pageNumHeight
      let arr = []
      let onceTabel = []
      let remarkList = []
      let sumHeight = 0
      list.forEach((item, i) => {
        // 填充上一页剩余空间
        if (item.offsetHeight < this.residualHeight - otherHeight) {
          this.residualHeight -= item.offsetHeight
          this.oncePage = true
          onceTabel.push(this.getRemarkAll[i])
        } else {
          // 清空剩余空间高度
          this.residualHeight = 0
          sumHeight += item.offsetHeight
          if (sumHeight < pageHeight - otherHeight - pageNumHeight) {
            arr.push(this.getRemarkAll[i])
          } else {
            remarkList.push(JSON.parse(JSON.stringify(arr)))
            arr = [this.getRemarkAll[i]]
            sumHeight = item.offsetHeight
          }
        }
      })
      if (arr.length) {
        remarkList.push(JSON.parse(JSON.stringify(arr)))
      }
      if (applayDateData) {
        if (
          pageHeight - sumHeight - otherHeight - pageNumHeight >
          applayDateData
        ) {
          this.appPage = false
        } else {
          this.appPage = true
        }
      }
      this.onceTabel = onceTabel
      this.remarkList = remarkList
    },
    // 在外层overflow中调用
    downPdf() {
      this.percentage = '0'
      var name = ''
      if (this.title == '') {
        name = 'RS导出'
      } else if (this.pageTitle.title) {
        name = this.pageTitle.title
      } else {
        name = this.title
      }
      this.handleExportPdf(name)
    },
    initApplayDateData() {
      approvalList({
        appId: this.$route.query.appId
      }).then((res) => {
        if (res?.code === '200') {
          let data = res.data
          this.applayDateData = data
          this.$nextTick(() => {
            this.computedRemark()
          })
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    computedRuleTableHeight() {
      let rowList =
        this.$refs['moviesTable']?.$el.getElementsByClassName('table-row') || []
      let pageWidth = this.$refs.tabsBoxTitle?.$el.clientWidth || 0
      // card 顶部内容高度
      let cardTitle =
        this.$refs.tabsBoxTitle.$el.getElementsByClassName('cardHeader')[0]
          .clientHeight
      // 规则列表顶部内容高度
      let ruleTableTitle = this.$refs.ruleTableTitle.offsetHeight
      // 对应页面A4高度
      this.pageHeight = (pageWidth / 841.89) * 595.28
      // 表头高度
      let ruleTableHeader =
        this.$refs['moviesTable']?.$el.getElementsByClassName(
          'ruleTableHeader'
        )[0].offsetHeight || 0
      // 页码高度
      let pageNumHeight = this.$refs.pageNum.offsetHeight
      let sumHeight = 0
      let arr = []
      let tableList = []
      // 表格页面高度 = 完整高度 - 页码高度
      this.pdfItemHeight = this.pageHeight - pageNumHeight
      rowList.forEach((item, i) => {
        sumHeight += item.clientHeight
        // ruleTableHeader 表头高度
        if (
          sumHeight >
          this.pageHeight -
            ruleTableTitle -
            cardTitle -
            ruleTableHeader -
            pageNumHeight
        ) {
          tableList.push(arr)
          sumHeight = item.clientHeight
          arr = [this.ruleTableListData[i]]
        } else {
          arr.push(this.ruleTableListData[i])
        }
      })
      // 表格也剩余的备注区域高度
      this.residualHeight =
        this.pageHeight -
        ruleTableTitle -
        cardTitle -
        ruleTableHeader -
        pageNumHeight -
        sumHeight
      if (arr.length) tableList.push(arr)
      this.ruleTableList = tableList
    },
    // 点击保存
    handleClickSave(el) {
      el.cancelBubble = true
      let params = {
        ...this.baseData,
        chipAppBase: this.formData
      }
      updateApp(params).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    // 导出会外流转单
    handleToSignPreview() {
      const { href } = this.$router.resolve({
        path: '/mtz/annualGeneralBudget/locationChange/ChipLocationPoint/signPreview',
        query: {
          appId: this.$route.query.appId
        }
      })
      window.open(href, '_blank')
    },
    // 导出pdf
    handleExportPdf(name) {
      this.loading = true
      console.time('截图')
      this.fileList = []
      let elList = this.$refs['pdfPage-box'].getElementsByClassName('page-item')
      this.elList = elList
      if (!elList.length) {
        iMessage.warn('请稍等')
        this.$emit('changeStatus', 'exportLoading', false)
        return
      }
      this.pageLength = elList.length
      this.showPage = false
      setTimeout(async () => {
        this.$nextTick(async () => {
          console.log('start')
          this.pdf = new JsPDF('l', 'pt', 'a4', true) //l横向打印，p纵向打印 true=>开启压缩
          for (let i = 0; i < this.pageLength; i++) {
            const el = elList[i]
            await this.getPdfImage({
              dom: el,
              j: i
            })
          }
          this.pdf.save(name)
          console.timeEnd('截图')
          this.loading = false
        })
      }, 200)
    },

    // 截取页面,存入pdf
    async getPdfImage({ dom, j }) {
      let scale = 2
      const el = this.$refs['pdf-containr']
      console.time(`img${j}`)
      // canvas 不能通过innerHTML渲染
      dom.getElementsByClassName('pageNum')[0].innerHTML = `page ${j + 1} of ${
        this.pageLength
      }`
      el.innerHTML = dom.innerHTML
      await html2canvas(el, {
        allowTaint: true,
        dpi: 96, //分辨率
        scale: scale, //设置缩放
        useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
        // bgcolor: "#ffffff", //应该这样写
        // logging: false, //打印日志用的 可以不加默认为false
        porxy: '',
        ignoreElements: (el) => {
          if (
            el.id == 'pdfHide' ||
            el.id == 'qrCodeDiv' ||
            el.id == 'pdfPage-box'
          ) {
            return true
          }
          return false
        }
      })
        .then((canvas) => {
          this.change(j)
          var contentWidth = canvas.width //
          var contentHeight = canvas.height //
          var imgWidth = 841.89
          var imgHeight = (841.89 / contentWidth) * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 0.5) //压缩倍率
          if (j != 0) this.pdf.addPage()
          this.pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          console.timeEnd(`img${j}`)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    change(j) {
      this.percentage = parseInt(((j + 1) / this.pageLength) * 100)
    }
  }
}
</script>

<style lang="scss" scoped>
#tabsBoxTitle,
.computed {
  ::v-deep .cardBody {
    padding-bottom: 0;
  }
}
$tabsInforHeight: 35px;

::v-deep .cardHeader {
  padding: 30px 40px 0 !important;
}

.tableTitle {
  font-weight: bold;
  font-family: Arial;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}
.table_right {
  display: inline-block;
  font-family: Arial;
  color: #000000;
  font-size: 18px;
  width: 100%;
  text-align: end;
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
.applayDateBox {
  overflow-x: scroll;
  margin: 20px 0;
  padding-bottom: 20px;
  white-space: nowrap;
}
.applayDateIcon {
  width: 33px;
  height: 33px;
  margin-top: 10px;
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
.download_btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-bottom: 20px;
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
.over_flow_y_ture {
  ::v-deep .el-table__body-wrapper {
    max-height: 300px;
    overflow-y: auto;
  }
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
.hr_divider {
  margin: 0 1.5rem 0 0;
}
.tabs_box_right {
  height: 40px;
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
}

.upload_hr {
  ::v-deep .cardBody {
    padding-top: 0px !important;
  }
}

::v-deep .el-form-item__content {
  line-height: 20px !important;
}
.pdf-containr {
  width: 100%;
  height: 0;
  overflow: hidden;
  position: absolute;
  ::v-deep .cardBody {
    padding-top: 0px !important;
    padding: 0 40px;
  }
}
.pdfPage-box {
  position: absolute;
  width: 100%;
  height: 0px;
  overflow: hidden;
  ::v-deep .card {
    .cardBody {
      padding: 0 40px;
    }
  }
}
.page-item {
  width: 100%;
  position: relative;
}

.percentage-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 99999;
  background: rgba(255, 255, 255, 0.8);
}
.percentage-text {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #1660f1;
}

.page-logo {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  border-top: 1px solid #666;
}
.padding-bottom30 {
  padding-bottom: 30px;
}
.remarkCard {
  ::v-deep .card {
    box-shadow: none;
  }
}
</style>
