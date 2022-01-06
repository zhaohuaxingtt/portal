<template>
  <i-card>
    <div class='left'>
        <div class='let-top'>
          <i-select class='my-sel' v-model='year' :placeholder='language("LK_NIANFENXUANZE","年份选择")'>
            <el-option
              v-for="item in years"
              :key="item.code"
              :label="`${item.message}年`"
              :disabled="item.code>new Date().getFullYear()"
              :value="item.code">
            </el-option>
          </i-select>
          <show-me-components class='margin-right30' :is-only-myself='leftQueryForm.onlySeeMySelf' />
        </div>
        <div class='left-query'>
          <el-form>
            <i-select class='my-sel' v-model='leftQueryForm.carModel' @change='leftChangeCard' :placeholder='language("LK_CHEXING","车型")'>
              <el-option value=''  :label="language('LK_ALL', '全部')" ></el-option>
              <el-option
                v-for="item in leftModelList"
                :key="item.code"
                :label="item.message"
                :value="item.code">
              </el-option>
            </i-select>
            <i-select class='my-sel margin-left20' clearable v-model='leftQueryForm.carModelSixNum' :placeholder='language("LK_CHEXINGSIXHAO","车型6位号")'>
              <el-option
                v-for="item in leftCarSixCode"
                :key="item.code"
                :label="item.message"
                :value="item.code">
              </el-option>
            </i-select>
          </el-form>
          <div class='left-btns'>
            <i-button @click='getyearCardModel()'>{{ language('LK_CHAXUN', '查询') }}</i-button>
            <i-button @click='leftRest()'>{{ language('LK_CHONGZHI', '重置') }}</i-button>
          </div>
        </div>
      <p class='margin-top25'><span class='money-title'>车型总金额:</span><span class='money'>{{leftallPrice|format}}人民币</span></p>
      <i-table-custom class='margin-top20 margin-right20'  :columns="leftModelColumns"
                      :data="leftTableList"
                      @open-card-model='openCardModel'
      ></i-table-custom>
    </div>
    <div class='right'>
      <div class='right-top'>
        <p>{{language('LK_CHEXINGYUSUANJINEMINGXI','车型预算金额明细')}}</p>
        <show-me-components/>
      </div>
      <div class='right-query'>
        <el-form>
          <i-select class='my-sel' v-model='rightQueryForm.carModel' :placeholder='language("LK_CHEXING","车型")' @change='rightChangeCard'>
            <el-option value=''  :label="language('LK_ALL', '全部')" ></el-option>
            <el-option
              v-for="item in rightModelList"
              :key="item.code"
              :label="item.message"
              :value="item.code">
            </el-option>
          </i-select>
          <i-select class='my-sel margin-left20' clearable v-model='rightQueryForm.carModelSixNum' :placeholder='language("LK_CHEXINGSIXHAO","车型6位号")'>
            <el-option
              v-for="item in rightCarSixCode"
              :key="item.code"
              :label="item.message"
              :value="item.code">
            </el-option>
          </i-select>
        </el-form>
        <div >
          <i-button @click='getCarModelDetail()'>{{ language('LK_CHAXUN', '查询') }}</i-button>
          <i-button @click='rightRest()'>{{ language('LK_CHONGZHI', '重置') }}</i-button>
        </div>
      </div>
      <p class='margin-top25'><span class='money-title'>{{language('LK_CHEXINGZONGJINE','车型总金额')}}:</span><span class='money'>{{rightAllPrice|format}}人民币</span></p>
      <i-table-custom class='margin-top20 margin-right20' min-height='500' :columns="rightModelColums"
                      :data="rightTableList" ></i-table-custom>
    </div>
  </i-card>
</template>

