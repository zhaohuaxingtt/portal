<template>
    <div v-loading="loading">
        <LayHeader title="流程管理"></LayHeader>
        <div class="flex justify-between items-center mt20">
            <div class="title">{{detail.name}} <i class="cursor el-icon-download"></i></div>
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
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="1"
                layout="prev, pager, next, jumper"
                :total="detail.pageIds.length">
                </el-pagination>
        </div>
        <div class="mt20 flex">
            <div class="flex-1 mr20">
                <div class="card-l mb20">
                    <div class="content" v-html="pageDetail.richContent"></div>
                    <div class="card-bottom flex justify-between items-center">
                        <span><i class="el-icon-view"></i> {{pageDetail.pageView}}</span>
                        <!-- <span>分页</span> -->
                         <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="1"
                            layout="prev, pager, next, jumper"
                            :total="detail.pageIds.length">
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
               <UiCard title="ProD文档" class="process-img" nameKey="title" :list="detail.proDocsList" :color="false" @row-click="side($event, 'prod')">
                   <div slot="item-right" slot-scope="{data}">
                       {{data.publishTime}}
                   </div>
               </UiCard>
               <UiCard title="流程图" class="process-img" :color="false" :list="list" @row-click="side($event, 'img')">
                   <div slot="content" class="draw cursor" @click="view('img')">
                       <img style="width:100%" src="http://cnsvwshvm1416.csvw.com/upload/2021/12/16/FlowChart_150/%E4%B8%BB%E6%B5%81%E7%A8%8B%E5%9B%BE.png" alt="">
                   </div>
                </UiCard>
               <UiCard title="系统操作" class="process-img" :color="false" :list="list" @row-click="side($event, 'img')">
                   <div slot="head-right" class="video-btn cursor" @click="view('video')">
                       <i class="el-icon-video-play"></i>
                       视频
                   </div>
                   <template slot="content">
                        <div class="draw cursor">
                            <img style="width:100%" src="http://cnsvwshvm1416.csvw.com/upload/2021/12/16/FlowChart_150/%E4%B8%BB%E6%B5%81%E7%A8%8B%E5%9B%BE.png" alt="">
                        </div>
                        <div class="file-tlt">流程附件</div>
                        <div class="flex row cursor">
                            <span>name</span>
                            <span>ProCS-CS...   2018/08/17</span>
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
    export default {
        components:{
            LayHeader,
            UiCard,
            iButton,
            expertInfo,
            iQuestion,
            iDialog
        },
        data() {
            return {
                list:[
                    {name:'TFW生产运营绩效评价管理办法',id:1},
                    {name:'TFW生产运营绩效评价管理办法',id:1},
                    {name:'TFW生产运营绩效评价管理办法',id:1}
                ],
                detail:{},
                showInput: false,
                val: "",
                showInfo: false,
                exInfo:{},
                currentPage: 1,
                dialog:{
                    show:false,
                    type:'img',
                    url:""
                },
                loading: false,
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
                this.sampleList = await queryPageSample(this.detail.pageIds[0])
            },
            // 流程问题
            async queryPageFAQ(id){
                let res = await queryPageFAQ(id)
                this.faqList = res.content
            },
            async getPageDetail(id){
                this.pageDetail = await getWorkFlowPage(id)
            },
            async queryFAQ() {
                this.queryPageFAQ(this.detail.pageIds[0])
            },
            side(){
                
            },
            // 专家信息
            openExpert(info){
                this.exInfo = info
                this.showInfo = true
            },
            handleSizeChange(v){
                console.log(v);
            },
            handleCurrentChange(v){
                console.log(v);
            },
            view(t){
                this.dialog.type = t
                if(t == "img"){
                    this.dialog.url = "http://cnsvwshvm1416.csvw.com/upload/2021/12/16/FlowChart_150/%E4%B8%BB%E6%B5%81%E7%A8%8B%E5%9B%BE.png"
                }else{
                    this.dialog.url = "http://cnsvwshvm1416.csvw.com/upload/2018/07/30/Attachment_56604_path.mp4?t=0.33881052792501865"
                }
                this.dialog.show = true
            },
            closeDialog(){
                this.$refs.video && this.$refs.video.pause()
                this.dialog.show = false
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