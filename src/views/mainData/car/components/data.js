import detailPlanOutputInput from './detailPlanOutputInput'

/**
 * 车型默认搜索条件
 **/
export const DEFAULT_SEARCH_FORM_DATA = {
  vwModelCode: '',
  modelNameZh: '',
  brandCode: '',
  carPlatformCode: '',
  carTypeProjectCode: '',
  productFactory: '',
  isValid: ''
}
/**
 * 车型列表
 * */
export const CAR_COLUMNS = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    width: 50
  },
  {
    prop: 'id',
    label: '车型编号',
    emit: 'go-detail',
    i18n: '车型编号',
    minWidth: 100,
    openNewPage: true,
    tooltip: true,
    customRender: (h, scope) => {
      return <span class="open-link-text">{scope.row.vwModelCode}</span>
    }
  },
  {
    prop: 'modelNameZh',
    label: '车型名称',
    i18n: '车型名称',
    tooltip: true
  },
  {
    prop: 'description',
    label: '中文描述',
    i18n: '中文描述',
    tooltip: true
  },
  {
    prop: 'brandName',
    label: '所属品牌',
    i18n: '所属品牌',
    tooltip: true
  },
  {
    prop: 'productCode',
    label: 'PID',
    tooltip: true
  },
  {
    prop: 'carPlatformCode',
    i18n: '平台属性',
    tooltip: true
  },
  {
    prop: 'productFactoryNames',
    label: '投产工厂',
    i18n: '投产工厂',
    tooltip: true
  },
  {
    prop: 'isValid',
    label: '是否有效',
    i18n: '是否有效',
    customRender: (h, scope) => {
      return scope.row.isValid ? '是' : '否'
    }
  },
  {
    prop: 'eplModelCode',
    i18n: 'EPL车型名称',
    minWidth: 140
  },
  {
    prop: 'bkmModelCode',
    i18n: 'BKM车型编号',
    minWidth: 140
  }
]
/**
 * 车型产量计划表
 * */
export const CAR_PLAN_COLUMNS = [
  {
    type: 'index',
    width: 50,
    label: '序号',
    i18n: '序号'
  },
  {
    prop: 'riseVersionCode',
    label: '版本号',
    i18n: '版本号'
  },
  {
    prop: 'productFactoryName',
    label: '生产工厂',
    i18n: '生产工厂'
  },
  {
    prop: 'totalOutPlan',
    label: '车型总产量',
    i18n: '车型总产量'
  },
  {
    prop: 'creator',
    label: '创建人',
    i18n: '创建人'
  },
  {
    prop: 'createDate',
    label: '创建日期',
    i18n: '创建日期',
    customRender: (h, scope) => {
      const { createDate } = scope.row
      if (createDate) {
        return moment(createDate).format('YYYY-MM-DD')
      }
      return createDate
    }
  },
  {
    prop: 'updateDate',
    label: '更新日期',
    i18n: '更新日期',
    customRender: (h, scope) => {
      const { updateDate } = scope.row
      if (updateDate) {
        return moment(updateDate).format('YYYY-MM-DD')
      }
      return updateDate
    }
  },
  {
    prop: 'isValid',
    label: '是否有效',
    i18n: '是否有效',
    width: 100,
    customRender: (h, scope, column, extraData) => {
      const { editable, validChange } = extraData
      if (editable) {
        return (
          <iSelect
            value={scope.row.isValid}
            onChange={(val) => {
              scope.row.isValid = val
              validChange(scope.row)
            }}
          >
            <ElOption value={true} label="是" key="1" />
            <ElOption value={false} label="否" key="0" />
          </iSelect>
        )
      }
      return scope.row.isValid ? '是' : '否'
    }
  },
  {
    prop: 'isLastest',
    label: '是否最新',
    width: 100,
    i18n: '是否最新',
    customRender: (h, scope) => {
      return scope.row.isLastest ? '是' : '否'
    }
  },
  {
    prop: 'remark',
    label: '备注',
    i18n: '备注',
    width: 100,
    customRender: (h, scope, column, extraData) => {
      if (extraData.editable) {
        return (
          <iInput
            value={scope.row.remark}
            onInput={(val) => (scope.row.remark = val)}
          />
        )
      }
      return scope.row.remark
    }
  }
]
/**
 * 车型产量计划新增详情表
 * */

