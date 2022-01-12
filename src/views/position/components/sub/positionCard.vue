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
  iMessage
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { UpdateSubPosition } from '@/api/position'
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
