<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-24 15:57:27
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <div>
    <iCard>
      <div class="flex-between-center-center margin-bottom24">
        <!-- <div class="title">
          {{language('CHUANGJIANTUFASHIJIAN1','创建突发事件')}}
        </div> -->
        <div class="flex-between-center-center">
          <span class="title">
            {{language('XIANSHIGONGYINGLIANLU','显示供应链路')}}
          </span>
          <el-switch @change="handleLine"
                     v-model="isLine"
                     active-color="#1660F1"
                     inactive-color="#cacccd">
          </el-switch>
        </div>
        <div>
          <iButton v-if="status"
                   @click="handleUnfold">{{language('ZHANKAI','展开')}}</iButton>
          <iButton @click="handleEmergency">{{language('TUFASHIJIAN','突发事件')}}</iButton>
        </div>
      </div>
      <div v-if="status">
        <span class="text">
          {{eventDetail.eventName+','+eventDetail.occurrenceTime+','+eventDetail.occurrencePlace}}
        </span>
        <el-divider></el-divider>
        <div class="margin-bottom20 flex-end">
          <iButton v-if="eventDetail.createType===language('SHOUDONGCHUANGJIAN','手动创建')"
                   @click="handleEdit">{{ language('BIANJI','编辑') }}</iButton>
          <!-- 导出全部-->
          <iButton @click="exportCurrentPage">{{ language('DAOCHUQUANBU','导出全部') }}</iButton>
          <!-- 导出报警信-->
          <iButton :loading="exportAlarmLetterLoading"
                   @click="exportAlarmLetter(selectTableData)">{{ language('DAOCHUBAOJINGXING','导出报警信')}}</iButton>
          <iButton :loading="exportFeedbackLoading"
                   @click="handleExportFeedback(selectTableData)">{{ language('DAOCHUFANKUIBIAO','导出反馈表')}}</iButton>
          <iButton :loading="sendFeedbackLoading"
                   @click="handleSendFeedback(selectTableData)">{{ language('FASONGFANKUIBIAO','发送反馈表')}}</iButton>
        </div>
      </div>
      <el-table height="360"
                tooltip-effect='light'
                row-key="number"
                :tree-props="{children:'partNumList'}"
                v-loading="tableLoading"
                :ref="'multipleTable'"
                :data="tableListData"
                @selection-change="handleSelectionChange($event,index)">
        <el-table-column align="center"
                         show-overflow-tooltip
                         type="selection"
                         width="55"> </el-table-column>
        <el-table-column type=""
                         align="center"
                         show-overflow-tooltip
                         prop="supplierName"
                         :label="language('GONGYINGSHANGMINGCHEN','供应商名称')" />
        <el-table-column align="left"
                         show-overflow-tooltip
                         prop="partNumSize"
                         :label="language('LINGJIANSHULIANGLINGJIANHAO','零件数量（零件号）')"
                         width="135">
        </el-table-column>
        <el-table-column align="center"
                         show-overflow-tooltip
                         v-if="eventDetail.createType===language('ZIDONGCHUANGJIAN','自动创建')"
                         prop="impactLevel"
                         :label="language('SOUYINGXIANGCHENGDU','受影响程度')">
        </el-table-column>
        <el-table-column align="center"
                         prop="feedbackStatus"
                         :label="language('FANKUIZHUANGTAI1','反馈状态')">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        :content="language('WEISHOUDAOFANKUI','未收到反馈')"
                        placement="top-start"
                        effect="light">
              <icon v-if="scope.row.feedbackStatus==='黄'"
                    name="iconbaojiapingfengenzong-jiedian-huang"
                    symbol></icon>
            </el-tooltip>
            <el-tooltip class="item"
                        :content="language('YOUYONGYINGFENXIAN','有供应风险')"
                        placement="top-start"
                        effect="light">
              <icon v-if="scope.row.feedbackStatus==='红'"
                    name="iconbaojiapingfengenzong-jiedian-hong"
                    symbol></icon>
            </el-tooltip>
            <el-tooltip class="item"
                        :content="language('WUGONGYINGFENGXIAN','无供应风险')"
                        placement="top-start"
                        effect="light">
              <icon v-if="scope.row.feedbackStatus==='绿'"
                    name="iconbaojiapingfengenzong-jiedian-lv"
                    symbol></icon>
            </el-tooltip>
            <el-tooltip class="item"
                        :content="language('WEIFASONGFANKUIBIAO','未发送反馈表')"
                        placement="top-start"
                        effect="light">
              <icon v-if="scope.row.feedbackStatus==='灰'"
                    name="iconbaojiapingfengenzong-jiedian-hui"
                    symbol></icon>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         show-overflow-tooltip
                         prop="isWarningLetter"
                         :label="language('BAOJINGXING','报警信')">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        :content="language('GONGYINGSHANGYITIJIAOBAOJINGXING','供应商已提交报警信')"
                        placement="top-start"
                        effect="light">
              <img class="cursor"
                   @click="handleAlarmSignal(scope.row)"
                   v-if="scope.row.isWarningLetter"
                   width="20px"
                   :src="alarm"
                   alt="">
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </iCard>
    <!-- 突发事件 -->
    <emergencyDialog :eventDetail="eventDetail"
                     :tableListData="tableListData"
                     v-model="emergencyDialog" />
    <!-- 导出当页 -->
    <exportDialog v-model="exportDialog" />
    <!--编辑  -->
    <createEmergenciesDialog :eventDetail="eventDetail"
                             :edit="edit"
                             v-model="createEmergenciesDialog" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, iButton, icon, iMessage } from "rise";
