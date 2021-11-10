<template>
  <iPage>
        <div class="page-header">
            <div class="header">
                <pageHeader class="title">{{language('弹窗管理')}}</pageHeader>
                <div>
                    <iButton @click="save">{{language('保存')}}</iButton>
                    <iButton @click="reset">{{language('重置')}}</iButton>
                    <iButton @click="preview">{{language('预览')}}</iButton>
                </div>
            </div>
        </div>
        <iCard style="margin-top:20px">
            <div class="content">
                <new-left ref="newLeft" :formData='formData'/>
                <new-right ref="newRight" />
            </div>
        </iCard>
  </iPage>
</template>

<script>
import {iPage,iButton,iCard} from 'rise'
import{newLeft,newRight} from './components/index'
import pageHeader from '@/components/pageHeader'
import {savePopup} from '@/api/popupWindowMgmt'
export default {
    name:'createNew',
    components:{iPage,pageHeader,iButton,iCard,newLeft,newRight},
    data(){
        return{
            linkUrl:''
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
            const newLeftSave = this.$refs.newLeft.save()
            const data = {
                ...formData,
                picUrl
            }
            if(newLeftSave){
                savePopup(data).then((res)=>{
                if(res.code == 200){
                    this.$message.success('保存成功')
                }else{
                    this.$message.error(res.desZh || '保存失败')
                }
            })
            }
        },
        preview(){
            const formData = this.$refs.newLeft.formData()
            this.linkUrl = formData.linkUrl
            const picUrl = this.$refs.newRight.linkUrl()
            let _this = this
            this.$notify({
                // title:formData.popupName,
                // ${formData.linkUrl && '<a href="'+formData.linkUrl+'"></a>'}
                duration: 0,
                dangerouslyUseHTMLString: true,
                message:`<div style='display: flex;justify-content: space-between;${formData.linkUrl && 'cursor:pointer;'}'>
                            <div class="popupLeft" style='width:50px;height:50px; '>
                              <img src="${picUrl}" style='width:100%;height:100%; border-radius: 50%;'>
                            </div>
                            <div class="popupRight" style='position:relative;margin-left:20px'>
                              <p class='${formData.linkUrl && 'linkTitle'}' 
                                style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
                                width:100px;font-weight:bolder;font-size:16px;position:absolute;color: #0D2451;
                                ${formData.linkUrl && 'text-decoration:underline'}'>
                                ${formData.popupName}
                              </p>
                              <p style='overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:150px;position:absolute;top:34px;color: #4B5C7D;'
                              >${formData.content}</p>
                            </div>
                          </div>`,
                position:'bottom-right',
                onClick(){
                    _this.toNewPage()
                }
            })
        },
        toNewPage(){
            if(this.linkUrl){
                window.open(this.linkUrl)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.header{
    display: flex;
    justify-content: space-between;
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