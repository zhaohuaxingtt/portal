<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-24 15:57:27
 * @LastEditors: YoHo
 * @Descripttion: your project
-->
<template>
  <div>
    <iCard>
      <div class="flex-between-center-center margin-bottom24">
        <!-- <div class="title">
          {{language('CHUANGJIANTUFASHIJIAN1','创建突发事件')}}
        </div> -->
        <div
          class="flex-between-center-center"
          v-permission="SUPPLIER_WORKBENCH_N_FENGXIAN_INF_SHOW"
        >
          <span class="title">
            {{ language('XIANSHIGONGYINGLIANLU', '显示供应链路') }}
          </span>
          <el-switch
            @change="handleLine"
            v-model="isLine"
            active-color="#1660F1"
            inactive-color="#cacccd"
          >
          </el-switch>
        </div>
        <div>
          <iButton
            v-if="status"
            @click="handleUnfold"
            v-permission="SUPPLIER_WORKBENCH_N_FENGXIAN_INF_ZHANKAI"
            >{{ language('ZHANKAI', '展开') }}</iButton
          >
          <iButton
            @click="handleEmergency"
            v-permission="SUPPLIER_WORKBENCH_N_FENGXIAN_INF_TUFASHIJIAN"
            >{{ language('TUFASHIJIAN', '突发事件') }}</iButton
          >
        </div>
      </div>
      <div v-if="status">
        <span class="text">
          {{
            eventDetail.eventName +
            ',' +
            eventDetail.occurrenceTime +
            ',' +
            eventDetail.occurrencePlace
          }}
        </span>
        <el-divider></el-divider>
        <div class="margin-bottom20 flex-end">
          <iButton
            :loading="sendFeedbackLoading"
            @click="handleSendFeedback(selectTableData)"
            v-permission="SUPPLIER_WORKBENCH_N_FENGXIAN_INF_FSFKB"
            >{{ language('FASONGFANKUIBIAO', '发送反馈表') }}</iButton
          >
          <iButton
            :loading="exportFeedbackLoading"
            @click="handleExportFeedback(selectTableData)"
            v-permission="SUPPLIER_WORKBENCH_N_FENGXIAN_INF_DCFKB"
            >{{ language('DAOCHUFANKUIBIAO', '导出反馈表') }}</iButton
          >
          <!-- 导出报警信-->
          <iButton
            :loading="exportAlarmLetterLoading"
            @click="exportAlarmLetter(selectTableData)"
            v-permission="SUPPLIER_WORKBENCH_N_FENGXIAN_INF_DCBJQ"
            >{{ language('DAOCHUBAOJINGXING', '导出报警信') }}</iButton
          >
          <!-- 导出全部-->
          <iButton
            @click="exportCurrentPage"
            v-permission="SUPPLIER_WORKBENCH_N_FENGXIAN_INF_DAOCHUQUANBU"
            >{{ language('DAOCHUQUANBU', '导出全部') }}</iButton
          >
          <iButton
            v-if="
              eventDetail.createType ===
              language('SHOUDONGCHUANGJIAN', '手动创建')
            "
            v-permission="SUPPLIER_WORKBENCH_N_FENGXIAN_INF_BIANJI"
            @click="handleEdit"
            >{{ language('BIANJI', '编辑') }}</iButton
          >
        </div>
      </div>
      <el-table
        height="360"
        tooltip-effect="light"
        row-key="number"
        v-loading="tableLoading"
        :ref="'multipleTable'"
        :data="tableData"
        @selection-change="handleSelectionChange($event, index)"
      >
        <el-table-column
          align="center"
          show-overflow-tooltip
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          type=""
          align="center"
          show-overflow-tooltip
          prop="supplierName"
          width="190"
          :label="language('GONGYINGSHANGMINGCHEN', '供应商名称')"
        />
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="partNumSize"
          :label="language('LINGJIANSHULIANGLINGJIANHAO', '零件数量（零件号）')"
          width="190"
        >
          <template slot-scope="scope">
            <span class="link-text" @click="goDetail(scope.row)">{{
              scope.row.partNumSize
            }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center"
                         show-overflow-tooltip
                         v-if="eventDetail.createType===language('ZIDONGCHUANGJIAN','自动创建')"
                         prop="impactLevel"
                         :label="language('SOUYINGXIANGCHENGDU','受影响程度')">
        </el-table-column> -->
        <el-table-column
          align="center"
          prop="feedbackStatus"
          :label="language('FANKUIZHUANGTAI1', '反馈状态')"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              :content="language('WEISHOUDAOFANKUI', '未收到反馈')"
              placement="top-start"
              effect="light"
            >
              <icon
                v-if="scope.row.feedbackStatus === '黄'"
                name="iconbaojiapingfengenzong-jiedian-huang"
                symbol
              ></icon>
            </el-tooltip>
            <el-tooltip
              class="item"
              :content="language('YOUYONGYINGFENXIAN', '有供应风险')"
              placement="top-start"
              effect="light"
            >
              <icon
                v-if="scope.row.feedbackStatus === '红'"
                name="iconbaojiapingfengenzong-jiedian-hong"
                symbol
              ></icon>
            </el-tooltip>
            <el-tooltip
              class="item"
              :content="language('WUGONGYINGFENGXIAN', '无供应风险')"
              placement="top-start"
              effect="light"
            >
              <icon
                v-if="scope.row.feedbackStatus === '绿'"
                name="iconbaojiapingfengenzong-jiedian-lv"
                symbol
              ></icon>
            </el-tooltip>
            <el-tooltip
              class="item"
              :content="language('WEIFASONGFANKUIBIAO', '未发送反馈表')"
              placement="top-start"
              effect="light"
            >
              <icon
                v-if="scope.row.feedbackStatus === '灰'"
                name="iconbaojiapingfengenzong-jiedian-hui"
                symbol
              ></icon>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="isWarningLetter"
          :label="language('BAOJINGXING', '报警信')"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              :content="
                language(
                  'GONGYINGSHANGYITIJIAOBAOJINGXING',
                  '供应商已提交报警信'
                )
              "
              placement="top-start"
              effect="light"
            >
              <img
                class="cursor"
                @click="handleAlarmSignal(scope.row)"
                v-if="scope.row.isWarningLetter"
                width="20px"
                :src="alarm"
                alt=""
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </iCard>
    <iDialog
      :visible.sync="supplierVisible"
      append-to-body
      v-if="supplierVisible"
      width="40%"
      height="600px"
    >
      <div slot="title" class="flex" style="align-items: flex-end">
        <span class="el-dialog__title">
          {{
            supplierList.supplierName +
            language('SHOUYINGXIANGLINGJIANXIANGQING', '受影响零件详情')
          }}
        </span>
        <span style="font-size: 16px; margin-left: 20px">{{
          supplierList.sapCode ? supplierList.sapCode : supplierList.svwCode
        }}</span>
      </div>
      <p>
        {{
          supplierList.factoryName
            ? supplierList.factoryName
            : '' + '    ' + supplierList.address
        }}
      </p>
      <el-divider></el-divider>
      <div class="margin-bottom20 flex-end">
        <el-table
          tooltip-effect="light"
          row-key="number"
          v-loading="tableLoading1"
          :data="supplierList.partNumList"
        >
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="index"
            label="#"
            width="55"
          >
          </el-table-column>
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="partNumSize"
            :label="language('LINGJIANHAO', '零件号')"
          />
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer"></div>
    </iDialog>
    <!-- 突发事件 -->
    <emergencyDialog
      :eventDetail="eventDetail"
      :tableListData="tableListData"
      :supplierList="supplierList"
      v-model="emergencyDialog"
    />
    <!-- 导出当页 -->
    <exportDialog v-model="exportDialog" />
    <!--编辑  -->
    <createEmergenciesDialog
      :eventDetail="eventDetail"
      :edit="edit"
      v-model="createEmergenciesDialog"
    />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, iButton, icon, iMessage, iDialog } from 'rise'
