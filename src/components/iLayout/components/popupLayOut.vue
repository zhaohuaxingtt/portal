<template>
  <detailDialog :show="show" :detail='detail'></detailDialog>
</template>

<script>
import detailDialog from '@/components/popupDialog'
import {getPopupList} from '@/api/popupWindowMgmt'
export default {
    name:'detailDialog',
    components:{
        detailDialog
    },
    data(){
        return{
            show:false,
            detail:{
                title:'',
                content:'',
                picUrl:'',
                linkUrl:''
            },
            popupDataList:[]
        }
    },
    mounted(){
        const accountId =  JSON.parse(sessionStorage.getItem('userInfo')).accountId
        getPopupList(accountId).then((res) => {
            if(res.code ==200){
                const popupDataList = res.data
                console.log(popupDataList,'popupDataList');
                let _this = this
                popupDataList.forEach((ele,index)=>{
                    this.$notify({
                        duration: 0,
                        dangerouslyUseHTMLString: true,
                        message:`<div style='display: flex;justify-content: space-between;cursor:pointer;'>
                                    <div class="popupLeft" style='width:50px;height:50px; '>
                                        <img src="${ele.picUrl}" style='width:100%;height:100%; border-radius: 50%;'>
                                    </div>
                                    <div class="popupRight" style='position:relative;margin-left:20px'>
                                        <p class='${ele.linkUrl && 'linkTitle'}' 
                                        style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
                                        width:100px;font-weight:bolder;font-size:16px;position:absolute;color: #0D2451;'
                                        >
                                        ${ele.popupName}
                                        </p>
                                        <p style='overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:150px;position:absolute;top:30px;color: #4B5C7D;'
                                        >${ele.content}</p>
                                    </div>
                                </div>`,
                        position:'bottom-right',
                        onClick(){
                            _this.openDialog(index)
                            }
                    })
                })

            }else{
                this.$message.error(res.desZh)
            }
        })
    },
    methods:{
        openDialog(index){
            this.shoiw = true
            this.detail = {
                title:this.popupDataList[index].popupName,
                content:this.popupDataList[index].content,
                picUrl:this.popupDataList[index].picUrl,
                linkUrl:this.popupDataList[index].linkUrl
            }
        }
    }

}
</script>

<style>

</style>