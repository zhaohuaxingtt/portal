<template>
  <iCard>
    <div
      slot="header"
      class="clearfix flex-between-center-center card-header"
      style="width: 100%"
    >
      <div class="flex-align-center">
        <div class="margin-right5 position-name">
          岗位：{{ itemSelected.code }} {{ itemSelected.fullNameZh }}
        </div>
        <div>
          <i
            class="checked-icon"
            v-if="itemSelected.userDTOList && itemSelected.userDTOList.length"
          ></i>
        </div>
      </div>
      <div class="flex-end-center">
        <iButton @click="handleEdit(itemSelected)" v-if="!itemSelected.isEdit"
          >编辑</iButton
        >
        <div v-else>
          <iButton @click="handleSave(itemSelected)">保存</iButton>
          <iButton @click="handleCancel(itemSelected)">取消</iButton>
        </div>
      </div>
    </div>
    <div class="card-content">
      <iFormGroup row="2" ref="positionForm" :model="itemSelected">
        <iFormItem>
          <iLabel label="主负责人" slot="label"></iLabel>
          <i-select
            multiple
            v-model="itemSelected.userDTOListIds"
            :disabled="
              !itemSelected.isEdit ||
              (itemSelected.userDTOListIds &&
                !itemSelected.userDTOListIds.length)
            "
          >
            <el-option
              :value="option.id"
              :label="option.nameZh"
              v-for="option in userOptions"
              :disabled="option.disabled"
              :key="option.id"
            ></el-option>
          </i-select>
        </iFormItem>
        <iFormItem>
          <iLabel label="基础角色" slot="label"></iLabel>
          <i-select
            multiple
            :placeholder="`请选择基础角色`"
            v-model="itemSelected.roleDTOListIds"
            disabled
          >
            <el-option
              :value="option.id"
              :label="option.fullNameZh"
              v-for="option in roleOptions"
              :key="option.id"
            ></el-option>
          </i-select>
        </iFormItem>
        <iFormItem>
          <iLabel label="其他负责人" slot="label"></iLabel>
          <i-select v-model="itemSelected.chiefUserId" disabled>
            <el-option
              :value="option.id"
              :label="option.nameZh"
              v-for="option in itemSelected.leaderOptions"
              :key="option.id"
            ></el-option>
          </i-select>
        </iFormItem>
      </iFormGroup>

      <iTableCustom
        class="material-table"
        :loading="tableLoading"
        :data="
          typeof itemSelected.materialList === 'string'
            ? JSON.parse(itemSelected.materialList)
            : itemSelected.materialList
        "
        :columns="item.isEdit ? tableSettingEdit : tableSettingDetail"
      ></iTableCustom>
    </div>
  </iCard>
</template>

