<template>
  <iPage>
        <div class="page-header">
            <div class="header">
                <!-- <pageHeader class="title">{{language('弹窗管理')}}</pageHeader> -->
                <div>
                    <iButton @click="save">{{language('发布')}}</iButton>
                    <iButton @click="reset">{{language('重置')}}</iButton>
                    <iButton @click="preview">{{language('预览')}}</iButton>
                </div>
            </div>
        </div>
        <iCard style="margin-top:20px">
            <div class="content">
                <new-left ref="newLeft" :formData='formData' @cutterRateSty='cutterRateSty' />
                <new-right ref="newRight" :cutterRate='cutterRate' />
            </div>
        </iCard>
        <detailDialog :show.sync='show' :detail='detail' />
  </iPage>
</template>

<script>
import {iPage,iButton,iCard} from 'rise'
import{newLeft,newRight} from './components/index'
import pageHeader from '@/components/pageHeader'
import {savePopup} from '@/api/popupWindowMgmt'
import detailDialog from './components/detailDialog.vue'
export default {
    name:'createNew',
    components:{iPage,pageHeader,iButton,iCard,newLeft,newRight,detailDialog},
    data(){
        return{
            formData:{},
            show:false,
            detail:{
                title:'',
                content:'',
                picUrl:'',
                linkUrl:''
            },
            picUrl:'',
            instance:'',
            cutterRate:0
        }
    },
    methods:{
        reset(){
            this.$refs.newLeft.reset()
            this.$refs.newRight.reset()
        },
        async save(){
            let formData = this.$refs.newLeft.formData()
            const picUrl = this.$refs.newRight.linkUrl()
            //校验是否通过校验
            let newLeftSave = this.$refs.newLeft.save()
            console.log('pppp');
            let accountIds = []
            let supplierIds = []
            if(formData.publishRange == 15){
                if( (formData.userList || formData.supplierList) ){
                    if(formData.userList){
                        accountIds = formData.userList.map((ele) =>{
                        return ele.accountId
                        })
                    }
                    if(formData.supplierList){
                        supplierIds = formData.supplierList.map((ele)=>{
                            return ele.id
                        })
                        }
                }else{
                    newLeftSave = false
                    this.$message.error('请选择用户/供应商')
                }
            }
            const data = {
                ...formData,
                picUrl,
                accountIds,
                supplierIds,
            }
            if(newLeftSave){
                savePopup(data).then((res)=>{
                if(res.code == 200){
                    this.$message.success('发布成功')
                    if(window.opener){
                        window.opener.location.reload()
                        window.setTimeout(()=>{
                            // window.close()
                        },1000)
                    }
                }else{
                    this.$message.error(res.desZh || '发布失败')
                }
            })
            }
        },
        preview(){
            const formData = this.$refs.newLeft.formData()
            this.formData = formData
            this.picUrl = this.$refs.newRight.linkUrl()
            this.openDialog()
        },
        openDialog(){
            let time = ''
            if(!this.formData.publishPreTime){
                const date = new Date()
                const y = date.getFullYear()
                const M = date.getMonth() + 1
                const d = date.getDate()
                const h = date.getHours()
                const m = date.getMinutes()
                time = `${y}年   ${M}月${d}日${h}时${m}分`
            }else{
                console.log(this.formData.publishPreTime);
                const y = this.formData.publishPreTime.slice(0,4)
                const M = this.formData.publishPreTime.slice(5,7)
                const d = this.formData.publishPreTime.slice(8,10)
                const h = this.formData.publishPreTime.slice(11,13)
                const m = this.formData.publishPreTime.slice(14,16)
                time = `${y}年   ${M}月${d}日${h}时${m}分`
            }
            this.show = true
            this.detail = {
                title:this.formData.popupName,
                content:this.formData.content,
                picUrl:this.picUrl,
                linkUrl:this.formData.linkUrl,
                publishTime:time,
                popupStyle:this.formData.popupStyle,
                wordAlign:this.formData.wordAlign
            }
        },
        cutterRateSty(val){
            console.log('====');
            this.cutterRate = val
        }
    }
}
</script>

<style lang="scss" scoped>
.header{
    display: flex;
    justify-content: flex-end;
}
.content{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
.linkTitle{
    color: #0D2451;
    
    border-bottom: 1px solid black;
}
</style>