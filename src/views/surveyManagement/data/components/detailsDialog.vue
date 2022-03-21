<template>
  <iDialog
    :title="$t('QN_WENJUANSHUJU')"
    :visible.sync="openFileDetailsBol"
    width="108.75rem"
    :close-on-click-modal="false"
  >
    <div class="conatiner">
      <div class="button-list">
        <iButton @click="domnloadAllFiles" class="margin-right20">{{
          $t('QN_XIAZAIQUANBUWENJIAN')
        }}</iButton>
        <iButton @click="exportAllDetails" class="margin-right20">{{
          $t('QN_FANHUI')
        }}</iButton>
        <iButton @click="exportReport" class="margin0">{{
          $t('QN_DAOCHUBAOGAO')
        }}</iButton>
        <div class="empty"></div>
        <div class="goback" @click="goback">
          <i class="el-icon-arrow-left"></i>
        </div>
      </div>
      <iEditForm>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          :hideRequiredAsterisk="true"
          class="form-box"
        >
          <iFormItem prop="userType">
            <div class="operate">
              <iLabel
                :label="$t('QN_YONGHULEIXING')"
                slot="label"
                class="operate-name"
              ></iLabel>
              <iSelect
                v-model="ruleForm.userType"
                :placeholder="$t('QN_QUANBUYONGHU')"
                @change="changeUserType($event)"
                class="operate-select"
              >
                <el-option
                  :value="item.value"
                  :label="$t(item.i18n)"
                  v-for="item of presentList"
                  :key="item.value"
                ></el-option>
              </iSelect>
            </div>
          </iFormItem>
        </el-form>
      </iEditForm>
      <div class="table-area">
        <iTableML tooltip-effect="light" :data="tableData" class="table-ml">
          <el-table-column
            show-overflow-tooltip
            type="index"
            align="center"
            :label="$t('QN_XUHAO')"
            width="60"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            :label="$t('QN_YONGHULEIXING')"
            width="100"
            ><template slot-scope="scope">
              <span>{{
                $t(presentListObj[scope.row['userType']]) || '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            :label="$t('QN_LIANXIRENXINGMING')"
            width="120"
            ><template slot-scope="scope">
              <span>{{ scope.row['nameZh'] || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            :label="$t('QN_YONGHUDENGLUMING')"
            width="120"
            ><template slot-scope="scope">
              <span>{{ scope.row['userName'] || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            :label="$t('QN_GONGYINGSHANGHUOBUMENMINGCHENG')"
            width="180"
            ><template slot-scope="scope">
              <span>{{ scope.row['department'] || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            :label="$t('QN_YOUXIANG')"
            ><template slot-scope="scope">
              <span>{{ scope.row['email'] || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            :label="$t('QN_SAPHAO')"
            width="140"
            ><template slot-scope="scope">
              <span>{{
                (scope.row.supplierUserDTO &&
                  scope.row.supplierUserDTO['sapNum']) ||
                '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
          :label="$t('QN_SVWHAO')"
            width="140"
          >
            <template slot-scope="scope">
              <span>{{
                (scope.row.supplierUserDTO &&
                  scope.row.supplierUserDTO['svwCode']) ||
                '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            :label="$t('QN_LINSHIHAO')"
            width="140"
            ><template slot-scope="scope">
              <span>{{
                (scope.row.supplierUserDTO &&
                  scope.row.supplierUserDTO['temporaryNum']) ||
                '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            :label="$t('QN_WENJIANXIAZAI')"
            width="100"
          >
            <template slot-scope="scope">
              <span class="open-link-text" @click="handleDownLoad(scope.row)">{{
                $t('QN_XIAZAI')
              }}</span>
            </template>
          </el-table-column>
        </iTableML>
      </div>
    </div>
  </iDialog>
</template>
<script>
import { iDialog, iButton, iSelect, iMessage, iFormItem, iLabel } from 'rise'
import iTableML from '@/components/iTableML'
import { questionReportDetail } from '@/api/survey/surveyData.js'
import { download } from '@/utils/downloadUtil'
import iEditForm from '@/components/iEditForm'
import { exportFile } from '@/utils/exportFileUtil'
import store from '@/store'
export default {
  components: {
    iDialog,
    iButton,
    iTableML,
    iSelect,
    iFormItem,
    iLabel,
    iEditForm
  },
  data() {
    return {
      tableData: [],
      userTypeList: {},
      ruleForm: {
        userType: ''
      },
      presentList: [
        {
          label: '全部用户',
          value: '',
          i18n: 'QN_QUANBUYONGHU'
        },
        {
          label: '员工用户',
          value: 1,
          i18n: 'QN_YUANGONGYONGHU'
        },
        {
          label: '供应商用户',
          value: 2,
          i18n: 'QN_GONGYINGSHANGYONGHU'
        }
      ],
      presentListObj: {
        1: 'QN_YUANGONGYONGHU',
        2: 'QN_GONGYINGSHANGYONGHU'
      }
    }
  },
  props: {
    openFileDetailsBol: {
      type: Boolean,
      default: false
    },
    fileDetails: {
      type: Object,
      default() {
        return {}
      }
    },
    surveyId: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    changeUserType(e) {
      this.ruleForm.userType = e
      this.query()
    },
    handleDownLoad(row) {
      console.log(row)
      const answerItems = row.answer.split('.')
      download({
        fileIds: answerItems?.[0],
        type: answerItems?.[answerItems.length - 1],
        filename: answerItems?.[1],
        callback: (e) => {
          if (!e) {
            iMessage.error(this.$t('QN_XIAZAISHIBAI'))
          }
        }
      })
    },
    query() {
      const data = {
        surveyId: this.surveyId,
        questionId: this.fileDetails.id,
        userType: this.ruleForm.userType
      }
      questionReportDetail(data).then((res) => {
        this.allFileName = res.name
        this.tableData = [...res.answerDetails]
      })
    },
    goback() {
      this.$emit('backIndexDialog', 'file')
    },
    exportAllDetails() {
      // exportFile({
      //   url: "/rise-survey/surveyService/exportDetailReport",
      //   data: {
      //     // questionId: this.fileDetails.id,
      //     // surveyId: this.surveyId,
      //     // userType: this.ruleForm.userType,
      //     id:this.surveyId,
      //   },
      //   callback: (e) => {
      //     if (!e) {
      //       iMessage.error("导出失败");
      //     }
      //   },
      // });
      this.goback()
    },
    exportReport() {
      exportFile({
        url:
          process.env.VUE_APP_SURVEY +
          `/surveyService/exportQuestionReport?userId=` +
          store.state.permission.userInfo.id,
        // url: "/surveyApi/surveyService/exportQuestionReport",
        data: {
          questionId: this.fileDetails.id,
          surveyId: this.surveyId,
          userType: this.ruleForm.userType
        }
        // callback: (e) => {
        //   if (!e) {
        //     iMessage.error("导出失败");
        //   }
        // },
      })
    },
    domnloadAllFiles() {
      const fileNameids = this.tableData.map((item) => {
        return item.answer.split('.')[0]
      })
      const fileName = this.tableData[0].answer.split('.')
      const name = this.allFileName
      console.log(name, fileNameids, this.tableData)
      download({
        fileIds: fileNameids,
        filename: this.tableData.length == 1 ? fileName?.[1] : name,
        type:
          this.tableData.length == 1
            ? fileName?.[fileName.length - 1]
            : 'zip' || 'rar',
        callback: (e) => {
          if (!e) {
            iMessage.error(this.$t('QN_XIAZAISHIBAI'))
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.open-link-text {
  color: #1660f1;
}
::v-deep .el-dialog__headerbtn {
  display: none !important;
}

.conatiner {
  height: 925px;
  font-family: PingFangSC-Semibold, PingFang SC;
  padding-bottom: 40px;
  .table-area {
    height: 651px;
    overflow-y: auto;
  }
  .operate {
    display: flex;
    height: 35px;
    align-items: center;
    margin-bottom: 31px;
    .operate-select {
      height: 35px;
      width: 300px;
    }
    .operate-name {
      width: 124px;
      height: 35px;
      font-weight: 400;
      color: #000000;
      font-size: 16px;
      text-shadow: 0px 0px 8px rgba(45, 97, 213, 0.18);
      line-height: 35px;
    }
  }
  .button-list {
    position: absolute;
    width: 100%;
    height: 35px;
    right: 40px;
    text-align: right;
    transform: translate(0, -60px);
    .margin-right20 {
      width: 130px;
      margin-right: 20px;
    }
    .margin0 {
      width: 100px;
      margin: 0;
    }
    .empty {
      display: none;
      position: absolute;
      width: 30px;
      height: 30px;
      background-color: #fff;
      right: 0;
      top: 0;
      transform: translateX(50px);
      z-index: 1;
    }
    .goback {
      position: absolute;
      width: 60px;
      height: 60px;
      background: #1660f1;
      border-radius: 50%;
      top: 462.5px;
      left: 10px;
      cursor: pointer;
      color: #fff;
      text-align: center;
      line-height: 60px;
      font-size: 42px;
    }
  }
}
</style>
