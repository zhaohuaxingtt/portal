import detailPlanOutputInput from './detailPlanOutputInput'
export const CAR_PROJECT_COLUMNS = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    width: 50
  },
  {
    prop: 'cartypeProjectZh',
    label: '车型项目中文名称',
    i18n: '',
    minWidth: 100,
    emit: 'go-detail',
    tooltip: true,
    openNewPage: true,
    customRender: (h, scope) => {
      return <span class="open-link-text">{scope.row.cartypeProjectZh}</span>
    }
  },
  {
    prop: 'cartypeNameZh',
    label: '车型',
    i18n: ''
  },
  {
    prop: 'cartypeProType',
    label: '车型项目类型',
    i18n: ''
  },
  {
    prop: 'projectPurchaserUserNames',
    label: '项目采购员',
    i18n: ''
  },
  {
    prop: 'sopDate',
    label: 'SOP时间',
    i18n: '',
    customRender: (h, scope) => {
      let dateTime = scope.row.sopDate
      let date = ''
      if (dateTime && dateTime.length > 0) {
        date = moment(dateTime).format('YYYY-MM-DD')
      }
      return date
    }
  },
  {
    prop: 'factoryNameStr',
    label: '工厂',
    i18n: ''
  },
  {
    prop: 'publishStatus',
    label: '发布状态',
    i18n: '',
    customRender: (h, scope) => {
      if (scope.row.publishStatus == 1) {
        return '有效'
      }
      return '草稿'
    }
  },
  {
    prop: 'isValid',
    label: '是否有效',
    i18n: '',
    customRender: (h, scope) => {
      if (scope.row.isValid) {
        return '是'
      }
      return '否'
    }
  }
]

/**
 * 车型项目产量计划表
 * */
