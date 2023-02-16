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
  'meeting_recheck_m_sign',
  'officialPricing',
  'mtz_node_approval',
  'contract',
  'css_contract',
  'csg_contract',
  'csf_contract',
  'discard_contract'
]

// 审批列表隐藏拒绝按钮
export const BPM_HIDE_REFUSE_BUTTON_LIST = [
  'meeting_rs_recheck',
  'mtz_node_approval',
  'contract',
  'css_contract',
  'csg_contract',
  'csf_contract',
  'discard_contract'
]

// 审批列表隐藏补充材料
export const BPM_HIDE_APPEND_BUTTON_LIST = ['meeting_recheck_m_sign']

// 'officialPricing'
// 审批有异议、无异议判断
export const BPM_CATEGORY_RENAME_YIYI_LIST = [
  'meeting_rs_recheck',
  'mtz_node_approval'
]

// 审批中心-我的申请列表只能单选任务名称的类型清单
export const BPM_APPLY_SINGLE_CATEGORY_LIST = [
  'css_contract', // CSS-合同审批
  'csg_contract', // CSG-合同审批
  'csf_contract', // CSF-合同审批
  'procurement_terms', // 采购条款审批
  'discard_contract', // 报废合同审批
  'piecewise_point', // 分段定点审批
  'online_rs_re_check', // Online RS复核审批
  'online_rs_check', // Online RS审核审批
  'gp_access_central_purchasing', // 集中采购一般供应商准入审批
  'gp_access_scrap_disposal', // 报废处置一般供应商准入审批
  'gp_conversion_central_purchasing', // 集中采购一般供应商转正审批
  'gp_conversion_scrap_disposal', // 报废处置一般供应商转正审批
  'gp_temp_central_change_name', // 临时集中采购一般供应商修改企业名称
  'gp_temp_scrap_change_name', // 临时报废处置一般供应商修改企业名称
  'gp_temp_central_change_addr', // 临时集中采购一般供应商修改注册地址
  'gp_temp_scrap_change_addr', // 临时报废处置一般供应商修改注册地址
  'gp_central_change_name', // 正式集中采购一般供应商修改企业名称
  'gp_scrap_change_name', // 正式报废处置一般供应商修改企业名称
  'gp_central_change_addr', // 正式集中采购一般供应商修改注册地址
  'gp_scrap_change_addr', // 正式报废处置一般供应商修改注册地址
  'gp_central_change_bank', // 正式集中采购一般供应商修改银行信息
  'gp_scrap_change_bank', // 正式报废处置一般供应商修改银行信息
  'gp_central_change_sub_account', // 正式集中采购一般供应商修改农民工子账号信息
  'gp_scrap_change_sub_account', // 正式报废处置一般供应商修改农民工子账号信息
  'gp_inactivity', // 供应商 N 年不活跃基本信息更新
  'meeting_recheck_m_sign',
  'mtz_gap',
  'mtz_node_approval',
  'mtz_node_approval_outside'
]

