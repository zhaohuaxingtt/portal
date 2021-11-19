<template>
  <div>
    <iCard :title="language('NEWS_JICHUXINXI', '基础信息')" collapse class="margin-bottom20">
      <div class="card--form">
        <div class="form-base">
          <el-form
            :model="ruleForm"
            label-width="9rem"
            :rules="baseRules"
            ref="ruleForm"
            :hideRequiredAsterisk="true"
          >
            <div class="form">
              <div class="input-box">
                <div class="form-row" style="margin-top: 0px">
                  <iFormItem
                    :label="language('NEWS_XINWENFENLEI', '新闻分类')"
                    prop="category"
                    :hideRequiredAsterisk="true"
                  >
                    <iLabel
                      :label="language('NEWS_XINWENFENLEI', '新闻分类')"
                      slot="label"
                      required
                    ></iLabel>
                    <iSelect
                      :value="ruleForm.category"
                      @input="handleCategoryIntercept"
                      :disabled="ruleForm.id !== ''"
                    >
                      <el-option
                        v-for="item in userNewsClassify"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      >
                      </el-option>
                    </iSelect>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_XINWENBIAOTI', '新闻标题')" prop="title">
                    <iLabel
                      :label="language('NEWS_XINWENBIAOTI', '新闻标题')"
                      slot="label"
                      required
                    ></iLabel>
                    <iInput v-model.trim="ruleForm.title" maxlength="80"></iInput>
                  </iFormItem>
                </div>
                <div class="form-row">
                  <iFormItem
                    :label="language('NEWS_XINWENLAIYUAN', '新闻来源')"
                    prop="source"
                    :hideRequiredAsterisk="true"
                  >
                    <iLabel
                      :label="language('NEWS_XINWENLAIYUAN', '新闻来源')"
                      slot="label"
                      required
                    ></iLabel>
                    <iInput v-model.trim="ruleForm.source"></iInput>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_FABURIQI', '发布日期')" prop="publishDate">
                    <iLabel
                      :label="language('NEWS_FABURIQI', '发布日期')"
                      slot="label"
                      required
                    ></iLabel>
                    <iDatePicker
                      value-format="yyyy-MM-dd"
                      type="date"
                      v-model="ruleForm.publishDate"
                      :picker-options="pickerOptions"
                    />
                  </iFormItem>
                </div>
                <div class="form-row">
                  <iFormItem  :label="language('NEWS_XINWENBIAOQIAN', '新闻标签')"  :hideRequiredAsterisk="true">
                    <iLabel :label="language('NEWS_XINWENBIAOQIAN', '新闻标签')" slot="label"></iLabel>
                    <iSelect
                      ref="tags"
                      v-model="ruleForm.tags"
                      :placeholder="language('LK_QINGXUANZE', '请选择')"
                      value-key="id"
                      multiple
                    >
                      <el-option
                        v-for="item in tagList"
                        :key="item.id"
                        :label="item.content"
                        :value="item"
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
                  >
                    <iLabel
                      :label="language('NEWS_FABUFANWEI', '发布范围')"
                      slot="label"
                      required
                    ></iLabel>
                    <div
                      class="item--input"
                      v-if=" ruleForm.userGroup!=null && ruleForm.userGroup.length > 0"
                      @click="handleClickUserGroup"
                    >
                      <iInput :title="userGroup" disabled v-model="userGroup">
                      </iInput>
                    </div>
                    <iSelect
                      v-else
                      :placeholder="language('LK_QINGXUANZE', '请选择')"
                      value-key="code"
                      :value="ruleForm.publishRange"
                      @input="handleChangePublishRange"
                    >
                      <el-option
                        v-for="item in newsPublishRange"
                        :key="item.code"
                        :label="item.name"
                        :value="item"
                      >
                      </el-option>
                    </iSelect>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_SHIFOUZHIDING', '是否置顶')" prop="isTop">
                    <iLabel
                      :label="language('NEWS_SHIFOUZHIDING', '是否置顶')"
                      slot="label"
                      required
                    ></iLabel>
                    <iSelect
                      v-model="ruleForm.isTop"
                      :placeholder="language('LK_QINGXUANZE', '请选择')"
                    >
                      <el-option
                        v-for="item in isApprovalOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </iSelect>
                  </iFormItem>
                </div>
                <div class="form-row">
                  <iFormItem :label="language('NEWS_XINWENGAIYAO', '新闻概要')" prop="summary">
                    <iLabel
                      :label="language('NEWS_XINWENGAIYAO', '新闻概要')"
                      slot="label"
                      required
                    ></iLabel>
                    <iInput v-model.trim="ruleForm.summary"></iInput>
                  </iFormItem>
                </div>
                <div v-show="ruleForm.category === 0" class="form-row">
                  <iFormItem :label="language('NEWS_TOUTIAOLIANJIE', '头条链接')">
                    <iLabel :label="language('NEWS_TOUTIAOLIANJIE', '头条链接')" slot="label"></iLabel>
                    <iInput
                      @blur="handleBlur"
                      v-model.trim="ruleForm.linkUrl"
                    ></iInput>
                  </iFormItem>
                </div>
                <div v-show="ruleForm.category === 2" class="form-row">
                  <iFormItem :label="language('NEWS_GONGYINGSHANGMINGCHENG', '供应商名称')">
                    <iLabel :label="language('NEWS_GONGYINGSHANGMINGCHENG', '供应商名称')" slot="label"></iLabel>
                    <iInput v-model="ruleForm.providerName"></iInput>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_GUONEIGUOWAI', '国内/国外')">
                    <iLabel :label="language('NEWS_GUONEIGUOWAI', '国内/国外')" slot="label"></iLabel>
                    <iSelect
                      v-model="ruleForm.providerType"
                      :placeholder="language('LK_QINGXUANZE', '请选择')"
                    >
                      <el-option
                        v-for="item in nationality"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </iSelect>
                  </iFormItem>
                </div>
              </div>
            </div>
          </el-form>
        </div>
        <div class="form--file">
          <el-divider direction="vertical"></el-divider>
          <div class="form--upload">
            <span class="margin-left10"
              >{{language('NEWS_SCXWFM','上传新闻封面')}}<span style="color: red; font-size: 14px">
                *</span
              ></span
            >
            <div class="upload-file">
              <el-upload
                :class="[showOrHide ? 'hide' : '', ulListFlag ? 'ul-hide' : '']"
                :on-change="handleChange"
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                :file-list="picUrl"
                accept=".JPG, .PNG, .JPEG,.jpg, .png, .jpeg" 
              >
                <i
                  v-loading="uploadLoading"
                  slot="default"
                  class="el-icon-plus"
                ></i>
                <div
                  class="ul--display"
                  style="width: 100%; height: 100%"
                  slot="file"
                  slot-scope="{ file }"
                >
                  <el-image
                    ref="elImage"
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    :preview-src-list="[file.url]"
                  ></el-image>
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file.url)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file, '新闻封面.png')"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
            </div>
            <span class="margin-left10 uploadfile-tip"
              >{{language('NEWS_JYSYBLTP','建议使用16:9比例图文件，不超过10MB')}}</span
            >
          </div>
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
    <ImgCutter
      ref="imgCutterModal"
      class="img--cutter"
      fileType="jpeg"
      :crossOrigin="true"
      crossOriginHeader="*"
      rate="16:9"
      toolBgc="none"
      :isModal="true"
      :showChooseBtn="true"
      :lockScroll="true"
      :boxWidth="1065"
      :boxHeight="680"
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

    <newsTextEdit ref="newsTextEdit" v-model="ruleForm" />
  </div>
