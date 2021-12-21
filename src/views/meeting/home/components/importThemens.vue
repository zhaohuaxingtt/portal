<template>
  <!--转派-->
  <iDialog
    :title="title"
    :visible.sync="open"
    width="39rem"
    :close-on-click-modal="false"
    @close="handleCancel"
  >
    <div class="down-demo">
      <slot></slot>
    </div>
    <div class="form-upload">
      <div class="left-box">
        <img :src="uploadGreyIcon" alt="" srcset="" />
      </div>
      <div class="right-box">
        <div class="right-upload">
          <el-upload
            action="1"
            :accept="accept"
            :before-upload="beforeAvatarUpload"
            :show-file-list="true"
            :http-request="httpUpload"
          >
            <div>
              <iButton
                type="button"
                class="upload-button"
                :uploadLoading="uploadLoading"
              >
                ${{$t('MT_QINGXUANZEWENJIAN')}}<span class="upload-text"
                  ><img :src="uploadIcon"
                /></span>
              </iButton>
              <div class="el-upload__tip">
                {{ descText }}
              </div>
            </div>
          </el-upload>
          <span class="warn-text">{{ warnText }}</span>
        </div>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from "rise";
import uploadIcon from "@/assets/images/upload-icon.svg";
import uploadGreyIcon from "@/assets/images/upload-grey-icon.svg";
import clearDesc from "@/assets/images/clear-desc.svg";
import { importThemen } from "@/api/meeting/details";
export default {
  components: {
    iDialog,
    iButton,
  },
  props: {
    open: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    accept: {
      type: String,
      default: () => {
        return "application/pdf";
      },
    },
    maxSize: {
      type: Number,
      default: () => {
        return 10;
      },
    },
    id: {
      type: Number || String,
      default: () => {
        return '';
      },
    },
    fileNum: {
      type: Number,
      default: () => {
        return 1;
      },
    },
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    warnText: {
      type: String,
      default: () => {
        return "";
      },
    },
    descText: {
      type: String,
      default: () => {
        return "文件大小最大限制10MB";
      },
    },
  },
  data() {
    return {
      uploadIcon,
      uploadGreyIcon,
      clearDesc,
      uploadLoading: false,
      urlList: [],
      nameList: [],
      list: [],
    };
  },
  methods: {
    // 上传过程
    httpUpload(content) {
      this.uploadLoading = true;
      let formData = new FormData();
      formData.append("file", content.file);
      let param = {
        file: formData,
        meetingId: this.id
      }
      importThemen(param)
        .then((data) => {
          if (data) {
            console.log("eeee",this.$t("MT_DAORUCHENGGONG"))
            iMessage.success("导入成功");
            this.$emit("handleOK");
          } else {
            iMessage.error("导入失败");
            this.$emit("handleCancel");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
      this.uploadLoading = false;
    },
    // 上传前校验
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < this.maxSize;
      if (!isLt10M) {
        this.$message.error(`上传文件大小不能超过 ${this.maxSize}MB!`);
      }
      return isLt10M;
    },
    deleteItem(e) {
      this.urlList.splice(e, 1);
      this.nameList.splice(e, 1);
      this.list.splice(e, 1);
    },
    handleCancel() {
      this.$emit('handleCancel')
    }
  },
};
</script>

<style scoped lang="scss">
.el-upload__tip {
  width: 300px;
  text-align: center;
}
.button-list {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  .cancel {
    margin-right: 20px;
  }
}
.form-upload {
  padding: 10px 0 30px;
  display: flex;
  flex-shrink: 0;
  flex-grow: 1;
  .left-box {
    width: 122px;
  }
  .right-box {
    width: 442px;

    .right-upload {
      display: flex;
      justify-content: start;

      .warn-text {
        font-size: 10px;
        color: #e30d0d;
        letter-spacing: 0;
        margin-left: 20px;
        line-height: 35px;
      }

      .upload-button {
        position: relative;
        width: 300px;
        height: 35px;
        line-height: 35px;
        padding: 0;
        color: #fff;
        background-color: #1660f1;
        .upload-text {
          position: absolute;
          right: 15px;
          top: 3px;
          img {
            width: 23.85px;
            height: 17.69px;
          }
        }
      }

      ::v-deep .el-upload-list__item {
        .el-upload-list__item-name {
          width: 300px;
          height: 32px;
          border-radius: 16px;
          background: #f7f7f7;
          line-height: 32px;
          overflow: hidden;
          margin-right: 0;
          color: #909399;
          text-indent: 12px;
          font-size: 14px;
        }
        .el-icon-close {
          display: block;
          margin-top: 5px;
          transform: translateX(-5px) scale(1.3);
          color: #909399;
        }
        .el-icon-document {
          display: none;
        }
        &:hover {
          width: 300px;
          height: 32px;
          border-radius: 16px;
          background: #f7f7f7;
          line-height: 32px;
          overflow: hidden;
          margin-right: 0;
        }
      }
    }
  }
}
.pic-list {
  .pic-item {
    border-radius: 16px;
    font-size: 14px;
    letter-spacing: 0;
    color: #909399;
    background: #f7f7f7;
    width: 300px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 20px;
    margin-bottom: 5px;

    span {
      line-height: 32px;
    }

    img {
      width: 10px;
      height: 10px;
      margin-top: 10px;
    }
  }
}
.down-demo {
  position: absolute;
  top: 32px;
  left: 150px;
}
</style>
