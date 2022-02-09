<template>
  <!--加入集团-->
  <iDialog :title="$t('SPR_FRM_DEP_ADDGROUP')"
           :visible.sync="value"
           width="90%"
           @close="clearDiolog"
           destroy-on-close>
    <div class="content">
      <div class="flex-between-center margin-bottom20">
        <div class="flex-align-center">
          <span class="nowIndustry">{{$t('SPR_FRM_DEP_SELECTGROUP')}}</span>
          <iSelect :placeholder="$t('LK_QINGXUANZE')"
                   v-model="group"
                   value-key='id'
                   @change="getTableList">
            <el-option :value="item"
                       :label="item.deepCommentSupplierName"
                       v-for="item in financialSuppleData"
                       :key="item.id"></el-option>
          </iSelect>
        </div>
        <div class="flex-align-center">
          <!-- 提交 -->
          <iButton @click="addGroup">{{ $t('SPR_FRM_DEP_ADDGROUP') }}</iButton>
        </div>
      </div>
      <tableList :tableData="tableListData"
                 :selection='false'
                 :tableTitle="tableTitle"
                 :tableLoading="tableLoading"
                 :index="true">
        <template #deepCommentResult="scope">
          <icon v-if="scope.row.deepCommentResult == 'GREEN'"
                symbol
                name="iconlvdeng"></icon>
          <icon v-else-if="scope.row.deepCommentResult == 'YELLOW'"
                symbol
                name="iconhuangdeng"></icon>
          <icon v-else-if="scope.row.deepCommentResult == 'RED'"
                symbol
                name="iconhongdeng"></icon>
        </template>
        <template #approvalEndDate="scope">
          <span v-if="scope.row.status == '生效'||scope.row.status == '历史'"> {{scope.row.approvalEndDate}} </span>
        </template>
      </tableList>
      <iPagination v-update
                   @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   background
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :current-page='page.currPage'
                   :total="page.totalCount" />
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iPagination, iSelect, iMessage, icon } from 'rise';
import tableList from '@/components/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import { joinGroupTitle } from './data';
import { depSupplierList } from '@/api/frmRating/depthRating'
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iButton,
    iPagination,
    tableList,
    iSelect,
    icon
  },
  props: {
    value: {
      type: Boolean
    },
    financialSuppleData: {
      type: Array,
      default: () => []
    },
    ids: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tableTitle: joinGroupTitle,
      tableLoading: false,
      tableListData: [],
      // financialSuppleData:[],//集团打包数据
      group: {
        id: "",
        deepCommentSupplierName: ""
      }
    };
  },
  created () {
    // this.getTableList()
  },
  methods: {
    clearDiolog () {

      this.$emit('input', false);
    },
    addGroup () {
      if (!this.group.id) {
        iMessage.warn('请选择集团')
        return
      }
      let data = {
        isJoin: true,//true 加入， false 移除
        groupName: this.group.deepCommentSupplierName,//要加入或者移除的集团名称
        groupId: this.group.id,//要加入或者移除的集团ID
        deepSupplierIdList: this.ids,//加入时深评供应商主键，移除不用传
      }
      this.$emit('addGroup', data)
    },
    // 获取深评列表
    getTableList () {
      let data = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        deepCommentSupplierId: this.group.id
      }
      depSupplierList(data).then(res => {
        if (res.data) {
          this.page.currPage = res.pageNum;
          this.page.totalCount = res.total;
          this.tableListData = res.data
        }
      })
    },
    // // 集团打包
    // groupNameList(){
    // 	this.financialSuppleData=res.data
    // }
  },
};
</script>

<style scoped lang="scss">
.nowIndustry {
  width: 94px;
  margin-right: 30px;
}
.content {
  padding-bottom: 20px;
}

// .row1 {
// 	font-size: 14px;
// 	font-weight: 400;
// 	line-height: 16px;
// 	color: #000000;
// }

// .row2 {
// 	font-size: 14px;
// 	font-weight: 400;
// 	line-height: 16px;
// 	color: #999999;
// }

// .dialog-footer {
// 	margin-top: 30px;
// 	display: flex;
// 	justify-content: flex-end;
// }
</style>
