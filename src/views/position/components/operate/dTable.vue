<template>
  <div class="d-table">
    <div class="flex-end-center margin-bottom20">
      <iButton
        @click="handleAdd"
        v-if="type !== 'detail'"
        :disabled="dimensionChecked && dimensionChecked.length"
        >增加维度</iButton
      >
      <iButton
        @click="handleDel"
        :disabled="
          !dimensions.length || (dimensionChecked && !dimensionChecked.length)
        "
        v-if="type !== 'detail'"
        class="margin-right20"
        >删除维度</iButton
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
            label: '序号',
            width: 80
          },
          {
            prop: 'description',
            label: '维度',
            tooltip: false,
            align: 'center'
          },
          {
            prop: 'content',
            label: '内容',
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
            label: '序号',
            width: 80
          },
          {
            prop: 'dimension',
            label: '维度',
            tooltip: false,
            align: 'center',
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
              /* return h('div', [
                h(
                  'i-select',
                  {
                    //i-select实现下拉框
                    on: {
                      input: (value) => {
                        //随着下拉框的不同，文字框里的内容在边
                        scope.row.dimension = value
                        this.dimensionOption = _.filter(
                          _self.dimensionOptions,
                          (item) => {
                            return item.id === scope.row.dimension
                          }
                        )[0]
                        scope.row.contentOptions = this.dimensionOption
                          ? this.dimensionOption.valueList
                          : []
                        scope.row.content = []
                      }
                    },
                    props: {
                      value: scope.row.dimension, //文字框的内容取决于这个value，如果value不存在，会报错
                      placeholder: '请选择',
                      filterable: true
                    }
                  },
                  [
                    //下拉框里面填充选项，通过filters遍历map，为每一个选项赋值。
                    _self.dimensionOptions.map((item) => {
                      return h('el-option', {
                        props: {
                          value: item.id,
                          label: item.description,
                          disabled: !!_.find(_self.dimensions, (d) => {
                            return d.dimension === item.id
                          })
                        }
                      })
                    })
                  ]
                )
              ]) */
            }
          },
          {
            prop: 'content',
            label: '内容',
            align: 'center',
            tooltip: false,
            customRender: (h, scope) => {
              const options =
                scope.row.contentOptions || scope.row.valueList || []
              return (
                <iSelect
                  placeholder="请选择"
                  multiple={true}
                  filterable={true}
                  value={scope.row.valueIds}
                  onchange={(val) => (scope.row.valueIds = val)}
                >
                  {options.map((item) => {
                    return (
                      <el-option
                        value={item.valueId}
                        label={item.value}
                        key={item.valueId}
                      />
                    )
                  })}
                </iSelect>
              )
              /* return h('div', [
                h(
                  'i-select',
                  {
                    //i-select实现下拉框
                    on: {
                      input: (value) => {
                        //随着下拉框的不同，文字框里的内容在边
                        console.log('..,,', value)
                        scope.row.content = value
                      }
                    },
                    props: {
                      value: scope.row.content, //文字框的内容取决于这个value，如果value不存在，会报错
                      placeholder: '请选择',
                      multiple: true,
                      filterable: true
                    }
                  },
                  [
                    //下拉框里面填充选项，通过filters遍历map，为每一个选项赋值。
                    scope.row.contentOptions
                      ? scope.row.contentOptions.map((item) => {
                          return h('el-option', {
                            props: {
                              value: item.valueId,
                              label: item.value
                            }
                          })
                        })
                      : ''
                  ]
                )
              ]) */
            }
          }
        ],
        add: [
          {
            type: 'selection'
          },
          {
            type: 'index',
            label: '序号',
            width: 80
          },
          {
            prop: 'dimension',
            label: '维度',
            tooltip: false,
            align: 'center',
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
            align: 'center',
            tooltip: false,
            customRender: (h, scope) => {
              const options =
                scope.row.contentOptions || scope.row.valueList || []
              return (
                <iSelect
                  placeholder="请选择"
                  multiple={true}
                  filterable={true}
                  value={scope.row.valueIds}
                  onchange={(val) => (scope.row.valueIds = val)}
                >
                  {options.map((item) => {
                    return (
                      <el-option
                        value={item.valueId}
                        label={item.value}
                        key={item.valueId}
                      />
                    )
                  })}
                </iSelect>
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
      return this.$store.state.position.pos.dimensionOptions
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
