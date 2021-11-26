<!--
 * @Author: your name
 * @Date: 2021-10-25 17:43:45
 * @LastEditTime: 2021-11-23 14:21:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\index.vue
-->
<!-- MTZ变更分页页面 -->
<template>
  <div>
    <theSearch ref="theSearch"
               v-bind="$attrs"
               v-on="$listeners"></theSearch>
    <theTable ref="theTable"
              v-bind="$attrs"
              v-on="$listeners"
              :dateList="dateList"
              class="margin-top20"></theTable>
    <iDialog title="提示"
             :visible.sync="dialogVisible"
             append-to-body
             width="30%"
             :before-close="handleClose">
      <div style="display:inline-block"
           class="margin-right10">
        <div v-for="item in dateList"
             :key="item.id"
             class="margin-bottom10">
          <iDatePicker v-model="item.value"
                       type="daterange"
                       format="yyyy-MM-dd"
                       value-format="yyyy-MM-dd"
                       range-separator="至"
                       :pickerOptions="pickerOptions"
                       start-placeholder="开始月份"
                       end-placeholder="结束月份" />
        </div>
      </div>
      <el-button type="primary"
                 style="vertical-align:top"
                 icon="el-icon-plus"
                 size="mini"
                 @click="addDate"
                 circle></el-button>

      <span slot="footer"
            class="dialog-footer">
        <iButton @click="dialogVisible = false">取 消</iButton>
        <iButton type="primary"
                 @click="sure">确 定</iButton>
      </span>
    </iDialog>
  </div>
</template>

<script>
import { iButton, iDatePicker, iDialog } from 'rise'
import theSearch from './components/theSearch'
import theTable from './components/theTable'
export default {
  name: '',
  components: {
    theSearch,
    theTable,
    iDatePicker,
    iDialog,
    iButton
  },
  data () {
    return {
      dialogVisible: false,
      dateList: [{
        id: 1,
        value: []
      }],
      maxDate: [],
      pickerOptions: {
        onPick: ({ maxDate }) => {
          this.maxDate = maxDate
        }
      }
    }
  },
  created () {

  },
  watch: {
    maxDate (val) {
      this.pickerOptions = {
        onPick: ({ maxDate }) => {
          this.maxDate = maxDate
        },
        disabledDate: time => {
          if (this.dateList.length === 1) {
            return
          }
          if (val) {
            return time < val.getTime() + 86400000
          }
        }
      }
    },
  },
  methods: {
    backBtn () {
      this.$router.go(-1)
    },
    handleClose (done) {
      done()
    },
    addDate () {
      this.dateList.push({
        id: this.dateList.length + 1,
        value: []
      })
    },
    sure () {
      this.dialogVisible = false
      this.$refs.theTable.handleSure()
      this.dateList = []
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  justify-content: space-between;
  .titleText {
    font-size: 20px;
    font-family: Arial;
    line-height: 23px;
  }
}
</style>