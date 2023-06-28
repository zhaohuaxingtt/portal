<template>
  <div>
    <iSearch @sure="sure" @reset="reset">
      <el-form>
        <el-row gutter="24">
          <el-col
            :span="6"
            v-for="(item, index) in searchFormData"
            :key="index"
          >
            <iFormItem :label="language(item.label)">
              <iInput
                :placeholder="language('请输入')"
                v-model="searchContent[item.prop]"
              ></iInput>
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <div class="btnList">
        <buttonDownload v-permission="ADMIN_MATERIEL_DATA_INDIRECT_ITEM_INFORMATION_EXPORT" :download-method="exportExcel">
          {{ language('导出') }}
        </buttonDownload>
      </div>
      <iTableCustom
        class="margin-top20"
        :loading="loading"
        :data="data"
        :columns="columns"
        :extraData="{ unitoptions }"
        @goDetail="goDetail"
      >
      </iTableCustom>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </iCard>
  </div>
</template>

<script>
import {
  iButton,
  iCard,
  iSearch,
  iFormItem,
  iInput,
  iSelect,
  iPagination,
  iMessage
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { columns, searchFormData } from './data.js'
import { pageMixins } from '@/utils/pageMixins'
import { openUrl } from '@/utils'
import buttonDownload from '@/components/buttonDownload'
import {
  materielUnit,
  indirectMaterialPage,
  indirectMaterialPageExport
} from '@/api/materiel/materielMainData.js'

export default {
  components: {
    iButton,
    iCard,
    iSearch,
    iFormItem,
    iInput,
    iSelect,
    iTableCustom,
    iPagination,
    buttonDownload
  },
  mixins: [pageMixins],
  created() {
    //零件单位下拉
    materielUnit()
      .then((val) => {
        if (val.code == 200) {
          const unitoption = []
          for (let item of val.data) {
            unitoption.push({
              name: item['nameZh'],
              value: item['nameZh'],
              id: item['id']
            })
          }
          this.unitoptions = unitoption
        }
      })
      .catch((err) => {
        iMessage.error(err)
      })
    this.getTableList()
  },
  methods: {
    getTableList() {
      this.loading = true
      let data = {}
      data = {
        ...this.searchContent,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      indirectMaterialPage(data)
        .then((val) => {
          if (val.code == 200) {
            this.loading = false
            this.data = val.data
            this.page.totalCount = val.total
          }
        })
        .catch((err) => {
          iMessage.error(err.dscZh || '获取数据失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    sure() {
      this.page.currPage = 1
      this.getTableList()
    },
    reset() {
      this.searchContent = {}
      this.sure()
    },
    exportExcel() {
      return indirectMaterialPageExport({
        ...this.searchContent,
        current: this.page.currPage,
        size: this.page.pageSize
      })
    },
    goDetail(val) {
      let id = val.id
      openUrl(`/materielData/indirect-item-information/detail?bizId=${id}`)
    }
  },
  data() {
    return {
      loading: false,
      columns,
      searchContent: {},
      searchFormData,
      data: [],
      unitoptions: []
    }
  }
}
</script>

<style lang="scss" scoped>
.btnList {
  display: flex;
  justify-content: flex-end;
}
</style>
