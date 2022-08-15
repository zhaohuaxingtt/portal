<template>
  <div class='mtz-select'>
    <i-search @sure="sure"
              @reset="reset">
      <iFormGroup label-position="top">
        <iFormItem :label="language('LK_LINGJIANHAO','零件号')" class="SearchOption">
          <iMultiLineInput :title="language('LK_LINGJIANHAO','零件号')" v-model="formData.partnum"></iMultiLineInput>
        </iFormItem>
        <iFormItem v-for="(x,index) in formJSON"
                   :key="index"
                   :label="x.name"
                   class="SearchOption">
          <iInput v-model="formData[x.props]"
                  :placeholder="language('QINGSHURU', '请输入')"></iInput>
        </iFormItem>
        <iFormItem label="科室"
                   class="SearchOption">
          <!-- <i-select
                  v-model="formData.buyerDeptId	"
                  multiple
                  filterable
                  collapse-tags
                  :placeholder="language('QINGXUANZE', '请选择')">
                    <el-option 
                    v-for="(x,index) in departmentDrop" 
                    :key="index"
                    :label="x.existShareNum"
                    :value="x.existShareId">
                    </el-option>
                  </i-select> -->
          <custom-select v-model="formData.buyerDeptId"
                         :user-options="departmentDrop"
                         multiple
                         style="width:100%"
                         filterable
                         collapse-tags
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="departNameEn"
                         value-member="departId"
                         value-key="departId" />
        </iFormItem>
        <iFormItem label="市场价来源"
                   class="SearchOption">
          <!-- <i-select
                  v-model="formData.marketSource"
                  multiple
                  filterable
                  collapse-tags
                  :placeholder="language('QINGXUANZE', '请选择')">
                    <el-option 
                    v-for="(x,index) in getMtzMarketSourceListDrop" 
                    :key="index"
                    :label="x.message"
                    :value="x.code">
                    </el-option>
                  </i-select> -->
          <custom-select v-model="formData.marketSource"
                         :user-options="getMtzMarketSourceListDrop"
                         multiple
                         style="width:100%"
                         filterable
                         collapse-tags
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code" />
        </iFormItem>
        <iFormItem label="有效期起"
                   class="SearchOption">
          <iDatePicker v-model="formData.startDate"
                       valueFormat="yyyy-MM-dd"
                       type="date"
                       :placeholder="language('QINGXUANZE', '请选择')" />
        </iFormItem>
        <iFormItem label="有效期止"
                   class="SearchOption">
          <iDatePicker v-model="formData.endDate"
                       valueFormat="yyyy-MM-dd"
                       type="date"
                       :placeholder="language('QINGXUANZE', '请选择')" />
        </iFormItem>
        <iFormItem label="补差周期"
                   class="SearchOption">
          <!-- <i-select
                  multiple
                  collapse-tags
                  filterable
                  v-model="formData.compensationPeriod"
                  :placeholder="language('QINGXUANZE', '请选择')"
                >
                    <el-option 
                    v-for="(x,index) in sendersCycle" 
                    :key="index"
                    :label="x.name"
                    :value="x.id"
                    ></el-option>
                  </i-select> -->
          <custom-select v-model="formData.compensationPeriod"
                         :user-options="sendersCycle"
                         filterable
                         multiple
                         style="width:100%"
                         collapse-tags
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="name"
                         value-member="value"
                         value-key="value" />
        </iFormItem>
        <iFormItem :label="language('SHIFOUSHENGXIAO','是否生效')"
                   class="SearchOption">
          <!-- <i-select v-model="formData.effectFlag"
                    :placeholder="language('QINGXUANZE', '请选择')">
            <el-option :label="language('QUANBU', '全部')"
                       value=""></el-option>
            <el-option :label="language('SHENGXIAO', '生效')"
                       value="1"></el-option>
            <el-option :label="language('SHIXIAO', '失效')"
                       value="0"></el-option>
          </i-select> -->
          <custom-select v-model="formData.effectFlag"
                         style="width:100%"
                         :user-options="effectFlagDropDown"
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code" />
        </iFormItem>
      </iFormGroup>
    </i-search>

    <iCard class="OrganizationTable">
      <div class="export">
        <div>
          <el-switch v-model="onlySeeMySelf"
                     @change="changeSwitch"
                     :inactive-text="language('ZHIKANZIJI','只看自己')" />
        </div>
        <div>
          <iButton @click="handleExportCurrent"
                   v-permission="PORTAL_MTZ_SEARCH_MTZLINGJIANCHAXUN_XZMB">下载模板</iButton>
          <iButton @click="handleSeePartsRelationship"
                   v-permission="PORTAL_MTZ_SEARCH_MTZLINGJIANCHAXUN_CKYECJLJGX">查看一/二次件零件关系</iButton>
          <uploadButton ref="uploadButton"
                        v-permission="PORTAL_MTZ_SEARCH_MTZLINGJIANCHAXUN_SCYECJLJGX"
                        :buttonText="language('SHANGCHUANYIERCIJIANGUANXI', '上传一/二次件零件关系')"
                        :uploadByBusiness="true"
                        @uploadedCallback="handleUpload($event)"
                        class="margin-left10 margin-right10" />
          <iButton @click="takeEffect(1)"
                   v-permission="PORTAL_MTZ_SEARCH_MTZLINGJIANCHAXUN_SHENGXIAO">{{language('SHENGXIAO', '生效')}}</iButton>
          <iButton @click="takeEffect(0)"
                   v-permission="PORTAL_MTZ_SEARCH_MTZLINGJIANCHAXUN_SHIXIAO">{{language('SHIXIAO', '失效')}}</iButton>
          <iButton @click="handleExportAll"
                   v-permission="PORTAL_MTZ_SEARCH_MTZLINGJIANCHAXUN_DAOCHUDANGYE">{{language('DAOCHUDANGYE', '导出当页')}}</iButton>
          <button-table-setting @click="$refs.testTable.openSetting()"></button-table-setting>
        </div>
      </div>
      <div>
        <iTableCustom ref="testTable"
                      class="customClass"
                      :loading="tableLoading"
                      :data="tableListData"
                      :columns="tableSetting"
                      @go-partNumber="handlePartNumberDetail"
                      @go-source='handleSource'
                      @handle-selection-change="handleSelectChange">
        </iTableCustom>
        <!-- 分页标签 -->
        <iPagination v-update
                     @size-change="handleSizeChange($event, sure)"
                     @current-change="handleCurrentChange($event, mtzBasePricePage)"
                     background
                     :page-sizes="[50,100,200,500,1000]"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :current-page='page.currPage'
                     :total="page.totalCount" />
      </div>
    </iCard>
    <!-- 一/二次件零件号 -->
    <iDialog :visible.sync="isShow"
             v-if="isShow"
             title="一/二次件零件号"
             width="80%">
      <Detail :clickData="clickData" />
    </iDialog>
    <!-- 一二次件关系有效性确认 -->
    <iDialog :visible.sync="isShowRelationalValidity"
             v-if="isShowRelationalValidity"
             title="一二次件关系有效性确认"
             width="80%">
      <div class="relationalValidityTitleBox"
           slot="title">
        <p>{{language('YECJGXYXXQR', '一二次件关系有效性确认')}}</p>
        <el-tooltip content="以下表格内零件已有一/二次件对应关系，请确认当前生效记录"
                    placement="top"
                    effect="light">
          <i class="el-icon-warning-outline titleIcon"></i>
        </el-tooltip>
      </div>
      <RelationalValidity />
    </iDialog>
    <!-- 来源 -->
    <!-- <iDialog :visible.sync="isShowSource"
             v-if="isShowSource"
             title="312321"
             width="80%">
      <Source />
    </iDialog> -->

  </div>
