<template>
  <div>
    <iSelect v-model="row.cbdLevel">
       <el-option
        v-for="item in cdlOption"
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
      cdlOption: {  
        type: Object,
        default: function() {
          return []
        }
      },
    },
    created () {
      this.cdlOption
    }
}
</script>
<style>

</style>