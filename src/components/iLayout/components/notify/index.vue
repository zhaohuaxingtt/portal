<template>
  <div class="popupContent">
    <notifyDialog v-show="showDialog" :show.sync="showDialog" :detail="detail" />
  </div>
</template>

<script>
import notifyDialog from './notifyDialog.vue'
import { getPopupList ,changeCheckedSta} from '../../api'
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
      iniTimes:0,//0
      iniPopupData:[],
      showItems:0,//5
      detaliData:{}
    }
  },
  mounted() {
    this.closePopupSocket = getgetPopupSocketMessage((res) => {
      // let _this = this
      const data = res.msgTxt
      if(this.popupDataList.length > 4){
        this.popupDataList.splice(0,1)
        this.popupDataList.push(data) 
      }else{
        this.popupDataList.push(data) 
      }
      this.clearNotify()

      // if(this.showItems < 5){
      //   this.showItems++
      // }else{
      //   while(this.handelClick.includes(this.iniTimes)){
      //       this.iniTimes++
      //   }
      //     this.closeItemList[this.iniTimes].type ='automatic' 
      //     this.closeItemList[this.iniTimes].notify.close()
          
      //     this.iniTimes++
      // }
      // if (data.type ==4  && data.subType == 5) {
      //   const index = _this.closeItemList.length 
      //     this.closeItemList.push ( 
      //       {'notify':this.$notify({
      //       duration: 0,
      //       dangerouslyUseHTMLString: true,
      //       message: `<div style='display: flex;justify-content: space-between;cursor:pointer;'>
      //                         <div class="popupLeft" style='width:50px;height:50px; '>
      //                             <img src="${
      //                              JSON.parse(data.param).picUrl || '/portal/static/img/popupPic.f3ff87ac.png'
      //                             }" style='width:100%;height:100%; border-radius: 50%;'>
      //                         </div>
      //                         <div class="popupRight" style='position:relative;margin-left:20px'>
      //                             <p class='${data.linkUrl && 'linkTitle'}'
      //                             style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;height:100%
      //                             width:100px;font-weight:bolder;font-size:16px;position:absolute;color: #0D2451;;'
      //                             >
      //                             ${data.title}
      //                             </p>
      //                             <p style='overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:150px;position:absolute;top:30px;color: #4B5C7D;'
      //                             >${data.content}</p>
      //                         </div>
      //                         </div>`,
      //       position: 'bottom-right',
      //       onClick() {
      //         _this.openDialog(index)
      //       },
      //       onClose(isautomatic){
      //         _this.closeItemList.splice(index,1)
      //         _this.handelClick.push(index)
      //           if(isautomatic.type == 'automatic'){
      //             _this.showItems > 5 ? _this.showItems-- : ''
      //           }else{
      //             _this.showItems--
      //             _this.getLatest()
      //           }
      //       }
      //     }),
      //     'times':0
      //     })
      // }
    })
  },
  beforeDestroy() {
    this.closePopupSocket()
  },
  created(){
    this.getLatest('init')
  },
  methods: {
    openDialog(index) {
      const data = {
        userId:JSON.parse(sessionStorage.getItem('userInfo')).accountId,
        popupId:this.popupDataList[index].id || JSON.parse(this.popupDataList[index].param).popupId
      }
      changeCheckedSta(data).then((res)=>{
        if(res.code == 200){
          const data = res.data
          const y = data.publishTime.slice(0,4)
          const M = data.publishTime.slice(5,7)
          const d = data.publishTime.slice(8,10)
          const h = data.publishTime.slice(11,13)
          const m = data.publishTime.slice(14,16)
          let time = `${y}年   ${M}月${d}日${h}时${m}分`
          this.detail = {
            title: data.popupName,
            content: data.content,
            picUrl: data.picUrl,
            linkUrl: data.linkUrl,
            popupStyle:data.popupStyle,
            publishTime:time
          }
          this.showDialog = true
          this.clearNotify()
        }else{
          this.$message.error(res.desZh)
        }
      })
    },
    getLatest(init){
      // console.log('sssss',this.closeItemList);
      // if(this.closeItemList.length != 0){
        
      //   this.closeItemList.forEach((ele)=>{
      //     console.log('ele',ele);
      //     // if(ele.times == 0){
      //       ele.notify.close()
      //     // }
      //   })
        this.closeItemList = []
      //   this.iniTimes = 0
      //   this.showItems = 0
        // this.popupDataList = []
      //   this.handelClick = []
      // }
      const accountId = JSON.parse(sessionStorage.getItem('userInfo')).accountId
      getPopupList(accountId).then((res) => {
        if (res.code == 200) {
          let popupDataList = res.data
          // if(popupDataList === this.popupDataList){
          //   popupDataList.splice()
          // }else{
          //   this.popupDataList = []
          // }
          this.popupDataList = popupDataList.reverse()
          if(init == 'init'){
            this.iniNotify()
          }else{
            this.iniNotify()
          }
          // let _this = this
          // if(popupDataList.length > 5){
          //   popupDataList = popupDataList.slice(0,5)
          // }
          // popupDataList.reverse()
          // this.showItems = popupDataList.length

          // popupDataList.forEach((ele, index) => {
          //   window.setTimeout(()=>
          //     this.closeItemList[index] = { 
          //     'notify': this.$notify({
          //       duration: 0,
          //       dangerouslyUseHTMLString: true,
          //       customClass:'notifyHandel',
          //       message: `<div style='display: flex;justify-content: space-between;cursor:pointer'>
          //                                 <div class="popupLeft" style='width:50px;height:50px; '>
          //                                     <img src="${
          //                                       ele.picUrl ?  ele.picUrl : '/portal/static/img/popupPic.f3ff87ac.png'
          //                                     }" style='width:100%;height:100%; border-radius: 50%;'>
          //                                 </div>
          //                                 <div class="popupRight" style='position:relative;margin-left:20px'>
          //                                     <p class='${
          //                                       ele.linkUrl && 'linkTitle'
          //                                     }'
          //                                     style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;height:100%;
          //                                     width:100px;font-weight:bolder;font-size:16px;position:absolute;color: #0D2451;'
          //                                     >
          //                                     ${ele.popupName}
          //                                     </p>
          //                                     <p style='overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:150px;position:absolute;top:30px;color: #4B5C7D;'
          //                                     >${ele.content}</p>
          //                                 </div>
          //                             </div>`,
          //       position: 'bottom-right',
          //       onClick() {
          //         _this.openDialog(index)
          //       },
          //       onClose(isautomatic){
          //         _this.closeItemList.splice(index,1)
          //         _this.handelClick.push(index)
          //         if(isautomatic.type == 'automatic'){
          //           _this.showItems > 5 ? _this.showItems-- : ''
          //         }else{
          //           _this.showItems--
          //           _this.getLatest()
          //         }
          //       },
          //     }),
          //   'times':0
          //   },1)
          // })
        } else {
          this.$message.error(res.desZh)
        }
      })
    },
    clearNotify(){
      if(this.closeItemList){
        this.closeItemList.forEach((ele) => {
          if(ele.notify){
            ele.notify.close()
          }
        })
      }
      this.getLatest()
    },
    iniNotify(){
      let _this = this
      this.popupDataList.forEach((ele, index) => {
        window.setTimeout(()=>
          this.closeItemList[index] = { 
          'notify': this.$notify({
            duration: 0,
            dangerouslyUseHTMLString: true,
            customClass:'notifyHandel',
            message: `<div style='display: flex;justify-content: space-between;cursor:pointer'>
                      <div class="popupLeft" style='width:50px;height:50px; '>
                          <img src="${
                            ele.picUrl ?  ele.picUrl : '/portal/static/img/popupPic.f3ff87ac.png'
                          }" style='width:100%;height:100%; border-radius: 50%;'>
                      </div>
                      <div class="popupRight" style='position:relative;margin-left:20px'>
                          <p class='${
                            ele.linkUrl && 'linkTitle'
                          }'
                          style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;height:100%;
                          width:100px;font-weight:bolder;font-size:16px;position:absolute;color: #0D2451;'
                          >
                          ${ele.popupName}
                          </p>
                          <p style='overflow: hidden;white-space:nowrap;text-overflow:ellipsis;width:150px;position:absolute;top:30px;color: #4B5C7D;'
                          >${ele.content}</p>
                      </div>
                  </div>`,
            position: 'bottom-right',
            onClick() {
              _this.openDialog(index)
            },
            onClose(){
              // _this.popupDataList.splice(index,1)
              // _this.iniNotify()
            },
          }),
        'times':0
        },1)
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