export const CAR_PROJECT_PLAN_COLUMNS = [
  {
    type: 'index',
    width: 50,
    label: '序号'
  },
  {
    prop: 'versionCode',
    label: 'TIPS版本号'
  },
  {
    prop: 'riseVersionCode',
    label: '版本号'
  },
  // {
  //   prop: 'fullNameZh',
  //   label: '生产工厂'
  // },
  {
    prop: 'totalProduct',
    label: '总产量'
  },
  {
    prop: 'creator',
    label: '创建人'
  },
  {
    prop: 'createDate',
    label: '创建日期',
    customRender: (h, scope) => {
      let dateTime = scope.row.createDate
      let date = ''
      if (dateTime && dateTime.length > 0) {
        date = moment(dateTime).format('YYYY-MM-DD')
      }
      return date
    }
  },
  {
    prop: 'updateDate',
    label: '更新日期',
    customRender: (h, scope) => {
      let dateTime = scope.row.updateDate
      let date = ''
      if (dateTime && dateTime.length > 0) {
        date = moment(dateTime).format('YYYY-MM-DD')
      }
      return date
    }
  },
  {
    prop: 'isValid',
    label: '是否有效',
    width: 100,
    customRender: (h, scope, column, extraData) => {
      const { editable, validChange } = extraData
      if (editable) {
        return (
          <iSelect
            value={scope.row.isValid}
            onChange={val => {
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
    customRender: (h, scope) => {
      return scope.row.isLastest ? '是' : '否'
    }
  },
  {
    prop: 'remark',
    label: '备注',
    customRender: (h, scope, column, extraData) => {
      if (extraData.editable) {
        return (
          <iInput
            value={scope.row.remark}
            onInput={val => (scope.row.remark = val)}
          />
        )
      }
      return scope.row.remark
    }
  }

  // {
  //   prop: 'status',
  //   label: '工厂'
  // },
]
/**
 * 车型项目产量计划新增详情表
 * */

export const CAR_PROJECT_PLAN_DETAIL_ADD_COLUMNS = [
  {
    label: '年份',
    prop: 'year',
    customRender: (h, scope, column, extraData) => {
      if (extraData.editable) {
        return (
          <iSelect
            value={scope.row.years}
            onChange={val => {
              scope.row.years = val
              extraData.handleYearChange(scope)
            }}
          >
            {extraData.yearOptions.map(e => (
              <ElOption value={e} label={e} />
            ))}
          </iSelect>
        )
      }
      return scope.row.years
    }
  },
  {
    label: '车型年产量',
    prop: 'value',
    customRender: (h, scope, column, extraData) => {
      if (extraData.editable) {
        return <detailPlanOutputInput row={scope.row} />
      }
      return <span>{scope.row.output}</span>
    }
  }
]

/**
 * 车型项目产量计划编辑详情表
 * */

export const CAR_PROJECT_PLAN_DETAIL_EDIT_COLUMNS = [
  {
    label: '年份',
    prop: 'year',
    customRender: (h, scope, column, extraData) => {
      if (extraData.editable) {
        return (
          <iSelect
            value={scope.row.years}
            onChange={val => {
              scope.row.years = val
              extraData.handleYearChange(scope)
            }}
          >
            {extraData.yearOptions.map(e => (
              <ElOption value={e} label={e} />
            ))}
          </iSelect>
        )
      }
      return scope.row.years
    }
  },
  {
    label: '车型年产量',
    prop: 'value',
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
 * 车型配置列表columns
 */

export const CAR_PROJECT_CONFIG_COLUMNS = [
  {
    type: 'index',
    width: 50,
    label: '序号'
  },
  {
    prop: 'riseVersionCode',
    label: '版本号'
  },
  {
    prop: 'carTypeProName',
    label: '车型项目名称'
  },
  {
    prop: 'isValid',
    label: '是否有效',
    customRender: (h, scope, column, extraData) => {
      const { editable, isValidChange } = extraData
      if (editable) {
        return (
          <iSelect
            value={scope.row.isValid}
            onChange={val => {
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
    customRender: (h, scope) => {
      return scope.row.isLastest ? '是' : '否'
    }
  },
  {
    prop: 'createTime',
    label: '创建日期',
    customRender: (h, scope) => {
      let dateTime = scope.row.createTime
      let date = ''
      if (dateTime && dateTime.length > 0) {
        date = moment(dateTime).format('YYYY-MM-DD')
      }
      return date
    }
  },
  {
    prop: 'creator',
    label: '创建人'
  }
]

export const CAR_PROJECT_CONFIG_EDIT_COLUMNS = [
  // {
  //   type: 'selection',
  //   width: 50
  // },
  {
    type: 'index',
    width: 50,
    label: '序号'
  },
  {
    prop: 'id',
    label: '配置ID',
    customRender: (h, scope, column, extraData) => {
      if (extraData.editable) {
        return (
          <iInput
            size="mini"
            value={scope.row.id}
            onInput={val => (scope.row.id = val)}
          />
        )
      }
      return <span>{scope.row.id}</span>
    }
  },
  {
    prop: 'cartypeId',
    label: '车型编号',
    customRender: (h, scope, column, extraData) => {
      console.log('车型编号', extraData.editable)
      if (extraData.editable) {
        return (
          <iInput
            size="mini"
            value={scope.row.cartypeId}
            onInput={val => (scope.row.cartypeId = val)}
          />
        )
      }
      return <span>{scope.row.value}</span>
    }
  },
  {
    prop: 'engineType',
    label: '发动机类型',
    customRender: (h, scope, column, extraData) => {
      const { editable, engineSelectOptions, engineSelectMap } = extraData
      if (editable) {
        return (
          <iSelect
            value={scope.row.engineType}
            onChange={val => (scope.row.engineType = val)}
          >
            {engineSelectOptions.map(e => (
              <ElOption value={e.id} label={e.name} key={e.id} />
            ))}
          </iSelect>
        )
      }
      return scope.row.engineType && engineSelectMap[scope.row.engineType]
    }
  },
  {
    prop: 'gearboxName',
    label: '变速箱型号',
    customRender: (h, scope, column, extraData) => {
      const { editable, boxSelectOptions, boxSelectMap } = extraData
      if (editable) {
        return (
          <iSelect
            value={scope.row.gearboxName}
            onChange={val => (scope.row.gearboxName = val)}
          >
            {boxSelectOptions.map(e => (
              <ElOption value={e.id} label={e.name} key={e.id} />
            ))}
          </iSelect>
        )
      }
      return scope.row.gearboxName && boxSelectMap[scope.row.gearboxName]
    }
  },
  {
    prop: 'batteryCapacity',
    label: '电池容量 ',
    customRender: (h, scope, column, extraData) => {
      const { editable, batterySelectOptions, batterySelectMap } = extraData

      if (editable) {
        return (
          <iSelect
            value={scope.row.batteryCapacity}
            onChange={val => (scope.row.batteryCapacity = val)}
          >
            {batterySelectOptions.map(e => (
              <ElOption value={e.id} label={e.name} key={e.id} />
            ))}
          </iSelect>
        )
      }
      return (
        scope.row.batteryCapacity && batterySelectMap[scope.row.batteryCapacity]
      )
    }
  },
  {
    prop: 'otherConf',
    label: '其它配置',
    customRender: (h, scope, column, extraData) => {
      if (extraData.editable) {
        return (
          <iInput
            size="mini"
            value={scope.row.otherConf}
            onInput={val => (scope.row.otherConf = val)}
          />
        )
      }
      return <span>{scope.row.otherConf}</span>
    }
  },
  {
    prop: 'cartypeLevel',
    label: '车型等级',
    customRender: (h, scope, column, extraData) => {
      const {
        editable,
        cartypeConfigLevelOptions,
        cartypeConfigLevelMap
      } = extraData
      if (editable) {
        return (
          <iSelect
            value={scope.row.cartypeLevel}
            onChange={val => (scope.row.cartypeLevel = val)}
          >
            {cartypeConfigLevelOptions.map(e => (
              <ElOption value={e.id} label={e.name} key={e.id} />
            ))}
          </iSelect>
        )
      }
      return (
        scope.row.cartypeLevel && cartypeConfigLevelMap[scope.row.cartypeLevel]
      )
    }
  },
  {
    prop: 'cartypeLevelRate',
    label: '配置比例',

    customRender: (h, scope, column, extraData) => {
      if (extraData.editable) {
        return (
          <iInput
            size="mini"
            value={scope.row.cartypeLevelRate}
            onInput={val => (scope.row.cartypeLevelRate = val)}
          />
        )
      }
      return <span>{scope.row.cartypeLevelRate}</span>
    }
  },
  {
    prop: 'id',
    label: '删除',
    emit: 'delete-row',
    width: 50,
    customRender: h => {
      return (
        <span class="cursor-pointer">
          <Icon symbol name="icondingdianshenqingyusheluoji-shanchu" />
        </span>
      )
    }
  }
]

export const CAR_PROJECT_CONFIG_EDIT_ROW = {
  batteryId: '',
  carProTypeCode: '',
  cartypeConfigOrder: '',
  cartypeLevel: '',
  cartypeLevelRate: 0,
  engineId: '',
  gearboxId: '',
  otherConf: ''
}

export const CAR_PROJECT_SELECTOR_TableSetting = [
  {
    type: 'selection',
    width: 50
  },
  {
    prop: '',
    type: 'index',
    label: '编号'
  },
  {
    prop: 'userNum',
    label: '员工号'
  },
  {
    prop: 'nameZh',
    label: '姓名'
  },
  {
    prop: 'deptList',
    label: '所属部门'
  },
  {
    prop: 'email',
    label: '邮箱'
  },
  {
    prop: 'mobile',
    label: '手机'
  },
  {
    prop: 'phone',
    label: '电话'
  }
]

// export const CAR_PROJECT_PURCHASE_SELECTOR = []
// export const CAR_PROJECT_AREACONTROLLER_SELECTOR = []
// export const CAR_PROJECT_PROJECTMANAGER_SELECTOR = []
