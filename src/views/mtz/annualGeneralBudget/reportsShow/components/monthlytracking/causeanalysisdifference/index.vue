<!--差异原因分析--->
<template>
  <div class="OuterFrame">
    <iSearch class="OuterIsearch" @sure="sure" @reset="reset">
      <el-form>
        <el-form-item :label="language('LK_MTZCAILIAOZU', 'MTZ材料组')">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form['MtzMaterial']"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              v-for="(item, index) in MtzMaterialList"
              :key="index"
              :value="item.materialGroupCode"
              :label="item.materialGroupNameZh"
            />
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_CAILIAOZHONGLEI', '材料中类')">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form['MaterialMedium']"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              v-for="(item, index) in MaterialMediumList"
              :key="index"
              :value="item.materialCategoryCode"
              :label="item.materialNameZh"
            />
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_BIJIAOBANBEN', '比较版本')">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form['VersionMonthOne']"
          >
            <el-option
              v-for="(item, index) in getVersionMonth"
              :key="index"
              :value="item.value"
              :label="item.value"
            />
          </iSelect>
        </el-form-item>
        <div class="backgroundBox"></div>
        <el-form-item label="  ">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            class="compareTwo"
            v-model="form['VersionMonthTwo']"
          >
            <el-option
              v-for="(item, index) in getVersionMonth"
              :key="index"
              :value="item.value"
              :label="item.value"
            />
          </iSelect>
        </el-form-item>
        <div
          class="showMe"
          v-permission="BUYER_FIXEDASSETS_ASSETSLIST_BTN_JUST_LOOK_YOURSELF"
        >
          <span>{{ language('只看自己 ') }}</span>
          <el-switch
            v-model="form['onlySeeMySelf']"
            @change="showOnlyMyselfData($event)"
            active-color="#1660F1"
            inactive-color="#cccccc"
          >
          </el-switch>
        </div>

        <span class="monthlyCompare">{{
          language('LK_YUEFENBIJIAO', '月份比较')
        }}</span>
        <el-date-picker
          class="monthlyPosition"
          v-model="form['getMonth']"
          type="monthrange"
          range-separator="-"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyyMM"
        >
        </el-date-picker>
      </el-form>
    </iSearch>
    <iCard>
      <div class="listDetails">
        <span>{{ language('LK_XIANGQINGLIEBIAO', '详情列表') }}</span>
        <iButton @click="exportData" class="exportPosition">{{
          $t('LK_DAOCHU')
        }}</iButton>
      </div>
      <detailsList
        :differenceAnalysis="differenceAnalysis"
        :dataTitle="form['VersionMonthOne']"
        :num="num"
        :dataTitleTwo="form['VersionMonthTwo']"
      />
      <iPagination
        @current-change="handleCurrentChange($event, clickQuery)"
        @size-change="handleSizeChange($event, clickQuery)"
        background
        :total="page.total"
      />
    </iCard>
  </div>
</template>

