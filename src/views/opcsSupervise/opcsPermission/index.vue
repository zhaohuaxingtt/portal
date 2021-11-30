<!--
 * @Date: 2021-11-25 09:47:22
 * @LastEditors: caopeng
 * @LastEditTime: 2021-11-29 11:24:47
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\index.vue
-->

<template>
  <div>
    <iSearch @reset="clickReset" @sure="sure" :icon="true">
      <el-form inline label-position="top">
        <el-form-item :label="language('YINGYONGMINGCHENG', '应用名称')">
          <iInput
            :placeholder="language('QINGSHURU', '请输入')"
            v-model="form.tagNameList"
          >
          </iInput>
        </el-form-item>
        <el-form-item :label="language('YINGYONGFUZEREN', '应用负责人')">
          <iInput
            :placeholder="language('QINGSHURU', '请输入')"
            v-model="form.tagType"
          >
          </iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard style="margin-top: 20px">
      <div class="margin-bottom20">
        <span class="font18 font-weight">{{
          language('XIANGQINGLIEBIAO', '详情列表')
        }}</span>
        <div class="floatright">
          <i-button @click="handleDelect()">{{ $t('LK_SHANCHU') }}</i-button>
          <i-button @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
        </div>
      </div>
      <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
      >
      </table-list>
      <iPagination
        style="margin-top: 20px"
        v-update
        @size-change="handleSizeChange($event, sure)"
        @current-change="handleCurrentChange($event, getTableData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
  </div>
</template>

<script>
import tableList from '@/components/commonTable'
import { pageMixins } from '@/utils/pageMixins'
import {
  iSearch,
  iButton,
  iCard,
  iPagination,
  iMessage,
  iInput,
  iMessageBox
} from 'rise'
import { tableTitle } from './components/data'
export default {
  mixins: [pageMixins],
  components: {
    iButton,
    iSearch,
    iCard,
    iPagination,
    iInput,
    tableList
  },
  data() {
    return {
      tableTitle: tableTitle,
      selectTableData: [],
      form: {},
      tableListData: [],
      tableLoading: false
    }
  },
  created() {
      console.log(this.tabledata)
      this.tableListData=[{ys:'111'},{ys:'222'},]
    // this.getTableData()
  },
  methods: {
         //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    // //获取列表接口
    // getTableData() {
    //   this.tableLoading = true
    //   const params = {
    //     pageNo: this.page.currPage,
    //     pageSize: this.page.pageSize,
    //     ...this.form
    //   }
    //   getTagPage(params).then((res) => {
    //     this.tableLoading = false
    //     if (res && res.code == 200) {
    //       this.tabledata = res.data
    //       this.page.totalCount = res.total
    //     } else iMessage.error(res.desZh)
    //   })
    // },
    handleDelect() {
        console.log(this.selectTableData)
    //   if (this.selectTableData.length == 0) {
    //     iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
    //     return false
    //   }
    //   iMessageBox(
    //     this.language(
    //       'QUERENSHANCHUGAIBIAOQIANDESUOYOUGONGYINGSHANGPEIZHI?',
    //       '确认删除该标签的所有供应商配置？'
    //     ),
    //     this.language('SHANCHU', '删除'),
    //     {
    //       confirmButtonText: this.language('SHI', '是'),
    //       cancelButtonText: this.language('FOU', '否')
    //     }
    //   ).then(async () => {
    //     const req = {
    //       ids: this.selectTableData.map((x) => {
    //         return x.tagId
    //       })
    //     }
    //     console.log(this.selectTableData)
    //     delBatchDel(req).then((res) => {
    //       if (res && res.code == 200) {
    //         iMessage.success(res.desZh)
    //         this.getTableData()
    //       } else iMessage.error(res.desZh)
    //     })
    //   })
    },

    // 点击重置
    clickReset() {
      this.form = {}
      this.getTableData()
    },
    sure() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped></style>
