<template>
  <iCard :title="language('N-Tier供应商用户')" collapse>
    <div slot="header-control">
      <iButton :disabled="!selectedRows.length" @click="handleDelete">
        {{language('删除')}}
      </iButton>
      <iButton :disabled="this.selectedRows.length !== 1" @click="handleEdit">
        {{language('编辑')}}
      </iButton>
    </div>
    <div class="N-TierList">
      <iTableCustom
        ref="N-IterTabel"
        :loading="tableLoading"
        :data="tableData"
        :columns="tabelColumn"
        @go-detail="goDetail"
        @handle-selection-change="handleSelectionChange"
        @save-success="query"
      />
    </div>
    <detailDialog
      v-if="showDialog"
      :visible.sync="showDialog"
      :detail="detail"
      @save-success="query"
    />
  </iCard>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import { N_ITER_DETAIL_LIST } from './data'
import iTableCustom from '@/components/iTableCustom'
import detailDialog from './detailDialog'
import deleteMixin from '@/mixins/deleteMixin'
import {
  fetchSupplierUsers,
  deleteSupplierUser
} from '@/api/mainDataSupplier/list/user'
export default {
  name: 'detailList',
  components: { iCard, iButton, iTableCustom, detailDialog },
  props: {},
  mixins: [deleteMixin],
  computed: {
    supplierId() {
      return this.$route.query.id
    }
  },
  data() {
    return {
      tableLoading: false,
      tabelColumn: N_ITER_DETAIL_LIST,
      tableData: [],
      showDialog: false,
      selectedRows: [],
      tableListId: '',
      detail: {}
    }
  },
  created() {
    this.query()
  },
  methods: {
    goDetail(val) {
      this.detail = { ...val }
      this.showDialog = true
    },
    handleEdit() {
      this.detail = { ...this.selectedRows[0] }
      this.showDialog = true
    },
    handleDelete() {
      this.onDelete().then(() => {
        deleteSupplierUser(this.selectedRows)
          .then(res => {
            if (res.result) {
              iMessage.success(res.dscZh || '删除成功')
              this.query()
            } else {
              iMessage.error(res.dscZh || '删除失败')
            }
          })
          .catch(err => {
            iMessage.error(err.dscZh || '删除失败')
          })
      })
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    async query() {
      const requestData = {
        supplierId: this.supplierId
      }
      this.tableLoading = true
      const res = await fetchSupplierUsers(requestData).finally(
        () => (this.tableLoading = false)
      )
      console.log('res', res)
      this.tableData = res.data || []
    }
  }
}
</script>

<style></style>
