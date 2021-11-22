<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2021-11-22 11:49:16
 * @LastEditors: Please set LastEditors
 * @Description: mtz
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\mtz.vue
-->
<template>
  <div ref="qrCodeDiv"
       style="padding-bottom:30px;">
    <iCard>
      <div slot="header"
           class="headBox">
        <p class="headTitle">{{title}}</p>
        <span class="buttonBox"
              v-if="!editMode">
          <iButton v-if="!RsObject && downType"
                   @click="downPdf">{{language('DAOCHUPDF','导出PDF')}}</iButton>
          <iButton v-if="RsObject && formData.flowTypeName == '流转'"
                   @click="handleToSignPreview">{{language('DAOCHUHUIWAILIUZHUANDAN', '导出会外流转单')}}</iButton>
        </span>
      </div>

      <div class="tabsBoxInfor">
        <div class="inforDiv"
             v-for="(item,index) in formList"
             :key="index">
          <span>{{language(item.key,item.label)}}</span>
          <iInput :disabled="true"
                  class="inforText"
                  v-model="formData[item.prop]"></iInput>
        </div>
      </div>
      <el-divider />
      <p class="tableTitle">{{language('GUIZEQINGDAN', '规则清单')}}</p>
      <tableList class="margin-top20"
                 :tableData="ruleTableListData"
                 :tableTitle="RsObject?ruleTableTitle1:ruleTableTitle2"
                 :tableLoading="loading"
                 :index="true"
                 :selection="false"
                 @handleSelectionChange="handleSelectionChange">
      </tableList>
      <iPagination v-if="RsObject"
                   v-update
                   @size-change="handleSizeChange($event, getPageAppRule)"
                   @current-change="handleCurrentChange($event, getPageAppRule)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="rulePageParams.pageSize"
                   :layout="page.layout"
                   :current-page='rulePageParams.currPage'
                   :total="rulePageParams.totalCount" />
      <el-divider class="margin-top20" />
      <p class="tableTitle">{{language('LJQD', '零件清单')}}</p>
      <tableList class="margin-top20"
                 :tableData="partTableListData"
                 :tableTitle="RsObject?partTableTitle1:partTableTitle2"
                 :tableLoading="loading"
                 :index="true"
                 :selection="false"
                 @handleSelectionChange="handleSelectionChange">
      </tableList>
      <iPagination v-if="RsObject"
                   v-update
                   @size-change="handleSizeChange($event, getPagePartMasterData)"
                   @current-change="handleCurrentChange($event, getPagePartMasterData)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="partPageParams.pageSize"
                   :layout="page.layout"
                   :current-page='partPageParams.currPage'
                   :total="partPageParams.totalCount" />
    </iCard>
    <iCard class="margin-top20">
      <div slot="header"
           class="headBox">
        <p v-if="isMeeting"
           class="headTitle">{{language('BEIZHU', '备注')}}</p>
        <p v-if="isSign"
           class="headTitle">{{language('BEIZHU', '备注')}}</p>
        <!-- <p v-if="isSign" class="headTitle">{{language('LIUZHUANBEIZHU', '流转备注')}}</p> -->
        <span class="buttonBox">
          <iButton v-if="RsObject"
                   @click="handleClickSave">{{language('BAOCUN', '保存')}}</iButton>
        </span>
      </div>
      <!-- <p v-if="isMeeting">{{language('LINEIESHANGHUIBEIZHU', 'LINIE上会备注')}}</p> -->
      <!-- <p v-if="isSign">{{language('LINEIELIUZHUANBEIZHU', 'LINIE流转备注')}}</p> -->
      <iInput v-if="isMeeting"
              v-model="formData.linieMeetingMemo"
              class="margin-top10"
              :rows="8"
              type="textarea" />
      <iInput v-if="isSign"
              v-model="formData.linieMeetingMemo"
              class="margin-top10"
              :rows="8"
              type="textarea" />
      <!-- <iInput v-if="isSign" v-model="formData.cs1MeetingMemo" class="margin-top10" :rows="8" type="textarea"/> -->
    </iCard>
    <iCard v-if="isMeeting"
           class="margin-top20">
      <p>{{language('SHENQINGRIQI', '申请日期')}}: 2020-01-01</p>
      <div :class="RsObject?'applayDateBox':'applayDateBox1'">
        <div class="applayDateContent"
             v-for="(item, index) in applayDateData"
             :key="index">
          <icon v-if="item.flag"
                class="margin-left5 applayDateIcon"
                symbol
                name="iconrs-wancheng"></icon>
          <icon v-if="!item.flag"
                class="margin-left5 applayDateIcon"
                symbol
                name="iconrs-quxiao"></icon>
          <div class="applayDateContentItem">
            <span>部门：</span>
            <span class="applayDateDeptTitle">{{item.dept}}</span>
          </div>
          <div class="applayDateContentItem">
            <span>日期：</span>
            <span>{{item.date}}</span>
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
import { ruleTableTitle1, ruleTableTitle2, partTableTitle1, partTableTitle2 } from './data'
import { getAppFormInfo, pageAppRule, pagePartMasterData, fetchSaveCs1Remark } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { pageMixins } from '@/utils/pageMixins'
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
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
    RsType: { type: Boolean }
  },
  data () {
    return {
      formData: {},
      formList,
      ruleTableTitle1: ruleTableTitle1,
      ruleTableTitle2: ruleTableTitle2,
      partTableTitle1: partTableTitle1,
      partTableTitle2: partTableTitle2,
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
      RsObject: true,
      downType: true,
    }
  },
  watch: {
    mtzObject (newVlue, oldValue) {

    }
  },
  created () {
    if (this.RsType) {
      this.RsObject = false;
    }
    this.initApplayDateData()
    this.getAppFormInfo()
    this.getPageAppRule()
    this.getPagePartMasterData()
  },
  computed: {
    mtzObject () {
      return this.$store.state.location.mtzObject;
    },
    title () {
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

          break;

        default:
          break;
      }
      return res
    },
    isMeeting () {
      return this.formData.flowType == 'MEETING'
    },
    isSign () {
      return this.formData.flowType == 'SIGN'
    }
  },
  methods: {
    downPdf () {
      this.downType = false;
      console.log(this.title)
      var name = "";
      if (this.title == "") {
        name = "RS导出"
      } else {
        name = this.title;
      }
      console.log(this.title)
      html2canvas(this.$refs.qrCodeDiv, {
        useCORS: true,
        allowTaint: true
      }).then(canvas => {
        // const link = document.createElement('a')
        // link.href = canvas.toDataURL()
        // link.setAttribute('download', this.title + '.pdf')
        // link.style.display = 'none'
        // document.body.appendChild(link)
        // link.click()
        // 内容的宽度
        const contentWidth = canvas.width
        // 内容高度
        const contentHeight = canvas.height
        const pageHeight = contentWidth / 592.28 * 841.89
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight
        let position = 0
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        const imgWidth = 595.28
        const imgHeight = 592.28 / contentWidth * contentHeight
        // canvas转图片数据
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        // 新建JsPDF对象
        const PDF = new JsPDF('', 'pt', 'a4')
        // 判断是否分页
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        // 保存文件
        PDF.save(name + '.pdf')
      }).then(res => {
        setTimeout(() => {
          this.downType = true;
        }, 300);
      })
    },
    initApplayDateData () {
      this.applayDateData = [
        { flag: true, dept: 'TL', date: '2020-01-01' },
        { flag: true, dept: 'TL', date: '2020-01-01' },
        { flag: true, dept: 'TL', date: '2020-01-01' },
        { flag: true, dept: 'TL', date: '2020-01-01' },
        { flag: true, dept: 'TL', date: '2020-01-01' },
        { flag: true, dept: 'TL', date: '2020-01-01' },
        { flag: true, dept: 'TL', date: '2020-01-01' },
        { flag: true, dept: 'TL', date: '2020-01-01' },
        { flag: true, dept: 'TL', date: '2020-01-01' },
      ]
    },
    // 获取申请单信息
    getAppFormInfo () {
      getAppFormInfo({
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId
      }).then(res => {
        if (res && res.code == 200) {
          this.formData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取规则清单表格数据
    getPageAppRule () {
      var list = {};
      if (this.RsObject) {
        list = {
          mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
          pageNo: this.rulePageParams.currPage,
          pageSize: this.rulePageParams.pageSize,
        }
      } else {
        list = {
          mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
          pageNo: 1,
          pageSize: 99999,
        }
      }
      pageAppRule(list).then(res => {
        if (res && res.code == 200) {
          this.ruleTableListData = res.data
          this.rulePageParams.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    // 获取零件清单表格数据
    getPagePartMasterData () {
      var list = {};
      if (this.RsObject) {
        list = {
          mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
          pageNo: this.partPageParams.currPage,
          pageSize: this.partPageParams.pageSize,
        }
      } else {
        list = {
          mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
          pageNo: 1,
          pageSize: 99999,
        }
      }
      pagePartMasterData(list).then(res => {
        if (res && res.code == 200) {
          this.partTableListData = res.data
          this.partPageParams.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    // 点击保存
    handleClickSave () {
      let params = {}
      if (this.isMeeting) {
        params = {
          mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
          linieMeetingMemo: this.formData.linieMeetingMemo
        }
      } else if (this.isFinite) {
        params = {
          mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
          cs1MeetingMemo: this.formData.cs1MeetingMemo
        }
      }
      fetchSaveCs1Remark(params).then(res => {
        if (res && res.code == 200) {
          this.getAppFormInfo()
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    // 导出会外流转单
    handleToSignPreview () {
      const { href } = this.$router.resolve({
        path: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/signPreview',
        query: {
          mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        }
      })
      window.open(href, '_blank')
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
.applayDateBox {
  overflow-x: scroll;
  margin: 20px 0;
  padding-bottom: 20px;
  white-space: nowrap;
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
    height: $tabsInforHeight;
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
      width: 68%;
      background: #f8f8fa;
      text-align: center;
      height: $tabsInforHeight;
      line-height: $tabsInforHeight;
    }
  }
}
</style>
