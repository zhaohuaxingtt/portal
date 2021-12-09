<template>
  <div>{{language(text)}}</div>
</template>

<script>
export default {
    props:{
        row: {
        type: Object,
        default: function() {
          return {}
        }
      },
      selections:{
        type: Array,
        default:() =>{
          return []
        }
      }
    },
    computed:{
        text(){
          return  this.selections.filter((item) => this.row.denominatorUnitId == item.id)
                 .map((item) => {
              return item.name
            }).join(',')
        }
    }
}
</script>

<style>

</style>