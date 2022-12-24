<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2022-12-24 13:02:58
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: mtz
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\signExport.vue
-->
<template>
  <div style="padding-bottom: 30px; position: relative">
    <div
      ref="qrCodeDiv"
      id="qrCodeDiv"
      style="position: relative"
    >
      <iCard class="upload_hr" ref="tabsBoxTitle" id="tabsBoxTitle">
        <div slot="header" class="headBox">
          <p class="headTitle">{{ title }}</p>
          <!-- <div class="tabs_box_right"> -->
          <div class="tabs_box_right">
              <div class="big_text">
                <span class="samll_val"
                  >{{ formData.mtzAppId }}-{{ formData.appName }}</span
                >
              </div>
              <div class="small_text">
                <!-- <span>{{language("SHENQINGRIQI","申请日期")}}：</span> -->
                <span>Application date：</span>
                <span class="samll_val">{{ formData.createDate }}</span>
              </div>
              <div class="small_text">
                <!-- <span>{{language("KESHI","科室")}}：</span> -->
                <span>Commodity：</span>
                <span class="samll_val">{{ formData.linieDeptName }}</span>
              </div>
              <div>
                <!-- <span>{{language("CAIGOUYUAN","采购员")}}：</span> -->
                <span>Buyer：</span>
                <span class="samll_val">{{ formData.linieNameEn }}</span>
              </div>
          </div>
        </div>
        <div ref="ruleTableTitle">
          <el-divider class="hr_divider" />

          <div class="infor_futitle">
            <span class="big_font">Regulation:</span>
            <br />
            <span class="big_font"
              >MTZ Payment=(Effective Price-Base Price)*Raw Material
              Weight*Settle accounts Quantity*Ratio</span
            >
            <span class="big_small"
              >When:effective price > base price *(1+threshold)</span
            >
          </div>
          <p
            class="tableTitle"
            v-if="ruleTableListData.length > 0"
          >
            {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
          </p>
        </div>
        <!-- 导出规则表格 -->
        <tableList
          class="margin-top20"
          ref="moviesTable"
          :tableData="ruleTableListData"
          :tableTitle="ruleTableTitle1_1"
          v-if="ruleTableListData.length > 0"
          :index="true"
          :rowClassName="'table-row'"
          :header-row-class-name="'ruleTableHeader'"
          :selection="false"
          border
        >
          <template slot-scope="scope" slot="sapCode">
            <span>{{ scope.row.sapCode }}</span
            ><br />
            <span>{{ scope.row.supplierName }}</span>
          </template>
          <template slot-scope="scope" slot="compensationPeriod">
            <span>{{
              scope.row.compensationPeriod == 'A'
                ? '年度'
                : scope.row.compensationPeriod == 'H'
                ? '半年度'
                : scope.row.compensationPeriod == 'Q'
                ? '季度'
                : scope.row.compensationPeriod == 'M'
                ? '月度'
                : ''
            }}</span>
          </template>
        </tableList>
        <div ref="partTableTitle">
          <el-divider
            class="margin-top20"
            v-if="partTableListData.length > 0"
          />
          <p
            class="tableTitle"
            v-if="partTableListData.length > 0"
          >
            {{ language('LJQD', '零件清单') }}-Part List
          </p>
        </div>
        <!-- 导出零件表格 -->
        <tableList
          class="margin-top20"
          ref="partTable"
          :tableData="partTableListData"
          :tableTitle="partTableTitle1_1"
          v-if="partTableListData.length > 0"
          :index="true"
          :rowClassName="'part-table-row'"
          :header-row-class-name="'partTableHeader'"
          :selection="false"
        >
          <template slot-scope="scope" slot="sapCode">
            <span>{{ scope.row.sapCode }}</span
            ><br />
            <span>{{ scope.row.supplierName }}</span>
          </template>
          <template slot-scope="scope" slot="compensationPeriod">
            <span>{{
              scope.row.compensationPeriod == 'A'
                ? '年度'
                : scope.row.compensationPeriod == 'H'
                ? '半年度'
                : scope.row.compensationPeriod == 'Q'
                ? '季度'
                : scope.row.compensationPeriod == 'M'
                ? '月度'
                : ''
            }}</span>
          </template>
        </tableList>
        <div class="padding-bottom30" ref="padding"></div>
      </iCard>
      <iCard class="margin-top20">
        <div slot="header" class="headBox">
          <p class="headTitle">{{ language('BEIZHU', '备注') }}-Remarks</p>
        </div>
        <iInput
          v-model="formData.linieMeetingMemo"
          disabled
          class="margin-top10"
          :rows="8"
          type="textarea"
        />
      </iCard>
      <iCard v-if="applayDateData.length > 0" class="margin-top20">
        <p>
          {{ language('SHENQINGRIQI', '申请日期') }}:{{
            moment(new Date()).format('YYYY-MM-DD')
          }}
        </p>
        <div class="applayDateBox1">
          <div
            class="applayDateContent"
            v-for="(item, index) in applayDateData"
            :key="index"
          >
            <div class="applayDateContentItem first_one">
              <span class="name">部门：</span>
              <span class="applayDateDeptTitle">{{ item.approvalDepartment }}</span>
            </div>
            <div class="applayDateContentItem">
              <span class="name">审批人：</span>
            </div>
            <div class="applayDateContentItem">
              <span class="name">日期：</span>
              <span class="line"></span>
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
            v-if="applayDateData.length > 0"
          >
            <div slot="header" class="headBox">
              <p class="headTitle">
                {{ language('SHENQINGRIQI', '申请日期') }}:{{
                  moment(new Date()).format('YYYY-MM-DD')
                }}
              </p>
            </div>
            <div class="applayDateBox1">
              <div
                class="applayDateContent"
                v-for="(item, index) in applayDateData"
                :key="index"
              >
                <div class="applayDateContentItem first_one">
                  <span class="name">部门：</span>
                  <span class="applayDateDeptTitle">{{ item.approvalDepartment }}</span>
                </div>
                <div class="applayDateContentItem">
                  <span class="name">审批人：</span>
                </div>
                <div class="applayDateContentItem">
                  <span class="name">日期：</span>
                  <span class="line"></span>
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
          <iCard class="upload_hr" :style="{ height: pdfItemHeight + 'px' }">
            <div slot="header" class="headBox">
              <p class="headTitle">{{ title }}</p>
              <div class="tabs_box_right">
                <div class="big_text">
                  <span class="samll_val"
                    >{{ formData.mtzAppId }}-{{ formData.appName }}</span
                  >
                </div>
                <div class="small_text">
                  <!-- <span>{{language("SHENQINGRIQI","申请日期")}}：</span> -->
                  <span>Application date：</span>
                  <span class="samll_val">{{ formData.createDate }}</span>
                </div>
                <div class="small_text">
                  <!-- <span>{{language("KESHI","科室")}}：</span> -->
                  <span>Commodity：</span>
                  <span class="samll_val">{{ formData.linieDeptName }}</span>
                </div>
                <div>
                  <!-- <span>{{language("CAIGOUYUAN","采购员")}}：</span> -->
                  <span>Buyer：</span>
                  <span class="samll_val">{{ formData.linieNameEn }}</span>
                </div>
              </div>
            </div>
            <el-divider class="hr_divider" />

            <div class="infor_futitle">
              <span class="big_font">Regulation:</span>
              <br />
              <span class="big_font"
                >MTZ Payment=(Effective Price-Base Price)*Raw Material
                Weight*Settle accounts Quantity*Ratio</span
              >
              <span class="big_small"
                >When:effective price > base price *(1+threshold)</span
              >
            </div>
            <p
              class="tableTitle"
              v-if="ruleTableListData.length > 0"
            >
              {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
            </p>
            <!-- 导出规则表格 -->
            <tableList
              class="margin-top20"
              :tableData="tableData"
              :tableTitle="ruleTableTitle1_1"
              v-if="tableData.length > 0"
              :index="true"
              :selection="false"
              border
            >
              <template slot-scope="scope" slot="supplierId">
                <span>{{ scope.row.supplierId }}</span
                ><br />
                <span>{{ scope.row.supplierName }}</span>
              </template>
              <template slot-scope="scope" slot="compensationPeriod">
                <span>{{
                  scope.row.compensationPeriod == 'A'
                    ? '年度'
                    : scope.row.compensationPeriod == 'H'
                    ? '半年度'
                    : scope.row.compensationPeriod == 'Q'
                    ? '季度'
                    : scope.row.compensationPeriod == 'M'
                    ? '月度'
                    : ''
                }}</span>
              </template>
            </tableList>
          </iCard>
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
      <template v-for="(tableData, index) in partTableList">
        <div :key="index" class="page-item">
          <iCard class="upload_hr" :style="{ height: pdfItemHeight + 'px' }">
            <div slot="header" class="headBox">
              <p class="headTitle">{{ title }}</p>
              <!-- <div class="tabs_box_right"> -->
              <div class="tabs_box_right">
                <div class="big_text">
                  <span class="samll_val"
                    >{{ formData.mtzAppId }}-{{ formData.appName }}</span
                  >
                </div>
                <div class="small_text">
                  <!-- <span>{{language("SHENQINGRIQI","申请日期")}}：</span> -->
                  <span>Application date：</span>
                  <span class="samll_val">{{ formData.createDate }}</span>
                </div>
                <div class="small_text">
                  <!-- <span>{{language("KESHI","科室")}}：</span> -->
                  <span>Commodity：</span>
                  <span class="samll_val">{{ formData.linieDeptName }}</span>
                </div>
                <div>
                  <!-- <span>{{language("CAIGOUYUAN","采购员")}}：</span> -->
                  <span>Buyer：</span>
                  <span class="samll_val">{{ formData.linieNameEn }}</span>
                </div>
              </div>
            </div>
            <el-divider class="hr_divider" />

            <div class="infor_futitle">
              <span class="big_font">Regulation:</span>
              <br />
              <span class="big_font"
                >MTZ Payment=(Effective Price-Base Price)*Raw Material
                Weight*Settle accounts Quantity*Ratio</span
              >
              <span class="big_small"
                >When:effective price > base price *(1+threshold)</span
              >
            </div>
            <p
              class="tableTitle"
              v-if="partTableListData.length > 0"
            >
              {{ language('LJQD', '零件清单') }}-Part List
            </p>
            <!-- 导出零件表格 -->
            <tableList
              class="margin-top20"
              :tableData="tableData"
              :tableTitle="partTableTitle1_1"
              v-if="partTableListData.length > 0"
              :index="true"
              :selection="false"
            >
              <template slot-scope="scope" slot="supplierId">
                <span>{{ scope.row.supplierId }}</span
                ><br />
                <span>{{ scope.row.supplierName }}</span>
              </template>
              <template slot-scope="scope" slot="compensationPeriod">
                <span>{{
                  scope.row.compensationPeriod == 'A'
                    ? '年度'
                    : scope.row.compensationPeriod == 'H'
                    ? '半年度'
                    : scope.row.compensationPeriod == 'Q'
                    ? '季度'
                    : scope.row.compensationPeriod == 'M'
                    ? '月度'
                    : ''
                }}</span>
              </template>
            </tableList>
          </iCard>
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
          <div :style="{ height: remarkPageHeight + 'px', background: '#fff' }">
            <iCard>
              <div slot="header" class="headBox">
                <p class="headTitle">
                  {{ language('BEIZHU', '备注') }}-Remarks
                </p>
              </div>
              <div class="beizhu-value">
                <p class="remarkItem" v-for="(item, i) in remark" :key="i">
                  {{ item }}<br />
                </p>
              </div>
            </iCard>
            <iCard
              v-if="applayDateData.length > 0 &&
                !appPage && index == remarkList.length - 1
              "
            >
              <div slot="header" class="headBox">
                <p class="headTitle">
                  {{ language('SHENQINGRIQI', '申请日期') }}:{{
                    moment(new Date()).format('YYYY-MM-DD')
                  }}
                </p>
              </div>
              <div class="applayDateBox1">
                <div
                  class="applayDateContent"
                  v-for="(item, index) in applayDateData"
                  :key="index"
                >
                  <div class="applayDateContentItem first_one">
                    <span class="name">部门：</span>
                    <span class="applayDateDeptTitle">{{ item.approvalDepartment }}</span>
                  </div>
                  <div class="applayDateContentItem">
                    <span class="name">审批人：</span>
                  </div>
                  <div class="applayDateContentItem">
                    <span class="name">日期：</span>
                    <span class="line"></span>
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
        <div :style="{ height: remarkPageHeight + 'px', background: '#fff' }">
          <iCard
            v-if="applayDateData.length > 0"
          >
            <div slot="header" class="headBox">
              <p class="headTitle">
                {{ language('SHENQINGRIQI', '申请日期') }}:{{
                  moment(new Date()).format('YYYY-MM-DD')
                }}
              </p>
            </div>
            <div class="applayDateBox1">
              <div
                class="applayDateContent"
                v-for="(item, index) in applayDateData"
                :key="index"
              >
                <div class="applayDateContentItem first_one">
                  <span class="name">部门：</span>
                  <span class="applayDateDeptTitle">{{ item.approvalDepartment }}</span>
                </div>
                <div class="applayDateContentItem">
                  <span class="name">审批人：</span>
                </div>
                <div class="applayDateContentItem">
                  <span class="name">日期：</span>
                  <span class="line"></span>
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
import { iCard, iInput, iMessage } from 'rise'
import tableList from '@/components/commonTable/index.vue'
import { ruleTableTitle1_1, partTableTitle1_1 } from './data'
import { pageMixins } from '@/utils/pageMixins'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iInput,
    tableList
  },
  props: {
    applayDateData: {type:Array, default:()=>[]},
    formData: {type:Object, default:()=>({})},
    ruleTableListData: {type:Array, default:()=>[]},
    partTableListData: {type:Array, default:()=>[]},
  },
  inject: ['pageTitle'],
  data() {
    return {
      ruleTableTitle1_1,
      partTableTitle1_1,
      moment: window.moment,
      loading: false,
      appPage: false,
      percentage: '0',
      pageHeight: 0,
      pdfItemHeight: 0,
      remarkPageHeight: 0,
      percentageText: '下载中，请稍后',
      remarkList: [[]]
    }
  },
  watch: {
    applayDateData: {
      handler(val){
        if (val.length)
          this.$nextTick(() => {
            this.computedRemark()
          })
      },
      deep:true,
      immediate:true
    },
    getRemarkAll: {
      handler(val){
        if (val.length)
          this.$nextTick(() => {
            this.computedRemark()
          })
      },
      deep:true,
      immediate:true
    },
    ruleTableListData:{
      handler(val){
        if(val.length){
          this.$nextTick(() => {
            this.computedRuleTableHeight()
          })
        }
      },
      deep:true,
      immediate:true
    },
    partTableListData:{
      handler(val){
        if(val.length){
          this.$nextTick(() => {
            this.computedPartTableHeight()
          })
        }
      },
      deep:true,
      immediate:true
    }
  },
  computed: {
    title() {
      let res = ''
      switch (this.formData.flowType) {
        case 'MEETING':
          // 上会
          res = 'CSC 定点推荐 - MTZ  CSC Nomination Recommendation - MTZ'
          break
        case 'SIGN':
          // 流转
          res = '流转定点推荐 - MTZ Nomination Recommendation - MTZ'
          break
        case 'FILING':
          // 备案
          res = '备案定点推荐 - MTZ Nomination Recommendation - MTZ'
          break
        default:
          break
      }
      return res
    },

    getRemarkAll() {
      return this.formData.linieMeetingMemo?.split('\n') || [''] // 默认添加一个'',否者无数据时不显示
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
    // 计算备注高度
    computedRemark() {
      // 考虑边框问题 test（28）.pdf
      let remarkCardHeight = this.$refs['remark-card']?.$el.offsetHeight
      let remarkContentHeight = this.$refs['remark']?.offsetHeight
      let applayDateData = this.$refs['applayDateData']?.$el.offsetHeight || 0
      let otherHeight = remarkCardHeight - remarkContentHeight
      let pageNumHeight = this.$refs.pageNum.offsetHeight // 页码高度
      // let remarkTitleHeight = this.$refs.remarkTitle.offsetHeight
      let list = this.$refs.remark.getElementsByClassName('remarkItem')
      let pageWidth = this.$refs.qrCodeDiv?.clientWidth || 0
      let pageHeight = (pageWidth / 841.89) * 595.28
      this.remarkPageHeight = pageHeight - pageNumHeight
      let arr = []
      let remarkList = []
      let sumHeight = 0
      list.forEach((item, i) => {
        sumHeight += item.offsetHeight
        if (sumHeight < pageHeight - otherHeight - pageNumHeight) {
          arr.push(this.getRemarkAll[i])
        } else {
          remarkList.push(JSON.parse(JSON.stringify(arr)))
          arr = [this.getRemarkAll[i]]
          sumHeight = item.offsetHeight
        }
      })
      if (arr.length) {
        remarkList.push(JSON.parse(JSON.stringify(arr)))
      }
      // 如果有审批节点，则计算能否放在备注页剩余空间内
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
      this.remarkList = remarkList
    },
    // 计算规则表高度
    computedRuleTableHeight() {
      let rowList =
        this.$refs['moviesTable']?.$el.getElementsByClassName('table-row') || []
      let pageWidth = this.$refs.tabsBoxTitle?.$el.clientWidth || 0
      let cardTitle =
        this.$refs.tabsBoxTitle.$el.getElementsByClassName('cardHeader')[0]
          .clientHeight
      let ruleTableTitle = this.$refs.ruleTableTitle.offsetHeight
      this.pageHeight = (pageWidth / 841.89) * 595.28
      let ruleTableHeader =
        this.$refs['moviesTable']?.$el.getElementsByClassName(
          'ruleTableHeader'
        )[0].offsetHeight || 0
      let pageNumHeight = this.$refs.pageNum.offsetHeight // 页码高度
      let sumHeight = 0
      let arr = []
      let tableList = []
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
      if (arr.length) tableList.push(arr)
      this.ruleTableList = tableList
    },
    // 计算零件表高度
    computedPartTableHeight() {
      let rowList =
        this.$refs['partTable']?.$el.getElementsByClassName('part-table-row') ||
        []
      let partTableHeader =
        this.$refs['partTable']?.$el.getElementsByClassName(
          'partTableHeader'
        )[0].offsetHeight || 0
      let cardTitle =
        this.$refs.tabsBoxTitle.$el.getElementsByClassName('cardHeader')[0]
          .clientHeight
      let partTableTitle = this.$refs.ruleTableTitle.offsetHeight // 此处故意使用ruleTableTitle
      let pageWidth = this.$refs.qrCodeDiv?.clientWidth || 0
      this.pageHeight = (pageWidth / 841.89) * 595.28
      let sumHeight = 0
      let arr = []
      let tableList = []
      let pageNumHeight = this.$refs.pageNum.offsetHeight // 页码高度
      this.pdfItemHeight = this.pageHeight - pageNumHeight
      rowList.forEach((item, i) => {
        sumHeight += item.clientHeight
        if (
          sumHeight >
          this.pageHeight -
            cardTitle -
            partTableTitle -
            partTableHeader -
            pageNumHeight
        ) {
          tableList.push(arr)
          sumHeight = item.clientHeight
          arr = [this.partTableListData[i]]
        } else {
          arr.push(this.partTableListData[i])
        }
      })
      if (arr.length) tableList.push(arr)
      this.partTableList = tableList
    },
    // 导出pdf
    handleExportPdf(name) {
      this.loading = true
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
          this.pdf = new JsPDF('l', 'pt', 'a4', true) //l横向打印，p纵向打印 true=>开启压缩
          for (let i = 0; i < this.pageLength; i++) {
            const el = elList[i]
            await this.getPdfImage({
              dom: el,
              j: i
            })
          }
          this.pdf.save(name)
          this.loading = false
        })
      }, 200)
    },

    // 截取页面,存入pdf
    async getPdfImage({ dom, j }) {
      let scale = 2
      const el = this.$refs['pdf-containr']
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
  padding: 1.875rem 1.5625rem 0 2.4rem !important;
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
.applayDateIcon {
  width: 33px;
  height: 33px;
  margin-top: 10px;
}
.applayDateContentItem {
  width: 100%;
  display: flex;
  // justify-content: space-between;
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
  // background-color: #cdd4e2;
  height: 138px;
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
.name{
  display: inline-flex;
  width: 80px;
  justify-content: space-between;
}
.line{
  border-bottom: 1px solid black;
  display: inline-block;
  width: 140px;
}
</style>
