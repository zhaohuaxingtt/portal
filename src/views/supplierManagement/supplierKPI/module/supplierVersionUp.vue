<template>
  <div class="page">
    <iCard>
      <div class="title">
        <span class="blod">{{ infoData.name }}</span>
        <span>统计周期: {{ infoData.statisticsEndDate }}-{{ infoData.statisticsEndDate }}</span>
        <span>截止时间: {{ infoData.endDate }}(距离截止日期还有{{ DateDiffer(infoData.endDate) }}天）</span>
        <span class="link" @click="dowload(allData.fileId)">{{ allData.fileName }}</span>
      </div>
    </iCard>
    <iCard style="margin-top: 20px">
      <el-steps finish-status="success" align-center :active="active">
        <el-step title="绩效模型确认"></el-step>
        <el-step title="上传手工指标结果"></el-step>
        <el-step title="评分调整"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <supplierIndexManage @back="back" :infoData="infoData" @submit0="submit0" @getallData="getallData" :isShow="false"
        v-if="active == 0">
      </supplierIndexManage>
      <supplierVersionTable @back="back" :infoData="infoData" @submit12="submit12" :isShow="false" v-if="active == 1 || active == 2"
        :active="active"></supplierVersionTable>
      <Completed  @back="back" :infoData="infoData" v-if="active == 3"> </Completed>
    </iCard>
  </div>
</template>

<script>
import Completed from './Completed'
import { getPerformanceEdition, updateSupplierPerforManceModel } from '@/api/supplierManagement/supplierIndexManage/index'
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
  data() {
    return {
      active: 0,
      allData: {},
      infoData: {}
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
    init() {
      getPerformanceEdition(this.$route.query.editionId).then(res => {
        this.infoData = res.data
        console.log(this.DateDiffer(this.infoData.endDate))

      })
    },
    back(){
      this.active=this.active-1
    },
    getallData(val) {
      console.log(val)
      this.allData = val
    },
    submit0() {
      if (this.infoData.modelId != this.allData.modelId) {
        this.infoData.modelId = this.allData.modelId
        updateSupplierPerforManceModel(this.infoData).then(res => {
          if (res.code == 200) {
            this.active = 1
          } else {
            iMessage.error(`${this.$i18n.locale === "zh" ? res.desZh : res.desEn}`)
          }
        })
      } else {
        this.active = 1
      }

    },
    submit12() {
      this.active = this.active + 1
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
