<!--
 * @Author: wentliao
 * @Date: 2021-12-30 15:23:00
 * @Description: 新增规则弹窗
-->
<template>
  <iDialog
    :title="openType=='add' ? language('QUALITYSCORERULES_TIANJIAGUIZE','添加规则') : language('QUALITYSCORERULES_BIANJIGUIZE','编辑规则')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="50%"
    class="addRulesDialog"
  >
  <ul class="content">
      <li>
          <p>{{language('LK_RUGUOMANZUYIXIATIAOJIAN','如果满足以下条件')}}:</p>
          <div>
              <iSelect :value="language('LK_LINGJIANHAODISIWEI','零件号第4位')" disabled></iSelect>
              <iSelect value="=" disabled></iSelect>
              <iSelect v-model="form.num">
                  <el-option
                      v-for="(item,index) in 10"
                      :key="item+'_numlist_'+index"
                      :label="index"
                      :value="index+''"
                      >
                    </el-option>
              </iSelect>
          </div>
      </li>
      <li>
          <p>{{language('LK_ZEYUSHEPINGFENWEI','则预设评分人为')}}:</p>
          <div>
              <iSelect v-model="form.rateDepartNum" @change="changeRateDepartNum($event)">
                <el-option
                    v-for="(item,index) in departList || []"
                    :key="'departList_'+index"
                    :label="item.rateDepart"
                    :value="item.rateDepartNum"
                    >
                </el-option>
              </iSelect>
              <iSelect v-model="form.rateUser">
                <el-option
                    v-for="(item,index) in userList || []"
                    :key="'userList_'+index"
                    :label="item.userName"
                    :value="item.userId"
                    >
                </el-option>
              </iSelect>
          </div>
      </li>
  </ul>
  <span slot="footer" class="dialog-footer">
    <iButton @click="dialogVisible = false">{{language('QUXIAO','取消')}}</iButton>
    <iButton @click="submit" :loading="btnLoading">{{ language("QUEDING", "确定") }}</iButton>
  </span>
  </iDialog>
</template>

<script>
import {
    iDialog,
    iButton,
    iSelect,
    iMessage,
} from 'rise';
import { getListSysRateDepart,setMqRules,putMqRulesByIdList } from "@/api/scoreConfig/qualityscorerules"
export default {
    name:'addRulesDialog',
    components:{
        iDialog,
        iButton,
        iSelect,
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false,
        },
        requestData:{
            type:Array,
            default:()=>[],
        },
        openType:{ // 弹窗打开方式:新增/编辑
            type:String,
            default:'add',
        },
        multipleSelection:{
            type:Array,
            default:()=>[],
        }
    },
    
  watch: {
    dialogVisible(val) {
      if(val) {
          this.init();
      }
    }
  },
    data(){
        return{
            form:{
                num:'',
                index:4,
                compare:'=',
                rateDepartNum:'',
                rateUser:'',
            },
            departList:[],
            userList:[],
            btnLoading:false,
        }
    },
    methods:{
        init(){
            if(this.openType == 'edit'){ // 编辑
                const item = this.multipleSelection[0] || {};
                this.getDepartList(item.deptName,true);
                this.form = {
                    index:'4',
                    compare:'=',
                    num:(item.num+'') || '',
                    rateDepartNum:item.deptName || '',
                    rateUser:(item.userId+'') || '',
                    ruleId:item.ruleId || null,
                }
            }else{ // 新增
            this.getDepartList();
                this.form = {num:'',index:'4',compare:'=',rateDepartNum:''},
                this.userList = [];
            }
            
        },
        clearDialog(){
            this.$emit('changeVisible','addRulesDialogVisible',false);
        },
        // 获取预设评分人下拉数据
        async getDepartList(value,isEditInit=false){
            await getListSysRateDepart({rateTag:'MQ'}).then((res)=>{
                if(res.code == '200'){
                    this.departList = res.data || [];
                    if(value) this.changeRateDepartNum(value,isEditInit);
                }else{
                    this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            })
        },
        
        changeRateDepartNum(value,isEditInit=false){
            const { departList = [] } = this;
            const departItem= departList.filter((item)=>item.rateDepartNum == value);
            if(Array.isArray(departItem) && departItem.length){
                this.userList = departItem[0].raterList || [];
                if(!isEditInit) this.$set(this.form,'rateUser','');
            }
        },

        // 提交
        async submit(){
            if(!this.form.num || !this.form.rateDepartNum || !this.form.rateUser){
                iMessage.warn(this.language('LK_AEKO_QINGTIANXIEWANZHENGHOUTIJIAO','请填写完整后提交'));
            }else{
                console.log(this.form);
                const deptList = this.departList.filter((item)=>item.rateDepartNum == this.form.rateDepartNum);
                const userList = this.userList.filter((item)=>item.userId == this.form.rateUser);
                const data = {
                    ruleNodeList:[{
                        compare:this.form.compare,
                        index:this.form.index,
                        num:this.form.num,
                        dept:{
                            deptId:deptList[0].rateDepartId,
                            deptName:deptList[0].rateDepartName,
                            deptNum:deptList[0].rateDepartNum,
                        },
                        user:{
                            userId:userList[0].userId,
                            userName:userList[0].userName,
                        },
                    }]
                }
                this.btnLoading = true;
                if(this.openType == 'edit'){
                    await putMqRulesByIdList({...data,ruleId:this.form.ruleId}).then((res)=>{
                        this.btnLoading = false;
                        if(res.code == '200'){
                            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                            this.$emit('getList');
                            this.clearDialog();
                        }else{
                            this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                        }
                    }).catch(()=>{ this.btnLoading = false });
                }else{
                    await setMqRules(data).then((res)=>{
                        this.btnLoading = false;
                        if(res.code == '200'){
                            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                            this.$emit('getList');
                            this.clearDialog();
                        }else{
                            this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                        }
                    }).catch(()=>{ this.btnLoading = false });
                }
                
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .addRulesDialog{
        .content{
            li{
                margin-bottom: 20px;
                p{
                    padding: 10px 0;
                }
                >div{
                    display: flex;
                    .el-select{
                        width: 30%;
                        margin-right: 2%;
                    }
                }
                
            }
        }
    }
</style>