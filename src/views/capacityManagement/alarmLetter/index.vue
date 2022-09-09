<template>
  <iPage class="alarmLetter">
    <div id="content">
      <div class="header">
        <span class="title">{{
          language(
            'GONGYINGSHANGGONGHUOJINGQUEBAOJINGXINXIBIAO',
            '供应商供货紧缺报警信息表'
          )
        }}</span>
      </div>
      <iCard
        style="margin-top: 20px"
        :body-style="{ padding: '20px' }"
        class="cardItem"
      >
        <div class="formItem">
          <label for="">{{
            language('BAOJINGFABUDUIXIANG', '报警发布对象：')
          }}</label>
          <div class="flex earlyWarning">
            <el-tag v-for="item in csssList" :key="item.id" color="#409EFF">
              <span style="color: #fff">csss-{{ item.userName }}</span>
            </el-tag>
            <el-tag v-for="item in plrdList" :key="item.id" color="#409EFF">
              <span style="color: #fff">PLRD-{{ item.userName }}</span>
            </el-tag>
            <el-tag
              v-for="item in mulitList"
              :key="item.userId"
              color="#409EFF"
            >
              <span style="color: #fff">{{ item.userName }}</span>
            </el-tag>
          </div>
        </div>
        <div class="formItem">
          <label for="">{{ language('QITASOUJIANREN', '其他收件人：') }}</label>
          <iText class="inline-input"
            >{{ cSubcategoryNo }}
            <!-- <el-tag
              v-for="tag in selected"
              closable
              slot="prepend"
              class="tag"
              :disable-transitions="true"
              :key="tag"
              size="mini"
              type="info"
              @close="handleClose(tag)"
            >
              <span class="el-select__tags-text">{{ tag }}</span>
            </el-tag> -->
          </iText>
        </div>
      </iCard>
      <iCard style="margin-top: 20px" class="cardItem">
        <template v-slot:header>
          <div class="flex header">
            <span class="title">{{
              language('GONGYINGSHANGJIBENXINGXI', '供应商基本信息')
            }}</span>
            <span class="date"
              >{{ language('TIANBIAORIQI', '填表日期：')
              }}{{ detailInfo.fillingDate }}</span
            >
          </div>
        </template>
        <div>
          <!-- 供应商基本信息 -->
          <supplierBasicInfo
            ref="supplierBasicInfo"
            :baseInfo="baseInfo"
          ></supplierBasicInfo>
        </div>
      </iCard>
      <iCard style="margin-top: 20px" class="cardItem">
        <template v-slot:header>
          <div class="flex header">
            <span class="title">{{
              language('JINGQUEXINGXI', '紧缺信息')
            }}</span>
          </div>
        </template>
        <div>
          <!-- 紧缺信息 -->
          <scarceInformation
            ref="scarceInformation"
            :baseInfo="scarceInformation"
          ></scarceInformation>
        </div>
      </iCard>
      <iCard style="margin-top: 20px" class="cardItem">
        <template v-slot:header>
          <div class="flex header">
            <span class="title">{{
              language('YINGDUICUOSHI', '应对措施')
            }}</span>
          </div>
        </template>
        <div>
          <!-- 应对措施 -->
          <countermeasures
            ref="countermeasures"
            :warningLetterSolutionList="warningLetterSolutionList"
          ></countermeasures>
        </div>
      </iCard>
      <iCard style="margin-top: 20px" class="cardItem">
        <template v-slot:header>
          <div class="flex header">
            <span class="title">{{
              language(
                'BENCIJINGQUEJIANCHULIFUZHERENHELIANXIFANGSHI',
                '本次紧缺件处理负责人和联系方式'
              )
            }}</span>
          </div>
        </template>
        <div>
          <!-- 本次紧缺件处理负责人和联系方式 -->
          <chargePerson
            ref="chargePerson"
            :warningLetterOwnerList="warningLetterOwnerList"
          ></chargePerson>
        </div>
      </iCard>
      <iCard style="margin-top: 20px" class="cardItem">
        <template v-slot:header>
          <div class="flex header">
            <span class="title">{{ language('FUJIAN', '附件') }}</span>
          </div>
        </template>
        <div>
          <!-- 附件 -->
          <enclosure
            ref="enclosure"
            :warningLetterAnnexList="warningLetterAnnexList"
          ></enclosure>
        </div>
      </iCard>
      <div class="footer" v-show="downLoadFlag">
        <div class="left">
          <p>
            {{ language('ZONGJINGLI_QIANMING', '总经理（签名）：')
            }}<i
              style="
                border-bottom: 1px solid #000;
                width: 190px;
                line-height: 28px;
                display: inline-block;
                vertical-align: bottom;
              "
            ></i>
          </p>
        </div>
        <div class="right">
          <p>
            {{ language('GONGYINGSHANGGAIZHANG', '供应商盖章：')
            }}<i
              style="
                border-bottom: 1px solid #000;
                width: 200px;
                line-height: 28px;
                display: inline-block;
                vertical-align: bottom;
              "
            ></i>
          </p>
          <p>
            {{ language('BAOJINGRIQI', '报警日期：')
            }}<i
              style="
                border-bottom: 1px solid #000;
                width: 215px;
                line-height: 28px;
                display: inline-block;
                vertical-align: bottom;
              "
            ></i>
          </p>
        </div>
      </div>
    </div>
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iButton,
  iMessage,
  iSelectCustom,
  iDialog,
  iSelect,
  iText
} from 'rise'
import supplierBasicInfo from './components/supplierBasicInfo'
import scarceInformation from './components/scarceInformation'
import countermeasures from './components/countermeasures'
import chargePerson from './components/chargePerson'
import enclosure from './components/enclosure'
import { getWarningLetterInfoDetail } from '@/api/capacityManagement/index.js'
export default {
  name: 'AlarmLetter',
  data() {
    return {
      detailInfo: {}
    }
  },
  computed: {
    baseInfo() {
      return {
        sapCode: '',
        supplierName: '',
        fillingUserName: this.detailInfo.fillingUserName,
        fillingUserPost: this.detailInfo.fillingUserPost,
        fillingUserPhone: this.detailInfo.fillingUserPhone,
        fillingUserEmail: this.detailInfo.fillingUserEmail,
        isTurnoverStore: this.detailInfo.isTurnoverStore,
        tableData: this.detailInfo.warningLetterProductAddressList || []
      }
    },
    mulitList() {
      return this.detailInfo.warningLetterReceiverList || []
    },
    csssList() {
      return this.detailInfo.warningLetterReceiverList || []
    },
    plrdList() {
      return this.detailInfo.warningLetterReceiverList || []
    },
    cSubcategoryNo() {
      return this.detailInfo.cSubcategoryNo || ''
    },
    // 紧缺信息
    scarceInformation() {
      return {
        warningLetterPartRelList:
          this.detailInfo.warningLetterPartRelList || [],
        shortageLevel: this.detailInfo.shortageLevel,
        shortageReason:
          (this.detailInfo.shortageReason &&
            this.detailInfo.shortageReason.split(',')) ||
          [],
        otherShortageReason: this.detailInfo.otherShortageReason
      }
    },
    warningLetterSolutionList() {
      return this.detailInfo.warningLetterSolutionList || []
    },
    warningLetterOwnerList() {
      return this.detailInfo.warningLetterOwnerList || []
    },
    warningLetterAnnexList() {
      return this.detailInfo.warningLetterAnnexList || []
    }
  },
  components: {
    iPage,
    iCard,
    iButton,
    supplierBasicInfo, //供应商基本信息
    scarceInformation, //紧缺信息
    countermeasures, //应对措施
    chargePerson, //本次紧缺件处理负责人和联系方式
    enclosure, //附件
    iSelectCustom,
    iDialog,
    iButton,
    iSelect,
    iText
  },
  methods: {
    init() {
      if (this.$route.query.id)
        getWarningLetterInfoDetail(this.$route.query.id).then((res) => {
          this.detailInfo = res.data
        })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  height: 2.1875rem;
  box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
  border-color: transparent;
}
.alarmLetter {
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .inline-input {
    width: 100%;
    text-align: left;
    padding: 0 20px;
  }

  .cardItem {
    .header {
      justify-content: space-between;
    }
    .formItem {
      margin-top: 20px;
      display: flex;
      label {
        font-size: 18px;
        font-weight: bold;
        width: 150px;
      }
      .tag {
        margin-right: 20px;
      }
      .earlyWarning {
        width: 100%;
        flex-wrap: wrap;
        // text-overflow: ellipsis;
        // white-space: wrap;
        // overflow: hidden;
        border: 1px solid #ccc;
        box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
        border-color: transparent;
      }
    }
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .date {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
.popover-class {
  width: 400px;
  height: 200px;
}
.footer {
  display: flex;
  justify-content: flex-end;
  .left {
    margin-right: 40px;
    margin-top: 60px;
    font-size: 16px;
    font-weight: bold;
  }
  .right {
    margin-top: 60px;
    margin-right: 40px;
    font-size: 16px;
    font-weight: bold;
    p {
      margin-bottom: 40px;
    }
  }
}
.upload {
  display: inline-block;
}
</style>