<template>
  <iPage id="routerPage">
    <div class="header--item">
      <p class="name">{{ previewData.name }}</p>
      <p class="surveyDescription">{{ previewData.surveyDescription }}</p>
    </div>
    <div
      class="topic--body"
      v-for="(item, index) in previewData.questions"
      :key="index"
    >
      <!-- 1-单选题 -->
      <div v-if="item.type == 1" class="radio__content">
        <div class="title">
          <span v-if="item.requiredQuestion" style="color: red">* </span
          >{{ item.code }}. {{ item.name
          }}{{ item.requiredQuestion ? "" : "   (可选填)" }}
        </div>
        <el-radio-group
          class="option"
          v-for="(i, index) in item.options"
          :key="index"
        >
          <el-radio :label="i.id + '-' + i.name" class="radioItem">{{
            String.fromCharCode("A".charCodeAt(0) + index) + ". " + i.name
          }}</el-radio>
        </el-radio-group>
      </div>
      <!-- 2-多选题 -->
      <div v-if="item.type == 2" class="radio__content">
        <div class="title">
          <span v-if="item.requiredQuestion" style="color: red">* </span
          >{{ item.code }}. {{ item.name
          }}{{ item.requiredQuestion ? "" : "   (可选填)" }}
          <span
            v-if="item.multipleRule.constructor == Object"
            class="text"
            style="margin-left: 10px; color: #999999"
          >
            <span v-if="item.multipleRule.least"
              >最少选择{{ item.multipleRule.least }}项；</span
            ><span v-if="item.multipleRule.most"
              >最多选择{{ item.multipleRule.most }}项；</span
            >
          </span>
          <span v-else class="text" style="margin-left: 10px; color: #999999">
            <span v-if="JSON.parse(item.multipleRule).least"
              >最少选择{{ JSON.parse(item.multipleRule).least }}项；</span
            ><span v-if="JSON.parse(item.multipleRule).most"
              >最多选择{{ JSON.parse(item.multipleRule).most }}项；</span
            >
          </span>
        </div>
        <el-checkbox-group
          class="option"
          v-model="checkList"
          v-for="(i, checkIndex) in item.options"
          :key="checkIndex"
          :max="0"
        >
          <el-checkbox :label="i.id + '-' + i.name" class="radioItem">{{
            String.fromCharCode("A".charCodeAt(0) + checkIndex) + ". " + i.name
          }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- 3-问答题 -->
      <div v-if="item.type == 3" class="blank__content">
        <div class="title">
          <span v-if="item.requiredQuestion" style="color: red">* </span
          >{{ item.code }}. {{ item.name
          }}{{ item.requiredQuestion ? "" : "   (可选填)" }}
        </div>
        <iInput
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 8 }"
          placeholder="请输入您的回答。"
        ></iInput>
      </div>
      <!-- 4-图片选择题 -->
      <div v-if="item.type == 4" class="pic__content">
        <div class="title">
          <span v-if="item.requiredQuestion" style="color: red">* </span
          >{{ item.code }}. {{ item.name
          }}{{ item.requiredQuestion ? "" : "   (可选填)" }}
        </div>
        <!-- 垂直排布 -->
        <div v-if="item.pictureRule == 1" class="onepic">
          <el-radio-group
            class="option"
            v-for="(i, index) in item.options"
            :key="index"
          >
            <el-radio :label="i.id + '-' + i.name"> </el-radio>
            <div class="image-box">
              <img :src="i.imageUrl" class="avatar" />
            </div>
          </el-radio-group>
        </div>
        <!-- 四宫格排布 -->
        <div v-if="item.pictureRule == 2" class="twoPic">
          <el-radio-group
            class="option"
            v-for="(i, index) in item.options"
            :key="index"
          >
            <el-radio :label="i.id + '-' + i.name"> </el-radio>
            <div class="image-box">
              <img :src="i.imageUrl" class="avatar" />
            </div>
          </el-radio-group>
        </div>
        <!-- 水平排布 -->
        <div v-if="item.pictureRule == 4" class="fourPic">
          <el-radio-group
            class="option"
            v-for="(i, index) in item.options"
            :key="index"
          >
            <el-radio :label="i.id + '-' + i.name"> </el-radio>
            <div class="image-box">
              <img :src="i.imageUrl" class="avatar" />
            </div>
          </el-radio-group>
        </div>
      </div>
      <!-- 5-文件上传题 -->
      <div v-if="item.type == 5" class="file__content">
        <div class="title">
          <span v-if="item.requiredQuestion" style="color: red">* </span
          >{{ item.code }}. {{ item.name
          }}{{ item.requiredQuestion ? "" : "   (可选填)" }}
        </div>
        <div>
          <div class="upload-demo">
            <iButton
              @click="handleClick(index)"
              type="button"
              class="upload-button"
              :loading="uploadLoading"
            >
              上传附件<span class="upload-text"><img :src="uploadIcon" /></span>
            </iButton>
            <p class="upload-limit">文件大小无限制，最多上传1个文件</p>
          </div>
          <!-- <el-upload
            class="upload-demo"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            multiple
            :http-request="httpUpload"
            :disabled="disabledAll || uploadLoading"
          >
            <iButton
              @click="handleClick(index)"
              type="button"
              class="upload-button"
              :loading="uploadLoading"
            >
              上传附件<span class="upload-text"><img :src="uploadIcon" /></span>
            </iButton>
            <p class="upload-limit">文件大小最大限制15MB，最多上传9个文件</p>
          </el-upload> -->
          <!-- <ul
            v-for="item in item.answer"
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
                  handleDownloadFile(item.attachmentUrl, item.attachmentName)
                "
              >
                <i class="el-icon-paperclip">
                  {{ item.attachmentName }}
                </i>
              </a>
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-circle-check"></i>
              </label>
              <i
                @click="handleDeleteAccessory(item.attachmentId, index)"
                class="el-icon-close"
              ></i>
              <i class="el-icon-close-tip"></i>
            </li>
          </ul> -->
        </div>
      </div>
      <!-- 6-下拉题 -->
      <div v-if="item.type == 6" class="pull__content">
        <div class="title">
          <span v-if="item.requiredQuestion" style="color: red">* </span
          >{{ item.code }}. {{ item.name
          }}{{ item.requiredQuestion ? "" : "   (可选填)" }}
        </div>
        <iSelect placeholder="请选择" class="i-select">
          <el-option
            v-for="item in item.options"
            :key="item.number"
            :label="item.name"
            :value="item.id + '-' + item.name"
          >
          </el-option>
        </iSelect>
      </div>
      <!-- 7-备注 -->
      <div v-if="item.type == 7" class="remark__content">
        <div class="title">{{ item.name }}</div>
      </div>
      <!-- 8-下划线 -->
      <div v-if="item.type == 8" class="divider__content">
        <div class="form-line"></div>
      </div>
      <!-- 9-段落 -->
      <div v-if="item.type == 9" class="para__content">
        <div class="title">{{ item.code }}. {{ item.name }}</div>
        <div v-for="(i, sonIndex) in item.sonQuestions" :key="sonIndex">
          <!-- 1-单选题 -->
          <div
            v-if="i.type == 1"
            class="radio__content"
            style="margin-left: 10px"
          >
            <div class="title">
              <span v-if="i.requiredQuestion" style="color: red">* </span
              >{{
                createPre == true
                  ? (String(i.code).indexOf(".") != -1
                    ? i.code
                    : item.code + "." + i.code)
                  : i.code
              }}
              {{ i.name }}{{ i.requiredQuestion ? "" : "   (可选填)" }}
            </div>
            <el-radio-group
              class="option"
              v-for="(i, radioIndex) in i.options"
              :key="radioIndex"
            >
              <el-radio :label="i.id + '-' + i.name" class="radioItem">{{
                String.fromCharCode("A".charCodeAt(0) + radioIndex) +
                ". " +
                i.name
              }}</el-radio>
            </el-radio-group>
          </div>
          <!-- 2-多选题 -->
          <div
            v-if="i.type == 2"
            class="radio__content"
            style="margin-left: 10px"
          >
            <div class="title">
              <span v-if="i.requiredQuestion" style="color: red">* </span
              >{{
                createPre == true
                  ? (String(i.code).indexOf(".") != -1
                    ? i.code
                    : item.code + "." + i.code)
                  : i.code
              }}
              {{ i.name }}{{ i.requiredQuestion ? "" : "   (可选填)" }}
              <span
                v-if="i.multipleRule.constructor == Object"
                class="text"
                style="margin-left: 10px; color: #999999"
              >
                <span v-if="i.multipleRule.least"
                  >最少选择{{ i.multipleRule.least }}项；</span
                ><span v-if="i.multipleRule.most"
                  >最多选择{{ i.multipleRule.most }}项；</span
                >
              </span>
              <span
                v-else
                class="text"
                style="margin-left: 10px; color: #999999"
              >
                <span v-if="JSON.parse(i.multipleRule).least"
                  >最少选择{{ JSON.parse(i.multipleRule).least }}项；</span
                ><span v-if="JSON.parse(i.multipleRule).most"
                  >最多选择{{ JSON.parse(i.multipleRule).most }}项；</span
                >
              </span>
            </div>
            <el-checkbox-group
              class="option"
              v-model="checkList"
              v-for="(i, checkIndex) in i.options"
              :key="checkIndex"
              :max="0"
            >
              <el-checkbox :label="i.id + '-' + i.name" class="radioItem">{{
                String.fromCharCode("A".charCodeAt(0) + checkIndex) +
                ". " +
                i.name
              }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 3-问答题 -->
          <div
            v-if="i.type == 3"
            class="blank__content"
            style="margin-left: 10px"
          >
            <div class="title">
              <span v-if="i.requiredQuestion" style="color: red">* </span
              >{{
                createPre == true
                  ? (String(i.code).indexOf(".") != -1
                    ? i.code
                    : item.code + "." + i.code)
                  : i.code
              }}
              {{ i.name }}{{ i.requiredQuestion ? "" : "   (可选填)" }}
            </div>
            <iInput
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 8 }"
              placeholder="请输入您的回答。"
            ></iInput>
          </div>
          <!-- 4-图片选择题 -->
          <div
            v-if="i.type == 4"
            class="pic__content"
            style="margin-left: 10px"
          >
            <div class="title">
              <span v-if="i.requiredQuestion" style="color: red">* </span
              >{{
                createPre == true
                  ? (String(i.code).indexOf(".") != -1
                    ? i.code
                    : item.code + "." + i.code)
                  : i.code
              }}
              {{ i.name }}{{ i.requiredQuestion ? "" : "   (可选填)" }}
            </div>
            <div v-if="i.pictureRule == 1" class="onepic">
              <el-radio-group
                class="option"
                v-for="(i, imgIndex) in i.options"
                :key="imgIndex"
              >
                <el-radio :label="i.id + '-' + i.name"> </el-radio>
                <div class="image-box">
                  <img :src="i.imageUrl" class="avatar" />
                </div>
              </el-radio-group>
            </div>
            <div v-if="i.pictureRule == 2" class="twoPic">
              <el-radio-group
                class="option"
                v-for="(i, imgIndex) in i.options"
                :key="imgIndex"
              >
                <el-radio :label="i.id + '-' + i.name"> </el-radio>
                <div class="image-box">
                  <img :src="i.imageUrl" class="avatar" />
                </div>
              </el-radio-group>
            </div>
            <div v-if="i.pictureRule == 4" class="fourPic">
              <el-radio-group
                class="option"
                v-for="(i, imgIndex) in i.options"
                :key="imgIndex"
              >
                <el-radio :label="i.id + '-' + i.name"> </el-radio>
                <div class="image-box">
                  <img :src="i.imageUrl" class="avatar" />
                </div>
              </el-radio-group>
            </div>
          </div>
          <!-- 5-文件上传题 -->
          <div
            v-if="i.type == 5"
            class="file__content"
            style="margin-left: 10px"
          >
            <div class="title">
              <span v-if="i.requiredQuestion" style="color: red">* </span
              >{{
                createPre == true
                  ? (String(i.code).indexOf(".") != -1
                    ? i.code
                    : item.code + "." + i.code)
                  : i.code
              }}
              {{ i.name }}{{ i.requiredQuestion ? "" : "   (可选填)" }}
            </div>
            <div>
              <div class="upload-demo">
                <iButton
                  type="button"
                  class="upload-button"
                  :loading="uploadLoading"
                  @click="handleSonClick(index, sonIndex)"
                >
                  上传附件<span class="upload-text"
                    ><img :src="uploadIcon"
                  /></span>
                </iButton>
                <p class="upload-limit">文件大小无限制，最多上传1个文件</p>
              </div>
              <!-- <el-upload
                class="upload-demo"
                :before-upload="beforeAvatarUpload"
                :show-file-list="false"
                multiple
                :http-request="httpUpload"
                :disabled="disabledAll || uploadLoading"
              >
                <iButton
                  type="button"
                  class="upload-button"
                  :loading="uploadLoading"
                  @click="handleSonClick(index, sonIndex)"
                >
                  上传附件<span class="upload-text"
                    ><img :src="uploadIcon"
                  /></span>
                </iButton>
                <p class="upload-limit">
                  文件大小最大限制15MB，最多上传9个文件
                </p>
              </el-upload> -->
              <!-- <ul
                v-for="item in item.answer"
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
                    <i class="el-icon-upload-success el-icon-circle-check"></i>
                  </label>
                  <i
                    @click="
                      handleDeleteAccessory(item.attachmentId, index, sonIndex)
                    "
                    class="el-icon-close"
                  ></i>
                  <i class="el-icon-close-tip"></i>
                </li>
              </ul> -->
            </div>
          </div>
          <!-- 6-下拉题 -->
          <div
            v-if="i.type == 6"
            class="pull__content"
            style="margin-left: 10px"
          >
            <div class="title">
              <span v-if="i.requiredQuestion" style="color: red">* </span
              >{{
                createPre == true
                  ? (String(i.code).indexOf(".") != -1
                    ? i.code
                    : item.code + "." + i.code)
                  : i.code
              }}
              {{ i.name }}{{ i.requiredQuestion ? "" : "   (可选填)" }}
            </div>
            <iSelect placeholder="请选择" class="i-select">
              <el-option
                v-for="item in i.options"
                :key="item.number"
                :label="item.name"
                :value="item.id + '-' + item.name"
              >
              </el-option>
            </iSelect>
          </div>
          <!-- 7-备注 -->
          <div
            v-if="i.type == 7"
            class="remark__content"
            style="margin-left: 10px"
          >
            <div class="title">{{ i.name }}</div>
          </div>
          <!-- 8-下划线 -->
          <div
            v-if="i.type == 8"
            class="divider__content"
            style="margin-left: 10px"
          >
            <div class="form-line"></div>
          </div>
        </div>
      </div>
    </div>
  </iPage>
