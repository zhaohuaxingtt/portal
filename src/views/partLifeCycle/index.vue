<!--
 * @Author: yz
 * @Date: 2021-09-27
-->
<template>
  <iPage class="iPage">
    <div class="header">
        <div class="left">{{ headerTitle }}</div>
      <div class="right">
        <div class="input">CSE</div>
        <div class="input">Tiguan</div>
        <icon class="icon" symbol name="iconlingjianweishoucang"></icon>
        <icon class="icon" symbol @click.native="joinItemShow = true" name="iconlingjianyibiaoji"></icon>
      </div>
    </div>
    <evolutionProcess></evolutionProcess>
    <div class="main">
      <div class="left">
        <baseInfo @getHeaderTitle="getHeaderTitle"></baseInfo>
        <supplyInfo></supplyInfo>
      </div>
      <div class="right">
        <partResume></partResume>
      </div>
    </div>
    <joinItem :value="joinItemShow" @clearDiolog="joinItemShow = false"></joinItem>
  </iPage>
</template>

<script>
import { iPage, icon } from 'rise'
import evolutionProcess from './components/evolutionProcess'
import baseInfo from './components/baseInfo'
import supplyInfo from './components/supplyInfo'
import partResume from './components/partResume'
import joinItem from './components/joinItem'

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
  },
  data() {
    return {
      changePriceModalShow: false,
      joinItemShow: false,
      headerTitle: ''
    }
  },
  methods: {
    getHeaderTitle(headerTitle){
      this.headerTitle = headerTitle
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
        width: 68px;
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