<!--
 * @Author: HS   维护结论
 * @FilePath: \front-portal\src\views\meeting\managementHall\mbdlMeeting\component\editprotectConclusion.vue
-->
<!-- 结束结论 -->
<template>
  <div>
<!-- 1)	当结论=冻结/不通过时，任务可编辑，点击确认更新任务；
2)	当结论=待定时，结论和任务均可编辑，点击确认后更新结论和任务，
如果结论不为待定，回调GP接口，更行MBDL状态； -->
2131
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
              :disabled="optionDisabled"
            >
              <el-option
              :disabled="optionDisabled"
                :value="item.conclusionCsc"
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
          class="result"
        >
          <iLabel :label="$t('任务')" slot="label" class="task-title"></iLabel>
          <iInput
          :disabled="isDisabled"
            type="textarea"
            v-model="ruleForm.result"
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
import { modifyConclusionById } from '@/api/meeting/gpMeeting'
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
        result:''
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
      isShow:true,
      isDisabled:true,//任务
      optionDisabled:true,//结论

    }
  },
  props:["editprotectConclusionDialogRow"],
  mounted(){
      if (this.editprotectConclusionDialogRow.result == '02' || this.editprotectConclusionDialogRow.result == '04') {
          this.isDisabled =false 
          this.optionDisabled = true
      }else{
          this.isDisabled =false
          this.optionDisabled = false
      }
    console.log(this.editprotectConclusionDialogRow.conclusion)
    this.ruleForm.conclusion=this.editprotectConclusionDialogRow.conclusion  
    this.ruleForm.result=this.editprotectConclusionDialogRow.result
  },
  methods: {
    // 提交
    handleSure(){
      const params = {
       conclusion:this.ruleForm.conclusion,//任务
      //  meetingId:this.$route.query.id,//会议id
       result:this.ruleForm.result说z,//结论
       themenId:this.editprotectConclusionDialogRow.id//议题id
      }
      console.log(params);
      modifyConclusionById(params).then((res) => {
        if (res.code) {
          iMessage.success('修改议题成功！')
          this.$emit('flushTable')
          this.$emit('close')
        }else{
          iMessage.success('修改会议失败！')
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
