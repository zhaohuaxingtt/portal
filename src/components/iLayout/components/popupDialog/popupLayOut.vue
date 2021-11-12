<template>
<div class="popupContent">
    <detailDialog :show.sync="showDialog" :detail='detail'  ></detailDialog>
</div>
  
</template>

<script>
import detailDialog from './index.vue'
import {getPopupList} from '@/api/popupWindowMgmt'
import { getgetPopupSocketMessage } from '@/api/mail'
export default {
    name:'detailDialog',
    components:{
        detailDialog
    },
    data(){
        return{
            showDialog:false,
            detail:{
                title:'',
                content:'',
                picUrl:'',
                linkUrl:''
            },
            popupDataList:[],
            closeItemList:[],
            closePopupSocket:null
        }
    },
    /* mounted(){
        this.closePopupSocket =  getgetPopupSocketMessage(res =>{
            let _this = this
            const data = res.msgTxt
            this.popupData = data
            if( this.popupDataList.length > 5){
                this.closeItemList[4].close()
            }
            if(data.type == 5 && data.subType ==5){
                this.$notify({
                duration: 0,
                dangerouslyUseHTMLString: true,
                message:`<div style='display: flex;justify-content: space-between;cursor:pointer;'>
                            <div class="popupLeft" style='width:50px;height:50px; '>
                                <img src="${data.picUrl}" style='width:100%;height:100%; border-radius: 50%;'>
                            </div>
                            <div class="popupRight" style='position:relative;margin-left:20px'>
                                <p class='${data.linkUrl && 'linkTitle'}' 
                                style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
                                width:100px;font-weight:bolder;font-size:16px;position:absolute;color: #0D2451;'
                                >
                                ${data.title}
                                </p>
                                <p style='overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:150px;position:absolute;top:30px;color: #4B5C7D;'
                                >${data.content}</p>
                            </div>
                            </div>`,
                position:'bottom-right',
                onClick(){
                    _this.openDialog()
                    }
                })
            }
        })
    },
    beforeDestroy(){
        this.closePopupSocket()
    },
    methods:{
        getPopupItemList(){
            const accountId =  JSON.parse(sessionStorage.getItem('userInfo')).accountId
            getPopupList(accountId).then((res) => {
                console.log('ppp');
                if(res.code == 200){
                    const popupDataList = res.data
                    // JSON.parse(sessionStorage.getItem('popup')).popupItemList = popupDataList
                    // this.$store.dispatch('setPopupItems',popupDataList)
                    this.popupDataList = popupDataList
                    let _this = this
                    popupDataList.forEach((ele,index)=>{
                        this.closeItemList[index] = this.$notify({
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
        openDialog(index){
            
            this.showDialog = true
            console.log(this.showDialog);
            this.detail = {
                title:this.popupDataList[index].popupName,
                content:this.popupDataList[index].content,
                picUrl:this.popupDataList[index].picUrl ,
                linkUrl:this.popupDataList[index].linkUrl
            }
            
            this.closeItemList[index].close()
        }
    } */

}
</script>

<style lang="scss" scoped>
.popupContent{
    position: relative;
    width: 600px;
    height: 100%;
    background-color: red;
}
</style>