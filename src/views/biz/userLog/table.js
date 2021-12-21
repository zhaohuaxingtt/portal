export default [
    {
      i18n: '序号',
      type: 'index',
      width: '50px',
      label: '序号'
    },
    {
      prop: 'typeName',
      i18n: '操作类型'
    },
    {
      prop: 'content',
      i18n: '操作内容',
      minWidth: 250,
      tooltip: true
    },
    {
      prop: 'rqTime',
      i18n: '请求时间'
    },
    {
      prop: 'respTime',
      i18n: '响应时间'
    },
    {
      prop: 'exceptionMsg',
      i18n: '异常信息',
      minWidth: 200,
      tooltip: true
    },
    {
      prop: 'creator',
      i18n: '用户'
    },
    {
      prop: 'userPosition',
      i18n: '岗位'
    },
    {
      i18n: '是否成功',
      customRender:(h,{row})=>{
        return row.success ? "是" : "否"
      }
    },
    {
      i18n: '报文详情',
      customRender:(h,{row},col,extraData)=>{
        return <iButton type="text" on-click={ () => extraData.msgDetail(row)}>查看详情</iButton> 
      }
    }
]