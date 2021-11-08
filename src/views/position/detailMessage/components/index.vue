<template>
    <div class="selectType">
        <el-select v-model="value1" multiple  style="width:100%;height:100%;"  size="medium" placeholder="">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
      </el-select>
    </div>

</template>

<script>
import {iSelect } from "rise"
export default {
    comments:{iSelect},
    props: {
      options: {
        type: Array,
        default: function () {
          return []
        }
      },
      value1:{
        type:Array,
        default: function () {
          return []
        }
      }
    },
    data(){
        return{
        }
       
    }
}
</script>

<style lang="scss" scoped>

.selectType {
  ::v-deep .el-input__inner{
    height: 34px;
    border: none ;
  }
  
}

</style>