<template>
  <iCard :title="language('基本信息')" collapse>
      <el-form label-position="left" label-width="150px">
          <el-row :gutter="24">
              <el-col span='8'>
                <iFormItem :label='language("零件号")'>
                    <div class="sixNumber">
                        <iInput disabled>qew</iInput>
                        <iInput disabled></iInput>
                        <iInput disabled></iInput>
                        <iInput disabled></iInput>
                        <iInput disabled></iInput>
                    </div>
                </iFormItem>
              </el-col>
          </el-row>
          <el-row :gutter="24">
              <el-col span="8">
                  <iFormItem :label='language("零件名称(中)")' class="form-label">
                      <el-checkbox class="check-box"></el-checkbox>
                      <iInput :placeholder='language("请输入")'></iInput>
                  </iFormItem>
              </el-col>
              <el-col span="8">
                  <iFormItem :label='language("零件名称(德)")' class="form-label">
                      <el-checkbox class="check-box"></el-checkbox>
                      <iInput :placeholder='language("请输入")'></iInput>
                  </iFormItem>
              </el-col>
              <el-col span="8">
                  <iFormItem :label='language("BMG")' class="form-label">
                      <el-checkbox class="check-box"></el-checkbox>
                      <iSelect :placeholder='language("请选择")'>
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
                      <el-checkbox class="check-box"></el-checkbox>
                      <iSelect :placeholder='language("请选择")'>
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
                      <el-checkbox class="check-box"></el-checkbox>
                      <iInput :placeholder='language("请输入")'></iInput>
                  </iFormItem>
              </el-col>
              <el-col span="8">
                  <iFormItem :label='language("技术部门")' class="form-label">
                      <el-checkbox class="check-box"></el-checkbox>
                      <iInput :placeholder='language("请输入")'>
                      </iInput>
                  </iFormItem>
              </el-col>
          </el-row>
          <el-row :gutter="24">
              <el-col span="8">
                  <iFormItem :label='language("Common Sourcing")' class="form-label">
                      <el-checkbox class="check-box"></el-checkbox>
                      <iSelect :placeholder='language("请选择")'>
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
                      <el-checkbox class="check-box"></el-checkbox>
                      <iSelect :placeholder='language("请输入")'>
                          <el-option
                            v-for="item in profationalOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >

                          </el-option>
                      </iSelect>
                  </iFormItem>
              </el-col>
              <el-col span="8">
                  <iFormItem :label='language("SET")' class="form-label">
                      <el-checkbox class="check-box"></el-checkbox>
                      <iInput :placeholder='language("请输入")'>
                      </iInput>
                  </iFormItem>
              </el-col>
          </el-row>
      </el-form>
  </iCard>
</template>

<script>
import {iCard,iInput,iSelect,iFormItem} from 'rise'
export default {
    name:'theColorPartsBasic',
    components:{iCard,iInput,iSelect,iFormItem},
    data(){
        return {
            BMGoptions:[
                {
                    label:"是",
                    value:1
                },
                {
                    label:"否",
                    value:0
                }
            ],
            //common sourcing下拉
            ZPoptions:[],
            //专业组下拉
            profationalOptions:[]
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
    margin-left: 20px;
    position: relative;
    .check-box{
        position: absolute;
        left: -170px;
        ::v-deep .el-checkbox__inner{
            border-radius: 4px;
        }
    }
}
</style>