<template>
  <div class="main">
    <div class="iSearch" style="margin-top: 20px">
      <div class="form">
        <el-form>
          <!-- deptNum: null,
        nameZh: null,
        leaderName: null, -->
          <el-row :gutter="28">
            <el-col :span="6">
              <el-form-item
                :label="
                  $t('ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.ORG_CODE')
                "
                class="SearchOption"
              >
                <i-input
                  :placeholder="
                    $t('ORGANIZATION_MANAGERMENT.INPUT_PLACEHOLDER')
                  "
                  class=""
                  v-model="formData.deptNum"
                ></i-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                :label="
                  $t(
                    'ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.ORG_FULLNAME'
                  )
                "
                class="SearchOption"
              >
                <i-input
                  :placeholder="
                    $t('ORGANIZATION_MANAGERMENT.INPUT_PLACEHOLDER')
                  "
                  class=""
                  v-model="formData.nameZh"
                ></i-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                :label="
                  $t('ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.ORG_OWNER')
                "
                class="SearchOption"
              >
                <i-input
                  :placeholder="
                    $t('ORGANIZATION_MANAGERMENT.INPUT_PLACEHOLDER')
                  "
                  class=""
                  v-model="formData.leaderName"
                ></i-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              
            </el-col> -->
            <div class="buttons">
              <iButton @click="searchBtnClick">{{
                $t(
                  'ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.ORG_SEARCH_BTN'
                )
              }}</iButton>
              <iButton @click="resetBtnClick">{{
                $t(
                  'ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.ORG_RESET_BTN'
                )
              }}</iButton>
            </div>
          </el-row>
        </el-form>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="selectOrg">
      <div
        class="selectOrgInput"
        style="
          display: flex;
          align-items: center;
          padding-left: 5px;
          padding-right: 5px;
        "
      >
        <el-tag
          size="medium"
          closable
          v-for="item in unTrueSelectedDataList"
          :key="item.nameZh"
          @close="deleteOrgTag(item)"
          style="margin-right: 5px"
        >
          {{ item.nameZh }}
        </el-tag>
      </div>
      <iButton
        style="display: inline-block; margin-left: 30px"
        @click="trueBtnClick"
      >
        {{ $t('ORGANIZATION_MANAGERMENT.ORG_CHOOSE_DOWNLEVEL.ORG_TRUE_BTN') }}
      </iButton>
    </div>
    <div class="table">
      <iTableCustom
        :loading="tableLoading"
        :data="tableListData"
        :columns="tableSetting"
        row-key="id"
        @handle-selection-change="handleSelectionChange"
        @select="handleSelect"
        @select-all="handleAllSelect"
        ref="orgTable"
      />
      <iPagination
        v-update
        background
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      >
      </iPagination>
    </div>
  </div>
</template>

<script>
import { iButton, iInput, iPagination } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { tableSetting } from './alrtDownLevelOrgData'
import { organizationMenu } from '@/api/organization/index.js'
export default {
  mixins: [pageMixins],
  components: {
    iInput,
    iButton,
    iTableCustom,
    iPagination
  },
  props: {
    selectedDataList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      formData: {
        deptNum: null,
        nameZh: null,
        leaderName: null
      },
      tableLoading: false,
      tableListData: [
        // {
        //   fullCode: 11111,
        //   nameZh: "中文",
        //   shortCode: "CST",
        //   shortName: "中文简称",
        //   leadUserName: "负责人llll",
        // },
      ],
      tableSetting: tableSetting,
      unTrueSelectedDataList: [],
      cloneSelectedDataList: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log('handleSelectionChange', val)
      //选中处理
      this.unTrueSelectedDataList = val
      // console.log("====", val);
    },
    handleSelect(selection) {
      this.cloneSelectedDataList = _.cloneDeep(selection)
    },
    handleAllSelect(selection) {
      this.cloneSelectedDataList = _.cloneDeep(selection)
    },
    getDownLevelOrg() {
      let param = {
        ...this.formData,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      this.tableLoading = true
      organizationMenu(null, param)
        .then(value => {
          this.tableLoading = false
          if (value.code == 200) {
            this.tableListData = value.data
            this.page.totalCount = value.total
            this.setDefaultSelection()
          }
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    getTableList() {
      this.getDownLevelOrg()
    },
    trueBtnClick() {
      this.$emit('getSelectedDownLevelOrg', this.unTrueSelectedDataList)
    },
    searchBtnClick() {
      //搜索
      let param = this.formData
      this.page.currPage = 1
      param = {
        ...this.formData,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      this.getDownLevelOrg(param)
    },
    resetBtnClick() {
      //重置搜索条件
      this.defalutValue()
      let param = this.formData
      this.page.currPage = 1
      param = {
        ...this.formData,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      this.getDownLevelOrg(param)
    },
    deleteOrgTag(value) {
      this.$refs.orgTable.toggleRowSelection(value, false)
      let index = this.unTrueSelectedDataList.indexOf(value)
      // console.log("===", index);
      if (index > -1) {
        this.unTrueSelectedDataList.splice(index, 1)
      }
    },
    defalutValue() {
      Vue.set(this.formData, 'deptNum', null)
      Vue.set(this.formData, 'nameZh', null)
      Vue.set(this.formData, 'leaderName', null)
    },
    setDefaultSelection() {
      if (this.cloneSelectedDataList && this.cloneSelectedDataList.length > 0) {
        //const ids = this.selectedDataList.map(e => e.id)
        //if (this.tableListData.filter(e => ids.includes(e.id)).length > 0) {
        for (let i = 0; i < this.cloneSelectedDataList.length; i++) {
          const item = this.cloneSelectedDataList[i]
          this.$refs.orgTable.toggleRowSelection(item, true)
        }
        //}
      }
    }
  },
  created() {
    // console.log("{{selectedDataList}} === ",this.selectedDataList);
    this.getDownLevelOrg({})
    this.unTrueSelectedDataList = _.cloneDeep(this.selectedDataList)
    this.cloneSelectedDataList = _.cloneDeep(this.selectedDataList)
  }
  /* watch: {
    selectedDataList() {
      this.$refs.orgTable.clearSelection()
      // console.log("====",VAL);
      this.selectedDataList.forEach(item => {
        this.$refs.orgTable.toggleRowSelection(item, true)
      })
    }
  } */
}
</script>

<style lang="scss" scoped>
.main {
  min-height: 60vh;
  padding-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  // width: 100%;
  // background-color: red;
}

.selectOrg {
  display: flex;
}

.selectOrgInput {
  height: 35px;
  width: 90%;
  box-shadow: 0px 0px 3px rgba(0, 38, 98, 0.15);
  opacity: 1;
  border-radius: 4px;
}

.table {
  margin-top: 20px;
}
</style>
