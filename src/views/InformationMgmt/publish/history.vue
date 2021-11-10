<template>
  <iPage>
    <iCard>
      <div class="flex flex-between-center margin-bottom20 search-area">
        <el-form inline label-position="top" class="label-inline-form ">
          <iFormItem :label="$t('发布人')" style="margin-right: 50px">
            <userSearch v-model="form.createBy" :icon-visible="false" />
          </iFormItem>
          <iFormItem :label="$t('发布日期')">
            <iDatePicker
              v-model="form.pubdate"
              type="date"
              value-format="yyyy-MM-dd"
              clearable
            />
          </iFormItem>
        </el-form>
        <div>
          <el-form inline label-position="top" class="label-inline-form ">
            <iFormItem :label="$t(' ')">
              <iButton @click="search">
                {{ $t('搜索') }}
              </iButton>
              <iButton @click="newPublish">
                {{ $t('新建消息') }}
              </iButton>
              <iButton @click="view" :disabled="selectedData.length !== 1">
                {{ $t('查看') }}
              </iButton>
              <iButton @click="$router.go(-1)">
                {{ $t('返回') }}
              </iButton>
            </iFormItem>
          </el-form>
        </div>
      </div>
      <historyTable
        @handle-selection-change="handleSelectionChange"
        @go-detail="goDetail"
        ref="historyTable"
      />
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iFormItem, iDatePicker } from 'rise'
import { historyTable } from './components'
import { openUrl } from '@/utils'
import { exportPublishHistory } from '@/api/msgMgmt/msgPublish'

import { userSelect } from '@/components/remoteSelect'
export default {
  name: 'publishHistory',
  components: {
    iPage,
    iCard,
    iButton,
    historyTable,
    iFormItem,
    iDatePicker,
    userSearch: userSelect
  },
  data() {
    return {
      selectedData: [],
      form: {
        createBy: '',
        pubdate: ''
      }
    }
  },
  methods: {
    exportExcel() {
      exportPublishHistory({})
    },
    view() {
      this.goDetail(this.selectedData[0])
    },
    handleSelectionChange(val) {
      this.selectedData = val
    },
    goDetail(row) {
      openUrl(
        `/infoTemplate/publish/view/history?id=${row.id}&channel=${row.channel}`
      )
    },
    search() {
      this.$refs.historyTable.search(this.form)
    },
    newPublish() {
      this.$router.push({ name: 'infoMgmtmsgPublish' })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-area {
  border-bottom: solid 1px #f8f8f8;
  box-shadow: 0px 10px 10px -10px rgb(27 29 33 / 12%);
  padding: 0px 40px;
  margin: 0px -40px 30px -40px;
}
</style>
