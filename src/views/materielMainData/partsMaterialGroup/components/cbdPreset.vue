<template>
  <iCard
    :title="language('CBD预设')"
    class="margin-top20"
    header-control
    collapse
  >
    <div class="iButton-end margin-bottom20" v-if="!readOnly">
      <iButton
        @click="addCbd"
        xxx-permission="'BUTTON_MATERIEL_DATA_MATERIAL_GROUP_CBD_ADD'"
        >{{ language('新增') }}</iButton
      >
      <iButton
        v-if="!editTable"
        @click="editCbd(true)"
        xxx-permission="'BUTTON_MATERIEL_DATA_MATERIAL_GROUP_CBD_MODIFY'"
        >{{ language('编辑') }}</iButton
      >
      <iButton
        @click="deleteCbd(false)"
        :disabled="selectTableData.length == 0"
        xxx-permission="'BUTTON_MATERIEL_DATA_MATERIAL_GROUP_CBD_DELETE'"
        >{{ language('删除') }}</iButton
      >
      <iButton
        v-if="editTable"
        @click="saveCbd"
        xxx-permission="'BUTTON_MATERIEL_DATA_MATERIAL_GROUP_CBD_ADD|BUTTON_MATERIEL_DATA_MATERIAL_GROUP_CBD_MODIFY'"
        >{{ language('保存') }}</iButton
      >
    </div>
    <iTableCustom
      :loading="loading"
      :data="tableData"
      :columns="tableColumns"
      min-height="395px"
      :extra-data="extraData"
      @handle-selection-change="handleSelectionChange"
    >
    </iTableCustom>
    <iPagination
      class="margin-top20"
      v-update
      background
      @size-change="handleSizeChange($event, getCbdTableList)"
      @current-change="handleCurrentChange($event, getCbdTableList)"
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
    ></iPagination>
  </iCard>
</template>
<script>
import { iCard, iButton, iTableCustom, iPagination, iMessage } from 'rise'
import { CBD_PRESET } from './data'
import { pageMixins } from '@/utils/pageMixins'
import { arrayToMap } from '@/utils'
import { CbdPresetList } from '@/api/materiel/partsMaterialGroup'
import {
  CbdSaveList,
  CbdChangeList,
  CbdDeleteList,
  dataDic,
  getunitSelect
} from '@/api/materiel/partsMaterialGroup'
export default {
  components: { iCard, iButton, iTableCustom, iPagination },
  mixins: [pageMixins],
  props: {
    savecaId: {
      type: Object,
      default: function () {
        return {}
      }
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      categoryCbdSetting: [],
      tableData: [],
      tableColumns: CBD_PRESET,
      extraData: {
        editTable: false,
        cbdPreseMap: {},
        cbdPreseOptions: [],
        unitMap: {},
        unitOptions: [],
        restaurants: []
      },
      editTable: false,
      selectTableData: [],
      isNew: false,
      ids: [],
      ispresetType: true,
      isdescribe: true,
      categoryId: ''
    }
  },
  created() {
    if (this.$route.query.id) {
      this.categoryId = this.$route.query.id
    } else if (this.savecaId) {
      this.categoryId = this.savecaId
    } else {
      this.categoryId = ''
    }
    this.getCbdTableList()
  },
  methods: {
    getCbdTableList() {
      this.loading = true
      if (this.categoryId == undefined) {
        this.categoryId = ''
      }
      let data = {
        categoryId: this.categoryId,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      let keys = 'CATEGORY_CBD_SETTING'
      let parentId = -1
      dataDic(keys, parentId).then((res) => {
        if (res.code == 200) {
          const { CATEGORY_CBD_SETTING } = res.data

          Vue.set(
            this.extraData,
            'cbdPreseMap',
            arrayToMap(CATEGORY_CBD_SETTING, 'code', 'name')
          )
          this.categoryCbdSetting = CATEGORY_CBD_SETTING
          this.extraData.cbdPreseOptions = CATEGORY_CBD_SETTING

          CbdPresetList(data).then((res) => {
            this.loading = false
            this.tableData = res.data
            this.page.totalCount = res.total
          })
        }
      })
      getunitSelect().then((res) => {
        if (res.code == 200) {
          const data = res.data
          Vue.set(this.extraData, 'unitMap', arrayToMap(data, 'code', 'name'))
          this.extraData.unitOptions = data
        }
      })
    },
    addCbd() {
      // this.extraData.editTable = true
      this.editTable = true
      this.tableData.push({})
      this.isNew = true
    },
    editCbd(val) {
      this.extraData.editTable = val
      this.editTable = true
      this.isNew = false
    },
    deleteCbd() {
      this.$confirm('是否删除已选中数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let deletenNoInterface = []
        let deleetnNeedInterface = []
        let ids = []
        this.selectTableData.forEach((val) => {
          if (val.categoryId) {
            deleetnNeedInterface.push(val)
          } else {
            deletenNoInterface.push(val)
          }
        })
        deletenNoInterface.forEach((val) => {
          this.tableData = this.tableData.filter((item) => {
            if (item.uniqueId !== val.uniqueId) {
              return item
            }
          })
        })
        deleetnNeedInterface.forEach((val) => {
          ids.push(val.id)
        })
        if (ids.length !== 0) {
          CbdDeleteList(ids).then((res) => {
            if (res.code == 200) {
              this.getCbdTableList()
              iMessage.success('删除成功')
            }
            if (res.code == 1) {
              iMessage.error(res.desZh)
            }
          })
        }
      })
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    saveCbd() {
      let data = this.tableData
      this.ispresetType = true
      this.isdescribe = true
      data.forEach((val) => {
        val.categoryId = this.categoryId
        if (!val.presetType) {
          this.ispresetType = false
        }
        if (!val.describe) {
          this.isdescribe = false
        }
      })
      if (this.ispresetType === true && this.isdescribe === true) {
        if (this.isNew === true) {
          CbdSaveList(data)
            .then((res) => {
              if (res.code == 200) {
                this.extraData.editTable = false
                this.getCbdTableList()
                iMessage.success('保存成功')
                this.editTable = false
              }
              if (res.code == 1) {
                iMessage.error(res.desZh)
              }
            })
            .catch((err) => {})
            .finally(() => {})
        } else {
          CbdChangeList(data)
            .then((res) => {
              if (res.code == 200) {
                this.extraData.editTable = false
                this.getCbdTableList()
                iMessage.success('保存成功')
                this.editTable = false
              }
              if (res.code == 1) {
                iMessage.error(res.desZh)
              }
            })
            .catch((err) => {
              iMessage.error(err)
            })
            .finally(() => {})
        }
      } else {
        iMessage.error('预设项类别或描述不能为空')
      }
    }
  }
}
</script>
<style>
.iButton-end {
  display: flex;
  justify-content: flex-end;
}
</style>
