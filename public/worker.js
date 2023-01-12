/*
 * @Author: YoHo
 * @Date: 2022-12-28 21:34:09
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\public\worker.js
 */
// worker.js
onmessage = function (obj) {
  let res = obj.data
  if (res?.result) {
    let areaList = []
    // 筛选国家
    res.data.map((item) => {
      if (item.locationType === 'Nation') {
        areaList.push({
          value: item.cityNameCn,
          label: item.cityNameCn,
          labelEn: item.cityNameEn,
          cityId: item.cityId,
          children: []
        })
      }
    })
    // 筛选省
    res.data.forEach((item) => {
      areaList.forEach((val, index) => {
        if (
          item.locationType === 'Province' &&
          item.parentCityId === val.cityId
        ) {
          areaList[index].children.push({
            value: item.cityNameCn,
            label: item.cityNameCn,
            labelEn: item.cityNameEn,
            cityId: item.cityId,
            parentCityId: item.parentCityId,
            children: []
          })
        }
      })
    })
    // 筛选市
    res.data.forEach((item) => {
      areaList.forEach((val, j) => {
        val.children.forEach((i, index) => {
          if (item.locationType === 'City' && item.parentCityId === i.cityId) {
            areaList[j].children[index].children.push({
              value: item.cityNameCn,
              label: item.cityNameCn,
              labelEn: item.cityNameEn,
              cityId: item.cityId,
              parentCityId: item.parentCityId
            })
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
    postMessage(areaList)
  }
}