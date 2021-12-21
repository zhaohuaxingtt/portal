
export default [
    {
      i18n: '序号',
      type: 'index',
      width: '50px',
      label: '序号'
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
      i18n: '日志时间'
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