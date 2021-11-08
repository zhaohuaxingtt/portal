/*
 * @Author: moxuan
 * @Date: 2021-04-19 17:50:00
 * @Description: 初步评级-初步评级
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//初步评级-分页查询初步评级信息表
export function getInitCommentList(params) {
  return requst({
    url: `/initComment/page`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//初步评级-更新状态
export function updatePreliminaryStatus(params) {
  return requst({
    url: `/initComment/updatePreliminaryStatus`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//初步评级-财报比较-1,2 ,3级指标对比
export function financialReportLevel3Comparison(params) {
  return requst({
    url: `/initComment/compareLevel3`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//初步评级-财报比较-评级比较
export function financialReportRatingComparison(params) {
  return requst({
    url: `/initComment/compares`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//rating
export function initCommentRating(params) {
  return requst({
    url: `/initComment/rating`,
    method: 'POST',
    data: {
      ...params
    }
  })
}
