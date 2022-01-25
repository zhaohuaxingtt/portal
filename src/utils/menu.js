/**
 * 获取当前菜单的兄弟菜单
 * @param {Array} data 所以菜单
 * @param {String} path 当前菜单path
 * @param {string} activePath 详细页对应的3级菜单 activePath
 * @returns
 */
export function getSiblingMenus(data, path, activePath) {
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    const url =
      element.url && element.url.indexOf('#') > -1
        ? element.url.split('#')[1]
        : element.url
    if (url === path || url === activePath) {
      return data
    }
    if (element.menuList) {
      const res = getSiblingMenus(element.menuList, path, activePath)
      if (res) {
        return res
      }
    }
  }
}
/**
 * 生成iNavMvp 所需要的数据
 * @param {Array} diyMenus
 * @param {number} level
 * @returns Array
 */
export function generateMenuData(diyMenus, level) {
  diyMenus = diyMenus || []
  const res = []
  diyMenus.forEach((e, index) => {
    let purePath = e.url || ''
    if (e.url && e.url.includes('#')) {
      purePath = e.url.split('#')[1]
    }
    const purePathArr = purePath.split('/')
    let activePath =
      level === 3
        ? '/' + purePathArr[1]
        : '/' + purePathArr[1] + '/' + purePathArr[2]
    if (activePath.indexOf('?')) {
      activePath = activePath.split('?')[0]
    }
    const url = e.url && e.url.indexOf('#') > -1 ? e.url.split('#')[1] : e.url
    res.push({
      value: index + 1,
      name: e.name,
      message: 0,
      url: url,
      activePath: activePath,
      key: e.name,
      permissionKey: e.permissionKey,
      permissionName: e.name
    })
  })
  return res
}
