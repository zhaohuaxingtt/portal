<template>
  <div class="main">
    <div class="searchContent">
      <iSearch @sure="sure" @reset="reset">
        <el-form>
          <el-row gutter="24">
            <el-col :span="8">
              <iFormItem :label="language('原材料编号大类')">
                <iInput
                  v-model="searchContent.generalCategoryCode"
                  :placeholder="language('请输入')"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('原材料名称(中文)')">
                <iInput
                  v-model="searchContent.generalCategoryNameZh"
                  :placeholder="language('请输入')"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('原材料名称(英文)')">
                <iInput
                  v-model="searchContent.generalCategoryNameEn"
                  :placeholder="language('请输入')"
                ></iInput>
              </iFormItem>
            </el-col>
          </el-row>
          <el-row gutter="24">
            <el-col :span="8">
              <iFormItem :label="language('大类元素简称')">
                <iInput
                  v-model="searchContent.generalShortName"
                  :placeholder="language('请输入')"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="8">
              <iFormItem :label="language('状态')">
                <iSelect v-model="searchContent.status" :placeholder='language("请选择")'>
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </el-col>
          </el-row>
        </el-form>
      </iSearch>
    </div>
    <div class="tabelList">
      <iCard>
        <div class="btnList">
          <iButton @click="add">{{language('新建')}}</iButton>
          <iButton @click="active" :disabled="activeBtnDis">{{language('生效')}}</iButton>
          <iButton @click="loseActive" :disabled="loseActiveBtnDis"
            >{{language('失效')}}</iButton
          >
          <iButton @click="del" :disabled="this.selectedItem.length == 0"
            >{{language('删除')}}</iButton
          >
          <buttonDownload :download-method="exportExcel">{{language('导出')}}</buttonDownload>
        </div>
        <div class="tabelContent">
          <iTabelCustom
            ref="rawMaterielList"
            :loading="loading"
            :data="tabelListData"
            :columns="rawMaterielColumns"
            @go-detail="goDetail"
            @handle-selection-change="handleSelectionChange"
          >
          </iTabelCustom>
          <iPagination
            v-update
            @size-change="handleSizeChange($event, getRawMeterielPage)"
            @current-change="handleCurrentChange($event, getRawMeterielPage)"
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
    <dialogPage
      v-if="showDialog"
      :show.sync="showDialog"
      :propItem="propItem"
      @getRawMeterielPage="getRawMeterielPage"
    ></dialogPage>
  </div>
</template>

<script>
import {
  iSearch,
  iButton,
  iInput,
  iSelect,
  iPagination,
  iFormItem,
  iCard
} from 'rise'
import iTabelCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { rawMaterielColumns } from './data.js'
import dialogPage from './dialogPage.vue'
import {
  getRawPage,
  exportRawExcel,
  delRawPageItems,
  changeSta
} from '@/api/materiel/rawMaterielInfor'
import buttonDownload from '@/components/buttonDownload'
// import { float } from 'html2canvas/dist/types/css/property-descriptors/float';

export default {
  components: {
    iSearch,
    iButton,
    iInput,
    iSelect,
    iPagination,
    iFormItem,
    iCard,
    iTabelCustom,
    dialogPage,
    buttonDownload
  },
  mixins: [pageMixins],
  computed: {},
  data() {
    return {
      showDialog: false,
      rawId: '',
      loading: false,
      rawMaterielColumns,
      activeBtnDis: true,
      loseActiveBtnDis: true,
      tabelListData: [],
      status: 0,
      searchLabel: {
        generalCategoryCode: '原材料编号大类',
        generalCategoryNameZh: '原材料名称(中文)',
        generalCategoryNameEn: '原材料名称(英文)',
        rawMaterielElement: '大类元素简称',
        status: '状态'
      },
      searchContent: {
        generalCategoryCode: '',
        generalCategoryNameZh: '',
        generalCategoryNameEn: '',
        generalShortName: '',
        status: ''
      },
      statusOptions: [
        {
          label: '有效',
          value: '1'
        },
        {
          label: '无效',
          value: '0'
        }
      ],
      selectedItem: []
    }
  },
  methods: {
    exportExcel() {
      return exportRawExcel(this.searchContent)
    },
    del() {
      this.$confirm('是否删除已选中的数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let data = this.selectedItem.map((item) => {
            return item.id
          })
          delRawPageItems(data).then((val) => {
            if (val.code == 200) {
              this.getRawMeterielPage()
            } else if (val.code == 1) {
              this.$message.error(val.desZh)
            }
          })
        })
        .catch(() => {
          this.$refs.rawMaterielList.clearSelection()
        })
    },
    loseActive() {
      this.status = 0
      this.changeStatus()
    },
    active() {
      this.status = 1
      this.changeStatus()
    },
    add() {
      this.showDialog = true
      this.propItem = {}
    },
    handleSelectionChange(val) {
      this.selectedItem = val
      if (val.length != 0) {
        let active = this.selectedItem.filter((element) => {
          return element.statusDesc == '有效'
        })
        let loseActive = this.selectedItem.filter((element) => {
          return element.statusDesc == '无效'
        })
        if (active.length == val.length) {
          this.loseActiveBtnDis = false
        } else {
          this.loseActiveBtnDis = true
        }
        if (loseActive.length == val.length) {
          this.activeBtnDis = false
        } else {
          this.activeBtnDis = true
        }
      } else {
        this.activeBtnDis = true
        this.loseActiveBtnDis = true
      }
    },
    goDetail(val) {
      this.showDialog = true
      this.propItem = val
    },
    reset() {
      ;(this.searchContent = {
        generalCategoryCode: '',
        generalCategoryNameZh: '',
        generalCategoryNameEn: '',
        generalShortName: '',
        status: ''
      }),
        (this.page.totalCount = 0)
      this.page.currPage = 1
      this.getRawMeterielPage()
    },
    sure() {
      this.page.totalCount = 0
      this.page.currPage = 1
      this.getRawMeterielPage()
    },
    getRawMeterielPage() {
      this.loading = true
      let data = {
        ...this.searchContent,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getRawPage(data)
        .then((val) => {
          if (val.code == 200) {
            this.tabelListData = val.data
            this.page.totalCount = val.total
          } else if (val.code == 1) {
            this.$message(val.desZh)
          }
        })
        .catch((err) => {
          this.$message.error(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    changeStatus() {
      let data = this.selectedItem.map((item) => {
        return {
          [item.id]: this.status
        }
      })
      changeSta(data).then((val) => {
        if (val.code == 200) {
          this.getRawMeterielPage()
        } else if (val.code == 1) {
          this.$message.error(val.desZh)
        }
      })
    }
  },
  mounted() {
    this.getRawMeterielPage()
  }
}
</script>

<style lang="scss" scoped>
.tabelContent,
.tabelList {
  margin-top: 20px;
}
.btnList {
  display: flex;
  justify-content: flex-end;
}
</style>
