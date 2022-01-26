<template>
  <iCard
    :title="language('工艺组信息')"
    class="margin-top20"
    header-control
    collapse
  >
    <div class="button-top margin-bottom20" v-if="!readOnly">
      <iButton
        @click="newTechnology"
        v-permission="
          'BUTTON_MATERIEL_DATA_MATERIAL_GROUP_TECHNOLOGY_GROUP_ADD'
        "
        >{{ language('新增') }}</iButton
      >
      <iButton
        @click="deleteTechnology"
        :disabled="selectTableData.length == 0"
        v-permission="
          'BUTTON_MATERIEL_DATA_MATERIAL_GROUP_TECHNOLOGY_GROUP_DELETE'
        "
        >{{ language('删除') }}</iButton
      >
    </div>
    <div>
      <iTableCustom
        :data="tableData"
        :columns="tableColumns"
        @goDetail="goDetail"
        @handle-selection-change="handleSelectionChange"
      >
      </iTableCustom>
      <div class="margin-top20">
        <iPagination
          v-update
          background
          @size-change="handleSizeChange($event, query)"
          @current-change="handleCurrentChange($event, query)"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        ></iPagination>
      </div>
    </div>
  </iCard>
</template>
<script>
import { iCard, iButton, iPagination, iMessage } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { TECHNOLOGY_COLUMNS } from './data'
// import { openUrl } from '@/utils'
import { pageMixins } from '@/utils/pageMixins'
import {
  stuffPagedList,
  deleteTechnology,
  dataDic
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
      tableColumns: TECHNOLOGY_COLUMNS,
      tableData: [],
      //   page:{
      //   total:1,
      //   currPage:1,
      // },
      categoryId: '',
      selectTableData: [],
      modelBudgetType: []
    }
  },
  created() {
    if (this.$route.query.id) {
      this.categoryId = this.$route.query.id
    } else if (this.savecaId) {
      this.categoryId = this.savecaId
    }
    let keys = 'MODEL_BUDGET_TYPE'
    let parentId = -1
    dataDic(keys, parentId)
      .then((val) => {
        if (val.code == 200) {
          this.modelBudgetType = val.data.MODEL_BUDGET_TYPE
          this.technologyList()
        } else if (val.code == 1) {
          this.$message.error(val.desZh)
        }
      })
      .catch((err) => {
        iMessage.error(err)
      })
  },
  methods: {
    technologyList() {
      if (this.categoryId === undefined) {
        this.categoryId = ''
      }
      let data = {
        stuffCategoryId: this.categoryId,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      stuffPagedList(data).then((res) => {
        this.tableData = res.data
        for (let item of this.tableData) {
          for (let val of this.modelBudgetType) {
            if (item.moldBudgetType == val.code) {
              item.moldBudgetType = val.name
            }
          }
        }
        this.stuffId = res.data.id
        this.page.totalCount = res.total
      })
    },
    newTechnology() {
      window.open(
        '/portal/#/materielData/material-group/detail/add-technology?categoryId=' +
          this.categoryId
      )
    },
    goDetail(row) {
      if (this.readOnly) {
        window.open(
          '/portal/#/materielData/material-group/detail/add-technology?categoryId=' +
            this.categoryId +
            '&stuffId=' +
            row.id +
            '&readOnly=1'
        )
      } else {
        window.open(
          '/portal/#/materielData/material-group/detail/add-technology?categoryId=' +
            this.categoryId +
            '&stuffId=' +
            row.id
        )
      }
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    deleteTechnology() {
      this.$confirm('是否删除已选中数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        this.selectTableData.forEach((val) => {
          ids.push(val.id)
        })
        deleteTechnology(ids).then((res) => {
          if (res.code == 200) {
            this.technologyList()
            iMessage.success('删除成功')
          }
          if (res.code == 1) {
            iMessage.error(res.desZh)
          }
        })
      })
    }
  }
}
</script>
<style>
.button-top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
