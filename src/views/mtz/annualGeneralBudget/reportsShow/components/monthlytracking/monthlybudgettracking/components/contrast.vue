<template>
<div>
    <div class="contrast-content" v-if="price!= 0">
      <div :class='["contrast-img",price > 0 ? "green" : "red"]'></div>
      <div style="margin-left:10px">{{price}}</div>
    </div>
    <div v-else class="contrast-content">
        
    </div>
</div>
    
</template>

<script>
export default {
    name:'tracking-contrast',
    props:{
        price:{
            type:String,
            default:''
        }
    },


}
</script>

<style lang="scss" scoped>
    .contrast-content{
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        .contrast-img{
            width: 14px;
            height: 14px;
            border-radius: 50%;
        }
        .green{
            background-color: rgb(33,213,155);
        }
        .red{
            background-color: rgb(221,41,42);
        }
    }
</style>