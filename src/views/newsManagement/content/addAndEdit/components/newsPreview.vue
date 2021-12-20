<template>
  <div>
    <iCard :title="language('NEWS_JICHUXINXI', '基础信息')" collapse>
      <div v-if="ruleForm.category!==2" class="card--form">
        <div class="form-base">
          <el-form
            :model="ruleForm"
            label-width="9rem"
            :rules="rules"
            ref="ruleForm"
            :hideRequiredAsterisk="true"
          >
            <div class="form">
              <div class="input-box">
                <div class="form-row" style="margin-top: 0px">
                  <iFormItem
                    :label="language('NEWS_XINWENFENLEI', '新闻分类')"
                    prop="name"
                    :hideRequiredAsterisk="true"
                  >
                    <iLabel
                      :label="language('NEWS_XINWENFENLEI', '新闻分类')"
                      slot="label"
                      required
                    ></iLabel>
                    <p class="el-p">{{ category[ruleForm.category] }}</p>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_XINWENBIAOTI', '新闻标题')" prop="signNode">
                    <iLabel
                      :label="language('NEWS_XINWENBIAOTI', '新闻标题')"
                      slot="label"
                      required
                    ></iLabel>
                    <p class="el-p" :title="ruleForm.title">{{ ruleForm.title }}</p>
                  </iFormItem>
                </div>
                <div class="form-row">
                  <iFormItem
                    :label="language('NEWS_XINWENLAIYUAN', '新闻来源')"
                    prop="principal"
                    :hideRequiredAsterisk="true"
                  >
                    <iLabel
                      :label="language('NEWS_XINWENLAIYUAN', '新闻来源')"
                      slot="label"
                      required
                    ></iLabel>
                    <p class="el-p" :title="ruleForm.source">{{ ruleForm.source }}</p>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_FABURIQI', '发布日期')" prop="inDate">
                    <iLabel
                      :label="language('NEWS_FABURIQI', '发布日期')"
                      slot="label"
                      required
                    ></iLabel>
                    <p class="el-p">
                      {{ ruleForm.publishDate.substring(0, 10) }}
                    </p>
                  </iFormItem>
                </div>
                <div class="form-row">
                  <iFormItem
                     :label="language('NEWS_XINWENBIAOQIAN', '新闻标签')" 
                    prop="isDuplicate"
                    :hideRequiredAsterisk="true"
                  >
                    <iLabel  :label="language('NEWS_XINWENBIAOQIAN', '新闻标签')"  slot="label"></iLabel>
                    <p class="el-p" :title="tags">{{ tags }}</p>
                  </iFormItem>
                </div>
                <div class="form-row">
                  <iFormItem
                    :label="language('NEWS_FABUFANWEI', '发布范围')"
                    prop="isDuplicate"
                    :hideRequiredAsterisk="true"
                  >
                    <iLabel
                      :label="language('NEWS_FABUFANWEI', '发布范围')"
                      slot="label"
                      required
                    ></iLabel>
                    <p
                      class="el-p"
                      :title="
                        ruleForm.publishRange!=null && ruleForm.publishRange.code === 15
                          ? userGroup
                          : ruleForm.publishRange!=null?ruleForm.publishRange.name:''
                      "
                    >
                      {{
                        ruleForm.publishRange!=null && ruleForm.publishRange.code === 15
                          ? userGroup
                          : ruleForm.publishRange!=null?ruleForm.publishRange.name:''
                      }}
                    </p>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_SHIFOUZHIDING', '是否置顶')">
                    <iLabel :label="language('NEWS_SHIFOUZHIDING', '是否置顶')" slot="label"></iLabel>
                    <p class="el-p">{{ ruleForm.isTop === 1 ? language('TERMS_SHI', '是') : language('TERMS_FOU', '否') }}</p>
                  </iFormItem>
                </div>

                <div class="form-row">
                  <iFormItem :label="language('NEWS_XINWENGAIYAO', '新闻概要')">
                    <iLabel :label="language('NEWS_XINWENGAIYAO', '新闻概要')" slot="label"></iLabel>
                    <p class="el-p" :title="ruleForm.summary">{{ ruleForm.summary }}</p>
                  </iFormItem>
                </div>
                <div v-show="ruleForm.category === 0" class="form-row">
                  <iFormItem :label="language('NEWS_TOUTIAOLIANJIE', '头条链接')">
                    <iLabel :label="language('NEWS_TOUTIAOLIANJIE', '头条链接')" slot="label"></iLabel>
                    <p class="el-p" :title="ruleForm.linkUrl">{{ ruleForm.linkUrl }}</p>
                  </iFormItem>
                </div>
                <div v-show="ruleForm.category === 2" class="form-row">
                  <iFormItem :label="language('NEWS_GONGYINGSHANGMINGCHENG', '供应商名称')">
                    <iLabel :label="language('NEWS_GONGYINGSHANGMINGCHENG', '供应商名称')" slot="label"></iLabel>
                    <p class="el-p" :title="ruleForm.providerName">{{ ruleForm.providerName }}</p>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_GUONEIGUOWAI', '国内/国外')">
                    <iLabel :label="language('NEWS_GUONEIGUOWAI', '国内/国外')" slot="label"></iLabel>
                    <p class="el-p">
                      {{ ruleForm.providerType == 0 ? this.language('NEWS_GUONEI', '国内'): this.language('NEWS_GUOWAI', '国外') }}
                    </p>
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
                class="hide"
                list-type="picture-card"
                :file-list="picUrl"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <el-image
                  ref="coverImage"
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  :preview-src-list="[file.url]"
                  ></el-image>
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handleNewsPicPreview(file.url)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownloadFile(file.url, '新闻封面.png')"
                    >
                      <i class="el-icon-download"></i>
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
      <div v-if="ruleForm.category==2" style="height: 49rem">
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
                    <p class="el-p">{{ category[ruleForm.category] }}</p>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_XINWENBIAOTI', '新闻标题')" prop="title">
                    <iLabel
                      :label="language('NEWS_XINWENBIAOTI', '新闻标题')"
                      slot="label"
                      required
                    ></iLabel>
                    <p class="el-p" :title="ruleForm.title">{{ ruleForm.title }}</p>
                  </iFormItem>
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
                    <p
                      class="el-p"
                      :title="
                        ruleForm.publishRange!=null && ruleForm.publishRange.code === 15
                          ? userGroup
                          : ruleForm.publishRange!=null?ruleForm.publishRange.name:''
                      "
                    >
                      {{
                        ruleForm.publishRange!=null && ruleForm.publishRange.code === 15
                          ? userGroup
                          : ruleForm.publishRange!=null?ruleForm.publishRange.name:''
                      }}
                    </p>
                  </iFormItem>
                </div>
                <div class="form-two">
                  <iFormItem :label="language('NEWS_FABURIQI', '发布日期')" prop="publishDate">
                    <iLabel
                      :label="language('NEWS_FABURIQI', '发布日期')"
                      slot="label"
                      required
                    ></iLabel>
                    <div class="form-item-one"> <p class="el-p">
                      {{ ruleForm.publishDate.substring(0, 10) }}
                    </p></div>
                  </iFormItem>
                  <iFormItem class="form-item-two" :label="language('NEWS_XINWENBIAOQIAN', '新闻标签')"  :hideRequiredAsterisk="true">
                    <iLabel :label="language('NEWS_XINWENBIAOQIAN', '新闻标签')" slot="label"></iLabel>
                    <p class="el-p" :title="tags">{{ tags }}</p>
                  </iFormItem>
                </div>
                <div class="form-row">
                  <iFormItem :label="language('NEWS_SHIFOUZHIDING', '是否置顶')" prop="isTop">
                    <iLabel
                      :label="language('NEWS_SHIFOUZHIDING', '是否置顶')"
                      slot="label"
                      required
                    ></iLabel>
                    <p class="el-p">{{ ruleForm.isTop === 1 ? language('TERMS_SHI', '是') : language('TERMS_FOU', '否') }}</p>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_GONGYINGSHANGMINGCHENG', '供应商简称')">
                    <iLabel :label="language('NEWS_GONGYINGSHANGMINGCHENG', '供应商简称')" slot="label"></iLabel>
                    <p class="el-p" :title="ruleForm.providerName">{{ ruleForm.providerName }}</p>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_YUANWENLIANJIE', '原文链接')">
                    <iLabel :label="language('NEWS_YUANWENLIANJIE', '原文链接')" slot="label"></iLabel>
                    <p class="el-p" :title="ruleForm.linkUrl">{{ ruleForm.linkUrl }}</p>
                  </iFormItem>
                </div>
                <div class="form-summary">
                  <iFormItem :label="language('NEWS_XINWENGAIYAO', '新闻概要')" prop="summary">
                    <iLabel
                      :label="language('NEWS_XINWENGAIYAO', '新闻概要')"
                      slot="label"
                      required
                    ></iLabel>
                    <p class="el-p" :title="ruleForm.summary">{{ ruleForm.summary }}</p>
                  </iFormItem>
                </div>
              </div>
            </div>
          </el-form>
          </div>
      </div>
    </iCard>
    <iCard v-show="ruleForm.category!==2" :title="language('NEWS_ZHENGWEN','正文')" collapse class="margin-top20">
      <el-form
        :model="ruleForm"
        label-width="7rem"
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
                <p class="el-p">{{ newsType[ruleForm.type] }}</p>
              </iFormItem>
            </div>
            <!-- 图集 -->
            <div v-if="ruleForm.type === 1">
              <span>{{language('NEWS_TUJI', '图集：')}}</span>
              <div class="form-row form-row-pic">
                <div class="upload-file">
                  <el-upload
                    class="hide"
                    list-type="picture-card"
                    :file-list="ruleForm.newsAtlas"
                  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                      <el-image
                        ref="elImage"
                        class="el-upload-list__item-thumbnail"
                        :src="file.atlasUrl"
                        :preview-src-list="imgUrls"
                      >
                      </el-image>
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file.atlasUrl)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownloadFile(file.atlasUrl, file.atlasName)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                </div>
              </div>
            </div>
            <!-- 视频 -->
            <div v-if="ruleForm.type === 2">
              <div class="form-row">
                <iFormItem
                  :label="language('NEWS_SHIPINXINWEN', '视频新闻')"
                  :hideRequiredAsterisk="true"
                  class="form--item--video"
                >
                  <iLabel :label="language('NEWS_SHIPINXINWEN', '视频新闻')" slot="label"></iLabel>
                  <div class="upload-file" style="margin-left: 0px">
                    <el-upload
                      class="hide"
                      list-type="picture-card"
                      :file-list="videoUrl"
                    >
                      <i slot="default" class="el-icon-plus"></i>
                      <div slot="file" slot-scope="{ file }">
                        <video
                          class="el-upload-list__item-thumbnail"
                          :src="file.url"
                          alt=""
                        />
                        <span class="el-upload-list__item-actions">
                          <span
                            class="el-upload-list__item-preview"
                            @click="handleVideoPreview(file.url)"
                          >
                            <i class="el-icon-video-play"></i>
                          </span>
                          <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="
                              handleDownloadFile(file.url, '视频文件.mp4')
                            "
                          >
                            <i class="el-icon-download"></i>
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
                v-show="ruleForm.type === 0"
                class="editer"
                id="editer"
              ></div>
            </div>
            <div class="form-row">
              <div class="pdf--file">
                <span>{{language('NEWS_FUJIAN', '附件')}}</span>
                <ul>
                  <li v-for="item in ruleForm.newsAttachments" :key="item.id">
                    <a
                      @click="
                        handleDownloadFile(
                          item.attachmentUrl,
                          item.attachmentName
                        )
                      "
                      class="el-upload-list__item-name"
                    >
                      <i class="el-icon-paperclip"></i>{{ item.attachmentName }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </el-form>
      <div v-if="VideoDialogVisible" tabindex="-1" class="el-image-viewer__wrapper" style="z-index: 2000">
        <div class="el-image-viewer__mask"></div>
        <span @click="VideoDialogVisible=false" class="el-image-viewer__btn el-image-viewer__close"
          ><i class="el-icon-close"></i>
        </span>
        <div class="el-image-viewer__canvas">
          <video
            controls="controls"
            autoplay="autoplay"
            :src="dialogVideoUrl"
            class="el-image-viewer__img"
            style="
              transform: scale(1) rotate(0deg);
              height: 75%;
              width: 75%;
            "
          />
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import {
  iCard,
  iFormItem,
  iLabel,
} from "rise";import E from "wangeditor";
import { newsClassify, newsAllTypes } from "./data";
import { createAnchorLink } from "@/utils/downloadUtil";

export default {
  components: {
    iCard,
    // iButton,
    iFormItem,
    iLabel,
    // iDialog,
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
        this.picUrl = [{ url: val.picUrl }];
        this.videoUrl = [{ url: val.videoUrl }];
        if (this.editor != null) {
          this.editor.txt.html(this.ruleForm.content);
        }
        this.imgUrls = val.newsAtlas.map((item) => item.atlasUrl);
      },
    },
    // ruleForm(val) {
    //   this.$emit("input", val);
    // },
  },
  data() {
    return {
      newsClassify,
      newsAllTypes,
      dialogVideoUrl: "",
      VideoDialogVisible: false,
      disabled: false,
      picUrl: [],
      videoUrl: [],
      ruleForm: { name: "阿花" },
      editor: null,
      imgUrls: [],
    };
  },
  computed: {
    category() {
      let obj = this.newsClassify?.reduce((obj, item) => {
        return { ...obj, [item.value]: item.label };
      }, {});
      return obj;
    },
    newsType() {
      return this.newsAllTypes?.reduce((obj, item) => {
        return { ...obj, [item.value]: item.label };
      }, {});
    },
    tags() {
      let str = this.ruleForm.tags.map((item) => item.content) || [];
      return str.join(",");
    },
    userGroup() {
      let str = this.ruleForm.userGroup?.map((item) => item.groupName) || [];
      return str?.join(",");
    },
  },
  mounted() {
    if (this.editor === null) {
      this.editor = new E("#editer");
      // 配置菜单栏，设置不需要的菜单
      this. editor.config.excludeMenus = [
            'list',
            'todo',
            'emoticon',
            'image',
            'video',
            'table',
            'code',
        ]
      // 配置字体
      this.editor.config.fontNames = [
          // 字符串形式
          '黑体',
          '仿宋',
          '楷体',
          '标楷体',
          '华文仿宋',
          '华文楷体',
          '宋体',
          '微软雅黑',
          'Arial',
          'Tahoma',
          'Verdana',
          'Times New Roman',
          'Courier New',
      ]
      this.editor.config.menus = this.editor.config.menus.concat('uploadMenu')// 配置菜单栏，删减菜单，调整顺序
      this.editor.config.menus.concat('uploadMenu')// 配置菜单栏，删减菜单，调整顺序
      this.editor.create();
      this.editor.disable();
    }
  },
  methods: {
    handleVideoPreview(url) {
      this.VideoDialogVisible = true;
      this.dialogVideoUrl = url;
    },
    handleDownloadFile(url, name) {
      createAnchorLink(
        url, // 前端跨域问题，将api地址替换为反向代理地址
        name
      );
    },
    handleNewsPicPreview(url) {
      this.$refs["coverImage"].showViewer = true;
      this.$refs["coverImage"].src = url;
    },
    handlePictureCardPreview(url) {
      this.$refs["elImage"].showViewer = true;
      this.$refs["elImage"].src = url;
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
    width: 60%;
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
      .uploadfile-tip {
        font-size: 12px;
        color: #ccc;
        text-align: left;
      }
      .upload-file {
        margin-bottom: 0px;
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
    .form-two{
      width: 100%;
      margin-top: 1.5rem;
      height: 2.5rem !important;
      display: flex;
      .form-item-one{
        width: 22.7rem !important;
        margin-right: 80px;
          .el-p {
            position: relative;
            font-size: 0.875rem;
            display: inline-block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            text-align: center;
            background-color: #f8f8fa;
            border-radius: 4px;
            color: $color-black;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 10px;
          }
      }
      .form-item-two{
        flex: 1;
        .el-form-item__content {
          .el-p {
            position: relative;
            font-size: 0.875rem;
            display: inline-block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            text-align: center;
            background-color: #f8f8fa;
            border-radius: 4px;
            color: $color-black;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 10px;
          }
        }
      }
    }
    .form-summary{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;
      .form--item {
        width: 30% !important;
      }
      .form--item--video {
        min-width: 308px;
        min-height: 200px;
      }
      .el-form-item {
        width: 100%;
        min-width: 0;
        margin-bottom: 0rem;
        height: 40px;
        .el-form-item__content {
          width: 100%;
          .video-tip {
            font-size: 12px;
            color: #ccc;
            text-align: left;
          }
          .el-p {
            position: relative;
            font-size: 0.875rem;
            display: inline-block;
            width: 100%;
            height: 230px;
            background-color: #f8f8fa;
            border-radius: 4px;
            color: $color-black;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 10px;
          }
        }
      }
    }
    .form-row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;
      .form--item {
        width: 30% !important;
      }
      .form--item--video {
        min-width: 308px;
        min-height: 200px;
      }
      .el-form-item {
        width: 100%;
        min-width: 0;
        margin-bottom: 0rem;
        height: 40px;
        .el-form-item__content {
          width: 100%;
          .video-tip {
            font-size: 12px;
            color: #ccc;
            text-align: left;
          }
          .el-p {
            position: relative;
            font-size: 0.875rem;
            display: inline-block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            text-align: center;
            background-color: #f8f8fa;
            border-radius: 4px;
            color: $color-black;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 10px;
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
      .pdf--file {
        display: flex;
        ul {
          margin-left: 10px;
          li {
            margin-top: 5px;
            .el-upload-list__item-name {
              font-size: 14px;
              font-family: Arial;
              font-weight: 400;
              line-height: 16px;
              color: #1660f1;
              cursor: pointer;
              .el-icon-paperclip {
                color: #1660f1;
              }
            }
          }
        }
      }
    }
    .form-row-pic {
      border: #ccc solid 1px;
      overflow-y: scroll;
      height: 403px;
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
        margin-left: 8px;
        margin-top: 8px;
      }
    }
  }
}
.upload-file ::v-deep {
  margin: 10px 0px 0px 10px;
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
    transition: none !important;
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
}
.hide {
  min-width: 356px;
  min-height: 200px;
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
</style>
