<template>
  <div class="main">
    <div class="formContent">
      <iSearch @sure="sure" @reset="reset">
        <el-form>
          <el-row gutter="24">
            <el-col :span="8">
              <iFormItem :label="language('原材料大类')">
                <iSelect
                  v-model="searchContent.generalCategoryCode"
                  :placeholder="language('请选择')"
                >
                  <el-option
                    v-for="item in mtzRawCodeOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('大类元素简称')">
                <iInput
                  v-model="searchContent.generalShortName"
                  :placeholder="language('请输入')"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('材料中类')">
                <iInput
                  v-model="searchContent.rawMaterialCode"
                  :placeholder="language('请输入')"
                ></iInput>
              </iFormItem>
            </el-col>
          </el-row>
          <el-row gutter="24">
            <el-col :span="8">
              <iFormItem :label="language('中类描述')">
                <iInput
                  v-model="searchContent.rawMaterialName"
                  :placeholder="language('请输入')"
                >
                </iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('中类计量单位')">
                <iInput
                  v-model="searchContent.rawMaterialCountUnit"
                  :placeholder="language('请输入')"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('原材料牌号')">
                <iInput
                  v-model="searchContent.mtzRawMaterialCode"
                  :placeholder="language('请输入')"
                ></iInput>
              </iFormItem>
            </el-col>
          </el-row>
          <el-row gutter="24">
            <el-col :span="8">
              <iFormItem :label="language('原材料名称')">
                <iInput
                  v-model="searchContent.mtzRawMaterialName"
                  :placeholder="language('请选择')"
                >
                </iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('原材料计量单位')">
                <iInput
                  v-model="searchContent.mtzRawMaterialCountUnit"
                  :placeholder="language('请输入')"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('状态')">
                <iSelect
                  v-model="searchContent.status"
                  :placeholder="language('请选择')"
                >
                  <el-option
                    v-for="item in staOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </iSelect>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('是否贵金属')">
                <iSelect
                  v-model="searchContent.isPreciousMetal"
                  :placeholder="language('请选择')"
                >
                  <el-option label="是" :value="true" />
                  <el-option label="否" :value="false" />
                </iSelect>
              </iFormItem>
            </el-col>
          </el-row>
        </el-form>
      </iSearch>
    </div>
    <div class="rawMaterielList">
      <iCard>
        <div class="btnList">
          <iButton
            @click="add"
            xxx-permission="'BUTTON_MATERIEL_DATA_MTZ_RAW_ADD'"
            >{{ language('新建') }}</iButton
          >
          <iButton
            @click="active"
            :disabled="disAtiveBtn"
            xxx-permission="'BUTTON_MATERIEL_DATA_MTZ_RAW_ACTIVE'"
            >{{ language('生效') }}</iButton
          >
          <iButton
            @click="loseActive"
            :disabled="disLOActiveBtn"
            xxx-permission="'BUTTON_MATERIEL_DATA_MTZ_RAW_DISACTIVE'"
            >{{ language('失效') }}</iButton
          >
          <iButton
            @click="del"
            :disabled="this.selectedItem.length == 0"
            xxx-permission="'BUTTON_MATERIEL_DATA_MTZ_RAW_DELETE'"
            >{{ language('删除') }}</iButton
          >
          <button-download
            :download-method="exportExcel"
            xxx-permission="'BUTTON_MATERIEL_DATA_MTZ_RAW_EXPORT'"
            >{{ language('导出') }}</button-download
          >
        </div>
        <div class="rawMaterielTabel">
          <iTabelCustom
            ref="mtzMaterielTabel"
            :loading="loading"
            :data="mtzMaterielData"
            :columns="mtzMaterielColumns"
            @go-detail="goDetail"
            @handle-selection-change="handleSelectionChange"
          ></iTabelCustom>
          <iPagination
            v-update
            @size-change="handleSizeChange($event, getPageList)"
            @current-change="handleCurrentChange($event, getPageList)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
          ></iPagination>
        </div>
      </iCard>
    </div>
    <editDialog
      v-if="showDialog"
      :show.sync="showDialog"
      :id="id"
      :editSta="editSta"
      @getPageList="getPageList"
    ></editDialog>
  </div>
</template>

