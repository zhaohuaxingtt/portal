<template>
  <iPage>
    <detailBase :supplierData="detail" />
    <detailCompany :supplierData="detail" />
  </iPage>
</template>

<script>
import { iPage, iMessage } from 'rise'
import { detailBase, detailCompany } from './components'
import { getBasicDetailById } from '@/api/mainDataSupplier/N-Tier'

export default {
  name: 'detail',
  components: { detailBase, detailCompany, iPage },
  data() {
    return {
      detail: {
        address: {}
      }
    }
  },
  created() {
    this.queryDetail()
  },
  methods: {
    queryDetail() {
      const id = this.$route.query.id
      getBasicDetailById(id).then((val) => {
        if (val.code == 200) {
          this.detail = val.data
        } else if (val.code == 1) {
          iMessage.error(val.desZh)
        }
      })
    }
  }
}
</script>

<style></style>
