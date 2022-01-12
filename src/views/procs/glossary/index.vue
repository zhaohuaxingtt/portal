<template>
    <div class="main">
       <LayHeader title="词条管理"></LayHeader>

        <div class="flex glossary">
            <!-- <iCard class="glossary-index glossary-card">
                <div class="tlt row-line">Glossary</div>
                <div class="indexs row-line">
                    <span v-for="(l, index) in indexs" :key="index" :class="{active:activeIndex == l}" @click="click(l)">{{l}}</span>
                </div>
                <transition name="moveR">
                    <div class="index-list" v-show="list > 0">
                        <span class="row-line" v-for="(l, index) in list" :key="index">{{l}}</span>
                    </div>
                </transition>
            </iCard> -->
            <IndexList title="Glossary"></IndexList>
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
.moveR-enter-active,  .moveR-leave-active {
    transition: all 0.2s ease-in;
    transform: translateX(0);
}
.moveR-enter,  .moveR-leave {
    transform: translateX(100%);
}
.moveR-leave-to{
    transform: translateX(100%);
}
.main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
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
        flex: 1;
        padding-bottom: 10px;
        min-width: 300px;
        margin-right: 20px;
        color: #41434A;
        ::v-deep .cardBody{
            display: flex;
            flex-direction: column;
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
                    color:#fff !important;
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