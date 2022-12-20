<template>
  <div style="padding-bottom: 20px;">
    <iSearch
      @sure="sure"
      @reset="reset"
      >
      <el-form>
        <el-form-item :label="$t('LK_GONGYINGSHANGMINGCHENG1')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.supplierName"></iInput>
        </el-form-item>
        <el-form-item :label="$t('组织机构代码')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.agencyCode"></iInput>
        </el-form-item>
        <el-form-item :label="$t('SUPPLIER_KESHI')">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.dept" multiple clearable filterable collapse-tags>
                <el-option :value="item.deptId"
                            :label="item.commodity"
                            v-for="item of keshiList"
                            :key="item.deptId">
                </el-option>
            </iSelect>
        </el-form-item>
        <el-form-item :label="$t('添加来源')">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.addType" filterable clearable>
                <el-option :value="item.value"
                            :label="$i18n.locale === 'zh'  ? item.label : item.labelE"
                            v-for="item of addFrom"
                            :key="item.value">
                </el-option>
            </iSelect>
        </el-form-item>
        <el-form-item :label="$t('添加时间起止')">
            <iDatePicker value-format="yyyy-MM-dd"
              type="daterange"
              v-model="timeSE" />
        </el-form-item>
      </el-form>
    </iSearch>

    <iCard class="margin-top20" :title="$t('舆情供应商清单')">
      <template v-slot:header-control>
        <iButton @click="addBingo" :loading="addLoading">{{ $t('LK_TIANJIA') }}</iButton><!-- 添加 -->
        <iButton @click="cancelClose">{{ $t('MT_QUXIAO') }}</iButton><!-- 取消 -->
      </template>
      <tableList
        :tableData="tableListData"
        :tableTitle="tableSetTitle"
        :tableLoading="tableLoading"
        border
        @handleSelectionChange="handleSelectionChange"
        :index="true">
        <template #addType="scope">
          <span>{{(scope.row.addType==1?"手动添加":scope.row.addType==2?"初步评级":scope.row.addType==3?"手工导入":"")}}</span>
        </template>
      </tableList>
      <iPagination
          v-update
          class='pagination'
          @size-change='handleSizeChange($event,getData)'
          @current-change='handleCurrentChange($event,getData)'
          background
          :current-page='page.currPage'
          :page-sizes='page.pageSizes'
          :page-size='page.pageSize'
          :layout='page.layout'
          :total='page.totalCount'
        />
    </iCard>
  </div>
</template>

<script>
import { iSearch,iInput,iSelect,iDatePicker,iCard,iButton,iPagination,iMessage } from "rise";
import { pageMixins } from '@/utils/pageMixins'
import { tableSetTitle } from "../data"
import tableList from '@/components/commonTable/index.vue';

import {
    getSentimentSupplierList,
    addFollow,
    getDeptList
} from "@/api/supplierManagement/yuqingjiance"

export default {
    mixins: [pageMixins],
    components:{
        iSearch,
        iInput,
        iSelect,
        iDatePicker,
        iCard,
        iButton,
        iPagination,
        tableList
    },
    data(){
        return{
            tableSetTitle,
            tableListData:[],
            form:{
                supplierName:"",
                agencyCode:"",
                dept:[],
                addType:"",
            },
            timeSE:[],
            addFrom:[
                {
                value:"1",
                label:"手动添加",
                labelE:"Add Manually"
                },{
                value:"2",
                label:"初步评级",
                labelE:"Preliminary rating"
                },{
                value:"3",
                label:"手工导入",
                labelE:"Manual import"
                },
            ],
            keshiList:[],
            tableLoading:false,
            addLoading:false,
            selectList:[],
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            await this.getDept()
            this.getData();
        },
        getDept(){
            getDeptList().then(res=>{
                if(res.result){
                    this.keshiList = res.data;
                }
            })
        },
        sure(){
            this.page.pageSize = 10;
            this.page.currPage = 1;
            this.getData();
        },
        reset(){
            this.form = {
                supplierName:"",
                agencyCode:"",
                dept:[],
                addType:"",
            }
            this.timeSE = [];
            this.page.pageSize = 10;
            this.page.currPage = 1;
            this.getData();
        },
        addBingo(){
            this.addLoading = true;
            if(this.selectList.length<1){
                iMessage.error(this.$t("请选择需要添加的舆情供应商"))
                this.addLoading = false;
            }else{
                const list = this.selectList.map(function(e){
                    return e.id
                });
                addFollow({
                    ids:list
                }).then(res=>{
                    if(res.result){
                        iMessage.success(this.$t(res.desZh))
                        this.$emit("addSave")
                    }else{
                        iMessage.error(this.$t(res.desZh))
                    }
                    this.addLoading = false;
                }).catch(e=>{
                    this.addLoading = false;
                })
            }
        },
        cancelClose(){
            this.$emit("addCancel")
        },
        handleSelectionChange(val){
            this.selectList = val;
        },
        getData(){
            this.tableLoading = true;
            const obj = {
                ...this.form,
                beginTime:this?.timeSE[0]?this.timeSE[0]:"",
                endTime:this?.timeSE[1]?this.timeSE[1]:"",
                size:this.page.pageSize,
                current:this.page.currPage,
            }
            getSentimentSupplierList(obj).then(res=>{
                if(res.result){
                    this.tableListData = res.data;
                    this.page.pageSize = res.pageSize
                    this.page.currPage = res.pageNum
                    this.page.totalCount = res.total
                }
                this.tableLoading = false;
            }).catch(e=>{
                this.tableLoading = false;
            })
        }
    }
}
</script>

<style>

</style>