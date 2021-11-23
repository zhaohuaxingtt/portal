<template>
  <iCard :title="language('计量单位')" collapse>
      <el-form label-width="150px" label-position="left">
          <el-row :gutter="24" >
              <el-col span="8">
                  <iFormItem :label='language("基本计量单位")' class="unit-option">
                        <el-checkbox class="check-box" v-model="unitCheckbox"></el-checkbox>
                        <iSelect>
                            <el-option
                                v-for="item in unitOptions"
                                :key="item.value"
                                :label='item.name'
                                :value="item.value"
                            >
                            </el-option>
                        </iSelect>
                  </iFormItem>
                  
              </el-col>
          </el-row>
      </el-form>
    <el-divider class="divider" ></el-divider></el-divider>
    <h4 style="margin:0 0 20px 20px">{{language('常用计量单位与基本计量单位转换关系')}}</h4>
    <iTableCustom 
        ref="unitTable"
        :loading='loading'
        :data='unitData'
        :columns="columns"
        @handle-selection-change="handleSelectionChange"
    />
  </iCard>
</template>

<script>
import {iCard,iSelect,iFormItem} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {materielUnit} from '@/api/materiel/materielMainData.js'
import {getUnitList} from '@/api/colorStandardParts'
import {UNIT_COLUMNS} from './data.js'
export default {
    name:'theColorPartsUnit',
    components:{iCard,iSelect,iFormItem,iTableCustom},
    data(){
        return{
            unitOptions:[],
            loading:false,
            columns:UNIT_COLUMNS,
            unitCheckbox:true
        }
    },
    watch:{

    },
    created(){
        materielUnit().then((res)=>{
            if(res.code == 200){
                for(let item of res.data){
                    this.unitOptions.push({name:item['nameZh'],value:item['nameZh'],id:item['id']})
                }
            }else{
                this.$message.error(res.desZh)
            }
        })
        const id = parseInt(this.$route.query.id)
        let params = {
            bizId: id
        }
        getUnitList(params).then((res)=>{
            if(res.code == 200){
                const data = res.data
                this.unitData = data
            }else{
                this.$message.error(res.desZh)
            }
        })
    },
    methods:{
        handleSelectionChange(val){
            return val
        }
    }
}
</script>

<style lang="scss" scoped>
.unit-option{
    position: relative;
    margin-left: 40px;
    .check-box{
        position: absolute;
        left: -170px;
        ::v-deep .el-checkbox__inner{
            border-radius: 4px;
        }
    }
}
.divider{
    margin:0 0  20px 0;
}
</style>