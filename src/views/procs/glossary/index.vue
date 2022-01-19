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
                        <span>{{detail.publishDate}}</span>
                    </div>
                    <div class="content row-line">
                        <img v-for="atc in detail.attachMents" :key="atc.id" :src="atc.url" alt="">
                        <div v-html="detail.termsContent"></div>
                    </div>
                    <div>
                        <p class="link-row">关联流程</p>
                        <div class="link-row flex justify-between">
                            <span class="flex-2 ellipsis mr20">1.上汽大众磁，上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众</span>
                            <div class="flex-1 flex justify-between"> 
                                <span class="mr20 ellipsis flex-1">时间</span>
                                <span> <i class="el-icon-view"></i> 123</span>
                            </div>
                        </div>
                    </div>
                </iCard>
            </div>
        </div>
    </div>
</template>

<script>
	import { iInput, iCard } from 'rise';
    import LayHeader from "./../components/LayHeader"
    import IndexList from "./../components/IndexList"
    import {glossaryList,queryGlossaryDetail} from '@/api/procs';
    export default {
       components:{
           LayHeader,
           iCard,
           iInput,
           IndexList
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
            padding: 25px 20px;
            word-break: break-word;
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