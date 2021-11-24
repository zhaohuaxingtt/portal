<template>
  <iCard :title="language('NEWS_ZHENGWEN','正文')" collapse>
    <el-form
      :model="ruleForm"
      label-width="9rem"
      :rules="rules"
      ref="ruleForm"
      :hideRequiredAsterisk="true"
    >
      <div class="form">
        <div class="input-box">
          <div class="form-row">
            <iFormItem
              :label="language('NEWS_NEIRONGFENLEI', '内容分类')"
              :hideRequiredAsterisk="true"
              class="form--item"
            >
              <iLabel :label="language('NEWS_NEIRONGFENLEI', '内容分类')" slot="label"></iLabel>
              <iSelect
                :value="ruleForm.type"
                @input="handleChangeType"
                :placeholder="language('LK_QINGXUANZE', '请选择')"
                :disabled="disabledAll"
              >
                <el-option
                  v-if="ruleForm.category !== 3"
                  :label="language('NEWS_TUWENXINWEN', '图文新闻')"
                  :value="0"
                >
                </el-option>
                <el-option
                  v-else
                  v-for="item in newsTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </div>
          <!-- 图集 -->
          <div v-show="ruleForm.type === 1">
            <div class="form-row">
              <el-upload
                ref="uploadFileTuJi"
                class="upload-demo"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFiles"
                multiple
                :disabled="imgUploadLoading"
                accept=".JPG, .PNG, .JPEG,.jpg, .png, .jpeg" 
              >
                <div class="upload-text">
                  <iButton :loading="imgUploadLoading">{{language('NEWS_PLSCTJ','批量上传图集')}}</iButton>
                  <div slot="tip" class="el-upload__tip">
                    {{language('NEWS_JYSYBLTP','建议使用16:9比例图文件，不超过10MB')}}<span
                      style="color: red; font-size: 14px"
                    >
                      *</span
                    >
                  </div>
                </div>
              </el-upload>
            </div>
            <div class="form-row form-row-pic">
              <div class="upload-file">
                <draggable
                  tag="transition-group"
                  class="el-draggable"
                  v-model="ruleForm.newsAtlas"
                  animation="200"
                  @update="dragEnd"
                >
                  <div
                    class="picList"
                    v-for="(item, index) in ruleForm.newsAtlas"
                    :key="item.atlasUrl"
                  >
                    <div class="img_div">
                      <el-image
                        ref="elImage"
                        class="imgWidth"
                        :src="item.atlasUrl"
                        :preview-src-list="imgUrls"
                      >
                      </el-image>
                      <a>
                        <div class="mask">
                          <span
                            class=""
                            @click="
                              handlePictureCardPreview(item.atlasUrl, index)
                            "
                          >
                            <i class="el-icon-zoom-in icon"></i>
                          </span>
                          <span
                            class=""
                            @click="
                              handleDownloadFile(item.atlasUrl, item.atlasName)
                            "
                          >
                            <i class="el-icon-download icon"></i>
                          </span>
                          <span class="" @click="handleRemove(item.atlasId)">
                            <i class="el-icon-delete icon"></i>
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="add" slot="footer" role="group" key="footer">
                    <el-upload
                      ref="uploadTwo"
                      :before-upload="beforeAvatarUpload"
                      :show-file-list="false"
                      :http-request="uploadFiles"
                      :on-success="handleAvatarSuccessTwo"
                      accept=".JPG, .PNG, .JPEG,.jpg, .png, .jpeg" 
                      :disabled="uploadLoading"
                    >
                      <i class="el-icon-circle-plus-outline icon"></i>
                    </el-upload>
                  </div>
                </draggable>
              </div>
            </div>
          </div>
          <!-- 视频 -->
          <div v-show="ruleForm.type === 2">
            <div class="form-row">
              <iFormItem
                :label="language('NEWS_SHIPINXINWEN', '视频新闻')"
                :hideRequiredAsterisk="true"
                class="form--item"
              >
                <iLabel :label="language('NEWS_SHIPINXINWEN', '视频新闻')" required slot="label"></iLabel>
                <span class="video-tip"
                  >{{language('NEWS_JYSYBLTP','建议使用16:9比例图文件，不超过10MB')}}</span
                >
              </iFormItem>
            </div>
            <div class="form-row">
              <iFormItem
                label=""
                :hideRequiredAsterisk="true"
                class="form--item"
              >
                <iLabel :label="language('', '')" slot="label"></iLabel>
                <div class="upload-file">
                  <el-upload
                    ref="videoUpload"
                    :class="{ hide: showOrHide2 }"
                    list-type="picture-card"
                    :file-list="videoUrlList"
                    :before-upload="beforeVideoAvatarUpload"
                    :http-request="handleVideoSuccess"
                    accept=".MP4, .OGG, .WEDM,.mp4, .ogg, .webM" 
                  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                      <video
                        class="el-upload-list__item-thumbnail"
                        :style="videoFlag == true ? 'opacity:0.3' : ''"
                        :src="file.url"
                        alt=""
                      />
                      <el-progress
                        v-if="videoFlag == true"
                        type="circle"
                        :percentage="videoUploadPercent"
                      ></el-progress>
                      <span
                        v-if="!videoFlag"
                        class="el-upload-list__item-actions"
                      >
                        <span
                          class="el-upload-list__item-preview"
                          @click="handleVideoPreview(file.url)"
                        >
                          <i class="el-icon-video-play"></i>
                        </span>
                        <span
                          class="el-upload-list__item-delete"
                          @click="handleDownloadFile(file.url, '视频文件.mp4')"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          class="el-upload-list__item-delete"
                          @click="handleRemoveFVideo(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                </div>
              </iFormItem>
            </div>
          </div>
          <!-- 图文 富文本编辑器 -->
          <div v-show="ruleForm.type === 0" class="form-row">
            <div
              ref="editer"
              v-show="ruleForm.type === 0"
              class="editer"
              id="editer"
            ></div>
          </div>
          <!-- 附件 -->
          <div class="form-row">
            <div>
              <el-upload
                ref="uploadFileFuJian"
                class="upload-demo"
                :show-file-list="false"
                :before-upload="beforeAvatarUploadFiles"
                :http-request="httpUpload"
                multiple
                :disabled="uploadLoading"
              >
                <div class="upload-text">
                  <iButton :loading="uploadLoading">{{language('NEWS_TIANJIAFUJIAN', '添加附件')}}</iButton>
                  <div slot="tip" class="el-upload__tip">
                    {{language('NEWS_ZNSCBCG20MDWJ', '只能上传不超过20M的文件')}}
                  </div>
                </div>
                <div class="upload-tip">{{language('NEWS_FUJIAN', '附件')}}</div>
              </el-upload>
              <ul
                v-for="item in ruleForm.newsAttachments"
                :key="item.attachmentId"
                class="el-upload-list el-upload-list--text"
              >
                <li
                  tabindex="0"
                  class="el-upload-list__item is-success i-paperclip"
                >
                  <a
                    class="el-upload-list__item-name"
                    @click="
                      handleDownloadFile(
                        item.attachmentUrl,
                        item.attachmentName
                      )
                    "
                  >
                    <i class="el-icon-paperclip" :title="item.attachmentName">
                      {{ item.attachmentName }}
                    </i>
                  </a>
                  <label class="el-upload-list__item-status-label">
                    <i class="el-icon-upload-success el-icon-circle-check"></i>
                  </label>
                  <i
                    @click="handleDeleteAccessory(item.attachmentId)"
                    class="el-icon-close"
                  ></i>
                  <i class="el-icon-close-tip"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <ImgCutter
      ref="imgCutterModal"
      fileType="jpeg"
      :crossOrigin="true"
      crossOriginHeader="*"
      rate="16:9"
      toolBgc="none"
      :isModal="true"
      :showChooseBtn="true"
      :lockScroll="true"
      :boxWidth="1624"
      :boxHeight="800"
      :cutWidth="712"
      :cutHeight="400"
      :sizeChange="true"
      :moveAble="true"
      :imgMove="true"
      :originalGraph="true"
      :smallToUpload="true"
      :saveCutPosition="false"
      :scaleAble="true"
      :previewMode="true"
      :toolBoxOverflow="true"
      :tool="true"
      @cutDown="cutDown"
    >
      <button hidden slot="open">Select image</button>
    </ImgCutter>
    <div
      v-if="VideoDialogVisible"
      tabindex="-1"
      class="el-image-viewer__wrapper"
      style="z-index: 2000"
    >
      <div class="el-image-viewer__mask"></div>
      <span
        @click="VideoDialogVisible = false"
        class="el-image-viewer__btn el-image-viewer__close"
        ><i class="el-icon-close"></i>
      </span>
      <div class="el-image-viewer__canvas">
        <video
          controls="controls"
          autoplay="autoplay"
          :src="dialogVideoUrl"
          class="el-image-viewer__img"
          style="transform: scale(1) rotate(0deg); height: 75%; width: 75%"
        />
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, iFormItem, iLabel, iSelect, iButton, iMessage } from "rise";
import ImgCutter from "vue-img-cutter";
import E from "wangeditor";
import draggable from "vuedraggable";
import { newsTypes } from "./data";
import UploadMenu from "./UploadPanel";
import { uploadFile } from "@/api/news/uploadFile";
import { createAnchorLink } from "@/utils/downloadUtil";

