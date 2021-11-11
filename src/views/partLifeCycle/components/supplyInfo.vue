<template>
  <iCard class="supplyInfo" v-loading="pageLoading">
    <div class="head">
      <div class="h-l">
        <div class="title">供应信息</div>
      </div>
      <div class="h-r">
        <transition>
          <i class="el-icon-arrow-down icon" @click="openPage" :class="{rotate:isOpen}"></i>
        </transition>
      </div>
    </div>

    <div class="histogram">
      <div class="title">供应商份额</div>
      <div class="echarts-box" id="echarts-box">

      </div>
      
      <div class="factoryShare" v-show="isOpen">
        <div class="head">
          <div class="title">工厂份额</div>
          <iSelect
              :placeholder="language('LK_QINGXUANZHE', '请选择')"
              filterable
              v-model="yaer"
              class="iSelect"
              @change="yaerChange"
            >
              <el-option
                :value="item"
                :label="item"
                v-for="(item, index) in yearList"
                :key="index"
              ></el-option>
            </iSelect>
        </div>

        <div class="echarts-share" id="echarts-share"></div>
      </div>
    </div>
  </iCard>
</template>

<script>
import { findSupplyList, getYearPullDown, findPartsFactory } from '@/api/partLifeCycle';
import echarts from '@/utils/echarts';
import { iCard, iSelect } from 'rise';
export default {
  name: 'supplyInfo',
  components: {
    iCard, iSelect
  },

  data(){
    return {
      isOpen: false,
      pageLoading: false,
      yearList: [],
      yaer: 0,
      partsNum: '',
    }
  },

  created(){
    this.partsNum = this.$route.query.partsNum
    this.findSupplyList();
    // this.getYearList();
  },

  methods: {

    yaerChange(){
      this.findPartsFactory();
    },

    getRandom(start, end, fixed=0){
      let differ = end - start;
      let random = Math.random();
      return (start + differ + random).toFixed(fixed);
    },

    findPartsFactory(){
      findPartsFactory({
        partsNum: this.partsNum,
        year: this.yaer,
      }).then(res => {
        const list = res.data;

        this.$nextTick(() => {
          const chart1 = echarts().init(document.getElementById('echarts-share'));
          const colors = ['#1964F3', '#72A1FA', '#AEC9FF', '#66C8D5', '#8DD9E2', '#BAEBF1', '#77CCFF', '#C3E8FF', '#1660F2'];

          const option = {
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['20%', '40%'],
                avoidLabelOverlap: false,
                label: {
                  formatter: '{xx|}{aa|}{b}\n {d}%\n {c}',
                  rich: {
                    aa: {
                      width: 10,
                    },
                    xx: {
                      width: 10,
                      height: 10,
                      backgroundColor: 'red',
                      borderRadius: 10,
                    },
                  }
                },
                labelLine: {
                  show: false
                },
                data: list.map((item, index) => ({
                  value: item.factoryUse,
                  name: item.factoryName,
                  itemStyle: {
                    color: colors[index > list.length - 1 ? index - list.length : index]
                  },
                  label: {
                  formatter: `{xx|}{aa|}{b}\n {d}%\n {c}`,
                  rich: {
                    aa: {
                      width: 10,
                    },
                    xx: {
                      width: 10,
                      height: 10,
                      backgroundColor: colors[index > list.length - 1 ? index - list.length : index],
                      borderRadius: 10,
                    },
                  }
                },
                }))
              }
            ]
          };

          chart1.setOption(option)
        })
      })
    },

    getYearList(){
      getYearPullDown({
        partsNum: this.partsNum
      }).then(res => {
        this.yearList = res.data;
        this.yaer = res.data[0] || new Date().getFullYear()

        setTimeout(this.findPartsFactory(), 1000)
      })
    },

    findSupplyList(){
      this.pageLoading = true;
      findSupplyList({
        partsNum: this.partsNum
      }).then(res => {
        const list = res.data.filter(item => item.isPermission);  //  过滤权限
        
        this.$nextTick(() => {
          const chart1 = echarts().init(document.getElementById('echarts-box'))

          const option = {
            title: {
              text: ''
            },
            tooltip: {
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              top: '-10%',
              left: '2%',
              right: '0%',
              bottom: '0%',
              containLabel: true
            },
            xAxis: {
              show: false,
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              axisLine:false,
              data: list.map(item => item.supplierName),
              axisLabel: {
                  formatter: function (value) {
                    let ret = "";// 拼接加\n返回的类目项
                    let maxLength = 5;// 每项显示文字个数
                    let valLength = value.length;// X轴类目项的文字个数
                    let rowN = Math.ceil(valLength / maxLength); // 类目项需要换行的行数
                    if (rowN > 1) {
                      for (let i = 0; i < rowN; i++) {
                        let temp = "";// 每次截取的字符串
                        let start = i * maxLength;// 开始截取的位置
                        let end = start + maxLength;// 结束截取的位置
                        // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                        temp = value.substring(start, end) + "\n";
                        ret += temp; // 凭借最终的字符串
                      }
                      return ret;
                    }
                    return value;
                  }
              },
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                
              }
            },
            series: [
              {
                name: '2011',
                type: 'bar',
                barWidth: 20,
                data: list.map(item => item.predictAmount),
                itemStyle: {
                  normal: {
                    barBorderRadius: [5,5,5,5],
                    color: '#1660F1',
                    label: {
                      show: true, //自动显示数据
                      position: 'right', //在上方显示
                      offset: [-70,0],
                      textStyle: { //数值样式
                            color: '#fff',
                            fontSize: 14
                        }
                    },
                  },
                  
                }
              },
              {
                name: '2012',
                type: 'bar',
                barWidth: 20,
                data: list.map(item => item.supplyAmount),
                barGap:'100%',/*多个并排柱子设置柱子之间的间距*/
                itemStyle: {
                  normal: {
                    barBorderRadius: [5,5,5,5],
                    color: '#73A1FA',
                    label: {
                      show: true, //自动显示数据
                      position: 'right', //在上方显示
                      offset: [-70,0],
                      textStyle: { //数值样式
                            color: '#fff',
                            fontSize: 14
                        }
                    },
                  }
                }
              }
            ]
          };

          chart1.setOption(option)
        })

        this.pageLoading = false;
      }).catch(err => {
        this.pageLoading = false;
      })
    },

    openPage(){
      this.isOpen = !this.isOpen;
      if(this.isOpen){
        this.getYearList();
      }
    }
  },
}
</script>

<style scoped lang="scss">
.supplyInfo{

  .factoryShare{

    .iSelect{
      width: 80px;
    }

    .head{
      display: flex;
      justify-content: space-between;

      .title{
        font-size: 14px;
        font-weight: bold;
        color: #131523;
      }
    }
  }

  .rotate {
    transform: rotate(180deg);
    top: -16px !important;
  }

  .echarts-share{
    width: 100%;
    height: 400px;
  }

  .echarts-box{
    width: 100%;
    height: 250px;
  }

  .histogram{

    .title{
      font-size: 14px;
      color: #131523;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }

  .head{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .h-r{

    .icon{
      width: 25px;
      height: 14px;
      color: #D3D3DB;
      cursor: pointer;
      transform-origin:10px 8px;
    }
  }

  .h-l{
    display: flex;
    align-items: center;

    .title{
      font-size: 18px;
      font-weight: bold;
      color: #131523;
    }
  }
}
</style>