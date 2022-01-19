<template>
    <div>
       <LayHeader title="词条管理"></LayHeader>

        <div class="flex glossary">
            <div class="card-l">
                <IndexList class="indexs"
                    title="Glossary" 
                    :loading.sync="indexs.loading"
                    :data="indexs.data" 
                    :indexIcon="false"
                    @click-index="indexChange"
                    @row-click="indexRowChange"
                    >
                </IndexList>
            </div>
            <div class="glossary-content">
                <iInput placeholder="Search for MORE" v-model="keyword" @keydown.native.enter="queryGlossary">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click.native="queryGlossary" style="color:#1763F7"></i>
                </iInput>
                <iCard class="mt20 glossary-card" v-loading="loading">
                    <div class="flex row-line justify-between">
                        <span class="tlt" v-text="detail.title"></span>
                        <span>{{detail.version}}  {{detail.publishDate}}</span>
                    </div>
                    <div class="content row-line">
                        <img style="margin:10px" v-for="atc in detail.attachMents" class="cursor" :key="atc.id" :src="fileFmt(atc.url)" alt="" @click="view(atc.url)">
                        <div v-html="detail.termsContent"></div>
                    </div>
                    <div v-if="detail.workFlows">
                        <p class="link-row">关联流程</p>
                        <div class="link-row flex justify-between" v-for="(w,index) in detail.workFlows" :key="w.id">
                            <span class="flex-2 ellipsis mr20">{{`${index + 1}、${w.name}`}}</span>
                            <div class="flex-1 flex justify-between"> 
                                <span class="mr20 ellipsis flex-1">{{w.version}} {{timeFmt(w.updatedAt)}}</span>
                                <span> <i class="el-icon-view"></i> {{w.pageView}}</span>
                            </div>
                        </div>
                    </div>
                </iCard>
            </div>
        </div>
        <imgViews :list="imgList" ref="imgView"></imgViews>
    </div>
</template>

<script>
	import { iInput, iCard } from 'rise';
    import LayHeader from "./../components/LayHeader"
    import IndexList from "./../components/IndexList"
    import {glossaryList,queryGlossaryDetail} from '@/api/procs';
    import imgViews from './../components/imgViews'
    import moment from 'moment';
    export default {
       components:{
           LayHeader,
           iCard,
           iInput,
           IndexList,
           imgViews
       } ,
       data() {
           return {
                keyword: "",
                indexs: {
                    loading: false,
                    data:{}
                },
                loading:false,
                detail:{}
           }
       },
       created(){
           this.queryGlossary()
       },
       computed:{
           imgList(){
               return this.detail.attachMents ? this.detail.attachMents.map(e => this.fileFmt(e.url)) : []
           }
       },
       methods: {
            async queryGlossary(){
                try {
                    this.indexs.loading = true
                    let list = await glossaryList(this.keyword)
                    let obj = {}
                    list.forEach(e => {
                        if(!obj[e.firstLetter]){
                            obj[e.firstLetter] = []
                        }
                        obj[e.firstLetter].push(e)
                    })
                    this.indexs.data = obj
                } finally {
                    this.indexs.loading = false
                }
            },
            indexChange(index){
                console.log(index);
            },
            async indexRowChange(id){
                try {
                    this.loading = true
                    this.detail = await queryGlossaryDetail(id)

                } finally {
                    this.loading = false
                }
            },
            view(url){
                this.$refs.imgView.show(this.fileFmt(url))
            },
            fileFmt(url){
                if(url && url.includes("/uploader/")){
                    return url.split("/uploader/")[1]
                }
                return ""
            },
            timeFmt(time){
                let difference = new Date() - new Date(time).getTime();
                let difference1 = Math.floor(difference / 1000 / 60 / 60 / 24);
                return difference1 < 14 ? `最后更新 ${difference1}前` : `最后更新 ${moment(new Date(time)).format("YYYY-MM-DD")}`
            }
       }
    }
</script>

<style lang="scss" scoped>
@import "./../comon";



.glossary{
    width: 100%;
    margin-top: 20px;


    .card-l{
        width: 450px;
    }
    .indexs{
        height: 600px;
    }
    .glossary-card{
        ::v-deep .cardBody{
            padding: 0;
            // height: 100%;
        }
        & ::v-deep > div{
            // height: 100%;
            overflow: hidden;
        }
    }

    .row-line{
        padding: 15px 20px;
        border-bottom: 1px solid #BBC4D6;
    }
    .glossary-content{
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .content{
            border-bottom:none;
            padding: 25px 20px;
            word-break: break-word;
        }        

        .link-list{
            border-top: 1px solid #BBC4D6;
        }
        .link-row{
            margin: 15px;
        }
    }
}
.tlt{
    font-weight: bold;
    font-size: 18px;
}
</style>