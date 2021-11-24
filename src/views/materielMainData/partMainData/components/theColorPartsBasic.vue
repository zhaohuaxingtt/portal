<template>
  <iCard :title="language('基本信息')" collapse>
      <el-form label-position="left" label-width="150px">
          <el-row :gutter="24">
              <el-col span='8'>
                <iFormItem :label='language("零件号")' class="form-label-partNum">
                    <div class="sixNumber">
                        <iInput disabled v-model="formContent.partNum1"></iInput>
                        <iInput disabled v-model="formContent.partNum2"></iInput>
                        <iInput disabled v-model="formContent.partNum3"></iInput>
                        <iInput disabled v-model="formContent.partNum4"></iInput>
                        <iInput disabled v-model="formContent.partNum5"></iInput>
                    </div>
                </iFormItem>
              </el-col>
          </el-row>
          <el-row :gutter="24">
              <el-col span="8">
                  <iFormItem :label='language("零件名称(中)")' class="form-label">
                      <el-checkbox class="check-box" v-model="checkBoxs.partNameZh"></el-checkbox>
                      <iInput :placeholder='language("请输入")' v-model="formContent.partNameZh" disabled></iInput>
                  </iFormItem>
              </el-col>
              <el-col span="8">
                  <iFormItem :label='language("零件名称(德)")' class="form-label">
                      <el-checkbox class="check-box" v-model="checkBoxs.partNameDe"></el-checkbox>
                      <iInput :placeholder='language("请输入")'  v-model="formContent.partNameDe" disabled></iInput>
                  </iFormItem>
              </el-col>
              <el-col span="8">
                  <iFormItem :label='language("BMG")' class="form-label">
                      <el-checkbox class="check-box" v-model="checkBoxs.bmg"></el-checkbox>
                      <iSelect :placeholder='language("请选择")'  v-model="formContent.bmg" disabled>
                          <el-option
                            v-for="item in BMGoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                      </iSelect>
                  </iFormItem>
              </el-col>
          </el-row>
          <el-row :gutter="24">
              <el-col span="8">
                  <iFormItem :label='language("ZP")' class="form-label">
                      <el-checkbox class="check-box" v-model="checkBoxs.zp"></el-checkbox>
                      <iSelect :placeholder='language("请选择")' v-model="formContent.zp" disabled>
                          <el-option
                            v-for="item in ZPoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                      </iSelect>
                  </iFormItem>
              </el-col>
              <el-col span="8">
                  <iFormItem :label='language("FOP")' class="form-label">
                      <el-checkbox class="check-box" v-model="checkBoxs.fop"></el-checkbox>
                      <iInput :placeholder='language("请输入")' v-model="formContent.fop" disabled></iInput>
                  </iFormItem>
              </el-col>
              <el-col span="8">
                  <iFormItem :label='language("技术部门")' class="form-label">
                      <el-checkbox class="check-box" v-model="checkBoxs.techDept"></el-checkbox>
                      <iInput :placeholder='language("请输入")' v-model="formContent.techDept" disabled>
                      </iInput>
                  </iFormItem>
              </el-col>
          </el-row>
          <el-row :gutter="24">
              <el-col span="8">
                  <iFormItem :label='language("Common Sourcing")' class="form-label">
                      <el-checkbox class="check-box" v-model="checkBoxs.isCommonSourcing"></el-checkbox>
                      <iSelect :placeholder='language("请选择")' v-model="formContent.isCommonSourcing" disabled>
                          <el-option
                            v-for="item in commonOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                      </iSelect>
                  </iFormItem>
              </el-col>
              <el-col span="8">
                  <iFormItem :label='language("专业组")' class="form-label">
                      <el-checkbox class="check-box" v-model="checkBoxs.fgZhDesc"></el-checkbox>
                      <iSelect :placeholder='language("请选择")' v-model="formContent.fgZhDesc" disabled>
                          <el-option
                            v-for="item in profationalOptions"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                          >

                          </el-option>
                      </iSelect>
                  </iFormItem>
              </el-col>
              <el-col span="8">
                  <iFormItem :label='language("SET")' class="form-label">
                      <el-checkbox class="check-box" v-model="checkBoxs.setCode"></el-checkbox>
                      <iInput :placeholder='language("请输入")' v-model="formContent.setCode" disabled>
                      </iInput>
                  </iFormItem>
              </el-col>
          </el-row>
      </el-form>
  </iCard>
</template>

<script>
import {iCard,iInput,iSelect,iFormItem} from 'rise'
import {searchOptions,getProGroupOptions} from '@/api/materiel/materielMainData.js'
import {getPartsBYId} from '@/api/colorStandardParts'
export default {
    name:'theColorPartsBasic',
    components:{iCard,iInput,iSelect,iFormItem},
    data(){
        return {
            BMGoptions:[
                {
                    label:"是",
                    value:true
                },
                {
                    label:"否",
                    value:false
                }
            ],
            commonOptions:[
                {
                    label:"是",
                    value:true
                },
                {
                    label:"否",
                    value:false
                }
            ],
            //zp 下拉
            ZPoptions:[],
            //专业组下拉
            profationalOptions:[],
            checkBoxs:{
                partNameZh:true,
                partNameDe:true,
                bmg:true,
                zp:true,
                fop:true,
                techDept:true,
                isCommonSourcing:true,
                fgZhDesc:true,
                setCode:true
            },
            formContent:{
                partNum1:'',
                partNum2:'',
                partNum3:'',
                partNum4:'',
                partNum5:'',
                partNameZh:'',
                partNameDe:'',
                bmg:'',
                zp:'',
                fop:'',
                techDept:'',
                isCommonSourcing:'',
                fgZhDesc:'',
                setCode:''
            }
        }
    },
    created(){
        //专业组下拉
        getProGroupOptions().then((res) => {
            if(res.code == 200){
                
               this. profationalOptions = res.data
            }else{
                this.$message.error(res.desZh)
            }
        })
        //zp下拉
        searchOptions().then((res) => {
            if(res.code == 200){
                const data =  res.data
                for(let key in data.zpSelectData){
                    this.ZPoptions.push({label:data.zpSelectData[key],value:data.zpSelectData[key]})
                }
            }else{
                this.$message.error(res.desZh || '获取专业组下拉失败')
            }
        })
        //获取basic信息
        const id = this.$route.query.id
        getPartsBYId(id).then((res)=>{
            if(res.code == 200){
                this.formContent = res.data
                this.$emit('partNum',res.data.partNum)
            }else{
                this.$message.error(res.desZh)
            }
        })
    },
    methods:{
        save(){
            return this.checkBoxs
        }
    }
}
</script>

<style lang="scss" scoped>
.sixNumber{
    display: flex;
    justify-content: space-between;
    align-items: center;
    ::v-deep .el-input{
        margin-right: 10px;
        // width: 20px;
    }
}
.form-label{
    margin-left: 40px;
    position: relative;
    .check-box{
        position: absolute;
        left: -170px;
        ::v-deep .el-checkbox__inner{
            border-radius: 4px;
        }
    }
}
.form-label-partNum{
    margin-left: 20px;
}
</style>