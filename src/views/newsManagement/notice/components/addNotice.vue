<template>
  <iPage>
    <div v-show="card">
      <div class="page">
        <div class="addNotice">{{language('NEWS_XINJIANGONGGAO','新建公告')}}</div>
        <div>
          <iButton @click="handleSave(0)" :disabled="saveFlag">{{ language('NEWS_BAOCUN', '保存') }}</iButton>
          <iButton @click="handleReset">{{ language('LK_ZHONGZHI', '重置') }}</iButton>
          <iButton @click="handlePreview">{{ language('NEWS_YULAN', '预览')  }}</iButton>
          <iButton @click="handleSave(1)" :disabled="saveFlag">{{ language('NEWS_FABU', '发布') }}</iButton>
          <iButton @click="handleReturn">{{ language('NEWS_FANHUI', '返回') }}</iButton>
        </div>
      </div>
      <iCard>
        <div class="card-title">{{language('NEWS_JICHUXINXI', '基础信息')}}</div>
        <el-form
          :model="ruleForm"
          label-width="9rem"
          :rules="rules"
          ref="ruleForm"
          :hideRequiredAsterisk="true"
        >
          <div class="input-box">
            <div class="form-row">
              <iFormItem :label="language('NEWS_GONGGAOBIAOTI', '公告标题')" class="notice-item" prop="title">
                <iLabel :label="language('NEWS_GONGGAOBIAOTI', '公告标题')" slot="label" required></iLabel>
                <iInput v-model.trim="ruleForm.title" maxlength="80"></iInput>
              </iFormItem>

              <iFormItem :label="language('NEWS_GONGGAOLEIXING', '公告类型')" class="notice-item" prop="type">
                <iLabel :label="language('NEWS_GONGGAOLEIXING', '公告类型')" slot="label" required></iLabel>
                <iSelect
                  v-model="ruleForm.type"
                  :placeholder="language('LK_QINGXUANZE', '请选择')"
                  @input="handleType"
                >
                  <el-option
                    v-for="item in noticeTypes"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </div>

            <div class="form-row">
              <iFormItem
               :label="language('NEWS_FABURIQI', '发布日期')"
                class="notice-item"
                prop="publishDate"
              >
                <iLabel :label="language('NEWS_FABURIQI', '发布日期')" slot="label" required></iLabel>
                <iDatePicker
                  :default-value="timeDefaultShow"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="date"
                  v-model="ruleForm.publishDate"
                  :picker-options="pickerOptions"
                />
              </iFormItem>

              <iFormItem :label="language('NEWS_SHIFOUZHIDING', '是否置顶')" class="notice-item" prop="isTop">
                <iLabel :label="language('NEWS_SHIFOUZHIDING', '是否置顶')" slot="label" required></iLabel>
                <iSelect
                  v-model="ruleForm.isTop"
                  :placeholder="language('LK_QINGXUANZE', '请选择')"
                >
                  <el-option
                    v-for="item in isTopOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </div>

            <div class="form-row">
              <iFormItem
                :label="language('NEWS_FABUFANWEI', '发布范围')"
                prop="publishRange"
                :hideRequiredAsterisk="true"
                class="notice-item"
              >
                <iLabel :label="language('NEWS_FABUFANWEI', '发布范围')" slot="label" required></iLabel>
                <div
                  class="item--input"
                  v-if="ruleForm.userGroup && ruleForm.userGroup.length > 0"
                  @click="handleClickUserGroup"
                >
                  <iInput :title="userGroup" disabled v-model="userGroup">
                  </iInput>
                </div>
                <iSelect
                  v-else
                  :placeholder="language('LK_QINGXUANZE', '请选择')"
                  v-model="ruleForm.publishRange"
                  @input="handleChangePublishRange"
                >
                  <el-option
                    v-for="item in newsPublishRange"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </iSelect>
              </iFormItem>
            </div>
          </div>
        </el-form>

        <div class="card-title top-buttom">{{language('NEWS_ZHENGWEN','正文')}}</div>
        <div class="form-row">
          <div ref="editer" class="editer" id="editer"></div>
        </div>
        <div class="form-row">
          <div>
            <el-upload
              ref="noticeUploadFile"
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
              v-for="item in ruleForm.attachments"
              :key="item.attachmentId"
              class="el-upload-list el-upload-list--text"
            >
              <li tabindex="0" class="el-upload-list__item is-success">
                <a
                  class="el-upload-list__item-name"
                  @click="
                    handleDownloadFile(item.attachmentUrl, item.attachmentTitle, item.attachmentId)
                  "
                >
                  <i class="el-icon-paperclip" style="color: #1763f7">
                    {{ item.attachmentTitle }}
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
        <iDialog
          :title="language('NEWS_ZDYYHZXZ','自定义-用户组选择')"
          :visible.sync="customDialogVisible"
          width="20%"
          :before-close="handleClose"
          :close-on-click-modal="false"
        >
          <div class="custom--dialog">
            <iInput
              :placeholder="language('NEWS_SOSUOYONGHUZU','搜索用户组...')"
              v-model="searchGroupInputVal"
              @keyup.enter.native="handleKeyupEnter"
            >
              <i
                @click="handleKeyupEnter(searchGroupInputVal)"
                slot="suffix"
                class="el-input__icon el-icon-search"
                style="color: #1763f7; cursor: pointer"
              ></i>
            </iInput>
            <div class="custom--checkbox">
              <el-checkbox-group
                :value="groupCheckList"
                @input="handleGroupCheckList"
              >
                <el-checkbox
                  v-for="item in groupList"
                  :key="item.id"
                  :label="item.id"
                  >{{ item.groupName }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <iButton @click="handleClose">{{language('NEWS_QUXIAO','取 消')}}</iButton>
            <iButton @click="handleConfirm">{{language('NEWS_QUEDING','确 定')}}</iButton>
          </span>
        </iDialog>
      </iCard>
    </div>
    <div v-if="preview">
      <div class="returnButton">
        <iButton @click="handleClosePre">{{ language('NEWS_FANHUI', '返回') }}</iButton>
      </div>
      <iCard>
        <div class="preview">
          <p class="title">{{ this.ruleForm.title }}</p>
          <p class="first">
              <span class="author">{{this.publisher}}</span>
              <span class="time">{{ this.ruleForm.publishDate }}</span>
            <!-- <p class="look el-icon-view">{{ this.list.clicks }}</p> -->
          </p>
          <p class="paragraph" v-html="this.ruleForm.content"></p>
          <el-divider></el-divider>
          <div class="attachmentList">
            <span class="attachment">{{language('NEWS_FUJIAN', '附件')}}:</span>
            <ul>
              <li
                v-for="item in this.ruleForm.attachments"
                :key="item.id"
                class="open-link-text enclosure-item"
                @click="
                  downloadEnclosure(item.attachmentUrl, item.attachmentTitle, )
                "
              >
                <img :src="enclosure" alt="" srcset="" class="img" />
                <span class="attachmentLink">{{ item.attachmentTitle }}</span>
              </li>
            </ul>
          </div>
        </div>
      </iCard>
    </div>
  </iPage>
</template>

<script>
import {
  iCard,
  iPage,
  iMessage,
  iInput,
  iFormItem,
  iLabel,
  iDatePicker,
  iSelect,
  iButton,
  iDialog,
} from "rise";
import E from "wangeditor";
import { uploadFile } from "@/api/news/uploadFile";
import enclosure from "@/assets/images/enclosure.svg";
import {
  saveNotice,
  findNewsPublishRange,
  getNoticeType,
  findGroupList,
} from "@/api/news/notice.js";
import store from '@/store'
import { isTopOption } from "./data";
import { createAnchorLink } from "@/utils/downloadUtil";

export default {
  components: {
    iPage,
    iCard,
    iButton,
    iInput,
    iFormItem,
    iLabel,
    iDatePicker,
    iSelect,
    iDialog,
  },
  props: {},
  mounted() {
    this.publisher = store.state.permission?.userInfo?.nameZh || 'admin'
    this.ruleForm.publishDate = this.timeDefault;
    findNewsPublishRange().then((res) => {
      this.newsPublishRange = res;
    });
    getNoticeType().then((res) => {
      this.noticeTypes = res;
    });
    let that = this;
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
    // this.editor.config.menus = this.editor.config.menus.concat("uploadMenu"); // 配置菜单栏，删减菜单，调整顺序
    // this.editor.config.customUploadImg = async (files, callaback) => {
    //   const urls = [];
    //   for (let i = 0; i < files.length; i++) {
    //     const res = await this.upload(files[i]);
    //     urls.push(res);
    //   }
    //   callaback(urls);
    // };
    // 配置 onchange 回调函数
    this.editor.config.onchange = function (newHtml) {
      that.ruleForm.content = newHtml;
    };
    this.editor.create();
    this.editor.txt.html(this.ruleForm.content);
    this.$refs?.noticeUploadFile?.$refs['upload-inner'].$refs.input.addEventListener('input',this.noticeUploadFile);
  },
  beforeDestroy(){
        this.$refs?.noticeUploadFile?.$refs['upload-inner'].$refs.input.removeEventListener('input',this.noticeUploadFile);
  },
  data() {
    return {
      enclosure,
      card: true,
      preview: false,
      customDialogVisible: false,
      searchGroupInputVal: "",
      groupCheckList: [],
      groupList: [],
      newsPublishRange: [],
      timeDefaultShow: "",
      saveFlag:false,
      publisher:'',
      ruleForm: {
        status: "",
        title: "",
        type: "",
        publishDate: "",
        isTop: 0,
        publishRange: 0,
        content: "",
        attachments: [],
        userGroup: [],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; // 选当前时间之后的时间
        },
      },
      rules: {
        title: [
          { required: true, message: this.language('NEWS_BITIAN',"必填"), trigger: ["blur", "change"] },
          { min: 1, max: 80, message: this.language('NEWS_ZUIDASHURUCHANGDU80',"最大输入长度80"), trigger: "blur" },
        ],
        type: [
          { required: true, message: this.language('NEWS_BITIAN',"必填"), trigger: ["blur", "change"] },
        ],
        publishDate: [
          { required: true, message: this.language('NEWS_BITIAN',"必填"), trigger: ["blur", "change"] },
        ],
        isTop: [
          { required: true, message: this.language('NEWS_BITIAN',"必填"), trigger: ["blur", "change"] },
        ],
        publishRange: [
          { required: true, message: this.language('NEWS_BITIAN',"必填"), trigger: ["blur", "change"] },
        ],
      },
      noticeTypes: [],
      isTopOption,
      uploadLoading:false,
      noticeFilesLength:0,
    };
  },
  computed: {
    userGroup() {
      let str = this.ruleForm.userGroup?.map((item) => item.groupName);
      return str.join(",");
    },
    timeDefault() {
      const date = new Date(+new Date() + 8 * 3600 * 1000)
        .toJSON()
        .substr(0, 19)
        .replace("T", " ");
      return date;
    },
  },
  methods: {
    noticeUploadFile(e){
      this.noticeFilesLength = e.target.files.length;
    },
    handleType(val) {
      if (this.ruleForm.publishRange === 15) {
        this.ruleForm.publishRange = "";
        this.ruleForm.userGroup = [];
      }
      if (this.ruleForm.type === val) {
        return;
      }
    },
    getGroupList(e) {
      findGroupList(e).then((res) => {
        this.groupList = res;
      });
    },
    handleClickUserGroup( ) {
      this.getGroupList({ category: this.ruleForm.type });
      this.customDialogVisible = true;
      this.groupCheckList =
        this.ruleForm.userGroup?.map((item) => item.id) || [];
    },
    handleChangePublishRange(val) {
      this.ruleForm.publishRange = val;
      if (val === 15) {
        if (this.ruleForm.type === undefined || this.ruleForm.type === "") {
          this.ruleForm.publishRange = "";
          this.$message.error(this.language('NEWS_QXZGGLX',"请选择公告类型!"));
          return;
        }
        this.getGroupList({ category: this.ruleForm.type });
        this.customDialogVisible = true;
        this.groupCheckList =
          this.ruleForm.userGroup?.map((item) => item.id) || [];
      } else {
        this.ruleForm.userGroup = [];
      }
    },
    handleGroupCheckList(val) {
      this.groupCheckList = val;
    },
    handleKeyupEnter() {
      this.getGroupList({
        category: this.ruleForm.category,
        groupName: this.searchGroupInputVal,
      });
    },
    handleClose() {
      this.customDialogVisible = false;
      if (this.ruleForm.userGroup?.length === 0) {
        // this.ruleForm.publishRange = [];
        this.ruleForm.publishRange = "";
      }
      this.searchGroupInputVal = "";
    },
    handleConfirm() {
      this.ruleForm.userGroup = this.groupList.filter((item) => {
        return this.groupCheckList.includes(item.id);
      });
      this.customDialogVisible = false;
      this.searchGroupInputVal = "";
      if (this.ruleForm.userGroup?.length === 0) {
        // this.ruleForm.publishRange = [];
        this.ruleForm.publishRange = "";
      }
    },
    beforeAvatarUploadFiles(file) {
      const isLtM = file.size / 1024 / 1024 < 20;
      if (!isLtM) {
        this.noticeFilesLength=this.noticeFilesLength-1;
        this.$message.error(this.language('NEWS_SCWJDXBNCG20MB',"上传文件大小不能超过 20MB!"));
      }
      return isLtM;
    },
    async httpUpload(content) {
      this.uploadLoading = true;
      let formData = new FormData();
      formData.append("file", content.file);
      await uploadFile(formData)
        .then((res) => {
          this.ruleForm.attachments.push({
            attachmentId: res.id,
            attachmentTitle: res.name,
            attachmentUrl: res.path,
          });
          this.noticeFilesLength=this.noticeFilesLength-1;
          if(this.noticeFilesLength===0){
            iMessage.success(this.language('NEWS_SHANGCHUANCHENGGONG', '上传成功'));
            this.uploadLoading = false;
          }
        })
        .catch(( ) => {
          this.noticeFilesLength=this.noticeFilesLength-1;
          iMessage.error(this.language('NEWS_SHANGCHUANSHIBAI', '上传失败'));
          this.uploadLoading = false;
        });
    },
    handleDownloadFile(url) {
        return window.open(url)
      // createAnchorLink(
      //   url, // 前端跨域问题，将api地址替换为反向代理地址
      //   name
      // );
    },
    // 预览页-下载附件
    downloadEnclosure(url) {
      return window.open(url)
      // createAnchorLink(url, name);
    },
    handleDeleteAccessory(id) {
      this.ruleForm.attachments = this.ruleForm.attachments.filter(
        (item) => item.attachmentId !== id
      );
    },
    // 保存/发布
    handleSave(val) {
      this.ruleForm.status = val;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.saveFlag = true
          let text = this.ruleForm.content.replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, "").replace(/ /ig, " ").replace(/(&nbsp;)/g, "");
          if (this.ruleForm.content === null || this.ruleForm.content === "" || text === '') {
            this.$message.error(this.language('NEWS_ZWBNWK',"正文不能为空！"));
            return;
          }
          saveNotice(this.ruleForm).then((res) => {
            if (res) {
              iMessage.success(val === 0 ? this.language('NEWS_BAOCUNCHENGGONG',"保存成功") : this.language('NEWS_FABUCHENGGONG',"发布成功"));
              this.$router.push({
                path: "/news/notice/index",
              });
            }
            this.saveFlag = false
          });
        } else {
          // if (this.ruleForm.publishRange)
          console.log("this.ruleForm", this.ruleForm);
          return false;
        }
      });
    },
    // 预览
    handlePreview() {
      this.preview = true;
      this.card = false;
    },
    // 重置
    handleReset() {
      this.ruleForm = {
        status: "",
        title: "",
        type: "",
        publishDate: new Date(+new Date() + 8 * 3600 * 1000)
        .toJSON()
        .substr(0, 19)
        .replace("T", " "),
        isTop: 0,
        publishRange: 0,
        content: "",
        attachments: [],
        userGroup: [],
      },
      this.editor.txt.html("");
    },
    // 返回
    handleReturn() {
      this.$confirm(this.language('NEWS_QRFHHBGGNRBHBC',"确认返回后，本公告内容不会保存！"), this.language('NEWS_SFQRFH',"是否确认返回？"), {
        confirmButtonText: this.language('TERMS_SHI', '是'),
        cancelButtonText: this.language('TERMS_FOU', '否'),
        type: "warning",
      }).then(() => {
        this.$router.push({
          path: "/news/notice/index",
        });
      });
    },
    // 返回公告编辑页
    handleClosePre() {
      this.preview = false;
      this.card = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: space-between;
  .addNotice {
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    line-height: 23px;
    margin-bottom: 30px;
  }
}
.card-title {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  line-height: 21px;
  color: #131523;
  opacity: 1;
}
.top-buttom {
  margin: 20px 0;
}
.input-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .form-row {
    width: 100%;
    display: flex;
    // justify-content: space-between;
    margin-top: 1.5rem;
    .notice-item {
      width: 480px !important;
    }
    .el-form-item {
      width: 100%;
      min-width: 0;
      margin-bottom: 0rem;
      .el-form-item__content {
        width: 100%;
        .el-select {
          height: auto;
        }
      }
    }
    .textarea ::v-deep .el-textarea__inner {
      resize: none;
      text-align: left;
    }
    .el-form-item + .el-form-item {
      margin-left: 80px;
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
    margin-top: 20px;
  }
  .el-upload__tip {
    margin-left: 20px;
    color: #ccc;
  }
  .upload-tip {
    text-align: left;
    padding-top: 10px;
  }
}
.custom--dialog {
  min-height: 300px;
  ::v-deep .el-input {
    width: 100%;
  }
  .custom--checkbox {
    margin-top: 10px;
    width: 100%;
    ::v-deep .el-checkbox-group {
      display: flex;
      flex-direction: column;
      width: 100%;
      .el-checkbox {
        display: flex;
        margin-top: 10px;
        width: 100%;
        .el-checkbox__input {
          margin-top: 3px;
        }
        .el-checkbox__label {
          display: inline-block;
          width: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      }
    }
  }
}
::v-deep .w-e-menu {
  z-index: 3 !important;
}
::v-deep .w-e-toolbar {
  z-index: 2 !important;
}
::v-deep .w-e-text-container {
  z-index: 1 !important;
}
.returnButton {
  flex: 1;
  text-align: right;
  margin-bottom: 20px;
}
.preview {
  .title {
    font-size: 28px;
    font-family: PingFangSC-Semibold;
    line-height: 30px;
    color: #000000;
    text-align: center;
    font-weight: bold;
    margin-top: 40px;
  }
  .first {
    text-align: center;
    margin-top: 20px;
    .author {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      line-height: 17px;
      color: #000000;
      margin-right: 10px;
    }
    .time {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      line-height: 17px;
      color: #999999;
    }
  }
  .paragraph {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    line-height: 24px;
    color: #000000;
    margin-top: 20px;
  }
  .attachmentList {
    display: flex;
    // align-items: center;
    .attachment {
      font-size: 16px;
      font-family: Hiragino Sans GB;
      font-weight: normal;
      line-height: 27px;
      color: #001847;
    }
    .img {
      margin-right: 10px;
    }
    .attachmentLink {
      font-size: 16px;
      font-family: Hiragino Sans GB;
      font-weight: normal;
      line-height: 27px;
      color: #1660f1;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .el-divider--horizontal {
    border-top: 1px dashed #f7faff;
  }
}
</style>
