<template>
    <div>
       <LayHeader title="词条管理"></LayHeader>

        <div class="flex glossary">
            <div class="card-l">
                <IndexList class="indexs" title="Glossary" :indexIcon="false"></IndexList>
            </div>
            <div class="glossary-content">
                <iInput placeholder="Search for MORE" v-model="key">
                    <i slot="suffix" class="el-input__icon el-icon-search" style="color:#1763F7"></i>
                </iInput>
                <iCard class="mt20 glossary-card">
                    <div class="flex row-line justify-between">
                        <span class="tlt">title</span>
                        <span>date</span>
                    </div>
                    <div class="content row-line">
                        <img src="" alt="">
                        上汽大众磁，上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众磁上汽大众磁XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
    export default {
       components:{
           LayHeader,
           iCard,
           iInput,
           IndexList
       } ,
       data() {
           return {
               key: "",
               indexs:["all","A","B","D"],
               activeIndex:"",
               index_list: [
                   {name:'ad'},
                   {name:'Bd'},
                   {name:'dd'},
               ],
               list:10
           }
       },
       methods: {
           click(l){
               this.activeIndex = l;
               this.list = 0; 
               setTimeout(() => {
                   this.list = parseInt(Math.random()*30)
               }, 500);
           }
       },
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