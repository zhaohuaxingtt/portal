<template>
  <iCard :title="language('采购组列表')" collapse>
    <iTableCustom
      :loading="tableLoadingGroup"
      :data="tempPurchaseGroup"
      :columns="columns"
    />
  </iCard>
</template>

<script>
import { iCard, iMessage } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { getPositionListByParams } from '@/api/position'
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
      columns: PURCHASE_GROUP_COLUMNS
    }
  },
  watch: {
    positionIds() {
      this.queryPositionList()
    }
  },

  created() {
    this.queryPositionList()
  },
  methods: {
    queryPositionList() {
      if (this.positionIds && this.positionIds.length) {
        getPositionListByParams({
          positionIdList: this.positionIds
        })
          .then((res) => {
            if (res?.code === '200') {
              this.positionList = res?.data || []
            } else {
              iMessage.error(res.desZh || '获取采购组列表失败')
            }
          })
          .catch((err) => {
            iMessage.error(err.desZh || '获取采购组列表失败')
          })
      } else {
        this.positionList = []
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
