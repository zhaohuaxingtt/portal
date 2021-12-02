<template>
  <i-dialog :title="language('SHANGHAIZHONGHUIQICHEYOUXIANGONGSI', '上海汇众汽车有限公司')"
            :visible.sync="value"
            width="96%"
            height="90%"
            @close="clearDialog"
            >
    <div class="content" style="font-size:14px">
      <!-- 第一行 -->
      <el-row :gutter="60">
        <el-col :span="3">
          <span>{{language('GONGYINGSHANGMINGCHENG','供应商名称')}}</span>
        </el-col>
        <el-col :span="5">
          <i-input v-model="msg.name"></i-input>
        </el-col>
        <el-col :span="3">
          <!-- <el-form-item :label="language('GONGYINGSHANGJIANCHENG','供应商简称')"></el-form-item> -->
          <span>{{language('GONGYINGSHANGJIANCHENG','供应商简称')}}</span>
        </el-col>
        <el-col :span="5">
          <i-input v-model="msg.abbreviation"></i-input>
        </el-col>
        <el-col :span="3">
          <span>{{language('TONGYISHEHUIXINYONGDAIMA','统一社会信用代码')}}</span>
        </el-col>
        <el-col :span="5">
          <i-input disabled v-model="msg.code"></i-input>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <el-row :gutter="60">
        <el-col :span="3">
          <span>{{language('FABURIQI','发布日期')}}</span>
        </el-col>
        <el-col :span="5">
          <i-input disables v-model="msg.date"></i-input>
        </el-col>
        <el-col :span="3">
          <span>{{language('FABURIQI','发布日期')}}</span>
        </el-col>
        <el-col :span="5">
          <i-input v-model="msg.link"></i-input>
        </el-col>
        <el-col :span="3">
          <span>{{language('XIANGGUANKESHI','相关科室')}}</span>
        </el-col>
        <el-col :span="5">
          <i-select v-model="value" :placeholder="language('QINGXUANZE','请选择')">
            <el-option
              v-for="item in msg.department"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </i-select>
        </el-col>
      </el-row>
      <!-- 第三行 -->
      <el-row :gutter="60">
        <el-col :span="3">
          <span>{{language('NEIRONGFENLEI','内容分类')}}</span>
        </el-col>
        <el-col :span="5">
          <i-input disabled v-model="msg.classify"></i-input>
        </el-col>
        <el-col :span="3">
          <span>{{language('SHIFOUMINGAN','是否敏感')}}</span>
        </el-col>
        <el-col :span="5">
          <i-input disabled v-model="msg.isSusceptible"></i-input>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="3">
          <span>{{language('NEIRONGBIAOTI','内容标题')}}</span>
        </el-col>
        <el-col :span="21">
          <i-input v-model="msg.title"></i-input>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="3"><span>{{language('XIANGQINGNEIRONG','详情内容')}}</span></el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="24"><i-input type="textarea" :rows="12" clearable class="textarea" disabled v-model="msg.content"></i-input></el-col>
      </el-row>
      <el-row>
        <div style="float:right;padding-bottom:20px"><i-button @click="save"><span>{{language('BAOCUN','保存')}}</span></i-button></div>
      </el-row>
    </div>
  </i-dialog>
</template>

<script>
  import {iButton, iDialog, iSelect, iInput} from 'rise'

  export default {
    name:'yuqingjianceDialog',
    components:{
      iButton,
      iDialog,
      iSelect,
      iInput
    },
    props:{
      value:{type: Boolean, require: true, default: false},
    },
    data(){
      return{
        msg:{
          name:"上海汇众汽车有限公司",
          abbreviation:"供应商简称",
          code:"1234567",
          date:"2020-01-01",
          link:"http:/www.wwwwwwww.com",
          department:[{
            value:"1",
            label:'ABC'
          },{
            value:"2",
            label:"DEF"
          }],
          classify:"其他",
          isSusceptible:"是",
          title:"是",
          content:"可乐不加冰"
        }
      }
    },
    methods:{
      clearDialog() {
        this.$emit('input', false)
      },
      save(){
        this.$emit('input', false)
      }
    }
  }
</script>

<style>
  .contentLeft{
    display: inline;
    float: left;
  }
  .contentRight{
    display: inline;
    float: right;
    width: 300px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .textarea{
    font-size:14px;
    /* background-color: rgb(248,248,250) */
  }
</style>