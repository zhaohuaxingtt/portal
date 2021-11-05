<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-24 18:04:32
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iDialog :modal="false" :title="language('TUFASHIJIAN','突发事件')" :show-close="false" :visible.sync="value" width="80%" height="1000px">
    <div slot="title" class="flex-between-center-center">
      <span class="el-dialog__title">
        {{language('TUFASHIJIAN','突发事件')}}
      </span>
      <div>
        <iButton @click="clearDiolog">{{language('SHOUQI','收起')}}</iButton>
        <iButton @click="handleEmergency">{{language('TUFASHIJIANZONGLAN','突发事件总览')}}</iButton>
      </div>
    </div>
    <span class="text">
      {{eventDetail.eventName+','+eventDetail.occurrenceTime+','+eventDetail.occurrencePlace}}
    </span>
    <el-divider></el-divider>
    <div class="margin-bottom20 flex-end">
      <!-- 编辑-->
      <iButton v-if="eventDetail.createType===language('SHOUDONGCHUANGJIAN','手动创建')" @click="handleEdit">{{ language('BIANJI','编辑') }}</iButton>
      <!-- 导出当页-->
      <iButton @click="exportCurrentPage">{{ language('DAOCHUQUANBU','导出全部') }}</iButton>
      <!-- 导出报警信-->
      <iButton :loading="exportAlarmLetterLoading" @click="exportAlarmLetter">{{ language('DAOCHUBAOJINGXING','导出报警信')}}</iButton>
      <iButton :loading="exportFeedbackLoading" @click="handleExportFeedback">{{ language('DAOCHUFANKUIBIAO','导出反馈表')}}</iButton>
      <iButton :loading="sendFeedbackLoading" @click="handleSendFeedback">{{ language('FASONGFANKUIBIAO','发送反馈表')}}</iButton>
    </div>
    <el-table height="400" tooltip-effect='light' row-key="number" :tree-props="{children:'partNumList'}" v-loading="tableLoading" :ref="'multipleTable'" :data="tableListData" @selection-change="handleSelectionChange($event,index)">
      <el-table-column align="center" show-overflow-tooltip type="selection" width="55">
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip type="" prop="supplierId" :label="language('GONGYINGSHANGBIANHAO','供应商编号')">
        <template slot-scope="scope">
          <div v-if="scope.row.sapCode">{{scope.row.sapCode}}</div>
          <div v-else-if="scope.row.svwCode">{{scope.row.svwCode}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip type="" prop="supplierName" :label="language('GONGYINGSHANGMINGCHEN','供应商名称')">
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip type="" prop="supplyLevel" :label="language('GONGHUOGUANXI','供货关系')">
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip type="" prop="address" :label="language('GONGCHANGDIZHI','工厂地址')">
      </el-table-column>
      <el-table-column align="left" show-overflow-tooltip prop="partNumSize" :label="language('LINGJIANSHULIANGLINGJIANHAO','零件数量（零件号）')">
      </el-table-column>
      <el-table-column align="center" v-if="eventDetail.createType===language('ZIDONGCHUANGJIAN','自动创建')" show-overflow-tooltip type="" prop="impactLevel" :label="language('SOUYINGXIANGCHENGDU','受影响程度')">
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip type="" prop="feedbackStatus" :label="language('FANKUIZHUANGTAI1','反馈状态')">
        <template slot-scope="scope">
          <el-tooltip class="item" :content="language('WEISHOUDAOFANKUI','未收到反馈')" placement="top-start" effect="light">
            <icon v-if="scope.row.feedbackStatus==='黄'" name="iconbaojiapingfengenzong-jiedian-huang" symbol></icon>
          </el-tooltip>
          <el-tooltip class="item" :content="language('YOUYONGYINGFENXIAN','有供应风险')" placement="top-start" effect="light">
            <icon v-if="scope.row.feedbackStatus==='红'" name="iconbaojiapingfengenzong-jiedian-hong" symbol></icon>
          </el-tooltip>
          <el-tooltip class="item" :content="language('WUGONGYINGFENGXIAN','无供应风险')" placement="top-start" effect="light">
            <icon v-if="scope.row.feedbackStatus==='绿'" name="iconbaojiapingfengenzong-jiedian-lv" symbol></icon>
          </el-tooltip>
          <el-tooltip class="item" :content="language('WEIFASONGFANKUIBIAO','未发送反馈表')" placement="top-start" effect="light">
            <icon v-if="scope.row.feedbackStatus==='灰'" name="iconbaojiapingfengenzong-jiedian-hui" symbol></icon>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip type="" prop="isWarningLetter" :label="language('BAOJINGXING','报警信')">
        <template slot-scope="scope">
          <el-tooltip class="item" :content="language('GONGYINGSHANGYITIJIAOBAOJINGXING','供应商已提交报警信')" placement="top-start" effect="light">
            <img class="cursor" @click="handleAlarmSignal(scope.row.warningLetterId)" v-if="scope.row.isWarningLetter" width="20px" :src="alarm" alt="">
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
    </div>
  </iDialog>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iDialog, iButton, icon } from "rise";
import tableList from '@/components/commonTable';
import alarm from "@/assets/images/alarm.png";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iDialog, iButton, tableList, icon },
  props: {
    value: { type: Boolean },
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
      tableListData: [],
      selectTableData: [],
      tableLoading: false,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    tableListData: {
      handler(data) {
        this.tableListData = data
      }
    }
  },
  // 方法集合
  methods: {
    handleView() { },
    handleEdit() {
      this.$parent.handleEdit()
      this.clearDiolog()
    },
    handleEmergency() {
      this.$router.push({ path: '/supplier/NTier/supplyChainRisk/emergenciesOverview' })
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    clearDiolog() {
      this.$emit('input', false);
    },
    // 导出当页
    exportCurrentPage() {
      this.$parent.exportCurrentPage()
      this.clearDiolog()
      console.log(this.$parent);
    },
    // 导出反馈表
    handleExportFeedback() {
      this.exportFeedbackLoading = true
      this.$parent.handleExportFeedback(this.selectTableData)
      this.exportFeedbackLoading = false
    },
    // 发送反馈表
    handleSendFeedback() {
      this.sendFeedbackLoading = true
      this.$parent.handleSendFeedback(this.selectTableData)
      this.sendFeedbackLoading = false
    },
    // 导出报警信
    exportAlarmLetter() {
      this.exportAlarmLetterLoading = true
      this.$parent.exportAlarmLetter(this.selectTableData)
      this.exportAlarmLetterLoading = false
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.text {
  font-size: 22px;
  font-weight: bold;
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
.flex-end {
  display: flex;
  justify-content: flex-end;
}
</style>
