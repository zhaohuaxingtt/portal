<template>
    <div>
       <LayHeader title="知识管理"></LayHeader>
        <div class="mt20">
            <el-row :gutter="20" class="cards">
                <el-col
                    :xs="24"
                    :sm="12"
                    :md="8"
                    :lg="6"
                    :xl="6"
                    class="card-item"
                    v-for="l in list"
                    :key="l.id"
                    @click.native="$router.push({path:'/cf-ProCS/knowledgeManage/categoryInfo',query:{id:l.id}})"
                    >
                    <div class="top">
                        <img class="img" :src="l.cover" alt="">
                        <div class="info">
                            <span>共{{l.knowlegeCount}}门</span>
                            <span class="new">NEW</span>
                        </div>
                    </div>
                    <div class="title" v-text="l.name"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import LayHeader from "./../components/LayHeader.vue";
    import {queryKnowledgeTypeList} from '@/api/procs';
    export default {
        components:{
            LayHeader
        },
        data() {
            return {
                list:[]
            }
        },
        async created() {
            let res = await queryKnowledgeTypeList({page:1,size:9999})
            this.list = res.content || []
        },
    }
</script>

<style lang="scss" scoped>
@import "./../comon";
.cards{
    flex:1;
    padding-right: 10px;
    overflow-y: auto;

    .card-item{
        margin-bottom: 20px;
       
        .top{
            position: relative;
            width: 100%;
            height: 280px;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;
           
        }
        .bell{
            position: absolute;
            right: -50px;
            top: -50px;
            transform: rotate(-45deg);
            font-size: 14px;
            border: 50px solid #1763f7;
            border-top-color: transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
            .icon{
                position: absolute;
                right: 16px;
                bottom: -10px;
                transform: rotate(90deg);
                color: #fff;
            }
        }
        .img{
            width: 100%;
            height: 100%;
             transition: all .3s ease;
            &:hover{
                box-shadow: 0 2px 5px rgba(0,0,0,.3);
                transform: scale(1.08);
            }
        }
        .info{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 40px;
            padding-left: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: rgba(0,0,0,.4);
            color: #fff;
        }
        .new{
            display: flex;
            align-items: center;
            height: 70%;
            margin-right: 10px;
            padding: 0 10px;
            font-weight: bold;
            background-color:#4382FA;
            border-radius: 4px;
        }

        .title{
            margin-top: 10px;
            text-align: center;
            font-size: 18px;
            font-weight: normal;
            color: #333;
        }
    }
}
</style>