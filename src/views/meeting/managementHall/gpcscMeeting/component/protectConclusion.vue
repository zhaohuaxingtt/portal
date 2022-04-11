<!-- 结束结论 -->
<template>
  <iDialog
    title="结束议题"
    :visible.sync="open"
    width="54.875rem"
    :close-on-click-modal="false"
    @close="close"
  > 
  <!-- 分段定点  待定 只有下拉框和任务 -->
  <!-- Last Call  有下拉框和任务rfq发送对象 -->
  <!-- 不通过  提交  任务 文本框 -->
    <iEditForm>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
        class="form-box"
      >
        <!-- 结论 -->
        <iFormItem prop="conclusionCsc" >
          <div class="operate">
            <div class="operate-title">
              <span class="conclusion">结论</span>
              <span class="required-icon">*</span>
            </div>
            <iSelect
              v-model="ruleForm.conclusion"
              placeholder="结论"
              @change="changeConclusion($event)"
              class="operate-select"
              value-key="conclusionCsc"
              :disabled="isOther"
            >
              <el-option
                :value="item.value"
                :label="item.name"
                v-for="(item, index) of conclusionCscAll"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
        </iFormItem>
        <!-- LOI -->
        <iFormItem prop="isFrozenRs" v-if="showIFormItemRS" 
        >
          <div class="switch-content">
            <div class="freeze" style="margin-right:23px;">提交LOI审批</div>
            <!-- <div class="swicth">
              <div class="text" v-if="fromData.isFrozenRs" ref="sliderText"> 是</div>
              <div class="text" v-else ref="sliderText">否</div>
              <div class="circle" @click="handleSwitch" ref="slider"></div>
            </div> -->
          <iSelect
              v-model="fromData.isFrozenRs"
              :placeholder="$t('请选择')"
              class="operate-selectALL"
            >
              <el-option :value="true" label="是"></el-option>
              <el-option :value="false" label="否"></el-option>
            </iSelect>
          </div>
        </iFormItem>
        <!-- 任务 -->
        <iFormItem 
          label="任务"
          prop="result"
          :hideRequiredAsterisk="true"
          class="task"
        >
          <iLabel :label="$t('任务')" slot="label" class="task-title"></iLabel>
          <iInput
            type="textarea"
            v-model="fromData.result"
            class="task-input"
            placeholder="请输入任务"
          ></iInput>
        </iFormItem>
      </el-form>
    </iEditForm>
    <!-- 列表 -->
    <div v-if="showIFormItemList">
      <div class="commonTablediv">RFQ发送对象</div>
          <commonTable
          class="commonTablediv"
            v-update
            :selection="true"
            :index="true"
            @handleSelectionChange="handleSelectionChange"
            :customClass="true"
            :tableLoading="loading"
            :tableData="tableDataList"
            :tableTitle="tableColumns">
            <!-- 货币 -->
            <template slot="currency" slot-scope="scope">
                <iSelect
                  v-model="scope.row.currency"
                  :placeholder="$t('请选择')"
                >
              <el-option
                v-for="item in currencyS"
                :key="item.destCurrency"
                :label="item.destCurrency"
                :value="item.destCurrency"
              ></el-option>
            </iSelect>
            </template>
            <!-- 目标价 -->
            <template slot="targetPrice" slot-scope="scope">
                <iInput
                  v-model="scope.row.targetPrice"
                />
            </template>
            <!-- 最终成交价 -->
            <template slot="finalPrice" slot-scope="scope">
                <iInput
                  v-model="scope.row.finalPrice"
                />
            </template>
          </commonTable>
    </div>
    <!-- 输入框 -->
    <div  v-if="showIFormItemelform">
      <el-form
        :model="formData"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
      >
      <el-row :gutter="24">
        <!-- 股别   fullCode-->
          <el-col :span="12" >
            <el-form-item :label="language('股别', '股别')" prop="cbdName">
                <i-input
                v-model="fromData.presenterDept"
                  disabled
                ></i-input>
              </el-form-item>
         </el-col>
         <!-- 项目   gpName-->
         <el-col :span="12" >
            <el-form-item :label="language('项目', '项目')" prop="cbdName">
                <i-input  v-model="fromData.topic"
                  disabled
                ></i-input>
              </el-form-item>
         </el-col>
      </el-row>
      <el-row :gutter="24">
        <!-- 上会次数   cscCount-->
          <el-col :span="12" >
            <el-form-item :label="language('上会次数', '上会次数')" prop="cbdName">
                <i-input
                v-model="fromData.cscCount"
                  disabled
                ></i-input>
              </el-form-item>
         </el-col>
         <!-- CSC编号   cscCode-->
         <el-col :span="12" >
            <el-form-item :label="language('CSC编号', 'CSC编号')" prop="cbdName">
                <i-input
                v-model="fromData.cscCode"
                  disabled
                ></i-input>
              </el-form-item>
         </el-col>
      </el-row>
      <el-row :gutter="24">
        <!-- 申请部门   supporterDept-->
          <el-col :span="12" >
            <el-form-item :label="language('申请部门', '申请部门')" prop="cbdName">
                <i-input
                v-model="fromData.supporterDept"
                  disabled
                ></i-input>
              </el-form-item>
         </el-col>
         <!-- 申请人   supporter   -->
         <el-col :span="12" >
            <el-form-item :label="language('申请人', '申请人')" prop="cbdName">
                <i-input
                v-model="fromData.supporter"
                  disabled
                ></i-input>
              </el-form-item>
         </el-col>
      </el-row>
      <el-row :gutter="24">
        <!--  采购员 presenter   -->
          <el-col :span="12" >
            <el-form-item :label="language('采购员', '采购员')" prop="cbdName">
                <i-input
                v-model="fromData.presenter"
                  disabled
                ></i-input>
              </el-form-item>
         </el-col>
         <!--定点金额   price -->
         <el-col :span="12" >
            <el-form-item :label="language('定点金额(不含可抵扣税)', '定点金额(不含可抵扣税)')" prop="cbdName">
                <i-input v-model="fromData.price" disabled>
                </i-input>
                 <span class="iconWid" v-if="iconShowA">高</span>
                 <span class="iconWid" v-if="iconShowB">低</span>
            </el-form-item> 
         </el-col>
      </el-row>
          
      </el-form>
    </div> 
   
    <div class="button-list">
      <iButton class="sure" @click="handleSure" :loading="loading" >提交</iButton >
      <iButton class="cancel" @click="handleCancel">取消</iButton>
    </div>
  </iDialog>
