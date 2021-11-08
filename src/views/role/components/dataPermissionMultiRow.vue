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
          <iFormItem :label="$t('ROLE.PERMISSION')">
            <iSelect v-model="form.permission" :disabled="!editable">
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
          <iFormItem style="opacity: 0;"><iInput /> </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="$t('ROLE.DESIGNATED_DEPARTMENT')">
            <iInput
              v-if="editable"
              v-model="form.department.nameZh"
              :placeholder="$t('APPROVAL.PLEASE_INPUT')"
              :disabled="form.permission !== 'CUSTOM'"
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
              :placeholder="$t('APPROVAL.PLEASE_INPUT')"
              v-model="form.department.nameZh"
              disabled
            />
          </iFormItem>
        </el-col>
        <el-col :span="12">
          <iFormItem :label="$t('ROLE.USE_FOLLOW_PROP_FILTER')">
            <iSelect
              v-if="editable"
              v-model="form.properties"
              multiple
              size="medium"
            >
              <el-option
                v-for="item in properties"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </iSelect>
            <div v-if="!editable">
              <iInput :value="filtersStr" :disabled="!editable" />
            </div>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
    <chooseOrg
      v-if="orgVisible"
      single-choice
      @close="handleCloseOrgDialog"
      @select="selectOrg"
    />
  </div>
</template>

<script>
import { ROW_PERMISSIONS, ROW_PROPERTITIE_PRODUCE } from './data'
import { iInput, iFormItem, iSelect, Icon } from 'rise'
import chooseOrg from './chooseOrg'
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
      default: function() {
        return {
          department: {
            nameZh: ''
          }
        }
      }
    },
    isMultipleChecked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    filtersStr() {
      if (this.form.properties) {
        return this.form.properties.toString()
      }
      return ''
    }
  },
  data() {
    return {
      rowPermissions: ROW_PERMISSIONS,
      properties: ROW_PROPERTITIE_PRODUCE,
      orgVisible: false
    }
  },
  methods: {
    handleOpenOrgDialog() {
      this.orgVisible = true
    },
    handleCloseOrgDialog() {
      this.orgVisible = false
    },
    selectOrg(val) {
      this.form.department = val[0]
      this.orgVisible = false
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
