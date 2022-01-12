<template>
    <div>
       <LayHeader title="流程管理"></LayHeader>
        <div class="process mt20">
            <div class="flex-1 mr20">
                <div class="flex justify-between items-center">
                    <div class="flex flex-1">
                        <span class="process-tab" v-for="tab in tabs[activeView]" :key="tab.value" :class="{active:activeName == tab.value}" @click="tabChange(tab.value)"><i :class="[tab.icon]"></i> {{tab.name}}</span>
                    </div>

                    <div class="flex head-r">
                        <span class="icon" :class="{active: activeView == 'list'}" @click="typeChange('list')">
                            <i class="el-icon-s-operation"></i>
                        </span>
                        <span class="icon" :class="{active: activeView == 'draw'}" @click="typeChange('draw')">
                            <i class="el-icon-picture"></i>
                        </span>
                    </div>
                </div>
                <div v-if="activeView == 'list'" class="mt20" style="height:650px">
                    <IndexList padding style="color:#777" :showIndex="activeName == 'all'">
                        <div slot="row-right" slot-scope="{data}">{{data}}</div>
                    </IndexList>
                </div>
                <!-- 流程图 -->
                <div v-else class="mt20">
                    <iCard>
                        <img class="draw-img" src="http://cnsvwshvm1416.csvw.com/upload/2021/12/16/FlowChart_150/%E4%B8%BB%E6%B5%81%E7%A8%8B%E5%9B%BE.png" alt="">
                    </iCard>
                </div>
                
            </div>
            <div class="side">
               <UiCard title="我的收藏" :list="list1" @row-click="click1"></UiCard>
               <UiCard title="最新词条" :list="list1" :color="false" @row-click="click1">
                   <iButton slot="head-right">MORE</iButton>
                   <div slot="item-right">
                       <i class="el-icon-view"></i>
                       123
                   </div>
               </UiCard>
               <UiCard title="常用附件" :list="list1" @row-click="click1"></UiCard>
            </div>
        </div>
    </div>
</template>

<script>
    import LayHeader from "./../components/LayHeader.vue";
    import IndexList from "./../components/IndexList.vue";
    import UiCard from "./../components/UiCard.vue";
    import {iCard, iButton} from 'rise';
    export default {
        components:{
            LayHeader,
            IndexList,
            iCard,
            UiCard,
            iButton
        },
        data() {
            return {
                tabs:{
                    list:[
                        {name:'全部流程',value:"all",icon:"el-icon-bangzhu"},
                        {name:'我的流程',value:"my",icon:"el-icon-picture"}
                    ],
                    draw:[
                        {name:'流程图',value:"draw",icon:"el-icon-bangzhu"}
                    ]

                },
                activeName:"all",
                activeView:"list",
                list1:[
                    {name:'收藏1收藏1收藏1收藏1收藏1',id:1},
                    {name:'收藏2',id:2},
                    {name:'收藏3',id:3},
                    {name:'收藏4',id:4},
                    {name:'收藏5',id:5},
                ]
            }
        },
        methods: {
            tabChange(v){
                this.activeName = v
            },
            typeChange(type){
                this.activeView = type
                if(type == "list"){
                    this.activeName = "all"
                }else{
                    this.activeName = "draw"
                }
            },
            click1(l){
                console.log(l);
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "./../comon";

.process-tab{
    padding: 10px 20px;
    font-size: 18px;
    color:#777777;
    font-weight: bold;
    border-top: 3px solid transparent;
    border-radius: 2px 2px 0px 0px;
    transition: all .2s ease;
    cursor: pointer;
    &.active{
        background-color: #E8EFFE;
        border-color: #4382FA;
        color:#1763F7;
        
    }
}

.process{
    display: flex;

    .head-r{
        .icon{
            padding: 5px 10px;
            font-size: 20px;
            cursor: pointer;
            color: #777;
            border-radius: 4px;
            transition: all .2s ease;
            &.active{
                background-color: #1660F1;
                color: #fff;
            }
        }
    }

    .side{
        width: 500px;
        display: flex;
        flex-direction: column;
    }

    .draw-img{
        width: 100%;
    }
   
}
</style>