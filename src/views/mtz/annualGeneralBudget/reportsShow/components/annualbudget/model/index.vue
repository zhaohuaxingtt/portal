<template>
  <i-card v-permission.auto='MTZ_REPORT_DISPLAY_ANNUAL_BUDGET_CAR_MODEL_PAGE'>
    <!-- <i-card v-permission='MTZ_REPORT_ANNUAL_BUDGET_CAR_MODEL'> -->
    <div class='left'>
      <div class='let-top'>
        <i-select class='my-sel'
                  v-model='year'
                  :placeholder='language("LK_NIANFENXUANZE","年份选择")'>
          <el-option v-for="item in years"
                     :key="item.code"
                     :label="`${item.message}年`"
                     :value="item.code">
          </el-option>
        </i-select>
        <show-me-components class='margin-right30'
                            v-show="false"
                            @showOnlyMyselfData='leftShowOnlyMyselfData'
                            :is-only-myself='leftQueryForm.onlySeeMySelf' />
      </div>
      <div class='left-query'>
        <el-form>
          <i-select class='my-sel'
                    v-model='leftQueryForm.carModel'
                    filterable
                    clearable
                    @change='leftChangeCard'
                    :placeholder='language("LK_CHEXING","车型")'>
            <el-option value='' :disabled="disabledLeft"
                       :label="language('LK_ALL', '全部')"></el-option>
            <el-option v-for="item in leftModelList"
                       :disabled="disabledLeft"
                       :key="item.code"
                       :label="item.message"
                       :value="item.code">
            </el-option>
          </i-select>
          <i-select class='my-sel margin-left20'
                    clearable
                    filterable
                    v-model='leftQueryForm.carModelSixNum'
                    :placeholder='language("LK_CHEXINGSIXHAO","车型6位号")'>
            <el-option v-for="item in leftCarSixCode"
                       :key="item.code"
                       :label="item.message"
                       :value="item.code">
            </el-option>
          </i-select>
        </el-form>
        <div class='left-btns'>
          <i-button @click='getyearCardModel()'>{{ language('search', '搜索') }}</i-button>
          <i-button @click='leftRest()'>{{ language('LK_CHONGZHI', '重置') }}</i-button>
        </div>
      </div>
      <p class='margin-top25'><span class='money-title'>车型总金额:</span><span class='money'>{{leftAllPrice|format}}人民币</span></p>
      <i-table-custom class='margin-top20 margin-right20'
                      :columns="leftModelColumns"
                      :data="leftTableList"
                      @open-card-model='openCardModel'
                      @click-six-code='clickSixCode'></i-table-custom>
    </div>
    <div class='right'>
      <div class='right-top'>
        <p>{{language('LK_CHEXINGYUSUANJINEMINGXI','车型预算金额明细')}}</p>
        <show-me-components :is-only-myself='rightQueryForm.onlySeeMySelf'
                            v-show="false"
                            @showOnlyMyselfData='rightShowOnlyMysel' />
      </div>
      <div class='right-query'>
        <i-select class='my-sel'
                  v-model='rightQueryForm.carModel'
                  filterable
                  clearable
                  :placeholder='language("LK_CHEXING","车型")'
                  @change='rightChangeCard'>
          <el-option value='' :disabled="disabledRight"
                     :label="language('LK_ALL', '全部')"></el-option>
          <el-option v-for="item in rightModelList"
                     :disabled="disabledRight"
                     :key="item.code"
                     :label="item.message"
                     :value="item.code">
          </el-option>
        </i-select>
        <i-select class='my-sel margin-left20'
                  clearable
                  filterable
                  v-model='rightQueryForm.carModelSixNum'
                  :placeholder='language("LK_CHEXINGSIXHAO","车型6位号")'>
          <el-option v-for="item in rightCarSixCode"
                     :key="item.code"
                     :label="item.message"
                     :value="item.code">
          </el-option>
        </i-select>
        <div>
          <i-button @click='getCarModelDetail()'>{{ language('search', '搜索') }}</i-button>
          <i-button @click='rightRest()'>{{ language('LK_CHONGZHI', '重置') }}</i-button>
        </div>
      </div>
      <p class='margin-top25'><span class='money-title'>{{language('LK_CHEXINGZONGJINE','车型总金额')}}:</span><span class='money'>{{rightAllPrice|format}}人民币</span></p>
      <i-table-custom class='margin-top20 margin-right20'
                      min-height='500'
                      :columns="rightModelColums"
                      :data="rightTableList"></i-table-custom>
    </div>
  </i-card>
