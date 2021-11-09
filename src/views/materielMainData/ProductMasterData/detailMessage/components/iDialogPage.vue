<template>

    <iDialog
    :visible.sync="showSta"
    :title="papgeTitle"
    @close="closeDialog"
    width="480px"
    >
    <div class="formContent">
      <el-form label-position="left" label-width="160px" :rules="rules" :model="formContent" class="validate-required-form" ref='ruleForm'>
        <el-row>
          <el-col>
            <iFormItem :label='labelTitle.partNum' prop='sixPartCode'>
              <iInput :placeholder='placeholderText' v-model="formContent.sixPartCode" :disabled='inputSta' @input="searchlinieBySix"></iInput>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row >
          <el-col>
            <iFormItem :label='labelTitle.partNameZh' >
              <iInput :placeholder='placeholderText' v-model="formContent.partNameZh" :disabled='inputSta'></iInput>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <iFormItem :label='labelTitle.partNameDe' >
              <iInput :placeholder='placeholderText' v-model="formContent.partNameDe" :disabled='inputSta'></iInput>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col>
            <iFormItem :label='labelTitle.partNameEn' >
              <iInput :placeholder='placeholderText' v-model="formContent.partNameEn" :disabled='inputSta'></iInput>
            </iFormItem>
          </el-col> -->
        </el-row>
        <!-- <el-row>
          <el-col>
            <iFormItem :label='labelTitle.checkBooked' prop='isFixAsset'>
              <iSelect placeholder='请选择' v-model="formContent.isFixAsset" :disabled='inputSta'>
                <el-option
                v-for='item in checkBookedOptions'
                :key='item.value'
                :label='item.label'
                :value='item.value'
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col>
            <iFormItem :label='labelTitle.Linie' >
              <iInput  v-model="formContent.linie[0].linie" disabled></iInput>
            </iFormItem>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <iFormItem :label='labelTitle.LiniePartment' >
              <iInput  v-model="formContent.linie[0].dept" disabled></iInput>
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="btnList" style="padding-bottom:20px">
      <div v-show='readOnly'>
          <iButton @click="edit">编辑</iButton>
      </div>
      <div v-show="!readOnly">
        <iButton @click="save('ruleForm')">保存</iButton>
        <iButton @click="reset">重置</iButton>
      </div>
      <div style="margin-left:10px">
        <iButton @click="closeDialog">退出</iButton>
      </div>
      
    </div>
    </iDialog>
    
</template>

