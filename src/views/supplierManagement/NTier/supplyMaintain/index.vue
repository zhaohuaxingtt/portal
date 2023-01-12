<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-06 11:13:02
 * @LastEditors: YoHo && 917955345@qq.com
 * @Descripttion: your project
-->
<template>
  <div>
    <theSearch @form="getForm" :areaList="areaList" ref="theSearch" />
    <router-view ref="view" :areaList="areaList"></router-view>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// import theNodeChain from "./components/theNodeChain.vue";
import theSearch from './components/theSearch.vue'
import { getCityInfo } from "@/api/supplierManagement/supplyChainOverall/index.js";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { theSearch },
  data() {
    return {
      areaList: []
    }
  },
  created(){
    this.getCityInfo()
  },
  methods: {
    getCityInfo() {
      var that = this
      var zhRule = /^[\u4e00-\u9fa5]+$/i //中文
      var enRule = /^[a-zA-Z]+$/ //英文
      console.log(that.$i18n.locale);
      getCityInfo().then((res) => {
        if (window.Worker) {
          const myWorker = new Worker('./worker.js')
          myWorker.postMessage(res)
          myWorker.onmessage = function (result) {
            that.areaList = _.cloneDeep(result.data)
            console.log(that.areaList );
          }
        } else {
          if (res?.result) {
            let areaList = []
            // 筛选国家
            res.data.map((item) => {
              if (item.locationType === 'Nation') {
                if (that.$i18n.locale === 'zh') {
                  if (zhRule.test(item.cityNameCn)) {
                    areaList.push({
                      value: item.cityNameCn,
                      label: item.cityNameCn,
                      cityId: item.cityId,
                      children: []
                    })
                  }
                } else {
                  if (enRule.test(item.cityNameEn)) {
                    areaList.push({
                      value: item.cityNameCn,
                      label: item.cityNameEn,
                      cityId: item.cityId,
                      children: []
                    })
                  }
                }
              }
            })
            // 筛选省
            res.data.forEach((item) => {
              areaList.forEach((val, index) => {
                if (
                  item.locationType === 'Province' &&
                  item.parentCityId === val.cityId
                ) {
                  if (that.$i18n.locale === 'zh') {
                    if (zhRule.test(item.cityNameCn)) {
                      areaList[index].children.push({
                        value: item.cityNameCn,
                        label: item.cityNameCn,
                        cityId: item.cityId,
                        parentCityId: item.parentCityId,
                        children: []
                      })
                    }
                  } else {
                    if (enRule.test(item.cityNameEn)) {
                      areaList[index].children.push({
                        value: item.cityNameCn,
                        label: item.cityNameEn,
                        cityId: item.cityId,
                        parentCityId: item.parentCityId,
                        children: []
                      })
                    }
                  }
                }
              })
            })
            // 筛选市
            res.data.forEach((item) => {
              areaList.forEach((val, j) => {
                val.children.forEach((i, index) => {
                  if (
                    item.locationType === 'City' &&
                    item.parentCityId === i.cityId
                  ) {
                    if (that.$i18n.locale === 'zh') {
                      if (zhRule.test(item.cityNameCn)) {
                        areaList[j].children[index].children.push({
                          value: item.cityNameCn,
                          label: item.cityNameCn,
                          cityId: item.cityId,
                          parentCityId: item.parentCityId
                        })
                      }
                    } else {
                      if (enRule.test(item.cityNameEn)) {
                        areaList[j].children[index].children.push({
                          value: item.cityNameCn,
                          label: item.cityNameEn,
                          cityId: item.cityId,
                          parentCityId: item.parentCityId
                        })
                      }
                    }
                  }
                })
              })
            })
            // 删除空数组
            areaList.map((item) => {
              if (item.children.length) {
                item.children.map((val) => {
                  if (item.children.length === 0) {
                    delete val.children
                  }
                })
              } else {
                delete item.children
              }
            })
            areaList.map((item) => {
              return item.children && item.children
            })
            this.areaList = _.cloneDeep(areaList)
            console.log(this.areaList);
          }
        }
      })
    },
  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
</style>
