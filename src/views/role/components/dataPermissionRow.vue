<template>
  <div class="data-permission-row">
    <el-form
      ref="searchForm"
      class="search-form"
      label-position="left"
      label-width="150px"
      label-suffix=":"
      size="mini"
    >
      <el-row :gutter="50">
        <el-col :span="12">
          <iFormItem :label="language('权限')">
            <iSelect v-model="form.scope" :disabled="!editable">
              <el-option
                v-for="item in rowPermissions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem style="opacity: 0"><iInput /> </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="language('指定部门')">
            <iInput
              v-if="editable"
              v-model="form.scopeDeptName"
              :placeholder="language('请输入')"
              :disabled="form.scope !== 4"
              readonly
            >
              <template slot="suffix">
                <span @click="handleOpenOrgDialog">
                  <icon symbol name="icontianjia" />
                </span>
              </template>
            </iInput>
            <iInput
              v-else
              :placeholder="language('请输入')"
              v-model="form.scopeDeptName"
              disabled
            />
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="language('按以下属性筛选')">
            <iSelect
              v-model="permissionIdList"
              multiple
              @change="permissionChange"
              :disabled="!editable"
            >
              <el-option
                v-for="item in permissionOptions"
                :key="item.id"
                :label="item.description"
                :value="item.id"
              />
            </iSelect>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
    <chooseOrg
      v-if="orgVisible"
      single-choice
      :default-selected-id="form.scopeDeptId"
      @close="handleCloseOrgDialog"
      @select="selectOrg"
    />
  </div>
</template>

<script>
import { ROW_PERMISSIONS, ROW_PROPERTITIE_PRODUCE } from './data'
import { iInput, iFormItem, iSelect, Icon } from 'rise'
import chooseOrg from './chooseOrg'
import { fetchPermissionList } from '@/api/usercenter'
export default {
  name: 'dataPermissionRow',
  components: { iInput, iFormItem, iSelect, Icon, chooseOrg },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  watch: {
    form() {
      this.setPermissionIdList()
    }
  },
  data() {
    return {
      rowPermissions: ROW_PERMISSIONS,
      properties: ROW_PROPERTITIE_PRODUCE,
      orgVisible: false,
      permissionIdList: [],
      permissionOptions: []
    }
  },
  created() {
    this.setPermissionIdList()
    this.queryPermissionList()
  },
  methods: {
    async queryPermissionList() {
      const { data } = await fetchPermissionList({})
      this.permissionOptions = data
    },
    setPermissionIdList() {
      this.permissionIdList = []
      if (this.form.permissionList) {
        this.form.permissionList.forEach((e) => {
          this.permissionIdList.push(e.id)
        })
      }
    },
    handleOpenOrgDialog() {
      if (this.form.scope === 4) {
        this.orgVisible = true
      }
    },
    handleCloseOrgDialog() {
      this.orgVisible = false
    },
    selectOrg(val) {
      if (val && val.length > 0) {
        const { id, nameZh } = val[0]
        this.form.scopeDeptId = id
        this.form.scopeDeptName = nameZh
        this.orgVisible = false
      }
    },
    permissionChange(val) {
      this.form.permissionList = this.permissionOptions.filter((e) =>
        val.includes(e.id)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  ::v-deep .el-input.is-disabled .el-input__inner {
    border: none;
    background: $color-background;
    box-shadow: none;
    color: #4b4b4c;
  }
  ::v-deep .el-input__suffix {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1em;
  }
}
.tag {
  height: 30px;
  background: $color-background;
  border-radius: 15px;
  padding: 0px 15px;
  line-height: 30px;
  margin-right: 10px;
  color: #4b4b4c;
  display: inline-block;
  font-size: 14px;
}
</style>
