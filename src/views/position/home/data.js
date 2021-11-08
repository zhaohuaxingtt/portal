export const orgTableSetting = [
    {
        type: 'selection',
        width: '50',
    },
    {
      prop: 'orgId',
      label: '组织机构编号',
      key: '',
      width: '100px',
      tooltip: false,
      align: 'center',
    },
    {
      prop: 'orgName',
      label: '组织结构名称',
      key: '',
      tooltip: false,
      align: 'center',
      emit: 'go-detail',
      type: 'expanded',
      customRender: (h, scope) => {
        return <span class='open-link-text'>{scope.row.orgName}</span>
      },
    },
  ]


  export const positionTableSetting = [
    {
        type: 'selection',
        width: '50',
    },
    {
      prop: 'positionId',
      label: '岗位编码',
      key: '',
      width: '100px',
      tooltip: false,
      align: 'center',
    },
    {
      prop: 'positionName',
      label: '岗位全称',
      key: '',
      tooltip: false,
      align: 'center',
      emit: 'go-detail',
      type: 'expanded',
    },
    {
        prop: 'positionOrgLeader',
        label: '组织领导',
        key: '',
        tooltip: false,
        align: 'center',
        emit: 'go-detail',
        type: 'expanded',
      },
  ]