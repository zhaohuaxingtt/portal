<template>
  <div>
    <iSelect v-model="row.bdlType">
      <el-option
        v-for="item in bdlOption"
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
      bdlOption: {  
        type: Object,
        default: function() {
          return []
        }
      },
    }
}
</script>
<style>

</style>