</template>
<script>
import { iButton, iInput, iSelect } from "rise";
import uploadIcon from "@/assets/images/upload-icon.svg";
export default {
  components: { iInput, iSelect, iButton },
  data() {
    return {
      uploadIcon,
      checkList: [],
      radio: "",
      fileList: [],
      listIndex: null,
      sonListIndex: null,
    };
  },
  props: {
    previewData: {
      type: Object,
      default: () => ({}),
    },
    createPre: {
      type: Boolean,
      default: false,
    },
    // surveyId: {
    //   type: String,
    //   default: () => {
    //     return "";
    //   },
    // },
  },
  created() {
    console.log("previewData", this.previewData);
  },
  methods: {
    // 上传附件
    // async httpUpload(content) {
    //   this.uploadLoading = true;
    //   let formData = new FormData();
    //   formData.append("file", content.file);
    //   await uploadFile(formData)
    //     .then((res) => {
    //       let list = [];
    //       let previewList = this.previewData.questions;
    //       this.$message.success("上传成功");
    //       list.push({
    //         attachmentId: res.id,
    //         attachmentName: res.name,
    //         attachmentUrl: res.path,
    //       });
    //       if (previewList[this.listIndex].type == 9) {
    //         previewList[this.listIndex].sonQuestions[this.sonListIndex].answer =
    //           list;
    //       } else {
    //         previewList[this.listIndex].answer = list;
    //       }
    //       this.uploadLoading = false;
    //     })
    //     .catch((err) => {});
    // },
    // 限制上传图片大小
    // beforeAvatarUpload(file) {
    //   const isLt100M = file.size / 1024 / 1024 < 100;
    //   if (!isLt100M) {
    //     this.$message.error("上传文件大小不能超过100MB!");
    //   }
    //   return isLt100M;
    // },
    // handleDeleteAccessory(val, index, sonIndex) {
    //   let list = this.previewData.questions;
    //   if (list[index].type == 9) {
    //     list[index].sonQuestions[sonIndex].answer = list[index].sonQuestions[
    //       sonIndex
    //     ].answer.filter((item) => {
    //       return !item.attachmentId.includes(val);
    //     });
    //   } else {
    //     list[index].answer = list[index].answer.filter((item) => {
    //       return !item.attachmentId.includes(val);
    //     });
    //   }
    // },
    // handleClick(index) {
    //   console.log("上传附件", index);
    //   this.listIndex = index;
    // },
    // handleSonClick(index, sonIndex) {
    //   console.log("上传附件2", index, sonIndex);
    //   this.listIndex = index;
    //   this.sonListIndex = sonIndex;
    // },
    // handleChange(index) {
    //   console.log("checkbox", index);
    //   this.previewData.questions[index].answer = this.checkList;
    // },
  },
};
</script>
<style lang="scss" scoped>
.text {
  // font-size: 12px;
  // transform: scale(0.5);
  font-size: 12px;
  display: inline-block;
  -webkit-transform: scale(0.75);
}
.routerPage {
  height: 80px;
}
.header--item {
  text-align: center;
  padding: 0 8.3125rem;
  .name {
    margin-top: 3.75rem;
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    line-height: 28px;
  }
  .surveyDescription {
    margin-top: 2rem;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #424242;
    line-height: 25px;
  }
}