import { downloadUdFile } from '@/api/file'
import tableList from '@/components/commonTable'
import { supplierTableTitle } from './data.js'
import emergencyDialog from './emergencyDialog'
import exportDialog from './exportDialog.vue'
import alarm from '@/assets/images/alarm.png'
import {
  checkExportFeedback,
  exportFeedback,
  sendFeedback,
  checkExportWarningLetter,
  exportWarningLetter,
  getSupplierPartInfo
} from '@/api/supplierManagement/supplyChainRisk/index.js'
import resultMessageMixin from '@/mixins/resultMessageMixin.js'
import createEmergenciesDialog from '@/views/supplierManagement/NTier/supplyChainRisk/emergenciesOverview/components/createEmergenciesDialog.vue'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    iCard,
    iButton,
    tableList,
    emergencyDialog,
    exportDialog,
    icon,
    createEmergenciesDialog,
    exportDialog,
    iDialog
  },
  mixins: [resultMessageMixin],
  props: {
    tableListData: { type: Array, default: [] },
    eventDetail: { type: Object, default: {} }
  },
  data() {
    // 这里存放数据
    return {
      exportAlarmLetterLoading: false,
      exportFeedbackLoading: false,
      sendFeedbackLoading: false,
      alarm: alarm,
      isLine: false,
      createEmergenciesDialog: false,
      exportDialog: false,
      status: true,
      emergencyDialog: false,
      tableTitle: supplierTableTitle,
      // tableListData: [],
      selectTableData: [],
      tableLoading: true,
      edit: false,
      tableData: [],
      times: 0,
      supplierList: [],
      factoryName: '',
      supplierVisible: false,
      tableLoading1: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    tableListData: {
      handler(data) {
        if (data) {
          this.tableLoading = false
          this.isLine = false
          this.tableListData = data
          this.tableData = this.tableListData.slice(0, 20)
        } else {
          this.tableLoading = true
          setTimeout(() => {
            this.tableLoading = false
          }, 10000)
        }
      }
    }
  },
  // 方法集合
  methods: {
    // 进入报警信页面
    handleAlarmSignal(row) {
      downloadUdFile(row.pdfUrl).then((res) => {})
      //  window.open(row.pdfUrl, "_blank");
      //   this.$router.push({ path: '/supplier/NTier/alarmLetter/alarmLetterView', query: { flag: 'view', id: warningLetterId } })
    },
    load(tree, treeNode, resolve) {
      console.log(tree, treeNode)
      if (treeNode.expanded) {
        resolve(tree.partNumList)
        treeNode.expanded = false
        return
      }
      // setTimeout(() => {
      //   resolve()
      // }, 1000)
    },
    // 打开编辑窗口
    handleEdit() {
      this.createEmergenciesDialog = true
      this.edit = true
    },
    // 展示链路
    handleLine() {
      if (this.isLine) {
        this.$parent.$refs.chartMap.handleCurrentChange(
          this.tableListData,
          'supplier'
        )
      } else {
        this.$parent.$refs.chartMap.handleRemoveLine()
        this.$parent.$refs.chartMap.handleCircle()
      }
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    // 导出全部
    exportCurrentPage() {
      this.exportDialog = true
    },
    // 导出报警信
    async exportAlarmLetter(selectTableData) {
      const pms = {
        idList: []
      }
      selectTableData.forEach((item) => pms.idList.push(item.id))
      if (pms.idList.length) {
        this.exportAlarmLetterLoading = true
        const res = await checkExportWarningLetter(pms)
        this.resultMessage(
          res,
          async () => {
            this.exportAlarmLetterLoading = false
            await exportWarningLetter(pms)
          },
          () => {
            this.exportAlarmLetterLoading = false
          }
        )
      } else {
        iMessage.warn(
          this.language('BAOQIANQINGXUANZHEYITIAOSHUJU', '抱歉,请选择一条数据')
        )
      }
    },
    // 进入突发事件
    handleEmergency() {
      this.$router.push({
        path: '/supplier/NTier/supplyChainRisk/emergenciesOverview'
      })
    },
    // 展开
    handleUnfold() {
      this.emergencyDialog = true
    },
    goDetail(val) {
      console.log(val)
      this.supplierVisible = true
      getSupplierPartInfo(val).then((res) => {
        if (res?.code === '200') {
          this.supplierList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 导出反馈表
    async handleExportFeedback(selectTableData) {
      const pms = {
        idList: []
      }
      selectTableData.forEach((item) => pms.idList.push(item.id))
      if (pms.idList.length) {
        this.exportFeedbackLoading = true
        const res = await checkExportFeedback(pms)
        this.resultMessage(
          res,
          async () => {
            await exportFeedback(pms)
            this.exportFeedbackLoading = false
          },
          () => {
            this.exportFeedbackLoading = false
          }
        )
      } else {
        iMessage.warn(
          this.language('BAOQIANQINGXUANZHEYITIAOSHUJU', '抱歉,请选择一条数据')
        )
      }
    },
    async handleSendFeedback(selectTableData) {
      let pms = {
        idList: []
      }
      selectTableData.forEach((item) => pms.idList.push(item.id))
      pms.idList = pms.idList.filter((item) => item)
      if (pms.idList.length) {
        this.sendFeedbackLoading = true
        const res = await sendFeedback(pms)
        this.resultMessage(res)
        this.sendFeedbackLoading = false
      } else {
        iMessage.warn(
          this.language('BAOQIANQINGXUANZHEYITIAOSHUJU', '抱歉,请选择一条数据')
        )
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      let dom = this.$refs.multipleTable.bodyWrapper
      dom.addEventListener('scroll', (res) => {
        // const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight;
        // if (this.tableData.length > 10) {
        //   // this.tableData = []
        //   // this.tableData = this.tableListData.slice(0, 10)
        //   if (scrollDistance <= 0) {//等于0证明已经到底，可以请求接口
        //     // setTimeout(function () {
        //     //   for (let i = 11; i < this.tableListData.length; i++) {
        //     //     this.tableData.push(this.tableListData[i])
        //     //   }
        //     // })
        //   }
        // } else {
        //   this.tableData = this.tableListData
        // }

        const height = res.target
        const clientHeight = height.clientHeight // 表格视窗高度 即wraper
        const scrollTop = height.scrollTop // 表格内容已滚动的高度
        const scrollHeight = height.scrollHeight // 表格内容撑起的高度
        console.log(clientHeight, scrollTop, scrollHeight)
        if (clientHeight + scrollTop + 10 >= scrollHeight) {
          // 表格滚动已经触底 更新表格数据
          this.times++
          const length =
            20 * this.times > this.tableListData.length
              ? this.tableListData.length
              : 20 * this.times
          this.tableData = this.tableListData.slice(0, length)
        }
      })
    })
  }
}
</script>
<style lang="scss" scoped>
// @import url(); 引入公共css类
.text {
  font-size: 22px;
  font-weight: bold;
}
.link-text,
.open-link-text {
  color: $color-blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.title {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  color: #41434a;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
}
//有子节点 且未展开
::v-deep .el-table .el-icon-arrow-right:before {
  background: url('~@/assets/images/Icon - Arrow Drop Down.png') no-repeat 0 0;
  content: '';
  display: block;
  width: 10px;
  height: 4px;
  font-size: 10px;
  background-size: 10px;
}
//有子节点 且已展开
::v-deep .el-table .el-table__expand-icon--expanded {
  .el-icon-arrow-right:before {
    background: url('~@/assets/images/Icon - Arrow收起.png') no-repeat 0 0;
    content: '';
    display: block;
    width: 10px;
    height: 4px;
    font-size: 10px;
    background-size: 10px;
    transform: rotate(270deg);
  }
}
::v-deep .el-table__expand-icon {
  float: right !important;
}

::v-deep .el-tree .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
</style>
