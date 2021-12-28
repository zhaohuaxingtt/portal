<template>
  <iDialog
    title="标记例外"
    :visible.sync="openDialog"
    append-to-body="true"
    width="32.1875rem"
    top="25vh"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <div class="upload">
      <div class="upload-text">
        请确认是否标记该供应商为例外，如标记该供应商将无需签署条款！
      </div>
      <div class="exception">
        <span class="exc">例外：</span>
        <el-switch
          class="el-switch"
          v-model="form.isExclude"
          :active-text="'是'"
          :inactive-text="'否'"
          :active-value="true"
          :inactive-value="false"
          @change="handleChange($event)"
        >
        </el-switch>
      </div>
      <div>
        <span class="attachment">附件：</span>
        <el-upload
          class="upload-demo"
          style="display: inline-block"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          multiple
          :http-request="httpUpload"
          :disabled="form.isExclude == false"
        >
          <span
            class="el-icon-upload2"
            style="font-size: 16px; color: #1663f6"
          ></span>
        </el-upload>
      </div>
    </div>
    <div v-show="form.isExclude == true">
      <ul
        v-for="item in form.attachments"
        :key="item.attachmentId"
        class="el-upload-list el-upload-list--text"
      >
        <li tabindex="0" class="el-upload-list__item is-success i-paperclip">
          <a
            class="el-upload-list__item-name"
            @click="handleDownloadFile(item.attachmentId, item.attachmentName)"
          >
            <i
              class="el-icon-paperclip"
              style="color: #2369f1"
              :title="item.attachmentName"
            >
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
    <div class="button-list">
      <iButton @click="handleSubmit">{{ "保存" }}</iButton>
      <iButton @click="clearDiolog" class="cancel">{{ "退出" }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from "rise";
import uploadIcon from "@/assets/images/upload-icon.svg";
// import { uploadFile, downloadFile } from "@/api/mock/mock";
import { getUnStandard } from "@/api/terms/terms";
import { uploadFile } from "@/api/terms/uploadFile.js";
import { markExclude } from "@/api/terms/terms";
import { download } from "@/utils/downloadUtil";
export default {
  components: {
    iDialog,
    iButton,
  },
  props: {
    openDialog: { type: Boolean, default: false },
    id: { type: Number, default: -1 },
    supplierId: { type: Number, default: -1 },
    userId: { type: String, default: "" },
    signStatus: { type: String, default: "" },
    // attachmentId: { type: String, default: "" },
    // attachmentName: { type: String, default: "" },
  },
  data() {
    return {
      uploadIcon,
      uploadLoading: false,
      form: {
        isExclude: true,
        attachments: [],
      },
    };
  },
  mounted() {
    if (this.signStatus == "04") {
      let param = {
        termsId: this.id,
        supplierId: this.supplierId,
        isExclude: true,
      };
      getUnStandard(param).then((res) => {
        this.form.attachments = res.attachments;
      });
    }
  },
  methods: {
    handleSubmit() {
      if (this.form.isExclude == true && this.form.attachments.length == 0) {
        iMessage.error("请上传附件");
      } else {
        if (this.form.isExclude == false) {
          const submitFile = {
            ...this.form,
            termsId: this.id,
            supplierId: this.supplierId,
            userId: this.userId,
          };
          this.$emit("closeDialog", submitFile);
          // this.$confirm("请确认是否取消例外?", "提示", {
          //   confirmButtonText: "确认",
          //   cancelButtonText: "返回",
          //   type: "warning",
          // }).then(() => {
          //   const submitFile = {
          //     ...this.form,
          //     termsId: this.id,
          //     supplierId: this.supplierId,
          //     userId: this.userId,
          //   };
          //   markExclude(submitFile)
          //     .then((res) => {
          //       if (res.code == 200) {
          //         iMessage.success(this.$t("操作成功！"));
          //         this.$emit("closeDialog", false);
          //         this.$emit("getTableList", { termsId: this.id });
          //       }
          //     })
          //     .catch((err) => {});
          // });
        } else {
          const submitFile = {
            ...this.form,
            termsId: this.id,
            supplierId: this.supplierId,
            userId: this.userId,
          };
          markExclude(submitFile)
            .then((res) => {
              if (res.code == 200) {
                iMessage.success(this.$t("操作成功！"));
                this.$emit("closeDialog", false);
                this.$emit("getTableList", { termsId: this.id });
              }
            })
            .catch(() => {});
        }
      }
    },
    handleChange() {
      // if (e == false) {
      //   this.$confirm("请确认是否取消例外?", "提示", {
      //     confirmButtonText: "确认",
      //     cancelButtonText: "返回",
      //     type: "warning",
      //   }).then(() => {});
      // }
    },
    async httpUpload(content) {
      this.uploadLoading = true;
      this.submitLoading = true;
      let formData = new FormData();
      formData.append("file", content.file);
      await uploadFile(formData)
        .then((res) => {
          let createDate = new Date(+new Date() + 8 * 3600 * 1000)
            .toJSON()
            .substr(0, 19)
            .replace("T", " ");
          this.form.attachments.push({
            fileType: "02",
            attachmentId: res.id,
            attachmentName: res.name,
            attachmentUrl: res.path,
            attachmentSize: (content.file.size / 1024).toFixed(0),
            uploadDate: createDate,
          });
          iMessage.success("上传成功");
        })
        .catch(() => {
          iMessage.error("上传失败");
        });
      this.uploadLoading = false;
      this.submitLoading = false;
    },
    handleDeleteAccessory(id) {
      this.form.attachments = this.form.attachments.filter(
        (item) => item.attachmentId !== id
      );
    },
    // beforeAvatarUpload(file) {
    //   const isSize = file.size / 1024 / 1024 < 50;
    //   if (!isSize) {
    //     this.$message.error(this.$t("TERMS_WENJIANDAXIAOZUIDAXIANZHI"));
    //   }
    //   return isSize;
    // },
    handleDownloadFile(id, name) {
      download({
        fileIds: id,
        filename: name,
        callback: (e) => {
          if (!e) {
            iMessage.error("下载失败");
          }
        },
      });
    },
    handleDelete() {},
    clearDiolog() {
      this.$emit("closeDialog", false);
    },
  },
};
</script>

<style scoped lang="scss">
.upload {
  .upload-text {
    font-size: 14px;
    font-family: Arial;
    font-weight: 400;
    color: #000000;
    opacity: 1;
  }
  .exception {
    margin: 30px 0;
    .exc {
      font-family: Arial;
      color: #000000;
      font-weight: Regular;
      font-size: 14px;
    }
  }
  .attachment {
    font-family: Arial;
    color: #000000;
    font-weight: Regular;
    font-size: 14px;
  }
}
.button-list {
  display: flex;
  height: 6rem;
  justify-content: flex-end;
  align-items: center;
}

::v-deep .el-switch {
  .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
    width: 2.5rem;
  }
  /*打开时文字位置设置*/
  .el-switch__label--right {
    z-index: 1;
    // right: 5px;
    // left: 0.3125rem;
  }
  /*关闭时文字位置设置*/
  .el-switch__label--left {
    z-index: 1;
    left: 1.5625rem;
  }
  /*显示文字*/
  .el-switch__label.is-active {
    display: block;
  }
  .el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 2.5rem !important;
    height: 1.25rem;
  }
}
</style>
