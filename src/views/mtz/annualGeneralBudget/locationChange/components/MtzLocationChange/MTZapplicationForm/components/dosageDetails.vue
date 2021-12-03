<!--
 * @Author: your name
 * @Date: 2021-10-27 19:29:09
 * @LastEditTime: 2021-12-03 16:48:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\components\dosageDetails.vue
-->
<template>
  <div>
    <iTabsList v-model="tabsValue"
               @tab-click="tableChange"
               type="card"
               slot="components"
               calss="iTabsList">
      <el-tab-pane :name="1"
                   :label="language('WEIHULINGJIANYUANCAILIAOYONGLIANG','维护零件原材料用量')">
        <iCard>
          <template slot="header">
            <span>
              {{language('YONGLIANGXIANGQING','用量详情')}}
            </span>
            <div class="opration"
                 v-if="!isView">
              <div v-show="!editFlag">
                <iButton @click="handleChangeDate"
                         class="margin-right20"
                         :disabled="disabled"> {{language('BIANGENGYOUXIAOQI','变更有效期')}}</iButton>
                <uploadButton ref="uploadButtonAttachment"
                              :buttonText="language('SHANGCHUANYUANCAILIAOYONGLIANGBIANGENG','上传原材料用量变更')"
                              :uploadByBusiness="true"
                              @uploadedCallback="uploadBasePriceChange($event)"
                              class="margin-right20"
                              :disabled="disabled" />
                <iButton @click="downFile"
                         :disabled="disabled"> {{language('XIAZAIMUBAN','下载模板')}}</iButton>
                <iButton @click="del"
                         :disabled="disabled"> {{language('SHANCHU','删除')}}</iButton>
                <iButton @click="add"
                         :disabled="disabled"> {{language('XINZENG','新增')}}</iButton>
                <iButton @click="edit"
                         :disabled="disabled"> {{language('BIANJI','编辑')}}</iButton>
              </div>
              <div v-show="editFlag">
                <iButton @click="cancel"
                         :disabled="disabled"> {{language('QUXIAO','取消')}}</iButton>
                <iButton @click="save"
                         :disabled="disabled"> {{language('BAOCUN','保存')}}</iButton>
              </div>
            </div>
          </template>
          <div class="table-wrapper">
            <iTableCustom :ref="'paramsTable'"
                          :loading="tableLoading"
                          :data="tableList"
                          :columns="TABLE_COLUMNS"
                          @handle-selection-change="handleSelectionChange">
            </iTableCustom>
            <iPagination v-update
                         @size-change="handleSizeChange($event, getBasePriceChangePageList)"
                         @current-change="handleCurrentChange($event, getBasePriceChangePageList)"
                         background
                         :current-page="page.currPage"
                         :page-sizes="page.pageSizes"
                         :page-size="page.pageSize"
                         :layout="page.layout"
                         :total="page.totalCount" />
          </div>
        </iCard>
      </el-tab-pane>
      <el-tab-pane :name="2"
                   :label="language('SHENPIJILU','审批记录')">
        <iCard>
          <template slot="header">
            <span>
              {{language('SHENPIXIANGQING','审批详情')}}
            </span>
          </template>
          <div class="table-wrapper">
            <iTableCustom :ref="'SPTable'"
                          :loading="tableLoading"
                          :data="approvalRecordList"
                          :columns="TABLE_COLUMNS1"
                          singleChoice
                          highlight-current-row
                          @handle-selection-change="handleSelectionChange1">
            </iTableCustom>
          </div>
        </iCard>
      </el-tab-pane>
    </iTabsList>

    <iDialog title="提示"
             :visible.sync="visible"
             v-if="visible"
             append-to-body
             width="30%"
             :before-close="handleClose">
      <div style="display:inline-block"
           class="margin-right10">
        <div v-for="item in dateList"
             :key="item.id"
             class="margin-bottom10">
          <iDatePicker v-model="item.value"
                       type="daterange"
                       format="yyyy-MM-dd"
                       value-format="yyyy-MM-dd"
                       range-separator="至"
                       :pickerOptions="pickerOptions"
                       start-placeholder="开始月份"
                       end-placeholder="结束月份" />
        </div>
      </div>
      <el-button type="primary"
                 style="vertical-align:top"
                 icon="el-icon-plus"
                 size="mini"
                 @click="addDate"
                 circle></el-button>
      <el-button type="primary"
                 style="vertical-align:top"
                 icon="el-icon-minus"
                 size="mini"
                 @click="delDate"
                 circle></el-button>
      <span slot="footer"
            class="dialog-footer">
        <iButton @click="reject">取 消</iButton>
        <iButton @click="sure">确 定</iButton>
      </span>
    </iDialog>
    <new-mtzlocation-change :dialogVisible="dialogVisible"
                            v-if="dialogVisible"
                            :addFlag="true"
                            :mtzAppId="mtzAppId"
                            @close="close"></new-mtzlocation-change>
  </div>
