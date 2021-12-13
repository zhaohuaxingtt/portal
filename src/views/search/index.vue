<!--
 * @Author: your name
 * @Date: 2021-08-19 10:12:41
 * @LastEditTime: 2021-08-20 14:48:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\search\index.vue
-->
<template>
  <iPage>
    <filterPanel
      :category-options="categoryOptions"
      :search-form="searchForm"
      @search="search"
      v-if="!showResult"
      :showResult="showResult"
    />
    <iCard class="result-body" v-else>
      <filterPanel
        :category-options="categoryOptions"
        :search-form="searchForm"
        @search="search"
      />
      <div v-loading="loading">
        <div
          class="no-result"
          v-show="results.length === 0 && searchForm.words.length > 0"
        >
          无结果
        </div>
        <result :search-form="searchForm" :results="results" />
      </div>
      <!-- <iPagination
      v-update
      @size-change="handleSizeChange($event, query)"
      @current-change="handleCurrentChange($event, query)"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
    /> -->
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard } from 'rise'
import { filterPanel, result } from './components'
import { pageMixins } from '@/utils/pageMixins'
import { fullTextSearch ,selectionSearch} from '@/api/search'
import { fetchDict } from '@/api/baseInfo'
export default {
  name: 'Search',
  mixins: [pageMixins],
  components: { iPage, iCard, filterPanel, result },
  computed: {
    searchCategory() {
      return this.searchForm.category
    }
  },
  provide() {
    return {
      searchForm: this.searchForm // this.searchCategory
    }
  },
  data() {
    return {
      searchForm: {
        dataSourceList: [],
        words: ''
      },
      categoryOptions: [],
      results: [],
      loading: false,
      showResult: false
    }
  },
  created() {
    if (this.$route.query.q) {
      this.searchForm.words = this.$route.query.q
    }
    this.queryCategorys()
    this.query()
  },
  methods: {
    search() {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.query()
    },
    async queryCategorys() {
      
      const { data } = await selectionSearch({terminal:'1'})
      this.categoryOptions = data.map((item) => {
        return { value: item.code, label: item.name ,id:item.code}
      })
    },
    async query() {
      let types = this.searchForm.dataSourceList.map((item) => {
        return item.value
      })
      const requestData = {
        keyword: this.searchForm.words,
        types,
        pageNo: this.page.currPage - 1,
        supplierId:'',
        terminal:'1',
        userId:'1',
        pageSize: 100 // this.page.pageSize
      }
      this.loading = true
      const res = await fullTextSearch(requestData).finally(()=>{
          this.loading = false
          this.showResult = true
      })
      this.results = res?.data || []
      this.page.totalCount = res?.total || 0
      this.page.pageSize = res?.pageSize || 10
      this.setSearchHistory(this.searchForm.words)
    },
    setSearchHistory(keyword) {
      let histories = []
      if (window.localStorage.getItem('search_history')) {
        histories = JSON.parse(window.localStorage.getItem('search_history'))
      }
      histories.push(keyword)
      histories = [...new Set(histories)]
      if (histories.length > 10) {
        histories.length = 10
      }
      window.localStorage.setItem('search_history', JSON.stringify(histories))
    }
  }
}
</script>

<style lang="scss" scoped>
.result-body {
  min-height: calc(100vh - 220px);
}
.no-result {
  padding: 30px 0;
}
</style>
