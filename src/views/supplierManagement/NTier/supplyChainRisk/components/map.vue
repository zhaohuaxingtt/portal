<template>
  <div ref="charMap"
       id="container"
       class="amap-wrapper">
  </div>
</template>

<script>
import lg from "@/assets/images/N-tire-grayness.png";
import lh from "@/assets/images/N-tire-highlight.png";
import svwText from "@/assets/images/supplyChainOverall/svwText.png";
import svw from "@/assets/images/supplyChainOverall/svw.png";
// tip
import tipTable from "@/views/supplierManagement/NTier/supplyChainMap/components/tipTable.vue";
// 圆点
import orange from "@/assets/images/supplyChainOverall/N-tier橙点.png";

// 标
import green from "@/assets/images/supplyChainOverall/green.png";
import gray from "@/assets/images/supplyChainOverall/gray.png";
import yellow from "@/assets/images/supplyChainOverall/yellow.png";
import red from "@/assets/images/supplyChainOverall/red.png";
import { getRetrieveChain, getChainPart, listFrameInfo, querySvwFactory } from "@/api/supplierManagement/supplyChainOverall/index.js";
export default {
  comments: { tipTable },
  props: {
    tableListData: {
      type: Array, default: () => {
        return []
      }
    },
    eventDetail: { type: Object, default: {} }
  },
  data () {
    return {
      temporaryMarker: [],//临时点
      // 圆
      circle: [],
      markerList: [],
      svwList: [],
      marker: [],
      p: 0,
      tips: {},
      color: ['#0C47A1', '#1976D1', '#2297F3', '#64B5F6', '#00579B', '#0188D1', '#03A9F4', '#50C2F7', '#283693', '#3949AB', '#5C6BC0', '#05838F', '#06ABC1', '#27C5DA', '#00695C', '#00897B', '#26A79A', '#212121'],
      bezierCurve: [],
      grayIcon: new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: gray,
        imageSize: new AMap.Size(20, 20),
        anchor: 'center',
      }),
      greenIcon: new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: green,
        imageSize: new AMap.Size(20, 20),
        anchor: 'center',
      }),
      yellowIcon: new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: yellow,
        imageSize: new AMap.Size(20, 20),
        anchor: 'center',
      }),
      redIcon: new AMap.Icon({
        size: new AMap.Size(20, 20),
        image: red,
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
        size: new AMap.Size(10, 10),
        image: orange,
        imageSize: new AMap.Size(10, 10),
        anchor: 'center',
      }),
      // 
      maxLon: 0,
      minLon: 0,
      maxLat: 0,
      minLat: 0
    }
  },
  watch: {
    tableListData: {
      async handler (data) {
        this.marker = []
        this.temporaryMarker = []
        let datacopy = _.cloneDeep(data)
        this.markerList = datacopy
        this.markerList.map(item => item.flag = 'supplier')
        await this.querySvwFactory()
        if (this.$refs.charMap) {
          this.showCityInfo();
        }
      }
    }
  },
  created () {
  },
  mounted () {
    this.showCityInfo()
  },
  methods: {
    // 大众工厂
    async querySvwFactory () {
      this.svwList = []
      const res = await querySvwFactory()
      res.data && res.data.forEach(item => {
        if (item.addressInfo && item.addressInfo.latitude && item.addressInfo.longitude) {
          this.svwList.push({ ...item.addressInfo, lat: item.addressInfo.latitude, lon: item.addressInfo.longitude, flag: 'svw' })
        }
      })
      this.markerList = this.markerList.filter(item => {
        if (item.lon || item.lat) {
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
      this.map.on('mousewheel', () => {
        console.log(this.map.getZoom());
      })
      this.markerList.length && this.handleMarker()
      Object.keys(this.eventDetail).length && this.handleCircle()
    },
    // 圆
    handleCircle () {
      var overlays = this.map.getAllOverlays();
      if (!overlays.some((overlay) => {
        return overlay.className == "Overlay.Circle"
      })) {

        var circleMarker = new AMap.Circle({
          center: [this.eventDetail.longitude, this.eventDetail.latitude],
          radius: this.eventDetail.influenceSize * 1000,//圆半径，单位:米
          strokeColor: '#FF8B8B',
          strokeWeight: 2,
          strokeOpacity: 0,
          fillColor: '#FF8B8B',
          fillOpacity: 0.5,
          zIndex: 10,
          bubble: true,
          cursor: 'pointer',
          clickable: true
        })
        circleMarker.setMap(this.map)
      }
      this.getCenter(parseFloat(this.eventDetail.influenceSize) / 2, this.eventDetail.longitude, this.eventDetail.latitude)
    },
    getCenter (influenceSize, lon, lat) {
      console.log(influenceSize, lon, lat);
      let index = 18;
      let i = 0;
      let lastValue = 0;
      let thisValue = 0;
      let arr = [0.025, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 30, 50, 100, 200, 500, 1000];
      while (i < arr.length) {
        thisValue = arr[i] * 2;
        if (influenceSize <= thisValue) {
          if (lastValue > 0 && lastValue != thisValue) {
            // 比较一下，是否需要计算中间值
            let divide = (thisValue - lastValue) / 10;
            let currentValue = lastValue;
            index++
            while (currentValue < thisValue) {
              index += 0.1
              currentValue += divide
            }
          }
          break;
        }
        index--
        i++
      }
      this.map.setZoom(index)
      console.log(index);
      console.log((parseFloat(lon) + parseFloat(influenceSize) / 100), parseFloat(lat));
      this.map.setCenter(new AMap.LngLat((parseFloat(lon) + parseFloat(influenceSize) / 35), parseFloat(lat)))
    },
    // 点
    handleMarker () {
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
      // supplier
      this.markerList.map((item, index) => {
        this.marker[index] = new AMap.Marker({
          position: new AMap.LngLat(item.lon, item.lat),
          icon: item.feedbackStatus === '红' ? this.redIcon : item.feedbackStatus === '黄' ? this.yellowIcon : item.feedbackStatus === '灰' ? this.grayIcon : this.greenIcon,
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
          this.temporaryMarker.forEach(i => {
            if (i.getIcon()._opts.size[0] === 30 && i.getIcon()._opts.size[1] === 30) {
              i.setIcon(new AMap.Icon({
                image: i.getIcon()._opts.image,
                size: new AMap.Size(20, 20),
                imageSize: new AMap.Size(20, 20)
              }))
              return false
            }
          })
          e.target.setIcon(new AMap.Icon({
            image: e.target.getIcon()._opts.image,
            size: new AMap.Size(30, 30),
            imageSize: new AMap.Size(30, 30)
          }))
          this.getChainPart(this.marker[index]._opts.extData, item)
        })
        console.log(this.marker, "===========")
      })
    },
    // 弹框信息
    async getChainPart (data, item) {
      const pms = {
        supplierId: data.supplierId,
        type: 1,
        factoryId: data.factoryId
      }
      const res = await getChainPart(pms)
      let rate = await listFrameInfo(pms)
      if (res.data || rate.data) {
        this.tips = new AMap.InfoWindow({
          autoMove: false,
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
    },
    // 生成贝塞尔曲线
    handleRecursion (data, viewType) {
      data.forEach((item, index) => {
        this.marker.forEach((val, i) => {
          if (item.address.lon && item.address.lat) {
            if (item.address.lon == val._opts.extData.lon && item.address.lat == val._opts.extData.lat && item.chainLevel == 1) {
              let extData = { ...val.getExtData(), viewType: viewType }
              val.setExtData(extData)
            } else if (i === this.marker.length - 1 && item.chainLevel == 1) {
              this.temporaryMarker[this.temporaryMarker.length] = new AMap.Marker({
                position: new AMap.LngLat(item.address.lon, item.address.lat),
                icon: this.grayIcon,
                anchor: "center",//避免缩小是出现偏移
                offset: new AMap.Pixel(0, 0),//避免缩小是出现偏移
                extData: { viewType: viewType, factoryId: item.supplierFactory, supplierId: item.supplierId },
                topWhenClick: true,//鼠标点击时marker是否置顶
                clickable: true
              });
              this.temporaryMarker[this.temporaryMarker.length - 1].setMap(this.map)
              this.temporaryMarker[this.temporaryMarker.length - 1].on('click', (e) => {
                this.circle.forEach(i => {
                  if (i.getIcon()._opts.size[0] === 30 && i.getIcon()._opts.size[1] === 30) {
                    i.setIcon(new AMap.Icon({
                      image: i.getIcon()._opts.image,
                      size: new AMap.Size(20, 20),
                      imageSize: new AMap.Size(20, 20)
                    }))
                    return false
                  }
                })
                this.marker.forEach(i => {
                  if (i.getIcon()._opts.size[0] === 30 && i.getIcon()._opts.size[1] === 30) {
                    i.setIcon(new AMap.Icon({
                      image: i.getIcon()._opts.image,
                      size: new AMap.Size(20, 20),
                      imageSize: new AMap.Size(20, 20)
                    }))
                    return false
                  }
                })
                this.temporaryMarker.forEach(i => {
                  if (i.getIcon()._opts.size[0] === 30 && i.getIcon()._opts.size[1] === 30) {
                    i.setIcon(new AMap.Icon({
                      image: i.getIcon()._opts.image,
                      size: new AMap.Size(20, 20),
                      imageSize: new AMap.Size(20, 20)
                    }))
                    return false
                  }
                })
                e.target.setIcon(new AMap.Icon({
                  image: e.target.getIcon()._opts.image,
                  size: new AMap.Size(30, 30),
                  imageSize: new AMap.Size(30, 30)
                }))
                this.getChainPart({ ...e.target._opts.extData, flag: 'supplier' }, item.address)
              })
            } else if (i === this.marker.length - 1 && item.address && item.address.lon && item.address.lat && item.chainLevel > 1) {
              this.circle[this.circle.length] = new AMap.Marker({
                position: new AMap.LngLat(item.address.lon, item.address.lat),
                icon: this.orangeIcon,
                anchor: "center",//避免缩小是出现偏移
                offset: new AMap.Pixel(0, 0),//避免缩小是出现偏移
                extData: { viewType: viewType, factoryId: item.supplierFactory, supplierId: item.supplierId },
                topWhenClick: true,//鼠标点击时marker是否置顶
                clickable: true
              });
              this.circle[this.circle.length - 1].setMap(this.map)
              this.circle[this.circle.length - 1].on('click', (e) => {
                this.circle.forEach(i => {
                  if (i.getIcon()._opts.size[0] === 30 && i.getIcon()._opts.size[1] === 30) {
                    i.setIcon(new AMap.Icon({
                      image: i.getIcon()._opts.image,
                      size: new AMap.Size(20, 20),
                      imageSize: new AMap.Size(20, 20)
                    }))
                    return false
                  }
                })
                this.marker.forEach(i => {
                  if (i.getIcon()._opts.size[0] === 30 && i.getIcon()._opts.size[1] === 30) {
                    i.setIcon(new AMap.Icon({
                      image: i.getIcon()._opts.image,
                      size: new AMap.Size(20, 20),
                      imageSize: new AMap.Size(20, 20)
                    }))
                    return false
                  }
                })
                e.target.setIcon(new AMap.Icon({
                  image: e.target.getIcon()._opts.image,
                  size: new AMap.Size(30, 30),
                  imageSize: new AMap.Size(30, 30)
                }))
                this.getChainPart({ ...e.target._opts.extData, flag: 'supplier' }, item.address)
              })
            }
          }
        })
        if (item.line.length) {
          if (index > 0)
            this.p = this.p + 1
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
        let lon = parseFloat(item.address.lon)
        let lat = parseFloat(item.address.lat)

        if (lon > this.maxLon) {
          this.maxLon = lon
        }
        if (lat > this.maxLat) {
          this.maxLat = lat
        }
        if (lon < this.minLon) {
          this.minLon = lon
        }
        if (lat < this.minLat) {
          this.minLat = lat
        }

        if (item.child.length) {
          this.handleRecursion(item.child, viewType)
        }
      })
    },
    handleRemoveLine () {
      this.map.clearInfoWindow()
      this.p = 0
      this.circle = []
      this.temporaryMarker = []
      this.bezierCurve.forEach((item, index) => {
        this.map.remove(this.bezierCurve[index])
      })
      this.circle.forEach(item => {
        this.map.remove(item)
      })
      this.temporaryMarker.forEach(item => {
        this.map.remove(item)
      })
      this.bezierCurve = []
    },
    // 显示链路
    async handleCurrentChange (row, viewType) {
      const pms = {
        list: row,
        isRelation: true,
        viewType: viewType
      }
      const res = await getRetrieveChain(pms)
      if (res?.code === '200' && res.data.length !== 0) {
        this.maxLon = parseFloat(res.data[0].address.lon)
        this.maxLat = parseFloat(res.data[0].address.lat)
        this.minLon = parseFloat(res.data[0].address.lon)
        this.minLat = parseFloat(res.data[0].address.lat)
        this.handleRecursion(res.data, viewType)
        let centerLon = (this.maxLon + this.minLon) / 2
        let centerLat = (this.maxLat + this.minLat) / 2
        if (this.maxLat - this.minLat > this.maxLon - this.minLon) {
          let distance = (this.maxLat - this.minLat) * 50
          this.getCenter(distance, centerLon, centerLat)
        } else {
          let distance = (this.maxLon - this.minLon) * 50
          this.getCenter(distance, centerLon, centerLat)
        }
        this.bezierCurve.forEach((item, index) => {
          this.bezierCurve[index].setMap(this.map)
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.amap-wrapper {
  width: 100%;
  height: calc(100vh - 8.9rem);
}
::v-deep .amap-logo {
  display: none !important; //去掉高德地图logo
}
::v-deep .amap-copyright {
  opacity: 0; //去掉高德的版本号
}
</style>