<script>
import { iCard, iSelect, iButton } from 'rise'
import ShowMeComponents from '@/views/mtz/annualGeneralBudget/reportsShow/components/comm/ShowMeComponents'
import iTableCustom from '@/components/iTableCustom'
import { cardList, carModelDetail, carSixCodeDropDown, yearCardModel, yearDropDown } from '@/api/mtz/reportsShow'
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
  created() {
    this.getLeftCardList()
    this.getRightCardList()
    this.getLeftCarSixCodeDropDown()
    this.getRightCarSixCodeDropDown()
    this.getYearDropDown()
    this.getyearCardModel()
    this.getCarModelDetail()
  },
  data(){
    return {
      //车型年度汇总请求参数
      leftQueryForm:{
        carModel:'',
        carModelSixNum:'',
        onlySeeMySelf:false,
        year:new Date().getFullYear()+''
      },
      year:new Date().getFullYear()+'',
      //车型明细请求参数
      rightQueryForm:{
        carModel:'',
        carModelSixNum:'',
        onlySeeMySelf:false,
        year:new Date().getFullYear()
      },
      years:[],
      leftModelList:[],//左侧车型列表数据
      rightModelList:[],//右侧车型列表数据
      leftCarSixCode:[],//左侧车型6位号
      rightCarSixCode:[],//右侧车型6位号
      leftallPrice:0,//左侧汇总金额
      rightAllPrice:0,//右侧汇总金额
      leftTableList:[],//左侧列表数据集合
      rightTableList:[],//右侧列表数据集合
      leftModelColumns,//左侧表头
      rightModelColums//右侧表头
    }
  },
  methods:{
    //获取车型
    getLeftCardList(){
      cardList().then(res=>{
        if(res.code==200){
          this.leftModelList=res.data
          this.leftModelList=this.leftModelList.filter(item=>item.code!='ALL')
        }
      })
    },
    getRightCardList(){
      cardList().then(res=>{
        if(res.code==200){
          this.rightModelList=res.data
          this.rightModelList=this.rightModelList.filter(item=>item.code!='ALL')
        }
      })
    },
    //选中左车型的时候改变车型6位号
    leftChangeCard(){
      this.getLeftCarSixCodeDropDown()
    },
    //选中右侧车型的时候改变车型6位号
    rightChangeCard(){
      this.getRightCarSixCodeDropDown()
    },
    //获取年份
    getYearDropDown(){
      yearDropDown().then(res=>{
       if(res.code==200){
         this.years=res.data
         this.years=this.years.reverse()
         this.years=this.years.filter(item=>item.code!=null)
       }
      })
    },
    //获取左侧车型6位号
    getLeftCarSixCodeDropDown(){
      carSixCodeDropDown({carModel:this.leftQueryForm.carModel}).then(res=>{
        if(res.code==200){
          this.leftCarSixCode=res.data
        }
      })
    },
    //获取右侧车型6位号
    getRightCarSixCodeDropDown(){
      carSixCodeDropDown({carModel:this.rightQueryForm.carModel}).then(res=>{
        if(res.code==200){
          this.rightCarSixCode=res.data
        }
      })
    },
    //获取车型
    //获取车型明细
    getCarModelDetail(){
      this.rightQueryForm.year=this.year
      carModelDetail(this.rightQueryForm).then(res=>{
        if(res.code==200){
          this.rightAllPrice=res.data.allPrice
          this.rightModelList=res.data.lists
        }
      })
    },
    //获取年度车型汇总
    getyearCardModel(){
      this.leftQueryForm.year=this.year
      yearCardModel(this.leftQueryForm).then(res=>{
        this.leftallPrice=res.data.allPrice
        this.leftTableList=res.data.lists
      })
    },
    //左侧置空
    leftRest(){
      this.leftQueryForm.carModel=''
      this.leftQueryForm.carModelSixNum=''
      this.leftQueryForm.onlySeeMySelf=false
      this.leftQueryForm.year=new Date().getFullYear()+''
      this.year=new Date().getFullYear()+''
      this.getyearCardModel()
    },
   //右侧重置
    rightRest(){
      this.rightQueryForm.onlySeeMySelf=false
      this.rightQueryForm.carModelSixNum=''
      this.rightQueryForm.carModel=''
      this.year=new Date().getFullYear()+''
      this.getCarModelDetail()
    },
    //点击列表车型
    openCardModel(row){
      this.rightQueryForm.carModel=row.carModel
      this.rightQueryForm.carModelSixNum=row.carModel6Code
      this.getCarModelDetail()
    }

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
      .my-sel{
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
    p .money-title{
      font-size: 16px;
      font-weight: bold;
      color: black;
    }
    .money{
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
      background: #E1E2ED;
      margin-right: 5px;
      display: inline-block;
      vertical-align: top;
      position: absolute;
      left: 1px;

    }
    .right-top {
      display: flex;
      justify-content: space-between;
      p{
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
    p .money-title{
      font-size: 16px;
      font-weight: bold;
      color: black;
    }
    .money{
      font-size: 16px;
      color: black;
    }
  }


}

</style>