<template>
  <iPage class="template">
    <iCard>
      <div class="flex flex-end-center margin-bottom20">
        <iButton @click="add">{{ $t('新建模板') }}</iButton>
        <iButton :disabled="selectedData.length !== 1" @click="publish">
          {{ $t('选择发布') }}
        </iButton>
        <iButton @click="deleteItem" :disabled="selectedData.length === 0">
          {{ $t('删除') }}
        </iButton>
        <iButton @click="exportExcel">
          {{ $t('导出') }}
        </iButton>
      </div>
      <templateTable
        ref="templateTable"
        @go-detail="goDetail"
        @handle-selection-change="handleSelectionChange"
      />
    </iCard>
    <addDialog :visible.sync="visible" />
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iMessage } from 'rise'
import { addDialog } from './components'
import { batchDeleteTemplate, exportTemplate } from '@/api/msgMgmt/msgTemplate'
import templateTable from './components/templateTable'
import deleteMixin from '@/mixins/deleteMixin'
import { openUrl } from '@/utils'
export default {
  components: {
    iPage,
    iCard,
    iButton,
    templateTable,
    addDialog
  },
  mixins: [deleteMixin],
  data() {
    return {
      selectedData: [],
      visible: false
    }
  },
  methods: {
    add() {
      this.visible = true
    },
    goDetail(row) {
      /* const data = {
        name: 'msgTemplateAdd',
        query: {
          id: row.id,
          channel: row.channel
        }
      }
      this.$router.push(data) */
      const { id, channel } = row
      window.open(
        `/portal/#/infoTemplate/template/create?id=${id}&channel=${channel}`
      )
    },
    deleteItem() {
      const data = this.selectedData.map(e => e.id)
      this.onDelete().then(() => {
        //批量删除
        batchDeleteTemplate(data)
          .then(val => {
            console.log('del val', val)
            if (val.code == 200) {
              iMessage.success('删除成功')
              this.$refs.templateTable.query()
            } else {
              iMessage.error('删除失败')
            }
          })
          .catch(err => {
            console.log('er', err)
            iMessage.error('删除失败')
          })
      })
    },
    exportExcel() {
      exportTemplate({})
    },
    handleSelectionChange(val) {
      this.selectedData = val
    },
    publish() {
      const { id, channel } = this.selectedData[0]
      openUrl(`/infoTemplate/publish/send?id=${id}&channel=${channel}`)
    }
  }
}
</script>

<style lang="scss" scoped></style>
