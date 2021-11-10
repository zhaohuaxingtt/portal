export function getMenuResource(menus, res) {
  res = res || {}
  if (!menus) {
    return res
  }
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    res[menu.permissionKey] = menu
    if (menu.menuList) {
      getMenuResource(menu.menuList, res)
    }
  }

  return res
}
