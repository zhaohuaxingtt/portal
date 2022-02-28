import paritiesCodeSelect from './paritiesCodeSelect.vue'
import paritiesInput from './paritiesInput.vue'
import paritiesSelectTime from './paritiesSelectTime.vue'
import paritiesSelectActive from './paritiesSelectActive.vue'
export const PARITIES_VIEW_COLUMNS = [
  {
    i18n: '序号',
    type: 'index',
    width: '50px'
  },
  {
    i18n: '源货币编码',
    prop: 'originCurrencyCode'
  },
  {
    i18n: '目标货币编码',
    prop: 'currencyCode'
  },
  {
    i18n: '汇率',
    prop: 'exchangeRate'
  },
  {
    i18n: '汇率类型',
    prop: 'type',
    customRender: (h, scope) => {
      if (scope.row.type == 0) {
        return 'SAP汇率'
      }
      return '项目汇率'
    }
  },
  {
    i18n: '生效开始时间',
    prop: 'effectiveStartTime',
    customRender: (h, scope) => {
      if (scope.row.effectiveStartTime) {
        return <span>{scope.row.effectiveStartTime.substring(0, 10)}</span>
      }
      return <span>{scope.row.effectiveStartTime}</span>
    }
  },
  {
    i18n: '生效结束时间',
    prop: 'effectiveEndTime',
    customRender: (h, scope) => {
      if (scope.row.effectiveEndTime) {
        return <span>{scope.row.effectiveEndTime.substring(0, 10)}</span>
      }
      return <span>{scope.row.effectiveEndTime}</span>
    }
  },
  {
    i18n: '是否有效',
    prop: 'isEffect',
    customRender: (h, scope) => {
      if (scope.row.isEffect) {
        return '是'
      }
      return '否'
    }
  }
]

export const PARITIES_EDIT_COLUMNS = [
  {
    type: 'customSelection',
    width: '50px'
  },
  {
    i18n: '序号',
    type: 'index',
    width: '50px'
  },
  {
    i18n: '源货币编码',
    prop: 'originCurrencyCode',
    required: true,
    customRender: (h, scope, column, extraData) => {
      if (!scope.row.isEdit) {
        return <span>{scope.row.originCurrencyCode}</span>
      }
      return (
        <paritiesCodeSelect
          row={scope.row}
          type="oriCode"
          selectOptions={extraData.currencyCode}
        ></paritiesCodeSelect>
      )
    }
  },
  {
    i18n: '目标货币编码',
    prop: 'currencyCode',
    required: true,
    customRender: (h, scope, column, extraData) => {
      if (!scope.row.isEdit) {
        return <span>{scope.row.currencyCode}</span>
      }
      return (
        <paritiesCodeSelect
          row={scope.row}
          selectOptions={extraData.currencyCode}
        ></paritiesCodeSelect>
      )
    }
  },
  {
    i18n: '汇率',
    prop: 'exchangeRate',
    required: true,
    customRender: (h, scope) => {
      if (!scope.row.isEdit) {
        return <span>{scope.row.exchangeRate}</span>
      }
      return <paritiesInput row={scope.row}></paritiesInput>
    }
  },
  {
    i18n: '汇率类型',
    prop: 'type',
    required: true,
    customRender: (h, scope) => {
      if (!scope.row.isEdit) {
        return 'SAP汇率'
      }
      return '项目汇率'
    }
  },
  {
    i18n: '生效开始时间',
    prop: 'effectiveStartTime',
    required: true,
    customRender: (h, scope) => {
      if (!scope.row.isEdit) {
        if (scope.row.effectiveStartTime) {
          return <span>{scope.row.effectiveStartTime.substring(0, 10)}</span>
        }
        return <span>{scope.row.effectiveStartTime}</span>
      }
      return (
        <paritiesSelectTime
          row={scope.row}
          type="activeTime"
        ></paritiesSelectTime>
      )
    }
  },
  {
    i18n: '生效结束时间',
    prop: 'effectiveEndTime',
    required: true,
    customRender: (h, scope) => {
      if (!scope.row.isEdit) {
        if (scope.row.effectiveEndTime) {
          return <span>{scope.row.effectiveEndTime.substring(0, 10)}</span>
        }
        return <span>{scope.row.effectiveEndTime}</span>
      }
      return <paritiesSelectTime row={scope.row}></paritiesSelectTime>
    }
  },
  {
    i18n: '是否有效',
    prop: 'isEffect',
    required: true,
    customRender: (h, scope) => {
      if (!scope.row.isEdit) {
        if (scope.row.isEffect == 1) {
          return '是'
        }
        return '否'
      }
      return (
        <paritiesSelectActive
          row={scope.row}
          type="isEffect"
        ></paritiesSelectActive>
      )
    }
  }
]
