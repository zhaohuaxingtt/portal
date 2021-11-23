<!--
 * @Author: yz
 * @Date: 2021-09-27
-->
<template>
  <iPage class="iPage">
    <div class="header">
        <div class="left">{{ headerTitle }}</div>
      <div class="right">
        <!--tag-->
        <span class="input" v-for="item,index in tagList" :key= item.id v-text="item.folderName"></span>
        <icon symbol @click.native="setCollection"
              :name="currentData&&currentData.isDefaultFolder == 1 ? 'iconyishoucanglingjian' : 'iconweishoucanglingjian'"></icon>
        <icon class="icon" symbol @click.native="joinItemShow = true" name="iconlingjianyibiaoji"></icon>
      </div>
    </div>
    <!--演变进度-->
    <evolutionProcess></evolutionProcess>
    <div class="main">
      <div class="left">
        <!--基础信息-->
        <baseInfo @getHeaderTitle="getHeaderTitle"></baseInfo>
        <!--供应商信息-->
        <supplyInfo></supplyInfo>
      </div>
      <!--零件履历-->
      <div class="right">
        <partResume></partResume>
      </div>
    </div>
    <!--加入标签-->
    <joinItem :value="joinItemShow" @clearDiolog="clearDiolog"></joinItem>
  </iPage>
</template>

<script>
import { iPage, icon, iMessage } from 'rise'
import evolutionProcess from './components/evolutionProcess'
import baseInfo from './components/baseInfo'
import supplyInfo from './components/supplyInfo'
import partResume from './components/partResume'
import joinItem from './components/joinItem'
import { getFolderCombo,  cancelOrCollect, removeCollect, getPartsCollect } from '@/api/partLifeCycle/partLifeCycleStar'

export default {
  name: 'index',
  components: {
    iPage,
    icon,
    evolutionProcess,
    baseInfo,
    supplyInfo,
    partResume,
    joinItem,
    iMessage,
  },
  data() {
    return {
      changePriceModalShow: false,
      joinItemShow: false,
      headerTitle: '',
      tagList:[],
      isDefaultFolder:1,
      currentData:null
    }
  },
  methods: {
    getHeaderTitle(headerTitle){
      this.headerTitle = headerTitle
    },
    clearDiolog() {
      this.joinItemShow = false
      this.getFolderCombo()
    },
    getFolderCombo() {
      getFolderCombo().then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.tagList = res.data
          this.tagList = this.tagList.filter(item => item.folderName!='我的收藏')
        } else {
          iMessage.error(result)
        }
      }).catch(() => {
      })
    },
    // 详情收藏
    setCollection() {
      let operationType = this.currentData?.isDefaultFolder == 1 ? 2 : 1
//      let promiseDelete = this.currentData?.isDefaultFolder == 1 ? removeCollect : cancelOrCollect
        cancelOrCollect({
          operationType: operationType,
          partsCollectId: this.currentData?.partsCollectId,
          partsNum: this.currentData?.partsNum
      }).then(res => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 200) {
            iMessage.success(result)
            this.currentData.isDefaultFolder = operationType
//            this.getPartsCollect(this.currentData.partsNum)
          } else {
            iMessage.error(result)
          }
        }).catch(() => {
        })
    },
    // 获取当前收藏数据
    getPartsCollect(partsNum){
      getPartsCollect({
        partsNum,
        current : 1 ,
        size: 10,
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 200) {
          this.currentData = res.data[0]
        } else {
          iMessage.error(result)
        }
      }).catch(() => {
      })
    },


  },
  mounted() {
    this.currentData = this.$route.query
//    this.getPartsCollect(partsNum)
    this.getFolderCombo()
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

.iPage {
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  .header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .left{
      font-size: 20px;
      font-weight: bold;
      color: #000000;
    }
    .right{
      font-size: 14px;
      color: #4B5C7D;
      display: flex;
      .icon{
        cursor: pointer;
      }
      .input{
        /*width: 68px;*/
        padding: 2px 10px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #EDEDED;
        border-radius: 15px;
        margin-right: 20px;
      }
      ::v-deep .icon{
        width: 30px;
        height: 29px;
        &:last-of-type{
          margin-left: 30px;
        }
      }
    }
  }
  .main {
    display: flex;
    margin-top: 20px;

    .left {
      flex-grow: 1;
      width: 33.333333%;
      margin-right: 20px
    }

    .right {
      width: 66.666666%;
      flex-grow: 2;
    }
  }
}
</style>