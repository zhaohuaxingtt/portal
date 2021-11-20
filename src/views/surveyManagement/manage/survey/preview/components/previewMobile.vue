<template>
  <iPage id="routerPage">
    <div class="continer">
      <div class="mobile">
        <h1 class="header">
          {{ previewData.name }}
        </h1>
        <main class="body">
          <header class="title">
            {{ previewData.surveyDescription }}
          </header>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            :hideRequiredAsterisk="true"
          >
            <ul class="content">
              <div v-for="(item, index) of showQuestions" :key="index">
                <li class="item" v-if="item.type == 5">
                  <div
                    class="para-title"
                    v-if="item.first"
                    style="margin-left: -10px"
                  >
                    <iFormItem prop="name">
                      <iLabel
                        :label="item.codeP + '. ' + item.nameP"
                        :required="item.requireP == true"
                        slot="label"
                      ></iLabel>
                    </iFormItem>
                  </div>
                  <!-- <iFormItem prop="name" v-if="item.first">
                    <iLabel
                      :label="item.codeP + '. ' + item.nameP"
                      :required="item.requireP == true"
                      slot="label"
                    ></iLabel>
                  </iFormItem> -->
                  <iFormItem prop="name">
                    <iLabel
                      :label="
                        item.code +
                        (item.second ? ' ' : '. ') +
                        item.name +
                        (item.requiredQuestion ? '' : '   (可选填)')
                      "
                      :required="item.requiredQuestion == true"
                      slot="label"
                    ></iLabel>
                    <el-upload
                      class="upload-demo"
                      :before-upload="beforeAvatarUpload"
                      :show-file-list="false"
                      multiple
                      :http-request="httpUpload"
                      :disabled="true"
                    >
                      <iButton
                        type="button"
                        class="upload-button"
                        :loading="uploadLoading"
                      >
                        上传附件<span class="upload-text"
                          ><img :src="uploadIcon"
                        /></span>
                      </iButton>
                      <div class="upload-limit">
                        <!-- 文件大小最大限制15MB，最多上传9个文件 -->
                        文件大小无限制，最多上传1个文件
                      </div>
                    </el-upload>
                    <ul
                      v-for="item in attachments"
                      :key="item.attachmentId"
                      class="el-upload-list el-upload-list--text"
                    >
                      <li
                        tabindex="0"
                        class="el-upload-list__item is-success"
                        style="background: #f7f7f7; border-radius: 10px"
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
                          <i class="el-icon-paperclip">
                            {{ item.attachmentName }}
                          </i>
                        </a>
                        <label class="el-upload-list__item-status-label">
                          <i
                            class="el-icon-upload-success el-icon-circle-check"
                          ></i>
                        </label>
                        <i
                          @click="handleDeleteAccessory(item.attachmentId)"
                          class="el-icon-close"
                        ></i>
                        <i class="el-icon-close-tip"></i>
                      </li>
                    </ul>
                  </iFormItem>
                </li>
                <li class="item" v-if="item.type == 3">
                  <div
                    class="para-title"
                    v-if="item.first"
                    style="margin-left: -10px"
                  >
                    <iFormItem prop="name" class="p-title">
                      <iLabel
                        :label="item.codeP + '. ' + item.nameP"
                        :required="item.requireP == true"
                        slot="label"
                      ></iLabel>
                    </iFormItem>
                  </div>
                  <iFormItem prop="name">
                    <iLabel
                      :label="
                        item.code +
                        (item.second ? ' ' : '. ') +
                        item.name +
                        (item.requiredQuestion ? '' : '   (可选填)')
                      "
                      :required="item.requiredQuestion == true"
                      slot="label"
                    ></iLabel>
                    <iInput
                      class="textarea"
                      type="textarea"
                      :autosize="{ minRows: 6, maxRows: 8 }"
                      placeholder="请输入您的回答。"
                    ></iInput>
                  </iFormItem>
                </li>
                <li class="item" v-if="item.type == 4">
                  <div
                    class="para-title"
                    v-if="item.first"
                    style="margin-left: -10px"
                  >
                    <iFormItem prop="name">
                      <iLabel
                        :label="item.codeP + '. ' + item.nameP"
                        :required="item.requireP == true"
                        slot="label"
                      ></iLabel>
                    </iFormItem>
                  </div>
                  <iFormItem prop="name">
                    <iLabel
                      :label="
                        item.code +
                        (item.second ? ' ' : '. ') +
                        item.name +
                        (item.requiredQuestion ? '' : '   (可选填)')
                      "
                      :required="item.requiredQuestion == true"
                      slot="label"
                    ></iLabel>
                    <div v-if="item.pictureRule == 1" class="onepic">
                      <el-radio-group
                        class="option"
                        v-for="(it, index) in item.options"
                        :key="index"
                      >
                        <!-- <el-radio :label="it.name"> </el-radio> -->
                        <el-radio
                          label=""
                          :style="
                            item.second
                              ? 'margin-left:20px'
                              : 'margin-left: 10px'
                          "
                        >
                        </el-radio>
                        <div class="image-box">
                          <img :src="it.imageUrl" class="avatar" />
                        </div>
                      </el-radio-group>
                    </div>
                    <div
                      v-if="item.pictureRule == 4 || item.pictureRule == 2"
                      class="twoPic"
                    >
                      <el-radio-group
                        class="option"
                        v-for="(it, index) in item.options"
                        :key="index"
                      >
                        <!-- <el-radio :label="it.name"> </el-radio> -->
                        <el-radio label=""> </el-radio>
                        <div class="image-box">
                          <img :src="it.imageUrl" class="avatar" />
                        </div>
                      </el-radio-group>
                    </div>
                  </iFormItem>
                </li>
                <li class="item" v-if="item.type == 1">
                  <div
                    class="para-title"
                    v-if="item.first"
                    style="margin-left: -10px"
                  >
                    <iFormItem prop="name">
                      <iLabel
                        :label="item.codeP + '. ' + item.nameP"
                        :required="item.requireP == true"
                        slot="label"
                      ></iLabel>
                    </iFormItem>
                  </div>
                  <iFormItem prop="name">
                    <iLabel
                      :label="
                        item.code +
                        (item.second ? ' ' : '. ') +
                        item.name +
                        (item.requiredQuestion ? ' ' : '   (可选填)')
                      "
                      :required="item.requiredQuestion == true"
                      :class="{ 'is-required': item.requiredQuestion }"
                      slot="label"
                    ></iLabel>
                    <div class="oneChoose">
                      <el-radio-group
                        class="option"
                        v-for="(it, index) in item.options"
                        :key="index"
                      >
                        <el-radio
                          :label="it.name"
                          :style="
                            item.second
                              ? 'margin-left:15px'
                              : 'margin-left: 10px'
                          "
                          >{{
                            String.fromCharCode("A".charCodeAt(0) + index) +
                            ". " +
                            it.name
                          }}</el-radio
                        >
                      </el-radio-group>
                    </div>
                  </iFormItem>
                </li>
                <li class="item" v-if="item.type == 6">
                  <div
                    class="para-title"
                    v-if="item.first"
                    style="margin-left: -10px"
                  >
                    <iFormItem prop="name">
                      <iLabel
                        :label="item.codeP + '. ' + item.nameP"
                        :required="item.requireP == true"
                        slot="label"
                      ></iLabel>
                    </iFormItem>
                  </div>
                  <iFormItem prop="name">
                    <iLabel
                      :label="
                        item.code +
                        (item.second ? ' ' : '. ') +
                        item.name +
                        (item.requiredQuestion ? '' : '   (可选填)')
                      "
                      :required="item.requiredQuestion == true"
                      slot="label"
                      class="pull-question-label"
                    ></iLabel>
                    <!-- <div class="pull-question">
                      {{ item.name }}
                    </div> -->
                    <iSelect placeholder="请选择" class="i-select nopassSelect">
                      <el-option
                        v-for="it in item.options"
                        :key="it.number"
                        :label="it.name"
                        :value="it.number"
                      >
                      </el-option>
                    </iSelect>
                  </iFormItem>
                </li>
                <li v-if="item.type == 2" class="radio__content">
                  <div
                    class="para-title"
                    v-if="item.first"
                    style="margin-left: -10px"
                  >
                    <iFormItem prop="name">
                      <iLabel
                        :label="item.codeP + '. ' + item.nameP"
                        :required="item.requireP == true"
                        slot="label"
                      ></iLabel>
                    </iFormItem>
                    <!-- <iFormItem prop="name">
                      <iLabel
                        :label="item.codeP + '. ' + item.nameP"
                        :required="item.requireP == true"
                        slot="label"
                      ></iLabel>
                    </iFormItem> -->
                  </div>
                  <iFormItem prop="name">
                    <iLabel
                      :label="
                        item.code +
                        (item.second ? ' ' : '. ') +
                        item.name +
                        (item.requiredQuestion ? ' ' : '   (可选填)')
                      "
                      :required="item.requiredQuestion == true"
                      :class="{ 'is-required': item.requiredQuestion }"
                      slot="label"
                    ></iLabel>
                    <div
                      v-if="item.multipleRule.constructor == Object"
                      class="text"
                      style="color: #999999"
                    >
                      <span v-if="item.multipleRule.least"
                        >最少选择{{ item.multipleRule.least }}项；</span
                      ><span v-if="item.multipleRule.most"
                        >最多选择{{ item.multipleRule.most }}项；</span
                      >
                    </div>
                    <div v-else class="text" style="color: #999999">
                      <span v-if="JSON.parse(item.multipleRule).least"
                        >最少选择{{
                          JSON.parse(item.multipleRule).least
                        }}项；</span
                      ><span v-if="JSON.parse(item.multipleRule).most"
                        >最多选择{{
                          JSON.parse(item.multipleRule).most
                        }}项；</span
                      >
                    </div>
                  </iFormItem>
                  <!-- <div
                    :class="item.code.includes('.') ? 'title title-p' : 'title'"
                  > -->
                  <!-- <div v-if="item.requiredQuestion" style="color: red">*</div> -->
                  <!-- {{ item.code }}. {{ item.name
                  }}{{ item.requiredQuestion ? "" : "   (可选填)" }} -->
                  <!-- </div> -->
                  <div class="mulChoose">
                    <el-checkbox-group
                      class="option"
                      v-model="checkList"
                      v-for="(i, checkIndex) in item.options"
                      :key="checkIndex"
                      :max="0"
                    >
                      <el-checkbox
                        :style="
                          item.second ? 'margin-left:15px' : 'margin-left: 10px'
                        "
                        :label="i.id + '-' + i.name"
                        class="radioItem"
                        >{{
                          String.fromCharCode("A".charCodeAt(0) + checkIndex) +
                          ". " +
                          i.name
                        }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </div>
                </li>
                <li v-if="item.type == 8">
                  <el-divider></el-divider>
                </li>
                <li v-if="item.type == 7">
                  <div class="remark">
                    {{ item.name }}
                  </div>
                </li>
              </div>
            </ul>
          </el-form>
          <!-- <footer class="submit-footer">
            <iButton class="submit" disabled>提交</iButton>
          </footer> -->
        </main>
      </div>
    </div>
  </iPage>
</template>
<script>
import {
  iButton,
  iMessage,
  iFormItem,
  iLabel,
  iInput,
  iSelect,
  iPage,
} from "rise";
import { uploadFile } from "@/api/survey/uploadFile.js";
import uploadIcon from "@/assets/images/upload-icon.svg";
import { findById } from "@/api/survey/survey.js";
export default {
  props: {
    previewData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    iButton,
    iFormItem,
    iLabel,
    iInput,
    iSelect,
    // iCard,
    iPage,
  },
  data() {
    return {
      checkList: [],
      value: "",
      radio: "",
      uploadLoading: false,
      attachments: [], // 完成编辑页，附件
      uploadIcon,
      ruleForm: {
        options: [
          {
            number: 1,
            name: 2,
          },
        ],
      },
      showQuestions: [],
    };
  },
  mounted() {
    let arr = [];
    this.previewData.questions.forEach((item) => {
      if (item.sonQuestions && item.sonQuestions.length > 0) {
        item.sonQuestions.forEach((it, index) => {
          if (index === 0) {
            arr.push({
              ...it,
              first: true,
              second: true,
              nameP: item.name,
              codeP: item.code,
              requireP: item.requiredQuestion,
            });
          } else {
            arr.push({ ...it, second: true });
          }
        });
      } else {
        arr.push(item);
      }
    });
    this.showQuestions = arr;
    this.$nextTick(() => {
      document.querySelectorAll(".flex-align-center").forEach((item) => {
        let dom = item.querySelector("span").cloneNode(true);
        item.querySelector("span").remove();
        item.appendChild(dom);
      });
    });
  },
  // beforeDestroy() {
  //   this.previewData.questions.forEach((item) => {
  //     item.sonQuestions.map((it, index) => {
  //       it.code = it.code.split(".")[1];
  //     });
  //   });
  // },
  methods: {
    query(e) {
      findById(e).then((res) => {
        this.previewData = res;
      });
    },
    async httpUpload(content) {
      this.uploadLoading = true;
      let formData = new FormData();
      formData.append("file", content.file);
      await uploadFile(formData)
        .then((res) => {
          this.attachments.push({
            attachmentId: res.id,
            attachmentName: res.name,
            attachmentUrl: res.path,
          });
          iMessage.success(this.$t("TERMS_SHANGCHUANCHENGGONG"));
        })
        .catch((err) => {
          iMessage.error(this.$t("TERMS_SHANGCHUANSHIBAI"));
        });
      this.uploadLoading = false;
    },
  },
};
</script>
<style scoped lang="scss">
.nopassSelect{
  margin-left: 17px;
}
.para-title {
  margin-bottom: 36px;
}
.text {
  // font-size: 12px;
  // transform: scale(0.5);
  font-size: 12px;
  /* display: inline-block; */
  -webkit-transform: scale(0.75);
}
.radio__content {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  /* margin-top: 3.75rem; */
  .title {
    /* display: flex; */
    font-size: 16px !important;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
    text-indent: 8px;
  }
  .option {
    margin-top: 10px;
    height: initial;
    .radioItem {
      margin: 15px 0;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 22px;
      transform: translateY(0) !important;
    }
  }
}
.mulChoose {
  margin-right: 10px;
  padding-left: 10px;
}
.title-p {
  font-size: 14px !important;
  text-indent: 8px;
}
::v-deep .el-radio {
  display: flex;
  .el-radio__label {
    white-space: initial;
  }
}
::v-deep .el-checkbox {
  display: flex;
  .el-checkbox__label {
    white-space: initial;
  }
}
.p-title {
  display: block !important;
  margin-bottom: 20px !important;
}
::v-deep .el-form-item {
  position: relative;
  display: flex;
  flex-direction: column;
  .suffix {
    position: absolute;
    top: 0;
  }
}
.routerPage {
  overflow-y: initial;
}
.remark {
  color: #999999;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 20px;
}
/* ::v-deep .el-divider {
  margin: 0;
} */
.radioItem {
  transform: translateY(-20px);
}
::v-deep .el-form-item__content {
  font-size: 16px;
}
.pull-question-label {
  margin-bottom: 39px;
}
.pull-question {
  /* margin-top: 20px; */
  font-size: 16px;
  font-weight: 400;
  color: #424242;
  margin-bottom: 20px;
  line-height: 1.2;
  .i-select {
    width: 90%;
    margin-left: 7px !important;
  }
}
.onepic {
  .option {
    padding-left: 10px;
    margin-top: 20px;
    .image-box {
      margin: 10px 0;
      width: 25%;
      height: auto;
      .avatar {
        margin: 10px 0;
        width: 100%;
        height: 100%;
        display: block;
        margin-left: 55px;
      }
    }
  }
}
.twoPic {
  .option {
    padding-left: 10px;
    margin-top: 20px;
    width: 50%;
    .image-box {
      margin: 10px 0;
      width: 25%;
      height: auto;
      .avatar {
        margin: 10px 0;
        width: 100%;
        height: 100%;
        display: block;
        margin-left: 55px;
      }
    }
  }
}
.textarea {
  margin-top: 39px;
  margin-left: 18px;
}

::v-deep .upload-demo {
  display: flex;
  flex-direction: column;
  .upload-limit {
    width: 100%;
    font-size: 12px;
    font-weight: 400;
    color: #000000;
    height: 14.41px;
    line-height: 14.41px;
    margin-bottom: 10px;
  }
  .upload-button {
    width: 100%;
    margin-left: 15px !important;
    position: relative;
    height: 35px;
    padding: 0;
    color: #fff;
    background-color: #1660f1;
    margin: 47px 0 20px 0;
    .upload-text {
      position: absolute;
      right: 20px;
      img {
        width: 24px;
        height: 18px;
      }
    }
  }
}
::v-deep .flex-align-center {
  align-items: initial;
  span:last-child {
    text-align: left;
    font-weight: 500;
    color: #000;
    font-size: 16px;
    line-height: 1.3;
    // transform: translateX(-10px);
  }
  .start {
    line-height: 1.4;
  }
}
.continer {
  padding: 60px 0;
  /* width: 1440px; */
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  justify-content: center;
  .mobile {
    width: 375px;
    .header {
      margin: 0 auto 19px;
      width: 315px;
      height: 56px;
      font-size: 20px;
      font-weight: 600;
      color: #000000;
      line-height: 28px;
    }
    .body {
      width: 375px;
      /* height: 3741px; */
      background: #f8f9fa;
      padding-top: 18px;
      .title {
        width: 315px;
        /* height: 75px; */
        font-size: 18px;
        font-weight: 400;
        margin: 0 auto 17px;
        color: #424242;
      }
      .content {
        width: 355px;
        /* height: 3516px; */
        background: #ffffff;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        margin: 0 auto;
        padding: 31px 20px 41px;
        .item {
          width: 100%;
          margin-bottom: 20px;
          .upload-demo {
            width: 100%;
          }
          .question {
            font-size: 16px;
            font-weight: 500;
            color: #d10000;
            line-height: 22px;
          }
          .oneChoose {
            padding-left: 10px;
            margin-right: 10px !important;
            display: flex;
            flex-direction: column;
            .option {
              margin-top: 20px;
            }
          }
        }
        .item + .item {
          margin-top: 20px;
        }
      }
    }
    .submit-footer {
      width: 301px;
      margin: 40px auto 0;
      padding-bottom: 40px;
      .submit {
        width: 100%;
      }
    }
  }
}
</style>