// 审批中心-我的申请列表需要隐藏recall按钮的清单
export const BPM_APPLY_HIDE_RECALL_CATEGORY_LIST = [
  'css_contract', // CSS-合同审批
  'csg_contract', // CSG-合同审批
  'csf_contract', // CSF-合同审批
  'procurement_terms', // 采购条款审批
  'discard_contract', // 报废合同审批
  'piecewise_point', // 分段定点审批
  'online_rs_re_check', // Online RS复核审批
  'online_rs_check', // Online RS审核审批
  'gp_access_central_purchasing', // 集中采购一般供应商准入审批
  'gp_access_scrap_disposal', // 报废处置一般供应商准入审批
  'gp_conversion_central_purchasing', // 集中采购一般供应商转正审批
  'gp_conversion_scrap_disposal', // 报废处置一般供应商转正审批
  'gp_temp_central_change_name', // 临时集中采购一般供应商修改企业名称
  'gp_temp_scrap_change_name', // 临时报废处置一般供应商修改企业名称
  'gp_temp_central_change_addr', // 临时集中采购一般供应商修改注册地址
  'gp_temp_scrap_change_addr', // 临时报废处置一般供应商修改注册地址
  'gp_central_change_name', // 正式集中采购一般供应商修改企业名称
  'gp_scrap_change_name', // 正式报废处置一般供应商修改企业名称
  'gp_central_change_addr', // 正式集中采购一般供应商修改注册地址
  'gp_scrap_change_addr', // 正式报废处置一般供应商修改注册地址
  'gp_central_change_bank', // 正式集中采购一般供应商修改银行信息
  'gp_scrap_change_bank', // 正式报废处置一般供应商修改银行信息
  'gp_central_change_sub_account', // 正式集中采购一般供应商修改农民工子账号信息
  'gp_scrap_change_sub_account', // 正式报废处置一般供应商修改农民工子账号信息
  'gp_inactivity', // 供应商 N 年不活跃基本信息更新
  'meeting_recheck_m_sign',
  'mtz_gap',
  'mtz_node_approval',
  'mtz_node_approval_outside'
]

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
    label: '供应商管理',
    typeName: "supplier_mgnt",
  },
  {
    value: '1',
    label: '供应商转正',
    typeName: 'supplier_conversion',
  },
  {
    value: '2',
    label: '供应商修改',
    typeName: 'supplier_change',
  },
  {
    value: '4',
    label: '供应商准入',
    typeName: 'supplier_access',
  },
  {
    value: '5',
    label: '价格管理',
    typeName: 'price_mgnt',
  },
  {
    value: '6',
    label: '寻源执行',
    typeName: 'sourcing_execution',
  },
  {
    value: '7',
    label: 'ProCS',
    typeName: "procs",
  },
  {
    value: '8',
    label: '寻源与定点',
    typeName: 'sourcing_point',
  },
  {
    value: '9',
    label: '订单与合同',
    typeName: 'order_contract',
  },
  {
    value: '10',
    label: 'AEKO',
    typeName: 'aeko',
  },
  {
    value: '11',
    label: '模具采购',
    typeName: 'module_purchase',
  },
  {
    value: '12',
    label: 'MTZ',
    typeName: 'mtz',
  }
]

