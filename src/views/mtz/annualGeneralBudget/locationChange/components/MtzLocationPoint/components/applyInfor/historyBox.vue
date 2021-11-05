<!-- 历史 -->
<template>
    <div style="padding-bottom:30px;">
        <div class="searchBox">
            <el-form :inline="true" ref="searchForm" :model="searchForm" label-position="top" class="demo-form-inline leftBox">
                <el-form-item style="marginRight:68px;width:180px" :label="language('LINGJIANHAO', '零件号')" class="formItem">
                    <inputCustom v-model="searchForm.partNum"
                            :editPlaceholder="language('QINGSHURU','请输入')"
                            :placeholder="language('QINGSHURU','请输入')">
                    </inputCustom>
                </el-form-item>

                <el-form-item style="marginRight:68px;width:180px" :label="language('LINGJIANMING','零件名')" class="formItem">
                    <inputCustom v-model="searchForm.nominateId"
                                :editPlaceholder="language('QINGSHURU','请输入')"
                                :placeholder="language('QINGSHURU','请输入')">
                    </inputCustom>
                </el-form-item>

                <el-form-item style="marginRight:68px;width:180px" :label="language('GONGYINGSHANGSAPHAO','供应商SAP号')" class="formItem">
                    <inputCustom v-model="searchForm.rfqId"
                                :editPlaceholder="language('QINGSHURU','请输入')"
                                :placeholder="language('QINGSHURU','请输入')">
                    </inputCustom>
                </el-form-item>

                <el-form-item style="marginRight:68px;width:180px" :label="language('GONGYINGSHANGMINGCHENG','供应商名称')">
                    <inputCustom v-model="searchForm.rfqI11d"
                                :editPlaceholder="language('QINGSHURU','请输入')"
                                :placeholder="language('QINGSHURU','请输入')">
                    </inputCustom>
                </el-form-item>

                <el-form-item style="marginRight:68px;width:180px" :label="language('YAUNCAILIAOPAIHAO','原材料牌号')">
                    <inputCustom v-model="searchForm.rfqI11111d"
                                :editPlaceholder="language('QINGSHURU','请输入')"
                                :placeholder="language('QINGSHURU','请输入')">
                    </inputCustom>
                </el-form-item>

                <el-form-item style="marginRight:68px;width:180px" :label="language('GUIZEBIANHAO','规则编号')" class="formItem">
                    <inputCustom v-model="searchForm.fsnrGsnrNum"
                                :editPlaceholder="language('QINGSHURU','请输入')"
                                :placeholder="language('QINGSHURU','请输入')">
                    </inputCustom>
                </el-form-item>

                <el-form-item style="marginRight:68px;width:180px" :label="language('KESHI','科室')" class="formItem">
                    <custom-select v-model="searchForm.carTypeP111roj"
                                    :user-options="getLocationA11pplyStatus11"
                                    clearable
                                    :placeholder="language('QINGXUANZE', '请选择')"
                                    display-member="name"
                                    value-member="code"
                                    value-key="code">
                    </custom-select>
                </el-form-item>

                <el-form-item style="marginRight:68px;width:180px" :label="language('CAIGOUYUAN','采购员')" class="formItem">
                    <inputCustom v-model="searchForm.buyerName"
                                :editPlaceholder="language('QINGSHURU','请输入')"
                                :placeholder="language('QINGSHURU','请输入')">
                    </inputCustom>
                </el-form-item>
                
                <el-form-item style="marginRight:68px;width:180px" :label="language('SHICHANGJIALAIYUAN','市场价来源')" class="formItem">
                    <custom-select v-model="searchForm.carType111P111roj"
                                    :user-options="getLocationA11p222plyStatus11"
                                    clearable
                                    :placeholder="language('QINGXUANZE', '请选择')"
                                    display-member="name"
                                    value-member="code"
                                    value-key="code">
                    </custom-select>
                </el-form-item>

                <el-form-item style="marginRight:68px;width:180px" :label="language('YOUXIAOQIQI','有效期起')" class="formItem">
                    <iDatePicker v-model="searchForm.star22tDate"
                            type="datetime"
                            >
                    </iDatePicker>
                </el-form-item>

                <el-form-item style="marginRight:68px;width:180px" :label="language('YOUXIAOQIZHI', '有效期止')" class="formItem">
                    <iDatePicker v-model="searchForm.startDa11te"
                            type="datetime"
                            >
                    </iDatePicker>
                </el-form-item>

                <el-form-item style="marginRight:68px;width:180px" :label="language('BUCHAZHOUQI', '补差周期')" class="formItem">
                    <custom-select v-model="searchForm.singleSourcing"
                                :user-options="getSecondSupplierList"
                                clearable
                                :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                                display-member="message"
                                value-member="code"
                                value-key="code">
                    </custom-select>
                </el-form-item>
            </el-form>
            <div class="searchButton">
                <iButton @click="handleSubmitSearch">{{language('CX', '查询')}}</iButton>
                <iButton @click="handleSearchReset('searchForm')">{{language('CZ', '重置')}}</iButton>
            </div>
        </div>
        <el-divider class="margin-top20"></el-divider>
        <div class="BtnTitle">
            <div style="display:flex;align-items:center;">
                <span style="margin-right:10px;">{{language("ZHIKANZIJI","只看自己")}}</span>
                <el-switch v-model="switchValue"
                     @change="changeSwitch" />
            </div>
            <div>
                <iButton @click="save">{{language('TIANJIA', '添加')}}</iButton>
            </div>
        </div>
        <tableList
            class="margin-top20"
            :tableData="tableData"
            :tableTitle="tableTitle"
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
import { iDatePicker, iMessage,iButton,iPagination } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { tableTitleHistory } from "./data";
import inputCustom from '@/components/inputCustom'
import tableList from '@/components/commonTable/index.vue';



export default {
    name:"",
    components:{
        iDatePicker,
        iButton,
        iPagination,
        inputCustom,
        tableList
    },
    mixins: [pageMixins],
    data(){
        return{
            searchForm:{},
            getLocationA11pplyStatus11:[],
            getLocationA11p222plyStatus11:[],

            tableData:[],
            tableTitle:tableTitleHistory,
            loading:false,
            switchValue:false,
        }
    },
    created(){

    },
    methods:{
        handleSubmitSearch(){

        },
        handleSearchReset(){

        },

        getTableList(){

        },
        changeSwitch(val){
            console.log(val);
        },

        save(){

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

.leftBox{
  margin-right: 200px;
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
</style>