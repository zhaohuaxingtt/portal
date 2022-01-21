<!--
* @author:zbin
* @Date: 2021-4-13 16:57:20
* @Description: 基本信息
 -->
<template>
  <div class="home">
    <iCard tabCard
           collapse
           :title="$t('SUPPLIER_JIBENXINXI')">
      <iFormGroup :rules='baseRules'
                  :model="form"
                  ref="baseRulesForm"
                  row="3">
        <iFormItem prop='tsPpSupplierName'>
          <iLabel :label="$t('SPR_FRM_FXXH_FXGYS')"
                  :required="true"
                  slot="label"></iLabel>
          <div v-if="$route.query.flag==='creat'">
            <iInput v-model="form.tsPpSupplierName"
                    :placeholder="$t('SPR_FRM_FXXH_QSS')"></iInput>
            <div @click="handleSearch"
                 class="icon-search">
              <icon name='iconshaixuankuangsousuo'
                    symbol></icon>
            </div>
          </div>
          <iText v-else>{{form.tsPpSupplierName}}</iText>
        </iFormItem>
        <iFormItem>
          <iLabel :label="$t('SUPPLIER_SAPHAO')"
                  slot="label"></iLabel>
          <iText>{{form.sapCode}}</iText>
        </iFormItem>
        <iFormItem>
          <iLabel :label="$t('LK_SWHAO')"
                  slot="label"></iLabel>
          <iText>{{form.svwCode}}</iText>
        </iFormItem>
        <iFormItem>
          <iLabel :label="$t('SPR_FRM_FXXH_FXGYSSSKS')"
                  slot="label"></iLabel>
          <iText>{{form.existSectionName}}</iText>
        </iFormItem>
        <iFormItem>
          <iLabel :label="$t('SPR_FRM_FXXH_GHGX')"
                  slot="label"></iLabel>
          <iSelect :disabled="disabled"
                   v-model="form.supplyingRelationship">
            <el-option :value="item.code"
                       :label="item.name"
                       v-for="item of formGoup.supplyingRelationshipList"
                       :key="item.code"></el-option>
          </iSelect>
        </iFormItem>
        <iFormItem>
          <iLabel :label="$t('SPR_FRM_FXXH_TJSJ')"
                  slot="label"></iLabel>
          <iText>{{form.submitDateTime}}</iText>
        </iFormItem>
        <iFormItem>
          <iLabel :label="$t('SPR_FRM_FXXH_FKBM')"
                  slot="label"></iLabel>
          <iText>{{form.relativeDept}}</iText>
        </iFormItem>
        <iFormItem>
          <iLabel :label="$t('SPR_FRM_FXXH_XHLY')"
                  slot="label"></iLabel>
          <iText>{{form.signalFrom}}</iText>
        </iFormItem>
        <iFormItem>
          <iLabel :label="$t('SPR_FRM_FXXH_CZFS')"
                  slot="label"></iLabel>
          <iSelect :disabled="disabled||isFRM"
                   v-model="form.processType">
            <el-option :value="item.code"
                       :label="item.name"
                       v-for="item of formGoup.processTypeList"
                       :key="item.code"></el-option>
          </iSelect>
        </iFormItem>
        <iFormItem prop='riskBigType'>
          <iLabel :label="$t('SPR_FRM_FXXH_FXXHDL')"
                  :required="true"
                  slot="label"></iLabel>
          <iSelect :disabled="preliminaryAssessmentDisabled"
                   @change="handleRiskBigType"
                   v-model="form.riskBigType">
            <el-option :value="item.code"
                       :label="item.name"
                       v-for="item of formGoup.riskBigTypeList"
                       :key="item.code"></el-option>
          </iSelect>
        </iFormItem>
        <iFormItem prop='riskSmallType'>
          <iLabel :label="$t('SPR_FRM_FXXH_FXXHXL')"
                  :required="true"
                  slot="label"></iLabel>
          <iSelect :disabled="preliminaryAssessmentDisabled"
                   v-model="form.riskSmallType">
            <el-option :value="item.code"
                       :label="item.name"
                       v-for="item of formGoup.riskSmallTypeList"
                       :key="item.code"></el-option>
          </iSelect>
        </iFormItem>
        <iFormItem>
          <iLabel :label="$t('SPR_FRM_FXXH_SFWY')"
                  slot="label"></iLabel>
          <iSelect :disabled="disabled"
                   v-model="form.isBreak">
            <el-option :value="item.code"
                       :label="item.name"
                       v-for="item of formGoup.isBreakList"
                       :key="item.code"></el-option>
          </iSelect>
        </iFormItem>
        <iFormItem>
          <iLabel :label="language('PINGJIJIEGUO','评级结果')"
                  slot="label"></iLabel>
          <iText>
            <icon :name="form.furtherRatingResult==='红'?'iconhongdeng':form.furtherRatingResult==='绿'?'iconlvdeng':form.furtherRatingResult==='黄'?'iconhuangdeng':''"
                  symbol></icon>
          </iText>
        </iFormItem>
        <iFormItem prop='adjustScore'>
          <div slot="label"
               class="adjust">
            <iLabel slot="reference"
                    :label="$t('SPR_FRM_FXXH_TZF')"></iLabel>
            <el-popover trigger="hover"
                        placement="top-start">
              <div class="tip-box">
                <div class="tip-title">{{$t('SPR_FRM_XGYSPJ_SMSHCHJFCL')}}</div>
                <div class="tip-content"
                     v-html="$t('SPR_FRM_XGYSPJ_FCPGYSTCSVWYQHWJRSVW')"></div>
                <div class="tip-title">{{$t('SPR_FRM_XGYSPJ_FXXHJFYZ')}}</div>
                <div class="tip-content"
                     v-html="$t('SPR_FRM_XGYSPJ_BGZRZHSGFSDNCNBKFZLWT')"></div>
              </div>
              <icon slot="reference"
                    symbol
                    name="iconxinxitishi"
                    class="font-size16 marin-left5" />
            </el-popover>
          </div>
          <el-row type="flex"
                  justify="space-between">
            <el-col :span="9">
              <iSelect :disabled="disabled"
                       v-model="form.adjustDirection">
                <el-option :value="item.name"
                           :label="item.name"
                           v-for="item of formGoup.adjustDirectionList"
                           :key="item.name"></el-option>
              </iSelect>
            </el-col>
            <el-col :span="14">
              <iInput :disabled="disabled"
                      :placeholder="$t('SPR_FRM_FXXH_QSRZS')"
                      v-model="form.adjustScore"></iInput>
            </el-col>
          </el-row>
        </iFormItem>
        <iFormItem>
          <iLabel :label="$t('SPR_FRM_FXXH_YXQ')"
                  slot="label"></iLabel>
          <iDatePicker :disabled="disabled"
                       :placeholder="$t('LK_QINGXUANZE')"
                       value-format="yyyy-MM-dd HH:mm:ss"
                       v-model="form.effectiveTime"
                       type="datetime">
          </iDatePicker>
        </iFormItem>
        <iFormItem>
          <iLabel :label="$t('LK_ZHUANGTAI')"
                  slot="label"></iLabel>
          <iText>{{form.statusName}}</iText>
        </iFormItem>
      </iFormGroup>
    </iCard>
    <riskDialog v-model="riskDialog"
                :tsPpSupplierName="form.tsPpSupplierName"
                @selectTableData='selectTableData' />
  </div>
