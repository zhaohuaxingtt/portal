import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_USER_CENTER)

/**
 * 收藏菜单
 * @param {*} data
 * @returns
 */
export function saveFavoriteMenu(data) {
  return requst({
    url: '/web/sapUser/menu/favoriteBatch',
    method: 'post',
    data
  })
}

/**
 * 收藏应用
 * @param {*} data
 * @returns
 */
export function saveFavoriteApplications(data) {
  return requst({
    url: '/web/sapUser/application/favoriteBatch',
    method: 'post',
    data
  })
}

/**
 *
 * @param {*} data
 * @returns 查询已收藏
 */
export function queryFavorites(data) {
  return requst({
    url: '/web/sapUser/getFavoriteList',
    method: 'post',
    data
  })
}
