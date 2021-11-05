<!--
 * @Author: youy
 * @Date: 2021-08-27 16:29:54
 * @LastEditTime: 2021-11-01 20:24:33
 * @LastEditors: Please set LastEditors
 * @Description: 预算报表
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\annualBudget\components\budget.vue
-->
<template>
  <div>
    <iSearch @reset="handleSearchReset" @sure="handleSubmitSearch">
      <el-form :model="searchForm">
        <el-form-item 
        :label="language('YUSUANNIANFEN', '预算年份')">
          <iDatePicker v-model="searchForm.forecastTime" valueFormat="yyyy" type="year" @change="changeYear"></iDatePicker>
        </el-form-item>
        <el-form-item 
        :label="language('YONGLIANGBANBEN', '用量版本')">
          <!-- <iSelect v-model="searchForm.demand">
            <el-option value="" :label="language('QUANBU', '全部')"></el-option>
            <el-option v-for="(item, index) in demandList" :key="index" :value="item.versionNo" :label="item.source + ' - ' + item.versionNo"></el-option>
          </iSelect> -->
          <custom-select 
          v-model="level"
          :user-options="demandList"
          :placeholder="language('QINGXUANZE', '请选择')"
          value-member="keyId"
          value-key="keyId">
            <template v-slot:selected="scope">
              <span>{{scope.data.source + (scope.data.versionNo ? '-'  + scope.data.versionNo : '')}}</span>
            </template>
            <template v-slot:unselected="scope">
              <span>{{scope.data.source + (scope.data.versionNo ? '-'  + scope.data.versionNo : '')}}</span>
            </template>
          </custom-select>
        </el-form-item>
        <el-form-item 
        :label="language('ZHUANGTAI', '状态')">
          <!-- <iSelect v-model="searchForm.status">
            <el-option value="" :label="language('QUANBU', '全部')"></el-option>
            <el-option v-for="(item, index) in statusList" :key="index" :value="item.code" :label="item.message"></el-option>
          </iSelect> -->
          <custom-select 
          v-model="searchForm.status"
          :user-options="statusList"
          :placeholder="language('QINGXUANZE', '请选择')"
          display-member="message"
          value-member="code"
          value-key="code"/>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <slot name="mainContent"></slot>
    </iCard>
  </div>
</template>

<script>
import { iSearch, iSelect, iDatePicker, iMessage } from 'rise'
import { fetchDemand, fetchStatusList } from '@/api/mtz/annualGeneralBudget/annualBudget.js'
export default {
  components: {
    iSearch,
    iSelect,
    iDatePicker
  },
  props: {
  },
  data () {
    return {
      searchForm: {},
      demandList: [],
      statusList: [],
      level: null,
    }
  },
  created() {
    this.getDemandData()
    this.getStatusList()
  },
  mounted() {
    this.initSearchData()
  },
  methods: {
    // 初始化检索条件
    initSearchData() {
      for(const key in this.searchForm) {
        this.searchForm[key] = null
      }
      this.$set(this.searchForm , 'status', 'FORMAL')
    },
    // 获取用量版本
    getDemandData() {
      this.demandList = [
        {keyId: "", source: '全部', versionNo: null}
      ]
      fetchDemand({}).then(res => {
        if(res && res.code == 200) {
          this.demandList = this.demandList.concat(res.data)
        } else iMessage.error(res.desZh)
      })
    },
    // 获取状态数据
    // fetchStatusList
    getStatusList() {
      this.statusList = [
        {code: "", message: '全部'}
      ]
      fetchStatusList().then(res => {
        if(res && res.code == 200) {
          for(let key in res.data) {
            this.statusList.push({
              code: key,
              message: res.data[key]
            })
          }
        } else iMessage.error(res.desZh)
      })
    },
    // 选中年份改变
    changeYear() {
      // if(this.searchForm.year && this.searchForm.year <= new Date().getFullYear()) {
      //   iMessage.warn(this.language('QINGXUANZEYIHOUNIANFEN', '请选择当前年份之后的年份数据'))
      // }
    },
    // 重置
    handleSearchReset() {
      this.initSearchData()
      this.$emit('handleSearchReset')
    },
    // 确定
    handleSubmitSearch() {
      if(this.level) {
        const obj = this.demandList.find(item => item.keyId == this.level)
        this.searchForm.demandType = obj.source
        this.searchForm.demandVersion = obj.versionNo
      }
      this.$emit('handleSubmitSearch', this.searchForm)
    }
  }
}
</script>

<style lang='scss' scoped>

 
</style>
