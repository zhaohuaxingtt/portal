/*
 * @Author: moxuan
 * @Date: 2021-04-26 17:50:00
 * @Description: 初步评级-定性打分
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//初步评级-定性打分分页信息查询
export function getQualitativeScoreList(params) {
  return requst({
    url: `/qualitativeScore/page`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//转派
export function transferQualitativeScore(params) {
  return requst({
    url: `/qualitativeScore/assign`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//分派
export function assignQualitativeScore(params) {
  return requst({
    url: `/qualitativeScore/assign`,
    method: 'PUT',
    data: params
  })
}

//定性打分信息查询
export function getQualitativeScoreDialogList(params) {
  return requst({
    url: `/qualitativeScore/list`,
    method: 'POST',
    data: {
      ...params
    }
  })
}
// 查询定性打分指标列表
export function getQualitativeMappingList(params) {
  return requst({
    url: `qualitativeMapping/list`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//保存定性打分信息
export function saveQualitativeScore(params) {
  return requst({
    url: `/qualitativeScore`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//沿用打分信息
export function followQualitativeScore(params) {
  return requst({
    url: `/qualitativeScore`,
    method: 'PUT',
    data: {
      ...params
    }
  })
}

//重新打分
export function handleScoreAgain(params) {
  return requst({
    url: `/qualitativeScore/scoreAgain`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//查看
export function getScoreViewList(params) {
  return requst({
    url: `/initComment/view`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//更新定性打分状态
export function updateScoreStatus(params) {
  return requst({
    url: `/initComment/scoreStatus`,
    method: 'PUT',
    data: {
      ...params
    }
  })
}

//操作记录查看
export function getRecordList(params) {
  return requst({
    url: `/initComment/record`,
    method: 'POST',
    data: {
      ...params
    }
  })
}

//获取分派下拉
export function getAssignSelectList(params) {
  return requst({
    url: `/qualitativeScore/share`,
    method: 'POST',
    data: {
      ...params
    }
  })
}