</template>

<script>
import {
  iSearch,
  iInput,
  iSelect,
  iPage,
  iCard,
  iButton,
  iPagination,
  iFormItem,
  iFormGroup,
  iDialog,
  iDatePicker,
  iMessage,
  iMultiLineInput
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { tableSetting, exportTitle, formJSON } from './components/data'
import Detail from './components/detail'
import buttonTableSetting from '@/components/buttonTableSetting'
// import Source from './components/source'
import RelationalValidity from './components/relationalValidity'
import {
  // getDeptData,
  mtzBasePricePage,
  feignDownload,
  exportBaseData,
  getMtzMarketSourceList,
  mtzBasePriceEdit,
  // historyPage,
  uploadPartExcel,
  queryDeptSection,
  queryDeptSectionForPart
} from '@/api/mtz/database/partsQuery'
// import {selectDictByKeys} from '@/api/dictionary'
import { downloadUdFile } from '@/api/file';
import uploadButton from '@/components/uploadButton';
export default {
  components: {
    iSearch,
    iInput,
    // iSelect,
    // iPage,
    iCard,
    iButton,
    iTableCustom,
    iPagination,
    iFormItem,
    iDialog,
    iDatePicker,
    Detail,
    // Source,
    RelationalValidity,
    uploadButton,
    buttonTableSetting,
    iFormGroup,
    iMultiLineInput
  },
  mixins: [pageMixins],
  data () {
    return {
      isShow: false,//零件号
      isShowSource: false,//来源
      isShowRelationalValidity: false,
      formData: {},//表单数据
      tableListData: [],//表格数据
      tableSetting,
      exportTitle,
      formJSON,
      departmentDrop: [],
      sendersCycle: [],
      getMtzMarketSourceListDrop: [],
      selectedData: [],
      PartNumberDetailArray: [],
      clickData: {},
      onlySeeMySelf: true,
      effectFlagDropDown: []
    }
  },
  mounted () {
    this.initSearchData()
    queryDeptSectionForPart({}).then(res => { this.departmentDrop = res.data })//初始化科室
    // selectDictByKeys('keys=MTZ_MAKE_CYCLE').then(res=>{this.sendersCycle=res.data.MTZ_MAKE_CYCLE})//补差周期
    this.sendersCycle = [
      { value: 'A', name: '年度' },
      { value: 'H', name: '半年度' },
      { value: 'Q', name: '季度' },
      { value: 'M', name: '月度' },
    ]

    getMtzMarketSourceList().then(res => { this.getMtzMarketSourceListDrop = res.data })
    this.$nextTick(_ => {
      this.page.pageSize = 50
      this.mtzBasePricePage()
    })
  },
  methods: {
    // 初始化检索条件
    initSearchData () {
      for (let key in this.formData) {
        this.formData[key] = []
      }
      const date = new Date();
      const mon = date.getMonth() + 1;
      const day = date.getDate();
      const currDate = date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
      this.$nextTick(_ => {
        this.$set(this.formData, 'partnum', this.$route.query.partnum || null)
      })
      this.effectFlagDropDown = [
        { code: "", message: '全部' },
        { code: "1", message: '生效' },
        { code: "0", message: '失效' }
      ]
      this.$set(this.formData, 'endDate', currDate)
      this.$set(this.formData, 'effectFlag', '1')
    },
    handlePartNumberDetail (e) {
      console.log(e)
      // 一二次零件号
      this.isShow = true
      this.clickData = e
      // historyPage({assemblyPartnum:e.assemblyPartnum,
      // assemblySupplierSap:e.assemblySupplierSap,
      // materialCode:e.materialCode,
      // ruleNo:e.ruleNo}).then(res=>{
      //   if(res.result){
      //     this.PartNumberDetailArray=res.data
      //   }else{
      //     this.$message({type:'error',message:res.desZh})
      //   }

      // })
    },
    handleUpload (content) {
      console.log(content)
      let formdata = new FormData()
      formdata.append('file', content.file)
      uploadPartExcel(formdata).then(res => {
        this.files = null
        if (res && res.code == 200) {
          if (res.data) {
            this.isShowRelationalValidity = true
          } else {
            iMessage.success(res.desZh)
          }
        } else {
          iMessage.warn(res.desZh)
        }
      })
    },
    handleSeePartsRelationship () {
      this.$router.push('/partsRelationship')
    },
    handleSource (val) {
      if (val.sourceCode == "初始化") {
        return false;
      }

      let path = ""
      let query = {}
      if (val.source === '0') {
        path = "/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/applyInfor"
        query = {
          mtzAppId: val.sourceCode
        }
      } else if (val.source === '1') {
        path = "/mtz/annualGeneralBudget/MTZapplicationForm"
        query = {
          mtzAppId: val.sourceCode
        }
      } else if (val.source === '2') {
        path = "aeko/mtz/details?aekoNum=" + val.sourceCode + '&objectAekoPartId=' + val.objectAekoPartId + '&status=VIEW'
        window.open(process.env.VUE_APP_SOURCING_URL + path)
        return
      }
      let routerPath = this.$router.resolve({
        path,
        query
      })
      window.open(routerPath.href)
      this.isShowSource = true
    },
    // 获取初始化列表
    mtzBasePricePage () {
      mtzBasePricePage({ pageNo: this.page.currPage, pageSize: this.page.pageSize, ...this.formData, onlySeeMySelf: this.onlySeeMySelf }).then(res => {
        if (res.result) {
          this.tableListData = res.data
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total || 0;
        } else iMessage.error(res.desZh)
      })
    },
    sure () {
      this.page.currPage = 1
      this.mtzBasePricePage()
    },
    reset () {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.formData = {
        buyerDeptId: "",
        compensationPeriod: "",
        marketSource: ""
      }
      this.initSearchData()
      this.mtzBasePricePage()
    },
    handleExportCurrent () {
      feignDownload('1491338755962384386').then(res => {
        if (res.data) {
          downloadUdFile(res.data)
        }
      })
    },
    handleExportAll () {
      exportBaseData({ pageNo: this.page.currPage, pageSize: this.page.pageSize, ...this.formData, onlySeeMySelf: this.onlySeeMySelf })
    },
    // 选择数据
    handleSelectChange (e) {
      this.selectedData = e
    },
    // 生效
    takeEffect (x) {
      if (this.selectedData.length > 0) {
        let ids = this.selectedData.map(y => (y.id))
        mtzBasePriceEdit({ ids, effectiveFlag: x }).then(res => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.mtzBasePricePage()
          } else iMessage.error(res.desZh)
        })
      } else {
        // this.$message("请至少勾选一条数据")
        iMessage.warn(res.desZh)
      }
    },
    changeSwitch () {
      this.sure()
    }
  }
}
</script>

<style lang="scss" scoped>
.routerpage {
  overflow: hidden;
}
.OrganizationTable {
  margin-top: 20px;
}
::v-deep.export {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .el-switch__label {
    font-weight: bold;
    color: #000;
  }
}
// .SearchOption {
//   margin-bottom: 20px !important;
// }
.open-link-text {
  text-decoration: underline;
}
.mtz-select {
  margin-top: 25px;
}
::v-deep.customClass {
  .open-link-text {
    text-decoration: underline;
  }
}
.relationalValidityTitleBox {
  display: flex;
  p {
    font-weight: bold;
    font-size: 18px;
  }
  .titleIcon {
    color: #a0bffc;
    font-size: 18px;
    margin-top: 2px;
    margin-left: 10px;
  }
}
::v-deep .el-form-item {
  flex-direction: column;
}
</style>