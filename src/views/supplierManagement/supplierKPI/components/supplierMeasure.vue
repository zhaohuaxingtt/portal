<!--
 * @Author: caopeng
 * @Date: 2021-010-13
-->
<template>
  <div>
    <iPage>
      <div class="header-title-box">
        <p>{{ supplierName }}措施内容详情</p>
        <!-- <iButton v-if="isSubmitted" @click="handleForward">{{
          language('ZHUANPAI', '转派')
        }}</iButton> -->
      </div>

      <iCard>
        <div class="header-box">
          <div class="hleft-box">
            <span class="heade-title">{{
              language(
                'GAIGONGYSBLRZDZDDX,SFCQCS',
                '该供应商被列⼊重点追踪对象，是否对其采取措施：'
              )
            }}</span>
            <div>
              <el-radio-group @change="handleisTake" :disabled="!isSubmitted" v-model="isTakeSteps">
                <iRadio :label="true">{{
                  language('CAIQUCUOSHI', '采取措施')
                }}</iRadio>
                <iRadio :label="false">{{
                  language('ZANBUCAIQUCUOSHI', '暂不采取措施')
                }}</iRadio>
              </el-radio-group>
            </div>
          </div>

          <iButton v-if="!isTakeSteps && isSubmitted" @click="handleSave">{{
            language('TIJIAO', '提交')
          }}</iButton>
        </div>
      </iCard>
      <iCard style="margin-top:20px" v-if="isTakeSteps">
        <div class="section-box">
          <span
            >{{ language('CHULIXIANGQING', '处理详情') }}
            <span style="color:red">*</span></span
          >
          <iButton v-if="isSubmitted" @click="handleSave">{{
            language('TIJIAO', '提交')
          }}</iButton>
        </div>
        <div>
          <iInput
            v-if="isSubmitted"
            style="margin-top:20px"
            :placeholder="language('QINGSHURUCHULIXIANGQING', '请输入处理详情…')"
            type="textarea"
            v-model="takeStepsContent"
            maxlength="200"
            show-word-limit
          ></iInput>
          <div
          
            class="sectionContent"
            v-if="!isSubmitted"
          >
            {{ takeStepsContent }}
          </div>
        </div>
      </iCard>
      <iDialog
        @close="handleClose"
        :title="language('ZHANPAI', '转派')"
        :visible.sync="isShow"
        width="32%"
        height="500"
      >
        <div class="dialogBox">
          <iSelect
            style="width:200px"
            :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
            v-model="targetUserId"
            filterable
          >
            <el-option
              v-for="item in personList"
              :key="item.nameZh"
              :label="item.nameZh"
              :value="item.id"
            >
            </el-option>
          </iSelect>
        </div>

        <span slot="footer" class="dialog-footer">
          <i-button @click="handleBtn">{{
            language('QUEDING', '确定')
          }}</i-button>
          <i-button @click="handleClose">{{
            language('QUXIAO', '取消')
          }}</i-button>
        </span>
      </iDialog>
    </iPage>
  </div>
</template>

