<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-08 15:45:59
 * @LastEditors: YoHo && 917955345@qq.com
 * @LastEditTime: 2023-03-22 16:25:07
 * @FilePath: \front-portal\src\views\meeting\specialDetails\component\attch.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="designate-attachment" v-loading="loading">
<div class="attachment-content">
    <div
     class="left-content"
      :class="{ show: collapseValue, bg_big: !collapseValue }"
      @click="collapse"
    >
      <div class="el-card left-list">
        <div class="collapse-transition margin-right5" v-show="!collapseValue" @click.stop="">
            <ul class="file-ul">
              <li
                class="file-name cursor"
                :class="{ 'is-active': file.attachmentId == active }"
                v-for="file in attachments"
                :key="file.attachmentId"
                @click="changeSrc(file)"
              >
                {{ file.attachmentName }}
              </li>
            </ul>
        </div>
        <i class="btn"
          ><icon
            symbol
            name="iconsanjiantou"
            class="collapse"
            :class="{ rotate: !collapseValue }"
          ></icon
        ></i>
      </div>
    </div>
    <div class="right-preview">
      <img class="preview" v-if="['PNG','JPG','JIF'].includes(detail.type)" :src="detail.attachmentUrl"/>
      <div v-else
          class="preview" :class="{'full-scroll':isFullScroll}">
        <iframe
          class="preview"
          :src="detail.attachmentUrl"
          frameborder="0"
        ></iframe>
        <div class="full-scroll-btn cursor" @click="isFullScroll=!isFullScroll">
          <i class="el-icon-full-screen font-size20"></i>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { icon } from "rise";
import { getFileUrl } from "@/api/file/index";

export default {
  props:{
    attachments:{
      type: Array,
      default:()=>[]
    }
  },
  data() {
    return {
      collapseValue: true,
      isFullScroll:false,
      active: "",
      detail:{},
      loading:false
    };
  },
  components: {
    icon,
  },
  created() {
    console.log(this.attachments);
    this.changeSrc(this.attachments[0])
  },
  methods: {
    collapse() {
      this.collapseValue = !this.collapseValue;
    },
    async changeSrc(item) {
      if (!item) return;
      let fileObj = JSON.parse(JSON.stringify(item));
      let arr = item.attachmentName.split(".");
      fileObj.type = arr[arr.length - 1].toUpperCase();
      if(fileObj.type.indexOf('XLS')>-1){
        let res = await getFileUrl(fileObj.attachmentId,fileObj.attachmentName)
        console.log(res);
        fileObj.attachmentUrl = res?.data || fileObj.attachmentUrl
        this.detail = fileObj;
      }else{
        this.detail = fileObj;
      }
      this.active = item.attachmentId;
    },
    // changeSrc(item) {
    //   let fileObj = JSON.parse(JSON.stringify(item))
    //   let arr = item.attachmentName.split('.')
    //   fileObj.type = arr[arr.length-1].toUpperCase()
    //   this.detail = fileObj
    //   this.active = item.attachmentId;
    // },
  },
};
</script>
<style lang='scss' scope>
.designate-attachment {
  height: calc(100% - 20px);
  // position: relative;
  // display: flex;
  overflow: hidden;
  padding:  54px 80px 20px;
  .attachment-content{
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
  }
  .show {
    background: transparent;
    width: auto;
  }
  .bg_big {
    background: transparent;
    width: 100%;
  }
  .left-content{
    height: 100%;
    position: absolute;
  }
  .left-list {
    height: 100%;
    max-width: 500px;
    position: absolute;
    display: flex;
    flex-flow: row;
    align-items: center;
    padding: 20px 10px;
    .collapse-transition {
      width: calc(100% - 35px);
      height: 100%;

      .file-ul {
        &:last-of-type {
          margin-bottom: 0;
        }
        .file-name {
          padding-left: 10px;
          font-size: 16px;
          margin-bottom: 10px;
          overflow-wrap: break-word
        }
        .is-active {
          color: #1763f7;
        }
      }
    }
    .btn {
      width: 30px;
    }

    .collapse {
      font-size: 30px;
      color: #d3d3db;
    }
    .rotate {
      transform: rotate(180deg);
    }
  }
  .right-preview {
    flex: 1;
    font-size: 0;
    padding-left: 70px;
    height: 100%;
    .preview {
      width: 100%;
      height: 100%;
    }
  }
}
.full-scroll{
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
}
.full-scroll-btn{
  position: absolute;
  bottom: 30px;
  right: 30px;
  padding: 10px;
  background: #aaa;
  border-radius: 50%;
  display: flex;
  opacity: 0.3;
  &:hover{
    opacity: 0.8;
  }
  .font-size20{
    font-size: 20px;
  }
}
</style>
