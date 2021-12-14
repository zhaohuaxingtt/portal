<template>
  <iPage>
    <detailBase :supplierData="detail" class="margin-bottom20" />
    <detailCompany :supplierData="detail" class="margin-bottom20" />
    <detailFactory
      :factoryList="detail.ntierSupplierPlantResVos"
      class="margin-bottom20"
    />
  </iPage>
</template>

<script>
import { iPage, iMessage } from 'rise'
import { detailBase, detailCompany, detailFactory } from './components'
import { getBasicDetailById } from '@/api/mainDataSupplier/N-Tier'

export default {
  name: 'detail',
  components: { detailBase, detailCompany, iPage, detailFactory },
  data() {
    return {
      detail: {
        addressInfoUpdateVo: {},
        ntierSupplierPlantResVos: []
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
