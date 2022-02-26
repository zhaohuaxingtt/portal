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
    </div>
    <div class="card-content" v-loading="loading">
      <iFormGroup row="2" ref="positionForm" :model="itemSelected">
        <iFormItem>
          <iLabel label="主负责人" slot="label"></iLabel>
          <iInput :value="mainUser" disabled />
          <!-- <i-select multiple v-model="itemSelected.userDTOListIds" disabled>
            <el-option
              :value="option.id"
              :label="option.nameZh"
              v-for="option in userOptions"
              :disabled="option.disabled"
              :key="option.id"
            ></el-option>
          </i-select> -->
        </iFormItem>
        <iFormItem>
          <iLabel label="基础角色" slot="label"></iLabel>
          <i-select multiple v-model="itemSelected.roleDTOListIds" disabled>
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
          <iInput :value="otherUser" disabled />
          <!-- <i-select v-model="itemSelected.chiefUserId" disabled>
            <el-option
              :value="option.id"
              :label="option.nameZh"
              v-for="option in itemSelected.leaderOptions"
              :key="option.id"
            ></el-option>
          </i-select> -->
        </iFormItem>
      </iFormGroup>

      <div class="flex-end-center margin-bottom20">
        <iButton v-show="!extraData.dimenssionEditable" @click="handleEdit"
          >编辑</iButton
        >
        <iButton v-show="extraData.dimenssionEditable" @click="handleAdd">
          增加维度
        </iButton>
        <iButton
          v-show="extraData.dimenssionEditable"
          @click="handleDel"
          :disabled="selectedRows.length === 0"
        >
          删除维度
        </iButton>
        <iButton v-show="extraData.dimenssionEditable" @click="handleSave">
          保存
        </iButton>
        <iButton v-show="extraData.dimenssionEditable" @click="handleCancel">
          取消
        </iButton>
      </div>
      <iTableCustom
        :loading="tableLoading"
        :data="newPermissionList"
        :key="item.id + (extraData.dimenssionEditable && 'edit')"
        :columns="
          !extraData.dimenssionEditable ? tableSettingView : tableSetting
        "
        :extra-data="extraData"
        @handle-selection-change="handleSelectionChange"
      />
    </div>
  </iCard>
</template>

<script>
import {
  iCard,
  iFormGroup,
  iFormItem,
  iSelect,
  iLabel,
  iButton,
  iMessage,
  iInput
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { UpdateSubPosition } from '@/api/position'
import iSelectAll from '@/components/iSelectAll'
export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iSelect,
    iLabel,
    iButton,
    iTableCustom,
    iInput
  },
  props: {
    item: {
      type: Object
    },
    deptId: {
      type: Number
    },
    dimensionOptions: {
      type: Array,
      default: function () {
        return []
      }
    },
    permissionList: {
      type: Array,
      default: function () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const _self = this
    return {
      newPermissionList: [],
      tableLoading: false,
      extraData: {
        dimenssionEditable: false,
        dimensionOptions: this.dimensionOptions
      },
      tableSettingView: [
        {
          type: 'index',
          label: '序号',
          width: 80
        },
        {
          prop: 'description',
          label: '维度',
          tooltip: false,
          align: 'center',
          width:'400px',
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
      tableSetting: [
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
          width:'400px',
          align: 'center',
          customRender: (h, scope) => {
            const options = _self.getDimensionOptions()
            console.log('维度', options)
            return (
              <iSelect
                value={scope.row.id}
                onchange={(val) => {
                  scope.row.id = val
                  const dimensionOption = options.find((e) => {
                    return e.id === val
                  })
                  if (dimensionOption && dimensionOption.valueList) {
                    scope.row.code = dimensionOption.code
                    scope.row.description = dimensionOption.description
                    scope.row.id = dimensionOption.id
                    scope.row.name = dimensionOption.name
                    scope.row.url = dimensionOption.url
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
            let options = []
            const dimensionOptions = _self.getDimensionOptions()
            console.log('内容dimensionOptions', scope.row.id, dimensionOptions)
            const dimensionOption = dimensionOptions.find((e) => {
              return e.id === scope.row.id
            })

            if (dimensionOption && dimensionOption.valueList) {
              const valueList = scope.row.valueList || []
              const dimensionOptionValueList = dimensionOption.valueList || []
              console.log('valueList', valueList)
              console.log('dimensionOptionValueList', dimensionOptionValueList)
              options = valueList
              dimensionOptionValueList.forEach((e) => {
                if (!options.find((option) => option.valueId === e.valueId)) {
                  options.push(e)
                }
              })
              // options = [...valueList, ...dimensionOptionValueList]
              // scope.row.valueList = dimensionOption.valueList
            }
            return (
              <iSelectAll
                value={scope.row.valueIds}
                onchange={(val) => (scope.row.valueIds = val)}
                options={options}
                valueKey="valueId"
                labelKey="value"
              />
            )
          }
        }
      ],
      selectedRows: []
    }
  },
  mounted() {
    this.newPermissionList = _.cloneDeep(this.permissionList)
  },
  computed: {
    dimensionIds() {
      return this.newPermissionList.map((e) => e.id)
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
    },
    mainUser() {
      if (this.item.userDTOList) {
        const users = this.item.userDTOList.filter(
          (e) => e.positionUserType === 1
        )
        return users.map((e) => e.nameZh).join(',')
      }
      return ''
    },
    otherUser() {
      if (this.item.userDTOList) {
        const users = this.item.userDTOList.filter(
          (e) => e.positionUserType !== 1
        )
        return users.map((e) => e.nameZh).join(',')
      }
      return ''
    }
  },
  methods: {
    async handleSave() {
      const emptyPermissions = this.newPermissionList.filter(
        (e) => e.valueIds.length === 0
      )
      if (emptyPermissions.length > 0) {
        iMessage.warn('增加的维度及内容不能为空')
      }
      const data = _.cloneDeep(this.item)
      const permissionList = this.newPermissionList.map((e) => {
        const options = e.contentOptions || e.valueList || []
        const valueList = options.filter((option) =>
          e.valueIds.includes(option.valueId)
        )
        return {
          ...e,
          valueList: valueList
        }
      })

      data.permissionList = permissionList
      data.materialList = ''
      this.loading = true
      UpdateSubPosition(data)
        .then((res) => {
          if (res.result) {
            this.item.permissionList = permissionList
            this.newPermissionList = permissionList
            this.extraData.dimenssionEditable = false
            iMessage.success(res.desZh || '保存成功')
          } else {
            iMessage.error(res.desZh || '保存失败')
          }
        })
        .finally(() => (this.loading = false))
    },
    handleEdit() {
      this.newPermissionList = _.cloneDeep(this.permissionList)
      this.extraData.dimenssionEditable = true
    },
    handleCancel() {
      this.newPermissionList = _.cloneDeep(this.permissionList)
      this.extraData.dimenssionEditable = false
    },
    handleAdd() {
      this.newPermissionList.push({
        code: '',
        description: '',
        id: '',
        name: '',
        url: '',
        valueList: [],
        valueIds: []
      })
    },
    handleDel() {
      this.newPermissionList = this.newPermissionList.filter(
        (e) => !this.selectedRows.includes(e)
      )
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    getDimensionOptions() {
      const options = _.cloneDeep(this.dimensionOptions)

      const optionIds = options.map((e) => e.id)
      this.permissionList.forEach((element) => {
        if (!optionIds.includes(element.id)) {
          options.push({
            id: element.id,
            description: element.description,
            valueList: _.cloneDeep(element.valueList)
          })
        }
      })
      return options
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
