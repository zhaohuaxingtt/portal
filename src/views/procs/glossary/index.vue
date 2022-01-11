<template>
    <div class="main">
        <pageHeader class="title">
			{{language('词条管理')}}
		</pageHeader>

        <el-image class="banner" src="http://cnsvwshvm1416.csvw.com/upload/2018/07/02/NewsMeta_1352250_Cover.jpg" lazy fit="fill"></el-image>

        <div class="flex glossary">
            <iCard class="glossary-index glossary-card">
                <div class="tlt row-line">Glossary</div>
                <div class="indexs row-line">
                    <span v-for="(l, index) in indexs" :key="index">{{l}}</span>
                </div>
                <div class="index-list">
                    <span class="row-line" v-for="(l, index) in 20" :key="index">{{l}}</span>
                </div>
            </iCard>
            <div class="glossary-content">
                <iInput placeholder="Search for MORE" v-model="key">
                    <i slot="suffix" class="el-input__icon el-icon-search" style="color:#1763F7"></i>
                </iInput>
                <iCard class="mt20 glossary-card flex-1">
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
                                <span class="mr20 ellipsis">时间</span>
                                <span>123</span>
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
    import pageHeader from '@/components/pageHeader'
    export default {
       components:{
           pageHeader,
           iCard,
           iInput
       } ,
       data() {
           return {
               key: "",
               indexs:["all","A","B","D"],
               index_list: [
                   {name:'ad'},
                   {name:'Bd'},
                   {name:'dd'},
               ]
           }
       },
    }
</script>

<style lang="scss" scoped>
@import "./../comon";

.main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.banner{
    width: 100%;
    height: 300px;
    border-radius: 8px;
}

.glossary{
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin-top: 20px;

    .glossary-card{
        ::v-deep .cardBody{
            padding: 0;
            height: 100%;
        }
        & ::v-deep > div{
            height: 100%;
            overflow: hidden;
        }
    }
    .glossary-index{
        height: 100%;
        display: flex;
        flex-direction: column;
        min-width: 300px;
        margin-right: 20px;
        padding-bottom: 5px;
        color: #41434A;
        ::v-deep .cardBody{
            padding: 0;
            height: 100%;
        }
        & ::v-deep > div{
            height: 100%;
            overflow: hidden;
        }

        .indexs{
            display: flex;
            flex-wrap: wrap;
            & > span{
                display: inline-block;
                padding: 3px 6px;
                margin-right: 15px;
                font-weight: bold;
                font-size: 18px;
                border-radius: 3px;
                cursor: pointer;
                transition: all .2s ease;
                &:hover{
                    color:#fff;
                    background-color: #1660F1;
                }
                &.active{
                    color:#1660F1;
                }
            }
        }
        .index-list{
            display: flex;
            flex-direction: column;
            flex: 1;
            height: 100%;
            overflow: auto;
        }
    }
    .row-line{
        padding: 15px 20px;
        border-bottom: 1px solid #BBC4D6;
    }
    .glossary-content{
        // flex: 3;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .content{
            padding: 15px;
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