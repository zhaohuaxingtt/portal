<template>
  <div class="mail">
    <i-drawer
      class="messageDrawer1"
      :visible.sync="visible"
      v-loading="loading"
    >
      <el-tabs :stretch="true" v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabs" :key="item.name" :name="item.name">
          <span slot="label">
            <i :class="item.icon"></i>
            {{ item.title }}
            <el-badge is-dot class="item" v-if="item.unread"></el-badge>
            <span v-if="item.unread">(未读{{ item.unread }}条)</span>
          </span>
          <component
            ref="list"
            :is="item.content"
            :tab="item.nameInt"
            @listCallback="handleListCallback"
            @unReadCallback="handleUnreadCallback"
            @triggerCallback="handleTriggerCallback"
            @hide-drawer="() => $emit('hide-drawer')"
          ></component>
        </el-tab-pane>
      </el-tabs>
    </i-drawer>
    <popupDialog  :show='show' :detail='detail' @close='close'/>
  </div>
</template>

<script>
import { iDrawer } from 'rise'
import { list } from './components'
import popupDialog from '@/components/popupDialog'
import { getHomeSocketMessage,getgetPopupSocketMessage } from '@/api/mail'
export default {
  components: { iDrawer ,popupDialog},
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        for (let li in this.$refs.list) {
          this.$refs.list[li].getTypeOptions()
          this.$refs.list[li].getList()
          this.$refs.list[li].getUnreadCount()
        }
      }
    }
  },
  mounted() {
    console.log('inMail getHomeSocketMessage')
    getgetPopupSocketMessage(res =>{
      let _this = this
      const data = res.msgTxt
      this.popupData = data
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
    this.closeSocket = getHomeSocketMessage((messages) => {
      const tab = messages.msgTxt.type
      const type = messages.msgTxt.subType
      console.log(messages.msgTxt)
      this.$emit('triggerCallback')
      if (tab === '4') {
        this.$refs.list[1].getUnreadCount()
        /* this.$refs.list[1].query.type === '' ||
        this.$refs.list[1].query.type === type
          ? this.$refs.list[1].list.unshift(messages.msgTxt)
          : '' */
        if (
          this.$refs.list[1].query.type === '' ||
          this.$refs.list[1].query.type === type
        ) {
          this.getNewList()
        }
      } else if (tab === '5') {
        this.$refs.list[0].getUnreadCount()
        if (
          this.$refs.list[0].query.type === '' ||
          this.$refs.list[0].query.type === type
        ) {
          this.getNewList()
        }
        /* this.$refs.list[0].query.type === '' ||
        this.$refs.list[0].query.type === type
          ? this.$refs.list[0].list.unshift(messages.msgTxt)
          : '' */
      }
    })
  },
  beforeDestroy() {
    this.closeSocket()
  },
  data() {
    return {
      show:false,
      popupData:{},
      detail:{
        title:'',
        content:'',
        picUrl:'',
        linkUrl:''
      },
      activeTab: '0',
      closeSocket: null,
      num: [],
      timer: null,
      tabs: [
        {
          title: '通知',
          content: list,
          unread: 0,
          name: '0',
          nameInt: 0,
          icon: 'el-icon-bell'
        },
        {
          title: '消息',
          content: list,
          unread: 0,
          name: '1',
          nameInt: 1,
          icon: 'el-icon-copy-document'
        }
      ]
    }
  },
  methods: {
    close(val){
      this.show = val
    },
    openDialog(){
      this.show = true
      const param = JSON.parse(this.popupData.param)
      this.detail = {
        title:this.popupData.title,
        content:this.popupData.content,
        picUrl:param.picUrl,
        linkUrl:this.popupData.url
      }
    },
    handleTriggerCallback() {
      this.$emit('triggerCallback')
    },
    handleClick(tab) {
      const li = parseInt(tab.name)
      this.$refs.list[li].getTypeOptions()
      this.$refs.list[li].getList()
      this.$refs.list[li].getUnreadCount()
    },
    handleUnreadCallback(val) {
      const { unread, name } = val
      const item = this.tabs.find((t) => {
        return parseInt(t.name) === parseInt(name)
      })
      item.unread = unread
      const index = _.findIndex(this.tabs, (t) => {
        return parseInt(t.name) === parseInt(name)
      })
      this.$set(this.tabs, index, item)
    },
    handleListCallback() {}
  }
}
</script>

<style lang="scss">
.messageDrawer1 {
  margin-top: 60px;
  .el-tabs__active-bar {
    width: 50% !important;
  }
  .el-tabs__item {
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    i {
      font-weight: bold;
    }
    &:nth-child(2) {
      padding-right: 0;
    }
    &:last-child {
      padding-left: 0;
    }
  }
}
</style>
