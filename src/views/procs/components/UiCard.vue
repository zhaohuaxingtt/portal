<template>
    <div class="card">
        <div class="flex justify-between items-center tlt" :class="{color: color}" >
            <span v-text="title"></span>
            <slot name="head-right"></slot>
        </div>
        <div class="card-content">
            <template v-if="slots['content']">
                <slot name="content"></slot>
            </template>
            <template v-else>
                <p class="flex card-content-item ellipsis" :class="{color:color,active:active == l.id}" :title="l[nameKey]" v-for="l in list" :key="l.id" @click="active = l.id;$emit('row-click', l)">
                    <span class="flex-1 ellipsis mr20">{{l[nameKey]}}</span>
                    <slot name="item-right" :data="l"></slot>
                </p>
                <p class="no-data" v-if="list.length == 0">暂无数据</p>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title:{     //标题
                type: String,
                default:"title"
            },
            list:{
                type: Array,
                default: () => []
            },
            nameKey:{   //名称的字段key
                type: String,
                default: "name"
            },
            color:{     //是否显示标题和行背景色
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                active:""
            }
        },
        computed:{
            slots(){
                return this.$slots
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "./../comon";
.card{
    height: 300px;
    display: flex;
    margin-bottom: 20px;
    flex-direction: column;
    overflow: hidden;
    background: #FFFFFF;
    box-shadow: 0px 0px 6px rgba(27, 29, 33, 0.2);
    border-radius: 10px;
    .card-content{
        flex: 1;
        overflow: auto;
        .card-content-item{
            padding: 15px 25px;
            color: #777;
            cursor: pointer;
            transition: all .2s ease;
            &:hover{
                background-color: rgb(226,234,254) !important;
                color: #1660F1;
            }
            &.active{
                background-color: rgb(226,234,254) !important;
                color: #1660F1;
            }

            &.color:nth-child(odd){
                background-color: #F7FAFF;
            }
            &.color:nth-child(even){
                background-color: #fff;
            }
        }
    }
    .tlt{
        padding: 15px 25px;
        font-size: 18px;
        font-weight: bold;
        border-bottom: 1px solid #BBC4D6;

        &.color{
            background-color: #E8EFFE;
            border: none;
        }
    }

}
</style>