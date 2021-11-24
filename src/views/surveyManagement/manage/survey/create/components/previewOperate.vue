<template>
  <div>
    <div
      style="
        margin-top: 1.25rem;
        margin-left: 1rem;
        width: 100%;
        height: 100%;
        padding-right: 1.5rem;
      "
      class="item__content"
      @mouseover="enter()"
      @mouseout="leave()"
    >
      <!-- <div class="operation-btn" v-show="mouseOver">
        <iButton @click="enterEditor()">编辑</iButton>
        <iButton @click="handleCopy()">复制</iButton>
        <iButton @click="handlDelete()">删除</iButton>
        <iButton @click="handleTop()" :disabled="number == 1">上移</iButton>
        <iButton @click="handleBottom()" :disabled="number == topicLength"
          >下移</iButton
        >
      </div> -->
      <div v-if="ruleForm.type == 3">
        <div class="titleF">
          <span v-if="ruleForm.requiredQuestion" style="color: red">* </span>
          {{ sort }}.{{ ruleForm.code }} {{ ruleForm.name }}
        </div>
        <iInput
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 8 }"
          placeholder="请输入您的回答。"
          onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
        ></iInput>
      </div>
      <div v-if="ruleForm.type == 8">
        <el-row class="form-row">
          <el-divider></el-divider>
        </el-row>
      </div>
      <div v-if="ruleForm.type == 5">
        <div class="title">
          <span v-if="ruleForm.requiredQuestion" style="color: red">* </span>
          {{ sort }}.{{ ruleForm.code }} {{ ruleForm.name }}
        </div>
        <div>
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
              上传附件<span class="upload-text"><img :src="uploadIcon" /></span>
            </iButton>
            <p class="upload-limit">文件大小最大限制15MB</p>
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
                @click="handleDeleteAccessory(item.attachmentId)"
                class="el-icon-close"
              ></i>
              <i class="el-icon-close-tip"></i>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="ruleForm.type == 4">
        <div class="title">
          <span v-if="ruleForm.requiredQuestion" style="color: red">* </span>
          {{ sort }}.{{ ruleForm.code }}{{ ruleForm.name }}
        </div>
        <div v-if="ruleForm.pictureRule == 1" class="onepic">
          <el-radio-group
            class="optionP"
            v-for="(item, index) in ruleForm.options"
            :key="index"
          >
            <el-radio :label="item.name"> </el-radio>
            <div class="image-box">
              <img :src="item.imageUrl" class="avatar" />
            </div>
          </el-radio-group>
        </div>
        <div v-if="ruleForm.pictureRule == 2" class="twoPic">
          <el-radio-group
            class="optionP"
            v-for="(item, index) in ruleForm.options"
            :key="index"
          >
            <el-radio :label="item.name"> </el-radio>
            <div class="image-box">
              <img :src="item.imageUrl" class="avatar" />
            </div>
          </el-radio-group>
        </div>
        <div v-if="ruleForm.pictureRule == 4" class="fourPic">
          <el-radio-group
            class="optionP"
            v-for="(item, index) in ruleForm.options"
            :key="index"
          >
            <el-radio :label="item.name"> </el-radio>
            <div class="image-box">
              <img :src="item.imageUrl" class="avatar" />
            </div>
          </el-radio-group>
        </div>
      </div>
      <div v-if="ruleForm.type == 6">
        <div class="title">
          <span v-if="ruleForm.requiredQuestion" style="color: red">* </span>
          {{ sort }}.{{ ruleForm.code }} {{ ruleForm.name }}
        </div>
        <iSelect v-model="value" placeholder="请选择" class="i-select">
          <el-option
            v-for="item in ruleForm.options"
            :key="item.number"
            :label="item.name"
            :value="item.number"
          >
          </el-option>
        </iSelect>
      </div>
      <div v-if="ruleForm.type == 1">
        <div class="title">
          <span v-if="ruleForm.requiredQuestion" style="color: red">* </span>
          {{ sort }}.{{ ruleForm.code }} {{ ruleForm.name }}
        </div>
        <el-radio-group
          class="option"
          v-for="(item, index) in ruleForm.options"
          :key="index"
        >
          <el-radio :label="item.name" class="radioItem">{{
            String.fromCharCode("A".charCodeAt(0) + index) + ". " + item.name
          }}</el-radio>
        </el-radio-group>
      </div>
      <div v-if="ruleForm.type == 7">
        <div class="title">
          <span v-if="ruleForm.requiredQuestion" style="color: red">* </span>
          {{ ruleForm.name }}
        </div>
      </div>
      <div v-if="ruleForm.type == 2">
        <!-- <div class="title">
          {{ sort }}.{{ ruleForm.number }} {{ ruleForm.name }}
        </div> -->
        <div class="title">
          <span v-if="ruleForm.requiredQuestion" style="color: red">* </span>
          {{ sort }}.{{ ruleForm.number }} {{ ruleForm.name }}
          <span class="text" style="margin-left: 10px; color: #999999">
            <span v-if="ruleForm.multipleRule.least"
              >最少选择{{ ruleForm.multipleRule.least }}项；</span
            ><span v-if="ruleForm.multipleRule.most"
              >最多选择{{ ruleForm.multipleRule.most }}项；</span
            >
          </span>
        </div>
        <el-checkbox-group
          class="option"
          v-model="checkList"
          v-for="(item, index) in ruleForm.options"
          :key="index"
          :max="0"
        >
          <el-checkbox :label="item.name + index" class="radioItem">{{
            String.fromCharCode("A".charCodeAt(0) + index) + ". " + item.name
          }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script>
import { iInput, iMessage, iSelect, iButton } from "rise";
import { uploadFile } from "@/api/survey/uploadFile.js";
import uploadIcon from "@/assets/images/upload-icon.svg";
export default {
  components: {
    iInput,
    iSelect,
    iButton,
  },
  props: ["isParap", "ruleForm", "sort", "name", "code"],
  data() {
    return {
      typeObj: {
        pull: 6,
        select: 2,
        file: 5,
        img: 4,
        blank: 3,
        radio: 1,
        remark: 7,
        divide: 8,
      },
      radio: "",
      uploadIcon,
      uploadLoading: false,
      attachments: [], // 完成编辑页，附件
      mouseOver: false,
      checkList: [],
      //   ruleForm: {
      //     topicType: this.type,
      //     id: this.id,
      //     name: "", // 问题名称
      //     code: this.number, // 问题编号
      //     number: "", // 问题序号
      //     type: 3, // 问题类型
      //     requiredQuestion: "", // 是否必答
      //   },
    };
  },
  mounted() {
    console.log("ruleForm", this.ruleForm);
  },
  methods: {
    handleDeleteAccessory(id) {
      this.attachments = this.attachments.filter(
        (item) => item.attachmentId !== id
      );
    },
    handleDownloadFile(url, name) {
      var a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
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
          iMessage.success(this.$t("上传成功"));
        })
        .catch((err) => {
          iMessage.error(this.$t("上传失败"));
        });
      this.uploadLoading = false;
    },
    // 展示一列按钮
    enter() {
      //   this.mouseOver = true;
      this.mouseOver = false;
    },
    // 鼠标离开
    leave() {
      this.mouseOver = false;
    },
    // 编辑
    enterEditor() {
      this.$emit("enterEditor");
    },

    // 复制
    handleCopy() {
      this.$emit("handleCopy", this.ruleForm);
      //   this.$emit("handleCopy");
    },
    // 删除
    handlDelete() {
      if (this.isParap) {
        this.$emit("handleDeleteP", this.ruleForm);
      } else {
        this.$emit("handleDelete", this.ruleForm);
      }
    },
    // 上移
    handleTop() {
      this.$emit("handleTop", this.ruleForm);
    },
    // 下移
    handleBottom() {
      this.$emit("handleBottom", this.ruleForm);
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-limit {
  display: inline;
  margin-left: 20px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  line-height: 17px;
}
.text {
  font-size: 12px;
  display: inline-block;
  -webkit-transform: scale(0.75);
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
.form-row {
  display: flex;
  /* 横线 */
  .form-line {
    background-color: #d8d8d8;
    height: 2px;
    width: 100%;
    margin-bottom: 20px;
  }
}
.item__content {
  display: flex;
  flex-direction: column;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
  }
  .titleF {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 33px;
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
  .operation-btn {
    // position: absolute;
    // right: 2.5rem;
    float: right;
    text-align: right;
  }
  .onepic {
    display: flex;
    flex-direction: column;
    width: 50%;
    .optionP {
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
    .optionP {
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
    .optionP {
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
  .i-select {
    margin: 40px 0 20px 20px;
    width: 350px;
  }
}
</style>
