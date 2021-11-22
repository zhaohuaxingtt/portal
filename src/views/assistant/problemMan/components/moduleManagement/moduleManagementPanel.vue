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
    <iTableCustom ref="testTable" :loading="tableLoading" :data="tableListData" :columns="tableSetting" @go-detail="handleGoDetail" @handle-selection-change="handleSelectionChange" />
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :current-page="page.currPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :total="page.totalCount" />
  </el-card>
</template>

<script>
import { iPagination, iTableCustom, iButton } from 'rise';
import { tableColumn } from './tableColumn';
import { pageMixins } from '@/utils/pageMixins'
export default {
  mixins: [pageMixins],
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      tableLoading: true,
      exportLoading: false,
      tableListData: [
        {
          id: 1,
          account: 1234,
          name: '张三',
        }
      ],
      tableSetting: tableColumn(this),
      selectionRowList: [],
      selectionRowIds: [],
      isEdit: false,
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
    }
  },
  methods: {
    handleGoDetail () { },
    handleSelectionChange (ev) {
      this.selectionRowList = ev;
    },
    editHandler () {
      if (this.selectionRowList.length) {
        this.isEdit = true;
        this.selectionRowIds = this.selectionRowList.map(item => item.id);
      } else {
        this.$message.error('请选择编辑的行');
      }
    },
    cancelEditHandler () {
      this.isEdit = false;
      this.selectionRowIds = [];
      this.selectionRowList = [];
    },
    confirmEditHandler () { },
    changeNameHandler(val) {
      this.$forceUpdate();
      console.log(val, )
    },
  },
  mounted () {
    console.log(this.type);
    setTimeout(() => {
      this.tableLoading = false;
    }, 1000);
  },
  components: {
    iPagination,
    iTableCustom,
    iButton
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
</style>