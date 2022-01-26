<template>
  <div style="width: 100%">
    <iSearch @sure="sure" @reset="reset">
      <el-form>
        <iFormItem :label="language('关键词')">
          <iInput
            v-model="searchWord"
            :placeholder="language('请输入')"
          ></iInput>
        </iFormItem>
      </el-form>
    </iSearch>
    <iCard class="table mt20">
      <div class="btn flex justify-end">
        <iButton @click="newCreate">{{ language('新建') }}</iButton>
        <iButton @click="del" :disabled="selectedItems.length == 0">{{
          language('删除')
        }}</iButton>
        <button-table-setting @click="$refs.tableListRef.openSetting()" />
      </div>
      <div class="mt20">
        <iTableCustom
          ref="tableListRef"
          :loading="tableLoading"
          :data="tableListData"
          :columns="tableSetting"
          @handle-selection-change="handleSelectionChange"
        />
        <iPagination
          @size-change="handleSizeChange($event, getPage)"
          @current-change="handleCurrentChange($event, getPage)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        />
      </div>
    </iCard>
    <addKeyWordsDialog v-if="show" :show.sync="show" @refresh="refresh" />
  </div>
</template>

<script>
import {
  iSearch,
  iFormItem,
  iInput,
  iTableCustom,
  iCard,
  iButton,
  iPagination
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { TABLE_KEYWORDS_COLUMNS } from './data.js'
import addKeyWordsDialog from './addKeyWords.vue'
import { getKeywordByPage, delKeywordByIds } from '@/api/assistant'
export default {
  name: 'keyWordsMana',
  components: {
    iSearch,
    iFormItem,
    iInput,
    iTableCustom,
    iCard,
    iButton,
    iPagination,
    addKeyWordsDialog
  },
  mixins: [pageMixins],
  data() {
    return {
      searchWord: '',
      show: false,
      keyWordsOptions: [{ label: 1, value: 2 }],
      tableLoading: false,
      tableListData: [],
      selectedItems: [],
      tableSetting: TABLE_KEYWORDS_COLUMNS
    }
  },
  created() {
    this.getPage()
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedItems = val
    },
    newCreate() {
      this.show = true
    },
    del() {
      this.$confirm('是否删除已选中选项', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let ids = this.selectedItems.map((e) => e.id)
          await delKeywordByIds(ids)
          this.getPage()
        })
        .catch(() => {
          this.$refs.tableListRef.clearSelection()
        })
    },
    async getPage() {
      try {
        this.tableLoading = true
        const data = {
          keyWord: this.searchWord,
          pageNum: this.page.currPage,
          pageSize: this.page.pageSize
        }
        let res = await getKeywordByPage(data)
        if (res.code == 200) {
          this.tableListData = res.data.records || []
          this.page.totalCount = res.data.total
        }
      } finally {
        this.tableLoading = false
      }
    },
    refresh() {
      this.getPage()
    },
    reset() {
      this.searchWord = ''
      this.sure()
    },
    sure() {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.getPage()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
</style>
