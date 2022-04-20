<template>
  <iCard style="height:25rem">
    <div class="title">
      <p>{{language('DINGDIAN', '定点')}}</p>
      <el-dropdown v-permission="Card_Sourcing_More">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{language('CHAKAN', '查看')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="box">
      <img :src="img"
           class="imgIcon" />
      <div class="boxTitle">
        <p>{{number}}%</p>
        <span>GP</span>
      </div>
    </div>
    <div ref="chart" class="chartStyle"></div>
  </iCard>
</template>
<script>
import echarts from '@/utils/echarts'
import { iCard } from 'rise'
import img from '@/assets/images/fixed.svg'
export default {
  props: {},
  components: {
    iCard,
  },
  data () {
    return {
      chart: 'oneChart',
      img: img,
      myChart:null,
      dataList:[],
      maxNumber:[],
      number:"",
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  props:{
    gpFixPointVos:{
      type: Array,
      default: () => {
        return []
      }
    },
  },
  watch: {
    gpFixPointVos(val){
      if(val){
        this.dataList = val;
        this.dataList.forEach(e => {
          this.maxNumber.push(e.percent)
          e.value = e.percent;
          e.name = e.deptNum;
          delete e.percent;
          delete e.deptNum;
        });
        this.getCanvas();

        setTimeout(() => {
          console.log(this.maxNumber.join("+"))
          this.number = ((Math.max.apply(null,this.maxNumber))*100).toFixed(0)
          console.log(this.number)
        }, 0);
      }
    }
  },
  methods: {
    getCanvas(){
      this.myChart = echarts().init(this.$refs.chart)
      var option = {
        grid: {
          right: '10%'
        },
        tooltip: {
          trigger: 'item',
          formatter:(params)=>{
            console.log(params)
              var html = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+ params.color +'"></span>';
              return html + params.name +":"+params.value + "<br/>百分比：" + ((params.value/eval(this.maxNumber.join("+")))*100).toFixed(0) + "%";
          }
        },
        series: [
          {
            labelLine: {
              normal: {
                length: 5, // 改变标示线的长度
                lineStyle: {
                  color: '#8C98AC' // 改变标示线的颜色
                }
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 5
            },
            type: 'pie',
            radius: ['40%', '70%'],
            data: this.dataList
          }
        ]
      }
      this.myChart.setOption(option)
    }
  },
  mounted () {
    
  }
}
</script>

<style lang="scss" scoped>
.imgIcon {
  width: 60px;
  height: 60px;
}
.title {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  p {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    color: #131523;
  }
  i {
    font-size: 20px;
    cursor: pointer;
    color: #4d4d4d;
  }
}
.early {
  font-size: 70px;
  padding-right: 10px;
}
.boxTitle {
  padding-left: 30px;
  p {
    text-align: center;
    width: 120px;
    font-size: 40px;
    font-family: Arial;
    font-weight: bold;
    color: #1660f1;
    display: inline-block;
  }

  span {
    margin-left: 40px;
    text-align: center;
    font-size: 12px;
    font-family: Arial;
    font-weight: 400;
    color: #7e8ca6;
  }
  p {
    width: 120px;
  }
}
::v-deep .card ::v-deep.cardHeader {
  padding: 0;
}
.box {
  height:80px;
  padding-top:20px;
  display: flex;
  align-items: center;
}
.chartStyle {
  width: 100%;
  height: calc(100% - 100px);
  margin:-10px auto 0;
}
.box:nth-child(1) div {
  margin: 6px;
}
.center {
  height: 160px;
  display: flex;
  align-items: center;
}
::v-deep .cardBody{
  height:25rem!important;
}
</style>