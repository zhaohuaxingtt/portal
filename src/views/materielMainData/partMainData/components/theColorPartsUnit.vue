<template>
  <iCard :title="language('计量单位')" collapse>
      <el-form label-width="150px" label-position="left">
          <el-row :gutter="24" >
              <el-col span="8">
                  <iFormItem :label='language("基本计量单位")' class="unit-option">
                        <el-checkbox class="check-box"></el-checkbox>
                        <iSelect>
                            <el-optioon
                                v-for="item in unitOptions"
                                :key="item.value"
                                :label='item.label'
                                :value="item.value"
                            >
                            </el-optioon>
                        </iSelect>
                  </iFormItem>
                  
              </el-col>
          </el-row>
      </el-form>
          
    
  </iCard>
</template>

<script>
import {iCard,iSelect,iFormItem} from 'rise'
export default {
    name:'theColorPartsUnit',
    components:{iCard,iSelect,iFormItem},
    data(){
        return{
            unitOptions:[]
        }
    }
}
</script>

<style lang="scss" scoped>
.unit-option{
    position: relative;
    margin-left: 20px;
    .check-box{
        position: absolute;
        left: -170px;
        ::v-deep .el-checkbox__inner{
            border-radius: 4px;
        }
    }
}
</style>