import { downloadUdFile } from "@/api/file";
import tableList from '@/components/commonTable';
import { supplierTableTitle } from "./data.js";
import emergencyDialog from "./emergencyDialog";
import exportDialog from "./exportDialog.vue";
import alarm from "@/assets/images/alarm.png";
import { checkExportFeedback, exportFeedback, sendFeedback, checkExportWarningLetter, exportWarningLetter } from "@/api/supplierManagement/supplyChainRisk/index.js";
import resultMessageMixin from "@/mixins/resultMessageMixin.js";
import createEmergenciesDialog from "@/views/supplierManagement/NTier/supplyChainRisk/emergenciesOverview/components/createEmergenciesDialog.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, iButton, tableList, emergencyDialog, exportDialog, icon, createEmergenciesDialog, exportDialog },
  mixins: [resultMessageMixin],
  props: {
    tableListData: { type: Array, default: [] },
    eventDetail: { type: Object, default: {} }
  },
  data () {
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
      tableListData: [],
      selectTableData: [],
      tableLoading: false,
      edit: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    tableListData: {
      handler (data) {
        this.isLine = false
        this.tableListData = data
      }
    }
  },
  // 方法集合
  methods: {
    // 进入报警信页面
    handleAlarmSignal (row) {
      downloadUdFile(row.pdfUrl).then(res => {

      })
      //  window.open(row.pdfUrl, "_blank");
      //   this.$router.push({ path: '/supplier/NTier/alarmLetter/alarmLetterView', query: { flag: 'view', id: warningLetterId } })
    },
    // 打开编辑窗口
    handleEdit () {
      this.createEmergenciesDialog = true
      this.edit = true
    },
    // 展示链路
    handleLine () {
      if (this.isLine) {
        this.$parent.$refs.chartMap.handleCurrentChange(this.tableListData, 'supplier')
      } else {
        this.$parent.$refs.chartMap.handleRemoveLine()
        this.$parent.$refs.chartMap.handleCircle()
      }
    },
    handleSelectionChange (val) {
      this.selectTableData = val
    },
    // 导出全部
    exportCurrentPage () {
      this.exportDialog = true
    },
    // 导出报警信
    async exportAlarmLetter (selectTableData) {
      const pms = {
        idList: []
      }
      selectTableData.forEach(item => pms.idList.push(item.id))
      if (pms.idList.length) {
        this.exportAlarmLetterLoading = true
        const res = await checkExportWarningLetter(pms)
        this.resultMessage(res, async () => {
          this.exportAlarmLetterLoading = false
          await exportWarningLetter(pms)
        }, () => {
          this.exportAlarmLetterLoading = false
        })
      } else {
        iMessage.warn(this.language('BAOQIANQINGXUANZHEYITIAOSHUJU', '抱歉,请选择一条数据'))
      }
    },
    // 进入突发事件
    handleEmergency () {
      this.$router.push({ path: '/supplier/NTier/supplyChainRisk/emergenciesOverview' })
    },
    // 展开
    handleUnfold () {
      this.emergencyDialog = true
    },
    // 导出反馈表
    async handleExportFeedback (selectTableData) {
      const pms = {
        idList: []
      }
      selectTableData.forEach(item => pms.idList.push(item.id))
      if (pms.idList.length) {
        this.exportFeedbackLoading = true
        const res = await checkExportFeedback(pms)
        this.resultMessage(res, async () => {
          await exportFeedback(pms)
          this.exportFeedbackLoading = false
        }, () => {
          this.exportFeedbackLoading = false
        })
      } else {
        iMessage.warn(this.language('BAOQIANQINGXUANZHEYITIAOSHUJU', '抱歉,请选择一条数据'))
      }
    },
    async handleSendFeedback (selectTableData) {
      let pms = {
        idList: []
      }
      selectTableData.forEach(item => pms.idList.push(item.id))
      pms.idList = pms.idList.filter(item => item)
      if (pms.idList.length) {
        this.sendFeedbackLoading = true
        const res = await sendFeedback(pms)
        this.resultMessage(res)
        this.sendFeedbackLoading = false
      } else {
        iMessage.warn(this.language('BAOQIANQINGXUANZHEYITIAOSHUJU', '抱歉,请选择一条数据'))
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.text {
  font-size: 22px;
  font-weight: bold;
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
