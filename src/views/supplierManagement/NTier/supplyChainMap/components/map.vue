<template>
  <div ref="charMap"
       id="container"
       :class="$route.path==='/supplier/NTier/NTierMap'?'amap-wrapper60':'amap-wrapper70'">
  </div>
</template>

<script>
import lg from "@/assets/images/N-tire-grayness.png";
import lh from "@/assets/images/N-tire-highlight.png";
import svwText from "@/assets/images/supplyChainOverall/svwText.png";
import supplier from "@/assets/images/supplyChainOverall/supplier.png";
// 圆点
import orange from "@/assets/images/supplyChainOverall/N-tier橙点.png";
import tipTable from "./tipTable";
import { getRetrieveChain, getChainPart, listFrameInfo, querySvwFactory } from "@/api/supplierManagement/supplyChainOverall/index.js";
import svw from "@/assets/images/supplyChainOverall/svw.png";
export default {
  props: {
    object: {
      type: Object, default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      temporaryMarker: [],//临时点
      p: 0,
      color: ['#0C47A1', '#1976D1', '#2297F3', '#64B5F6', '#00579B', '#0188D1', '#03A9F4', '#50C2F7', '#283693', '#3949AB', '#5C6BC0', '#05838F', '#06ABC1', '#27C5DA', '#00695C', '#00897B', '#26A79A', '#212121'],
      supplier: supplier,
      tableDataList: [],
      markerList: [],
      markerChain: [],
      svwList: [],
      bezierCurve: [],
      lgIcon: new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: lg,
        imageSize: new AMap.Size(20, 20),
        anchor: 'center',
      }),
      lhIcon: new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: lh,
        imageSize: new AMap.Size(20, 20),
        anchor: 'center',
      }),
      svwIcon: new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: svw,
        imageSize: new AMap.Size(20, 20),
        anchor: 'center',
      }),
      svwTextIcon: new AMap.Icon({
        size: new AMap.Size(40, 20),
        image: svwText,
        imageSize: new AMap.Size(40, 20),
        anchor: 'center',
      }),
      orangeIcon: new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: orange,
        imageSize: new AMap.Size(20, 20),
        anchor: 'center',
      }),
      bigorangeIcon: new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: orange,
        imageSize: new AMap.Size(20, 20),
        anchor: 'center',
      }),
      map: {},
      marker: [],//描点
      content: '',
      tips: {},
      circle: [],
    }
  },
  watch: {
    object: {
      async handler (data) {
        console.time('objectTime')
        this.marker = []
        this.markerList = data.areaList || []
        this.markerList.map(item => item.flag = 'supplier')
        await this.querySvwFactory()
        if (this.$refs.charMap) {
          this.showCityInfo()
        }
        console.timeEnd('objectTime')
      }
    }
  },
  created () { },
  mounted () {
    this.showCityInfo();
  },
  methods: {
    async querySvwFactory () {
      this.svwList = []
      const res = await querySvwFactory()
      res.data.forEach(item => {
        if (item.addressInfo && item.addressInfo.latitude && item.addressInfo.longitude) {
          this.svwList.push({ ...item.addressInfo, lat: item.addressInfo.latitude, lon: item.addressInfo.longitude, procureFactory: item.procureFactory })
        }
      })
      this.markerList = this.markerList.filter(item => {
        if (item.lon && item.lat) {
          return item
        }
      })
    },
    showCityInfo () {
      this.map = new AMap.Map('container', {
        WebGLParams: {
          preserveDrawingBuffer: true
        },
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 4.7, //初始地图级别
        zooms: [3, 18],
        center: [123, 35.239637], //初始地图中心点
        showIndoorMap: false, //关闭室内地图
        roam: true,
        zoomEnable: true,
        dragEnable: true,
        // mapStyle: 'amap://styles/macaron'
      });
      this.handleMarker()
    },
    // 生成点
    handleMarker () {
      if(this.svwList.length)
      console.log('this.svwList====>',this.svwList);
      // svw
      this.svwList.map((item, index) => {
        if (item.procureFactory == '1000') {
          // 点
          this.svwList[index] = new AMap.Marker({
            position: new AMap.LngLat(item.lon, item.lat),
            icon: this.svwTextIcon,
            anchor: "center",//避免缩小是出现偏移
            offset: new AMap.Pixel(0, 0),//避免缩小是出现偏移
            extData: item,
            topWhenClick: true,//鼠标点击时marker是否置顶
            clickable: true
          });
        } else {
          this.svwList[index] = new AMap.Marker({
            position: new AMap.LngLat(item.lon, item.lat),
            icon: this.svwIcon,
            anchor: "center",//避免缩小是出现偏移
            offset: new AMap.Pixel(0, 0),//避免缩小是出现偏移
            extData: item,
            topWhenClick: true,//鼠标点击时marker是否置顶
            clickable: true
          });
        }
        this.svwList[index].setMap(this.map)
      })
      if(this.markerList.length)
      console.log('this.markerList====>',this.markerList);
      // supplier
      this.markerList.map((item, index) => {
        this.marker[index] = new AMap.Marker({
          position: new AMap.LngLat(item.lon, item.lat),
          icon: this.lgIcon,
          anchor: "center",//避免缩小是出现偏移
          offset: new AMap.Pixel(0, 0),//避免缩小是出现偏移
          extData: item,
          topWhenClick: true,//鼠标点击时marker是否置顶
          clickable: true
        });
        this.marker[index].setMap(this.map)
        this.marker[index].on('click', (e) => {
          this.marker.forEach((i, index) => {
            this.marker[index].setIcon(new AMap.Icon({
              image: i.getIcon()._opts.image,
              size: new AMap.Size(20, 20),
              imageSize: new AMap.Size(20, 20)
            }))
          })
          this.circle.forEach((i, index) => {
            this.circle[index].setIcon(new AMap.Icon({
              image: i.getIcon()._opts.image,
              size: new AMap.Size(20, 20),
              imageSize: new AMap.Size(20, 20)
            }))
          })
          e.target.setIcon(new AMap.Icon({
            image: e.target.getIcon()._opts.image,
            size: new AMap.Size(30, 30),
            imageSize: new AMap.Size(30, 30)
          }))
          this.getChainPart(this.marker[index]._opts.extData, item)
          // if (e.target._opts.extData.viewType) {

          // }
        })
      })
    },
    // 弹框信息
    async getChainPart (data, item) {
      const pms = {
        supplierId: data.supplierId,
        partNum: data.partNum,
        type: data.flag === 'svw' ? 2 : 1,
        factoryId: data.factoryId
      }
      const res = await getChainPart(pms)
      let rate = await listFrameInfo(pms)
      if (res.data || rate.data) {
        this.tips = new AMap.InfoWindow({
          autoMove: false,
          retainWhenClose: true,
          content: '',
          offset: new AMap.Pixel(0, -320),
        })
        const infowindowWrap = Vue.extend({
          template: `<tipTable :rate="rate" :tableDataList="tableDataList"> </tipTable>`,
          name: "infowindowWrap",
          components: {
            tipTable: tipTable
          },
          data () {
            return {
              tableDataList: res.data,
              rate: rate.data
            };
          },
        });
        const component = new infowindowWrap().$mount();
        this.tips.setContent(component.$el)
        this.tips.open(this.map, [item.lon, item.lat])
      }
      // if (data.viewType) {

      // }
    },
    // 生成贝塞尔曲线row:选择的数据
    handleRecursion (data, partNum, viewType) {
      data.map((item, index) => {
        if(!item.address) return false;
        this.markerChain[index] = new AMap.Marker({
          position: new AMap.LngLat(item.address.lon, item.address.lat),
          icon: this.lgIcon,
          anchor: "center",//避免缩小是出现偏移
          offset: new AMap.Pixel(0, 0),//避免缩小是出现偏移
          extData: item,
          topWhenClick: true,//鼠标点击时marker是否置顶
          clickable: true
        });
        this.markerChain[index].setMap(this.map)
        this.markerChain[index].on('click', (e) => {
          this.markerChain.forEach((i, index) => {
            this.markerChain[index].setIcon(new AMap.Icon({
              image: i.getIcon()._opts.image,
              size: new AMap.Size(20, 20),
              imageSize: new AMap.Size(20, 20)
            }))
          })
          this.circle.forEach((i, index) => {
            this.circle[index].setIcon(new AMap.Icon({
              image: i.getIcon()._opts.image,
              size: new AMap.Size(20, 20),
              imageSize: new AMap.Size(20, 20)
            }))
          })
          e.target.setIcon(new AMap.Icon({
            image: e.target.getIcon()._opts.image,
            size: new AMap.Size(30, 30),
            imageSize: new AMap.Size(30, 30)
          }))
          this.getChainPart(this.markerChain[index]._opts.extData, item.address)
          // if (e.target._opts.extData.viewType) {

          // }
        })
      })

      data.forEach((item, index) => {
        if(!item.address) return false;
        this.markerChain.forEach((val, i) => {
          if (item.supplierId == val._opts.extData.supplierId && item.chainLevel === 1) {
            let extData = { ...val.getExtData(), viewType: viewType, partNum: partNum }
            val.setExtData(extData)
            val.setIcon(this.lhIcon)
          } else if (item.chainLevel > 1 && item.supplierId == val._opts.extData.supplierId) {
            // 点
            let extData = { ...val.getExtData(), viewType: viewType, partNum: partNum, iconType: 'circle' }
            val.setExtData(extData)
            val.setIcon(this.orangeIcon)
          } else if (item.chainLevel > 1 && i === this.marker.length - 1 && val._opts.extData.iconType != 'circle' && item.address.lon && item.address.lat) {
            this.circle[this.circle.length] = new AMap.Marker({
              position: new AMap.LngLat(item.address.lon, item.address.lat),
              icon: this.orangeIcon,
              anchor: "center",//避免缩小是出现偏移
              offset: new AMap.Pixel(0, 0),//避免缩小是出现偏移
              extData: { viewType: viewType, factoryId: item.supplierFactory, supplierId: item.supplierId, partNum: partNum },
              topWhenClick: true,//鼠标点击时marker是否置顶
              clickable: true
            });
            this.circle[this.circle.length - 1].setMap(this.map)
            this.circle[this.circle.length - 1].on('click', (e) => {
              this.circle.forEach((i, index) => {
                this.circle[index].setIcon(new AMap.Icon({
                  image: i.getIcon()._opts.image,
                  size: new AMap.Size(20, 20),
                  imageSize: new AMap.Size(20, 20)
                }))
              })
              this.markerChain.forEach((i, index) => {
                this.markerChain[index].setIcon(new AMap.Icon({
                  image: i.getIcon()._opts.image,
                  size: new AMap.Size(20, 20),
                  imageSize: new AMap.Size(20, 20)
                }))
              })
              e.target.setIcon(new AMap.Icon({
                image: e.target.getIcon()._opts.image,
                size: new AMap.Size(30, 30),
                imageSize: new AMap.Size(30, 30)
              }))
              this.getChainPart(e.target._opts.extData, item.address)
            })
          }
        })
        if (item.line.length) {
          if (index > 0) {
            this.p = this.p + 1
          }
          this.bezierCurve.push(new AMap.Polyline({
            path: [item.line[0], [item.line[1][2], item.line[1][3]]],
            outlineColor: this.color[this.p],
            strokeColor: this.color[this.p],
            showDir: true,
            strokeOpacity: 1,
            strokeWeight: 5,
            strokeStyle: "solid",
            strokeDasharray: [10, 5],
            showDir: true,
            geodesic: true
          }))
        }
        if (item.child.length) {
          this.handleRecursion(item.child, partNum, viewType)
        }
      })
    },
    // 点击零件|供应商
    async handleCurrentChange (row, viewType) {
      this.map.clearInfoWindow()
      this.p = 0
      this.temporaryMarker = []
      this.bezierCurve.forEach((item, index) => {
        this.map.remove(this.bezierCurve[index])
      })
      this.circle.forEach(item => {
        this.map.remove(item)
      })
      this.markerChain.forEach(item => {
        this.map.remove(item)
      })
      this.marker.forEach(item => {
        item.setIcon(this.lgIcon)
      })
      this.bezierCurve = []
      const pms = {
        list: [row],
        viewType: viewType,
        isRelation: true,
      }
      const res = await getRetrieveChain(pms)
      this.handleRecursion(res.data, row.partNum, viewType)
      this.bezierCurve.forEach((item, index) => {
        this.bezierCurve[index].setMap(this.map)
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.amap-wrapper70 {
  width: 100%;
  height: 70rem;
}
.amap-wrapper60 {
  width: 100%;
  height: 60rem;
}
::v-deep .amap-logo {
  display: none !important; //去掉高德地图logo
}
::v-deep .amap-copyright {
  opacity: 0; //去掉高德的版本号
}
.tinter {
  position: absolute;
  top: 1rem;
  z-index: 3;
}
</style>

