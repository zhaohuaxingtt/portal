<template>
  <div v-permission.auto="MTZ_REPORT_DISPLAY_ANNUAL_BUDGET_DEPARTMENT_PAGE"
       class="outFrame">
    <!-- <div
    v-permission.auto="
      MTZ_REPORT_ANNUAL_BUDGET_DEPARTMENT
    "
    class="outFrame"
  > -->
    <iButton @click="handleDownPdf"
             :loading="downloadLoading"
             class="exportData">{{ $t('LK_DAOCHU') }}</iButton>
    <div>
      <el-row :gutter="10">
        <el-col :span="12"
                class="total">
          <div class="flex-between-center-center card-header">
            <iSelect class="selectsize"
                     v-model="form['year']"
                     @change="selectYear">
              <el-option v-for="(item, index) in yearList"
                         :key="index"
                         :value="item.code"
                         :label="`${item.message} 年`" />
            </iSelect>

            <span>{{
              language('LK_DANWEIBAIWANRENMINGBI', '单位:百万人民币')
            }}</span>
          </div>
          <totalAmountComponent :key="keyString"
                                :deptData="deptData"
                                :showEchart="showEchart" />
        </el-col>
        <el-col :span="12"
                class="totalTwo">
          <div class="dataList">
            <span class="lastYearData">{{
              language('LK_SHANGYINIANSHUJUDUIBI', '上一年数据对比')
            }}</span><span class="unit">{{
              language('LK_DANWEIBAIWANRENMINGBI', '单位:百万人民币')
            }}</span>
          </div>
          <dataComparisonLastYear :key="keyString"
                                  :deptData="deptData"
                                  :showEchart="showEchart" />
        </el-col>
      </el-row>
    </div>

    <div ref="pdf"
         id="pdf">
      <div class="pdf-name"
           id="pdf-name">
        {{ form['year'] }}-MTZ年度预算-科室
      </div>
      <el-row :gutter="10">
        <el-col :span="12"
                class="total">
          <div class="flex-between-center-center card-header">
            <iSelect class="selectsize"
                     v-model="form['year']"
                     @change="selectYear">
              <el-option v-for="(item, index) in yearList"
                         :key="index"
                         :value="item.code"
                         :label="`${item.message} 年`" />
            </iSelect>

            <span>{{
              language('LK_DANWEIBAIWANRENMINGBI', '单位:百万人民币')
            }}</span>
          </div>
          <totalAmountComponent :key="keyString"
                                :deptData="deptData"
                                :showEchart="showEchart"
                                chartId="chartTotal2" />
        </el-col>
        <el-col :span="12"
                class="totalTwo">
          <div class="dataList">
            <span class="lastYearData">{{
              language('LK_SHANGYINIANSHUJUDUIBI', '上一年数据对比')
            }}</span><span class="unit">{{
              language('LK_DANWEIBAIWANRENMINGBI', '单位:百万人民币')
            }}</span>
          </div>
          <dataComparisonLastYear :key="keyString"
                                  :deptData="deptData"
                                  :showEchart="showEchart"
                                  chartId="chartData2" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { iSelect, iButton } from 'rise'
