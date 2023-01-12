<template>
  <iCard style="height: 16rem">
    <div class="title">
      <p>{{ language('DINGDIAN', '定点') }}</p>
      <span class="el-dropdown-link" @click="gotoUrl">
        <i class="el-icon-more"></i>
      </span>
    </div>
    <!-- <div class="center"> <span style="font-size:16px;color:rgba(107, 121, 149, 0.56);">{{language('JINGQINGQIDAI', '敬请期待')}}</span></div> -->

    <!-- </div> -->
    <div class="box">
      <img :src="img" class="imgIcon" />
      <div class="boxTitle">
        <p>{{ rate }} </p>
        <div>
          <span>{{name}}</span>
        </div>
      </div>
      <div ref="chart" class="chartStyle"></div>
    </div>
  </iCard>
</template>
<script>
import echarts from '@/utils/echarts'
import { iCard } from 'rise'
import img from '@/assets/images/fixed.svg'
import { getSupplierRfqNominatedDis } from '@/api/supplierManagement/supplierCard/index'

export default {
  props: {},
  components: {
    iCard
  },
  data() {
    return {
      chart: 'oneChart',
      img: img,
      datainfo: [],
      rate:'',
      name:''
    }
  },
  computed: {
    style() {
      return {}
    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    gotoUrl(){
      let url =
        process.env.VUE_APP_HOST +
        `/sourcing/#/sourcing/partsnomination`
       window.open(url)
    },
    init() {
      getSupplierRfqNominatedDis(this.route.query.subSupplierId).then((res) => {
        if (res.data) {
          this.datainfo = res.data
          let data = []
          this.datainfo.forEach((ele) => {
            data.push({
              value: ele.num,
              name: ele.categoryName,
              rate: ele.rate
            })
          })
          const myChart = echarts().init(this.$refs.chart)
          var option = {
            grid: {
              right: '10%'
            },
            tooltip: {
              trigger: 'item'
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
                  borderWidth: 1
                },
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                data: data
              }
            ]
          }
          myChart.setOption(option)
          myChart.on('click', (params) => {
            this.$nextTick(()=>{
              this.rate = params.data.rate
              this.name=params.data.name
            })
          })
        }
      })
    },

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
  }

  span {
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
  height: 100%;
  display: flex;
  height: 160px;
  align-items: center;
  justify-content: space-between;
  .chartStyle {
    width: 55%;
    height: 100%;
  }
}
.box:nth-child(1) div {
  margin: 6px;
}
.center {
  height: 160px;
  display: flex;
  align-items: center;
}
</style>