export default {
  components: {
    iCard,
    iFormItem,
    iLabel,
    iSelect,
    iButton,
    ImgCutter,
    draggable,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
        if (val.type === 2 && val.videoUrl != null && val.videoUrl != "") {
          this.videoUrlList = [{ url: val.videoUrl }];
        }
        this.imgUrls = val.newsAtlas.map((item) => item.atlasUrl);
      },
    },
    ruleForm(val) {
      this.$emit("input", val);
    },
  },
  data() {
    return {
      newsTypes,
      dialogVideoUrl: "",
      VideoDialogVisible: false,
      videoFlag: false,
      videoUploadPercent: 0,
      ruleForm: { newsAtlas: [] },
      rules: [],
      isApprovalOption: [
        {
          label: this.language('TERMS_SHI', '是'),
          value: true,
        },
        {
          label: this.language('TERMS_FOU', '否'),
          value: false,
        },
      ],
      editor: null,
      videoUrlList: [],
      uploadLoading: false,
      imgUploadLoading: false,
      imgUrls: [],
      filesLength:0,
      tuJiFilesLength:0,
    };
  },
  computed: {
    showOrHide() {
      if (this.ruleForm.newsAtlas?.length > 0) {
        return true;
      }
      return false;
    },
    showOrHide2() {
      if (this.videoUrlList?.length > 0 || this.videoFlag) {
        return true;
      }
      return false;
    },
    disabledAll() {
      if (this.ruleForm.disabledAll === true) {
        this.editor.txt.html("");
        this.editor.disable();
        this.handleContentClear();
        return true;
      } else {
        if (this.editor != null) {
          if (this.ruleForm.linkUrl?.length > 0) {
            this.editor.disable();
            return true;
          }
          this.editor.enable();
        }
      }
      return false;
    },
  },
  created() {
    this.value;
  },
  mounted() {
    let that = this;
    if (this.editor === null) {
      this.editor = new E("#editer");
      // 配置菜单栏，设置不需要的菜单
      this.editor.config.excludeMenus = [
        "list",
        "todo",
        "emoticon",
        "image",
        "video",
        "table",
        "code",
      ];
      // 配置字体
      this.editor.config.fontNames = [
        // 字符串形式
        "黑体",
        "仿宋",
        "楷体",
        "标楷体",
        "华文仿宋",
        "华文楷体",
        "宋体",
        "微软雅黑",
        "Arial",
        "Tahoma",
        "Verdana",
        "Times New Roman",
        "Courier New",
      ];
      this.editor.config.menus = this.editor.config.menus.concat("uploadMenu"); // 配置菜单栏，删减菜单，调整顺序
      this.editor.config.height = 700;
      this.editor.config.customUploadImg = async (files, callaback) => {
        const urls = [];
        for (let i = 0; i < files.length; i++) {
          const res = await this.upload(files[i]);
          urls.push(res);
        }
        callaback(urls);
      };
      this.editor.menus.extend("uploadMenu", UploadMenu); // 配置扩展的菜单
      // 配置 onchange 回调函数
      this.editor.config.onchange = function (newHtml) {
        that.ruleForm.content = newHtml;
      };
      this.editor.create();
      this.editor.txt.html(this.ruleForm.content);
    }
    this.$refs?.uploadFileFuJian?.$refs['upload-inner'].$refs.input.addEventListener('input',this.uploadFileFuJian);
    this.$refs?.uploadFileTuJi?.$refs['upload-inner'].$refs.input.addEventListener('input',this.uploadFileTuJi);
    this.$refs?.uploadTwo?.$refs['upload-inner'].$refs.input.addEventListener('input',this.uploadFileTuJi);
  },
  beforeDestroy(){
    this.$refs?.uploadFileFuJian?.$refs['upload-inner'].$refs.input.removeEventListener('input',this.uploadFileFuJian);
    this.$refs?.uploadFileTuJi?.$refs['upload-inner'].$refs.input.removeEventListener('input',this.uploadFileTuJi);
    this.$refs?.uploadTwo?.$refs['upload-inner'].$refs.input.removeEventListener('input',this.uploadFileTuJi);
  },
  methods: {
    uploadFileFuJian(e){
      this.filesLength = e.target.files.length;
    },
    uploadFileTuJi(e){
      this.tuJiFilesLength = e.target.files.length;
    },
    handleAvatarSuccessTwo() {
      this.$refs.uploadTwo.clearFiles();
    },
    // 拖拽完成
    dragEnd(e) {
      e.preventDefault(); // 通知 Web 浏览器不要执行与事件关联的默认动作
      this.ruleForm.newsAtlas.map((item, index) => {
        item.sort = index + 1;
      });
    },
    upload(file) {
      return new Promise((resolve) => {
        let formData = new FormData();
        formData.append("file", file);
        uploadFile(formData)
          .then((res) => {
            resolve(res.path);
          })
          .catch(() => {});
      });
    },
    handleContentClear() {
      this.ruleForm.type = 0;
      this.videoUrlList = [];
      this.ruleForm.videoUrl = "";
      this.ruleForm.newsAtlas = [];
    },
    handleChangeType(val) {
      if (val === 0 && this.ruleForm.type === 1) {
        if (this.ruleForm.newsAtlas?.length > 0) {
          this.changeTypeConfirm(val, () => {
            this.ruleForm.newsAtlas = [];
          });
        } else {
          this.ruleForm.type = val;
        }
      } else if (val === 0 && this.ruleForm.type === 2) {
        if (this.ruleForm.videoUrl !== null || this.ruleForm.videoUrl !== "") {
          this.changeTypeConfirm(val, () => {
            this.ruleForm.videoUrl = "";
            this.videoUrlList = [];
          });
        } else {
          this.ruleForm.type = val;
        }
      } else if (val === 1 && this.ruleForm.type === 0) {
        if (this.ruleForm.content != null && this.ruleForm.content != "") {
          this.changeTypeConfirm(val, () => {
            this.editor.txt.html("");
          });
        } else {
          this.ruleForm.type = val;
        }
      } else if (val === 1 && this.ruleForm.type === 2) {
        if (this.ruleForm.videoUrl !== null && this.ruleForm.videoUrl !== "") {
          this.changeTypeConfirm(val, () => {
            this.ruleForm.videoUrl = "";
            this.videoUrlList = [];
          });
        } else {
          this.ruleForm.type = val;
        }
      } else if (val === 2 && this.ruleForm.type === 0) {
        if (this.ruleForm.content != null && this.ruleForm.content != "") {
          this.changeTypeConfirm(val, () => {
            this.editor.txt.html("");
          });
        } else {
          this.ruleForm.type = val;
        }
      } else if (val === 2 && this.ruleForm.type === 1) {
        if (this.ruleForm.newsAtlas?.length > 0) {
          this.changeTypeConfirm(val, () => {
            this.ruleForm.newsAtlas = [];
            console.log(this.ruleForm);
          });
        } else {
          this.ruleForm.type = val;
        }
      }
    },
    changeTypeConfirm(val, callback) {
      this.$confirm(
        this.language('NEWS_QDQHNRFLHXWNRJQBQK',"确定切换内容分类后，新闻内容将全部清空。"),
          this.language('NEWS_SFQDQH',"是否确定切换？"),
        {
          confirmButtonText: this.language('TERMS_SHI', '是'),
              cancelButtonText: this.language('TERMS_FOU', '否'),
          type: "warning",
        }
      ).then(() => {
        this.ruleForm.type = val;
        callback && callback();
      });
    },
    handleChange(file) {
      this.$refs.imgCutterModal.handleOpen({
        name: file.name,
        src: URL.createObjectURL(file.raw),
      });
    },
    handleRemove(id) {
      this.ruleForm.newsAtlas = this.ruleForm.newsAtlas.filter(
        (item) => item.atlasId !== id
      );
      this.imgUrls = this.imgUrls.filter((item) => item.indexOf(id) === -1);
    },
    handleRemoveFVideo() {
      this.videoUrlList = [];
      this.ruleForm.videoUrl = "";
    },
    handlePictureCardPreview(url, index) {
      this.$refs["elImage"][index].showViewer = true;
      this.$refs["elImage"][index].src = url;
    },
    handleVideoPreview(url) {
      this.VideoDialogVisible = true;
      this.dialogVideoUrl = url;
    },
    handleDownloadFile(url, name) {
      createAnchorLink(
        url.replace(process.env.VUE_APP_FILE_CROSS, `/fileCross`), // 前端跨域问题，将api地址替换为反向代理地址
        name
      );
    },
    uploadVideoProcess(evt, file) {
      this.videoFlag = true;
      this.videoUploadPercent = ((evt.loaded / evt.total) * 100).toFixed(0);
      this.$refs["videoUpload"].handleProgress(evt, file);
    },
    handleDeleteAccessory(id) {
      this.ruleForm.newsAttachments = this.ruleForm.newsAttachments.filter(
        (item) => item.attachmentId !== id
      );
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLtM = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.tuJiFilesLength=this.tuJiFilesLength-1;
        this.$message.error(this.language('NEWS_SCTPZNSJPGHZPNGGS', file.name+"上传失败，上传图片只能是 JPG 或者 PNG 格式!"));
      }
      if (!isLtM) {
        this.tuJiFilesLength=this.tuJiFilesLength-1;
        this.$message.error(this.language('NEWS_SCTPDXBNCG10MB', file.name+"上传失败，上传图片大小不能超过 10MB!"));
      }
      return isJPG && isLtM;
    },
    beforeVideoAvatarUpload(file) {
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/webM",
          // "video/avi",
          // "video/wmv",
          // "video/rmvb",
        ].indexOf(file.type) == -1
      ) {
        this.$message.error(this.language('NEWS_QSCZQDSPGS', file.name+"上传失败，请上传正确的视频格式"));
        return false;
      }
      const isLtM = file.size / 1024 / 1024 < 100;
      if (!isLtM) {
        this.$message.error(this.language('NEWS_SCSPDXBNCG100M', file.name+"上传失败，上传视频大小不能超过 100MB!"));
        return false;
      }
    },
    beforeAvatarUploadFiles(file) {
      const isLtM = file.size / 1024 / 1024 < 20;
      if (!isLtM) {
        this.filesLength=this.filesLength-1;
        this.$message.error(this.language('NEWS_SCWJDXBNCG20MB',file.name+"上传失败，上传文件大小不能超过 20MB!"));
      }
      return isLtM;
    },
    uploadFiles(content) {
      this.imgUploadLoading = true;
      let formData = new FormData();
      formData.append("file", content.file);
      uploadFile(formData).then((res)=>{
        this.ruleForm.newsAtlas.push({
        atlasId: res.id,
        atlasName: res.name,
        atlasUrl: res.path,
        sort: this.ruleForm.newsAtlas.length + 1,
      });
      this.imgUrls.push(res.path);
      this.tuJiFilesLength=this.tuJiFilesLength-1;
      if(this.tuJiFilesLength===0){
        iMessage.success(this.language('NEWS_SHANGCHUANCHENGGONG', '上传成功'));
        this.imgUploadLoading = false;
      }
      }).catch(() => {
        this.tuJiFilesLength=this.tuJiFilesLength-1;
        iMessage.error(this.language('NEWS_SHANGCHUANSHIBAI', '上传失败'));
        this.imgUploadLoading = false;
      });
    },
    handleVideoSuccess(content) {
      this.$refs["videoUpload"].handleStart(content.file);

      const formData = new FormData();
      formData.append("file", content.file);
      uploadFile(formData, {
        onUploadProgress: (evt) => this.uploadVideoProcess(evt, content.file),
      })
        .then((res) => {
          this.videoUploadPercent = 0;
          this.videoFlag = false;
          this.videoUrlList = [
            {
              ...res,
              url: res.path,
            },
          ];
          this.ruleForm.videoUrl = res.path;
          iMessage.success(this.language('NEWS_SHANGCHUANCHENGGONG', '上传成功'));
        })
        .catch(() => {
          this.videoUploadPercent = 0;
          this.videoFlag = false;
          this.videoUrlList = [];
          iMessage.error(this.language('NEWS_SHANGCHUANSHIBAI', '上传失败'));
        });
    },
     httpUpload(content) {
      this.uploadLoading = true;
      let formData = new FormData();
      formData.append("file", content.file);
       uploadFile(formData)
        .then((res) => {
          this.ruleForm.newsAttachments.push({
            attachmentId: res.id,
            attachmentName: res.name,
            attachmentUrl: res.path,
          });
          this.filesLength=this.filesLength-1;
          if(this.filesLength===0){
            iMessage.success(this.language('NEWS_SHANGCHUANCHENGGONG', '上传成功'));
            this.uploadLoading = false;
          }
        })
        .catch(() => {
          this.filesLength=this.filesLength-1;
          this.uploadLoading = false;
          iMessage.error(this.language('NEWS_SHANGCHUANSHIBAI', '上传失败'));
        });
    },
    async cutDown(res) {
      let formData = new FormData();
      formData.append("file", res.file);
      await uploadFile(formData)
        .then((res) => {
          this.ruleForm.imgs1.push({
            ...res,
            url: res.path,
          });
          iMessage.success(this.language('NEWS_SHANGCHUANCHENGGONG', '上传成功'));
        })
        .catch(() => {
          iMessage.error(this.language('NEWS_SHANGCHUANSHIBAI', '上传失败'));
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .input-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .form-row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      .form--item {
        width: 30% !important;
      }
      .el-form-item {
        width: 100%;
        min-width: 0;
        margin-bottom: 0rem;
        .el-form-item__content {
          width: 100%;
          .video-tip {
            font-size: 12px;
            color: #ccc;
            text-align: left;
          }
        }
      }
      .textarea ::v-deep .el-textarea__inner {
        resize: none;
        text-align: left;
      }
    }
    .form-row-pic {
      border: #ccc solid 1px;
      overflow-y: scroll;
      height: 400px;
      display: block;
      .upload-file {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        .el-draggable {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          .picList {
            margin: 6px;
            cursor: pointer;
            .img_div {
              position: relative;
              height: 174px;
              width: 308px;
              overflow: hidden;
              background-repeat: no-repeat;
              border-radius: 5px;
              border: #ccc solid 1px;
              .imgWidth {
                width: 100%;
                height: 100%;
              }
            }
            .mask {
              position: absolute;
              top: 0;
              left: 0;
              height: 174px;
              width: 308px;
              background-color: rgba(0, 0, 0, 0.5);
              color: #ffffff;
              opacity: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              .icon {
                font-size: 20px;
                margin: 0 5px 0 5px;
              }
            }
            .img_div a:hover .mask {
              opacity: 1;
            }
          }
          .add {
            height: 174px;
            width: 308px;
            margin: 6px 6px;
            border: 1px dashed #e0e6ed;
            background-color: #f5f7fa;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            .icon {
              font-size: 30px;
              color: #d3d3db;
            }
          }
        }
      }
      ::v-deep .el-upload--picture-card {
        min-width: 308px;
        min-height: 174px;
        line-height: 174px;
        margin-right: 0.5rem;
        margin-left: 8px;
        margin-top: 8px;
      }
      ::v-deep .el-upload-list__item {
        min-width: 308px;
        min-height: 174px;
        line-height: 174px;
        margin-left: 6px;
        margin-top: 6px;
      }
    }
  }
}
.upload-file ::v-deep {
  margin: 10px;
  min-height: 221px;
  min-width: 364px;
  .el-upload-list__item.is-ready {
    display: none;
  }
  .el-upload-list__item.el-list-leave-to {
    display: none;
  }
  .el-upload-list__item.el-list-leave-active {
    display: none;
  }
  .el-upload--picture-card {
    min-width: 356px;
    min-height: 200px;
    line-height: 200px;
  }
  .el-upload-list__item {
    min-width: 356px;
    min-height: 200px;
    line-height: 200px;
  }
}
.upload-demo {
  .upload-text {
    display: flex;
  }
  .el-upload__tip {
    margin-left: 20px;
    color: #ccc;
  }
  .upload-tip {
    text-align: left;
    padding-top: 10px;
  }
  ::v-deep .el-upload-list {
    // .focusing{
    //   display: none;
    // }
  }
}
.hide {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
.editer {
  width: 100%;
  z-index: 0;
  ::v-deep .w-e-toolbar {
    background-color: #f2f2f2 !important;
  }
}
::v-deep .el-dialog {
  width: 75%;
  height: 75%;
  text-align: center;
  .el-dialog__body {
    width: 100%;
    height: 100%;
    video {
      width: 100%;
      height: 84%;
    }
    img {
      width: 100%;
      height: 84%;
    }
  }
}
.i-paperclip {
  width: 80%;
  .el-icon-paperclip {
    color: rgb(23, 99, 247);
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
