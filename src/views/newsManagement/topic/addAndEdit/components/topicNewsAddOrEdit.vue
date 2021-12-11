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
            <div v-show="operationType==='' || operationType===undefined" class="form">
              <div class="input-box">
                <div class="form-row" style="margin-top:0px">
                  <iFormItem
                      :label="language('NEWS_ZHUANTIFENLEI', '专题分类')"
                      prop="name"
                      :hideRequiredAsterisk="true"
                  >
                    <iLabel
                        :label="language('NEWS_ZHUANTIFENLEI', '专题分类')"
                        slot="label"
                        required
                    ></iLabel>
                    <p class="el-p">{{ category[ruleForm.category] }}</p>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_ZHUANTIMINGCHENG', '专题名称')">
                    <iLabel
                        :label="language('NEWS_ZHUANTIMINGCHENG', '专题名称')"
                        slot="label"
                        required
                    ></iLabel>
                    <p class="el-p" :title="ruleForm.name">{{ ruleForm.name }}</p>
                  </iFormItem>
                </div>
                <div class="form-row">
                  <iFormItem
                      :label="language('NEWS_ZHUANTILAIYUAN', '专题来源')"
                      :hideRequiredAsterisk="true"
                  >
                    <iLabel
                        :label="language('NEWS_ZHUANTILAIYUAN', '专题来源')"
                        slot="label"
                        required
                    ></iLabel>
                    <p class="el-p" :title="ruleForm.source">{{ ruleForm.source }}</p>
                  </iFormItem>
                  <iFormItem :label="language('NEWS_FABURIQI', '发布日期')">
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
                  <iFormItem :label="language('NEWS_SHIFOUZHIDING', '是否置顶')">
                    <iLabel :label="language('NEWS_SHIFOUZHIDING', '是否置顶')" slot="label" required></iLabel>
                    <p class="el-p">{{ ruleForm.isTop === 1 ? language('TERMS_SHI', '是') : language('TERMS_FOU', '否')
                      }}</p>
                  </iFormItem>
                  <iFormItem/>
                </div>
                <div class="form-row">
                  <iFormItem
                      :label="language('NEWS_ZHUANTIBIAOQIAN', '专题标签')"
                      :hideRequiredAsterisk="true"
                  >
                    <iLabel
                        :label="language('NEWS_ZHUANTIBIAOQIAN', '专题标签')"
                        slot="label"
                    ></iLabel>
                    <p class="el-p" :title="tags">{{ tags }}</p>
                  </iFormItem>
                </div>
                <div class="form-row">
                  <iFormItem :label="language('NEWS_ZHUANTIGAIYAO', '专题概要')">
                    <iLabel :label="language('NEWS_ZHUANTIGAIYAO', '专题概要')" slot="label" required></iLabel>
                    <p class="el-p" :title="ruleForm.summary">{{ ruleForm.summary }}</p>
                  </iFormItem>
                </div>
              </div>
            </div>
            <div v-show="operationType==='add' || operationType==='edit'" class="form">
              <div class="input-box">
                <div class="form-row" style="margin-top:0px">
                  <iFormItem
                      :label="language('NEWS_ZHUANTIFENLEI', '专题分类')"
                      prop="category"
                      :hideRequiredAsterisk="true"
                  >
                    <iLabel
                        :label="language('NEWS_ZHUANTIFENLEI', '专题分类')"
                        slot="label"
                        required
                    ></iLabel>
                    <iSelect
                        :value="ruleForm.category"
                        @input="handleCategoryIntercept"
                        :disabled="ruleForm.id !== ''"
                        @change="selectChanged"
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
                  <iFormItem :label="language('NEWS_ZHUANTIMINGCHENG', '专题名称')" prop="name">
                    <iLabel
                        :label="language('NEWS_ZHUANTIMINGCHENG', '专题名称')"
                        slot="label"
                        required
                    ></iLabel>
                    <iInput v-model.trim="ruleForm.name" maxlength="80"></iInput>
                  </iFormItem>
                </div>
                <div class="form-row">
                  <iFormItem
                      :label="language('NEWS_ZHUANTILAIYUAN', '专题来源')"
                      prop="source"
                      :hideRequiredAsterisk="true"
                  >
                    <iLabel
                        :label="language('NEWS_ZHUANTILAIYUAN', '专题来源')"
                        slot="label"
                        required
                    ></iLabel>
                    <iInput :disabled="ruleForm.category==2" v-model.trim="ruleForm.source"></iInput>
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
                  <iFormItem/>
                </div>
                <div class="form-row">
                  <iFormItem :label="language('NEWS_ZHUANTIBIAOQIAN', '专题标签')" :hideRequiredAsterisk="true">
                    <iLabel :label="language('NEWS_ZHUANTIBIAOQIAN', '专题标签')" slot="label"></iLabel>
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
                  <iFormItem :label="language('NEWS_ZHUANTIGAIYAO', '专题概要')" prop="summary">
                    <iLabel
                        :label="language('NEWS_ZHUANTIGAIYAO', '专题概要')"
                        slot="label"
                        required
                    ></iLabel>
                    <iInput v-model.trim="ruleForm.summary"></iInput>
                  </iFormItem>
                </div>
              </div>
            </div>
          </el-form>
        </div>
        <div class="form--file">
          <el-divider direction="vertical"></el-divider>
          <div class="form--upload">
            <span class="margin-left10">{{language('NEWS_SCXWFM', '上传新闻封面')}}<span
                style="color:red;font-size:14px;"> *</span></span>
            <div class="upload-file">
              <el-upload
                  :class="[showOrHide ? 'hide' : '', ulListFlag ? 'ul-hide' : '']"
                  :on-change="handleChange"
                  list-type="picture-card"
                  :before-upload="beforeAvatarUpload"
                  :file-list="picUrl"
                  class="upload--file--div"
                  accept=".JPG, .PNG, .JPEG,.jpg, .png, .jpeg"
              >
                <i v-loading="uploadLoading" slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
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
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file, '专题封面.png')"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                        v-if="operationType!==''"
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
            >{{language('NEWS_JYSYBLTP', '建议使用16:9比例图文件，不超过10MB')}}</span
            >
          </div>
        </div>
      </div>
    </iCard>

    <iCard class="margin-top20 card">
      <div class="card--header">
        <div v-if="operationType!==''" class="card--header--item card--header--item--btn">
          <iButton @click="handleAddNews">{{ language('NEWS_TIANJIA', '添加') }}</iButton>
          <iButton @click="handleDeleteNews" :disabled="selectTableList.length === 0">{{
            language('LK_SHANCHU', '删除')
            }}
          </iButton>
        </div>
      </div>
      <div class="card--body">
        <iTableML
            tooltip-effect="light"
            :data="ruleForm.newsIds"
            :tableLoading="tableLoading"
            @selectionChange="handleSelectionChange"
        >
          <el-table-column
              v-if="operationType==='add' || operationType==='edit'"
              type="selection"
              width="50"
              align="center"
          ></el-table-column>
          <el-table-column width="40" class="table--column--index" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="language('NEWS_XINWENBIAOTI', '新闻标题')"
          >
            <template slot-scope="scope">
            <span
                :class="'open-link-text cursor'"
                @click="handleOpenNewsDetails(scope.row)"
            >{{ scope.row["title"] }}</span
            >
            </template>
          </el-table-column
          >
          <el-table-column align="center" :label="language('NEWS_XINWENLAIYUAN', '新闻来源')">
            <template slot-scope="scope">
              <span>{{ scope.row["source"] }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="language('NEWS_XINWENLEIXING', '新闻类型')"
          >
            <template slot-scope="scope">
              <span>{{ category[scope.row["category"]] }}</span>
            </template>
          </el-table-column
          >
          <el-table-column align="center" :label="language('NEWS_FABURIQI', '发布日期')">
            <template slot-scope="scope">
              <span>{{ scope.row["publishDate"].substring(0, 10) }}</span>
            </template>
          </el-table-column>
        </iTableML>
        <iPagination
            v-update
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :prev-text="language('NEWS_SHANGYIYE', '上一页')"
            :next-text="language('NEWS_XIAYIYE', '下一页')"
            :total="page.total"
        />
      </div>
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
    <newsListDialog
        v-if="openNewsListDialog"
        :openDialog="openNewsListDialog"
        :category="ruleForm.category"
        @closeDialog="handleCloseNewsListDialog"
        @saveChecked="handleSelectedNewsTableData"
        :newsCheckList="newsCheckList"
    />
  </div>
</template>

<script>
import {iButton, iCard, iDatePicker, iFormItem, iInput, iLabel, iMessage, iPagination, iSelect,} from "rise";
import iTableML from "@/components/newsComponents/iTableML";
import {uploadFile} from "@/api/news/uploadFile";
import ImgCutter from "vue-img-cutter";
import {baseRules, newsClassify} from "./data";
import newsListDialog from "./newsListDialog.vue";
import {addTopicNews, findTagList, findTopicNewsPage, removeTopicNews,} from "@/api/news/news";
import {pageMixins} from "@/utils/pageMixins";
import {createAnchorLink} from "@/utils/downloadUtil";

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iPagination,
    iInput,
    iFormItem,
    iLabel,
    iDatePicker,
    iSelect,
    ImgCutter,
    iButton,
    // iDialog,
    iTableML,
    newsListDialog,
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        id: ''
      }),
    },
    userNewsClassify: {
      type: Array,
      default: () => {
        return [];
      },
    },
    newsClassifyCode: {
      type: Array,
      default: () => {
        return [];
      },
    },
    operationType: {
      type: String,
      default: () => {
        return '';
      },
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
        if (this.ruleForm.id !== '') {
          this.topicNewsPageReset();

        }
        if (val.picUrl != null && val.picUrl != "") {
          this.picUrl = [{url: val.picUrl}];
        }
      },
    },
    ['value.id'](val, oldVal) {
      if (val && !oldVal) {
        this.$nextTick(() => {
          // 如果标签删除后，tagslist可能找不对应的ID，这里做缓存列表，保证tag能显示出来
          const $tags = this.$refs['tags'];
          $tags.cachedOptions.unshift(...this.ruleForm.tags.map(tag => ({
            value: tag,
            currentLabel: tag.content,
          })));
          $tags.setSelected();
        })
      }
    },
    ruleForm(val) {
      this.$emit("input", val);
    },
    userNewsClassify(val) {
      findTagList({category: val[0].code}).then((res) => {
        this.tagList = res;
      });
    },
  },
  data() {
    return {
      openNewsListDialog: false,
      newsClassify,
      baseRules,
      uploadLoading: false,
      selectTableList: [],
      tableListData: [],
      tableLoading: false,
      newsCheckList: [],
      picUrl: [],
      ruleForm: {},
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
      tagList: [],
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
    category() {
      let obj = this.newsClassify?.reduce((obj, item) => {
        return {...obj, [item.value]: item.label};
      }, {});
      return obj;
    },
    tags() {
      let str = this.ruleForm.tags.map((item) => item.content);
      return str.join(",");
    },
  },
  mounted() {
    findTagList({category: this.ruleForm.category}).then((res) => {
      this.tagList = res;
    });
  },
  methods: {
    handleOpenNewsDetails(val) {
      let {href} = this.$router.resolve({
        name: "newsContentBrowse",
        params: {
          id: val.id,
          button: false,
        },
      });
      window.open(href, "_blank");
    },
    handleAddNews() {
      this.openNewsListDialog = true;
    },
    handleDeleteNews() {
      let indexs = this.selectTableList.map(item => item.id);
      if (this.ruleForm.id != '') {
        removeTopicNews({topicId: this.ruleForm.id, newsIds: this.selectTableList}).then((res) => {
          if (res.code === 200) {
            this.selectTableList = [];
            this.topicNewsPageReset();
            this.$message.success(this.language('NEWS_SHANCHUCHENGGONG', '删除成功'));
          }
        });
      } else {
        let obj = this.newsCheckList.filter(item => {
          console.log(item)
          return !indexs.includes(item.id);
        })
        this.newsCheckList = obj;
        this.ruleForm.newsIds = obj;
        this.page.total = obj?.length;
      }
    },
    handleCloseNewsListDialog(val) {
      this.openNewsListDialog = val;
    },
    handleSelectedNewsTableData(val) {
      if (this.ruleForm.id != '') {
        if (val?.length > 0) {
          addTopicNews({topicId: this.ruleForm.id, newsIds: val}).then((res) => {
            if (res.code === 200) {
              this.newsCheckList = [];
              this.topicNewsPageReset();
              this.$message.success("添加成功！");
            }
          });
        }
      } else {
        this.newsCheckList = val;
        this.ruleForm.newsIds = val;
        this.page.total = val?.length;
      }
    },
    handleCategoryIntercept(val) {
      if (this.ruleForm.category === val) {
        return;
      }
      this.ruleForm.category = val;
      this.ruleForm.tags = [];
      findTagList({category: this.ruleForm.category}).then((res) => {
        this.tagList = res;
      });
    },
    selectChanged(value){
      if(value===2){
        this.ruleForm.source = 'FRM_财务风险管理'
      }else{
        this.ruleForm.source = ''
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
      })
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
          file.url, // 前端跨域问题，将api地址替换为反向代理地址
          name
      );
    },
    // 表格选中值集
    handleSelectionChange(val) {
      this.selectTableList = val;
    },
    handleCurrentChange(val) {
      this.page.currPage = val;
      let param = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.topicNewsPageReset(param);
    },
    handleSizeChange(val) {
      this.page.currPage = 1;
      this.page.pageSize = val;
      let param = {
        ...this.form,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.topicNewsPageReset(param);
    },
    topicNewsPageReset(obj) {
      let param = {topicId: this.ruleForm.id, pageNum: 1, pageSize: 10, ...obj};
      this.topicNewsPage(param);
    },
    topicNewsPage(e) {
      findTopicNewsPage(e).then((res) => {
        this.$set(this.ruleForm, "newsIds", res.data);
        this.page.total = res.data?.length;
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
      // min-width: 30%;
      .upload-file ::v-deep {
        margin: 10px 0px 0px 10px;
        min-height: 221px;
        min-width: 364px;

        .el-upload-list__item.is-ready {
          display: none;
        }

        .el-upload-list__item.is-uploading {
          display: none;
        }

        .el-upload-list__item.el-list-leave {
          display: none;
        }

        .el-upload-list__item.el-list-leave-active {
          display: none;
        }

        .el-upload-list__item.el-list-leave-to {
          display: none;
        }

        .el-upload-list__item.el-list-enter-active {
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
        height: 40px;

        .el-form-item__content {
          width: 100%;

          .el-select {
            height: auto;
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

.card {
  margin-bottom: 30px;

  .card--header {
    display: flex;
    justify-content: flex-end;

    .card--header--item {
      font-size: 18px;
      font-weight: bold;
    }

  }

  .card--body {
    margin-top: 20px;
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

.img--cutter ::v-deep {
  .dialogMainModal {
    min-width: 1100px !important;

    .toolMain {
      width: 100%;
      height: 93%;
    }
  }
}

::v-deep .el-table__body-wrapper {
  min-height: 470px
}
</style>
