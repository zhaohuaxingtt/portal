<template>
  <iCard :title="language('采购组列表')" collapse>
    <iTableCustom :loading="loading" :data="positionList" :columns="columns" />
  </iCard>
</template>

<script>
import { iCard, iMessage } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { getPositionListByParams, queryPurchasegroup } from '@/api/position'
import { PURCHASE_GROUP_COLUMNS } from './data'
export default {
  name: 'purchaseGroup',
  components: { iCard, iTableCustom },
  props: {
    positionIds: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      positionList: [],
      columns: PURCHASE_GROUP_COLUMNS,
      loading: false,
      extraData: {
        purchasegroupOptions: [],
        tempPurchasegroupOptions: []
      }
    }
  },
  watch: {
    positionIds() {
      this.queryPositionList()
    }
  },

  created() {
    this.queryPositionList()
    this.queryPurchasegroupOptions()
    this.queryTempPurchasegroupOptions()
  },
  methods: {
    queryPositionList() {
      if (this.positionIds && this.positionIds.length) {
        this.loading = true
        getPositionListByParams({
          positionIdList: this.positionIds
        })
          .then((res) => {
            if (res?.code === '200') {
              this.positionList = res?.data || []
            } else {
              this.positionList = []
              iMessage.error(res.desZh || '获取采购组列表失败')
            }
          })
          .catch((err) => {
            iMessage.error(err.desZh || '获取采购组列表失败')
          })
          .finally(() => (this.loading = false))
      } else {
        this.positionList = []
      }
    },
    async queryPurchasegroupOptions() {
      const res = await queryPurchasegroup()
      this.extraData.purchasegroupOptions = res.data
    },
    async queryTempPurchasegroupOptions() {
      const res = await queryPurchasegroup({ isProvisionalPrice: true })
      this.tempPurchasegroupOptions.tempPurchasegroupOptions = res.data
    }
  }
}
</script>

<style lang="scss" scoped></style>
