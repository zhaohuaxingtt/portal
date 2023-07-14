<!--
 * @Author: your name
 * @Date: 2021-10-27 19:18:05
 * @LastEditTime: 2021-12-16 11:25:54
 * @LastEditors: caopeng
 * @Description: In User Settings Edit
 * @FilePath: \front-portal-new\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\preview.vue
-->
<template>
  <div>
    <iCard class="margin-bottom20">
      <el-form
        :inline="true"
        :model="formInline"
        label-position="left"
        class="baseInfoForm"
      >
        <iFormItem label="申请单名" class="formItem" prop="appName">
          <iText>{{ formInline.appName }}</iText>
        </iFormItem>
        <iFormItem label="申请单Id" class="formItem">
          <iText>{{ formInline.appNo }}</iText>
        </iFormItem>
        <iFormItem label="申请单类型" class="formItem" label-width="100px">
          <iText>{{ getAppType(formInline.appType) }}</iText>
        </iFormItem>
        <iFormItem label="申请状态" class="formItem">
          <iText>{{ getStatus(formInline.status) }}</iText>
        </iFormItem>
        <iFormItem label="补差类型" class="formItem">
          <iText>{{ getMakeType(formInline.makeType) }}</iText>
        </iFormItem>
      </el-form>
    </iCard>
    <iTabsList
      v-model="tabsValue"
      @tab-click="tableChange"
      type="card"
      calss="iTabsList"
    >
      <el-tab-pane :name="1" :label="language('规则变更', '规则变更')">
        <iCard>
          <div class="table-wrapper">
            <el-table
              :data="tableList"
              ref="moviesTable"
              :tableLoading="tableLoading"
              border
              max-height="400px"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                :selectable="selectionType"
                fixed
                width="50"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="#"
                fixed
                type="index"
                width="50"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="ruleNo"
                align="center"
                show-overflow-tooltip
                minWidth="120"
                :label="language('GUIZEBIANHAO', '规则编号')"
                sortable
                fixed
              ></el-table-column>
              <el-table-column
                prop="formalFlag"
                align="center"
                show-overflow-tooltip
                width="140"
                :label="language('补差方式', '补差方式')"
                sortable
                fixed
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.method == '2' ? '变价单补差' : '一次性补差'
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="sapCode"
                align="center"
                :label="language('GONGYINGSHANG', '供应商')"
                show-overflow-tooltip
                minWidth="160"
                sortable
                fixed
              >
              </el-table-column>
              <el-table-column
                prop="materialName"
                align="center"
                width="120"
                :label="language('原材料描述', '原材料描述')"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="partNum"
                align="center"
                width="120"
                :label="language('LINGJIANHAO', '零件号')"
                show-overflow-tooltip
                sortable
              >
              </el-table-column>
              <el-table-column
                prop="partName"
                align="center"
                width="120"
                :label="language('LINGJIANMINGCHENG', '零件名称')"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="partUnit"
                align="center"
                width="110"
                :label="language('JILIANGDANWEI', '计量单位')"
                show-overflow-tooltip
                sortable
              >
              </el-table-column>
              <el-table-column
                prop="amount"
                align="center"
                width="140"
                :label="language('补差金额', '补差金额')"
                show-overflow-tooltip
                sortable
              >
              </el-table-column>
              <el-table-column
                prop="currency"
                align="center"
                width="100"
                :label="language('HUOBI', '货币')"
                sortable
              >
              </el-table-column>
              <el-table-column
                prop="exchangeRate"
                align="center"
                width="100"
                :label="language('HUILV', '汇率')"
                sortable
              >
              </el-table-column>
              <el-table-column
                prop="startDate"
                align="center"
                width="155"
                :label="language('YOUXIAOQIQI', '有效期起')"
                sortable
              >
                <template slot-scope="scope">
                  <span>{{ getDay(scope.row.startDate) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="endDate"
                align="center"
                width="155"
                :label="language('YOUXIAOQIZHI', '有效期止')"
                sortable
              >
                <template slot-scope="scope">
                  <span>{{ getDay(scope.row.endDate) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </iCard>
      </el-tab-pane>
      <el-tab-pane :name="2" :label="language('SHENPIJILU', '审批记录')">
        <iCard>
          <template slot="header">
            <span>
              {{ language('SHENPIXIANGQING', '审批详情') }}
            </span>
          </template>
          <div class="table-wrapper">
            <iTableCustom
              :ref="'SPTable'"
              :loading="tableLoading"
              :data="approvalRecordList"
              :columns="TABLE_COLUMNS1"
              singleChoice
              max-height="400px"
              highlight-current-row
            >
            </iTableCustom>
          </div>
        </iCard>
      </el-tab-pane>
    </iTabsList>
  </div>
</template>

<script>
import {
  iPage,
  iCard,
  iTabsList,
  iPagination,
  iMessage,
  iFormItem,
  iText
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { TABLE_COLUMNS1 } from './components/data'
import { getLocationApplyStatus } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import {
  getDetailById,
  approvalRecordList
} from '@/api/mtz/annualGeneralBudget/chipChange'
export default {
  data() {
    return {
      changeId: '',
      tabsValue: 1,
      TABLE_COLUMNS1,
      tableList: [],
      editFlag: false,
      tableLoading: false,
      approvalRecordList: [],
      formInline: {
        appName: '',
        appStatus: '',
        appType: ''
      },
      statusList: [],
      makeTypeList: [
        {
          code: '1',
          message: '芯片补差'
        },
        {
          code: '2',
          message: 'MTZ补差'
        }
      ],
      appTypeList: [
        {
          code: '1',
          message: 'mtz变更'
        },
        {
          code: '2',
          message: '芯片补差变更'
        }
      ]
    }
  },
  components: {
    iCard,
    iPage,
    iTabsList,
    iPagination,
    iTableCustom,
    iFormItem,
    iText
  },

  created() {
    this.changeId = this.$route.query.changeId
    this.init()
  },
  updated() {
    var tbody = window.document.getElementById('appRouterView')
    var height = tbody.clientHeight
    window.parent.postMessage(
      { key: 'setFormHeight', value: height + 'px' },
      '*'
    )
  },
  methods: {
    // 调整日期格式
    getDay(date) {
      return date ? date.split(' ')[0] : date
    },
    // 申请状态
    getStatus(status) {
      return this.statusList.find((item) => item.code == status)?.message
    },
    // 申请单类型
    getAppType(status) {
      return this.appTypeList.find((item) => item.code == status)?.message
    },
    // 补差类型
    getMakeType(status) {
      return this.makeTypeList.find((item) => item.code == status)?.message
    },
    getLocationApplyStatus() {
      getLocationApplyStatus({}).then((res) => {
        this.statusList = JSON.parse(JSON.stringify(res.data))
      })
    },
    init() {
      this.getDetail()
      this.getApprovalRecordList()
      this.getLocationApplyStatus()
    },
    getDetail() {
      getDetailById(this.changeId).then((res) => {
        if (res?.code === '200') {
          this.baseDetail = res.data
          this.formInline = res.data.chipChangeBase
          this.tableList = res.data.detailList.map((item) => {
            return {
              ...item,
              supplier: item.sapCode + '-' + item.supplierName
            }
          })
        }
      })
    },
    getApprovalRecordList() {
      this.tableLoading = true
      let params = {
        appId: this.changeId
      }
      approvalRecordList(params).then((res) => {
        if (res?.code === '200') {
          this.approvalRecordList = res.data
          this.tableLoading = false
        } else {
          iMessage.error(res.desZh)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.baseInfoForm {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  .formItem {
    display: inline-flex;
    width: 18%;
    ::v-deep .el-form-item__content {
      flex: 1;
    }
  }
}
::v-deep .el-form-item__content {
  width: 100%;
}
.dTitle {
  font-size: 16px;
}
</style>