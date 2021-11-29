<template>
  <el-card>
    <div class="flex flex-row justify-end mt20 mb20">
      <template v-if="!isEdit">
        <iButton @click="editHandler">{{ language('编辑') }}</iButton>
      </template>
      <template v-else>
        <iButton @click="cancelEditHandler">{{ language('取消') }}</iButton>
        <iButton @click="confirmEditHandler">{{ language('确认') }}</iButton>
      </template>
    </div>
    <iTableCustom ref="testTable" :loading="tableLoading" :data="tableListData" :columns="tableSetting" :extra-data="extraData" @handle-selection-change="handleSelectionChange" />
    <!-- <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :current-page="page.currPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :total="page.totalCount" /> -->
  </el-card>
</template>

<script>
import { iPagination,iTableCustom, iButton } from 'rise';
import { tableColumn } from './tableColumn';
import { pageMixins } from '@/utils/pageMixins'
import { queryModuleList } from "@/api/assistant"
import assistant_mixin from "./../../../mixins"
export default {
  mixins: [pageMixins,assistant_mixin],
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  components: {
    iPagination,
    iTableCustom,
    iButton
  },
  data () {
    return {
      tableLoading: false,
      exportLoading: false,
      tableListData: [
        {
          id: 1,
          account: 1234,
          name: '张三',
        }
      ],
      tableSetting: tableColumn,
      selectionRowList: [],
      isEdit: false,
      extraData: {
        selectionRowIds: [],
        changeNameHandler: this.changeNameHandler,
        nameForm: {
          name: '1',
        },
        nameList: [
          {
            id: '1',
            name: '张三',
          },
          {
            id: '2',
            name: '李四',
          }
        ],
      },
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    async query(){
      this.tableLoading = true
      try {
        let res = await queryModuleList(this.getUserType())
        this.tableListData = res.data
      } finally {
        this.tableLoading = false
      }
    },
    handleGoDetail () { },
    handleSelectionChange (ev) {
      this.selectionRowList = ev;
    },
    editHandler () {
      if (this.selectionRowList.length) {
        this.isEdit = true;
        this.extraData.selectionRowIds = this.selectionRowList.map(item => item.id);
      } else {
        this.$message.error('请选择编辑的行');
      }
    },
    cancelEditHandler () {
      this.isEdit = false;
      this.extraData.selectionRowIds = [];
    },
    confirmEditHandler () { 
      this.isEdit = false;
      this.extraData.selectionRowIds = [];
    },
    changeNameHandler (scope,val) {
      const { row, $index } = scope
      console.log('row', row,$index,val);
      this.extraData.nameForm.name = val;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
</style>