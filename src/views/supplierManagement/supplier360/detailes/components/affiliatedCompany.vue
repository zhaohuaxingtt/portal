<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <el-row :gutter="20"
          type="flex"
          justify="space-between">
    <el-col :span="16"
            v-permission="PORTAL_SUPPLIER_CARD_COMPANIES">
      <iCard :title="$t('SUPPLIER_GLGS')"
             class="affiliatedCompany"
             v-loading="onGraphLoading">
        <!-- <div class="tree"
             ref="chart"></div> -->
        <div :style="{'height': this.outerHeight + 'px', 'overflow': 'auto','width': this.outerWidth + 'px'}"
             ref="relationGraphOuter">
          <SeeksRelationGraph ref="seeksRelationGraph"
                              :options="graphOptions" />
        </div>
      </iCard>
    </el-col>
    <el-col :span="8"
            v-permission="PORTAL_SUPPLIER_Card_RELATED_GROUP">
      <iCard :title="$t('SUPPLIER_JTGX')"
             class="groupRelations">
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
import SeeksRelationGraph from 'relation-graph'

export default {
  components: {
    iCard, iText, SeeksRelationGraph
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
  data () {
    return {
      tableListData: {},
      groupTableListData: {},
      tabRouterList,
      relationGraphData: {},
      onGraphLoading: false,
      outerWidth: 0,
      outerHeight: 0,
      graphOptions: {
        // "backgrounImage": "http://ai-mark.cn/images/ai-mark-desc.png",
        // "backgrounImageNoRepeat": true,
        "layouts": [
          {
            "label": "中心",
            "layoutName": "tree",
            "layoutClassName": "seeks-layout-center",
            "defaultJunctionPoint": "border",
            "defaultNodeShape": 0,
            "defaultLineShape": 1,
            "from": "left",
            "max_per_width": "300",
            "min_per_height": "50",
            "max_per_height": "100"
          }
        ],
        "defaultLineMarker": {
          "markerWidth": 12,
          "markerHeight": 12,
          "refX": 6,
          "refY": 6,
          "data": "M2,2 L10,6 L2,10 L6,6 L2,2"
        },
        "defaultNodeShape": 1,
        "defaultNodeColor": "#1660F1",
        "defaultNodeBorderColor": "#1660F1"
      }
    }
  },
  watch: {
    relatedCompanyVO (data) {
      this.tableListData = this.dataTransformation(data)
      // if (this.$refs.chart && this.tableListData) {
      //   this.handleTree();
      // }
    },
    groupRelationsVO (data) {
      if (data) {
        this.groupTableListData = data
      } else {
        this.groupTableListData = {
          name: "",
          realityControlName: "",
          productName: '',
          oemCustomer: '',
          oemName: '',
          deliveryStartDate: ''
        }
      }

    }
  },
  mounted () {
    // this.handleTree()

    this.$nextTick(() => {
      var outer = this.$refs.relationGraphOuter.parentNode.parentNode.parentNode.getBoundingClientRect();
      if (outer) {
        this.outerWidth = outer.width - 38;
        this.outerHeight = outer.height - 90;
      }
    })
  },
  methods: {
    dataTransformation (data) {
      this.relationGraphData = {};
      this.relationGraphData.rootId = data.id;
      this.relationGraphData.nodes = [{
        id: data.id,
        text: data.name
      }];
      this.relationGraphData.links = [];
      this.iterateRelation(data, data.id)
      this.onGraphLoading = true;
      setTimeout(function () {
        this.$refs.seeksRelationGraph.setJsonData(this.relationGraphData, () => {
          this.onGraphLoading = false;
          // 这些写上当图谱初始化完成后需要执行的代码
        })
      }.bind(this), 1000)
      return data;
    },
    iterateRelation (data, parentId) {
      if (data.children && data.children.length > 0) {
        data.children.forEach((child) => {
          this.relationGraphData.nodes.push({
            id: child.id.toString(),
            text: child.name
          })
          this.relationGraphData.links.push({
            from: parentId.toString(),
            to: child.id.toString(),
            text: ''
          })
          this.iterateRelation(child, child.id)
        })
      }
    },
    handleTree () {
      const myChart = echarts().init(this.$refs.chart);
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: function (pms) {
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