<script>
import {
  iPage,
  iCard,
  iRadio,
  iButton,
  iInput,
  iDialog,
  iSelect,
  iMessage,
  iText,
  iMessageBox
} from 'rise'
import {
  keyTrackSupplierSub,
  getKeyTrackSupplier,
  getTransferee,
  taskTransfer
} from '@/api/kpiChart/spi.js'
export default {
  components: {
    iPage,
    iCard,
    iRadio,
    iButton,
    iInput,
    iDialog,
    iSelect,
    iText
  },
  data() {
    return {
      takeStepsContent: '',
      targetUserId: '',
      isShow: false,
      takeStepsList: {},
      personList: [],
      isTakeSteps: true,
      businessid: '',
      isSubmitted: true,
      supplierName: ''
    }
  },
  created() {
     
    this.businessid = this.$route.query.id
    this.getList()
  },

  methods: {
    //获取转派人
    getUser() {
      getTransferee({
          deptId:this.$store.state.permission.userInfo.deptDTO.id,
          roleCode:'LINIE'
      }).then(res => {
        if (res && res.code) {
          this.personList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    //查询
    getList() {
      const params = {
        id: this.businessid
      }
      getKeyTrackSupplier(params).then(res => {
        if (res && res.code == 200) {
          this.isTakeSteps = res.data.isTakeSteps
          this.takeStepsContent = res.data.takeStepsContent
          this.supplierName = res.data.supplierName
          if (res.data.isTakeSteps == null) {
            this.isSubmitted = true
          } else {
            this.isSubmitted = false
          }
        } else {
          this.isSubmitted = false
          iMessage.error(res.desZh)
        }
      })
    },
    //提交按钮
    handleSave() {
      if (this.isTakeSteps==null) {
        this.$message({
          type: 'warning',
          message: this.language(
            'QINGXUANZESHIFOUCAIQUCUOSHI',
            '请选择是否采取措施'
          )
        })
      } else if (
        (this.takeStepsContent == '' || this.takeStepsContent == null) &&
        (this.isTakeSteps||this.isTakeSteps==null)
      ) {
        this.$message({
          type: 'warning',
          message: this.language('QINGSHURUXIANGQINGNEIRONG', '请输入详情内容')
        })
      } else {
        iMessageBox(
          this.language('SHIFOUQUERENTIJIAO?', '是否确认提交'),
          this.language('TIJIAO', '提交'),
          {
            confirmButtonText: this.language('SHI', '是'),
            cancelButtonText: this.language('FOU', '否')
          }
        ).then(async () => {
          const params = {
            isTakeSteps: this.isTakeSteps,
            id: this.businessid,
            takeStepsContent: this.takeStepsContent
          }
          if(!this.isTakeSteps){
              params.takeStepsContent=''
          }
          console.log(params)
          keyTrackSupplierSub(params).then(res => {
            if (res && res.code == 200) {
              iMessage.success(this.language('TIJIAOCHENGGONGLE', '提交成功'))
              this.getList()
            } else this.$message({ type: 'warning', message: res.desZh })
          })
        })
      }
    },
    // 发起转派
    handleBtn() {
      let params = {
        targetUserId: this.targetUserId,
        businessIds: [this.businessid],
        type: 'keyTrackTask',
        targetUserName: this.personList.find(item => {
          return item.id == this.targetUserId
        }).userNum+' '+this.personList.find(item => {
          return item.id == this.targetUserId
        }).nameZh
      }
      taskTransfer(params).then(res => {
        if (res && res.code == 200) {
          iMessage.success(this.language('TIJIAOCHENGGONGLE', '提交成功'))
          this.isShow = false
          this.isSubmitted = false
        } else iMessage.error(res.desZh)
      })
    },
    handleForward() {
      this.getUser()
      this.isShow = true
    },
    handleClose() {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dialogBox {
  height: 240px;
  //   padding: 40px 0;
}
h3 {
  font-size: 20px;
  font-family: Arial;
  font-weight: bold;
  color: #000000;
  padding-bottom: 20px;
}
.heade-title {
  font-size: 18px;
  font-family: Arial;
  font-weight: 400;
  color: #000000;
}
.header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .hleft-box {
    //   width: 70%;
    display: flex;
    align-items: center;
    div {
      margin-left: 40px;
    }
  }
}
.header-title-box {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  p {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
  }
}
.section-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  > span {
    font-size: 18px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
  }
}
::v-deep .el-textarea {
  height: 580px;
}
.sectionContent {
      word-wrap: break-word;
  word-break: break-all;
  background: #f8f8fa;
  border-radius: 6px;
  height: 580px;
  padding: 10px;
  margin-top: 20px;
}
::v-deep .el-textarea .el-textarea__inner {
  height: 100%;
}
</style>
