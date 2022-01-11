export const N_ITER_COLUMNS = [
  {
    type: 'selection'
  },
  {
    type: 'index',
    i18n: '序号'
  },
  {
    i18n: '供应商中文名称',
    prop: 'nameZh',
    minWidth: '130px',
    tooltip: true,
    // openNewPage: true,
    emit: 'go-detail',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.nameZh}</span>
    }
  },
  {
    i18n: '供应商英文名称',
    prop: 'nameEn',
    minWidth: '130px',
    tooltip: true
  },
  {
    i18n: '统一社会信用代码',
    prop: 'socialcreditNo',
    minWidth: '130px',
    tooltip: true
  },
  {
    i18n: 'DUNS',
    prop: 'dunsCode'
  },
  {
    i18n: '国家',
    prop: 'country',
    tooltip: true
  },
  {
    i18n: '修改时间',
    prop: 'updateDate',
    tooltip: true
  }
]

export const N_ITER_DETAIL_LIST = [
  {
    type: 'selection'
  },
  {
    i18n: '序号',
    type: 'index'
  },
  {
    i18n: '联系人姓名',
    tooltip: true,
    prop: 'nameZh',
    emit: 'go-detail',
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
    prop: 'userName',
    i18n: '用户登录名',
    tooltip: true
  },
  {
    prop: 'position',
    i18n: '职务',
    tooltip: true
  },
  {
    prop: 'dept',
    i18n: '部门',
    tooltip: true
  },
  {
    prop: 'telephoneAreaCode',
    i18n: '区号',
    tooltip: true
  },
  {
    prop: 'telephoneO',
    i18n: '联系电话',
    tooltip: true
  },
  {
    prop: 'isMainContact',
    i18n: '是否为主用户',
    tooltip: true,
    customRender: (h, scope) => {
      return scope.row.isMainContact ? '是' : '否'
    }
  },
  {
    prop: '',
    i18n: '是否超期',
    minWidth: '100',
    customRender: (h, scope) => {
      if (scope.row.isExpired) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  {
    prop: 'email',
    i18n: '电子邮箱',
    tooltip: true
  }
]

export const N_TIER_DETAIL_FACTORY_COLUMNS = [
  {
    type: 'selection',
    width: '50px'
  },
  {
    label: '序号',
    type: 'index',
    width: '50px'
  },
  {
    prop: 'factoryName',
    i18n: '工厂名称',
    minWidth: '150',
    required: true,
    emit: 'go-detail',
    customRender: (h, scope) => {
      return <span class="link-text">{scope.row.factoryName}</span>
    }
  },
  {
    prop: 'country',
    i18n: '国家',
    minWidth: '150',
    required: true,
    customRender: (h, scope) => {
      return scope?.row?.addressInfoUpdateVo?.country
    }
  },
  {
    prop: 'province',
    i18n: '省份',
    minWidth: '150',
    required: true,
    customRender: (h, scope) => {
      return scope?.row?.addressInfoUpdateVo?.province
    }
  },
  {
    prop: 'city',
    i18n: '城市',
    minWidth: '150',
    required: true,
    customRender: (h, scope) => {
      return scope?.row?.addressInfoUpdateVo?.city
    }
  },
  {
    prop: 'factoryAbbrName',
    i18n: '详细地址',
    minWidth: '150',
    required: true,
    customRender: (h, scope) => {
      return scope?.row?.addressInfoUpdateVo?.address
    }
  },
  {
    prop: '邮编',
    i18n: '邮编',
    customRender: (h, scope) => {
      return scope?.row?.addressInfoUpdateVo?.postCode
    }
  },
  {
    prop: 'areaCovered',
    i18n: '工厂占地面积'
  }
]
