// 根据菜单类型，获取菜单
export function getMenuByType(data, type, res) {
  res = res || []
  if (!data) {
    return res
  }
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (type.indexOf(item.type) > -1) {
      const resItem = {}
      for (const key in item) {
        if (Object.hasOwnProperty.call(item, key)) {
          const element = item[key]
          if (key !== 'menuList') {
            resItem[key] = element
          }
        }
      }
      res.push(resItem)
      if (item.menuList && item.menuList.length > 0) {
        resItem.menuList = []
        getMenuByType(item.menuList, type, resItem.menuList)
      }
    }
  }
  return res
}
