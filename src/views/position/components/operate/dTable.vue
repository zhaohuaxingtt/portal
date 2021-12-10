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
              return h('div', [
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
              ])
            }
          },
          {
            prop: 'content',
            label: '内容',
            align: 'center',
            tooltip: false,
            customRender: (h, scope) => {
              return h('div', [
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
              ])
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
              return h('div', [
                h(
                  'i-select',
                  {
                    //i-select实现下拉框
                    on: {
                      input: (value) => {
                        //随着下拉框的不同，文字框里的内容在边
                        console.log(value)
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
              ])
            }
          },
          {
            prop: 'content',
            label: '内容',
            align: 'center',
            tooltip: false,
            customRender: (h, scope) => {
              return h('div', [
                h(
                  'i-select',
                  {
                    //i-select实现下拉框
                    on: {
                      input: (value) => {
                        //随着下拉框的不同，文字框里的内容在边
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
              ])
            }
          }
        ]
      },
      tabelLoading: false
    }
  },
  computed: {
    dimensions() {
      return this.$store.state.position.pos.dimensionList
    },
    dimensionChecked() {
      return this.$store.state.position.pos.dimensionSelected
    },
    dimensionOptions() {
      return this.$store.state.position.pos.dimensionOptions
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$store.commit('SET_DIMENSIONSELECTED', val)
    },
    handleAdd() {
      let count = this.dimensions.length
      const dimension = {
        dimension: '',
        content: '',
        index: ++count
      }
      this.$store.commit('ADD_DIMENSION', dimension)
    },
    handleDel() {
      this.$store.commit('DEL_DIMENSION')
      this.$forceUpdate()
    }
  }
}
</script>
