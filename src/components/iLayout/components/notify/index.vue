<template>
  <div class="popupContent">
    <notifyDialog v-if="showDialog" :show.sync="showDialog" :detail="detail" />
  </div>
</template>

<script>
import notifyDialog from './notifyDialog.vue'
import { getPopupList ,changeCheckedSta} from '@/api/popupWindowMgmt'
import { getgetPopupSocketMessage } from '@/api/mail'
export default {
  name: 'layoutNotify',
  components: {
    notifyDialog
  },
  data() {
    return {
      showDialog: false,
      detail: {
        title: '',
        content: '',
        picUrl: '',
        linkUrl: ''
      },
      popupDataList: [],
      closeItemList: [],
      closePopupSocket: null,
      handelClick:[],
      iniTimes:0,
      showItems:0
    }
  },
  // mounted() {
  //   this.closePopupSocket = getgetPopupSocketMessage((res) => {
  //     let _this = this
  //     const data = res.msgTxt
  //     this.popupDataList.push(data) 
  //     if(this.showItems < 5){
  //       this.showItems++
  //     }else{
  //       if(this.handelClick.includes(this.iniTimes)){
  //         do{
  //           this.iniTimes++
  //         }while(!this.handelClick.includes(this.iniTimes))
  //       }
  //         this.closeItemList[this.iniTimes].close()
  //         this.iniTimes++
  //     }
  //     if (data.type == 5 && data.subType == 4) {
  //       const index = _this.closeItemList.length 
  //         this.closeItemList.push ( this.$notify({
  //           duration: 0,
  //           dangerouslyUseHTMLString: true,
  //           message: `<div style='display: flex;justify-content: space-between;cursor:pointer;'>
  //                             <div class="popupLeft" style='width:50px;height:50px; '>
  //                                 <img src="${
  //                                  JSON.parse(data.param).picUrl || '/portal/static/img/popupPic.f3ff87ac.png'
  //                                 }" style='width:100%;height:100%; border-radius: 50%;'>
  //                             </div>
  //                             <div class="popupRight" style='position:relative;margin-left:20px'>
  //                                 <p class='${data.linkUrl && 'linkTitle'}'
  //                                 style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
  //                                 width:100px;font-weight:bolder;font-size:16px;position:absolute;color: #0D2451;'
  //                                 >
  //                                 ${data.title}
  //                                 </p>
  //                                 <p style='overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:150px;position:absolute;top:30px;color: #4B5C7D;'
  //                                 >${data.content}</p>
  //                             </div>
  //                             </div>`,
  //           position: 'bottom-right',
  //           onClick() {
  //             _this.openDialog(index)
  //           }
  //         }))
  //     }
  //   })
  // },
  // beforeDestroy() {
  //   this.closePopupSocket()
  // },
  // created(){
  //   const accountId = JSON.parse(sessionStorage.getItem('userInfo')).accountId
  //     getPopupList(accountId).then((res) => {
  //       if (res.code == 200) {
  //         let popupDataList = res.data
  //         this.popupDataList = popupDataList
  //         let _this = this
  //         if(popupDataList.length > 5){
  //           popupDataList = popupDataList.slice(0,5)
  //         }
  //         popupDataList.reverse()
  //         this.showItems = popupDataList.length
  //         popupDataList.forEach((ele, index) => {
  //           window.setTimeout(()=>
  //             this.closeItemList[index] =  this.$notify({
  //             duration: 0,
  //             dangerouslyUseHTMLString: true,
  //             customClass:'notifyHandel',
  //             message: `<div style='display: flex;justify-content: space-between;cursor:pointer'>
  //                                       <div class="popupLeft" style='width:50px;height:50px; '>
  //                                           <img src="${
  //                                             ele.picUrl ?  ele.picUrl : '/portal/static/img/popupPic.f3ff87ac.png'
  //                                           }" style='width:100%;height:100%; border-radius: 50%;'>
  //                                       </div>
  //                                       <div class="popupRight" style='position:relative;margin-left:20px'>
  //                                           <p class='${
  //                                             ele.linkUrl && 'linkTitle'
  //                                           }'
  //                                           style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
  //                                           width:100px;font-weight:bolder;font-size:16px;position:absolute;color: #0D2451;'
  //                                           >
  //                                           ${ele.popupName}
  //                                           </p>
  //                                           <p style='overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:150px;position:absolute;top:30px;color: #4B5C7D;'
  //                                           >${ele.content}</p>
  //                                       </div>
  //                                   </div>`,
  //             position: 'bottom-right',
  //             onClick() {
  //               _this.openDialog(index)
  //             }
  //           }),1)
  //         })
  //       } else {
  //         this.$message.error(res.desZh)
  //       }
  //     })
  // },
  methods: {
    openDialog(index) {

      this.showDialog = true
      this.handelClick.push(index)
      this.detail = {
        title: this.popupDataList[index].popupName ? this.popupDataList[index].popupName: this.popupDataList[index].title,
        content: this.popupDataList[index].content,
        picUrl: this.popupDataList[index].picUrl ? this.popupDataList[index].picUrl : JSON.parse(this.popupDataList[index].param).picUrl,
        linkUrl: this.popupDataList[index].linkUrl ? this.popupDataList[index].linkUrl : this.popupDataList[index].url
      }
      this.closeItemList[index].close()
      console.log(this.popupDataList[index],'this.popupDataList[index]');
      const data = {
        userId:JSON.parse(sessionStorage.getItem('userInfo')).accountId,
        popupId:this.popupDataList[index].id
      }
      changeCheckedSta(data).then((res)=>{
        if(res.code != 200){
          this.$message.error(res.desZh)
        }
      })
    }
  }
}
</script>

<style lang="scss" >
.popupContent {
  width: 600px;
  height: 100%;
  background-color: red;
}
.notifyHandel{
  margin: 0px; 
}

</style>