// ########################## EKL参数 ##########################
export const EKL_BAOBIAO_PARAMS = {
  UAT: {
    pfjwfbmsj: {
      workspaceId: 'addf20a8-7f65-445c-a737-0f636f428e76',
      reportId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      datasets: ['0571b1ad-b958-4057-aff9-7b9239c811b6']
    },
    pfjwfkssj: {
      workspaceId: 'addf20a8-7f65-445c-a737-0f636f428e76',
      reportId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      datasets: ['0571b1ad-b958-4057-aff9-7b9239c811b6']
    },
    pfjzfbmsj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '7e28d312-12ae-42b1-89b9-86933a2dfe81',
      datasets: ['4d117119-0f4a-4c4c-86cc-3a7d5955171c']
    },
    pfjzfcgysj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '7e28d312-12ae-42b1-89b9-86933a2dfe81',
      datasets: ['4d117119-0f4a-4c4c-86cc-3a7d5955171c']
    },
    pfjzfgsj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '7e28d312-12ae-42b1-89b9-86933a2dfe81',
      datasets: ['4d117119-0f4a-4c4c-86cc-3a7d5955171c']
    },
    pfjzfkssj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '7e28d312-12ae-42b1-89b9-86933a2dfe81',
      datasets: ['4d117119-0f4a-4c4c-86cc-3a7d5955171c']
    },
    wfbmsj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '27c468ba-77ba-481d-ac69-3488a58f0ee2',
      datasets: []
    },
    wfkssj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: 'c940921c-a477-4f64-af67-72eaaad30226',
      datasets: ['41ef7d80-2706-4ba8-b4d6-4a18e6d40477']
    },
    zfbmsj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '9b62a0e4-8ef9-425f-a862-e0c9325a63ba',
      datasets: ['c00c0ef7-778c-41ee-8960-90e504abd70b']
    },
    zfcgysj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '02151d5a-899c-4880-93af-20a6efe8765b',
      datasets: ['61525451-7923-46ca-bee0-6c3dfb969b6f']
    },
    zfgsj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '6a395915-fad7-4519-8840-bb05bd2c25e3',
      datasets: ['18ba9d81-d4a4-4397-9b13-00b93d4aa036']
    },
    zfkssj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '37fcffc8-96c7-46d7-8db6-9fb07c9f47d6',
      datasets: ['38d3176e-14c6-4a77-a9d7-0091d6702f9c']
    }
  },
  SIT: {
    pfjwfbmsj: {
      workspaceId: 'addf20a8-7f65-445c-a737-0f636f428e76',
      reportId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      datasets: ['0571b1ad-b958-4057-aff9-7b9239c811b6']
    },
    pfjwfkssj: {
      workspaceId: 'addf20a8-7f65-445c-a737-0f636f428e76',
      reportId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      datasets: ['0571b1ad-b958-4057-aff9-7b9239c811b6']
    },
    pfjzfbmsj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '7e28d312-12ae-42b1-89b9-86933a2dfe81',
      datasets: ['4d117119-0f4a-4c4c-86cc-3a7d5955171c']
    },
    pfjzfcgysj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '7e28d312-12ae-42b1-89b9-86933a2dfe81',
      datasets: ['4d117119-0f4a-4c4c-86cc-3a7d5955171c']
    },
    pfjzfgsj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '7e28d312-12ae-42b1-89b9-86933a2dfe81',
      datasets: ['4d117119-0f4a-4c4c-86cc-3a7d5955171c']
    },
    pfjzfkssj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '7e28d312-12ae-42b1-89b9-86933a2dfe81',
      datasets: ['4d117119-0f4a-4c4c-86cc-3a7d5955171c']
    },
    wfbmsj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '27c468ba-77ba-481d-ac69-3488a58f0ee2',
      datasets: []
    },
    wfkssj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: 'c940921c-a477-4f64-af67-72eaaad30226',
      datasets: ['41ef7d80-2706-4ba8-b4d6-4a18e6d40477']
    },
    zfbmsj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '9b62a0e4-8ef9-425f-a862-e0c9325a63ba',
      datasets: ['c00c0ef7-778c-41ee-8960-90e504abd70b']
    },
    zfcgysj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '02151d5a-899c-4880-93af-20a6efe8765b',
      datasets: ['61525451-7923-46ca-bee0-6c3dfb969b6f']
    },
    zfgsj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '6a395915-fad7-4519-8840-bb05bd2c25e3',
      datasets: ['18ba9d81-d4a4-4397-9b13-00b93d4aa036']
    },
    zfkssj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '37fcffc8-96c7-46d7-8db6-9fb07c9f47d6',
      datasets: ['38d3176e-14c6-4a77-a9d7-0091d6702f9c']
    }
  },
  production: {//目前隐藏部分参数为测试环境参数，如需本地调试，需手动操作。
    pfjwfbmsj: {
      // workspaceId: 'addf20a8-7f65-445c-a737-0f636f428e76',
      // reportId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      // datasets: ['0571b1ad-b958-4057-aff9-7b9239c811b6']
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: 'f7e92b62-fbd2-4039-be19-95a63b2a298f',
      datasets: ['0571b1ad-b958-4057-aff9-7b9239c811d6']
    },
    pfjwfkssj: {
      // workspaceId: 'addf20a8-7f65-445c-a737-0f636f428e76',
      // reportId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      // datasets: ['0571b1ad-b958-4057-aff9-7b9239c811b6']
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: 'f7e92b62-fbd2-4039-be19-95a63b2a298f',
      datasets: ['0571b1ad-b958-4057-aff9-7b9239c811d6']
    },
    pfjzfbmsj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '7e28d312-12ae-42b1-89b9-86933a2dfe81',
      datasets: ['4d117119-0f4a-4c4c-86cc-3a7d5955171c']
    },
    pfjzfcgysj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '7e28d312-12ae-42b1-89b9-86933a2dfe81',
      datasets: ['4d117119-0f4a-4c4c-86cc-3a7d5955171c']
    },
    pfjzfgsj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '7e28d312-12ae-42b1-89b9-86933a2dfe81',
      datasets: ['4d117119-0f4a-4c4c-86cc-3a7d5955171c']
    },
    pfjzfkssj: {
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '7e28d312-12ae-42b1-89b9-86933a2dfe81',
      datasets: ['4d117119-0f4a-4c4c-86cc-3a7d5955171c']
    },
    // pfjwfbmsj: {
    //   workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
    //   reportId: 'f8d1c804-6583-4574-ba06-1f591aa58cd4',
    //   datasets: ['addf20a8-7f65-445c-a737-0f636f428e76']
    // },
    // pfjwfkssj: {
    //   workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
    //   reportId: 'f8d1c804-6583-4574-ba06-1f591aa58cd4',
    //   datasets: ['addf20a8-7f65-445c-a737-0f636f428e76']
    // },
    // pfjzfbmsj: {
    //   workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
    //   reportId: '06bfe2a1-4814-4dd6-a9ec-1687aa896d06',
    //   datasets: ['b331bdd5-e6c6-4a4c-922a-0099058cf3f3']
    // },
    // pfjzfcgysj: {
    //   workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
    //   reportId: '06bfe2a1-4814-4dd6-a9ec-1687aa896d06',
    //   datasets: ['b331bdd5-e6c6-4a4c-922a-0099058cf3f3']
    // },
    // pfjzfgsj: {
    //   workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
    //   reportId: '06bfe2a1-4814-4dd6-a9ec-1687aa896d06',
    //   datasets: ['b331bdd5-e6c6-4a4c-922a-0099058cf3f3']
    // },
    // pfjzfkssj: {
    //   workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
    //   reportId: '06bfe2a1-4814-4dd6-a9ec-1687aa896d06',
    //   datasets: ['b331bdd5-e6c6-4a4c-922a-0099058cf3f3']
    // },
    wfbmsj: {//外方部门视觉
      // workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
      // reportId: '9f8cfa43-184d-46d5-a204-37ec659d13f6',
      // datasets: ['2eddaa0a-da1e-4fd2-ad1e-0c8e28aa3623']
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '27c468ba-77ba-481d-ac69-3488a58f0ee2',
      datasets: ['a7c0b0bc-e5be-412e-ab36-3bf1636bbec3']
    },
    wfkssj: {//外方科室视觉
      // workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
      // reportId: 'ed65e96c-5c93-46c8-99d3-63c2c7ac0b08',
      // datasets: ['40d5c619-a61c-4b19-8575-d4da919bce0b']
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: 'c940921c-a477-4f64-af67-72eaaad30226',
      datasets: ['41ef7d80-2706-4ba8-b4d6-4a18e6d40477']
    },
    zfbmsj: {//中方部门视觉
      // workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
      // reportId: 'bcf59da6-3518-4db7-bffc-cf5d434d34ae',
      // datasets: ['c00c0ef7-778c-41ee-8960-90e504abd70b']
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '9b62a0e4-8ef9-425f-a862-e0c9325a63ba',
      datasets: ['e758e837-7712-4298-9c3c-f2a9dcebeb84']
    },
    zfcgysj: {//中方采购员视觉
      // workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
      // reportId: 'f3fe9132-dda7-4a9e-81ff-eac032974cfe',
      // datasets: ['4b849a8e-6f67-4fab-a6ab-7f41919780b9']
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '02151d5a-899c-4880-93af-20a6efe8765b',
      datasets: ['61525451-7923-46ca-bee0-6c3dfb969b6f']
    },
    zfgsj: {//中方股视觉
      // workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
      // reportId: '125f7e44-e9d2-43a6-9619-bd4add6ebb60',
      // datasets: ['2d7f4900-070c-46c7-a850-9a768c49deae']
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '6a395915-fad7-4519-8840-bb05bd2c25e3',
      datasets: ['18ba9d81-d4a4-4397-9b13-00b93d4aa036']
    },
    zfkssj: {//中方科室视觉
      // workspaceId: '876776a9-f959-442e-a011-b4bade0dd862',
      // reportId: '35cd4f44-1616-4f62-ab72-7d5b8a35528d',
      // datasets: ['16e08bc4-f04d-4171-9d73-a997a4565ea7']
      workspaceId: 'c272ae69-a6b4-4407-bd0e-f67953de36ce',
      reportId: '37fcffc8-96c7-46d7-8db6-9fb07c9f47d6',
      datasets: ['38d3176e-14c6-4a77-a9d7-0091d6702f9c']
    }
  }
}

export const QUERY_DRAWER_TYPES = {
  APPLICATION_TODO: 1,
  APPLICATION_FINISH: 2,
  APPLY_TODO: 3,
  APPLY_FINISH: 4,
}
