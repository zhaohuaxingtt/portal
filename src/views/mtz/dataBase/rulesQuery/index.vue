<template>
  <div class='mtz-select'>
    <i-search @sure="sure"
              @reset="reset">
      <el-form label-position="top">
        <el-form-item v-for="(x,index) in ruleQueryFormData"
                      :key="index"
                      :label="language(x.key,x.name)"
                      class="SearchOption">
          <i-input v-model="formData[x.props]"
                   :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"></i-input>
        </el-form-item>
        <el-form-item :label="language('KESHI','科室')"
                      class="SearchOption">
          <!-- <i-select
                    multiple
                    filterable
                    collapse-tags
                    v-model="formData.buyerDeptId"
                    :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')">
                    <el-option 
                    v-for="(x,index) in departmentDrop" 
                    :key="index"
                    :label="x.existShareNum"
                    :value="x.existShareId"/>
                  </i-select> -->
          <custom-select v-model="formData.buyerDeptId"
                         :user-options="departmentDrop"
                         multiple
                         filterable
                         collapse-tags
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="departNameEn"
                         value-member="departId"
                         value-key="departId" />
        </el-form-item>
        <el-form-item :label="language('SHICHANGJIALAIYUAN','市场价来源')"
                      class="SearchOption">
          <!-- <i-select
                  multiple
                  filterable
                  collapse-tags
                  v-model="formData.marketSource"
                  :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
                >
                    <el-option 
                    v-for="(x,index) in getMtzMarketSourceListDrop" 
                    :key="index"
                    :label="x.message"
                    :value="x.code"
                    ></el-option>
                  </i-select> -->
          <custom-select v-model="formData.marketSource"
                         :user-options="getMtzMarketSourceListDrop"
                         multiple
                         filterable
                         collapse-tags
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code" />
        </el-form-item>
        <el-form-item :label="language('BUCHAZHOUQI','补差周期')"
                      class="SearchOption">
          <!-- <i-select
                  multiple
                  filterable
                  collapse-tags
                  v-model="formData.compensationPeriod"
                  :placeholder="$t('staffManagement.SELECT_PLACEHOLDER')"
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
                         collapse-tags
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="name"
                         value-member="id"
                         value-key="id" />
        </el-form-item>
        <el-form-item :label="language('SHIFOUSHENGXIAO','是否生效')"
                      class="SearchOption">
          <!-- <i-select
                  v-model="formData.effectFlag"
                  :placeholder="language('QINGXUANZE', '请选择')"
                  >
                    <el-option :label="language('QUANBU', '全部')" value=""></el-option>
                    <el-option :label="language('SHENGXIAO', '生效')" value="1"></el-option>
                    <el-option :label="language('SHIXIAO', '失效')" value="0"></el-option>
                  </i-select> -->
          <custom-select v-model="formData.effectFlag"
                         :user-options="effectFlagDropDown"
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code" />
        </el-form-item>
      </el-form>
    </i-search>

    <iCard class="OrganizationTable">
      <div class="export">
        <div class="export_title">
          <div class="tt">{{language('GUIZHEXIANGQING','规则详情')}}</div>
          <el-tooltip :content="language('YYCLPHGYSJJYXSJDZCWYGZ','由原材料牌号＋供应商＋基价+有效时间段组成唯一规则')"
                      placement="right"
                      effect="light">
            <icon symbol
                  name="iconxinxitishi"
                  class="font-size16 marin-left5" />
          </el-tooltip>
        </div>
        <div>
          <iButton @click="takeEffect(1)"
                   v-permission="PORTAL_MTZ_SEARCH_MTZGUIZECHAXUN_SHENGXIAO">{{language('SHENGXIAO','生效')}}</iButton>
          <iButton @click="takeEffect(0)"
                   v-permission="PORTAL_MTZ_SEARCH_MTZGUIZECHAXUN_SHIXIAO">{{language('SHIXIAO','失效')}}</iButton>
          <iButton @click="handleExportAll"
                   v-permission="PORTAL_MTZ_SEARCH_MTZGUIZECHAXUN_DAOCHU">{{language('DAOCHU','导出')}}</iButton>
          <button-table-setting @click="$refs.testTable.openSetting()"></button-table-setting>
        </div>
      </div>
      <div>
        <iTableCustom ref="testTable"
                      class="customClass"
                      :loading="tableLoading"
                      :data="tableListData"
                      :columns="tableSetting"
                      @go-detail="handlecreatemtz"
                      @go-partNumber="handlePartNumberDetail"
                      @go-source='handleSource'
                      @handle-selection-change="handleSelectChange">
        </iTableCustom>
        <!-- 分页标签 -->
        <iPagination v-update
                     @size-change="handleSizeChange($event, sure)"
                     @current-change="handleCurrentChange($event, getList)"
                     background
                     :page-sizes="page.pageSizes"
                     :page-size="page.pageSize"
                     :layout="page.layout"
                     :current-page='page.currPage'
                     :total="page.totalCount" />
      </div>
    </iCard>
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
  iDialog,
  iDatePicker,
  iMessage,
  icon
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { tableSetting, ruleQueryFormData } from './components/data'
import Detail from './components/detail'
import { rulePage, getDeptData, getMtzMarketSourceList, exportRuleData, ruleEntityEdit, queryDeptSectionForRule } from '@/api/mtz/database/partsQuery'
import { selectDictByKeys } from '@/api/dictionary'
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  components: {
    iSearch,
    iInput,
    icon,
    iSelect,
    iPage,
    iCard,
    iButton,
    iTableCustom,
    iPagination,
    iFormItem,
    iDialog,
    iDatePicker,
    Detail,
    buttonTableSetting
  },
  mixins: [pageMixins],
  data () {
    return {
      isShow: false,//零件号
      formData: {},//表单数据
      tableListData: [],//表格数据
      tableSetting,
      ruleQueryFormData,
      departmentDrop: [],
      getMtzMarketSourceListDrop: [],
      sendersCycle: [],
      selectedData: [],
      effectFlagDropDown: []
    }
  },
  mounted () {
    this.$set(this.formData, 'effectFlag', '1')
    this.getList()
    queryDeptSectionForRule({}).then(res => { this.departmentDrop = res.data })//初始化科室
    getMtzMarketSourceList().then(res => { this.getMtzMarketSourceListDrop = res.data })
    // selectDictByKeys('keys=MTZ_MAKE_CYCLE').then(res=>{this.sendersCycle=res.data.MTZ_MAKE_CYCLE})//补差周期
    this.sendersCycle = [
      { id: 'A', name: '年度' },
      { id: 'H', name: '半年度' },
      { id: 'Q', name: '季度' },
      { id: 'M', name: '月度' },
    ]
    this.effectFlagDropDown = [
      { code: "", message: '全部' },
      { code: "1", message: '生效' },
      { code: "0", message: '失效' }
    ]
  },
  methods: {
    handlecreatemtz (row) {
      if(row.sourceCode !== "初始化"){
        let routeData = this.$router.resolve({
          path: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow',
          query: {
            currentStep: 1,
            mtzAppId: row.sourceCode
          }
        })
        window.open(routeData.href)
      }
    },
    handlePartNumberDetail () {
      this.isShow = true
    },
    handleSource () {
      this.isShowSource = true
    },
    getList () {
      rulePage({ pageNo: this.page.currPage, pageSize: this.page.pageSize, ...this.formData }).then(res => {
        this.tableListData = res.data
        this.page.currPage = res.pageNum;
        this.page.pageSize = res.pageSize;
        this.page.totalCount = res.total || 0;
      })
    },
    sure () {
      this.page.currPage = 1
      this.getList()
    },
    reset () {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.formData = {
        effectFlag: '1',
        buyerDeptId: [],
        marketSource: [],
        compensationPeriod: [],
        effectFlag: [],
      }
      this.getList()
    },
    handleExportAll () {
      exportRuleData(this.formData)
    },
    // 选择数据
    handleSelectChange (e) {
      this.selectedData = e
    },
    // 生效/失效
    takeEffect (x) {
      if (this.selectedData.length > 0) {
        let ids = this.selectedData.map(y => (y.id))
        ruleEntityEdit({ ids, effectiveFlag: x }).then(res => {
          if (res.result) {
            this.getList()
            iMessage.success(res.desZh)
            // this.$message(res.desZh)
          } else {
            // this.$message({type:'warning',message:res.desZh})
            iMessage.error(res.desZh)
          }

        })
      } else {
        // this.$message({type:'warning',message:"请至少勾选一条数据"})
        iMessage.warn(this.language('QINGZHISHAOXUANZHONGYITIAOSHUJU', '请至少选中一条数据'))
      }
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
.export {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .export_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tt {
    margin-right: 10px;
    font-size: 18px;
    font-weight: bold;
  }
}
.SearchOption {
  margin-bottom: 20px !important;
}
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
</style>