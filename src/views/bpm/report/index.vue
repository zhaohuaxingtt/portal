<template>
  <div>
  </div>
</template>

<script>
import {getUrl} from '@/api/bpmReport/index'
export default {
    data(){
        return{
        }
    },
    created(){
        const token = 
        getUrl().then((res) =>{
            console.log('sss');
        })
    }
}
</script>

<style>

</style>