</template>

<script>
import { iButton, iTabsList, iCard, iPagination, iMessage, iDialog, iInput, iTableCustom, iDatePicker } from "rise";
import newMtzlocationChange from "@/views/mtz/annualGeneralBudget/locationChange/components/MtzLocationChange/newMtzlocationChange";
import uploadButton from '@/components/uploadButton';
import { basePriceChangePageList, uploadBasePriceChange, priceChangeExport, basePriceChangeDelete, updateBasePriceChange, approvalRecordList, approvalExplain } from '@/api/mtz/annualGeneralBudget/mtzChange'
// import iTableCustom from '@/components/iTableCustom'
import { addGenericAppChange, saveGenericAppChange } from '@/api/mtz/annualGeneralBudget/mtzChange.js'
import { TABLE_COLUMNS, TABLE_COLUMNS1 } from './data'
import { pageMixins } from '@/utils/pageMixins'
export default {
  components: {
    iButton,
    iCard,
    iTabsList,
    iTableCustom,
    iPagination,
    uploadButton,
    iDialog,
    iDatePicker,
    newMtzlocationChange
  },
  mixins: [pageMixins],
  data () {
    return {
      tabsValue: 1,
      TABLE_COLUMNS,
      TABLE_COLUMNS1,
      tableList: [],
      muliteList: [],
      muliteList1: [],
      mtzAppId: "",
      editFlag: false,
      tableLoading: false,
      approvalRecordList: [],
      isShow: false,
      textarea: "",
      // isView: false,
      disabled: false,
      dialogVisible: false,
      visible: false,
      dateList: [{
        id: 1,
        value: []
      }],
      maxDate: [],
      minDate: [],
      pickerOptions: {
        onPick: ({ minDate, maxDate }) => {
          this.minDate = minDate
          this.maxDate = maxDate
        }
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.init()
    });

  },
  props: {
    isView: {
      type: Boolean
    }
  },
  watch: {
    '$store.state.location.disabled': {
      handler (val) {
        this.disabled = JSON.parse(val)
      },
      deep: true,
      immediate: true
    },
    maxDate (val) {
      this.pickerOptions = {
        onPick: ({ minDate, maxDate }) => {
          this.minDate = minDate
          this.maxDate = maxDate
        },
        disabledDate: time => {
          if (this.dateList.length === 1) {
            return
          }
          if (val) {
            return time < val.getTime() + 86400000
          }
        }
      }
    }
  },
  methods: {
    init () {
      this.mtzAppId = this.$route.query.mtzAppId
      this.getBasePriceChangePageList()
      this.getApprovalRecordList()
    },
    getBasePriceChangePageList () {
      this.tableLoading = true
      let params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        mtzAppId: this.mtzAppId
      }
      basePriceChangePageList(params).then((res) => {
        if (res && res.code === '200') {
          this.tableList = res.data
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.tableList.forEach(item => {
            this.$set(item, 'editRow', false);
          })
          this.tableLoading = false
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    getApprovalRecordList () {
      this.tableLoading = true
      let params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        mtzAppId: this.mtzAppId || "8"
        // mtzAppId: "8"
      }
      approvalRecordList(params).then((res) => {
        if (res && res.code === '200') {
          this.approvalRecordList = res.data
          this.approvalRecordList.forEach(item => {
            this.$set(item, 'editRow', false);
          })
          this.tableLoading = false
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    add () {
      this.dialogVisible = true
    },
    close (val) {
      this.dialogVisible = val
      this.getBasePriceChangePageList()
      this.getApprovalRecordList()
    },
    edit () {
      this.tableList.forEach(item => {
        item.editRow = true
      })
      this.editFlag = true
    },
    cancel () {
      this.tableList.forEach(item => {
        item.editRow = false
      })
      this.editFlag = false
    },
    handleSelectionChange (val) {
      if (val.length > 1) {
        var duoxuans = val.pop();
        this.muliteList = val.pop();
        //清除所有选中
        this.$refs.paramsTable.clearSelection();
        //给最后一个加上选中
        this.$refs.paramsTable.toggleRowSelection(duoxuans);
      } else {
        this.muliteList = val
      }
    },
    handleSelectionChange1 (val) {
      this.muliteList1 = val
    },
    save () {
      this.muliteList.forEach(item => {
        item.editRow = false
      })
      this.editFlag = false
      let editList = this.muliteList.map(item => {
        return {
          dosage: item.newDosage,
          endDate: item.endDate,
          id: item.id,
          startDate: item.startDate
        }
      })
      updateBasePriceChange({
        changeList: editList,
        isDeptLead: true,
        mtzAppId: this.mtzAppId
      }).then((res) => {
        this.getBasePriceChangePageList()
      })
    },
    uploadBasePriceChange (val) {
      let params = {
        multifile: val.file,
        mtzAppId: this.mtzAppId
      }
      uploadBasePriceChange(params).then((res) => {
        if (res.code === '200') {
          this.getBasePriceChangePageList()
          iMessage.success(res.desZh)
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    downFile () {
      priceChangeExport({
        mtzAppId: this.mtzAppId
      }).then(res => {

      })
    },
    explain () {
      if (this.muliteList.length === 0) {
        iMessage.error(this.language('QINGXUANZESHUJU', '请选择数据'))
        return
      }
      this.isShow = true
    },
    handleSave () {
      let params = {
        comment: this.textarea,
        isDeptLead: true,
        riseId: this.muliteList1[0].riseId || "",
        taskId: this.muliteList1[0].taskId || ""
      }
      approvalExplain(params).then(res => {
        if (res?.code === '200') {
          this.isShow = false
          this.getApprovalRecordList()
          iMessage.success(res.desZh)
        } else {
          this.isShow = false
          iMessage.error(res.desZh)
        }
      })
    },
    handleSure () {
      let params = {
        isDeptLead: true,
        mtzBasePriceList: []
      }
      let selectList = this.muliteList.map(item => {
        return {
          dosage: item.newDosage || "",
          endDate: this.dateList[this.dateList.length - 1].value[1],
          mtzBasePriceId: item.mtzBasePriceId || "",
          startDate: this.dateList[0].value[0],
          childBasePriceList: this.dateList.map(item => {
            return {
              startDate: item.value[0],
              endDate: item.value[1]
            }
          })
        }
      })
      params.mtzBasePriceList = selectList
      params.mtzAppId = this.mtzAppId
      saveGenericAppChange(params).then(res => {
        if (res && res.code === '200') {
          this.getBasePriceChangePageList()
        } else {
          iMessage.error(res.desZh)
        }
      })

    },
    handleCancel () {
      this.isShow = false
    },
    handleChangeDate () {
      if (this.muliteList.length === 0) {
        iMessage.error('请选择数据')
        return
      }
      this.dateList[0].value[0] = this.muliteList[0].endDateAll
      this.dateList[0].value[1] = this.getNewDay(this.muliteList[0].endDateAll, 365)
      this.visible = true
    },
    getNewDay (dateTemp, days) {
      var dateTemp = dateTemp.split("-");
      var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式  
      var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
      var rDate = new Date(millSeconds);
      var year = rDate.getFullYear();
      var month = rDate.getMonth() + 1;
      if (month < 10) month = "0" + month;
      var date = rDate.getDate();
      if (date < 10) date = "0" + date;
      return (year + "-" + month + "-" + date);
    },
    del () {
      let ids = this.muliteList.map(item => {
        return item.id
      })
      let params = {
        id: ids
      }
      basePriceChangeDelete(params).then(res => {
        if (res && res.code === '200') {
          this.getBasePriceChangePageList()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    reject () {
      this.visible = false;
      this.dateList = [{
        id: 1,
        value: []
      }]
    },
    handleClose (done) {
      done()
    },
    addDate () {
      this.dateList.push({
        id: this.dateList.length + 1,
        value: []
      })
      this.pickerOptions = {
        disabledDate: time => {
          let date = this.dateList[this.dateList.length - 2].value[1]
          if (this.dateList.length === 1) {
            return
          }
          if (date) {
            return time < new Date(date.replace(/-/g, '/')).getTime() + 86400000
          }
        }
      }
    },
    delDate () {
      if (this.dateList.length === 1) {
        return
      }
      this.dateList.splice(this.dateList.length - 1, 1)
    },
    sure () {
      this.visible = false
      this.handleSure()
      this.dateList = [{
        id: 1,
        value: []
      }]
    }
  },


}
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 10px;
}
</style>