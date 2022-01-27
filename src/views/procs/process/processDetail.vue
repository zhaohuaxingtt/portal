<template>
    <div v-loading="loading">
        <LayHeader title="流程管理"></LayHeader>
        <div class="flex justify-between items-center mt20">
            <div class="title">{{detail.name}} 
                <el-popover
                    placement="right"
                    trigger="click">
                    <div class="cursor" v-for="file in detail.workFlowFile" :key="file.id" style="margin:10px 0;" @click="downAttach(file.attachMents[0] ? file.attachMents[0].url : '')">{{file.name}}  {{file.publishDate}}</div>
                    <span slot="reference"><i class="cursor el-icon-download"></i></span>
                </el-popover>    
            </div>
            <div class="expert">
                <div class="flex">
                    <span>流程专家： </span>
                    <span class="name" v-for="item in detail.experts" :key="item.id" @click="openExpert(item)">{{item.name}}</span>
                </div>
                <div>版本：{{detail.version}} 最后更新 {{detail.updateDt}}</div>
            </div>
        </div>

        <div class="subtitle">
            <div class="tlt">{{pageDetail.name}}</div>
            <!-- <div>分页</div> -->
             <el-pagination
                @current-change="handlePageChange"
                :current-page.sync="currentPage"
                :page-size="1"
                layout="prev, pager, next, jumper"
                :total="detail.pageIds ? detail.pageIds.length : 0">
                </el-pagination>
        </div>
        <div class="mt20 flex">
            <div class="flex-1 mr20" v-loading="pageLoading">
                <div class="card-l mb20">
                    <div class="content" v-html="pageDetail.richContent"></div>
                    <div class="card-bottom flex justify-between items-center">
                        <span><i class="el-icon-view"></i> {{pageDetail.pageView}}</span>
                        <!-- <span>分页</span> -->
                         <el-pagination
                            @current-change="handlePageChange"
                            :current-page.sync="currentPage"
                            :page-size="1"
                            layout="prev, pager, next, jumper"
                            :total="detail.pageIds ? detail.pageIds.length : 0">
                            </el-pagination>
                    </div>
                </div>
                 <UiCard title="常见问题" v-if="faqList.length > 0" class="process-img" :color="false">
                    <iButton slot="head-right">MORE</iButton>
                    <template slot="content">
                        <iQuestion :list="faqList" @queryFAQ="queryFAQ"></iQuestion>
                    </template>
                </UiCard>
            </div>
            <div class="side">
               <UiCard title="ProD文档" class="process-img" nameKey="title" :list="detail.proDocsList" :color="false" @row-click="openDoc">
                   <div slot="item-right" slot-scope="{data}">
                       {{data.publishTime}}
                   </div>
               </UiCard>
               <UiCard title="流程图" class="process-img" :color="false" :list="list">
                   <div slot="content" class="draw cursor" @click="view('img',detail.flowChart.filePath)">
                       <img style="width:100%" :src="detail.flowChart ? detail.flowChart.filePath : ''" alt="">
                   </div>
                </UiCard>
               <UiCard title="系统操作" class="process-img" :color="false" :list="list">
                   <div slot="head-right" class="video-btn cursor" @click="view('video')">
                       <i class="el-icon-video-play"></i>
                       视频
                   </div>
                   <template slot="content">
                        <div class="draw cursor">
                            <img style="width:100%" :src="pageDetail.attachMentsKV && pageDetail.attachMentsKV['operatorImage'] && fileFmt(pageDetail.attachMentsKV['operatorImage'].url)" alt="">
                        </div>
                        <div class="file-tlt">流程附件</div>
                        <div class="flex row cursor" v-for="l in sampleList" :key="l.id" @click="downAttach(l.attachMents[0] ? l.attachMents[0].url : '')">
                            <span>{{l.name}}</span>
                            <span>{{l.version}}   {{l.publishDate}}</span>
                        </div>
                   </template>
                </UiCard>
            </div>
        </div>
        <!-- 专家信息 -->
        <expertInfo :show.sync="showInfo" :info="exInfo"></expertInfo>

        <iDialog
            :title="dialog.type == 'img' ? '流程图' : '视频'"
            :visible.sync="dialog.show" 
            width="70%" 
            @close='closeDialog' 
            append-to-body
        >
            <div class="pb20">
                <img style="width:100%" v-if="dialog.type == 'img'" :src="dialog.url" alt="">
                <video style="width:100%" ref="video" controls v-else :src="dialog.url"></video>
            </div>
        </iDialog>
    </div>