</template>

<script>
import {
  iCard,
  iMessage,
  iInput,
  iFormItem,
  iLabel,
  iDatePicker,
  iSelect,
  iButton,
  iDialog,
} from "rise";
import { uploadFile } from "@/api/news/uploadFile";
import newsTextEdit from "./newsTextEdit.vue";
import ImgCutter from "vue-img-cutter";
import { newsClassify, baseRules } from "./data";
import {
  findNewsPublishRange,
  findTagList,
  findGroupList,
} from "@/api/news/news";
import { createAnchorLink } from "@/utils/downloadUtil";

export default {
  components: {
    iCard,
    iInput,
    iFormItem,
    iLabel,
    iDatePicker,
    iSelect,
    newsTextEdit,
    ImgCutter,
    iButton,
    iDialog,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    userNewsClassify: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
        if (val.picUrl != null && val.picUrl != "") {
          this.picUrl = [{ url: val.picUrl }];
        }
        this.contents = { ...val };
        this.newsAtlas = JSON.stringify(this.ruleForm.newsAtlas);
      },
    },
    ruleForm(val) {
      this.$emit("input", val);
    },
    userNewsClassify(val) {
      findTagList({ category: val[0].code }).then((res) => {
        this.tagList = res;
      });
    },
  },
  data() {
    return {
      customDialogVisible: false,
      searchGroupInputVal: "",
      newsClassify,
      baseRules,
      classify: "",
      disabled: false,
      uploadLoading: false,
      picUrl: [],
      ruleForm: {},
      contents: {},
      newsAtlas: [],
      rules: [],
      isApprovalOption: [
        {
          label: this.language('TERMS_SHI', '是'),
          value: 1,
        },
        {
          label: this.language('TERMS_FOU', '否'),
          value: 0,
        },
      ],
      nationality: [
        {
          label: this.language('NEWS_GUOWAI', '国外'),
          value: 1,
        },
        {
          label: this.language('NEWS_GUONEI', '国内'),
          value: 0,
        },
      ],
      newsPublishRange: [],
      tagList: [],
      groupList: [],
      groupCheckList: [],
      disabledAll: false,
      pickerOptions: {
        disabledDate: (time) => {
          let curDate = Date.now() - 8.64e7;
          return time.getTime() < curDate;
        },
      },
      fileFlag: true,
      ulListFlag: false,
    };
  },
  computed: {
    showOrHide() {
      if (this.picUrl?.length > 0) {
        return true;
      }
      return false;
    },
    userGroup() {
      let str = this.ruleForm.userGroup?.map((item) => item.groupName) || [];
      return str.join(",");
    },
  },
  mounted() {
    // 如果标签删除后，tagslist可能找不对应的ID，这里做缓存列表，保证tag能显示出来
    const $tags = this.$refs["tags"];
    $tags.cachedOptions.unshift(
      ...this.ruleForm.tags.map((tag) => ({
        value: tag,
        currentLabel: tag.content,
      }))
    );
    $tags.setSelected();
    findNewsPublishRange().then((res) => {
      this.newsPublishRange = res;
    });
    findTagList({ category: this.ruleForm.category }).then((res) => {
      this.tagList = res;
    });
  },
  methods: {
    handleClickUserGroup() {
      this.getGroupList({ category: this.ruleForm.category });
      this.customDialogVisible = true;
      this.groupCheckList =
        this.ruleForm.userGroup?.map((item) => item.id) || [];
    },
    handleChangePublishRange(val) {
      this.ruleForm.publishRange = val;
      if (val.code === 15) {
        if (this.ruleForm.category === "") {
          this.$message.error(this.language('NEWS_QINGXUANZEXINWENFENLEI', "请选择新闻分类!"));
          return;
        }
        this.getGroupList({ category: this.ruleForm.category });
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
    handleClose() {
      this.customDialogVisible = false;
      if (this.ruleForm.userGroup === null || this.ruleForm.userGroup?.length === 0) {
        this.ruleForm.publishRange = null;
      }
      this.searchGroupInputVal = "";
    },
    handleConfirm() {
      this.ruleForm.userGroup = this.groupList.length>0 ? this.groupList.filter((item) => {
        item.category=[this.ruleForm.category];
        return this.groupCheckList.includes(item.id);
      }) : null;
      this.customDialogVisible = false;
      this.searchGroupInputVal = "";
      if (this.ruleForm.userGroup === null ||this.ruleForm.userGroup.length === 0) {
        this.ruleForm.publishRange = null;
      }
    },
    handleKeyupEnter() {
      this.getGroupList({
        category: this.ruleForm.category,
        groupName: this.searchGroupInputVal,
      });
    },

    handleCategoryIntercept(val) {
      if (this.ruleForm.category === val) {
        return;
      }
      this.categoryIntercept(val, () => {
        this.ruleForm.tags = [];
        if (this.ruleForm.publishRange?.code === 15) {
          this.ruleForm.publishRange = null;
          this.ruleForm.userGroup = [];
        }
        switch (val) {
          case 0:
            this.ruleForm.providerName = "";
            this.ruleForm.providerType = "";
            break;
          case 1:
            this.ruleForm.linkUrl = "";
            this.ruleForm.disabledAll = false;
            this.ruleForm.providerName = "";
            this.ruleForm.providerType = "";
            break;
          case 2:
            this.ruleForm.linkUrl = "";
            this.ruleForm.disabledAll = false;
            break;
          case 3:
            this.ruleForm.linkUrl = "";
            this.ruleForm.disabledAll = false;
            this.ruleForm.providerName = "";
            this.ruleForm.providerType = "";
            break;
        }
        findTagList({ category: this.ruleForm.category }).then((res) => {
          this.tagList = res;
        });
      });
    },
    handleBlur() {
      if (this.ruleForm.linkUrl !== null && this.ruleForm.linkUrl !== "") {
        this.ruleForm.disabledAll = true;
      } else {
        this.ruleForm.disabledAll = false;
      }
    },
    handleChange(file) {
      this.$nextTick(() => {
        if (this.fileFlag && file.status !== "ready") {
          this.$refs.imgCutterModal.handleOpen({
            name: file.name,
            src: URL.createObjectURL(file.raw),
          });
        }
      });
    },
    handleRemove() {
      this.picUrl = [];
      this.ruleForm.picUrl = "";
    },
    handlePictureCardPreview(url) {
      this.$refs["elImage"].showViewer = true;
      this.$refs["elImage"].src = url;
    },
    handleDownload(file, name) {
      createAnchorLink(
        file.url.replace(process.env.VUE_APP_FILE_CROSS, `/fileCross`), // 前端跨域问题，将api地址替换为反向代理地址
        name
      );
    },
    getGroupList(e) {
      findGroupList(e).then((res) => {
        this.groupList = res;
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLtM = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.fileFlag = false;
        this.$message.error(this.language('NEWS_SCTPZNSJPGHZPNGGS', "上传图片只能是 JPG 或者 PNG 格式!"));
      } else {
        this.ulListFlag = true;
        this.fileFlag = true;
      }
      if (!isLtM) {
        this.fileFlag = false;
        this.$message.error(this.language('NEWS_SCTPDXBNCG10MB', "上传图片大小不能超过 10MB!"));
      } else {
        this.ulListFlag = true;
        this.fileFlag = true;
      }
      return isJPG && isLtM;
    },
    async cutDown(res) {
      this.uploadLoading = true;
      let formData = new FormData();
      formData.append("file", res.file);
      await uploadFile(formData)
        .then((res) => {
          this.picUrl = [
            {
              ...res,
              url: res.path,
            },
          ];
          this.ruleForm.picUrl = res.path;
          iMessage.success(this.language('NEWS_SHANGCHUANCHENGGONG', '上传成功'));
          this.uploadLoading = false;
          this.ulListFlag = false;
        })
        .catch(() => {
          iMessage.error(this.language('NEWS_SHANGCHUANSHIBAI', '上传失败'));
          this.uploadLoading = false;
        });
    },
    categoryIntercept(val, callback) {
      if (val < 3 && this.ruleForm.category === 3) {
        if (
          this.contents.videoUrl === this.ruleForm.videoUrl &&
          this.newsAtlas === JSON.stringify(this.ruleForm.newsAtlas)
        ) {
          this.ruleForm.type = 0;
          this.ruleForm.category = val;
          this.ruleForm.videoUrl = "";
          this.ruleForm.newsAtlas = [];
          callback && callback();
        } else {
          this.$confirm(
            this.language('NEWS_QDQHHBXWDZWNRJQBQK', "确定切换后，本新闻的正文内容将全部清空。"),
            this.language('NEWS_SHIFOUQUEDINGQIEHUAN', "是否确定切换？"),
            {
              confirmButtonText: this.language('TERMS_SHI', '是'),
              cancelButtonText: this.language('TERMS_FOU', '否'),
              type: "warning",
            }
          ).then(() => {
            this.ruleForm.type = 0;
            this.ruleForm.category = val;
            this.ruleForm.videoUrl = "";
            this.ruleForm.newsAtlas = [];
            this.$refs["newsTextEdit"].videoUrlList = [];
            callback && callback();
          });
        }
      } else if (val === 3 && this.ruleForm.category < 3) {
        if (this.contents.content === this.ruleForm.content) {
          this.ruleForm.type = 1;
          this.ruleForm.category = val;
          this.$refs["newsTextEdit"].editor.txt.html("");
          callback && callback();
        } else {
          this.$confirm(
            this.language('NEWS_QDQHHBXWDZWNRJQBQK', "确定切换后，本新闻的正文内容将全部清空。"),
            this.language('NEWS_SHIFOUQUEDINGQIEHUAN', "是否确定切换？"),
            {
              confirmButtonText: this.language('TERMS_SHI', '是'),
              cancelButtonText: this.language('TERMS_FOU', '否'),
              type: "warning",
            }
          ).then(() => {
            this.ruleForm.type = 1;
            this.ruleForm.category = val;
            this.$refs["newsTextEdit"].editor.txt.html("");
            callback && callback();
          });
        }
      } else {
        this.ruleForm.type = 0;
        this.ruleForm.category = val;
        callback && callback();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.card--form {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .form-base {
    flex: 1;
    margin-right: 30px;
  }
  .form--file {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 275px;
    ::v-deep .el-divider--vertical {
      height: 290px;
      width: 2px;
    }
    .form--upload {
      margin-left: 15px;
      min-width: 30%;
      .upload-file ::v-deep {
        margin: 10px 0px 0px 10px;
        min-height: 221px;
        min-width: 364px;
        .el-upload-list__item.el-list-move {
          display: none;
        }
        .el-upload-list__item.el-list-leave-to {
          display: none;
        }
        .el-upload-list__item.el-list-enter-to {
          display: none;
        }
        .el-upload-list__item.el-list-enter-active {
          display: none;
        }
        .el-upload-list__item.el-list-leave-active {
          display: none;
        }
        .el-upload--picture-card {
          min-width: 356px;
          min-height: 200px;
          line-height: 200px;
          margin-right: 0.5rem;
        }
        .el-upload-list__item {
          transition: none !important;
          min-width: 356px;
          min-height: 200px;
          line-height: 200px;
        }
      }
      .uploadfile-tip {
        font-size: 12px;
        color: #ccc;
        text-align: left;
      }
    }
  }
}
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
      margin-top: 1.5rem;
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
.item--input ::v-deep {
  .el-input .el-input__inner {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
::v-deep .is-required {
  .flex-align-center {
    .start {
      color: red;
    }
  }
}
.hide {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
.ul-hide {
  ::v-deep .el-upload-list__item {
    display: none;
  }
}
.show {
  ::v-deep .el-upload--picture-card {
    display: block;
  }
}
.img--cutter ::v-deep {
  .dialogMainModal {
    min-width: 1100px !important;
    // height: 70rem !important;
    // min-height: 70rem !important;
    .toolMain {
      width: 100%;
      height: 93%;
    }
  }
}
</style>