</template>

<script>
import { iCard, iSelect, iButton } from 'rise'
import ShowMeComponents from '@/views/mtz/annualGeneralBudget/reportsShow/components/comm/ShowMeComponents'
import iTableCustom from '@/components/iTableCustom'
import { cardList, carModelDetail, carSixCodeDropDown, yearCardModel, yearDropDown, yearCarModelExport } from '@/api/mtz/reportsShow'
import { leftModelColumns, rightModelColums } from '@/views/mtz/annualGeneralBudget/reportsShow/config/config'

export default {
  name: 'index',
  components: {
    ShowMeComponents,
    iCard,
    iSelect,
    iButton,
    iTableCustom,
  },
  created () {
    this.getLeftCardList()
    this.getRightCardList()
    this.getLeftCarSixCodeDropDown()
    this.getRightCarSixCodeDropDown()
    this.getYearDropDown()
    //this.getyearCardModel()
    //this.getCarModelDetail()
  },
  data () {
    return {
      //车型年度汇总请求参数
      leftQueryForm: {
        carModel: '',
        carModelSixNum: '',
        onlySeeMySelf: false,
        year: ''
      },
      // year:new Date().getFullYear()+'',
      year: '',
      //车型明细请求参数
      rightQueryForm: {
        carModel: '',
        carModelSixNum: '',
        onlySeeMySelf: false,
        year: new Date().getFullYear()
      },
      years: [],
      leftModelList: [],//左侧车型列表数据
      rightModelList: [],//右侧车型列表数据
      leftCarSixCode: [],//左侧车型6位号
      rightCarSixCode: [],//右侧车型6位号
      leftAllPrice: 0,//左侧汇总金额
      rightAllPrice: 0,//右侧汇总金额
      leftTableList: [],//左侧列表数据集合
      rightTableList: [],//右侧列表数据集合
      leftModelColumns,//左侧表头
      rightModelColums,//右侧表头,
      disabledLeft:false,
      disabledRight:false,
    }
  },
  methods: {
    Upload () {
      yearCarModelExport({
        carModel: this.leftQueryForm.carModel,
        carModelSixNum: this.leftQueryForm.carModelSixNum,
        onlySeeMySelf: this.leftQueryForm.onlySeeMySelf,
        year: this.year,
        carModelDetail: this.rightQueryForm.carModel,
        carModelSixNumDetail: this.rightQueryForm.carModelSixNum
      }).then(res => {
        let blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        let objectUrl = URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.href = objectUrl;
        let fname = this.year + "年MTZ车型预算.xlsx";
        link.setAttribute("download", fname);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        this.$message({
          type: "success",
          message: "链接成功!"
        });
      })
    },
    rightShowOnlyMysel (val) {
      this.rightQueryForm.onlySeeMySelf = val
      if (this.rightQueryForm.carModel) {
        this.getCarModelDetail()
      }
    },
    leftShowOnlyMyselfData (val) {
      this.leftQueryForm.onlySeeMySelf = val
      if (this.leftQueryForm.carModel) {
        this.getyearCardModel()
      }
    },
    //获取车型
    getLeftCardList () {
      cardList().then(res => {
        if (res.code == 200) {
          this.leftModelList = res.data.filter(item => item.code != 'ALL')
        }
      })
    },
    getRightCardList () {
      cardList().then(res => {
        if (res.code == 200) {
          this.rightModelList = res.data.filter(item => item.code != 'ALL')
        }
      })
    },
    //选中左车型的时候改变车型6位号
    leftChangeCard () {
      this.getLeftCarSixCodeDropDown()
    },
    //选中右侧车型的时候改变车型6位号
    rightChangeCard () {
      this.getRightCarSixCodeDropDown()
    },
    //获取年份
    getYearDropDown () {
      yearDropDown().then(res => {
        if (res.code == 200) {
          this.years = res.data

          var year = new Date().getFullYear();
          var yearList = [];
          this.years.forEach((e, index) => {
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

          this.year = res.data[message].code
          this.leftQueryForm.year = res.data[message].code
          this.years = this.years.reverse()
          this.years = this.years.filter(item => item.code != null)
        }
      })
    },
    //获取左侧车型6位号
    getLeftCarSixCodeDropDown () {
      if(this.disabledLeft) return 
      this.disabledLeft = true
      carSixCodeDropDown({ carModel: this.leftQueryForm.carModel }).then(res => {
        if (res.code == 200) {
          this.leftCarSixCode = res.data
        }
      }).finally(()=>{
        this.disabledLeft = false
      })
    },
    //获取右侧车型6位号
    getRightCarSixCodeDropDown () {
      if(this.disabledRight) return 
      this.disabledRight = true
      carSixCodeDropDown({ carModel: this.rightQueryForm.carModel }).then(res => {
        if (res.code == 200) {
          this.rightCarSixCode = res.data
        }
      }).finally(()=>{
        this.disabledRight = false
      })
    },
    //获取车型
    //获取车型明细
    getCarModelDetail () {
      this.rightQueryForm.year = this.year
      // if(this.rightQueryForm.carModel){
      carModelDetail(this.rightQueryForm).then(res => {
        if (res.code == 200) {
          this.rightAllPrice = res.data.allPrice
          if (res.data.lists) {
            this.rightTableList = res.data.lists
          } else {
            this.rightTableList = []
          }
        }
      })
      // }else{
      //   this.$message.warning('LK_QINGXUANZECHEXING','请选择车型')
      // }
    },
    //获取年度车型汇总
    getyearCardModel () {
      this.leftQueryForm.year = this.year
      // if(this.leftQueryForm.carModel){
      yearCardModel(this.leftQueryForm).then(res => {
        this.leftAllPrice = res.data.allPrice
        this.leftTableList = res.data.lists ? res.data.lists : []
      })
      // }
      // else{
      //   this.$message.warning('LK_QINGXUANZECHEXING','请选择车型')
      // }

    },
    //左侧置空
    leftRest () {
      this.leftQueryForm.carModel = ''
      this.leftQueryForm.carModelSixNum = ''
      this.leftQueryForm.onlySeeMySelf = false
      this.leftQueryForm.year = this.years[this.years.length - 1].code
      this.year = this.years[this.years.length - 1].code
      this.leftTableList = []
      this.leftCarSixCode = []
      this.getyearCardModel()
    },
    //右侧重置
    rightRest () {
      this.rightQueryForm.onlySeeMySelf = false
      this.rightQueryForm.carModelSixNum = ''
      this.rightQueryForm.carModel = ''
      // this.year=this.years[this.years.length-1].code
      this.rightTableList = []
      this.rightCarSixCode = []
      this.getCarModelDetail()
    },
    //点击列表车型
    openCardModel (row) {
      this.rightQueryForm.carModel = row.carModel
      this.rightQueryForm.carModelSixNum = ''
      this.getRightCarSixCodeDropDown()
      this.getCarModelDetail()
    },
    //点击列表六位号
    clickSixCode (row) {
      this.rightQueryForm.carModel = row.carModel
      this.rightQueryForm.carModelSixNum = row.carModel6Code
      this.getRightCarSixCodeDropDown()
      this.getCarModelDetail()
    },
  }
}
</script>

<style scoped lang='scss'>
::v-deep .cardBody {
  display: flex;
  flex-flow: row;
  height: calc(100vh - 240px) !important; // 父级没有定义高度
  .left {
    flex: 50% 0 0;
    .let-top {
      display: flex;
      justify-content: space-between;
      .my-sel {
        width: unset;
      }
    }

    .left-query {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      .my-sel {
        width: unset;
      }

      .left-btns {
        margin-right: 20px;
      }
    }
    overflow: auto;
    p .money-title {
      font-size: 16px;
      font-weight: bold;
      color: black;
    }
    .money {
      font-size: 16px;
      color: black;
    }
  }

  .right {
    flex: 50% 0 0;
    position: relative;
    overflow: auto;
    padding-left: 25px;
    &::before {
      content: ' ';
      width: 1px;
      height: 100%;
      background: #e1e2ed;
      margin-right: 5px;
      display: inline-block;
      vertical-align: top;
      position: absolute;
      left: 1px;
    }
    .right-top {
      display: flex;
      justify-content: space-between;
      p {
        font-size: 18px;
        font-weight: bold;
        height: 35px;
        line-height: 35px;
        color: black;
      }
    }
    .right-query {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      .my-sel {
        width: unset;
      }
    }
    p .money-title {
      font-size: 16px;
      font-weight: bold;
      color: black;
    }
    .money {
      font-size: 16px;
      color: black;
    }
  }
}
</style>