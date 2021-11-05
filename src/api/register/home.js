/*
 * @author:shujie
 * @Date: 2021-4-19 10:49:09
 * @Description: In User Settings Edit
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

// 校验是否已经注册用户
export function indexNext(parmars, type) {
  return requst({
    url: '/basic/indexNext',
    method: 'POST',
    data: parmars,
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
// 根据社会信用代码获取供应商信息
export function getInfosByCode(parmars, type) {
  return requst({
    url: `/basic/infosByCode/${parmars}`,
    method: 'GET',
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}

//验证token + 供应商类型
export function verification(parmars, type) {
  return requst({
    url: `/basic/verification`,
    method: 'POST',
    data: parmars,
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
//通过email ，查询采购员信息
export function getUserInfo(parmars, type) {
  return requst({
    url: `/basic/getUserInfo`,
    method: 'POST',
    data: parmars,
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