</template>

<script>
    import LayHeader from "./../components/LayHeader.vue";
    import UiCard from "./../components/UiCard.vue";
    import {iButton, iDialog} from 'rise';
    import expertInfo from './components/expertInfo';
    import iQuestion from './components/iQuestion.vue';
    import {getWorkFlow,queryPageSample, queryPageFAQ, getWorkFlowPage} from '@/api/procs';
    import mixin from './../mixins';
    export default {
        components:{
            LayHeader,
            UiCard,
            iButton,
            expertInfo,
            iQuestion,
            iDialog
        },
        mixins:[mixin],
        data() {
            return {
                list:[
                    {name:'TFW生产运营绩效评价管理办法',id:1},
                    {name:'TFW生产运营绩效评价管理办法',id:1},
                    {name:'TFW生产运营绩效评价管理办法',id:1}
                ],
                detail:{},
                showInfo: false,
                exInfo:{},
                currentPage: 1,
                dialog:{
                    show:false,
                    type:'img',
                    url:""
                },
                loading: false,
                pageLoading: false,
                id: this.$route.query.id,
                sampleList:[],
                faqList:[],

                pageDetail:{}
            }
        },
        created () {
            this.queryDetail()
        },
        methods: {
            // 详情
            async queryDetail(){
                this.loading = true
                try {
                   this.detail = await getWorkFlow(this.id)
                    this.queryPageSample()
                    this.getPageDetail(this.detail.pageIds[0])
                    this.queryPageFAQ(this.detail.pageIds[0])
                } finally {
                    this.loading = false
                }
            },
            // 流程附件
            async queryPageSample(){
                let res = await queryPageSample(this.detail.pageIds[0])
                this.sampleList = res.content
            },
            // 流程问题
            async queryPageFAQ(id){
                let res = await queryPageFAQ(id)
                this.faqList = res.content
            },
            // 流程页面详情
            async getPageDetail(id){
                this.pageLoading = true
                try {
                    this.pageDetail = await getWorkFlowPage(id)
                    if(this.pageDetail.attachMents){
                        this.pageDetail.attachMentsKV = {}
                        this.pageDetail.attachMents.forEach(e => {
                            this.pageDetail.attachMentsKV[e.name] = e
                        })
                    }
                } finally {
                    this.pageLoading = false
                }
            },
            async queryFAQ() {
                this.queryPageFAQ(this.detail.pageIds[0])
            },
            side(){},
            openDoc(row){
                window.open(row.docUrl)
            },
            // 专家信息
            openExpert(info){
                this.exInfo = info
                this.showInfo = true
            },
            handlePageChange(curPage){
                console.log(curPage);
                this.getPageDetail(this.detail.pageIds[curPage - 1])
            },
            view(t,url){
                this.dialog.type = t
                if(t == "img"){
                    this.dialog.url = url
                }else{
                    let url = this.pageDetail.attachMentsKV["operatorVideo"].url
                    this.dialog.url = this.fileFmt(url)
                }
                this.dialog.show = true
            },
            closeDialog(){
                this.$refs.video && this.$refs.video.pause()
                this.dialog.show = false
            },
            downAttach(url){
                if(!url) return
                window.open(url)
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "./../comon";

$line-color: #BBC4D6;
.title{
    font-size: 24px;
    font-weight: bold;
}
.expert{
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .name{
        margin-right: 10px;
        color: #666;
        cursor: pointer;
        &:hover{
            color: #1660F1;
        }
    }
}

.subtitle{
    margin-top: 10px;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid $line-color;
    border-bottom: 1px solid $line-color;
    .tlt{
        font-size: 18px;
        color: #1660F1;
        font-weight: bold
    }
}

.process-img{
    height: auto !important;
    .draw{
        padding: 10px 20px;
    }

    .file-tlt{
        padding: 10px 20px;
        border-bottom: 1px solid $line-color;
    }

    .row{
        padding: 20px;
        justify-content: space-between;
        align-items: center;
    }
}
.video-btn{
    color: #1660F1;
    i{
        font-size: 20px;
    }
}
.card-l{
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
    border-radius: 10px;
    .content{
        padding: 20px;
    }

    .card-bottom{
        padding: 20px;
        border-top: 1px solid $line-color;
    }

}

.side{
    width: 450px;
}
</style>