</template>
<script>
import { endCscThemen ,findGpBidderInfoByThemenId ,findGpInfoByThemenId , getCscCurrencyList ,findThemenConclusion} from '@/api/meeting/gpMeeting'
import { findThemenById } from '@/api/meeting/gpMeeting'
import commonTable from '@/components/commonTable'
import iEditForm from '@/components/iEditForm'
import iTableML from '@/components/iTableML'
import {
  iDialog,
  iFormItem,
  iSelect,
  iLabel,
  iInput,
  iButton,
  iMessage,
  icon
} from 'rise'
import { themenConclusionArrObj, themenConclusion , TABLE_COLUMNS_DEFAULT} from './data'
import { getMettingList } from '@/api/meeting/home'
import { updateThemen } from '@/api/meeting/details'
import dayjs from 'dayjs'

export default {
  components: {
    iDialog,
    iFormItem,
    iEditForm,
    iSelect,
    iLabel,
    iInput,
    iButton,
    iTableML,
    commonTable,
    icon
  },
  props: {
    autoOpenProtectConclusionObj: {
      type: Object,
      default: () => {
        return ''
      }
    },
    selectedTableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    open: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    meetingInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isOther: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    beforeResult: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    if (this.autoOpenProtectConclusionObj) {
      return {
        isFrozenRs:false,
        conclusionCscAllS:[],
        currencyS:[],
        iconShowA:false,
        iconShowB:false,
        selectedRow:[],
        tableDataList:[],
        fromData:[],
        showIFormItemRS: false,
        showIFormItemList: false,
        showIFormItemelform: false,
        formData:{
          isFrozenRs:false,
        },
        tableColumns: [...TABLE_COLUMNS_DEFAULT],
        loading: false,
        themenConclusion,
        curChooseArr: [],
        isShowSwitch:
          this.autoOpenProtectConclusionObj.conclusionCsc === '02'
            ? this.autoOpenProtectConclusionObj.isFrozenRs
            : false,
        isShowTable:
          this.autoOpenProtectConclusionObj.conclusionCsc === '05' ||
          this.autoOpenProtectConclusionObj.conclusionCsc === '06'
            ? true
            : false,
        conclusionCscAllLIN:[
          {
          conclusionCsc: "01",
          conclusionName: "待定",
          },
          {
            conclusionCsc: "08",
            conclusionName: "通过",
          },
          {
            conclusionCsc: "10",
            conclusionName: "不通过",
          },
        ],
        conclusionCscAll:[],
        tableListData: [],
        ruleForm: {
          conclusion: {
            conclusionCsc: this.autoOpenProtectConclusionObj.conclusionCsc
              ? this.autoOpenProtectConclusionObj.conclusionCsc
              : '01',
            conclusionName:
              themenConclusion[
                this.autoOpenProtectConclusionObj.conclusionCsc
                  ? this.autoOpenProtectConclusionObj.conclusionCsc
                  : '01'
              ]
          },
          taskCsc: this.autoOpenProtectConclusionObj.conclusion
            ? this.autoOpenProtectConclusionObj.conclusion
            : '',
          isFrozenRs:
            this.beforeResult === '02'
              ? this.autoOpenProtectConclusionObj.isFrozenRs
              : true
        },
        currentRow: {}
      }
    } else {
      return {
        isFrozenRs:false,
        conclusionCscAllS:[],
        currencyS:[],
        iconShowA:false,
        iconShowB:false,
        selectedRow:[],
        tableDataList:[],
        fromData:[],
        showIFormItemRS: false,
        showIFormItemList: false,
        showIFormItemelform: false,
        formData:{
          isFrozenRs:false,
        },
        tableColumns: [...TABLE_COLUMNS_DEFAULT],
        loading: false,
        themenConclusion,
        curChooseArr: [],
        isShowSwitch:
          this.selectedTableData[0].conclusionCsc === '02'
            ? this.selectedTableData[0].isFrozenRs
            : false,
        isShowTable:
          this.selectedTableData[0].conclusionCsc === '05' ||
          this.selectedTableData[0].conclusionCsc === '06'
            ? true
            : false,
        conclusionCscAllLIN:[
          {
          conclusionCsc: "01",
          conclusionName: "待定",
          },
          {
            conclusionCsc: "08",
            conclusionName: "通过",
          },
          {
            conclusionCsc: "10",
            conclusionName: "不通过",
          },
        ],
        conclusionCscAll:[],
        tableListData: [],
        ruleForm: {
          conclusion: {
            conclusionCsc: this.selectedTableData[0].conclusionCsc
              ? this.selectedTableData[0].conclusionCsc
              : '01',
            conclusionName:
              themenConclusion[
                this.selectedTableData[0].conclusionCsc
                  ? this.selectedTableData[0].conclusionCsc
                  : '01'
              ]
          },
          taskCsc: this.selectedTableData[0].conclusion
            ? this.selectedTableData[0].conclusion
            : '',
          isFrozenRs:
            this.beforeResult === '02'
              ? this.selectedTableData[0].isFrozenRs
              : true
        },
        currentRow: {}
      }
    }
  },
  mounted() {
    // 先根据会议是否是临时议题 绝对下拉框数据  
    // conclusionCscAllLIN 临时议题
    // conclusionCscAll   会议议题
    //判断MANUAL --临时议题    GP  --上会议题  结论不一样
    if (curObj.type=="MANUAL") {
      this.relateCommon(['08','01','10'])
    }else{
      this.getConclusion()
    }


    const curObj = this.autoOpenProtectConclusionObj
      ? this.autoOpenProtectConclusionObj
      : this.selectedTableData[0]
    if ( curObj.type === 'MANUAL' ) {
      this.themenConclusionArrObj = [
        {
          conclusionCsc: "01",
          conclusionName: "待定",
        },
        {
          conclusionCsc: "02",
          conclusionName: "通过",
        },
        {
          conclusionCsc: "04",
          conclusionName: "不通过",
        },
      ]
    }else{
      this.themenConclusionArrObj=[
        {
          conclusionCsc: "01",
          conclusionName: "待定",
        },
        {
          conclusionCsc: "02",
          conclusionName: "通过",
        },
        {
          conclusionCsc: "03",
          conclusionName: "预备会议通过",
        },
        {
          conclusionCsc: "04",
          conclusionName: "不通过",
        },
        {
          conclusionCsc: "05",
          conclusionName: "Last Call",
        },
        {
          conclusionCsc: "06",
          conclusionName: "分段定点",
        },
      ]
    }
    if (curObj.conclusionCsc === '05') {
      this.getUpdateDateTableList('Pre CSC', 'init')
    }
    if (curObj.conclusionCsc === '06') {
      this.getUpdateDateTableList('CSC', 'init')
    }
    if (curObj.fixedPointApplyType == 20) {
      this.themenConclusionArrObj = this.themenConclusionArrObj.filter(
        (item) => {
          return item.conclusionCsc !== '03' && item.conclusionCsc !== '04'
        }
      )
    }
    
    //判断MANUAL --临时议题    GP  --上会议题  结论不一样
    console.log(curObj.type);

    // if (curObj.type == "MANUAL") {
    //   themenConclusionArrObjALL:[
    //     {
    //       conclusionCsc: "01",
    //       conclusionName: "待定",
    //     },
    //     {
    //       conclusionCsc: "02",
    //       conclusionName: "通过",
    //     },
    //     {
    //       conclusionCsc: "04",
    //       conclusionName: "不通过",
    //     },
    //   ]
    // }else{
    //   themenConclusionArrObj:[
    //     {
    //       conclusionCsc: "01",
    //       conclusionName: "待定",
    //     },
    //     {
    //       conclusionCsc: "02",
    //       conclusionName: "通过",
    //     },
    //     {
    //       conclusionCsc: "03",
    //       conclusionName: "预备会议通过",
    //     },
    //     {
    //       conclusionCsc: "04",
    //       conclusionName: "不通过",
    //     },
    //     {
    //       conclusionCsc: "05",
    //       conclusionName: "Last Call",
    //     },
    //     {
    //       conclusionCsc: "06",
    //       conclusionName: "分段定点",
    //     },
    //   ]
    // }
  },
  watch: {
    'ruleForm.isFrozenRs': {
      handler(bol) {
        if (!bol) {
          this.$nextTick(() => {
            this.$refs['slider'].style.transform = 'translate(-1.25rem,-50%)'
            this.$refs['slider'].parentNode.style.backgroundColor = '#ccc'
            this.$refs['slider'].style.transition = '0.2s'
            this.$nextTick(() => {
              this.$refs['sliderText'].style.transition = '0.2s'
              this.$refs['sliderText'].style.transform = 'translate(1.25rem,0)'
            })
          })
        } else {
          this.$nextTick(() => {
            this.$refs['slider'].style.transform = 'translateY(-50%)'
            this.$refs['slider'].parentNode.style.backgroundColor = '#1663f6'
            this.$refs['slider'].style.transition = '0.2s'
            this.$nextTick(() => {
              this.$refs['sliderText'].style.transition = '0.2s'
              this.$refs['sliderText'].style.transform = 'translate(0.5rem,0)'
            })
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {  
    this.getList()
    this.getDate()
    this.getCurrency()
    this.getRelateCommon()
  },
  methods: {
    //货币下拉框
    getCurrency(){
      const params = {
        id:this.selectedTableData[0].id//议题id
      }
      getCscCurrencyList(params).then((res) => {
        if (res == '') {
          this.currencyS.push({ destCurrency: 'RMB', destCurrency: 'RMB' })
        }else{
          this.currencyS=res
        }
        
      })
    },
    // 列表   findGpBidderInfoByThemenId
    getList(){
      const params = {
      //  meetingId:this.$route.query.id,//会议id
       themenId:this.selectedTableData[0].id//议题id
      }
      findGpBidderInfoByThemenId(params).then((res) => {
        console.log(res);
        this.tableDataList=res
        this.handleIntercept()
      })
    },
    // form表单   findGpInfoByThemenId
    getDate(){
      const params = {
      //  meetingId:this.$route.query.id,//会议id
       themenId:this.selectedTableData[0].id//议题id
      }
      findGpInfoByThemenId(params).then((res) => {
        console.log(res)
        this.fromData=res
        //判断是否显示图标
        //判断图标
        // 最低金额  lowerLimitMoney    最高金额  upperLimitMoney
        console.log(res.upperLimitMoney,res.lowerLimitMoney);
        if (res.price !== null) {
          if (res.price > res.upperLimitMoney) {
            this.iconShowA =true
          }
          if (res.price < res.lowerLimitMoney){
            this.iconShowB =true
          }
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selectedRow=val
      this.curChooseArr = [...val]
      this.currentRow = val[val.length - 1]
    },
    // 提交 endCscThemen
    handleSure(){
      console.log(this.selectedRow);
      const params = {
       conclusion: this.ruleForm.conclusion,//结论
       meetingId:this.$route.query.id,//会议id
       result:this.fromData.result,//任务
       themenId:this.selectedTableData[0].id,//议题id
       isLoi: this.fromData.isFrozenRs ,   //是否发送loi审批
       bidderInfoDTOList: this.selectedRow,  //列表数据当前行
      }
      console.log(params);
      endCscThemen(params).then((res) => {
        if (res.code) {
          iMessage.success('结束议题成功！')
          this.$emit('flushTable')
          this.$emit('close')
          this.close()
        }else{
          iMessage.success('结束会议失败！')
        }
      })

    },
    handleCancel() {
      this.close()
    },
    changeConclusion(e) {
      console.log(e);
      // '01': '待定',  01
      //   '02': '通过', 08
      //   '03': '预备会议通过', 09
      //   '04': '不通过', 10
      //   '05': 'Last Call', 11
      //   '06': '分段待定' 12
      // if (e.conclusionCsc == '01' || e.conclusionCsc == '06') {
      //   // 只有结论和任务
      //   this.showIFormItemRS= false
      //   this.showIFormItemList= false
      //   this.showIFormItemelform= false
      //   this.fromData.result=''//任务
      //   this.fromData.isFrozenRs=''  //是否发送loi审批
      // }else if(e.conclusionCsc == '05' ){
      //   // 结论 任务 列表
      //   this.showIFormItemRS= false
      //   this.showIFormItemList= true
      //   this.showIFormItemelform= false
      //   this.fromData.result=''//任务
      //   this.fromData.isFrozenRs=''  //是否发送loi审批
      // }else if(e.conclusionCsc == '04' || e.conclusionCsc == '02'){
      //   // 结论 任务 LOi
      //   this.showIFormItemRS= true
      //   this.showIFormItemList= false
      //   this.showIFormItemelform= true
      //   this.fromData.result=''//任务
      //   this.fromData.isFrozenRs=''  //是否发送loi审批
      // }
      // if(e.conclusionCsc == '03'){
      //   this.showIFormItemRS= false
      //   this.showIFormItemelform= true
      //   this.fromData.result=''//任务
      //   this.fromData.isFrozenRs=''  //是否发送loi审批
      // }
      // ------------------
      if (e == '01' || e == '12') {
        // 只有结论和任务
        this.showIFormItemRS= false
        this.showIFormItemList= false
        this.showIFormItemelform= false
        this.fromData.result=''//任务
        this.fromData.isFrozenRs=false //是否发送loi审批
      }else if(e == '11' ){
      // 结论 任务 列表
        this.showIFormItemRS= false
        this.showIFormItemList= true
        this.showIFormItemelform= false
        this.fromData.result=''//任务
        this.fromData.isFrozenRs=false  //是否发送loi审批
      }else if(e == '10' || e == '08'){
      // 结论 任务 LOi
        this.showIFormItemRS= true
        this.showIFormItemList= false
        this.showIFormItemelform= true
        this.fromData.result=''//任务
        this.fromData.isFrozenRs=false  //是否发送loi审批
      }
      if(e == '09'){
        this.showIFormItemRS= false
        this.showIFormItemelform= true
        this.fromData.result=''//任务
        this.fromData.isFrozenRs=false  //是否发送loi审批
      }


    },
    //获取日期改期的更新的表格数据
    async getUpdateDateTableList(str, str2) {
      const curObj = this.autoOpenProtectConclusionObj
        ? this.autoOpenProtectConclusionObj
        : this.selectedTableData[0]
      let param = {
        pageNum: 1,
        pageSize: 10,
        states: ['02', '03'],
        meetingId: this.meetingInfo.id,
        themenId: curObj.id,
        startDateBegin: dayjs(new Date()).format('YYYY-MM-DD'),
        meetingTypeNames: [str]
      }
      await this.queryMettingList(param, str2).then(() => {
        this.currentRow = {}
      })
    },
    //会议改期调取会议大厅列表
    async queryMettingList(e, str2) {
      const curObj = this.autoOpenProtectConclusionObj
        ? this.autoOpenProtectConclusionObj
        : this.selectedTableData[0]
      const res = await getMettingList(e)
      this.tableListData = res.data
      if (str2 === 'init') {
        this.currentRow = this.tableListData.find((item) => {
          return item.id === curObj.toDoMeeting
        })
      }
    },
    close() {
      this.$emit('closeDialog', false)
      this.$emit('flushTable')
    },
    handleSwitch() {
      this.fromData.isFrozenRs = !this.fromData.isFrozenRs
    },
    //获取会议字段截取  meetingTypeName
    // gpMeetingService/findById
    handleIntercept(){
      const data = {
        id:this.$route.query.id
      }
      findThemenById(data).then((res) => {
          console.log(res.meetingTypeName);
      })

    },
    // 结论下拉框字段 findThemenConclusion
    getConclusion(){
      const data = {
        id:this.meetingInfo.meetingTypeId
      }
      findThemenConclusion(data).then((res) => { 
          this.relateCommon(res)
      })

    },
    relateCommon(data){
      this.conclusionCscAll=[]
          data.forEach(x => {
           themenConclusionArrObj.forEach(y=>{
              if (x==y.conclusionCsc) {
                this.conclusionCscAll.push({value:x,name:y.conclusionName})
              }
            })
          });
    },
    getRelateCommon(){
      console.log('进啦了GP');
      if (curObj.type=="MANUAL") {
      this.relateCommon(['08','01','10'])
      }else{
        this.getConclusion()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.commonTablediv{
  margin-bottom: 20px;
}
::v-deep .el-table__header {
  // background-color: #fff;
  .el-table-column--selection {
    .el-checkbox__inner {
      display: none;
    }
  }
  .cell {
    color: #333333;
    font-size: 14px;
    font-weight: 400;
     span {
      /* display: block; */
      width: 100%;
      text-align: right!important;
    }
  }
}
.button-list {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 65px;
  .sure {
    width: 100px;
  }
  .cancel {
    margin-left: 30px;
    width: 100px;
  }
}
.switch-content {
  display: flex;
  align-items: center;
  height: 22px;
  .freeze {
    width: 84px;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    white-space: nowrap;
  }
  .swicth {
    margin-left: 30px;
    position: relative;
    width: 42px;
    height: 22px;
    background-color: #1663f6;
    border-radius: 11px;
    .text {
      width: 12px;
      height: 22px;
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;
      line-height: 22px;
      transform: translateX(8px);
    }
    .circle {
      cursor: pointer;
      top: 50%;
      right: 1px;
      transform: translateY(-50%);
      position: absolute;
      height: 20px;
      width: 20px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}
.operate {
  display: flex;
  height: 35px;
  align-items: center;
  .operate-select {
    height: 35px;
    width: 240px;
    margin-left: 30px;
  }
  .conclusion {
    width: 32px;
    height: 35px;
    font-size: 16px;
    font-weight: 400;
    line-height: 35px;
  }
  .required-icon {
    /* position: absolute; */
    margin-left: 4px;
    margin-right: 35px;
    color: red;
    /* top: 50%; */
    /* transform: translate(-10px, -50%); */
  }
}
.operate-selectALL {
    height: 35px;
    width: 240px;
  }
.next-meeting {
  .operate-select {
    height: 35px;
    width: 240px;
  }
  .operate-title {
    margin-bottom: 10px;
  }
  .conclusion {
    width: 32px;
    height: 28px;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
  }
  .required-icon {
    /* position: absolute; */
    margin-left: 4px;
    margin-right: 35px;
    color: red;
    /* top: 50%; */
    /* transform: translate(-10px, -50%); */
  }
}
::v-deep .task-input {
  width: 798px;
  height: 170px;
  border-radius: 4px;
  border: dashed 1px #e4e7ee;
  background: #ffffff;
  .el-textarea__inner {
    resize: none !important;
    width: 100%;
    height: 100%;
  }
}
.task-title {
  width: 32px;
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  white-space: nowrap;
  color: #4d4f5c;
}
.iconWid{
  position:absolute;
  bottom: 10px;
  right: 20px;
  background-color: red;
  color:#fff;
  width: 18px;
  line-height:18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  padding-left:1px;
  display: inline-block;
}
::v-deep .el-form-item__error{
  color: #EF3737;
    font-size: 0.75rem;
    line-height: 1;
    padding-top: 0.25rem;
    position: absolute;
    top: 100%;
    left: 28px;
}
</style>