.topic--body {
  padding: 0 8.3125rem;
}

.radio__content {
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
  }
  .option {
    margin-top: 20px;
    .radioItem {
      margin: 20px 0;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 22px;
    }
  }
}

.pic__content {
  margin-top: 3.75rem;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
  }
  .onepic {
    .option {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      .image-box {
        margin: 10px 0;
        width: 20%;
        height: auto;

        .avatar {
          margin: 10px 0 10px 25px;
          width: 100%;
          display: block;
        }
      }
    }
  }
  .twoPic {
    .option {
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
  .fourPic {
    .option {
      margin-top: 20px;
      width: 25%;
      .image-box {
        margin: 10px 0;
        width: 50%;
        height: auto;
        .avatar {
          // float: left;
          margin: 10px 0;
          width: 100%;
          height: 100%;
          display: block;
          margin-left: 55px;
        }
      }
    }
  }
}

.file__content {
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
  }
  .option {
    margin-top: 20px;
    .radioItem {
      margin: 20px 0;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 22px;
    }
  }
}

.upload-demo {
  .upload-button {
    position: relative;
    width: 18.75rem;
    height: 35px;
    padding: 0;
    color: #fff;
    background-color: #1660f1;
    margin: 30px 0 20px 0;
    .upload-text {
      position: absolute;
      right: 20px;
      img {
        width: 24px;
        height: 18px;
      }
    }
  }
  .upload-limit {
    display: inline;
    margin-left: 20px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 17px;
  }
}

