<template>
  <el-card v-loading="loading">
    <div class="flex flex-row justify-end mt20 mb20">
      <template v-if="!isEdit">
        <iButton @click="editHandler">{{ language('编辑') }}</iButton>
      </template>
      <template v-else>
        <iButton @click="cancelEditHandler">{{ language('取消') }}</iButton>
        <iButton @click="confirmEditHandler">{{ language('确认') }}</iButton>
      </template>
    </div>
    <iTableCustom ref="testTable" :loading="tableLoading" :data="extraData.tableListData" :columns="tableSetting" :extra-data="extraData" @handle-selection-change="handleSelectionChange" />
    <!-- <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :current-page="page.currPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :total="page.totalCount" /> -->
  </el-card>
</template>

<script>
import { iTableCustom, iButton } from 'rise';
import { tableColumn } from './tableColumn';
import { pageMixins } from '@/utils/pageMixins'
import { queryModuleList, queryProCsUserList, saveModules } from "@/api/assistant"
export default {
  mixins: [pageMixins],
  props: {
    type: {
      type: String,
      default: ""
    }
  },
  components: {
    iTableCustom,
    iButton
  },
  data () {
    return {
      loading:false,
      tableLoading: false,
      exportLoading: false,
      tableSetting: tableColumn,
      selectionRowList: [],
      isEdit: false,
      extraData: {
        selectionRowIds: [],
        changeNameHandler: this.changeNameHandler,
        nameForm: {
          name: '1',
        },
        nameList: [],
        nameListKV:{},
        tableListData: [],
      },
      tempList:[]
    }
  },
  async mounted () {
    let {data} = await queryProCsUserList()
    data.forEach(e => {
      this.extraData.nameListKV[+e.id] = e
    })
    this.extraData.nameList = data
    this.query()

  },
  methods: {
    async query(){
      this.tableLoading = true
      try {
        let res = await queryModuleList(this.type)
        res.data.forEach(e => {
          e.adminUserId = e.adminUserId ? e.adminUserId.split(",") : []
        })
        this.$nextTick(() => {
          this.extraData.tableListData = res.data
          this.tempList = JSON.parse(JSON.stringify(res.data))
        })
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
        this.extraData.selectionRowIds = this.selectionRowList.map(item => item.menuId);
        console.log(this.extraData);
      } else {
        this.$message.warning('请选择编辑的行');
      }
    },
    cancelEditHandler () {
      this.isEdit = false;
      this.extraData.selectionRowIds = [];
      this.$refs.testTable.clearSelection()
      this.extraData.tableListData = JSON.parse(JSON.stringify(this.tempList))
    },
    async confirmEditHandler () { 
      // 保存
      let f 
      let list = JSON.parse(JSON.stringify(this.selectionRowList))
      for (let i = 0; i < list.length; i++) {
        list[i].adminUserName = list[i].adminUserId.map(e => this.extraData.nameListKV[+e].nameZh).join(",")
        list[i].adminUserId = list[i].adminUserId ? list[i].adminUserId.join(",") : ""
        if(this.extraData.selectionRowIds.includes(list[i].menuId) && !list[i].adminUserId){
          f = list[i]
          break
        }
      }
      if(f) return this.$message.warning(`"${f.menuName}"模块的人员不能为空`)
      this.loading = true
      try {
        await saveModules(list,this.type)
        this.isEdit = false;
        this.query()
        this.extraData.selectionRowIds = [];
      } finally {
        this.loading = false
      }
    },
    changeNameHandler (scope,val) {
      const { row, $index } = scope
      console.log('row', row,$index,val);
      this.$set(this.extraData.tableListData[$index], "adminUserId", val)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
</style>