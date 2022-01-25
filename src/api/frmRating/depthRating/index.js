/**
 * @author: shujie
 * @createTime: 2021-5-20 11:08:00
 * @Description: 深评首页列表
 */
import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requstDownload = axiosDownload(process.env.VUE_APP_SUPPLIER + '/web')

// 深评列表
export function depSupplierList(parmars) {
  return requst({
    url: '/depSupplier/page',
    method: 'POST',
    data: parmars
  })
}

// 深入评级-终止（是否深评改为否，不评级原因改为终止）
export function termination(parmars) {
  return requst({
    url: '/depSupplier/termination',
    method: 'POST',
    data: parmars
  })
}

// 更新供应商深评表
export function depSupplier(parmars) {
  return requst({
    url: '/depSupplier',
    method: 'PUT',
    data: parmars
  })
}
// 导出深评
export function depSupplierDown(parmars) {
    return requstDownload({
      url: '/depSupplier/down',
      method: 'POST',
      data: parmars
    })
  }

// 加入集团,移出集团
export function addOrMoveGroup(parmars) {
  return requst({
    url: '/depSupplier/addOrMoveGroup',
    method: 'PUT',
    data: parmars
  })
}
// 新建集团
export function newGroup(parmars) {
  return requst({
    url: '/depSupplier/newGroup',
    method: 'POST',
    data: parmars
  })
}
// 查询集团名称列表
export function groupNameList(parmars) {
  return requst({
    url: '/depSupplier/groupNameList',
    method: 'POST',
    data: parmars
  })
}
// 报告分发下拉人员列表
export function reportIssueUser(parmars) {
  return requst({
    url: '/depSupplier/reportIssueUser',
    method: 'POST',
    data: parmars
  })
}
// 深入评级-报告分发
export function reportIssue(parmars) {
  return requst({
    url: '/depSupplier/reportIssue',
    method: 'POST',
    data: parmars
  })
}
// 批量更新供应商深评表
export function batch(parmars) {
  return requst({
    url: '/depSupplier/batch',
    method: 'POST',
    data: parmars
  })
}

// 提交深评清单
export function submitDeepList(parmars) {
  return requst({
    url: '/depSupplier/submitDeepList',
    method: 'POST',
    data: parmars
  })
}

// 分页查询深评附件信息表
export function depAttachmentPage(parmars) {
  return requst({
    url: '/depAttachment/page',
    method: 'POST',
    data: parmars
  })
}

// 上传
export function depAttachmentInfo(parmars) {
  return requst({
    url: '/depAttachment/info',
    method: 'POST',
    data: parmars
  })
}

// 批量删除查询深评附件信息表
export function depAttachmentDel(parmars) {
  return requst({
    url: '/depAttachment/del',
    method: 'DELETE',
    data: parmars
  })
}

// 深入评级-终止-审批列表查询(根据集团分组)
export function approvalListGroupByPid(parmars) {
  return requst({
    url: '/depSupplier/approvalListGroupByPid',
    method: 'POST',
    data: parmars
  })
}