export const CAR_PLAN_DETAIL_ADD_COLUMNS = [
  {
    label: '年份',
    prop: 'years',
    i18n: '年份',
    customRender: (h, scope, column, extraData) => {
      if (extraData.editable) {
        return (
          <iSelect
            value={scope.row.years}
            onChange={(val) => {
              scope.row.years = val
              extraData.handleYearChange(scope)
            }}
          >
            {extraData.yearOptions.map((e) => (
              <ElOption value={e} label={e} />
            ))}
          </iSelect>
        )
      }
      return scope.row.years
    }
  },
  {
    label: '全年产量',
    prop: 'value',
    i18n: '全年产量',
    customRender: (h, scope, column, extraData) => {
      if (extraData.editable) {
        return <detailPlanOutputInput row={scope.row} />
      }
      return <span>{scope.row.output}</span>
    }
  }
]

export const CAR_PLAN_REMOVE_COLUMNS = {
  label: '',
  customRender: (h, scope, column, extraData) => {
    return (
      <span
        class="cursor-pointer"
        onClick={() => extraData.removeItem(scope.$index)}
      >
        <Icon symbol name="icondingdianshenqingyusheluoji-shanchu" />
      </span>
    )
  }
}

/**
 * 车型产量计划编辑详情表
 * */

export const CAR_PLAN_DETAIL_EDIT_COLUMNS = [
  {
    label: '年份',
    prop: 'year',
    i18n: '年份',
    customRender: (h, scope, column, extraData) => {
      if (extraData.editable) {
        return (
          <iSelect
            value={scope.row.years}
            onChange={(val) => {
              scope.row.years = val
              extraData.handleYearChange(scope)
            }}
          >
            {extraData.yearOptions.map((e) => (
              <ElOption value={e} label={e} />
            ))}
          </iSelect>
        )
      }
      return scope.row.years
    }
  },
  {
    label: '全年产量',
    prop: 'output',
    i18n: '全年产量',
    customRender: (h, scope, column, extraData) => {
      if (extraData.editable) {
        return <detailPlanOutputInput row={scope.row} />
      }
      return <span>{scope.row.output}</span>
    }
  },
  {
    label: '已维护比例',
    prop: 'fixRatio',
    i18n: '已维护比例',
    customRender: (h, scope) => {
      return scope.row.fixRatio
    }
  },
  {
    label: '配置产量',
    prop: 'more',
    i18n: '配置产量',
    // eslint-disable-next-line no-unused-vars
    customRender: (h, scope, column, extraData) => {
      return scope.row.fixRatio ? (
        <span
          class="link-text"
          onClick={() => extraData.viewConfigDetail(scope.row)}
        >
          详情
        </span>
      ) : (
        ''
      )
    }
  }
]

/**
 * 车型配置列表columns
 */

export const CAR_CONFIG_COLUMNS = [
  {
    type: 'index',
    width: 50,
    label: '序号',
    i18n: '序号'
  },
  {
    prop: 'riseVersionCode',
    label: '版本号',
    i18n: '版本号'
  },
  {
    prop: 'vmModelCode',
    label: '车型编号',
    i18n: '车型编号'
  },
  {
    prop: 'isValid',
    label: '是否有效',
    i18n: '是否有效',
    customRender: (h, scope, column, extraData) => {
      const { editable, isValidChange } = extraData
      if (editable) {
        return (
          <iSelect
            value={scope.row.isValid}
            onChange={(val) => {
              scope.row.isValid = val
              isValidChange(scope.row)
            }}
          >
            <ElOption value={true} label="是" key="1" />
            <ElOption value={false} label="否" key="0" />
          </iSelect>
        )
      }
      return scope.row.isValid ? '是' : '否'
    }
  },
  {
    prop: 'isLastest',
    label: '是否最新',
    i18n: '是否最新',
    customRender: (h, scope) => {
      return scope.row.isLastest ? '是' : '否'
    }
  },
  {
    prop: 'createDate',
    label: '创建日期',
    i18n: '创建日期',
    customRender: (h, scope) => {
      const { createDate } = scope.row
      if (createDate) {
        return moment(createDate).format('YYYY-MM-DD')
      }
      return createDate
    }
  },
  {
    prop: 'creator',
    label: '创建人',
    i18n: '创建人'
  }
]

export const CAR_CONFIG_EDIT_ROW = {
  batteryCapacity: '',
  cartypeConfigOrder: 0,
  cartypeId: '',
  cartypeLevel: '',
  cartypeLevelRate: 0,
  createBy: 0,
  engineType: '',
  gearboxName: '',
  isValid: true,
  otherConf: '',
  riseVersionCode: '',
  useYear: 0
}
