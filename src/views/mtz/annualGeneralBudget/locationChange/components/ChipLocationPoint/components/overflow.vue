<!--
 * @Author: your name
 * @Date: 2021-10-28 14:51:25
 * @LastEditTime: 2022-03-02 18:01:50
 * @LastEditors: Please set LastEditors
 * @Description: 公共步骤条封装
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\commonFlow.vue
-->
<template>
  <div>
    <div slot="header" class="flex-between-center" style="width: 100%">
      <!-- <span class="title_name">MTZ申请单-100386 申请单名-采购员-科室</span> -->
      <div>
        <span class="title_name">{{ commonTitle }}-{{ locationId }}</span>
        <span class="title_name">-{{ appName }}-{{ user }}-{{ dept }}</span>
        <div class="title_type">
          <div class="title_block">
            <span>申请单类型：</span>
            <iSelect
              :disabled="!canEdit"
              v-model="formInfo.workflowType"
              :placeholder="language('QINGXUANZE', '请选择')"
              @change="saveEdit($event)"
            >
              <el-option
                :value="item.code"
                :label="item.message"
                v-for="item in flowTypeList"
                :key="item.code"
              ></el-option>
            </iSelect>
          </div>
        </div>
      </div>
      <div class="opration">
        <template v-if="formInfo.status == 'PASS'">
          <iButton
            @click="submitPass"
            v-show="locationNow == 3 && meetingNumber == 0"
            >{{ language('TIJIAO', '提交') }}</iButton
          >
        </template>
        <template v-else>
          <iButton
            @click="submit"
            v-show="locationNow == 3 && meetingNumber == 0"
            :disabled="!canEdit"
            >{{ language('TIJIAO', '提交') }}</iButton
          >
        </template>
        <iButton @click="downRS">{{ language('YULAN', '预览') }}</iButton>
      </div>
    </div>
    <div class="stepBoxMap" v-if="meetingNumber == 0">
      <div class="stepBox">
        <div
          class="stepBox_div"
          v-for="(item, index) in topImgList"
          :key="index"
          @click="handleClickStep(item)"
        >
          <img
            class="car_img"
            :src="
              Number(locationNow - index - 1) > 0
                ? require('@/assets/images/icon/bingo.png')
                : Number(locationNow - index - 1) == 0
                ? require('@/assets/images/icon/car-conduct.png')
                : require('@/assets/images/icon/car-bingo.png')
            "
            :fit="fit"
          />
          <span
            :class="Number(locationNow - index - 1) < 0 ? 'car_span_color' : ''"
            >{{ language(item.key, item.name) }}</span
          >
        </div>
      </div>
      <hr width="100%" style="border: 1px dashed #cdd3e2; height: 1px" />
      <hr
        :width="(locationNow - 1) * 50 + '%'"
        style="border: 1px dashed #1660f1; height: 1px"
      />
      <hr
        :width="(locationNow - 2) * 50 + '%'"
        style="border: 1px solid #1660f1; height: 1px"
      />
    </div>
    <iDialog
      :title="language('XUANZEHUIYI', '选择会议')"
      :visible.sync="mtzAddShow"
      v-if="mtzAddShow"
      width="90%"
      @close="closeDiolog"
    >
      <subSelect @close="closeBingo"></subSelect>
    </iDialog>
    <iDialog
      :title="language('DAOCHURS', '导出RS')"
      :visible.sync="rsType"
      v-if="rsType"
      width="99%"
      @close="closeRS"
    >
      <template slot="title">
        <div class="title-box">
          <span class="el-dialog__title">
            {{ language('DAOCHURS', '导出RS') }}
          </span>
          <iButton class="export" @click="downPdf">{{
            language('DAOCHUPDF', '导出PDF')
          }}</iButton>
        </div>
      </template>
      <mtz
        @close="closeType"
        :RsType="downType"
        :appStatus="appStatus"
        key="rsPdf"
        ref="rsPdf"
        :baseData="baseData"
      ></mtz>
    </iDialog>
    <iDialog
      :title="language('芯片补差新增', '芯片补差新增')"
      :visible.sync="beforeReturn"
      class="tttttt"
      v-if="beforeReturn"
      width="25%"
      @close="beforeReturn = true"
    >
      <MtzAdd @close="closeTyoe"></MtzAdd>
    </iDialog>
    <div class="margin-top20">
      <router-view
        :baseData="baseData"
        @getAppById="getAppById"
        :appStatus="appStatus"
      />
    </div>
  </div>
</template>

