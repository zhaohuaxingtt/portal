<template>
  <iPage>
    <iCard>
      <div class="flex flex-end-center margin-bottom20">
        <iButton :disabled="selectedData.length !== 1" @click="publish">
          {{ $t('选择发布') }}
        </iButton>
        <iButton @click="history">
          {{ $t('发布历史') }}
        </iButton>
        <iButton :loading="exportLoading" @click="exportExcel">
          {{ $t('导出') }}
        </iButton>
      </div>
      <templateTable
        @go-detail="goDetail"
        @handle-selection-change="handleSelectionChange"
      />
    </iCard>
  </iPage>
</template>
l
<script>
import { iPage, iCard, iButton } from 'rise'
import templateTable from '../template/components/templateTable'
import { exportTemplate } from '@/api/msgMgmt/msgTemplate'
import { openUrl } from '@/utils'
export default {
  name: 'InformationPublish',
  components: {
    templateTable,
    iPage,
    iCard,
    iButton
  },
  data() {
    return {
      selectedData: [],
      exportLoading: false
    }
  },
  methods: {
    goDetail(row) {
      const { id, channel } = row
      openUrl(`/infoTemplate/publish/view/template?id=${id}&channel=${channel}`)
    },
    handleSelectionChange(val) {
      this.selectedData = val
    },
    publish() {
      const { id, channel } = this.selectedData[0]
      openUrl(`/infoTemplate/publish/send?id=${id}&channel=${channel}`)
    },
    history() {
      this.$router.push({ name: 'infoMgmtmsgPublishHistory' })
    },
    exportExcel() {
      this.exportLoading = true
      exportTemplate({}).finally(() => (this.exportLoading = false))
    }
  }
}
</script>

<style lang="scss" scoped></style>
