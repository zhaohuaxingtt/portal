<template>
  <iPage>
    <div class="title">
      <div class="header">{{language('NEWS_XINJIANKVTU','新建KV图')}}</div>
      <div>
        <iButton @click="handleSave()" :disabled="saveDisabled">{{
          language('NEWS_BAOCUN', '保存')
        }}</iButton>
        <iButton @click="handleReset()" :disabled="saveDisabled">{{
          language('LK_ZHONGZHI', '重置')
        }}</iButton>
        <iButton @click="handleReturn()" :disabled="saveDisabled">{{
          language('NEWS_FANHUI', '返回')
        }}</iButton>
        <iButton @click="handlePreview()" :disabled="saveDisabled">{{
          language('NEWS_YULAN', '预览') 
        }}</iButton>
      </div>
    </div>
    <iCard class="margin-top20">
      <div class="uploadLine">
        <ImgCutter
          ref="imgCutterModal"
          :crossOrigin="true"
          crossOriginHeader="*"
          toolBgc="none"
          :isModal="true"
          :showChooseBtn="true"
          :lockScroll="true"
          :moveAble="true"
          :imgMove="true"
          :smallToUpload="true"
          :saveCutPosition="false"
          :scaleAble="true"
          :previewMode="true"
          :toolBoxOverflow="true"
          :tool="true"
          :cutWidth="1390"
          :cutHeight="280"
          :boxWidth="1390"
          :boxHeight="480"
          :sizeChange="false"
          @cutDown="cutDown"
          ><iButton style="display: none" slot="open"></iButton
        ></ImgCutter>
        <el-upload
          accept=".JPG,.PNG,.JPEG,.jpg,.png,.jpeg"
          ref="uploadOne"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :http-request="httpUpload"
          :disabled="uploadLoading"
          :on-success="handleAvatarSuccessOne"
          multiple
        >
          <iButton>{{ language('NEWS_PLSCKVT', '批量上传KV图') }}</iButton>
        </el-upload>
        <span class="tips">{{language('NEWS_JYSY1390280BLTPBCG10M','建议使用1390*280PX比例图文件，不超过10MB')}}</span>
      </div>
      <div class="border">
        <draggable v-model="imageList" animation="200" @update="dragEnd">
          <transition-group>
            <div class="picList" v-for="item in imageList" :key="item.picUrl">
              <div class="img_div">
                <img :src="item.picUrl" alt="" class="imgWidth" />
                <a>
                  <div class="mask">
                    <i class="el-icon-scissors icon" @click="pic(item)"></i>
                    <i class="el-icon-delete icon" @click="removePic(item)"></i>
                  </div>
                </a>
              </div>
            </div>
          </transition-group>
        </draggable>
        <div class="add">
          <el-upload
            ref="uploadTwo"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :http-request="httpUpload"
            :on-success="handleAvatarSuccessTwo"
            accept=".JPG,.PNG,.JPEG,.jpg,.png,.jpeg"
            :disabled="uploadLoading"
          >
            <i class="el-icon-circle-plus-outline icon"></i>
          </el-upload>
        </div>
      </div>
    </iCard>
    <div v-if="this.openImg == true && this.imageList.length > 0">
      <div class="picPreview">
        <div class="prev el-icon-arrow-left" @click="arrowClick('prev')"></div>
        <div class="carousel">
          <div class="close el-icon-circle-close" @click="closePrev"></div>
          <el-carousel
            arrow="never"
            indicator-position="outside"
            ref="cardShow"
            :autoplay="false"
          >
            <el-carousel-item v-for="item in imageList" :key="item.picUrl">
              <img :src="item.picUrl" alt="" class="image" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="next el-icon-arrow-right" @click="arrowClick('next')"></div>
      </div>
      <!-- 透明层 -->
      <div class="over"></div>
    </div>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iMessage } from "rise";
