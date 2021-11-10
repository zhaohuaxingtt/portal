<!--
* @author:shujie
* @Date: 2021-4-13 16:57:20
* @Description: 注册首页
 -->
<template>
  <div class="home">
    <basic ref="basic" :supplierData="supplierBasicInfoDTO"></basic>
    <buyer ref="buyer" :supplierData="supplierBasicInfoDTO"></buyer>
    <!-- 验证码输入框 -->
    <messageBox v-model="visible"  title="请输入校验码" :placeholder="'请输入校验码'" @sure="sure" error="校验码不能为空"></messageBox>
  </div>
</template>

<script>
import {iMessage,iMessageBox} from "rise";
import {verification, indexNext} from "@/api/register/home";
import messageBox from "@/components/messageBox"
import basic from "./components/basic";
import buyer from "./components/buyer";
import {generalPageMixins} from '@/views/generalPage/commonFunMixins';
import resultMessageMixin from "@/mixins/resultMessageMixin.js";
export default {
	mixins: [generalPageMixins,resultMessageMixin],
	components: {
		messageBox,basic,buyer
	},
	data() {
		return {
		supplierBasicInfoDTO: {},
		visible: false//验证码输入弹窗
	}
	},
	created() {
		this.supplierBasicInfoDTO=this.$store.state.home.supplierBasicInfoDTO
		if (this.supplierBasicInfoDTO.dunsCode) {
			this.refs.basic.splitDuns
		}
	},
	methods: {
		baseRulesValid() {
		return new Promise((resolve, reject) => {
			this.$refs.basic.$refs.baseRulesForm.validate((valid) => {
			if (valid) {
				resolve(valid)
			} else {
				return false;
			}
        });
      })
    },
    purchaseRulesValid() {
      return new Promise((resolve, reject) => {
        this.$refs.buyer.$refs.purchaseRulesForm.validate((valid) => {
			if (valid) {
				resolve(valid)
			} else {
				return false;
			}
        });
      })
    },
    // 验证是不是已经注册的用户
    saveInfos() {
		Promise.all([this.baseRulesValid(), this.purchaseRulesValid()]).then(() => {
			let dunsCode=this.$refs.basic.getDunsCode()
			if (dunsCode!=1){
				this.supplierBasicInfoDTO.stepCode='register'
				this.supplierBasicInfoDTO.dunsCode=dunsCode
				indexNext(this.supplierBasicInfoDTO).then(res=>{
          if (!res.result) {
            this.resultMessage(res)
          }
					if (res.data) {
						if (res.data.isValidate == 'Y') {
							this.visible = true
						} else {
							iMessageBox(res.data.supplierToken,'请妥善保管验证码',{
								confirmButtonText:'确定',
								showClose:false,
								showCancelButton:false,
								callback:action=>{
									this.$store.dispatch('setValiCode', res.data.supplierToken)
									this.$store.dispatch('setBaseInfoList', this.supplierBasicInfoDTO)
									this.$emit('onJumpNext')
								}
							})
							
						}
					}
				}).catch(()=>{
					iMessage.error('信息错误')
				})	
			} 
		})    
    },
    //验证+获取基本信息
	verification() {
		let data = {
			supplierType: this.supplierBasicInfoDTO.supplierType,
			valiCode: this.supplierBasicInfoDTO.valiCode
		}
		verification(data,this.supplierType).then(res => {
			this.visible = false
			if (res.data && res.data.success) {
				this.$store.dispatch('setValiCode', res.data.supplierToken)
				this.$store.dispatch('setBaseInfoList', this.supplierBasicInfoDTO)
				this.$emit('onJumpNext')
			} else {
				iMessage.error('请输入正确的校验码')
			}
		})	
    },
	async handleNextStep() {
		await this.saveInfos()
		return false
	},
   
    // 输入校验码
    sure(value) {
      this.supplierBasicInfoDTO.valiCode = value
      this.verification()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
