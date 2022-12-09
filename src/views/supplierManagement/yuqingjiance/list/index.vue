<template>
    <iPage>
        <headerNav/>
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
                <el-form-item :label="$t('内容分类')">
                    <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.category" multiple clearable filterable collapse-tags>
                        <el-option :value="item.code"
                                    :label="item.value"
                                    v-for="item of importList"
                                    :key="item.code">
                        </el-option>
                    </iSelect>
                </el-form-item>
                <el-form-item :label="$t('情感类型')">
                    <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.emotionType" multiple clearable filterable collapse-tags>
                        <el-option :value="item.value"
                                    :label="$i18n.locale === 'zh'  ? item.name : item.nameEn"
                                    v-for="item of checkList"
                                    :key="item.value">
                        </el-option>
                    </iSelect>
                </el-form-item>
                <el-form-item :label="$t('发布日期起止')">
                    <iDatePicker value-format="yyyy-MM-dd"
                     type="daterange"
                     v-model="fabuTime" />
                </el-form-item>

            </el-form>
        </iSearch>

        <iCard class="margin-top20">
            <div class="margin-bottom20 clearFloat">
                <div class="floatleft" style="margin-top:5px;">
                    <el-switch v-model="form.onlyMy" :active-text="$t('仅看我关注的供应商')" @change="changeSelfHandle"></el-switch>
                </div>

                <div class="floatright">
                    <iButton @click="handleNotRated">{{ $t('设置供应商') }}</iButton>
                    <iButton @click="download" :loading="loading">{{ $t('LK_XZMB') }}</iButton><!-- 下载导入模板 -->
                    <el-upload class="upload"
                                style="display:inline-block;margin:0 10px;"
                                :show-file-list="false"
                                name="multipartFile"
                                with-credentials
                                :on-success="handleAvatarSuccess"
                                :http-request="myUpload">
                        <iButton>{{ $t('DAORU') }}</iButton>
                    </el-upload>
                    <iButton @click="exportAll" :loading="exportType">{{ $t('SUPPLIER_DAOCHUQUANBU') }}</iButton>
                    <iButton @click="delSupplier">{{ $t('删除') }}</iButton>
                </div>
            </div>

            <tableList
                ref="tableListRef"
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                border
                >
                <template #title="scope">
                    <span @click="handleOpenPage(scope.row)" style="cursor: pointer;color:rgb(23, 99, 247)">{{scope.row.title}}</span>
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
    </iPage>
</template>

<script>
import { iPage,iSearch,iInput,iSelect,iDatePicker,iCard,iButton,iPagination,iMessage,iMessageBox } from "rise"
import headerNav from "../components/headerNav"
import { tableTitle } from "./data"
import tableList from '@/components/commonTable/index.vue';
import { pageMixins } from '@/utils/pageMixins'
import {
    newsPageList,
    getDeptList,
    getContentTypeList,
    sentimentMonitoringExport,
    sentimentMonitoringGetTemplate,
    sentimentMonitoringImport,
    sentimentMonitoringDelete
} from "@/api/supplierManagement/yuqingjiance"

export default {
    mixins: [pageMixins],
    components:{
        headerNav,
        iPage,
        iSearch,
        iInput,
        iSelect,
        iDatePicker,
        iCard,
        iButton,
        tableList,
        iPagination,
    },
    data(){
        return{
            checkList:[
                {
                    value:"1",
                    name:"消极",
                    nameEn:"negative",
                },{
                    value:"2",
                    name:"中立",
                    nameEn:"neutral",
                },{
                    value:"3",
                    name:"积极",
                    nameEn:"positive",
                },
            ],
            tableLoading:false,
            tableTitle,
            tableListData:[],
            form:{
                supplierName:"",
                agencyCode:'',
                dept:[],
                category:[],
                emotionType:[],
                onlyMy:false,
            },
            fabuTime:[],
            keshiList:[],
            importList:[],
            selfOnly:true,
            selectList:[],
            exportType:false,
            loading:false,
        }
    },
    created(){
        this.init();
    },
    methods:{
        changeSelfHandle(val){
            this.form.onlyMy = val;
            this.page.currPage = 1;
            this.page.pageSize = 10;
            this.getData();
        },
        handleNotRated(){
            this.$router.push({path: '/supplier/frmrating/publicOpinion/setting'})
        },
        delSupplier(){
            if(this.selectList.length>0){
                iMessageBox(this.$t("LK_SHIFOUQUERENSHANCHU")).then(() => {
                    const list = this.selectList.map(function(e){
                        return e.id
                    })
                    sentimentMonitoringDelete({
                        ids:list
                    }).then(res=>{
                        if(res.result){
                            iMessage.success(this.$t(res.desZh))
                            this.getData();
                        }else{
                            iMessage.error(this.$t(res.desZh))
                        }
                    }).catch(e=>{

                    })
                }).catch((err) => {
                    console.log(err)
                })
            }else{
                iMessage.error(this.$t("请选择需删除的内容"))
            }
        },
        download(){
            this.loading = true;
            sentimentMonitoringGetTemplate().then(res=>{
                this.loading = false;
            }).catch(e=>{
                this.loading = false;
            })
        },
        async myUpload(content){
            const loading = this.$loading({
                lock: true,
            });
            const formData = new FormData();
            formData.append('file', content.file);
            const res = await sentimentMonitoringImport(formData);
            loading.close()
            if(res.result){
                iMessage.success(res.desZh);
                this.getData();
            }else{
                iMessage.error(res.desZh);
            }
        },
        handleAvatarSuccess(){

        },
        exportAll(){
            this.exportType = true;
            const obj = {
                ...this.form,
                beginTime:this?.fabuTime[0]?this.fabuTime[0]:"",
                endTime:this?.fabuTime[1]?this.fabuTime[1]:"",
                size:this.page.pageSize,
                current:this.page.currPage,
            }
            sentimentMonitoringExport(obj).then(res=>{
                this.exportType = false;
            }).catch(e=>{
                this.exportType = false;
                iMessage.error(this.$t("APPROVAL.OPERATION_FAILED"))
            })
        },
        async init(){
            await this.getDept();
            await this.getImport();
            this.getData();
        },
        getDept(){
            getDeptList().then(res=>{
                if(res.result){
                    this.keshiList = res.data;
                }
            })
        },
        getImport(){
            getContentTypeList().then(res=>{
                if(res.result){
                    this.importList = res.data;
                }
            })
        },
        getData(){
            this.tableLoading = true;
            const obj = {
                ...this.form,
                beginTime:this?.fabuTime[0]?this.fabuTime[0]:"",
                endTime:this?.fabuTime[1]?this.fabuTime[1]:"",
                size:this.page.pageSize,
                current:this.page.currPage,
            }
            newsPageList(obj).then(res=>{
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
        },
        sure(){
            this.page.currPage = 1;
            this.page.pageSize = 10;
            this.getData();
        },
        reset(){
            this.form = {
                supplierName:"",
                agencyCode:'',
                dept:[],
                category:[],
                emotionType:[],
                onlyMy:false,
            }
            this.fabuTime = [];
            this.page.currPage = 1;
            this.page.pageSize = 10;
            this.getData();
        },
        handleSelectionChange(val){
            this.selectList = val;
        },
        handleOpenPage(val){
            const routeData = this.$router.resolve({
                path: '/supplier/sentimentInfor',
                query: {
                    id:val.id
                }
            })
            window.open(routeData.href)
        },
    }
}
</script>

<style lang="scss" scoped>
::v-deep .cell>div{
  span:first-child{
    margin-right:0!important;
  }
}
</style>