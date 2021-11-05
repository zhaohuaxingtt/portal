<!--
 * @Author: youyuan
 * @Date: 2021-09-23 16:23:09
 * @LastEditTime: 2021-11-01 20:32:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\dataBase\marketPriceEnquiry\components\index.vue
-->
<template>
  <div>
    <iSearch @sure="sure" @reset="reset" icon="false">
      <el-form :model="formData">
        <el-form-item
        style="width: 250px;"
        :label="language('CAILIAOZHONGLEI','材料中类')">
          <!-- <iSelect
          v-model="formData['materialNos']"
          filterable
          multiple
          collapse-tags>
            <el-option v-for="(item, index) in categoryDorpDownList" :key="index" :value="item.code" :label="item.code + '-' + item.message"></el-option>
          </iSelect> -->
          <custom-select v-model="formData.materialNos"
          :user-options="categoryDorpDownList"
          filterable
          multiple
          :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
          display-member="message"
          value-member="code"
          value-key="code">
            <template v-slot:selected="scope">
              <span>{{scope.data.code + '-' + scope.data.message}}</span>
            </template>
            <template v-slot:unselected="scope">
              <span>{{scope.data.code + '-' + scope.data.message}}</span>
            </template>
          </custom-select>
        </el-form-item>
        <el-form-item
        :label="language('YUEDUQI','月度起')">
          <iDatePicker v-model="formData.periodStart" type="month" valueFormat="yyyy-MM" :picker-options="startPickerOptions"/></iDatePicker>
        </el-form-item>
        <el-form-item
        :label="language('YUEDUZHI','月度止')">
          <iDatePicker v-model="formData.periodEnd" type="month" valueFormat="yyyy-MM" :picker-options="endPickerOptions"/></iDatePicker>
        </el-form-item>
        <el-form-item
        :label="language('SHICHANGJIALEIBIE','市场价类别')">
          <!-- <iSelect
          v-model="formData['marketTypes']"
          multiple
          collapse-tags>
            <el-option v-for="(item, index) in marketTypeDorpDownList" :key="index" :value="item.code" :label="item.message"></el-option>
          </iSelect> -->
          <custom-select 
          class="cateGorySelect"
          multiple 
          collapse-tags
          v-model="formData['marketTypes']"
          :user-options="marketTypeDorpDownList"
          :placeholder="language('QINGXUANZE', '请选择')"
          display-member="message"
          value-member="code"
          value-key="code"/>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20 echartCard">
      <div class="cateGoryBox">
        <p style="fontSize: 16px;">{{language('XIANSHIYINCANGCAILIAO', '显示/隐藏材料：')}}</p>
        <!-- <iSelect class="cateGorySelect" v-model="selectionCategoryData" multiple collapse-tags @change="handleChangeShowOrHide">
          <el-option v-for="(item, index) in allCategoryDorpDownList" :key="index" :value="item.materialNo" :label="item.name"></el-option>
        </iSelect> -->
        <custom-select 
        class="cateGorySelect"
        multiple 
        collapse-tags
        v-model="selectionCategoryData"
        :user-options="allCategoryDorpDownList"
        :placeholder="language('QINGXUANZE', '请选择')"
        display-member="name"
        value-member="materialNo"
        value-key="materialNo"
        @change="handleChangeShowOrHide"/>
      </div>
      <chart v-if="chartData.length > 0 && timeData.length > 0" :chartData="chartData" :selectedChartData="selectionCategoryData" :timeData="timeData" :TFlag="TFlag" :ounceFlag="ounceFlag" @handleChangeLegend="handleChangeLegend"/>
    </iCard>
  </div>
</template>

