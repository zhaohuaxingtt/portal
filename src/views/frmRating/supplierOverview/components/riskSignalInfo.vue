<template>
  <div>
    <iCard>
      <div slot="header" class="content-header" :stretch="true" >
        <iTabs style='float:left; width: 100%;' v-model="tabVal" @tab-click="changeTab" >
          <el-tab-pane name="gp" label="一般采购风险信号">
            <riskSignalInfoDetail :tabVal="tabVal" :key="key"  @searchChange="searchChange" @initData="initData"/>
          </el-tab-pane>
          <el-tab-pane name="pp" label="生产采购风险信号">
            <riskSignalInfoDetail :tabVal="tabVal" :key="key"  @searchChange="searchChange" @initData="initData"/>
          </el-tab-pane>
        </iTabs>
        <el-button  slot="header-control" class="back" type="primary" @click="$emit('back')">{{$t('LK_FANHUI')}}</el-button>
      </div>
    </iCard>
  </div>
</template>

<script>
import {iCard, iTabs, iMessage} from 'rise'
import riskSignalInfoDetail from './riskSignalInfoDetail.vue'
import {getSignalInfoData} from '@/api/frmRating/overView/signalInfo'
export default {
  name: 'RiskSignalInfo',
  data () {
    return {
      tabVal: 'gp',
      key: 0,
      searchFrom: null,
    }
  },
  components: {iCard, iTabs, iMessage, riskSignalInfoDetail, },
  methods: {
    //初始化测试数据
    initTestData() {
      const data = [
        {key: 'ss', name: '涉诉', totalNum: 5, childrenItem: [
          {name: '失信或执行人', totalNum: 3},
          {name: '限制高消费', totalNum: 3},
          {name: '裁判文书', totalNum: 3},
        ]},
        {key: 'ss2', name: '涉诉2', totalNum: 5, childrenItem: [
          {name: '失信或执行人2', totalNum: 3},
          {name: '限制高消费2', totalNum: 5},
          {name: '裁判文书2', totalNum: 5},
        ]},
        {key: 'ss3', name: '涉诉3', totalNum: 800, childrenItem: [
          {name: '失信或执行人3', totalNum: 6},
          {name: '限制高消费3', totalNum: 3},
          {name: '裁判文书3', totalNum: 5},
        ]},
        {key: 'ss4', name: '涉诉4', totalNum: 0, childrenItem: [
        ]},
        {key: 'ss5', name: '涉诉', totalNum: 5, childrenItem: [
          {name: '失信或执行人', totalNum: 3},
          {name: '限制高消费', totalNum: 3},
          {name: '裁判文书', totalNum: 3},
        ]},
        {key: 'ss6', name: '涉诉2', totalNum: 5, childrenItem: [
          {name: '失信或执行人2', totalNum: 3},
          {name: '限制高消费2', totalNum: 5},
          {name: '裁判文书2', totalNum: 5},
        ]},
        {key: 'ss7', name: '涉诉3', totalNum: 800, childrenItem: [
          {name: '失信或执行人3', totalNum: 6},
          {name: '限制高消费3', totalNum: 3},
          {name: '裁判文书3', totalNum: 5},
        ]},
        {key: 'ss8', name: '涉诉4', totalNum: 0, childrenItem: [
        ]},
        {key: 'ss9', name: '涉诉', totalNum: 5, childrenItem: [
          {name: '失信或执行人', totalNum: 3},
          {name: '限制高消费', totalNum: 3},
          {name: '裁判文书', totalNum: 3},
        ]},
        {key: 'ss10', name: '涉诉2', totalNum: 5, childrenItem: [
          {name: '失信或执行人2', totalNum: 3},
          {name: '限制高消费2', totalNum: 5},
          {name: '裁判文书2', totalNum: 5},
        ]},
        {key: 'ss11', name: '涉诉3', totalNum: 800, childrenItem: [
          {name: '失信或执行人3', totalNum: 6},
          {name: '限制高消费3', totalNum: 3},
          {name: '裁判文书3', totalNum: 5},
        ]},
        {key: 'ss12', name: '涉诉4', totalNum: 0, childrenItem: [
        ]},
      ]
    },
    //初始化数据
    initData(callback) {
      const params = {
        supplierType: this.tabVal,
        monthList: this.searchFrom && this.searchFrom.month.length ? this.searchFrom.month : null,
        quarterList: this.searchFrom && this.searchFrom.quarter.length ? this.searchFrom.quarter : null,
        year: this.searchFrom ? this.searchFrom.year : null
      }
      getSignalInfoData(params).then(res => {
        if(res && res.code == '200') callback(res.data)
        else iMessage.error(res.desZh)
      })
    },
    //返回事件
    back() {
      this.$emit('back')
    },
    //改变Tab事件
    changeTab() {
      this.key = new Date().getTime()
      this.initData()
    },
    //查询值改变事件
    searchChange(searchFrom, callback) {
      this.searchFrom = window._.cloneDeep(searchFrom)
      this.handleSearchData()
      this.initData(callback)
    },
    //处理查询数据（如果有all选项则不传值到后台）
    handleSearchData() {
      const monthAll = this.searchFrom.month.find(item => item == 'all') 
      const quarterAll = this.searchFrom.quarter.find(item => item == 'all')
      if(monthAll) this.$set(this.searchFrom, 'month', [])
      if(quarterAll) this.$set(this.searchFrom, 'quarter', [])
    }
  }
}
</script>

<style lang='scss' scoped>
.content-header{
  width: 100%;
  position: relative;
  .back{
    position: absolute;
    top: -5px;
    right: 0;
  }
}
 
</style>
