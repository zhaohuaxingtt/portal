
export const TABLE = [
    {
      i18n: '日志编号',
      prop: 'id'
    },
    {
      prop: 'category',
      i18n: '分类'
    },
    {
      prop: 'menuName',
      i18n: '模块菜单'
    },
    {
      prop: 'typeName',
      i18n: '操作类型'
    },
    {
      prop: 'triggerTypeName',
      i18n: '触发类型'
    },
    {
      prop: 'interfaceSystem',
      i18n: '外部系统'
    },
    {
      prop: 'createDate',
      i18n: '日志时间',
      width: "150px"
    },
    {
      prop: 'rqTime',
      i18n: '业务编号'
    },
    {
      prop: 'createBy',
      i18n: '用户ID'
    },
    {
      prop: 'userType',
      i18n: '用户类型'
    },
    {
      prop: 'creator',
      i18n: '用户名称'
    },
    {
      prop: 'content',
      i18n: '操作内容',
      minWidth: 200,
      tooltip: true
    },
    {
      prop: 'success',
      i18n: '是否成功',
      customRender:(h,{row})=>{
        return row.success ? "是" : "否"
      }
    },
    {
      prop: 'exceptionMsg',
      i18n: '异常信息',
      minWidth: 150,
      tooltip: true
    },
    {
      prop: 'userPosition',
      i18n: '用户岗位'
    },
    {
      i18n: '操作',
      customRender: (h, scope,col,extraData) => {
        return <iButton type="text" on-click={ () => extraData.msgDetail(scope.row)}>查看详情</iButton>
      }
    },
]

export const TABLE_DETAIL = [
  {
    type: 'expand',
    width: '50px',
    customRender: (h, {row}) => {
      return <div style="padding:10px 20px">{row.result}</div>
    }
  },
  {
    i18n: '序号',
    type: 'index',
    width: '50px',
  },
  {
    prop: 'category',
    i18n: '类别'
  },
  {
    prop: 'content',
    i18n: '操作内容',
    minWidth: 200,
    tooltip: true
  },
  {
    prop: 'createDate',
    i18n: '请求时间',
    width: "150px"
  },
  {
    prop: 'createDate',
    i18n: '响应时间',
    width: "150px"
  },
  {
    prop: 'triggerTypeName',
    i18n: '触发类型'
  },
  {
    prop: 'success',
    i18n: '是否成功',
    customRender:(h,{row})=>{
      return row.success ? "是" : "否"
    }
  },
  {
    prop: 'interfaceSystem',
    i18n: '异常码'
  },
  {
    prop: 'rqTime',
    i18n: '异常信息'
  },
  {
    prop: 'createBy',
    i18n: '接口流水号'
  },
  {
    prop: 'userType',
    i18n: '接口名称'
  },
  {
    prop: 'creator',
    i18n: '对接系统'
  },
]