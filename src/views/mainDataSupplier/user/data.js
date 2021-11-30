export const USER_TABLE_COLUMNS = [
  {
    type: 'selection'
  },
  {
    type: 'index',
    label: '序号'
  },
  {
    label: '联系人姓名',
    prop: 'nameZh',
    tooltip: true,
    minWidth: '100px',
    emit: 'to-detail',
    align: 'left',
    customRender: (h, scope) => {
      return (
        <div class="table-cell-icon">
          {scope.row.isMainContact && (
            <span class="cell-icon">
              <icon symbol name="iconsheweizhuyonghu1" />
            </span>
          )}
          <span class="link-text">{scope.row.nameZh}</span>
        </div>
      )
    }
  },
  {
    label: '供应商中文名',
    prop: 'opcsCompanyNameZh',
    tooltip: true,
    minWidth: '180px'
  },
  {
    label: '职位',
    prop: 'position',
    minWidth: '120px',
    tooltip: true
  },
  {
    label: '部门',
    prop: 'dept',
    minWidth: '120px',
    tooltip: true
  },
  {
    label: '电话区号',
    prop: 'telephoneAreaCode',
    tooltip: true
  },
  {
    label: '联系电话',
    prop: 'telephoneO',
    minWidth: '120px',
    tooltip: true
  },
  {
    label: '电子邮件',
    prop: 'email',
    minWidth: '180px',
    tooltip: true
  },
  {
    label: '用户登录名',
    prop: 'userName',
    tooltip: true,
    minWidth: '120px'
  },
  {
    label: '是否有效',
    prop: '',
    customRender: (h, scope) => {
      // 1正常2冻结
      if (scope.row.status == '1') {
        return '是'
      } else if (scope.row.status == '2') {
        return '否'
      }
      return ''
    }
  },
  {
    label: '是否超期',
    prop: '',
    tooltip: true,
    customRender: (h, scope) => {
      if (scope.row.isExpired) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  {
    label: '超期时间 ',
    prop: 'expireDate',
    minWidth: '180px'
  },
  {
    label: '最后登录时间',
    prop: 'lastLoginDate',
    minWidth: '180px'
  },
  {
    label:'是否删除',
    prop:'isDelete',
    width:100,
    customRender:(h,scope)=>{
      if(scope.row.isDelete){
        return '是'
      }else{
        return '否'
      }
    }
  }
]