.divider__content {
  margin-top: 3.75rem;
  .form-line {
    background-color: #d8d8d8;
    height: 2px;
    width: 100%;
    margin-bottom: 20px;
  }
}

.blank__content {
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 33px;
  }
}

.pull__content {
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
  }
  .i-select {
    margin: 40px 0 20px 20px;
    width: 350px;
  }
}

.remark__content {
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 22px;
  }
}

.para__content {
  font-size: 16px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  margin-top: 3.75rem;
}
::v-deep .el-checkbox__input .el-checkbox__inner {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 1.25rem;
  border-radius: 5px;
}
::v-deep .el-checkbox__input .el-checkbox__inner::after {
  position: absolute;
  margin: 0.125rem !important;
  border: 0.125rem solid #fff;
  box-sizing: content-box;
  content: "";
  border-left: 0;
  border-top: 0;
}
::v-deep .el-radio__input .el-radio__inner {
  width: 1.25rem;
  height: 1.25rem;
}
::v-deep .el-checkbox__label {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 22px;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #000000;
}
::v-deep .el-checkbox__input .el-checkbox__inner::after {
  // 对号
  position: absolute;
  margin: 1px;
  border: 2px solid #fff;
  // 不覆盖下面的 会 导致对号变形
  box-sizing: content-box;
  content: "";
  border-left: 0;
  border-top: 0;
}

::v-deep .pic__content .el-radio__label {
  display: none;
}
::v-deep .el-radio-group {
  .image-box {
    transform: translate(20px, -30px);
  }
}
</style>