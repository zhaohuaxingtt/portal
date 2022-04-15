<template>
  <iCard style="height:25rem">
    <div class="title">
      <p>{{$t('DINGDIANJINE')}}</p>
      <el-dropdown v-permission="Card_Sourcing_More">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{language('CHAKAN', '查看')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="center">
      <div id="echart1" ref="echart1"></div>
      <img :src="img" class="imgIcon" />
      <div id="echart2" ref="echart2"></div>
      <!-- <div class="nomore">
        {{language('GAIGONGYINGSHANGZANWUYUQINGXINWEN', '该供应商暂无舆情新闻')}}
      </div> -->
    </div>
  </iCard>
</template>
<script>
import { iCard, } from 'rise'
import img from '@/assets/images/icon/jiantou.png'
import echarts from '@/utils/echarts'
export default {
  props: {
    gpOrderVo:{
        type: Array,
        default: () => {
            return []
        }
    },
  },
  components: {
    iCard,

  },
  data () {
    return {
        data: [{ address: '测试' }, { address: '测试' }, { address: '测试' }],
        img: img,
        option1:{},
        option2:{},
        year:[],//年份
        yearObject:[],//总量
        dataAll:[],
        dataY:[],
        echart2:null,
    }
  },
  created(){
    
  },
  computed: {
    style () {
      return {}
    }
  },
  watch: {
      gpOrderVo(val){
        this.dataAll = val;
        var name = [];
        var table = [];
        val.forEach(e => {
            if(name.indexOf(e.deptNum) === -1){
                name.push(e.deptNum)
                table.push({
                    name:e.deptNum,
                    value:0,
                })
            }
        })
        val.forEach(e=>{
            name.forEach((ele,index)=>{
                if(ele == e.deptNum){
                    table[index].value = table[index].value + Number(e.amount)
                }
            })
        })

        var year = [];
        var yearObject = [];
        val.forEach(e=>{
            console.log(e);
            if(year.indexOf(e.year) === -1){
                year.push(e.year)
                yearObject.push(0);
            }
        })
        var yearNew = year.sort();
        val.forEach(e=>{
            yearNew.forEach((ele,index)=>{
                if(ele == e.year){
                    yearObject[index] = yearObject[index] + Number(e.amount)
                }
            })
        })

        this.year = yearNew;
        this.yearObject = yearObject;

        console.log(yearNew)
        console.log(yearObject)


        this.setEcharts1(table);
      }
  },
  mounted () { 
      
  },
  methods: {
    setEcharts1(val){
        var index = 0;//默认选中高亮模块索引
        const echart1 = echarts().init(this.$refs.echart1)
        var dataList = val
        this.option1 = {
            title:{
                show:true,
                text:"单位：百万",
                right:'20%',
                top:'top',
                textStyle:{
                    fontSize: 12,
                    color:"#798489",
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                },
            },
            grid: {
                
            },
            tooltip: {
                trigger: 'item',
                formatter:(params)=>{
                    var html = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+ params.color +'"></span>';
                    return html + params.name +":"+params.value;
                }
            },
            legend:{
                x: 'center',
                bottom: '5%',
                itemGap:40,
                formatter:(name)=>{
                    let data=dataList;
                    let total = 0;
                    let target;
                    for (let i = 0, l = data.length; i < l; i++) {
                        total += data[i].value;
                        if (data[i].name == name) {
                            target = data[i].value;
                        }
                    }
                    let arr = [
                        '{a|'+name+'}','{b|'+((target/total)*100).toFixed(2)+'%}'
                    ]
                    return arr.join('\n')
                },
                textStyle:{
                    rich:{
                        a:{
                            fontSize:15,
                            verticalAlign:'top',
                        },
                        b:{
                            fontSize:14,
                        }
                    }
                }
            },
            series: [
                {
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 5
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        },
                        tooltip: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {//中间文字显示
                            show: true,
                            formatter:function(parme){
                                return '{total|' + parme.percent.toFixed(2) + '%' + '}' + '\n\r' + '{active|' + parme.value + '}'
                            },
                            rich: {
                                total:{
                                    fontSize: 25,
                                    fontFamily : "微软雅黑",
                                    color:'#454c5c',
                                    fontWeight:"600"
                                },
                                active: {
                                    fontFamily : "微软雅黑",
                                    fontSize: 20,
                                    color:'rgb(22 96 241)',
                                    lineHeight:30,
                                    fontWeight:"600"
                                },
                            }
                        }
                    },
                    top:'-10%',
                    bottom:"10%",
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: dataList
                }
            ]
        }
        echart1.setOption(this.option1)
        var number = 0;
        var indexNumebr = 0;
        val.forEach((e,index)=>{
            if(e.value >= number){
                number = e.value;
                indexNumebr = index;
            }
        })

        var Tname = val[indexNumebr].name;
        this.setEcharts2(Tname);

        echart1.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: indexNumebr});//设置默认选中高亮部分


        var that = this;
        echart1.on('click',function(e){
            index = e.dataIndex;
            that.rightResize(val[e.dataIndex].name)
            echart1.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});
        });

        echart1.on('mouseover',function(e){
            if(e.dataIndex != index){
                echart1.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: index });
            }
        });
        echart1.on('mouseout',function(e){
            index = e.dataIndex;
            echart1.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: e.dataIndex});
        });
    },
    setEcharts2(name){
        var dataY = [];
        this.year.forEach(e=>{
            this.dataAll.forEach(ele=>{
                if(e == ele.year){
                    if(ele.deptNum == name){
                        dataY.push(Number(ele.amount))
                    }
                }
            })
        })
        this.dataY = dataY;

        this.echart2 = echarts().init(this.$refs.echart2)
        this.option2 = {
            title:{
                show:true,
                left:'5%',
                top:'top',
                text:"Turnover",
                textStyle:{
                    fontSize: 12,
                    color:"#798489",
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                },
                subtext:"(Million RMB)",
                subtextStyle:{
                    fontSize: 12,
                    color:"#798489",
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                },
            },
            grid: {
                width:"84%",
                height:"70%",
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
                formatter: "{b0}: {c0}",
            },
            xAxis: [
                {
                    name:"Year",
                    type: "category",
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#363e83",
                        },
                    },
                    axisLabel: {
                        inside: false,
                        textStyle: {
                            color: "#bac0c0",
                            fontWeight: "normal",
                            fontSize: "12",
                        },
                    },
                    data: this.year,
                },
            ],
            yAxis: {
                type: "value",
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
            series: [
                {
                    name: "2121",
                    type: "bar",
                    itemStyle: {
                        normal: {
                            barBorderRadius: 30,
                            color:"#1660F1",
                        },
                    },
                    barWidth: 20,
                    data: this.dataY,
                },
                {
                    name: "",
                    type: "bar",
                    barGap: "-100%",
                    z:0,
                    itemStyle: {
                        normal: {
                            color: "#f8f8fa",
                        },
                    },
                    barWidth: 20,
                    data: this.yearObject,
                }
            ]
        }
        this.echart2.setOption(this.option2)
    },

    rightResize(name){
        var dataY = [];
        this.year.forEach(e=>{
            this.dataAll.forEach(ele=>{
                if(e == ele.year){
                    if(ele.deptNum == name){
                        dataY.push(Number(ele.amount))
                    }
                }
            })
        })
        this.dataY = dataY;

        this.option2.series[0].data = this.dataY;
        this.echart2.setOption(this.option2)
    },
  },
  
}
</script>

<style lang="scss" scoped>
.imgIcon {
  width: 50px;
  height: 40px;
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
.nomore {
  margin-left: 60px;
  font-size: 16px;
  font-family: Arial;
  font-weight: 400;
  color: #798489;
  width: 80%;
  letter-spacing: 4px;
}
.center {
  height: calc(100% - 40px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .fontsize {
    color: #798489;
  }
}
#echart1{
    width:40%;
    height:100%;
}
#echart2{
    width:50%;
    height:100%;
}
::v-deep .cardBody{
    height:25rem!important;
}
.colorBule {
  background: rgba(206, 212, 214, 0.1);
  color: #1763f7;
}
.colorblack {
  background: rgba(140, 152, 172, 0.32);
  color: #001847;
}
.tag {
  margin-right: 10px;
  height: 20px;
  background: #dbeafc;
  opacity: 1;
  border-radius: 5px;
  font-size: 10px;
  font-family: Arial;
  font-weight: 400;
  padding: 0 12px;
}
.early {
  font-size: 60px;
}
</style>