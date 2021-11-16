<!--
 * @Author: youyuan
 * @Date: 2021-11-04 10:02:28
 * @LastEditTime: 2021-11-10 14:12:02
 * @LastEditors: Please set LastEditors
 * @Description: 会外流转单pdf预览
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\signPreview.vue
-->
<template>
  <div id="content">
    <iCard>
      <div slot="header" class="headBox">
        <p class="headTitle">流转定点推荐 - MTZ Nomination Recommendation - MTZ</p>
        <span class="buttonBox" v-if="!editMode">
          <iButton @click="handleClickExport" :loading="exportButtonLoading">{{language('DAOCHU', '导出')}}</iButton>
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
          :selection="false">
        </tableList>

        <!-- <iPagination
        v-update
        @size-change="handleSizeChange($event, getPageAppRule)"
        @current-change="handleCurrentChange($event, getPageAppRule)"
        background
        :page-sizes="page.pageSizes"
        :page-size="rulePageParams.pageSize"
        :layout="page.layout"
        :current-page='rulePageParams.currPage'
        :total="rulePageParams.totalCount"/> -->
      <el-divider class="margin-top20"/>
      <p class="tableTitle">{{language('LJQD', '零件清单')}}</p>

        <tableList
          class="margin-top20"
          :tableData="partTableListData"
          :tableTitle="partTableTitle"
          :tableLoading="loading"
          :index="true"
          :selection="false">
        </tableList>

        <!-- <iPagination
        v-update
        @size-change="handleSizeChange($event, getPagePartMasterData)"
        @current-change="handleCurrentChange($event, getPagePartMasterData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="partPageParams.pageSize"
        :layout="page.layout"
        :current-page='partPageParams.currPage'
        :total="partPageParams.totalCount"/> -->
    </iCard>
    <iCard class="margin-top20">
      <div slot="header" class="headBox">
        <p class="headTitle">{{language('LIUZHUANBEIZHU', '流转备注')}}</p>
      </div>
      <p>{{language('LINEIELIUZHUANBEIZHU', 'LINIE流转备注')}}</p>
      <iInput v-model="formData.cs1MeetingMemo" class="margin-top10" :rows="8" type="textarea"/>
    </iCard>
    <div class="margin-top30 deptBox">
      <div class="deptItem" v-for="(item, index) in deptData" :key="index">
        <p>{{item.approvalDepartment}}：</p>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { iCard, icon, iInput, iButton, iMessage, iPagination } from 'rise'
import { formList } from './data'
import tableList from '@/components/commonTable/index.vue'
import { ruleTableTitle2, partTableTitle2} from './data'
import { getAppFormInfo, pageAppRule, pagePartMasterData, fetchSaveCs1Remark, fetchSignPreviewDept } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { pageMixins } from '@/utils/pageMixins'
import { downloadPdfMixins } from '@/utils/pdf';
import { downloadFileByUrl } from '@/utils';
export default {
  mixins: [pageMixins, downloadPdfMixins],
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
      ruleTableTitle:ruleTableTitle2,
      partTableTitle:partTableTitle2,
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
      deptData: [],
      exportButtonLoading: false
    }
  },
  created() {
    // this.$nextTick(e=>{
      this.getAppFormInfo()
      this.getPageAppRule()
      this.getPagePartMasterData()
      this.getSignPreviewDept()
    // })
  },
  computed: {
    title() {
      let res = ''
      switch (this.formData.flowType) {
        case 'MEETING':
          // 上会
          res = 'flowType CSC 定点推荐 - MTZ  CSC Nomination Recommendation - MTZ'
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
    },
    mtzObject(){
      return this.$store.state.location.mtzObject;
    }
  },
  watch: {
    mtzObject(newVlue,oldValue){

    }
  },
  methods: {
    // 获取申请单信息
    getAppFormInfo() {
      getAppFormInfo({
        mtzAppId: this.$route.query.mtzAppId
      }).then(res => {
        if(res && res.code == 200) {
          this.formData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取规则清单表格数据
    getPageAppRule() {
      pageAppRule({
        mtzAppId: this.$route.query.mtzAppId,
        // pageNo: this.rulePageParams.currPage,
        // pageSize: this.rulePageParams.pageSize,
        pageNo: 1,
        pageSize: 999999,
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
        mtzAppId:this.$route.query.mtzAppId,
        // pageNo: this.partPageParams.currPage,
        // pageSize: this.partPageParams.pageSize,
        pageNo: 1,
        pageSize: 999999,
      }).then(res => {
        if(res && res.code == 200) {
          this.partTableListData = res.data
          this.partPageParams.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    // 获取部门数据 
    getSignPreviewDept() {
      fetchSignPreviewDept({
        mtzAppId: this.$route.query.mtzAppId
      }).then(res => {
        if(res && res.code == 200) {
          this.deptData = res.data
        } else iMessage.error(res.error)
      })
    },
    // 点击保存
    handleClickSave() {
      let params = {}
      if(this.isMeeting) {
        params = {
          mtzAppId: this.$route.query.mtzAppId,
          linieMeetingMemo: this.formData.linieMeetingMemo
        }
      } else if(this.isFinite) {
        params = {
          mtzAppId: this.$route.query.mtzAppId,
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
    // 生成PDF
    createPdf() {
      return new Promise(resolve => {
        this.downloadButtonLoading = true
        const pdfParam = {
          domId: 'content',
          pdfName: '会外流转单',
        }
        this.getDownloadFileAndExportPdf(pdfParam).then(res => {
          resolve(res)
        })
      })
    },
    // 导出：导出当前为pdf
    handleClickExport() {
      this.exportButtonLoading = true
      this.createPdf().then(res => {
        this.exportButtonLoading = false
        if(res) {
          downloadFileByUrl(res.downloadUrl)
          iMessage.success(this.language('CAOZUOCHENGGONG', '操作成功'))
        } else iMessage.error(this.language('CAOZUOSHIBAI', '操作失败'))
      })
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
.deptBox {
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
</style>
