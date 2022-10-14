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
        <div>
          <iButton @click="openFile">
            {{ language('查看报警信', '查看报警信') }}
          </iButton>
        </div>
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
              v-for="item in releaseList"
              :key="item.userId"
              color="#409EFF"
            >
              <span style="color: #fff">{{ item.userName }}</span>
            </el-tag>
          </div>
        </div>
        <div class="formItem">
          <label for="">{{ language('QITASOUJIANREN', '其他收件人：') }}</label>
          <div class="email-box">
            <div>
              <el-tag
                v-for="item in otherList"
                class="tag"
                :key="item.email"
                @close="handleCloseTag(item, 'email')"
              >
                <span class="el-select__tags-text">{{ item.email }}</span>
              </el-tag>
            </div>
          </div>
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
    <alarm-list
      @checkPdf="checkPdf"
      ref="alarmList"
      :isView.sync="isView"
    ></alarm-list>
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
import alarmList from './components/alarmList'
import { getWarningLetterInfoDetail } from '@/api/capacityManagement/index.js'
export default {
  name: 'AlarmLetter',
  data() {
    return {
      detailInfo: {},
      isView: false
    }
  },
  computed: {
    baseInfo() {
      return {
        sapCode: this.detailInfo.sapCode,
        supplierName: this.detailInfo.supplierName,
        fillingUserName: this.detailInfo.fillingUserName,
        fillingUserPost: this.detailInfo.fillingUserPost,
        fillingUserPhone: this.detailInfo.fillingUserPhone,
        fillingUserEmail: this.detailInfo.fillingUserEmail,
        isTurnoverStore: this.detailInfo.isTurnoverStore ? '是' : '否',
        tableData: this.detailInfo.warningLetterProductAddressList || []
      }
    },
    csssList() {
      return this.detailInfo.warningLetterReceiverList || []
    },
    plrdList() {
      return this.detailInfo.warningLetterReceiverList || []
    },
    // 已添加发布对象
    releaseList() {
      let releaseList = (this.warningLetterReceiverList || []).filter(
        (item) => item.userType != 4
      )
      return releaseList
    },
    // 添加发布对象，剩余待选项
    residueList() {
      let idList = (this.warningLetterReceiverList || [])
        .filter((item) => item.userType != 4)
        .map((child) => child.userId)
      return this.linieList.filter((item) => !idList.includes(item.userId))
    },
    // 其他收件人
    otherList() {
      let otherList = (this.warningLetterReceiverList || []).filter(
        (item) => item.userType == 4
      )
      return otherList
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
    alarmList, // 报警信
    iSelectCustom,
    iDialog,
    iButton,
    iSelect,
    iText
  },
  methods: {
    openFile() {
      this.isView = true
      console.log(this.isView)
    },
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

      .email-box {
        border: 0;
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
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