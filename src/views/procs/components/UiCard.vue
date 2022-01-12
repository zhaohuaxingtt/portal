<template>
    <div class="card">
        <div class="flex justify-between items-center tlt" :class="{color: color}" >
            <span v-text="title"></span>
            <slot name="head-right"></slot>
        </div>
        <div class="card-content">
            <p class="flex card-content-item ellipsis" :class="{color:color}" :title="l[key]" v-for="l in list" :key="l.id" @click="$emit('row-click', l)">
                <span class="flex-1">{{l[key]}}</span>
                <slot name="item-right"></slot>
            </p>
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
            key:{   //名称的字段key
                type: String,
                default: "name"
            },
            color:{     //是否显示标题和行背景色
                type: Boolean,
                default: true
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
                background-color: #f8f8f8 !important;
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