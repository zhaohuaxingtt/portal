<template>
    <div>
        <LayHeader title="知识类型信息"></LayHeader>
        <div class="flex mt20">
            <el-row :gutter="20" class="cards mr20">
                <el-col
                    :xs="24"
                    :sm="12"
                    :md="8"
                    :lg="8"
                    :xl="8"
                    class="card-item"
                    v-for="l in 10"
                    :key="l"
                    >
                    <div class="top">
                        <img class="img" src="http://cnsvwshvm1416.csvw.com/upload/2018/08/10/ReportSection_2100_Cover.jpg" alt="">
                        <span class="new">NEW</span>
                        <div class="detail">
                            <div>测试相关信息</div>
                            <div>供应商管理 <span class="cursor"><i class="el-icon-download"></i>10</span></div>
                            <div>2022.1.1</div>
                            <button class="down">DOWNLOAD</button>
                        </div>
                    </div>
                    <div class="flex justify-between items-center title">
                        <div>111</div>
                        <div>主讲人</div>
                    </div>

                </el-col>
            </el-row>
            <div class="info-r">
               <UiCard title="知识分类" :list="list1" :color="false" @row-click="cateChange"></UiCard>
               <UiCard title="科室" :list="list1" :color="false">
                   <div class="department" slot="content">
                       <div class="department-item" :class="{active:depart == l}" v-for="l in 10" @click="departChange(l)">CS-{{l+1}}</div>
                   </div>
               </UiCard>
            </div>
        </div>
    </div>
</template>

<script>
    import LayHeader from "./../components/LayHeader.vue";
    import UiCard from "./../components/UiCard.vue";
    export default {
        components:{
            LayHeader,
            UiCard
        },
        data() {
            return {
                show:false,
                list1:[
                    {name:'一类',id:1},
                    {name:'二类',id:2},
                    {name:'三类',id:3},
                    {name:'四类',id:4}
                ],
                depart:0,
            }
        },
        methods: {
            departChange(l){
                this.depart = l
            },
            cateChange(v){
                console.log(v);
            }
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
            &:hover .detail{
                display: flex;
            }
        }
       
        .img{
            width: 100%;
            height: 100%;

        }

        .detail{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            line-height: 30px;
            background-color: rgba($color: #5D5D5D, $alpha: .6);
            cursor: auto;
            animation: fade .3s ease;
            transition: all .3s ease;

            .down{
                padding: 5px 10px;
                background-color: transparent;
                border: 1px solid #fff;
                color: #fff;
                border-radius: 4px;
                cursor: pointer;
                transition: all .2s ease;

                &:hover{
                    background-color: #fff;
                    color: #1660F1;
                }
            }
        }

        @keyframes fade {
            from {
                opacity: 0;
                transform: translateY(-100%);
            }
            to{
                opacity: 1;
                transform: translateY(0);
            }
        }
        .new{
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 8px 10px;
            font-weight: bold;
            background-color:#4382FA;
            opacity: .7;
            border-radius: 4px;
            color: #fff;

        }
        .title{
            margin-top: 10px;
            text-align: center;
            font-weight: normal;
            color: #333;
        }
    }
}
.info-r{
    margin-left: 20px;
    width: 450px;


    .department{
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        .department-item{
            padding: 8px 12px;      
            border-radius: 50px;
            margin-right: 20px;
            margin-bottom: 20px;
            color: #666;
            border: 1px solid #707070;
            word-break: keep-all;
            cursor: pointer;
            transition: all .2s ease;
            
            &:hover{
                background-color: #4382FA;
                border-color: #4382FA;
                color: #fff;
            }
            &.active{
                background-color: #4382FA;
                border-color: #4382FA;
                color: #fff;
            }
        }
    }
}
</style>