<template>
  <i-dialog :title="language('LK_YQ_SHANGHAIZHONGHUIQICHEYOUXIANGONGSI', '上海汇众汽车有限公司')"
            :visible.sync="value"
            width="96%"
            height="90%"
            @close="clearDialog"
            >
    <div class="content" style="font-size:1rem">
      <!-- 第一行 -->
      <i-form-group v-model="opinionMonitoringItem" row="3">

        <i-form-item :label="language('LK_YQ_GONGYINGSHANGMINGCHEN','供应商名称')">
          <i-input v-model='opinionMonitoringItem.name'></i-input>
        </i-form-item>
        <i-form-item :label="language('LK_YQ_GONGYINGSHANGJIANCHENG','供应商简称')">
          <i-input v-model='opinionMonitoringItem.shortName'></i-input>
        </i-form-item>
        <i-form-item :label="language('LK_YQ_TONGYISHEHUIXINYONGDAIMA','统一社会信用代码')">
          <i-text>{{ opinionMonitoringItem.socialcreditNo }}</i-text>
        </i-form-item>

        <i-form-item :label="language('LK_YQ_FABURIQI','发布日期')">
          <i-text>{{ opinionMonitoringItem.releaseDate|formatDate }}</i-text>
        </i-form-item>

        <i-form-item :label="language('LK_YQ_WANGZHILIANJIE','网址链接')">
          <i-input v-model='opinionMonitoringItem.link'></i-input>
        </i-form-item>

        <i-form-item :label="language('LK_YQ_XIANGGUANKESHI','相关科室')">
          <i-select v-model='opinionMonitoringItem.existSectionName'>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item) in departments"
              :key="item.value"
            ></el-option>
          </i-select>
        </i-form-item>
        <i-form-item :label="language('LK_YQ_NEIRONGFENLEI','内容分类')">
          <i-text>{{ opinionMonitoringItem.contentClassification }}</i-text>
        </i-form-item>
        <i-form-item :label="language('LK_YQ_SHIFOUMINGAN','是否敏感')">
          <i-text>{{ opinionMonitoringItem.isSensitive==1?'是':'否' }}</i-text>
        </i-form-item>
      </i-form-group>
      <i-form-group row='1'>
        <el-row>
          <el-col :span='24' >
            <!--内容标题-->
              <i-form-item :label="language('LK_YQ_NEIRONGBIAOTI','内容标题')">
                <i-input disabled v-model="opinionMonitoringItem.title"></i-input>
              </i-form-item>
          </el-col>

        </el-row>
      </i-form-group>

      <el-row :gutter="60">
        <el-col :span="3"><span>{{language('LK_YQ_XIANGQINGNEIRONG','详情内容')}}</span></el-col>
      </el-row>
      <el-row :gutter="60" class='margin-top20'>
        <el-col :span="24"><i-input type="textarea" :rows="8" clearable class="textarea" disabled v-model="opinionMonitoringItem.remark"></i-input></el-col>
      </el-row>
      <el-row class='margin-top20'>
        <div style="float:right;padding-bottom:20px"><i-button @click="modifyOpinionMonitoringItem"><span>{{language('LK_YQ_BAOCUN','保存')}}</span></i-button></div>
      </el-row>
    </div>
  </i-dialog>
</template>

<script>
import { iDialog, iFormGroup,iSelect, iFormItem, iText, iInput, iButton } from 'rise'
import {
  queryOpinionMonitoringDetail,
  updatePublicOptionMonitoringItem
} from '@/api/supplierManagement/publicOpinionMonitoring'
import * as dateUtils from "@/utils/date";

  export default {
    name:'yuqingjianceDialog',
    components:{
      iButton,
      iDialog,
      iSelect,
      iFormGroup,
      iInput,
      iFormItem,
      iText
    },
    props:{
      value:{type: Boolean, require: true, default: false},
      opinionMonitoringId:{type:String,require: true,default: null}
    },
    filters:{
      formatDate(value) {
        if (value == null || value == '') return ''
        //let creationTimeStr= new Date(+new Date(value) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        let date = new Date(value);
        return dateUtils.formatDate(date, 'yyyy-MM-dd')
      },
    },
    data(){
      return{
        opinionMonitoringItem:{},
        departments:[],
      }
    },
    watch:{
      opinionMonitoringId(val){
       this.getOpinionMonitoringDetail()
      }
    },
    methods:{
      clearDialog() {
        this.$emit('input', false)
      },

     //获取舆情详情
      getOpinionMonitoringDetail(){
        queryOpinionMonitoringDetail(this.opinionMonitoringId).then(res=>{
          if(res.code==200){
            this.opinionMonitoringItem=res.data
          }
        })
      },
      //修改舆情
      modifyOpinionMonitoringItem(){
        updatePublicOptionMonitoringItem(this.opinionMonitoringItem).then(res=>{
          if(res.code==200){
            this.$message.success(res.desZh)
            this.$emit('refrshPage')
            this.$emit('input', false)
          }else{
            this.$message.error(res.desZh)
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>

  .textarea{
    font-size:14px;
    /* background-color: rgb(248,248,250) */
  }
</style>