<script>
import {
  iButton,
  iCard,
  iSearch,
  iFormItem,
  iPagination,
  iInput,
  iSelect
} from 'rise'
import iTabelCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { mtzMaterielColumns } from './data.js'
import editDialog from './components/editDialog.vue'
import buttonDownload from '@/components/buttonDownload'
import {
  getMtzRawPage,
  exportMtzRawExcel,
  delMtzRawItems,
  changeMtzRawSta,
  getMtzRawCodeOptions
} from '@/api/materiel/mtzRawMaterielInfor'
export default {
  components: {
    iButton,
    iCard,
    iSearch,
    iFormItem,
    iPagination,
    iTabelCustom,
    iInput,
    iSelect,
    editDialog,
    buttonDownload
  },
  mixins: [pageMixins],
  computed: {},
  data() {
    return {
      disAtiveBtn: true,
      disLOActiveBtn: true,
      showDialog: false,
      editSta: false,
      mtzMaterielColumns,
      editMessage: {},
      loading: false,
      // searchLabel: {
      //   mtzRawMateriel: '原材料大类',
      //   elementAbb: '大类元素简称',
      //   middleNumber: '材料中类',
      //   middleName: '中类描述',
      //   middleUnit: '中类计量单位',
      //   smallBrandNumber: '原材料牌号',
      //   smallBrandName: '原材料名称',
      //   smallUnit: '原材料计量单位',
      //   status: '状态'
      // },
      searchContent: {
        generalCategoryCode: '',
        mtzRawMaterialCode: '',
        mtzRawMaterialCountUnit: '',
        mtzRawMaterialName: '',
        rawMaterialCode: '',
        rawMaterialCountUnit: '',
        generalShortName: '',
        rawMaterialName: '',
        status: '',
        isPreciousMetal: ''
      },
      selectedItem: [],
      mtzMaterielData: [],
      staOptions: [
        {
          label: '有效',
          value: 1
        },
        {
          label: '无效',
          value: 0
        }
      ],
      staType: 0,
      mtzRawCodeOptions: []
    }
  },
  methods: {
    reset() {
      this.page.totalCount = 0
      this.page.currPage = 1
      this.searchContent = {
        generalCategoryCode: '',
        mtzRawMaterialCode: '',
        mtzRawMaterialCountUnit: '',
        mtzRawMaterialName: '',
        rawMaterialCode: '',
        rawMaterialCountUnit: '',
        rawMaterialElementShort: '',
        rawMaterialName: '',
        status: '',
        isPreciousMetal: ''
      }
      this.getPageList()
    },
    sure() {
      this.page.totalCount = 0
      this.page.currPage = 1
      this.getPageList()
    },
    add() {
      this.editSta = false
      this.id = ''
      this.showDialog = true
    },
    goDetail(row) {
      this.editSta = true
      console.log(row.id, 'row.id')
      this.id = row.id
      this.showDialog = true
    },
    del() {
      this.$confirm('是否删除已选中数据', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let data = this.selectedItem.map((item) => {
            return item.id
          })
          delMtzRawItems(data).then((val) => {
            if (val.code == 200) {
              this.getPageList()
            } else if (val.code == 1) {
              this.$message.error(val.desZh)
            }
          })
        })
        .catch(() => {
          this.$refs.mtzMaterielTabel.clearSelection()
        })
    },
    loseActive() {
      this.staType = 0
      this.changeSta()
    },
    active() {
      this.staType = 1
      this.changeSta()
    },
    changeSta() {
      let data = this.selectedItem.map((item) => {
        return { [item.id]: this.staType }
      })
      changeMtzRawSta(data).then((val) => {
        if (val.code == 200) {
          this.getPageList()
        } else if (val.code == 1) {
          this.$message.error(val.desZh)
        }
      })
    },
    exportExcel() {
      return exportMtzRawExcel(this.searchContent)
    },
    handleSelectionChange(val) {
      this.selectedItem = val

      if (val.length != 0) {
        let activeItem = this.selectedItem.filter((item) => {
          return item.statusDesc == '有效'
        })
        let loActiveItem = this.selectedItem.filter((item) => {
          return item.statusDesc == '无效'
        })

        if (val.length == activeItem.length) {
          this.disLOActiveBtn = false
        } else {
          this.disLOActiveBtn = true
        }

        if (val.length == loActiveItem.length) {
          this.disAtiveBtn = false
        } else {
          this.disAtiveBtn = true
        }
      } else {
        this.disAtiveBtn = true
        this.disLOActiveBtn = true
      }
    },
    getPageList() {
      this.loading = true
      let data = {
        ...this.searchContent,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getMtzRawPage(data)
        .then((val) => {
          if (val.code == 200) {
            this.mtzMaterielData = val.data
            this.page.totalCount = val.total
          } else if (val.code == 1) {
            this.$message.error(val.desZh)
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  mounted() {
    getMtzRawCodeOptions().then((val) => {
      if (val.code == 200) {
        this.mtzRawCodeOptions = val.data
      }
    })
    this.getPageList()
  }
}
</script>

<style lang="scss" scoped>
.btnList {
  display: flex;
  justify-content: flex-end;
}
.rawMaterielTabel,
.rawMaterielList {
  margin-top: 20px;
}
</style>