import { saveKV } from "@/api/news/KV";
import { uploadFile } from "@/api/news/uploadFile.js";
import ImgCutter from "vue-img-cutter";
import draggable from "vuedraggable";
export default {
  components: { iPage, iCard, iButton, ImgCutter, draggable },
  props: {},
  async created() {
    // this.form.rfqCode = this.$route.params.code;
  },
  data() {
    return {
      openDialog: false,
      openImg: false,
      imageList: [],
      clickPic: [],
      saveDisabled: false,
      kvFilesLength:0,
    };
  },
  mounted(){
    this.$refs?.uploadOne?.$refs['upload-inner'].$refs.input.addEventListener('input',this.uploadFileKV);
    this.$refs?.uploadTwo?.$refs['upload-inner'].$refs.input.addEventListener('input',this.uploadFileKV);
  },
  beforeDestroy(){
    this.$refs?.uploadOne?.$refs['upload-inner'].$refs.input.removeEventListener('input',this.uploadFileKV);
    this.$refs?.uploadTwo?.$refs['upload-inner'].$refs.input.removeEventListener('input',this.uploadFileKV);
  },
  methods: {
    uploadFileKV(e){
      this.kvFilesLength = e.target.files.length;
    },
    pic(item) {
      this.clickPic = item;
      console.log("item",item);
      this.$refs.imgCutterModal.handleOpen({
        name: '000'+item.picUrl.substring(item.picUrl.lastIndexOf('/')+1),
        src: item.picUrl.replace(process.env.VUE_APP_FILE_CROSS, `/fileCross`), // 前端跨域问题，将api地址替换为反向代理地址
      });
    },
    handleAvatarSuccessOne(res, file, fileList) {
      this.$refs.uploadOne.clearFiles();
    },
    handleAvatarSuccessTwo(res, file, fileList) {
      this.$refs.uploadTwo.clearFiles();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLtM = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.kvFilesLength=this.kvFilesLength-1;
        this.$message.error(this.language('NEWS_SCTPZNSJPGHZPNGGS', "上传图片只能是 JPG 或者 PNG 格式!"));
      }
      if (!isLtM) {
        this.kvFilesLength=this.kvFilesLength-1;
        this.$message.error(this.language('NEWS_SCTPDXBNCG10MB', "上传图片大小不能超过 10MB!"));
      }
      return isJPG && isLtM;
    },
    // 删除上传的图片
    removePic(item) {
      const index = this.imageList.findIndex((i) => i.picUrl == item.picUrl);
      this.imageList.splice(index, 1);
    },
    // 保存
    handleSave() {
      if (this.imageList.length > 0) {
        this.saveDisabled = true;
        saveKV(this.imageList).then((res) => {
          if (res) {
            this.$message.success(this.language('NEWS_BAOCUNCHENGGONG',"保存成功！"));
            this.$router.push({
              path: "/news/KVmanagement",
            });
          }
        });
      } else {
        this.$message.error(this.language('NEWS_QSCTP',"请上传图片！"));
      }
    },
    // 返回
    handleReturn() {
      if (this.imageList.length > 0) {
        this.$confirm(this.language('NEWS_QRFHHSCTPBHBC',"确认返回后，上传图片不会保存！"), this.language('NEWS_SFQRFH',"是否确认返回？"), {
          confirmButtonText: this.language('TERMS_SHI', '是'),
              cancelButtonText: this.language('TERMS_FOU', '否'),
          type: "warning",
        }).then(() => {
          this.$router.push({
            path: "/news/KVmanagement",
          });
        });
      } else {
        this.$router.push({
          path: "/news/KVmanagement",
        });
      }
    },
    // 重置
    handleReset() {
      this.imageList = [];
    },
    // 预览
    handlePreview() {
      if (this.imageList.length === 0) {
        return;
      } else this.openImg = true;
    },
    // 上传图片
    async httpUpload(content) {
      console.log("content",content)
      this.uploadLoading = true;
      let formData = new FormData();
      formData.append("file", content.file);
      await uploadFile(formData)
        .then((res) => {
          this.imageList.push({
            picUrl: res.path,
            status: 1,
            sort: this.imageList.length + 1,
          });
          this.kvFilesLength=this.kvFilesLength-1;
          if(this.kvFilesLength===0){
            iMessage.success(this.language('NEWS_SHANGCHUANCHENGGONG', '上传成功'));
            this.uploadLoading = false;
          }
        })
        .catch((err) => {
          this.kvFilesLength=this.kvFilesLength-1;
          iMessage.error(this.language('NEWS_SHANGCHUANSHIBAI', '上传失败'));
        });
    },
    // 将base64转换为file
      dataURLtoBlob: function(dataurl, name) {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], name, { type: mime })
      },
    // 裁剪完毕
    async cutDown(res) {
      let imgGs = res.dataURL.split(';')[0].split('/')[1]
      let file = this.dataURLtoBlob(res.dataURL, '裁剪图片.' + imgGs)
      let formData = new FormData();
      formData.append("file", file);
      await uploadFile(formData)
        .then((res) => {
          this.clickPic.picUrl = res.path;
        })
        .catch((err) => {
          iMessage.error(this.language('NEWS_SHANGCHUANSHIBAI', '上传失败'));
          console.log("err", err);
        });
    },
    // 拖拽完成
    dragEnd(e) {
      e.preventDefault(); // 通知 Web 浏览器不要执行与事件关联的默认动作
      this.imageList.map((item, index) => {
        item.sort = index + 1;
      });
    },
    // 预览-轮播图移动
    arrowClick(val) {
      if (val === "next") {
        this.$refs.cardShow.next();
      } else {
        this.$refs.cardShow.prev();
      }
    },
    // 关闭预览
    closePrev() {
      this.openImg = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadLine {
  display: flex;
  align-items: center;
  .tips {
    margin-left: 20px;
    color: gray;
  }
}
.border {
  margin-top: 30px;
  height: calc(100vh - 315px);
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid #e0e6ed;
  .picList {
    margin: 15px 0 0 20px;
    cursor: pointer;
    .img_div {
      position: relative;
      width: 1390px;
      height: 280px;
      overflow: hidden;
      background-repeat: no-repeat;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 1390px;
      height: 280px;
      background-color: rgba(0, 0, 0, 0.5);
      color: #ffffff;
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        font-size: 30px;
        margin-right: 30px;
      }
    }
    .img_div a:hover .mask {
      opacity: 1;
    }
  }
  .add {
    height: 280px;
    width: 1390px;
    margin: 15px 0 0 20px;
    border: 1px dashed #e0e6ed;
    background-color: #f5f7fa;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      font-size: 30px;
      color: #d3d3db;
    }
  }
}
.title {
  display: flex;
  justify-content: space-between;
  .header {
    font-size: 20px;
    font-family: Arial;
    line-height: 23px;
    font-weight: bold;
  }
}
.over {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 999;
  background: #000000;
}
.picPreview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  .prev,
  .next {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 50%;
    cursor: pointer;
  }
  .carousel {
    position: relative;
    width: 1390px;
    // height: 280px;
    height: 100%;
    margin: 0 20px;
    .image {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      max-width: 100%;
      max-height: 100%;
      // height: 100%;
      // width: 100%;
    }

    .close {
      z-index: 9999;
      color: #fff;
      font-size: 24px;
      border-radius: 50%;
      position: absolute;
      right: 0;
      margin: 5px 5px 0 0;
    }
  }
}
</style>
