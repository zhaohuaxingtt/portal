<!--
 * @Author: haojiang
 * @Date: 2021-08-24 15:19:33
 * @LastEditTime: 2021-09-13 11:06:03
 * @LastEditors: Luoshuang
 * @Description: 风险预警配置
 * @FilePath: \front-portal\src\views\projectMgt\riskAndAlarmConfig\index.vue
-->
<template>
  <iPage class="riskAndAlarmConfig">
    <pageHeader :tabList="submenu" active="riskAndAlarmConfig" />
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{ language("FENGXIANYUJINGPEIZHI",'风险预警配置')}}</span>
        <div class="floatright">
          <iButton :loading="submitting" @click="save">
            {{ language("LK_BAOCUNBINGYINGYONG",'保存并应用') }}
          </iButton>
        </div>
      </div>
      <div class="table">
        <tableList
          index
          :tableData="data"
          :tableTitle="riskAndAlarmTitle"
          :tableLoading="tableLoading"
          :lang="true"
          style="min-height: 400px"
        >
          <!-- 风险状态 -->
          <template #level="scope">
            {{language(scope.row.key, scope.row.level)}}
          </template>
          <!-- 颜色 -->
          <template #icon="scope">
            <icon symbol :name="scope.row.icon" class="icon" />
          </template>
          <!-- 延误时间（周） -->
          <template #delayTime="scope">
            <span v-if="scope.row.crossOver[0]">[</span>
            <span v-else>(</span>
            <iInput v-model="scope.row.delayWeekLeft" @change="ondelayWeeChange('delayWeekLeft', scope)" style="width: 100px;padding: 0 10px" />
            <span class="split">,</span>
            <iInput v-model="scope.row.delayWeekRight" @change="ondelayWeeChange('delayWeekRight', scope)" style="width: 100px;padding: 0 10px" />
            <span v-if="scope.row.crossOver[1]">]</span>
            <span v-else>)</span>
          </template>
        </tableList>
      </div>
      <div class="footer">
        {{language('RISKCONFIGNOTICE', '延误时间区间说明："("代表区间不包含该数字（排除），"["代表区间包含该数字（包含）')}}
      </div>
    </iCard>
  </iPage>
</template>
<script>
import { iPage, iCard, iButton, icon, iInput, iMessage} from 'rise'
import {riskAndAlarmTitle, riskAndAlarmData} from './components/data'
import pageHeader from '../components/pageHeader'
import tableList from './components/tableList'
import { tabList } from '../components/data'
import { 
  getDelayGradeConfig,
  saveDelayGradeConfig
} from '@/api/projectMgt/process'

export default {
  components: { iPage, iCard, iButton, icon, iInput, tableList, pageHeader },
  data() {
    return {
      form: {},
      submenu: tabList,
      tableLoading: false,
      submitting: false,
      selectOptions: {},
      riskAndAlarmTitle,
      riskAndAlarmData,
      data: [],
      finger: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.tableLoading = true
      getDelayGradeConfig({}).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          const finger = []
          const tableListData = res.data || []
          this.data = tableListData.map(o => {
            const tar = this.riskAndAlarmData.find(item => item.delayLevel === o.delayLevel)
            if (tar) {
              o.key = tar.key
              o.crossOver = tar.crossOver
              o.icon = tar.icon
              o.level = tar.level
            }
            finger.push(o.delayWeekLeft)
            finger.push(o.delayWeekRight)
            return o
          })
          this.finger = finger.join(',')
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        this.tableLoading = false
      })
    },

    ondelayWeeChange(key, scope) {
      const index = scope.$index
      const value = scope.row[key] || ''
      if (isNaN(Number(value))) return
      if (key === 'delayWeekLeft' && index !== 0) {
        this.$set(this.data[index-1], 'delayWeekRight', value)
      }
      if (key === 'delayWeekRight' && index !== (this.data.length-1)) {
        this.$set(this.data[index+1], 'delayWeekLeft', value)
      }
    },
    // 校验数据正确性
    validate(data = []) {
      let state = true
      let errorInfo = ''
      let sortArray = []
      data.forEach((item) => {
        const min = item.delayWeekLeft
        const max = item.delayWeekRight
        if (state && (isNaN(Number(min)) || isNaN(Number(max)))) {
          state = false
          errorInfo = `${this.language('FENGXIANDENGJI','风险等级')}[${this.language(item.key,item.level)}],${this.language('PEIZHIBUHEFAXIUGCHONGSHI','配置不合法，请修改后重试')}`
        }
        // 校验同行内的校验
        if (state && (min >= max)) {
          state = false
          console.log(min, max)
          errorInfo = `${this.language('FENGXIANDENGJI','风险等级')}[${this.language(item.key,item.level)}],${this.language('PEIZHIBUHEFAXIUGCHONGSHI','配置不合法，请修改后重试')}`
        }
        sortArray.push(min)
        sortArray.push(max)
      })
      sortArray = sortArray.map(o => Number(o))
      const unsortString = sortArray.join(',')
      const sortString = sortArray.sort((a,b) => a-b).join(',')
      // 顺序有错误
      if (state && sortString !== unsortString) {
        state = false
        errorInfo = `${this.language('PEIZHIBUHEFAXIUGCHONGSHI','配置不合法，请修改后重试')}`
      }
      // 配置没发生变化
      if (state && sortString === this.finger) {
        state = false
        errorInfo = `${this.language('UNCHANGEDCONFIGWARNING','配置没有发生变化，不需要保存')}`
      }
      console.log('配置',sortString, unsortString,sortArray)
      return {
        state,
        errorInfo
      }
    },
    // 保存
    save() {
      const tableListData = window._.cloneDeep(this.data)
      // 检查合法性
      const validate = this.validate(tableListData)
      if (!validate.state) {
        iMessage.error(validate.errorInfo)
        return
      }
      const params = tableListData.map(o => {
        o.delayWeekLeft = Number(o.delayWeekLeft)
        o.delayWeekRight = Number(o.delayWeekRight)
        delete o.crossOver
        delete o.icon
        delete o.level
        delete o.key
        return o
      })
      this.submitting = true
      saveDelayGradeConfig(params).then(res => {
        this.submitting = false
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.init()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        this.submitting = false
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.table {
  ::v-deep.icon {
    font-size: 24px;
  }
  ::v-deep.el-table {
    &:before {
      display: none
    }
  }
}
.footer {
  font-size: 12px;
  line-height: 35px;
  color: rgba(140, 152, 172, 1);
}
</style>