<template>
  <iCard :title="language('计量单位')" collapse>
      <el-form label-width="150px" label-position="left">
          <el-row :gutter="24" >
              <el-col span="8">
                  <iFormItem :label='language("基本计量单位")' class="unit-option">
                        <el-checkbox class="check-box" v-model="unitCheckbox"></el-checkbox>
                        <iSelect v-model="unit" disabled>
                            <el-option
                                v-for="item in unitOptions"
                                :key="item.value"
                                :label='item.label'
                                :value="item.value"
                            >
                            </el-option>
                        </iSelect>
                  </iFormItem>
                  
              </el-col>
          </el-row>
      </el-form>
    <el-divider class="divider" ></el-divider>
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
            unitCheckbox:true,
            unit:'',
            selectedItems:[]
        }
    },
    watch:{

    },
    created(){
        materielUnit().then((res)=>{
            if(res.code == 200){
                for(let item of res.data){
                    this.unitOptions.push({label:item.nameZh,value:item.id,code:item.code})
                }
            }else{
                this.$message.error(res.desZh)
            }
        })
        const id =this.$route.query.id

        getUnitList(id).then((res)=>{
            if(res.code == 200){
                const data = res.data
                if(data){
                    this.unitData = data
                    this.unit = data[0].currentUnitId
                    this.$refs.unitTable.toggleAllSelection()
                }
                
            }else{
                this.$message.error(res.desZh)
            }
        })
    },
    methods:{
        handleSelectionChange(val){
            this.selectedItems = val
        },
        getUnitId(){
            return this.unit
        },
        getUnitItems(){
            let data = []
            data = this.selectedItems.map((ele)=>{
                console.log(ele,'====');
                return {
                    "bizId":this.$route.query.id,
                    "converseRate":ele.converseRate,
                    "currentUnitId":ele.currentUnitId,
                    "limit":ele.limit,
                    "targetUnitId":ele.targetUnitId
                }
            })
            return data
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
        left: -210px;
        ::v-deep .el-checkbox__inner{
            border-radius: 4px;
        }
    }
}
.divider{
    margin:0 0  20px 0;
}
</style>