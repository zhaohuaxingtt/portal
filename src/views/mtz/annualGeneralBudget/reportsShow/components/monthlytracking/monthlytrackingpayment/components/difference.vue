<template>
  <div :class='[price < 0 ? "minus" : "difference","basic"]' >
    {{price}}
  </div>
</template>

<script>
export default {
    name:'differenceDisplay',
    props:{
        price:{
            type:String,
            default:''
        }
    }
}
</script>

<style lang="scss" scoped>
.basic{
    width: 80px;
    height: 30px;
    border-radius: 6px;
    font-weight: bold;
    line-height: 30px;
    text-align: center;
}
.difference{
    background: rgb(255, 246, 236);
    color: rgb(255,176,77);
}
.minus{
    background:rgb(229,248,243) ;
    color: rgb(5, 187, 181);
}
</style>