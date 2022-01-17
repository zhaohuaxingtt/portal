<template>
   <iCard class="ui-index index-card" :class="{padding:padding}">
        <div class="tlt row-line" v-if="title" v-text="title"></div>
        <div class="indexs row-line" v-if="showIndex">
            <span v-for="(l, index) in indexs" :key="index" :class="{active:activeIndex == l}" @click="clickIndex(l)">{{l}}</span>
        </div>
        <div v-if="list == 0" class="nodata">目前暂无数据</div>
        <transition name="moveR">
            <div class="index-list" v-show="list > 0">
                <div class="row row-line"  v-for="(l, index) in list" :key="index" @click="clickItem(index)">
                    <span class="row-index" v-if="indexIcon">{{activeIndex}}</span>
                    <div class="row-c" :class="{active:activeItem == index}">
                        <span>dsadasd大大说阿斯顿阿斯顿{{l}} <i>NEW</i></span>
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
            }
        },
        data() {
            return {
                indexs:["all","A","B","D"],
                activeIndex:"all",
                index_list: [
                   {name:'ad'},
                   {name:'Bd'},
                   {name:'dd'},
               ],
               list:10,
               activeItem:""
            }
        },
        methods: {
            clickIndex(l){
               this.activeIndex = l;
               this.list = 0; 
               setTimeout(() => {
                   this.list = parseInt(Math.random()*30)
               }, 500);
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
    transition: all 0.2s ease-in-out;
    transform: translateX(0);
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