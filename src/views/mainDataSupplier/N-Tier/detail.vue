<template>
  <iPage>
    <detailBase :supplierData="detail" />
  </iPage>
</template>

<script>
import { iPage, iMessage } from 'rise'
import { detailBase } from './components'
import { getBasicDetailById } from '@/api/mainDataSupplier/N-Tier'

export default {
  name: 'detail',
  components: { detailBase, iPage },
  data() {
    return {
      detail: {}
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
