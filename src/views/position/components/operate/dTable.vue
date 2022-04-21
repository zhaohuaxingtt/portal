<template>
  <div class="d-table">
    <div class="flex-end-center margin-bottom20">
      <iButton
        @click="handleAdd"
        v-if="type !== 'detail'"
        :disabled="dimensionChecked && dimensionChecked.length"
        >{{ language('增加维度') }}</iButton
      >
      <iButton
        @click="handleDel"
        :disabled="
          !dimensions.length || (dimensionChecked && !dimensionChecked.length)
        "
        v-if="type !== 'detail'"
        class="margin-right20"
        >{{ language('删除维度') }}</iButton
      >
    </div>

    <iTableCustom
      :loading="tableLoading"
      :data="dimensions"
      :columns="tableSetting[type]"
      @handle-selection-change="handleSelectionChange"
    >
    </iTableCustom>
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import iSelectAll from '@/components/iSelectAll'
import { iButton } from 'rise'
export default {
  components: { iTableCustom, iButton },
  props: {
    type: {
      type: String
    }
  },
  data() {
    const _self = this
    return {
      tableSetting: {
        detail: [
          {
            type: 'index',
            label: '#',
            width: 50
          },
          {
            prop: 'description',
            label: '维度',
            i18n: '维度',
            tooltip: false,
            align: 'center',
            width: 150
          },
          {
            prop: 'content',
            label: '内容',
            i18n: '内容',
            align: 'center',
            tooltip: false,
            customRender: (h, scope) => {
              const valList = scope.row.valueList?.map((item) => {
                return item.value
              })
              return valList?.join(',')
            }
          }
        ],
        edit: [
          {
            type: 'selection'
          },
          {
            type: 'index',
            label: '#',
            width: 50
          },
          {
            prop: 'dimension',
            label: '维度',
            i18n: '维度',
            tooltip: false,
            align: 'center',
            width: 150,
            customRender: (h, scope) => {
              let options = _self.dimensionOptions

              return (
                <iSelect
                  value={scope.row.id}
                  onchange={(val) => {
                    scope.row.id = val
                    const dimensionOption = options.filter((e) => {
                      return e.id === val
                    })
                    if (
                      dimensionOption &&
                      dimensionOption.length &&
                      dimensionOption[0].valueList
                    ) {
                      scope.row.code = dimensionOption[0].code
                      scope.row.description = dimensionOption[0].description
                      scope.row.id = dimensionOption[0].id
                      scope.row.name = dimensionOption[0].name
                      scope.row.url = dimensionOption[0].url
                    } else {
                      scope.row.contentOptions = []
                    }
                    scope.row.valueIds = []
                  }}
                >
                  {options.map((item) => {
                    return (
                      <el-option
                        value={item.id}
                        label={item.description}
                        disabled={_self.dimensionIds.includes(item.id)}
                      ></el-option>
                    )
                  })}
                </iSelect>
              )
            }
          },
          {
            prop: 'content',
            label: '内容',
            align: 'center',
            i18n: '内容',
            tooltip: false,
            customRender: (h, scope) => {
              let options = []
              const dimensionOptions = _self.dimensionOptions
              const dimensionOption = dimensionOptions.filter((e) => {
                return e.id === scope.row.id
              })
              if (
                dimensionOption &&
                dimensionOption.length &&
                dimensionOption[0].valueList
              ) {
                options = dimensionOption[0].valueList
                scope.row.valueList = dimensionOption[0].valueList
              }
              return (
                <iSelectAll
                  value={scope.row.valueIds}
                  onchange={(val) => (scope.row.valueIds = val)}
                  options={options}
                  valueKey="valueId"
                  labelKey="value"
                  labelMethod={(item) => `${item.value}【${item.valueId}】`}
                />
              )
            }
          }
        ],
        add: [
          {
            type: 'selection'
          },
          {
            type: 'index',
            label: '#',
            width: 50
          },
          {
            prop: 'dimension',
            label: '维度',
            i18n: '维度',
            tooltip: false,
            align: 'center',
            width: 150,
            customRender: (h, scope) => {
              const options = _self.dimensionOptions
              return (
                <iSelect
                  value={scope.row.id}
                  onchange={(val) => {
                    scope.row.id = val
                    const dimensionOption = options.filter((e) => {
                      return e.id === val
                    })
                    if (
                      dimensionOption &&
                      dimensionOption.length &&
                      dimensionOption[0].valueList
                    ) {
                      scope.row.code = dimensionOption[0].code
                      scope.row.description = dimensionOption[0].description
                      scope.row.id = dimensionOption[0].id
                      scope.row.name = dimensionOption[0].name
                      scope.row.url = dimensionOption[0].url
                      scope.row.contentOptions = dimensionOption[0].valueList
                    } else {
                      scope.row.contentOptions = []
                    }
                    scope.row.valueIds = []
                  }}
                >
                  {options.map((item) => {
                    return (
                      <el-option
                        value={item.id}
                        label={item.description}
                        disabled={_self.dimensionIds.includes(item.id)}
                      ></el-option>
                    )
                  })}
                </iSelect>
              )
            }
          },
          {
            prop: 'content',
            label: '内容',
            i18n: '内容',
            align: 'center',
            tooltip: false,
            customRender: (h, scope) => {
              const options =
                scope.row.contentOptions || scope.row.valueList || []
              return (
                <iSelectAll
                  value={scope.row.valueIds}
                  onchange={(val) => (scope.row.valueIds = val)}
                  options={options}
                  valueKey="valueId"
                  labelKey="value"
                  labelMethod={(item) => `${item.value}【${item.valueId}】`}
                />
              )
            }
          }
        ]
      },
      tabelLoading: false
    }
  },
  computed: {
    dimensions() {
      return this.$store.state.position.pos.positionDetail.permissionList
    },
    dimensionIds() {
      return this.dimensions.map((e) => e.id)
    },
    /* dimensions() {
      return this.$store.state.position.pos.dimensionList
    },
    dimensionChecked() {
      return this.$store.state.position.pos.dimensionSelected
    }, */
    dimensionOptions() {
      const { dimensionOptions, positionDetail } =
        this.$store.state.position.pos
      if (dimensionOptions && dimensionOptions.length > 0) {
        return dimensionOptions
      }
      return positionDetail.permissionList
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$store.commit('SET_DIMENSIONSELECTED', val)
    },
    handleAdd() {
      this.$store.commit('ADD_DIMENSION')
    },
    handleDel() {
      this.$store.commit('DEL_DIMENSION')
      this.$forceUpdate()
    }
  }
}
</script>
