<!-- 结束结论 -->
<template>
  <div>

  <!-- 分段定点  待定 只有下拉框和任务 -->
  <!-- Last Call  有下拉框和任务rfq发送对象 -->
  <!-- 不通过  提交  任务 文本框 -->
    <iEditForm>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
        class="form-box"
      >
        <!-- 结论 -->
        <iFormItem prop="conclusionCsc" >
          <div class="operate">
            <div class="operate-title">
              <span class="conclusion">结论</span>
              <span class="required-icon">*</span>
            </div>
            <iSelect
              v-model="ruleForm.conclusion"
              placeholder="请选择"
              @change="changeConclusion($event)"
              class="operate-select"
              value-key="conclusionCsc"
              :disabled="isOther"
            >
              <el-option
                :value="item"
                :label="item.conclusionName"
                v-for="(item, index) of themenConclusionArrObj"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
        </iFormItem>
        <!-- 任务 -->
        <iFormItem  v-if="isShow"
          label="任务"
          prop="taskCsc"
          :hideRequiredAsterisk="true"
          class="task"
        >
          <iLabel :label="$t('任务')" slot="label" class="task-title"></iLabel>
          <iInput
            type="textarea"
            v-model="ruleForm.taskCsc"
            placeholder="请输入任务"
            :rows="6"
          ></iInput>
        </iFormItem>
      </el-form>
    </iEditForm>
    <div class="button-list">
      <iButton class="sure" @click="handleSure" :loading="loading" v-if="isShow">提交</iButton>
      <iButton class="cancel" @click="handleCancel">取消</iButton>
    </div>
    </div>
</template>
<script>
import { endThemen } from '@/api/meeting/gpMeeting'
import commonTable from '@/components/commonTable'
import iEditForm from '@/components/iEditForm'
import iTableML from '@/components/iTableML'
import {
  iDialog,
  iFormItem,
  iSelect,
  iLabel,
  iInput,
  iButton,
  iMessage,
} from 'rise'

export default {
  components: {
    iDialog,
    iFormItem,
    iEditForm,
    iSelect,
    iLabel,
    iInput,
    iButton,
    iTableML,
    commonTable
  },
  data() {
    return {
      ruleForm:{
        conclusion:'',
        taskCsc:''
      },
      themenConclusionArrObj:[
          {
            conclusionCsc: "",
            conclusionName: "请选择",
          },
          {
            conclusionCsc: "01",
            conclusionName: "待定",
          },
          {
            conclusionCsc: "02",
            conclusionName: "通过",
          },
          {
            conclusionCsc: "04",
            conclusionName: "不通过",
          },
      ],
      isShow:true

    }
  },
  props:{
    selectThemenId:String,
  },
  mounted(){

  },
  methods: {
    // 提交
    handleSure(){
      const params = {
       conclusion: this.ruleForm.conclusion.conclusionCsc,//结论
       meetingId:this.$route.query.id,//会议id
       result:this.ruleForm.taskCsc,//任务
       themenId:this.selectThemenId//议题id
      }
      console.log(params);
      endThemen(params).then((res) => {
        if (res.code) {
          iMessage.success('结束议题成功！')
          this.$emit('flushTable')
          this.$emit('close')
        }else{
          iMessage.success('结束会议失败！')
        }
      })
      
    },
    // 关闭
    handleCancel(){
      this.$emit('close')

    },
    changeConclusion(e){
      console.log(e);
      if (e.conclusionName == "请选择") {
        this.isShow = false
      }else{
        this.isShow = true
      }
    }
    
  }
}
</script>
<style lang="scss" scoped>
.commonTablediv{
  margin-bottom: 20px;
}
::v-deep .el-table__header {
  // background-color: #fff;
  .el-table-column--selection {
    .el-checkbox__inner {
      display: none;
    }
  }
  .cell {
    color: #333333;
    font-size: 14px;
    font-weight: 400;
  }
}
.button-list {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 65px;
  .sure {
    width: 100px;
  }
  .cancel {
    margin-left: 30px;
    width: 100px;
  }
}
.switch-content {
  display: flex;
  align-items: center;
  height: 22px;
  .freeze {
    width: 84px;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    white-space: nowrap;
  }
  .swicth {
    margin-left: 30px;
    position: relative;
    width: 42px;
    height: 22px;
    background-color: #1663f6;
    border-radius: 11px;
    .text {
      width: 12px;
      height: 22px;
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;
      line-height: 22px;
      transform: translateX(8px);
    }
    .circle {
      cursor: pointer;
      top: 50%;
      right: 1px;
      transform: translateY(-50%);
      position: absolute;
      height: 20px;
      width: 20px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}
.operate {
  display: flex;
  height: 35px;
  align-items: center;
  .operate-select {
    height: 35px;
    width: 240px;
    margin-left: 30px;
  }
  .conclusion {
    width: 32px;
    height: 35px;
    font-size: 16px;
    font-weight: 400;
    line-height: 35px;
  }
  .required-icon {
    /* position: absolute; */
    margin-left: 4px;
    margin-right: 35px;
    color: red;
    /* top: 50%; */
    /* transform: translate(-10px, -50%); */
  }
}
.next-meeting {
  .operate-select {
    height: 35px;
    width: 240px;
  }
  .operate-title {
    margin-bottom: 10px;
  }
  .conclusion {
    width: 32px;
    height: 28px;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
  }
  .required-icon {
    /* position: absolute; */
    margin-left: 4px;
    margin-right: 35px;
    color: red;
    /* top: 50%; */
    /* transform: translate(-10px, -50%); */
  }
}
::v-deep .task-input {
  width: 798px;
  height: 170px;
  border-radius: 4px;
  border: dashed 1px #e4e7ee;
  background: #ffffff;
  .el-textarea__inner {
    resize: none !important;
    width: 100%;
    height: 100%;
  }
}
.task-title {
  width: 32px;
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  white-space: nowrap;
  color: #4d4f5c;
}
</style>
