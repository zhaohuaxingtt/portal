<template>
  <div>{{row.numeratorValue}} {{materielUnit}}</div>
</template>

<script>
export default {
    props:{
        row:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        materielUnit:{
            type:String,
            default:''
        }
    }

}
</script>

<style>

</style>