<!--
 * @Author: yz
 * @Date: 2021-09-28
-->
<template>
  <iCard class="partResume">
    <div slot="header" class="head">
      <h3>{{ '零件履历' }}</h3>
      <iButton @click="exportFile" v-loading="exportLoading">{{ language('LK_DAOCHU', '导出') }}</iButton>
    </div>
    <div class="partResume_main" v-loading="mainLoading">
      <div class="left">
        <div v-for="(a, index1) in bookmarkNodes" :key="index1">
          <div class="title"
               :class="{ triangle : (a.children && a.children.length > 0), checked: checkedIndex1 === index1, isChecked: a.toggle }">
            <span @click="clickItemA(index1, a)">{{ a.title }}</span>
          </div>
          <div class="itemChild" :class="{itemChildisChecked: a.toggle}" :style="{maxHeight: a.toggle ? '500px' : '0'}">
            <div class="child" :class="{ checked: a.index === index2 }" v-for="(b, index2) in a.children" :key=index2
                 @click="clickItemB(a, b, index2)">
              {{ b.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div v-for="(item, index) in mainSpindleNodes" :key="index" class="item"
             :class="{ checked: checkedIndex3 === index, isHalf: Number(item.type) === 7 }">
          <div class="time">{{ item.date }}</div>
          <div class="round2" v-if="Number(item.type) === 7">
            <icon class="icon" symbol name="iconlingjianlvlifenzhijiedian"></icon>
          </div>
          <div class="round" :class="{ future: !item.pass }" @click="getRecordDetail(item, index)" v-else>
            <div></div>
          </div>
          <div class="name" v-if="Number(item.type) !== 7">{{ item.typeName }}</div>
          <div class="version type7" v-if="Number(item.type) === 7">{{ item.title }}</div>
          <div class="version" v-if="Number(item.type) === 5"> — {{ item.title }}</div>
          <icon class="icon label1" v-if="Number(item.type) === 2" symbol name="iconlingjianlvlibiaoqian"></icon>
          <icon class="icon label2" v-if="Number(item.type) === 5" symbol
                name="iconlingjianlvliAekoyishishibiaoji"></icon>
        </div>
      </div>
      <div class="right" v-loading="rightLoading">
        <div class="title">
          <i></i>{{ currentItem.typeName }} - {{ currentItem.title }}
        </div>
        <div class="partResume_right_content">
          <!--          //Sourcing-->
          <div v-show="currentType === 2">
            <span>首次询价时间：</span>
            <span>{{ infoData.businessDate }}</span>
          </div>
          <div v-show="currentType === 2">
            <span>RFQ号：</span>
            <span>{{ infoData.businessTitle }}</span>
          </div>
          <div v-show="currentType === 2">
            <span>RFQ类型：</span>
            <span>{{ infoData.rfqType }}</span>
          </div>
          <div v-show="currentType === 2">
            <span>询价类型：</span>
            <span>{{ infoData.inquiryType }}</span>
          </div>
          <div v-show="currentType === 2">
            <span>零件采购项目类型：</span>
            <span>{{ infoData.purchaseType }}</span>
          </div>
          <div v-show="currentType === 2">
            <span>工厂：</span>
            <span>{{ infoData.purchaseFactorys }}</span>
          </div>
          <div v-show="currentType === 2">
            <span>车型项目：</span>
            <span>{{ infoData.carTypeProCode }} - {{ infoData.carTypeProName }}</span>
          </div>

          <!--          //LOI（意向书）-->
          <div v-show="currentType === 3">
            <span>时间：</span>
            <span>{{ infoData.businessDate }}</span>
          </div>
          <div v-show="currentType === 3">
            <span>供应商：</span>
            <span>{{ infoData.loiSupplierCode }} - {{ infoData.loiSupplierName }}</span>
          </div>
          <div v-show="currentType === 3">
            <span>意向书编号：</span>
            <span>{{ infoData.loiIntentLetterCode }}</span>
          </div>

          <!--          //定点-->
          <div v-show="currentType === 4">
            <span>定点时间：</span>
            <span>{{ infoData.businessDate }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>FS号：</span>
            <span>{{ infoData.fsNum }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>RS单号：</span>
            <span>{{ infoData.rsNum }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>A价：</span>
            <span>{{ infoData.pricePermission ? infoData.priceA : '-' }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>B价：</span>
            <span>{{ infoData.pricePermission ? infoData.priceB : '-' }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>BNK价格：</span>
            <span>{{ infoData.pricePermission ? infoData.priceBnk : '-' }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>前段包装费：</span>
            <span>{{ infoData.headerPartPackageFee }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>后段包装费：</span>
            <span>{{ infoData.footerPartPackageFee }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>操作费：</span>
            <span>{{ infoData.operationFee }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>运输费：</span>
            <span>{{ infoData.carriageFee }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>投资费：</span>
            <span>{{ infoData.rsInvestmentFee }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>开发费：</span>
            <span>{{ infoData.rsDevelopmentFee }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>供应商：</span>
            <span>{{ infoData.rsSupplierCode }} - {{ infoData.rsSupplierName }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>物流服务商：</span>
            <span>{{ infoData.rsLogisticsSupplierCode }} - {{ infoData.rsLogisticsSupplierName }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>车型项目：</span>
            <span>{{ infoData.rsCarTypeProCode }} - {{ infoData.rsCarTypeProName }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>询价产量：</span>
            <span>{{ infoData.rsInquiryQty }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>定点时产能：</span>
            <span>{{ infoData.rsProCapacity }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>是否做过成本分析：</span>
            <span>{{ infoData.isIngredientAnalyze ? language('LK_SHI', '是') : language('LK_FOU', '否') }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>MTZ RS单号：</span>
            <span>{{ infoData.mtzRsNum }}</span>
          </div>
          <div v-show="currentType === 4">
            <span>定点信编号：</span>
            <span>{{ infoData.rsNlNum }}</span>
          </div>

          <!--          //Kick off-->
          <div v-show="currentType === 1">
            <span>Kick off 会议编号：</span>
            <span>{{ infoData.businessTitle }}</span>
          </div>
          <div v-show="currentType === 1">
            <span>Kick off 时间：</span>
            <span>{{ infoData.kickOffSopDate }}</span>
          </div>
          <div v-show="currentType === 1">
            <span>FS号：</span>
            <span>{{ infoData.fsNum }}</span>
          </div>
          <div v-show="currentType === 1">
            <span>SOP时间：</span>
            <span>{{ infoData.kickOffSopDate }}</span>
          </div>
          <div v-show="currentType === 1">
            <span>供应商：</span>
            <span>{{ infoData.kickOffSupplierCode }} - {{ infoData.kickOffSupplierName }}</span>
          </div>
          <div v-show="currentType === 1">
            <span>1st tryout时间：</span>
            <span>{{ infoData.fstTryoutDate }}</span>
          </div>
          <div v-show="currentType === 1">
            <span>OTS送样时间：</span>
            <span>{{ infoData.otsSendSamplesDate }}</span>
          </div>
          <div v-show="currentType === 1">
            <span>EM送样时间：</span>
            <span>{{ infoData.emSendSamplesDate }}</span>
          </div>

          <!--          //配件定点-->
          <div v-show="currentType === 6">
            <span>定点时间：</span>
            <span>{{ infoData.businessDate }}</span>
          </div>
          <div v-show="currentType === 6">
            <span>FS号：</span>
            <span>{{ infoData.fsNum }}</span>
          </div>
          <div v-show="currentType === 6">
            <span>RS单号：</span>
            <span>{{ infoData.accessoriesRsNum }}</span>
          </div>
          <div v-show="currentType === 6">
            <span>配件A价：</span>
            <span>{{ infoData.pricePermission ? infoData.accessoriesPriceA : '-' }}</span>
          </div>
          <div v-show="currentType === 6">
            <span>配件B价：</span>
            <span>{{ infoData.pricePermission ? infoData.accessoriesPriceB : '-' }}</span>
          </div>
          <div v-show="currentType === 6">
            <span>BNK价格：</span>
            <span>{{ infoData.pricePermission ? infoData.accessoriesPriceBnk : '-' }}</span>
          </div>
          <div v-show="currentType === 6">
            <span>前段包装费：</span>
            <span>{{ infoData.headerPartPackageFee }}</span>
          </div>
          <div v-show="currentType === 6">
            <span>后段包装费：</span>
            <span>{{ infoData.footerPartPackageFee }}</span>
          </div>
          <div v-show="currentType === 6">
            <span>操作费：</span>
            <span>{{ infoData.operationFee }}</span>
          </div>
          <div v-show="currentType === 6">
            <span>运输费：</span>
            <span>{{ infoData.carriageFee }}</span>
          </div>
          <div v-show="currentType === 6">
            <span>供应商：</span>
            <span>{{ infoData.accessoriesSupplierCode }} - {{ infoData.accessoriesSupplierName }}</span>
          </div>
          <div v-show="currentType === 6">
            <span>车型项目：</span>
            <span>{{ infoData.accessoriesCarTypeProCode }} - {{ infoData.accessoriesCarTypeProName }}</span>
          </div>
          <div v-show="currentType === 6">
            <span>定点信签署时间（NL）：</span>
            <span>{{ infoData.nlDate }}</span>
          </div>

          <!--          //SOP-->
          <div v-show="currentType === 8">
            <span>首次SOP：</span>
            <span>{{ infoData.sopDate }}</span>
          </div>
          <div v-show="currentType === 8">
            <span>车型名称：</span>
            <span>{{ infoData.sopCarTypeProName }}</span>
          </div>

          <!--          //Aeko-->
          <div v-show="currentType === 5">
            <span>AEKO号：</span>
            <span>{{ infoData.aekoCode }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>原零件号：</span>
            <span>{{ infoData.originalPartNum }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>采购工厂：</span>
            <span>{{ infoData.aekoPurchaseFactorys }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>导入日期：</span>
            <span>{{ infoData.aekoImportDate }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>价格实施日期：</span>
            <span>{{ infoData.aekoExecuteDate }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>ES投产日期：</span>
            <span>{{ infoData.aekoEsProductDate }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>ES取消日期：</span>
            <span>{{ infoData.aekoEsCancelDate }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>供应商：</span>
            <span>{{ infoData.aekoSupplierCode }} - {{ infoData.aekoSupplierName }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>AEKO状态：</span>
            <span>{{ infoData.aekoSupplierStatus }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>实施价格：</span>
            <span>{{ infoData.pricePermission ? infoData.aekoCarryPrice : '-' }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>A价：</span>
            <span>{{ infoData.pricePermission ? infoData.aekoPriceA : '-' }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>ΔA价：</span>
            <span>{{ infoData.aekoDeltaPriceA }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>Δ模具投资费用：</span>
            <span>{{ infoData.aekoDeltaMouldInvestmentFee }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>Δ开发费：</span>
            <span>{{ infoData.aekoDeltaDelevopmentFee }}</span>
          </div>
          <div v-show="currentType === 5">
            <span>样件价格：</span>
            <span>{{ infoData.pricePermission ? infoData.aekoSimplePrice : '-' }}</span>
          </div>

        </div>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, icon, iMessage } from 'rise'
import { getPartsRecordNodes, getRecordDetail, exportFile } from '@/api/partLifeCycle'

export default {
  name: 'partResume',
  components: {
    iCard,
    iButton,
    icon
  },
  data() {
    return {
      checkedIndex1: '',
      checkedIndex2: '',
      checkedIndex3: '',
      bookmarkNodes: '',
      infoData: '',
      currentItem: {},
      currentType: 0,
      mainLoading: false,
      middleLoading: false,
      rightLoading: false,
      exportLoading: false,
    }
  },
  created() {
    this.getPartsRecordNodes()
  },
  methods: {
    exportFile(){
      this.exportLoading = true
      exportFile({ partsNum: this.$route.query.partsNum }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          console.log('导出成功')
        } else {
          iMessage.error(result)
        }
        this.exportLoading = false
      }).catch(() => {
        this.exportLoading = false
      })
    },
    getRecordDetail(item, index) {
      if (this.checkedIndex3 === index) {
        return
      }
      this.checkedIndex3 = index
      this.currentItem = item
      this.currentType = item.type
      if(Number(item.type) === 10 || Number(item.type) === 9){
        return
      }
      this.rightLoading = true
      getRecordDetail({ id: item.id, type: item.type }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.infoData = res.data
        } else {
          iMessage.error(result)
        }
        this.rightLoading = false
      }).catch(() => {
        this.rightLoading = false
      })
    },
    getPartsRecordNodes() {
      this.mainLoading = true
      getPartsRecordNodes({ partsNum: this.$route.query.partsNum }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.bookmarkNodes = res.data.bookmarkNodes
          // 初始选中第一条
          if (this.bookmarkNodes && this.bookmarkNodes[0]) {
            if (this.bookmarkNodes[0].children && this.bookmarkNodes[0].children[0]) {
              this.getRecordDetail(this.bookmarkNodes[0].children[0], 0)
              this.bookmarkNodes[0].index = 0
            } else {
              this.getRecordDetail(this.bookmarkNodes[0], 0)
              this.checkedIndex1 = 0
            }
          }
          this.mainSpindleNodes = res.data.mainSpindleNodes
        } else {
          iMessage.error(result)
        }
        this.mainLoading = false
      }).catch(() => {
        this.mainLoading = false
      })
    },

    clickItemA(index, item) {
      // if (this.checkedIndex1 === index) {
      //   return
      // }
      this.checkedIndex1 = index
      if (item.children && item.children.length > 0) {
        item.toggle = !item.toggle
        // 解决DOM不渲染的问题
        this.bookmarkNodes = [...this.bookmarkNodes]
      } else {
        this.bookmarkNodes.forEach(item => {
          item.index = ''
        })
        this.mainSpindleNodes.map((a, aIndex) => {
          if (a.id === item.id) {
            this.getRecordDetail(item, aIndex)
          }
        })
      }
    },
    clickItemB(a, b, index) {
      if (a.index === index) {
        return
      }
      this.bookmarkNodes.forEach(item => {
        item.index = ''
      })
      this.mainSpindleNodes.map((a, aIndex) => {
        if (a.id === b.id) {
          this.getRecordDetail(b, aIndex)
        }
      })
      a.index = index
      this.bookmarkNodes = [...this.bookmarkNodes]
    }
  }
}
</script>

<style scoped lang="scss">
// 滚动条样式
::-webkit-scrollbar {
  width: 3px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px transparent;
  background: #E2EAFC;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px transparent;
  border-radius: 5px;
  background: transparent;
}
.partResume {
  ::v-deep .cardHeader {
    padding: 20px 30px;
  }

  h3 {
    color: #131523;
    font-size: 18px;
    font-weight: bold;
  }

  .head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .partResume_main {
    display: flex;

    .left {
      font-size: 16px;
      font-weight: bold;
      color: #000000;
      width: 110px;
      margin-right: 80px;
      > div {
        padding-bottom: 30px;
        text-align: right;
        border-right: 2px solid #E7E7E7;

        .itemChild {
          overflow: hidden;
          transition: all 0.3s ease;
          &.itemChildisChecked{
            margin-top: 20px;
          }
        }

        &:last-of-type {
          border-right: none;
        }

        .title {
          position: relative;
          min-width: 85px;
          max-width: 85px;

          span {
            position: relative;
            top: -10px;
            cursor: pointer;
          }

          &::after {
            content: '';
            display: block;
            width: 6px;
            height: 3px;
            background: #E7E7E7;
            border-radius: 1px;
            position: absolute;
            right: -27px;
            bottom: 18px;
          }

          &.triangle span::before {
            content: '';
            display: block;
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-top: 6px solid #1660F1;
            position: absolute;
            left: -20px;
            top: 7px;
          }

          &.checked {
            &::after {
              width: 6px;
              height: 14px;
              background: #1660F1;
              bottom: 13px;
            }

            span {
              color: #1660F1;
            }

          }

          &.isChecked {

            &.triangle span::before {
              border-top: 6px solid transparent;
              border-bottom: 6px solid #1660F1;
              top: 2px;
            }
          }
        }

        .child {
          font-family: Arial;
          font-size: 12px;
          font-weight: 400;
          color: #000000;
          min-width: 85px;
          max-width: 85px;
          margin-bottom: 10px;
          cursor: pointer;

          &.checked {
            color: #1660F1;
          }
        }
      }

    }

    .middle {
      width: 35%;
      max-height: 800px;
      overflow-y: auto;
      .item {
        display: flex;
        line-height: 28px;
        margin-bottom: 70px;

        .time {
          font-size: 18px;
          font-weight: 400;
          color: #41434A;
        }

        .name {
          font-size: 20px;
          font-weight: bold;
          color: #000000;
        }

        .version {
          font-size: 14px;
          font-weight: 400;
          color: #000000;
          margin-left: 6px;
          margin-left: 10px;

          &.type7 {
            color: #41434A;
            margin-left: 0;
          }
        }

        .label1 {
          width: 93px;
          height: 20px;
          margin-left: 20px;
          margin-top: 6px;
        }

        .label2 {
          width: 35px;
          height: 14px;
          margin-left: 10px;
          margin-top: 6px;
        }

        .round {
          width: 28px;
          height: 28px;
          background: #C9DCFF;
          box-shadow: 0px 0px 8px rgba(31, 96, 222, 0.2);
          border-radius: 50%;
          position: relative;
          cursor: pointer;
          margin-left: 30px;
          margin-right: 20px;
          position: relative;

          > div {
            width: 16px;
            height: 16px;
            background: #FFFFFF;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
          }

          &::after {
            content: '';
            display: block;
            width: 6px;
            height: 70px;
            background-color: #739ff6;
            position: absolute;
            left: 11px;
            top: 28px;
          }

          &.future{
            background: #E2E8F4;
            &::after {
              background: #CCD2E6;
            }
          }

        }

        .round2 {
          width: 24px;
          height: 24px;
          position: relative;
          cursor: pointer;
          margin-left: 30px;
          margin-right: 20px;
          position: relative;

          .icon {
            width: 24px;
            height: 24px;
            position: absolute;
            left: 2px;
          }

          &::after {
            content: '';
            display: block;
            width: 6px;
            height: 35px;
            background-color: #739ff6;
            position: absolute;
            left: 11px;
            top: 23px;
          }
        }

        &.checked {
          .round {

            background: #C9DCFF;

            > div {
              background: #1660F1;
            }
          }

          .name {
            color: #1660F1;
          }
        }

        &:last-of-type .round::after,  &:last-of-type .round2::after {
          background-color: #ffffff;
        }

        &.isHalf {
          margin-top: -47px;
          & + .item{
            margin-top: -47px;
          }
        }
      }
    }

    .right {
      font-size: 16px;
      font-weight: 400;
      color: #000000;
      padding-left: 80px;
      margin-left: 6px;
      border-left: 1px solid #DBE1EF;
      width: 48%;
      .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 40px;

        i {
          display: inline-block;
          width: 6px;
          height: 16px;
          background: #1660F1;
          border-radius: 1px;
          margin-right: 10px;
        }

        span {
          color: #1660F1;
          text-decoration: underline;
          cursor: pointer;
        }
      }

      .partResume_right_content {

        > div {
          margin-left: 16px;
          margin-bottom: 30px;

          span {
            display: inline-block;
            width: 40%;
            max-width: 40%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;

            &:last-of-type {
              width: 60%;
              max-width: 60%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>