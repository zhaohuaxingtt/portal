<template>
  <div class="page">
    <iCard>
      <div class="title">
        <span class="blod">{{ infoData.name }}</span>
        <span>统计周期: {{ infoData.statisticsStartDate }}-{{ infoData.statisticsEndDate }}</span>
        <el-date-picker v-if="isTime" style="width: 200px" value-format="yyyy-MM-dd hh:mm:ss" v-model="dataTime" type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        <span v-else>截止时间: {{ infoData.endDate }}(距离截止日期还有{{ DateDiffer(infoData.endDate) }}天）</span>
        <span  class="link" @click="dowload(allData.fileId)">{{ allData.fileName }}</span>
       <div>
        <!-- <iButton v-if="isTime==false&&DateDiffer(infoData.endDate)>=0" @click="isTime=!isTime">延期</iButton> -->
        <iButton v-if="isTime" @click="saveTime">保存</iButton>
        <iButton v-if="isTime" @click="canelTime">取消</iButton>
       </div>
      </div>
    </iCard>
    <iCard class="table-card" style="margin-top: 20px">
      <el-steps finish-status="success" align-center :active="active">
        <el-step title="绩效模型确认"></el-step>
        <el-step title="上传手工指标结果"></el-step>
        <el-step v-if="activeIs" title="评分调整"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- <supplierIndexManage @changeTab="changeTab" @back="back" :infoData="infoData" @submit0="submit0"
        @getallData="getallData" :isShow="false" >
      </supplierIndexManage> -->
      <viewPdf @submit0="submit0" v-if="active == 0" :src="protocolUrl" />

      <supplierVersionTable class="table-box" @back="back" :infoData="infoData" @submit12="submit12" :isShow="false"
        v-if="active == 1 || active == 2" :active="active"></supplierVersionTable>
      <Completed @back="back" :infoData="infoData" v-if="active == 3"> </Completed>
    </iCard>
  </div>
</template>

<script>
import viewPdf from './viewPdf'
import Completed from './Completed'
import {  modelList, delayEdition,getPerformanceEdition, updateSupplierPerforManceModel,submitPerformanceTask  } from '@/api/supplierManagement/supplierIndexManage/index'
import { downloadFileWithName } from '@/api/common'
import { pageMixins } from '@/utils/pageMixins'
import supplierIndexManage from '../supplierIndexManage'
import supplierVersionTable from './supplierVersionTable'
import {
  iMessage,
  iMessageBox,
  iPagination,
  iCard,
  iSearch,
  iButton,
  iInput,
  iSelect,
  iDatePicker,
  iDialog
} from 'rise'
export default {
  mixins: [pageMixins],

  components: {
    viewPdf,
    supplierVersionTable,
    Completed,
    supplierIndexManage,
    iCard,
    iPagination,
    iSearch,
    iButton,
    iInput,
    iSelect,
    iDatePicker,
    iDialog
  },
  props: {
    col: {
      type: Object
    }
  },
  computed: {
    // protocolUrl () {
    //   return process.env.VUE_APP_FILEAPI + '/fileud/getFileByFileId?isDown=false&fileId=' + (this.detailInfo.agreementAtachmentId || '')
    // },
  },
  data() {
    return {
      protocolUrl:'',
      dataTime:'',
      isTime:false,
      active: 0,
      allData: {},
      infoData: {},
      activeIs: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    DateDiffer(Date_end) {
      //date1结束时间
      let date1 = new Date(Date_end);
      //date2当前时间
      let date2 = new Date();
      date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
      const diff = date1.getTime() - date2.getTime(); //目标时间减去当前时间
      const diffDate = diff / (24 * 60 * 60 * 1000);  //计算当前时间与结束时间之间相差天数
      return diffDate
    },
    changeTab() {
      this.activeIs = false
    },
    init() {
      getPerformanceEdition(this.$route.query.editionId).then(res => {
        this.infoData = res.data
        this.dataTime=this.infoData.endDate
        console.log(this.DateDiffer(this.infoData.endDate))

      })
      modelList(false).then((res) => {
        const modelId=this.$route.query.modelId
        const fileId=res.data.find(val=>val.modelId==modelId).fileId
        console.log(res.data)
        this.protocolUrl=process.env.VUE_APP_FILEAPI + '/fileud/getFileByFileId?isDown=false&fileId=' + (fileId || '')
      })
    },
    back() {
      if (!this.activeIs && this.active == 3) {
        this.active = 1
      } else if (!this.activeIs) {
        this.active = 0
      } else {
        this.active = this.active - 1

      }

    },
    saveTime(){
      const req={
        id:this.$route.query.editionId,
        endDate:this.dataTime
      }
      delayEdition(req).then(res=>{
        if(res.code==200){
          this.init()
          this.isTime=false
          iMessage.success(res.desZh || '修改成功')
        }else{
          iMessage.error(`${this.$i18n.locale === "zh" ? res.desZh : res.desEn}`)
        }
      })
    },
    canelTime(){
      this.isTime=false
      this.dataTime=''
    },
    getallData(val) {
      console.log(val)
      this.allData = val
    },
    submit0() {
      // if (this.infoData.modelId != this.allData.modelId) {
      //   this.infoData.modelId = this.allData.modelId
      //   updateSupplierPerforManceModel(this.infoData).then(res => {
      //     if (res.code == 200) {
      //       this.active = 1
      //     } else {
      //       iMessage.error(`${this.$i18n.locale === "zh" ? res.desZh : res.desEn}`)
      //     }
      //   })
      // } else {
        this.active = 1
      // }

    },
    submit12() {
      if (!this.activeIs) {
        this.submitTask()
      } else {
        if (this.active == 2) {
          this.submitTask()
        } else {
          this.active = this.active + 1
        }
      }
    },
    submitTask() {
      submitPerformanceTask({id:this.$route.query.id}).then(res => {
        if (res.code == 200) {
          this.active = 3
          iMessage.success(res.desZh || '提交成功')
        } else {
          iMessage.error(`${this.$i18n.locale === "zh" ? res.desZh : res.desEn}`)
        }
      })
    },
    dowload(v) {
      const params = {
        fileIds: v,
        fileName: this.allData.fileName
      }
      downloadFileWithName(params)
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  padding: 20px;

  .el-steps {
    width: 50%;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 16px;
      font-weight: 400;
    }

    .blod {
      font-weight: bold;
    }

    .link {
      color: #1763f7;
      cursor: pointer;
    }
  }
}
</style>