<script>
import { iButton, iDialog, iMessage, iMessageBox, iSelect } from 'rise'
import { topImgList } from './data'
import subSelect from './subSelect'
import mtz from './decisionMaterial/components/mtz'
import MtzAdd from './MtzAdd'
import store from '@/store'
import { syncAuther } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/approve'
import {
  updateApp,
  getAppById,
  getLocationApplyStatus,
  getFlowTypeList,
  submit
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import {
  NewMessageBox,
  NewMessageBoxClose
} from '@/components/newMessageBox/dialogReset.js'
import { deepClone } from './applyInfor/util'
export default {
  components: {
    iButton,
    iDialog,
    subSelect,
    mtz,
    MtzAdd,
    iSelect
  },
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      locationId: '',
      appName: '',
      user: '',
      dept: '',
      topImgList,
      locationNow: this.$route.query.stepNum || 1,
      mtzAddShow: false,
      rsType: false,
      downType: true,
      beforeReturn: false,
      appStatus: '',
      stepNum: 1,
      meetingNumber: Number(this.$route.query.meeting) || 0,
      flowTypeList: [],
      formInfo: {},
      pageTitle: {
        title: ''
      },
      baseData: {}
    }
  },
  computed: {
    commonTitle() {
      // 芯片补差申请单-100386 申请单名-采购员-科室
      return this.language('CHIPBUCHASHENGQINGDAN', '芯片补差申请单')
    },
    canEdit() {
      // 草稿，已提交，不通过状态可以编辑
      return ['NEW', 'NOTPASS'].includes(this.formInfo.status)
      // return ['NEW', 'NOTPASS', 'SUBMIT'].includes(this.formInfo.status)
    }
  },

  provide() {
    return { pageTitle: this.pageTitle }
  },
  async created() {
    await this.getLocationApplyStatus()
    this.appId = this.$route.query.appId
    if (this.appId) {
      this.beforeReturn = false
      this.getAppById(this.appId)
    } else {
      this.beforeReturn = true
    }
    getFlowTypeList({}).then((res) => {
      this.flowTypeList = res.data
    })
  },
  methods: {
    setStepNum() {
      if (this.$route.query.stepNum) return
      let step = 1
      const step1 = ['NEW']
      const step2 = ['']
      const step3 = [
        'SUBMIT',
        'APPROVAL_LOADING',
        'NOTPASS',
        'PASS',
        'WAIT_APPROVAL',
        'APPROVED',
        'REJECT_APPROVALED',
        'CHECK_INPROCESS',
        'CHECK_PASS',
        'CHECK_FAIL',
        'FREERE',
        'UNFREEZE',
        'M_CHECK_INPROCESS',
        'M_CHECK_FAIL',
        'M_CHECK_PASS',
        'NOMINATE',
        'ONFLOW',
        'FLOWED',
        'FLOWED_FAIL'
      ]
      const step4 = []
      if (step1.includes(this.formInfo.status)) {
        this.locationNow = 1
        step = 1
      } else if (step2.includes(this.formInfo.status)) {
        this.locationNow = 2
        step = 2
      } else if (step3.includes(this.formInfo.status)) {
        this.locationNow = 3
        step = 3
      } else if (step4.includes(this.formInfo.status)) {
        this.locationNow = 3
        step = 3
      }
      const data = this.topImgList[step - 1]
      var dataList = this.$route.query
      var stepNum = this.$route.query.stepNum || 1
      this.$router.push({
        path: data.url,
        query: {
          ...dataList,
          currentStep: data.id,
          stepNum: stepNum > data.id ? stepNum : data.id,
          appName: this.appName,
          user: this.user,
          dept: this.dept,
          appId: this.$route.query.appId
        }
      })
    },
    // 申请单状态
    async getLocationApplyStatus() {
      getLocationApplyStatus({}).then((res) => {
        this.statusList = res.data
      })
    },
    getStatus(status) {
      return (
        this.statusList?.find((item) => item.code == status)?.message || status
      )
    },
    submitPass() {
      submit({
        appId: this.$route.query.appId
      }).then((res) => {
        if (res.result && res.code == 200) {
          iMessage.success(this.language(res.desEn, res.desZh))

          var data = deepClone(JSON.parse(sessionStorage.getItem('MtzLIst')))
          data.refresh = true
          store.commit('routerMtzData', data)
          sessionStorage.setItem('MtzLIst', JSON.stringify(data))
          console.log('submitRequest')
          this.getAppById()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    saveEdit() {
      const params = {
        chipDetailList: this.baseData.chipDetailList,
        chipAppBase: this.formInfo
      }
      updateApp(params).then((res) => {
        iMessage.success(this.language('BAOCUNCHENGGONG', '保存成功！'))
        this.getAppById()
      })
    },
    handleSync(params) {
      syncAuther({
        mtzAppId:
          this.$route.query.mtzAppId ||
          JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
        tag: params || ''
      }).then((res) => {
        if (res?.code === '200') {
          // iMessage.success(res.desZh)
        } else {
          // iMessage.error(res.desZh)
        }
      })
    },
    getAppById() {
      getAppById({
        appId: this.$route.query.appId
      }).then((res) => {
        let data = res.data.chipAppBase
        data.statusDesc = this.getStatus(data.status)
        this.locationId = data.appNo
        this.$set(this, 'formInfo', data)
        this.appStatus = this.getStatus(data.status)
        this.appName = data.appName
        this.user = data.linieName
        this.dept = data.depteCode
        this.baseData = res.data
        this.baseData.chipDetailList.forEach((item) => {
          item.supplier = item.sapCode + '-' + item.supplierName
        })
        this.setStepNum()
      })
    },
    closeType() {
      this.closeRS()
    },
    closeRS() {
      this.rsType = false
    },
    downRS() {
      this.rsType = true
      this.downType = true
      this.pageTitle.title =
        this.commonTitle +
        '-' +
        ((this.locationId && this.locationId) || '') +
        '-' +
        ((this.appName && this.appName) || '') +
        '-' +
        ((this.user && this.user) || '') +
        '-' +
        ((this.dept && this.dept) || '')
    },

    // 提交
    submit() {
      if (this.baseData.chipDetailList.length == 0) {
        return iMessage.warn(
          this.language('芯片补差规则不能为空', '芯片补差规则不能为空')
        )
      }
      if (this.baseData.chipAppBase.workflowType !== 'FILING') {
        //上会/流转
        if (this.baseData.approveList.length < 1) {
          iMessage.error(
            this.language('ZANWUSHENPIRENXINXI', '暂无审批人信息！')
          )
        } else {
          if (this.baseData.chipAppBase.workflowType === 'MEETING') {
            //上会
            this.mtzAddShow = true
          } else if (this.baseData.chipAppBase.workflowType === 'SIGN') {
            //流转
            this.submitRequest()
          }
        }
      } else {
        submit({
          appId: this.$route.query.appId
        }).then((res) => {
          if (res.result && res.code == 200) {
            iMessage.success(this.language(res.desEn, res.desZh))
            this.getAppById()
          } else {
            iMessage.error(res.desZh)
          }
        })
      }
    },
    submitRequest() {
      NewMessageBox({
        title: this.language('LK_WENXINTISHI', '温馨提示'),
        Tips: this.language('SHIROUQUERENTIJIAO', '是否确认提交？'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        confirmButtonText: this.language('QUEREN', '确认')
      }).then(() => {
        submit({
          appId: this.$route.query.appId
        }).then((res) => {
          if (res.result && res.code == 200) {
            iMessage.success(this.language(res.desEn, res.desZh))
            this.getAppById()
          } else {
            iMessage.error(res.desZh)
          }
        })
      })
    },
    // 点击步骤
    handleClickStep(data) {
      console.log(data)
      if (this.$route.query.currentStep == data.id) return false
      // 跳转步骤在当前步骤之后，提示保存数据
      console.log(data.id)
      console.log(this.stepNum)
      const stepNum = this.$route.query.stepNum || 1
      if (data.id > stepNum) {
        iMessageBox(
          this.language('QQDSJYJWQBC', '请确定数据已经完全保存？'),
          this.language('LK_WENXINTISHI', '温馨提示'),
          {
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消')
          }
        ).then((res) => {
          // setMtzAppCheckVO({
          //   appId: this.$route.query.appId,
          //   isDone: true,
          //   stepStr: data.id
          // }).then((res) => {
          var dataList = this.$route.query
          this.$router.push({
            path: data.url,
            query: {
              ...dataList,
              currentStep: data.id,
              stepNum: stepNum > data.id ? stepNum : data.id,
              appName: this.appName,
              user: this.user,
              dept: this.dept
            }
          })
          // })
        })
      } else {
        var dataList = this.$route.query
        this.$router.push({
          path: data.url,
          query: {
            ...dataList,
            currentStep: data.id,
            stepNum: stepNum > this.locationNow ? stepNum : this.locationNow,
            appName: this.appName,
            user: this.user,
            dept: this.dept
          }
        })
      }
    },
    closeDiolog() {
      this.mtzAddShow = false
    },
    closeBingo(val) {
      this.closeDiolog()
      if (val == 'refresh') {
        this.getAppById()
      }
    },
    closeTyoe() {
      this.beforeReturn = false
    },
    // 导出PDF
    downPdf() {
      this.$refs.rsPdf.downPdf()
    }
  },
  destroyed() {
    NewMessageBoxClose()
  }
}
</script>

<style lang='scss' scoped>
.title-box {
  display: flex;
  justify-content: space-between;
  .export {
    margin-right: 20px;
  }
}
.title_name {
  font-size: 20px;
  font-weight: bold;
}
.opration {
  margin-right: 20px;
}
.stepBoxMap {
  width: 100%;
  height: 85px;
  margin: 30px auto 0;
  position: relative;
  hr {
    position: absolute;
    top: 23%;
  }
}
.stepBox {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .stepBox_div {
    text-align: center;
    width: 14%;
    background: #f8f9fa;

    .car_img {
      width: 45px;
      display: block;
      margin: 0 auto;
      cursor: pointer;
    }
    span {
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      margin-top: 10px;
      color: #5d5d5d;
    }
    .car_span_color {
      color: #cdd3e2 !important;
    }
  }
}

.tttttt {
  ::v-deep .el-dialog__headerbtn {
    display: none;
  }
}

.title_type {
  margin-left: 50px;
  display: inline-block;

  .title_block {
    display: flex;
    align-items: center;
  }

  .el-select {
    width: auto !important;
  }
}
</style>