<script>
let that
import { iSelect, iDatePicker, iSearch, iCard, iMessage } from 'rise'
import { getMtzMarketTypeList, getMtzCategory, mtzPriceQuery } from '@/api/mtz/database/marketPriceEnquiry'
import chart from './chart'
export default {
  components: {
    iSearch,
    iSelect,
    iDatePicker,
    iCard,
    chart
  },
  data () {
    return {
      // search data
      formData: {},
      // start date disabled option
      startPickerOptions: {
        disabledDate(startTime) {
          let res = false //启用
          // 明年
          const nextYearDate = (new Date().getFullYear() + 1) + '/12/31 00:00:00'
          if(startTime.getTime() > new Date(nextYearDate).getTime()) {
            res = true
          }
          // 如果月度止数据已存在，月度起数据不能小于月度止且月度起
          // 距离月度止时间段不能大于1年
          if(that.formData && that.formData.periodEnd) {
            const endTime = new Date(that.formData.periodEnd)
            let beforeYearDate = window._.cloneDeep(endTime).setFullYear(endTime.getFullYear() - 1)
            beforeYearDate = new Date(beforeYearDate).setMonth(endTime.getMonth() + 1)
            if(startTime.getTime() > endTime.getTime()) {
              res = true
            }
            if(startTime.getTime() < beforeYearDate) {
              res = true
            }
          }
          return res
        }
      },
      // end date disabled option
      endPickerOptions: {
        disabledDate(endTime) {
          let res = false //启用
          // 明年
          const nextYearDate = (new Date().getFullYear() + 1) + '/12/31 00:00:00'
          if(endTime.getTime() > new Date(nextYearDate).getTime()) {
            res = true
          }
          // 如果月度起数据已存在，月度止数据不能小于月度起且月度止
          // 距离月度止时间段不能大于1年
          if(that.formData && that.formData.periodStart) {
            const startTime = new Date(that.formData.periodStart)
            let beforeYearDate = window._.cloneDeep(startTime).setFullYear(startTime.getFullYear() + 1)
            beforeYearDate = new Date(beforeYearDate).setMonth(startTime.getMonth() - 1)
            if(startTime.getTime() > endTime.getTime()) {
              res = true
            }
            if(endTime.getTime() > beforeYearDate) {
              res = true
            }
          }
          return res
        }
      },
      // 材料中类数据
      categoryDorpDownList: [],
      // 市场价类别数据
      marketTypeDorpDownList: [],
      // 高亮材料
      selectionCategoryData: [],
      // 全量高亮材料
      allCategoryDorpDownList: [],
      // 后端根据检索条件返回的数据
      mainData: [],
      // chart data
      chartData: [],
      // time date
      timeData: [],
      // 是否开启普通金属Y轴
      TFlag: false,
      // 是否开启贵金属Y轴
      ounceFlag: false
    }
  },
  beforeCreate() {
    that = this
  },
  computed: {

  },
  created() {
    this.initSearch()
    this.getCategoryDorpDownList()
    this.getMarketTypeDorpDownList()
    this.$nextTick(_ => {
      this.getChartData()
    })
  },
  methods: {
    // 初始化检索条件
    initSearch() {
      const defaultMaterialList = ['M01006002', 'M01006001', 'M01006003', '01002', '01001', '01005']
      const defaultMarketTypeList = ['E', 'F']
      this.formData = {
        ...this.formData,
        materialNos: defaultMaterialList,
        periodStart: '2021-01',
        periodEnd: '2021-12',
        marketTypes: defaultMarketTypeList,
      }
    },
    // 获取材料中类下拉框数据
    getCategoryDorpDownList() {
      getMtzCategory({includeRawMaterial: true}).then(res => {
        if(res && res.code == 200) {
          this.categoryDorpDownList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取市场价类别下拉框数据
    getMarketTypeDorpDownList() {
      getMtzMarketTypeList().then(res=>{
        if(res && res.code == 200) {
          this.marketTypeDorpDownList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取chart数据
    getChartData() {
      mtzPriceQuery(this.formData).then(res=>{
        if(res && res.code == 200) {
          const data = window._.cloneDeep(res.data)
          this.mainData = data
          // 高亮材料下拉
          if(data.length>0){
            this.allCategoryDorpDownList = []
            this.selectionCategoryData = []
            data.forEach(item => {
              const obj = {
                name: item.name,
                materialNo: item.materialNo
              }
              this.allCategoryDorpDownList.push(obj)
              this.selectionCategoryData.push(obj.materialNo)
            })
          }
          this.handleTimeChange()
          this.handleGetChartData(this.mainData)
        } else iMessage.error(res.desZh)
      })
    },
    // 处理得到chart所需格式数据 
    handleGetChartData(data) {
      this.chartData = []
      this.TFlag = false
      this.ounceFlag = false
      data.map(item => {
        // 判断是否被选中
        if(item && this.selectionCategoryData.indexOf(item.materialNo) > -1) {
          // 被选中的数据，检测属于普通金属还是贵金属
          if(item.list && item.list.length > 0) {
            if(!item.list[0].isRareMetals) {
              // 普通金属
              this.TFlag = true
            } else if(item.list[0].isRareMetals) {
              // 贵金属
              this.ounceFlag = true
            }
          }
        }
      })
      data.map(item => {
        const resObj = {
          name: item.name,
          materialName: null,
          material: item.material,
          materialNo: item.materialNo,
          yAxisIndex: 0,
          data: [],
          isRareMetals: false
        }
        // 判断是否被选中
        if(item && this.selectionCategoryData.indexOf(item.materialNo) > -1) {
          if(item.list && item.list.length > 0) {
            item.list.forEach(childItem => {
              resObj.isRareMetals = childItem.isRareMetals
              resObj.materialName = childItem.name
              // 当普通金属和贵金属坐标轴都存在时，且本材料也属于贵金属坐标时，该材料数据需与贵金属坐标轴对应
              if(childItem.isRareMetals && this.TFlag && this.ounceFlag) {
                resObj.yAxisIndex = 1
              }
              resObj.data.push({
                value: [childItem.period.slice(0, 4) + '/' + childItem.period.slice(4), childItem.eprice, childItem.name, childItem.eprice, childItem.marketType, childItem.source]
              })
            })
            this.chartData.push(resObj)
          }
        } 
      })
    },
    // 选中起始时间发生改变，按起始时间处理对应的时间段数据
    handleTimeChange() {
      this.timeData = []
      if(this.formData.periodStart && this.formData.periodEnd) {
        let startYear = this.formData.periodStart.split('-')[0]
        let startMonth = this.formData.periodStart.split('-')[1]
        const endYear = this.formData.periodEnd.split('-')[0]
        const endMonth = this.formData.periodEnd.split('-')[1]
        while(startYear < endYear || (startYear == endYear && startMonth <= endMonth)) {
          this.timeData.push(startYear + '/' + (startMonth < 10 && startMonth.toString().length < 2 ? '0' + startMonth : startMonth))
          if(startMonth == 12)  {
            startYear++
            startMonth = 1
          } else startMonth++
        }
      }
    },
    // 确认
    sure() {
      this.getChartData()
    },
    // 重置
    reset() {
      this.initSearch()
      this.getChartData()
    },
    // 改变选中图例事件，将根据当前的图例状态设置下拉框数据的选中
    handleChangeLegend(legendData) {
      this.selectionCategoryData = []
      for(const key in legendData) {
        const status = legendData[key]
        const obj = this.allCategoryDorpDownList.find(item => item.name == key)
        if(status) this.selectionCategoryData.push(obj.materialNo)
      }
    }
  },
  watch: {
  }
}
</script>

<style lang='scss' scoped>
.echartCard {
  .cateGoryBox {
    display: flex;
    p {
      margin-right: 20px;
      font-weight: bold;
      color: #1B1D21;
    }
    .cateGorySelect {
      width: 250px;
    }
  }
}
 
</style>
