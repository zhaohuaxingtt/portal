<template>
    <div style="padding-bottom:30px;">
        <div class="searchBox">
            <iSearch @sure="handleSubmitSearch"
                    @reset="handleSearchReset">
                <el-form :inline="true" ref="searchForm" :model="searchForm" label-position="top" class="demo-form-inline leftBox">
                    <el-form-item style="marginRight:68px;width:180px" :label="language('LINGJIANHAO', '零件号')" class="formItem">
                        <iInput
                                v-model="searchForm.partNum"
                                :editPlaceholder="language('QINGSHURU','请输入')"
                                :placeholder="language('QINGSHURU','请输入')">
                        </iInput>
                    </el-form-item>
                </el-form>
            </iSearch>
        </div>
        <el-divider class="margin-top20"></el-divider>
        <div class="BtnTitle">
            <span>{{language("LINGJIANZHONGXINLIEBIAO","零件中心列表")}}</span>
            <div>
                <iButton @click="save">{{language('XUANZE', '选择')}}</iButton>
            </div>
        </div>
        <tableList
            class="margin-top20"
            ref="moviesTable"
            @handleSelectionChange="handleSelectionChange"
            :tableData="tableListData"
            :tableTitle="tableTitleInfor"
            :tableLoading="loading"
            :index="true">
        </tableList>
        <iPagination @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :current-page="page.currPage"
                   :total="page.totalCount"
                   :layout="page.layout">
        </iPagination>
    </div>
</template>

<script>
import { iInput,iPagination,IButton,iMessage,iSearch } from "rise";
import tableList from '@/components/commonTable/index.vue';
import { pageMixins } from "@/utils/pageMixins"
import { partNumberTitle } from "./data";
import {
  partInfoPaged
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails';

export default {
    name:"partNumber",
    components:{
        iInput,
        iPagination,
        IButton,
        iMessage,
        tableList,
        iSearch
    },
    mixins:[pageMixins],
    data(){
        return{
            searchForm:{},
            handleSelectArr:[],
            tableListData:[],
            tableTitleInfor:partNumberTitle,
            loading:false,
        }
    },
    created(){
        this.getTableList();
    },
    methods:{
        getTableList(val){
            this.loading = true;
            partInfoPaged({
                current: this.page.currPage,
                size: this.page.pageSize,
                ...this.searchForm
            }).then(res=>{
                this.tableListData = res.data;
                this.page.currPage = res.pageNum
                this.page.pageSize = res.pageSize;
                this.page.totalCount = res.total;
                this.loading = false;
            })
        },
        handleSearchReset(){
            this.searchForm = {};
            this.page.currPage = 1;
            this.page.pageSize = 10;
            this.getTableList();
        },
        handleSubmitSearch () {
            this.page.currPage = 1;
            this.page.pageSize = 10;
            this.getTableList();
        },
        handleSelectionChange(val){
            if (val.length > 1) {
                var duoxuans = val.pop();
                this.handleSelectArr = val.pop();
                //清除所有选中
                // this.$refs.moviesTable.clearSelection();
                this.$refs.moviesTable.$children[0].$children[0].clearSelection()
                //给最后一个加上选中
                // this.$refs.moviesTable.toggleRowSelection(duoxuans);
                this.$refs.moviesTable.$children[0].$children[0].toggleRowSelection(duoxuans)
            } else {
                this.handleSelectArr = val
            }
        },
        save(){
            if(this.handleSelectArr.length==0){
                iMessage.error(this.language("QXZYTLJHSJ","请选择一条零件号数据！"))
                return false;
            }
            this.$emit("close",this.handleSelectArr[0].partNum);
        },
    }
}
</script>

<style lang="scss" scoped>
.searchBox {
  position: relative;
  display:flex;
  justify-content: space-between;
  .searchButton {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 100;
  }
}
.BtnTitle{
  margin-top:30px;
  margin-bottom:30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span{
    font-size: 18px;
    font-weight: bold;
  }
}
::v-deep .cardBody{
  margin:0!important;
  padding:0!important;
}
::v-deep .card{
  box-shadow: 0 0 0px rgb(27 29 33 / 0%)
}

::v-deep .el-icon-arrow-up{
    display: none;
}
::v-deep .operation{
    margin-top:30px!important;
}
</style>