</template>

<script>
import { iCard, iButton, iFormGroup, iFormItem, iInput, iLabel, icon, iSelect, iText, iDatePicker } from "rise";
import riskDialog from "./riskDialog.vue";
import { dictByCode, baseRules } from "./data";
export default {
  components: {
    iCard, iButton, iFormGroup, iLabel, iInput, icon, iSelect, iText, iDatePicker, riskDialog, iFormItem
  },
  props: {
    tableListData: {
      type: Object, default: () => {
        return {}
      }
    },
    effectiveTimeDisabled: { type: Boolean, default: false },
    preliminaryAssessmentDisabled: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      baseRules,
      riskDialog: false,
      form: {
        tsPpSupplierName: '',
        sapCode: '',
        svwCode: '',
        supplyingRelationship: '',
        submitDateTime: '',
        relativeDept: '',
        signalFrom: '',
        processType: '',
        riskBigType: '',
        riskSmallType: '',
        isBreak: '',
        furtherRatingResult: '',
        effectiveTime: '',
        status: '',
        statusName: '',
        adjustDirection: '',
        adjustScore: '',
        existSectionName: '',
        supplierId: '',
      },
      formGoup: {
        supplyingRelationshipList: [],
        processTypeList: [],
        isBreakList: [
          {
            name: '是',
            code: true
          },
          {
            name: '否',
            code: false
          }
        ],
        riskBigTypeList: [],
        riskSmallTypeList: [],
        adjustDirectionList: [
          {
            name: '+',
          },
          {
            name: '-',
          }
        ]
      }
    }
  },
  watch: {
    tableListData (data) {
      this.form = data
    },
  },
  async created () {
    await this.dictByCode()
    if (this.$route.query.flag === 'creat') {
      this.form.signalFrom = this.$store?.state?.permission?.userInfo?.nameZh
      this.form.relativeDept = this.$store?.state?.permission?.userInfo?.deptDTO?.nameZh
    //   if()
    } else {
      this.formGoup.riskBigTypeList.forEach((item) => {
        if (item.code === this.form.riskBigType) {
          this.formGoup.riskSmallTypeList = item.subDictResultVo
        }
      })
    }
  },
  methods: {
    async dictByCode () {
      const res2 = await dictByCode('RISK_SIGNAL_SUPPLY_RELATIONSHIP')
      const res3 = await dictByCode('RISK_SIGNAL_DISPOSAL')
      const res6 = await dictByCode('RISK_SIGNAL_TYPE')
      this.formGoup.supplyingRelationshipList = res2
      this.formGoup.processTypeList = res3
      this.formGoup.riskBigTypeList = res6
    },
    handleRiskBigType (e) {
      this.form.riskSmallType = ''
      this.formGoup.riskSmallTypeList = []
      this.formGoup.riskBigTypeList.forEach((item) => {
        if (item.code === e) {
          this.formGoup.riskSmallTypeList = item.subDictResultVo
        }
      })
    },
    handleSearch () {
      this.riskDialog = true
    },
    selectTableData (data) {
      this.form.sapCode = data[0].sapCode
      this.form.svwCode = data[0].svwCode
      this.form.existSectionName = data[0].existSectionName
      this.form.tsPpSupplierName = data[0].nameZh
      this.form.furtherRatingResult = data[0].deepCommentResult
      this.form.supplierId = data[0].supplierId
    },
    basicInformationBack () {
      return this.form
    }
  },
  computed: {
    isFRM () {
    //   return this.$store?.state?.permission?.userInfo?.deptDTO?.deptNum?.indexOf('CSSS-1') === -1
    return JSON.parse(sessionStorage.getItem('userInfo'))?.roleList[0]?.code?.indexOf('FRMGLY') === -1
    }
  }
}
</script>

<style scoped>
.tip-title {
  font-size: 14px;
  font-weight: bold;
}
.tip-content {
  font-size: 14px;
}
.adjust {
  display: flex;
  justify-content: flex-start;
}
.icon-search {
  position: absolute;
  height: 100%;
  right: 1rem;
  top: 0;
  text-align: center;
  color: #aaaaaa;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  cursor: pointer;
}
::v-deep .el-date-editor {
  width: 100% !important;
}
</style>
