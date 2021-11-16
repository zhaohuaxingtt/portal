<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <el-row :gutter="20"
          type="flex"
          justify="space-between">
    <el-col :span="8">
      <iCard class="Ltd">
        <div>
          <div class="titleZh margin-right10">{{info.nameZh}}</div>
          <span class="titleEn">{{info.nameEn}}</span>
        </div>
        <div class="tagStyle" v-if="tagList.length>0">

          <el-popover placement="top-end"
                      width="200"
                      trigger="hover">
            <div><span v-for="(item,index) in tagList"
                    :key="index">{{item.tagName+' '}}</span></div>
            <div slot="reference">
              <span v-for="(item,index) in tagList"
                    :key="index">{{$i18n.locale==='en'?item.tagValue:item.tagName+' '}}</span>
            </div>

          </el-popover>
        </div>

        <!-- content -->
        <div class="text margin-top10">
          <div>{{$t('UnifySocialCreditCode')}}:{{info.socialcreditNo}}</div>
          <el-divider />
          <div>{{$t('SUPPLIER_SAPHAO')}}:{{info.sapCode}}</div>
          <el-divider />
          <div>{{$t('LegalPerson')}}:{{info.legalPerson}}</div>
          <el-divider />
          <div>{{$t('SUPPLIER_ZHUCEZIBENWAN')}}:{{info.registeredCapital&&info.registeredCapital+'元'}}</div>
          <el-divider />
          <el-popover width="200"
                      trigger="hover"
                      :content="info.address"
                      placement="top-end">
            <div slot="reference"
                 class="address">{{$t('companyAddress')}}:{{info.address}}</div>
          </el-popover>
        </div>
        <div class="floatright margin-top20"
             @click="handleShareholder">
          <iButton>{{$t('SPR_FRM_XGYSPJ_GDXINGXI')}}</iButton>
        </div>
      </iCard>
    </el-col>
    <el-col :span="16">
      <iCard class="countryMap"
             :title="$t('SPR_FRM_XGYSPJ_GCDT')">
        <el-row type="flex"
                justify="between">
          <el-col :span="12">
            <div ref="chart"
                 id="container"
                 class="mapbox" />
          </el-col>
          <el-col :span="12">
            <tableList :height="215"
                       :tableData="tableListData"
                       :tableTitle="tableTitle"
                       :selection="false"
                       :index="false"
                       :tableLoading="tableLoading"
                       @handleSelectionChange="handleSelectionChange"
                       :openPageProps="'nameZh'"
                       @openPage="openPage"
                       :openPageGetRowData=true />
          </el-col>
        </el-row>
      </iCard>
    </el-col>
  </el-row>
</template>

<script>
import tableList from '@/components/commonTable'
import { iCard, iButton, icon } from 'rise'
import { tableTitle } from './data'
import { getTags } from '@/api/basic/basic'
export default {
  components: {
    iCard,
    iButton,
    icon,
    tableList
  },
  props: {
    factoryAddressVOList: {
      type: Array,
      default: () => {
        return []
      }
    },
    supplier360ViewVO: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      nameZh: '',
      nameEn: '',
      tableListData: [],
      info: {},
      tableTitle: tableTitle,
      tagList: []
    }
  },
  watch: {
    factoryAddressVOList(data) {
      data.map((item) => (item.name = item.city))
      this.tableListData = data
      if (this.$refs.chart && this.tableListData.length > 0) {
        this.handleMap()
      }
    },
    supplier360ViewVO(data) {
      this.info = data
      //    this.nameZh=data.nameZh
      //    this.nameEn=data.nameEn
      this.getTags()
    }
  },
  created() {},
  mounted() {
    this.handleMap()
  },
  methods: {
    async getTags() {
      const pms = {
        pageNo: 1,
        pageSize: 10,
        supplierToken: this.info.token
      }
      const res = await getTags(pms)
      if (res.result) {
        this.tagList = res.data
      }
    },
    handleShareholder() {
      console.log(this.info)
      this.$router.push({
        path: '/supplier/view-suppliers',
        query: {
          supplierToken: this.info.token || '',
          supplierType: '4',
          subSupplierType: this.$route.query.supplierType
        }
      })
    },
    handleMap() {
      console.log('creat map')
      // 初始化地图
      var map = new AMap.Map('container', {
        WebGLParams: {
          preserveDrawingBuffer: true
        },
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 0, //初始地图级别
        center: [112, 39], //初始地图中心点
        showIndoorMap: false, //关闭室内地图
        roam: true,
        zoomEnable: true,
        dragEnable: true
        // mapStyle: 'amap://styles/macaron'
      })
      // 放大缩小按钮
      AMap.plugin(['AMap.ToolBar'], function () {
        // 在图面添加工具条控件, 工具条控件只有缩放功能
        map.addControl(
          new AMap.ToolBar({
            position: 'LB'
          })
        )
      })
      // 圆点
      this.tableListData.forEach((item) => {
        var circleMarker = new AMap.CircleMarker({
          center: [item.lon, item.lat],
          radius: 5, //3D视图下，CircleMarker半径不要超过64px
          strokeColor: '#407ef7',
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: '#407ef7',
          fillOpacity: 0.5,
          zIndex: 10,
          bubble: true,
          cursor: 'pointer',
          clickable: true
        })
        circleMarker.setMap(map)
        // 鼠标移入
        circleMarker.on('mouseover', (e) => {
          handleTooltip.open(map, [item.lon, item.lat])
        })
        // 鼠标移出
        circleMarker.on('mouseout', (e) => {
          //  清楚所有窗体
          map.clearInfoWindow()
        })
        // tooltip 提示
        var handleTooltip = new AMap.InfoWindow({
          content: item.province + item.city,
          offset: new AMap.Pixel(0, -15)
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.titleZh {
  white-space: nowrap;
  font-size: 1.125rem;
  color: #131523;
  font-weight: bold;
}
.titleEn {
  color: #5f6f8f;
  font-size: 14px;
  font-family: Arial;
}
.text {
  color: #5f6f8f;
}
.el-divider--horizontal {
  margin: 1rem 0;
}
.Ltd {
  height: 400px;
  position: relative;
  .tagStyle {
    position: absolute;
    top: 50px;
    width: 120px;
    left: 360px;
    overflow: hidden; /*超出隐藏*/
    white-space: nowrap; /* 强制不换行 */
    text-overflow: ellipsis; /*文字隐藏的格式 */
  }
}
.countryMap {
  height: 400px;
  .el-col-12:nth-child(2) {
    padding-left: 20px;
    border-left: 1px solid #e6e9f4;
  }
  .el-col-12:nth-child(1) {
    position: relative;
  }
}
.mapbox {
  height: 18rem;
}

.el-popover__reference {
  overflow: hidden;
  text-overflow: ellipsis;
  height: 33px;
}
.address {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
::v-deep .amap-logo {
  display: none !important;
}
::v-deep .amap-copyright {
  display: none !important;
}
</style>
