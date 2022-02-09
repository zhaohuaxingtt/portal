<template>
   <iCard class="ui-index index-card" v-loading="loading" :class="{padding:padding}">
        <div class="tlt row-line" v-if="title" v-text="title"></div>
        <div class="indexs row-line" v-if="indexs.length > 0 && showIndex">
            <span v-for="(l,i) in indexs" :key="l" :class="{active:activeIndex == l}" @click="clickIndex(l)" @mouseenter.stop="en(l,i)" @mouseleave.stop="enterActive = ''">{{enterActive && enterActive.index == i ? indexs_data[enterActive.name].length : l}}</span>
        </div>
        <div v-if="list == 0" class="nodata">目前暂无数据</div>
        <transition name="moveR">
            <div class="index-list" v-show="!loading">
                <div class="row row-line"  v-for="l in list" :key="l.id" @click="clickItem(l.id)">
                    <span class="row-index" v-if="indexIcon">{{l.firstLetter}}</span>
                    <div class="row-c" :class="{active:activeItem == l.id}">
                        <span style="font-weight:800">{{l[nameKey]}} 
                            <!-- <i>NEW</i> -->
                        </span>
                        <slot :data="l" name="row-right"></slot>
                    </div>
                </div>
            </div>
        </transition>
    </iCard>
</template>

<script>
	import { iCard } from 'rise';
    export default {
        components:{
            iCard
        },
        props:{
            title:{
                type: String,
                default: ""
            },
            padding:{   //卡片padding
                type: Boolean,
                default: false
            },
            showIndex:{     //是否显示索引
                type: Boolean,
                default: true
            },
            indexIcon:{     //索引图标
                type: Boolean,
                default: true
            },
            loading:{    
                type: Boolean,
                default: false
            },
            data:{
                type: Object,
                default:() => {}
            },
            nameKey:{
                type:String,
                default: 'title'
            },
            isClickFirst:{
                type:Boolean,
                default:true
            }
        },
        data() {
            return {
                activeIndex:"",
                activeItem:"",
                list:[],
                indexs_data:{},
                indexs:[],
                enterActive:""
            }
        },
        watch:{
            data(n){
                if(Object.keys(n).length > 0){
                    this.indexs = ["All", ...Object.keys(n)]    //indexs
                    // 新的数据
                    let obj = n
                    obj["All"] = Array.from(Object.values(n)).flat()   
                    this.indexs_data = obj  

                    this.activeIndex = this.indexs[0]
                    this.list = this.indexs_data[this.activeIndex]

                    if(this.isClickFirst){
                        this.clickItem(this.list[0].id)
                    }
                }
            },
           
        },
        methods: {
            en(l,i){
               this.enterActive = {index:i,name:l}
            },
            clickIndex(l){
                // 点击索引
                this.activeIndex = l;
                this.$emit("update:loading",true)
                setTimeout(() => {
                    this.list = this.indexs_data[l]
                    if(this.isClickFirst){
                        this.clickItem(this.list[0].id)
                    }
                    this.$emit("update:loading",false)
                }, 200);
                this.$emit("click-index",l)
            },
            clickItem(l){
                this.activeItem = l
                this.$emit("row-click",l)
            }
        },
    }
</script>

<style lang="scss" scoped>
.moveR-enter-active,  .moveR-leave-active {
    transform: translateX(0);
}
.moveR-enter-active{
    transition: all 0.2s ease-in-out;
}
.moveR-enter,  .moveR-leave {
    transform: translateX(100%);
}
.moveR-leave-to{
    transform: translateX(100%);
}
    .ui-index{
        height: 100%;
        min-height:200px;
        flex: 1;
        padding-bottom: 10px;
        min-width: 300px;
        margin-right: 20px;
        color: #41434A;
       
        & ::v-deep .cardBody{
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 0;

        }
        &.padding ::v-deep .cardBody{
            padding: 10px 20px;
        }
        & ::v-deep > div{
            height: 100%;
            overflow: hidden;
        }

        .indexs{
            display: flex;
            flex-wrap: wrap;
            color: #41434A;
            & > span{
                display: inline-block;
                width: 30px;
                height: 30px;
                line-height: 30px;
                margin-bottom: 10px;
                margin-top: 10px;
                margin-right: 15px;
                text-align: center;
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
            padding-right: 4px;
            display: flex;
            flex-direction: column;
            flex: 1;
            height: 100%;
            overflow: auto;

            .row{
                display: flex;
                align-items: center;
                cursor: pointer;

            }
            .row-index{
                padding: 8px;
                margin-right: 15px;
                background-color: #9DBDF8;
                color: #fff;
                border-radius: 4px;
            }
            .row-c{
                flex: 1;
                display: flex;
                justify-content: space-between;
                &:hover{
                    color: #1763F7;
                }
                &.active{
                    color: #1763F7;
                }

            }
        }
    }
    .row-line{
        padding: 15px 20px;
        border-bottom: 1px solid #BBC4D6;
    }
    .tlt{
        font-weight: bold;
        color: #41434A;
        font-size: 18px;
    }
    .nodata{
        margin: 20px auto;
        color: #666;
    }
</style>