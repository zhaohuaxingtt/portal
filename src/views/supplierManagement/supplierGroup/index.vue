<template>
  <iPage>
    <iSearch>
      <el-form>
        <el-form-item label="test">
          <iInput v-model="search.name"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <div class="margin-bottom10 clearFloat">
        <div class="floatright btn-box">
          <i-button v-permission="SUPPLIER_GROUP_MANAGEMENT_ADD_ZIDINGYIZU">{{ language('TIANJIAZIDINGYIZU','添加自定义组') }}</i-button>
          <i-button v-permission="SUPPLIER_GROUP_MANAGEMENT_DELETE_ZIDINGYIZU">{{ language('SHANCHU', '删除') }}</i-button>
          <i-button v-permission="SUPPLIER_GROUP_MANAGEMENT_EXPORT_ZIDINGYIZU">{{ language('DAOCHU', '导出') }}</i-button>
        </div>
      </div>
      <tableList :tableData="tableData" :tableTitle="tableTitle">

      </tableList>
    </iCard>
  </iPage>
</template>

<script>
import {
  iSearch,
  iCard,
  iInput,
  iSelect,
  iPagination,
  iDatePicker,
  iButton,
  iPage
} from 'rise'
import tableList from '@/components/commonTable'
import { tableTitle } from './data.js'
export default {
  components: {
    iSearch,
    iCard,
    iInput,
    iSelect,
    iPagination,
    iDatePicker,
    iButton,
    iPage,
    tableList
  },
  data() {
    return {
      search: {
        name: ''
      },
      tableData:[],
      tableTitle
    }
  }
}
</script>

<style lang="scss" scoped>
</style>