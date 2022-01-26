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
                    <IndexList 
                        :data="indexs.data" 
                        padding 
                        style="color:#777" 
                        :showIndex="activeName == 'all'" 
                        :isClickFirst="false"
                        nameKey="name"
                        :loading.sync="indexs.loading"
                        @row-click="clickProcess">
                        <div slot="row-right" slot-scope="{data}">{{data.version}}</div>
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
               <UiCard title="我的收藏" :list="collectList" @row-click="side($event, 'collect')"></UiCard>
               <UiCard title="最新词条" nameKey="title" :list="hotTermsList" :color="false" @row-click="side($event, 'glossary')">
                   <iButton slot="head-right">MORE</iButton>
                   <div slot="item-right" slot-scope="{data}">
                       <i class="el-icon-view"></i>
                       {{data.pageView}}
                   </div>
               </UiCard>
               <UiCard title="常用附件" :list="attachList" @row-click="side($event, 'attachment')"></UiCard>
            </div>
        </div>
    </div>
</template>

<script>
    import LayHeader from "./../components/LayHeader.vue";
    import IndexList from "./../components/IndexList.vue";
    import UiCard from "./../components/UiCard.vue";
    import { queryWorkFlow, queryMyCollect, queryHotTerms, querySample } from '@/api/procs';
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
                indexs: {
                    list:[],
                    loading: false
                },
                activeName:"all",
                activeView:"list",
                collectList: [],
                hotTermsList: [],
                attachList:[]
            }
        },
        created() {
            this.getProcessList()
            this.getMyCollectList()
            this.getHotTermsList()
            this.getSampleList()
        },
        methods: {
            // 流程列表
            async getProcessList() {
                try {
                    this.indexs.loading = true
                    let list = await queryWorkFlow()
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
            // 我的收藏
            async getMyCollectList() {
                let params = {
                    page: 0,
                    size: 5
                }
                await queryMyCollect(params).then(res => {
                    console.log(res, 'queryMyCollect')
                    this.collectList = res || []
                })
            },
            // 最新词条
            async getHotTermsList() {
                let params = {
                    page: 0,
                    size: 5
                }
                await queryHotTerms(params).then(res => {
                    this.hotTermsList = res?.content || []
                })
            },
            // 常用附件
            async getSampleList() {
                await querySample().then(res => {
                    this.attachList = res || []
                })
            },
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
            clickProcess(v){
                this.$router.push({name:'CFProCsProcessDetail'})
            },
            side(v,type){
                console.log(v);
                switch (type) {
                    case "collect":
                        this.$router.push({name:'CFProCsProcessCollect'})
                        break;
                    case "glossary":
                        // this.$router.push({name:'CFProCsProcessCollect'})
                        break;
                    case "attachment":
                        // this.$router.push({name:'CFProCsProcessCollect'})
                        break;
                }
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