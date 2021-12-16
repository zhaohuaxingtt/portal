export const MAP_APPROVAL_TYPE = {
  AGREE: 1,
  REFUSE: 2,
  APPEND_DATA: 3
}

export const MOCK_FILE_URL = '/udDown'
// export const MOCK_FILE_URL = '/getFileByFileId'

//EventBus 名字
export const EventBusName = {
  SelectedOrganizationTag: 'SelectedOrganizationTag'
}

// aeko审批类型
export const AEKO_CATEGORY_LIST = ['aeko_mp', 'aeko_aea', 'aeko_content']

// 审批列表只能单选的类型
export const BPM_SINGL_CATEGORY_LIST = [
  'meeting_rs_recheck',
  'meeting_recheck_m_sign'
]
// 'officialPricing'
// 审批有异议、无异议判断
export const BPM_CATEGORY_RENAME_YIYI_LIST = ['meeting_rs_recheck']

// 审批单据类型
/**
 * 单据类型
 */
export const BPM_APPROVAL_TYPE_OPTIONS = [
  {
    value: '-1',
    label: '未知类型'
  },
  {
    value: '0',
    label: '供应商管理'
  },
  {
    value: '1',
    label: '供应商转正'
  },
  {
    value: '2',
    label: '供应商修改'
  },
  {
    value: '4',
    label: '供应商准入'
  },
  {
    value: '5',
    label: '价格管理'
  },
  {
    value: '6',
    label: '寻源执行'
  },
  {
    value: '7',
    label: 'ProCS'
  },
  {
    value: '8',
    label: '寻源与定点'
  },
  {
    value: '9',
    label: '订单与合同'
  },
  {
    value: '10',
    label: 'AEKO'
  },
  {
    value: '11',
    label: '模具采购'
  },
  {
    value: '12',
    label: 'MTZ'
  }
]
