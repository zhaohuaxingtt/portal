<!--
 * @Author: wentliao
 * @Date: 2021-12-30 14:28:32
 * @Description: 质量评分规则
-->
<template>
  <iPage class="qualityscorerules">
      <div class="header clearFloat">
        <iNavMvp :list="list" :lang="true" :lev="1" routerPage></iNavMvp>
        <div class="control">
            <!-- <iLoger
            :config="{
                module_obj_ae: '评分部门', 
                menuName_obj_ae: ''
            }"
            isPage
            credentials
            class="margin-left20"/> -->
            <span class="margin-left20">
            <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
            </span>
        </div>
      </div>
    <iSearch
      class="margin-top25"
      icon
      @sure="getList"
      @reset="reset"
      :resetKey="PARTSIGN_RESETBUTTON"
      :searchKey="PARTSIGN_CONFIRMBUTTON"
    >
        <el-form>
            <el-form-item v-permission.auto="QUALITYSCORERULES_SEARCH_PINGFENGU|评分股" :label="language('QUALITYSCORERULES_PINGFENGU', '评分股')" >
                <iInput v-model="searchForm.deptName" :placeholder="language('LK_QINGSHURU','请输入')"/>
            </el-form-item>
            <el-form-item v-permission.auto="QUALITYSCORERULES_SEARCH_PINGFENREN|评分人" :label="language('UALITYSCORERULES_PINGFENREN', '评分人')">
                <iInput v-model="searchForm.userName" :placeholder="language('LK_QINGSHURU','请输入')"/>
            </el-form-item>
        </el-form>
    </iSearch>
    <iCard class="margin-top20">
        <template v-slot:header-control>
            <iButton v-permission.auto="QUALITYSCORERULES_BUTTON_ADD|添加" @click="edit">{{ language("BIANJI", "编辑") }}</iButton>
            <iButton v-permission.auto="QUALITYSCORERULES_BUTTON_ADD|添加" @click="add">{{language("TIANJIA", "添加")}}</iButton>
            <iButton v-permission.auto="QUALITYSCORERULES_BUTTON_DELETE|删除" @click="deletRule" :loading="btnLoading.deletRule">{{ language('SHANCHU', '删除') }}</iButton>
        </template>
        <div class="body" v-permission.auto="QUALITYSCORERULES_TABLE|质量评分预设规则表单">
            <tableList
            class="table"
            index
            :lang="true"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            height="100%"
            @handleSelectionChange="handleSelectionChange"
            >
            </tableList>
        </div>
        
    </iCard>

    <!-- 新增弹窗 -->
    <addRulesDialog :dialogVisible="addRulesDialogVisible" :openType="dialogopenType" @changeVisible="changeVisible" @getList="getList" :requestData="requestData" :multipleSelection="selectItems"/>
  </iPage>
</template>

<script>

import {
    iPage,
    iNavMvp,
    icon,
    iSearch,
    iInput,
    iCard,
    iButton,
} from 'rise'
import { TAB } from '../data'
import tableList from "rise/web/quotationdetail/components/tableList";
import { tableTitle } from "./components/data"
import addRulesDialog from './components/addRulesDialog'
import { getAllMqRules,deleteMqRulesByIdList } from "@/api/scoreConfig/qualityscorerules"
export default {
    name:'qualityscorerules',
    components:{
        iPage,
        iNavMvp,
        icon,
        iSearch,
        iInput,
        tableList,
        iCard,
        iButton,
        addRulesDialog,
    },
    data(){
        return{
            list: TAB,
            tableListData:[],
            tableTitle:tableTitle || [],
            addRulesDialogVisible:false,
            searchForm:{
                deptName:'',
                userName:'',
            },
            requestData:[],
            selectItems:[],
            btnLoading:{
                deletRule:false,
            },
            dialogopenType:'add',
        }
    },
    created(){
        this.getList();
    },
    methods:{
        changeVisible(type,show){
            this[type] = !!show;
        },
        // 获取列表
        async getList(){
            this.loading = true;
            await getAllMqRules(this.searchForm).then((res)=>{
                this.loading = false;
                if(res.code == '200'){
                    const tableListData = []
                    res.data.forEach(item => {
                        const Sitem = {
                            ruleName: item.ruleName,
                            ruleId: item.ruleId,
                            ruleDes: item.ruleDes,
                            updateTime:item.updateTime
                        }
                        if (item.ruleNodeList && item.ruleNodeList.length) {
                            item.ruleNodeList.forEach(rule => {
                                Sitem.num = rule.num
                                Sitem.deptName = rule.deptNum || (rule.dept && rule.dept.deptNum) || ''
                                Sitem.userName = rule.userName || (rule.user && rule.user.userName) || ''
                                Sitem.userId = rule.userId || (rule.user && rule.user.userId) || ''
                            })
                        }
                        tableListData.push(Sitem)
                    })
                    this.tableListData = tableListData;
                    this.requestData = res.data || [];
                }else{
                    this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch(()=>{
                this.loading = false;
            })
        },

        reset(){
            this.searchForm = {deptNum:'',userName:''};
            this.getList();
        },

        handleSelectionChange(val) {
            this.selectItems = val;
        },

        // 删除
        async deletRule(){
            const {selectItems} = this;
            const tips =  this.language('createparts.QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据');
          if(!selectItems.length){
              this.$message.warning(tips);
              return false;
          }else{
              await this.$confirm(
                this.language('submitSure','您确定要执行提交操作吗？'),
                this.language('LK_SHANCHU','删除'),
          ).then(()=>{
            this.btnLoading.deletRule = true;
            const ids = (selectItems.map((item)=>item.ruleId));
            deleteMqRulesByIdList(ids).then((res)=>{
                this.btnLoading.deletRule = false;
              if(res.code ==200){
                this.$message.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                this.getList();
              }else{
                this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
              }
            })
          }).catch(()=>{
            this.btnLoading.deletRule = false;
          })
          }
        },
        // 添加规则
        add(){
            this.dialogopenType = 'add';
            this.changeVisible('addRulesDialogVisible',true);
        },
        // 编辑
        edit(){
            if(this.selectItems.length == 1){
                this.dialogopenType = 'edit';
                this.changeVisible('addRulesDialogVisible',true);
            }else{
                this.$message.warning(this.language('CONFIGSCOREDEPT_QINGJINGOUXUANYITIAOSHUJUHOUBIANJI','请仅勾选一条数据后编辑'));
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .qualityscorerules{
    .header {
        position: relative;
        margin-bottom: 40px;
        .title {
        font-size: 20px;
        font-weight: bold;
        color: #000;
        height: 28px;
        line-height: 28px;
        }

        .control {
        position: absolute;
        top: 50%;
        right: 0;
        // 影响到了日志弹窗，暂时注释掉，后面用其他属性代替
        // transform: translate(0, -50%);
        display: flex;
        align-items: center;
        height: 30px;
        }
    }
    .card {
    padding-bottom: 20px;
    .body {
      height: calc(100vh - 550px);
      min-height: 350px;
    }
  }
    }
</style>