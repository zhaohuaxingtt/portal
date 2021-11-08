<template>
  <div>
    <iSelect v-model="row.unitCode">
      <el-option
        v-for="item in unitOptions"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      >
      </el-option>
    </iSelect>
  </div>
</template>
<script>
import {iSelect} from "rise"
export default {
    components:{iSelect},
    props: {
      row: {  
        type: Object,
        default: function() {
          return {}
        }
      },
      unitOptions: {
        type: Object,
        default: function() {
          return []
        }
      }
    }
}
</script>
<style>

</style>