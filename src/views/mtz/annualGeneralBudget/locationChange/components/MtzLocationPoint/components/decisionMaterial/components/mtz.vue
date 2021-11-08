<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2021-11-08 14:20:25
 * @LastEditors: Please set LastEditors
 * @Description: mtz
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\mtz.vue
-->
<template>
  <div>
    <iCard>
      <div slot="header" class="headBox">
        <p class="headTitle">{{title}}</p>
        <span class="buttonBox" v-if="!editMode">
          <iButton @click="handleToSignPreview">{{language('DAOCHUHUIWAILIUZHUANDAN', '导出会外流转单')}}</iButton>
        </span>
      </div>
      <el-form ref="form" :model="formData" label-width="140px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8" v-for="item in formList" :key="item.prop">
            <el-form-item :label="language(item.key ,item.label)" style="width: 70%;">
              <el-input v-model="formData[item.prop]" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider/>
      <p class="tableTitle">{{language('GUIZEQINGDAN', '规则清单')}}</p>
        <tableList
          class="margin-top20"
          :tableData="ruleTableListData"
          :tableTitle="ruleTableTitle"
          :tableLoading="loading"
          :index="true"
          :selection="false"
          @handleSelectionChange="handleSelectionChange">
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
          :tableTitle="partTableTitle"
          :tableLoading="loading"
          :index="true"
          :selection="false"
          @handleSelectionChange="handleSelectionChange">
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
      <div slot="header" class="headBox">
        <p v-if="isMeeting" class="headTitle">{{language('SHANGHUIBEIZHU', '上会备注')}}</p>
        <p v-if="isSign" class="headTitle">{{language('LIUZHUANBEIZHU', '流转备注')}}</p>
        <span class="buttonBox">
          <iButton  @click="handleClickSave">{{language('BAOCUN', '保存')}}</iButton>
        </span>
      </div>
      <p v-if="isMeeting">{{language('LINEIESHANGHUIBEIZHU', 'LINIE上会备注')}}</p>
      <p v-if="isSign">{{language('LINEIELIUZHUANBEIZHU', 'LINIE流转备注')}}</p>
      <iInput v-if="isMeeting" v-model="formData.linieMeetingMemo" class="margin-top10" :rows="8" type="textarea"/>
      <iInput v-if="isSign" v-model="formData.cs1MeetingMemo" class="margin-top10" :rows="8" type="textarea"/>
    </iCard>
    <iCard v-if="isMeeting" class="margin-top20">
      <p>{{language('SHENQINGRIQI', '申请日期')}}: 2020-01-01</p>
      <div class="applayDateBox">
        <div class="applayDateContent" v-for="(item, index) in applayDateData" :key="index">
          <icon  v-if="item.flag" class="margin-left5 applayDateIcon" symbol name="iconrs-wancheng"></icon>
          <icon  v-if="!item.flag" class="margin-left5 applayDateIcon" symbol name="iconrs-quxiao"></icon>
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
import { ruleTableTitle, partTableTitle} from './data'
import { getAppFormInfo, pageAppRule, pagePartMasterData, fetchSaveCs1Remark } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { queryWorkflowDetail } from '@/api/approval/myApplication'
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
  data () {
    return {
      formData: {},
      formList,
      ruleTableTitle,
      partTableTitle,
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
    }
  },
  created() {
    this.initApplayDateData()
    this.getAppFormInfo()
    this.getPageAppRule()
    this.getPagePartMasterData()
  },
  computed: {
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
          
          break;
      
        default:
          break;
      }
      return res 
    },
    isMeeting() {
      return this.formData.flowType == 'MEETING'
    },
    isSign() {
      return this.formData.flowType == 'SIGN'
    }
  },
  methods: {
    initApplayDateData() {
      this.applayDateData = [
        {flag: true, dept: 'TL', date: '2020-01-01'},
        {flag: true, dept: 'TL', date: '2020-01-01'},
        {flag: true, dept: 'TL', date: '2020-01-01'},
        {flag: true, dept: 'TL', date: '2020-01-01'},
        {flag: true, dept: 'TL', date: '2020-01-01'},
        {flag: true, dept: 'TL', date: '2020-01-01'},
        {flag: true, dept: 'TL', date: '2020-01-01'},
        {flag: true, dept: 'TL', date: '2020-01-01'},
        {flag: true, dept: 'TL', date: '2020-01-01'},
      ]
    },
    // 获取申请单信息
    getAppFormInfo() {
      getAppFormInfo({
        mtzAppId: this.$route.query.id
        // mtzAppId: '1456173042339610626'
      }).then(res => {
        if(res && res.code == 200) {
          this.formData = res.data
          this.getWorkflowDetail(res.data.riseId)
        } else iMessage.error(res.desZh)
      })
    },
    // 获取规则清单表格数据
    getPageAppRule() {
      pageAppRule({
        mtzAppId: this.$route.query.id,
        pageNo: this.rulePageParams.currPage,
        pageSize: this.rulePageParams.pageSize,
      }).then(res => {
        if(res && res.code == 200) {
          this.ruleTableListData = res.data
          this.rulePageParams.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    // 获取零件清单表格数据
    getPagePartMasterData() {
      pagePartMasterData({
        mtzAppId: this.$route.query.id,
        pageNo: this.partPageParams.currPage,
        pageSize: this.partPageParams.pageSize,
      }).then(res => {
        if(res && res.code == 200) {
          this.partTableListData = res.data
          this.partPageParams.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    // 获取审批流部门数据 
    getWorkflowDetail(riseId) {
      queryWorkflowDetail({
        processInstanceId: riseId,
        currentUserId: this.$store.state.permission.userInfo.id
      }).then(res => {
        console.log('res', res);
      })
    },
    // 点击保存
    handleClickSave() {
      let params = {}
      if(this.isMeeting) {
        params = {
          mtzAppId: this.$route.query.id,
          linieMeetingMemo: this.formData.linieMeetingMemo
        }
      } else if(this.isFinite) {
        params = {
          mtzAppId: this.$route.query.id,
          cs1MeetingMemo: this.formData.cs1MeetingMemo
        }
      }
      fetchSaveCs1Remark(params).then(res => {
        if(res && res.code == 200) {
          this.getAppFormInfo()
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    // 导出会外流转单
    handleToSignPreview() {
      const {href} = this.$router.resolve({
        path: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/signPreview',
        query: {
          id: this.$route.query.id,
        }
      })
      window.open(href, '_blank')
    }
  }
}
</script>

<style lang='scss' scoped>
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
.applayDateBox {
  overflow-x: scroll;
  margin: 20px 0;
  padding-bottom: 20px;
  white-space: nowrap;
  .applayDateContent {
    display: inline-block;
    background-color: #CDD4E2;
    height: 178px;
    width: 224px;
    margin: 0 10px;
    border-radius: 15px;
    text-align: center;
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
  }
}
</style>