import totalAmountComponent from './components/totalAmountComponent'
import dataComparisonLastYear from './components/dataComparisonLastYear'
import { yearBudgetDept, yearDropDown } from '@/api/mtz/reportsShow'
import { form } from './components/data'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  name: 'index',
  components: {
    iSelect,
    totalAmountComponent,
    dataComparisonLastYear,
    iButton
  },
  data () {
    return {
      form: form,
      yearList: [], //年份数据
      deptData: { lastYearPrice: '0.00', curYear: '', lastYear: '' }, //金额数据
      keyString: 0,
      showEchart: false,
      pdf: null,
      downloadLoading: false
    }
  },
  async created () {
    await this.getYearDropDown()
    this.queryYearBudgetDept()

  },
  methods: {
    //数据查询
    queryYearBudgetDept () {
      console.log(this.form, "==============")
      this.form.onlySeeMySelf = false
      yearBudgetDept(this.form)
        .then((res) => {
          if (+res.code == 200) {
            this.deptData = res.data
            this.showEchart = true
            this.keyString += 1
          } else {
            this.deptData = { lastYearPrice: '0.00', curYear: '', lastYear: '' }
            this.showEchart = true
            this.keyString += 1
            this.$message.error(res.desZh)
          }
        })
        .catch((err) => {
          console.log(err)
        })

    },
    //获取年数据
    async getYearDropDown () {
      await yearDropDown(false)
        .then((res) => {
          this.yearList = res.data
          var year = new Date().getFullYear();
          var yearList = [];
          res.data.forEach((e, index) => {
            yearList.push({
              num: Math.abs(e.code - year),
              index: index
            })
          });
          var minNumber = Math.min.apply(Math, yearList.map(function (o) { return o.num }))
          var message = 0;
          for (var i = 0; i < yearList.length; i++) {
            if (yearList[i].num == minNumber) {
              message = yearList[i].index;
              break;
            }
          }
          this.form['year'] = this.yearList[message].message
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //选择年
    selectYear (val) {
      this.form.year = val
      this.queryYearBudgetDept()
    },
    //导出
    handleDownPdf () {
      this.downloadPdf({
        idEle: 'pdf',
        pdfName: `${this.form.year}-MTZ年度预算-科室`
      })
    },
    downloadPdf ({ idEle: ele, pdfName: pdfName, callback: callback }) {
      this.downloadLoading = true
      const el = document.getElementById(ele) //通过getElementById获取要导出的内容

      el.style.opacity = 1
      let eleW = el.offsetWidth // 获得该容器的宽
      let eleH = el.offsetHeight // 获得该容器的高

      let eleOffsetTop = el.offsetTop // 获得该容器到文档顶部的距离
      let eleOffsetLeft = el.offsetLeft // 获得该容器到文档最左的距离
      var canvas = document.createElement('canvas')
      var abs = 0
      let win_in =
        document.documentElement.clientWidth || document.body.clientWidth // 获得当前可视窗口的宽度（不包含滚动条）
      let win_out = window.innerWidth // 获得当前窗口的宽度（包含滚动条）

      if (win_out > win_in) {
        abs = (win_out - win_in) / 2 // 获得滚动条宽度的一半
      }
      canvas.width = eleW * 2 // 将画布宽&&高放大两倍
      canvas.height = eleH * 2

      var context = canvas.getContext('2d')
      context.scale(2, 2)
      context.translate(-eleOffsetLeft - abs, -eleOffsetTop)
      html2canvas(el, {
        dpi: 96, //分辨率
        scale: 2, //设置缩放
        useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
        //backgroundColor:'#ffffff',这样背景还是黑的
        bgcolor: '#ffffff', //应该这样写
        logging: false //打印日志用的 可以不加默认为false
      })
        .then((canvas) => {
          el.style.opacity = 0
          el.setAttribute('crossOrigin', 'anonymous')
          var contentWidth = canvas.width
          var contentHeight = canvas.height
          //一页pdf显示html页面生成的canvas高度;
          var pageHeight = (contentWidth / 592.28) * 641.89
          //未生成pdf的html页面高度
          var leftHeight = contentHeight
          //页面偏移
          var position = 0
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = 841.89
          var imgHeight = (841.89 / contentWidth) * contentHeight

          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          var pdf = new JsPDF('l', 'pt', 'a4')

          if (leftHeight < pageHeight) {
            //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            // 分页
            while (leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              //避免添加空白页
              if (leftHeight > 0) {
                pdf.addPage()
              }
            }
          }
          //可动态生成
          pdf.save(pdfName)
          if (callback) {
            callback(pdf, pdfName)
          }
          this.downloadLoading = false
        })
        .catch(() => {
          el.style.opacity = 0
          this.downloadLoading = false
        })
    }
  },
  mounted () {
    this.pdf = this.$refs.pdf
  }
}
</script>

<style lang="scss" scoped>
.outFrame {
  position: relative;
  .exportData {
    position: absolute;
    top: -58px;
    right: 10px;
  }
}
.total {
  position: relative;
  background-color: white;
  height: 100%;
  .card-header {
    margin: 30px 20px 0px 20px;
    position: relative;
  }
  .selectsize {
    width: 220px;
  }

  /* .selectsize {
    width: 220px;
    margin-top: 30px;
    margin-left: 20px;
  }
  span {
    position: absolute;
    right: 30px;
    top: 30px;
  } */
}

.el-row {
  ::v-deep .el-col-12 {
    border-right: 20px solid rgb(248, 249, 250);
    border-radius: 8px;
  }
}

.totalTwo {
  position: relative;
  background-color: white;
  height: 100%;
  .dataList {
    height: 68px;
  }

  .lastYearData {
    position: absolute;
    left: 30px;
    top: 30px;
    font-size: 20px;
    color: black;
  }

  .unit {
    position: absolute;
    right: 30px;
    top: 30px;
  }
}
#pdf {
  margin-top: 50px;
  padding-top: 300px;
  position: relative;
  opacity: 0;
  .pdf-name {
    /* display: none; */
    position: absolute;
    top: 0px;
    left: 15px;
  }
}
</style>
