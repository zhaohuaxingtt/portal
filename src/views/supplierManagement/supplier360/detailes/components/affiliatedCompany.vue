<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <el-row :gutter="20" type="flex" justify="space-between">
    <el-col :span="16" v-permission="Card_Associated_Companies">
      <iCard :title="$t('SUPPLIER_GLGS')" class="affiliatedCompany">
        <div class="tree" ref="chart"></div>
      </iCard>
    </el-col>
    <el-col :span="8" v-permission="Card_Related_Group">
      <iCard :title="$t('SUPPLIER_JTGX')" class="groupRelations">
        <iText class="margin-bottom20">
          <span class="text">{{$t('JITUANGONGSIQUANCHEN')}}</span>:{{groupTableListData.name}}
        </iText>
        <iText class="margin-bottom20">
          <span class="text">{{$t('SUPPLIER_SJKZRXM')}}</span>:{{groupTableListData.realityControlName}}
        </iText>
        <iText class="margin-bottom20">
          <span class="text">{{$t('ZHUYAOCHANPIN')}}</span>:{{groupTableListData.productName}}
        </iText>
        <iText class="margin-bottom20">
          <span class="text">{{$t('SUPPLIER_ZYPTKH')}}</span>:{{groupTableListData.oemCustomer}}
        </iText>
        <iText class="margin-bottom20">
          <span class="text">{{$t('SUPPLIER_ZYPTZJC')}}</span>:{{groupTableListData.oemName}}
        </iText>
        <iText class="margin-bottom20">
          <span class="text">{{$t('KAISHIGONGHUSHIJIAN')}}</span>:{{groupTableListData.deliveryStartDate}}
        </iText>
      </iCard>
    </el-col>
  </el-row>
</template>

<script>
import { iCard, iText } from 'rise';
import { tabRouterList } from "../../list/data";
import echarts from "@/utils/echarts";

export default {
  components: {
    iCard, iText
  },
  props: {
    relatedCompanyVO: {
      type: Array, default: () => {
        return []
      }
    },
    groupRelationsVO: {
      type: Array, default: () => {
        return []
      }
    }
  },
  data() {
    return {
      tableListData: {},
      groupTableListData: {},
      tabRouterList,
    }
  },
  watch: {
    relatedCompanyVO(data) {
      this.tableListData = data
      if (this.$refs.chart && this.tableListData) {
        this.handleTree();
      }
    },
   groupRelationsVO(data) {
      if (data) {
        this.groupTableListData = data
      } else {
        this.groupTableListData = {
          name: '',
          realityControlName: '',
          productName: '',
          oemCustomer: '',
          oemName: '',
          deliveryStartDate: ''
        }
      }
    }
  },
  mounted() {
    // this.handleTree()
  },
  methods: {
    handleTree() {
      const myChart = echarts().init(this.$refs.chart);
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: function(pms) {
            return pms.data.name
          }
        },
        series: [
          {
            type: 'tree',
            id: 0,
            name: 'tree1',
            data: [this.tableListData],
            top: '0',
            left: '30%',
            bottom: '0',
            roam: true,
            right: '30%',
            symbolSize: 7,
            edgeShape: 'polyline',
            edgeForkPosition: '63%',
            initialTreeDepth: 3,
            lineStyle: {
              width: 2
            },
            label: {
              backgroundColor: '#fff',
              position: 'left',
              verticalAlign: 'middle',
              align: 'right'
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      })
    },
  }
}
</script>

<style lang='scss' scoped>
.tree {
  // width: 70rem;
  height: 320px;
}
.affiliatedCompany {
  height: 420px;
}
.groupRelations {
  height: 420px;
  .margin-bottom20 {
    .text {
      padding-left: 20px;
      color: #5f6f8f;
    }
    text-align: left;
  }
}
</style>