<script>
import { iSearch, iSelect, iCard, iButton, iPagination } from 'rise'
import detailsList from './components/detailsList'
import { form } from './components/data'
import {
  queryMtzMaterial,
  queryMaterialMedium,
  getVersionData,
  yearMonthDropDown,
  differenceAnalysis,
  differenceAnalysisExport
} from '@/api/mtz/reportsShow'
import { pageMixins } from '@/utils/pageMixins'
export default {
  name: 'index',
  mixins: [pageMixins],
  components: {
    iSearch,
    iSelect,
    iCard,
    iButton,
    detailsList,
    iPagination
  },
  data() {
    return {
      form: form,
      MtzMaterialList: [], //MTZ材料组数据
      MaterialMediumList: [], //材料中类数据
      versionMonth: 'm', //比较版本
      getVersionMonth: [], //获取后端传回来的比较版本
      getMonthList: '', //获取默认月份
      mothlyValue: '',
      differenceAnalysis: '', //列表数据
      dataTitle: '', //时间title
      num: '', //
      dataTitleTwo: '',
      currentMonth: '' //当前月份
    }
  },
  created() {
    this.MtzMaterial()
    this.MaterialMedium()
    this.getVersionDataList()
  },
  methods: {
    //MTZ材料组
    MtzMaterial() {
      queryMtzMaterial()
        .then((res) => {
          this.MtzMaterialList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //材料中类
    MaterialMedium() {
      queryMaterialMedium()
        .then((res) => {
          this.MaterialMediumList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //比较版本
    getVersionDataList() {
      getVersionData(this.versionMonth)
        .then((res) => {
          this.getVersionMonth = res.data
          this.form['VersionMonthOne'] = this.getVersionMonth[0].value
          this.form['VersionMonthTwo'] = this.getVersionMonth[0].value
          this.getCurrentMonth()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //获取当月月份
    getCurrentMonth() {
      var dd = new Date()
      var m = dd.getMonth() + 1
      this.currentMonth = m
      this.getyearMonthDropDown()
    },
    //获取年月份
    getyearMonthDropDown() {
      yearMonthDropDown()
        .then((res) => {
          if (this.currentMonth == '1' || this.currentMonth == '2') {
            var arr = ['', '']
            this.form['getMonth'] = [arr[0], arr[1]]
            this.getdifferenceAnalysis()
          } else {
            this.getMonthList = res.data
            var arr = [this.getMonthList[1].code, this.getMonthList[0].code]
            this.form['getMonth'] = [arr[0], arr[1]]
            this.getdifferenceAnalysis()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //获取列表数据
    getdifferenceAnalysis() {
      this.form.pageNo = 1
      this.form.pageSize = 10
      this.form.versionOneName = this.form['VersionMonthTwo']
      this.form.versionTwoName = this.form['VersionMonthTwo']
      this.form.yearMonths = this.form['getMonth']
      differenceAnalysis(this.form)
        .then((res) => {
          this.differenceAnalysis = res.data
          this.page.total = res.total
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.pages
          // console.log()
          // if ((this.differenceAnalysis[0].compareDataList.length = 1)) {
          //   this.dataTitle =
          //     this.differenceAnalysis[0].compareDataList[0].compareName
          //   this.num = 1
          // }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    //重置查询条件
    reset() {
      for (let i in this.form) {
        if (i !== 'onlySeeMySelf') {
          this.form[i] = ''
        }
        this.getVersionDataList()
      }
    },
    sure() {
      this.getdifferenceAnalysis()
    },
    //仅看自己
    showOnlyMyselfData(val) {
      this.form.onlySeeMySelf = val
      this.getdifferenceAnalysis()
    },
    //导出
    exportData() {
      this.form.pageNo = 1
      this.form.pageSize = 10
      this.form.versionOneName = this.form['VersionMonthTwo']
      this.form.versionTwoName = this.form['VersionMonthTwo']
      this.form.yearMonths = this.form['getMonth']
      differenceAnalysisExport(this.form)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.OuterFrame {
  position: relative;
}
.showMe {
  position: absolute;
  right: 270px;
  top: 60px;
  display: flex;
  align-items: center;
  height: 30px;
  span {
    font-size: 20px;
    color: #000000;
    align-content: center;
  }
  .el-switch {
    margin-left: 10px;
  }
}

.monthlyCompare {
  position: absolute;
  left: 40px;
  top: 115px;
}

.monthlyPosition {
  width: 220px;
  position: absolute;
  left: 40px;
  top: 138px;
}
.OuterIsearch {
  min-height: 200px;
  margin-bottom: 20px;
}

.compareTwo {
  position: absolute;
  left: 0px;
  top: 21px;
}

.backgroundBox {
  width: 50px;
  height: 37px;
  background-color: #f5f5f5;
  position: absolute;
  top: 56px;
  left: 800px;
}

.exportPosition {
  position: absolute;
  right: 40px;
  top: 250px;
}

.listDetails {
  margin-bottom: 25px;
  span {
    font-size: 20px;
  }
}
</style>