<script>
import carType2Brand from './carType2Brand'
import {
  iCard,
  iFormGroup,
  iFormItem,
  iSelect,
  iLabel,
  iButton,
  iMessage
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iSelect,
    iLabel,
    iButton,
    iTableCustom
  },
  props: {
    item: {
      type: Object
    },
    deptId: {
      type: Number
    }
  },
  data() {
    const _self = this
    return {
      originItem: null,
      tableLoading: false,
      tableSettingDetail: [
        {
          label: '材料组',
          customRender: (h, scope) => {
            return scope.row.materialItem.value
          }
        },
        {
          prop: 'carType',
          label: '车型',
          tooltip: false,
          align: 'center',
          customRender: (h, scope) => {
            const valList = scope.row.carTypeList?.map((item) => {
              return item.value
            })
            return valList?.join(',')
          }
        },
        {
          prop: 'brand',
          label: '品牌',
          align: 'center',
          tooltip: false,
          customRender: (h, scope) => {
            // const valList = scope.row.carTypeList?.map(item => {
            //   return item.brand
            // })
            // return valList?.join(',')
            const brandArr = []
            scope.row.carType?.forEach((c) => {
              brandArr.push(carType2Brand[c.valueId] || 'VW')
            })
            return _.uniq(brandArr).join(',')
          }
        }
      ],
      tableSettingEdit: [
        {
          label: '材料组',
          align: 'center',
          tooltip: false,
          customRender: (h, scope) => {
            return h('div', [
              h(
                'i-select',
                {
                  on: {
                    change: (value) => {
                      scope.row.material = value
                      // scope.row.carTypeOptions =
                      //   _self.dOptions.find(d => {
                      //     return d.valueId === value
                      //   })?.carType || []
                      // const arr = _self.itemSelected.materialList.map(ml => {
                      //   return ml.material
                      // })
                      // _self.dOptions.filter(d => {
                      //   if (arr.includes(d.valueId)) {
                      //     d.disabled = true
                      //   } else {
                      //     d.disabled = false
                      //   }
                      // })

                      scope.row.carTypeOptions = _self.carTypeOptions
                      const arr = _self.itemSelected.materialList.map((ml) => {
                        return ml.material
                      })
                      _self.categoryOptions.filter((d) => {
                        if (arr.includes(d.valueId)) {
                          d.disabled = true
                        } else {
                          d.disabled = false
                        }
                      })
                      scope.row.carType = []
                    }
                  },
                  props: {
                    value: scope.row.material,
                    placeholder: '请选择材料组'
                  }
                },
                [
                  // _self.dOptions.map(item => {
                  _self.categoryOptions.map((item) => {
                    return h('el-option', {
                      props: {
                        value: item.valueId,
                        label: item.value,
                        disabled: item.disabled
                      }
                    })
                  })
                ]
              )
            ])
          }
        },
        {
          prop: 'carType',
          label: '车型',
          tooltip: false,
          align: 'center',
          customRender: (h, scope) => {
            return h('div', [
              h(
                'i-select',
                {
                  on: {
                    input: (value) => {
                      scope.row.carType = value
                    }
                  },
                  props: {
                    value: scope.row.carType,
                    placeholder: '请选择车型',
                    multiple: true
                  }
                },
                [
                  // scope.row.carTypeOptions?.map(item => {
                  _self.carTypeOptions?.map((item) => {
                    return h('el-option', {
                      props: {
                        value: item.valueId,
                        label: item.value
                      }
                    })
                  })
                ]
              )
            ])
          }
        },
        {
          prop: 'brand',
          label: '品牌',
          align: 'center',
          tooltip: false,
          customRender: (h, scope) => {
            const brandArr = []
            scope.row.carType?.forEach((c) => {
              brandArr.push(carType2Brand[c.valueId] || 'VW')
            })
            return _.uniq(brandArr).join(',')
            // const brandArr = []
            // scope.row.carType?.forEach(c => {
            //   const obj = scope.row.carTypeOptions?.find(o => {
            //     return o.valueId === c
            //   })
            //   brandArr.push(obj)
            // })
            // return _.uniq(
            //   brandArr?.map(i => {
            //     return i?.brand
            //   })
            // ).join(',')
          }
        },
        {
          align: 'center',
          width: 50,
          headerRender: (h, { column }) => {
            return h('div', [
              h('i', {
                class: 'el-icon-circle-plus-outline',
                style: 'color:#1660F1;',
                on: {
                  click: (value) => {
                    const mItem = {
                      material: '',
                      carType: []
                    }
                    _self.itemSelected.materialList.push(mItem)
                  }
                }
              })
            ])
          },
          tooltip: false,
          customRender: (h, scope) => {
            return h('div', [
              h('i', {
                class: 'el-icon-delete',
                style: 'color:#5F6879;',
                on: {
                  click: (value) => {
                    _self.itemSelected.materialList.splice(scope.$index, 1)
                    const arr = _self.itemSelected.materialList.map((ml) => {
                      return ml.material
                    })
                    // _self.dOptions.filter(d => {
                    _self.categoryOptions.filter((d) => {
                      if (arr.includes(d.valueId)) {
                        d.disabled = true
                      } else {
                        d.disabled = false
                      }
                    })
                  }
                }
              })
            ])
          }
        }
      ]
    }
  },
  mounted() {
    this.originItem = JSON.parse(JSON.stringify(this.item))
  },
  computed: {
    carTypeOptions() {
      return this.$store.state.subPosition.carTypeOptions || []
    },
    categoryOptions() {
      return this.$store.state.subPosition.categoryOptions || []
    },
    dOptions() {
      return this.$store.state.subPosition.dOptions || []
    },
    positionList() {
      return this.$store.state.subPosition.subPositionList
    },
    userOptions() {
      return this.$store.state.subPosition.userOptions
    },
    roleOptions() {
      return this.$store.state.subPosition.roleOptions
    },
    itemSelected: {
      get() {
        return this.item || {}
      },
      set(val) {
        this.item = val
      }
    }
  },
  methods: {
    handleEdit(item) {
      const hasEditItem =
        this.positionList.find((li) => {
          return li.isEdit
        }) || false
      if (!hasEditItem) {
        this.$set(item, 'isEdit', !item.isEdit)
        this.$store.dispatch('GetAllUser', { positionId: item.id })
        this.$store.commit('SET_NEW_CATEGORYOPTIONS', item)
      } else {
        iMessage.warn('请保存当前岗位后再编辑')
      }
    },

    checkItemEmpty(item) {
      const emptyItem = item.materialList.find((ml) => {
        if (!ml.material || !ml.carType.length) {
          return ml
        }
      })
      return emptyItem
    },

    async handleSave(item) {
      this.$refs['positionForm'].validate(async (valid) => {
        if (valid) {
          if (!item.materialList.length) {
            iMessage.warn('请为该岗位增加材料组车型组合')
            return
          }
          if (this.checkItemEmpty(item)) {
            iMessage.warn('材料组及车型不能为空')
            return
          }
          const res = await this.$store.dispatch('UpdateSubPosition', item)
          if (res.code === '200' && res.data) {
            // this.$set(item, 'isEdit', !item.isEdit)
            iMessage.success('更新下属岗位成功')
            this.$store.dispatch('GetSubPosition', { deptId: this.deptId })
          }
        }
      })
    },

    handleUserChange(val) {
      this.itemSelected.chiefUserId = ''
      const leaderOptions = this.userOptions.filter((user) => {
        if (val.includes(user.id)) {
          return user
        }
      })
      this.itemSelected.leaderOptions = leaderOptions
    },

    handleCancel(item) {
      // this.$set(item, 'isEdit', !item.isEdit)
      // this.itemSelected = this.originItem
      // this.$forceUpdate()
      this.$store.dispatch('GetSubPosition', { deptId: this.deptId })
    }
  }
}
</script>

<style lang="scss" scoped>
.position-name {
  font-size: 16px;
  font-weight: bold;
}
.checked-icon {
  display: block;
  width: 20px;
  height: 22px;
  background: #1660f1;
  opacity: 1;
  position: relative;
  z-index: 0;
  &::after {
    position: absolute;
    display: block;
    content: '';
    border: solid 10px #1660f1;
    border-bottom: solid 5px #fff;
    bottom: -2px;
    left: 0;
    z-index: 1;
  }
  &::before {
    position: absolute;
    display: block;
    content: '';
    z-index: 2;
    width: 10px;
    height: 5px;
    border-left: solid 2px #fff;
    border-bottom: solid 2px #fff;
    transform: rotate(-45deg);
    left: 5px;
    top: 4px;
  }
}
</style>