<script>
import {iDialog,iInput,iButton,iFormItem} from 'rise'
import {getSixNUmDetail,updateSixNum,saveSixNum,getChangeSixParts,getLinieBySixNum} from '@/api/materiel/productData.js'
export default {
    name:'iDialogPage',
    components:{iDialog,iInput,iButton,iFormItem},
    props:{
      inputId:{
        type:String,
        default:''
      },
      openStatus:{
        type:Boolean,
        default:false
      },
      productId:{
        type:String,
        default:''
      }
    },
    computed:{},
    data(){
      return{
        inputSta:false,
        readOnly:true,
        showSta:false,
        papgeTitle:'编辑',
        tabelListId:'',
        labelTitle:{
          partNum:'零件六位号',
          partNameZh:'零件名称(中)',
          partNameDe:'零件名称(德)',
          partNameEn:'零件名称(英)',
          checkBooked:'入账是否抽查',
          Linie:'Linie',
          LiniePartment:'Linie科室'
        },
        formContent:{
          sixPartCode:'',
          partNameZh:'',
          partNameDe:'',
          partNameEn:'',
          // isFixAsset:'',
          linie:[{
            linie:'',
            dept:''
          }]
        },
        placeholderText:'请输入',
        checkBookedOptions:[
          {
            label:'是',
            value:true
          },
          {
            label:'否',
            value:false
          },
        ],
        rules:{
          // isFixAsset:[{required:true,message:'请选择是否入账抽查',trigger:'blur'}],
          sixPartCode:[{required:true,message:'请输入零件六位号',trigger:'blur'}]
        },
        ruleForm:{
          sixPartCode:''
        }
      }
    },
    watch: {
      openStatus(val) {
        this.showSta = val
      }
    },
    methods:{
      save(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            if(this.papgeTitle == '新增'){
              let data = {
                ...this.formContent,
                pgId:this.$route.query.id ? this.$route.query.id : this.productId
              }
              saveSixNum(data).then((val) => {
                if(val.code == 200){
                  this.$message.success('保存成功')
                }else if(val.code == 1){
                  this.$message.error(val.desZh)
                }
              }).catch(()=>{
                this.$message.error('保存失败')
              }).finally(() =>{
                this.$emit('upSearch')
                this.closeDialog()
              })
            }else{
              let data = {
                ...this.formContent,
                pgId:this.$route.query.id ? this.$route.query.id : this.productId,
                id:this.inputId
              }
              updateSixNum(data).then((val) =>{
                if(val.code == 200){
                  // this.formContent = val.data
                  this.$message.success('更新成功')
                }else if(val.code == 1){
                  this.$message.error(val.desZh)
                }
              }).catch(() =>{
                this.$message.error('更新失败')
              }).finally(()=>{
                this.$emit('upSearch')
                this.closeDialog()
              })
            }
          }else{
            return false
          }
        })
      },
      searchlinieBySix(val){
        if(val.length == 6){
          let sixPartNum = val
          getChangeSixParts(sixPartNum).then((val) => {
            if(val.code == 200){
              // let requireData = val.data
              // if(requireData && requireData.length != 0){
              //   let linie = []
              //   let dept = []
              //   requireData.forEach((item) => {
              //     item.linie!=null ? linie.push(item.linie) : ''
              //     item.dept!= null ? dept.push(item.dept) : ''
              //   });
                
              //   this.formContent.linie[0].linie = linie.join(',')
              //   this.formContent.linie[0].dept = dept.join(',')
              // }else{
              //   this.formContent.linie=[{
              //     linie:'',
              //     dept:''
              //   }]
              // }
              this.formContent.partNameZh = val.data.partNameZh
              this.formContent.partNameDe = val.data.partNameDe
              this.formContent.partNameEn = val.data.partNameEn
              this.formContent.linie[0].linie = val.data.linieNames
              this.formContent.linie[0].dept = val.data.deptCodes
            }else if(val.code == 1){
              this.formContent.partNameZh = ''
              this.formContent.partNameDe = ''
              this.formContent.partNameEn = ''
              this.formContent.linie[0].linie = ''
              this.formContent.linie[0].dept = ''
            }
          }).catch(()=>{
          })
        }
      },
      reset(){
        this.formContent={
          sixPartCode:'',
          partNameZh:'',
          partNameDe:'',
          partNameEn:'',
          // isFixAsset:'',
          linie:[{
            linie:'',
            dept:''
          }]
        }
      },
      edit(){
        this.readOnly = false
        this.inputSta = false
      },
      closeDialog(){
        this.$emit('closeDialog',false)
      }
    },
    created(){
      if(this.inputId !=''){
        getSixNUmDetail(this.inputId).then((val)=>{
          if(val.code == 200){
            this.formContent = val.data
            this.papgeTitle = val.data.sixPartCode
            let vos = val.data.linie
            let linie = []
            let dept = []
            if(vos && vos.length != 0 ){
                for(let item of vos){
                item.linie!=null ? linie.push(item.linie) : ''
                item.dept!= null ? dept.push(item.deptCode) : ''
              }
              linie.length != 0 ? this.formContent.linie[0].linie = linie.join(',') : this.formContent.linie[0].linie=''
              dept.length != 0 ? this.formContent.linie[0].dept = dept.join(',') : this.formContent.linie[0].dept=''
            }else{
               this.formContent.linie = [{
                 linie:'',
                 dept:''
               }] 
            }
          }else if(val.code == 1){
            this.$message.error(val.desZh)
          }
        }).catch((err)=>{
          this.$message.error('获取产品组关联零件6位号详情失败')
        })
      }else{
        this.papgeTitle = '新增'
      }
      this.showSta = this.openStatus
      this.readOnly = this.inputId ? true :false
      this.inputSta = this.inputId ? true :false
    },
}
</script>

<style lang='scss' scoped>
.btnList{
  display: flex;
  justify-content: flex-end;
}
</style>