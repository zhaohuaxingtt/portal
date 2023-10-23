<template>
  <div class="continer">
    <div class="mobile">
      <h1 class="header">
        {{ name || $t('QN_SAICDUISHANGHAIDIQUNANXINGYONGHUCHEXINGDEXIHAODUSHICHANGDIAOCHADEWENJUAN') }}
      </h1>
      <main class="body">
        <header class="title">
          {{ closing == '' ? $t('QN_GANXIENINCANYUCIQIWENJUANDIAOCHA') : closing }}
        </header>
        <footer class="submit-footer">
          <!-- <iButton class="submit">关闭</iButton> -->
        </footer>
      </main>
    </div>
  </div>
</template>
<script>
import { iMessage } from 'rise'
import { uploadFile } from '@/api/survey/uploadFile.js'
import uploadIcon from '@/assets/images/upload-icon.svg'
import { queryForAnswer } from '@/api/survey/survey'
export default {
  components: {
    // iButton,
  },
  data() {
    return {
      checkList: [],
      value: '',
      radio: '',
      uploadLoading: false,
      attachments: [], // 完成编辑页，附件
      uploadIcon,
      ruleForm: {},
      id: '',
      name: '',
      finishData: {
        name: '',
        closing: ''
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    this.name = this.$route.params.name
    this.closing = this.$route.params.closing
    console.log(42, this.$route)
  },
  mounted() {
    // this.query();
    document.querySelectorAll('.flex-align-center').forEach((item) => {
      let dom = item.querySelector('span').cloneNode(true)
      item.querySelector('span').remove()
      item.appendChild(dom)
    })
  },
  methods: {
    async httpUpload(content) {
      this.uploadLoading = true
      let formData = new FormData()
      formData.append('file', content.file)
      await uploadFile(formData)
        .then((res) => {
          this.attachments.push({
            attachmentId: res.id,
            attachmentName: res.name,
            attachmentUrl: res.path
          })
          iMessage.success(this.$t('QN_SHANGCHUANCHENGGONG'))
        })
        .catch(() => {
          iMessage.error(this.$t('QN_SHANGCHUANSHIBAI'))
        })
      this.uploadLoading = false
    },
    handleDeleteAccessory(val) {
      this.attachments = this.attachments.filter((item) => {
        return !item.attachmentId.includes(val)
      })
    },
    query() {
      queryForAnswer({ id: this.id }).then((res) => {
        console.log(res)
        this.ruleForm = res
        this.formData = res
        this.ruleForm.questions = this.ruleForm.questions.map((item) => {
          return {
            ...item,
            uploadLoading: false,
            sonQuestions: item?.sonQuestions?.map((it) => {
              return {
                ...it,
                uploadLoading: false
              }
            })
          }
        })
        console.log(1022, this.ruleForm)
      })
    }
  }
}
</script>
<style scoped lang="scss">
.content .app-content ::v-deep {
  overflow: auto;
}
.pull-question-label {
  margin-bottom: 2rem;
}
.form-item-name {
  /* font-size: 1rem; */
  text-align: justify;
  font-weight: bold;
  color: #4d4f5c;
  .el-form-item ::v-deep {
    .el-form-item__label {
      /* font-size: 1rem; */
      text-align: justify;
      line-height: inherit;
      font-weight: bold;
      .flex-align-center span:last-child {
        text-align: justify;
        font-weight: bold;
        font-size: 1rem;
      }
    }
  }
}
.pull-question {
  /* margin-top: 20px; */
  /* font-size: 5rem; */
  font-weight: 400;
  color: #424242;
  margin-bottom: 4rem;
  line-height: 1.2;
  .i-select {
    width: 100%;
  }
}
.onepic {
  .option {
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
.textarea {
  margin-bottom: 3rem;
  /* margin-top: 39px; */
  ::v-deep .el-textarea__inner {
    /* box-shadow: 0 0 1rem rgb(0 38 98 / 15%); */
  }
}
.form-item-content {
  /* margin-top: 4rem; */
  margin-bottom: 1rem;
}
.from-item-group ::v-deep {
  margin-left: 0.5rem;
  width: 100%;
  .el-checkbox {
    width: 100%;
    margin-bottom: 0.5rem;
    .el-checkbox__inner {
      width: 1rem;
      height: 1rem;
    }
    .el-checkbox__input .el-checkbox__inner::after {
      width: 2rem;
      margin-left: 0.5rem;
      /* padding-bottom:1rem; */
      height: 5rem;
      /* background-color: #d10000; */
    }
  }
  .el-checkbox__label {
    /* padding-top: 2rem; */
    /* font-size: 1rem; */
    margin-left: 0.5rem;
  }
  .el-radio {
    width: 100%;
    margin-bottom: 0.5rem;
    .el-radio__inner {
      width: 1rem;
      height: 1rem;
    }
    .el-radio__input .el-radio__inner::after {
      /* width: 2rem;
      margin-left: 2rem;
      height: 5rem; */
    }
  }
  .el-radio__label {
    padding-top: 1rem;
    /* font-size: 1rem; */
    margin-left: 1rem;
  }
}
.from-item-img-label {
  margin-bottom: 0.5rem;
}
.from-item-img {
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  .el-radio ::v-deep {
    width: 100%;
    .el-radio__input {
      vertical-align: top;
      /* margin-top: rem; */
    }
    .el-radio__inner {
      /* width: 1rem;
      height: 1rem; */
    }
    .el-radio__label {
      /* padding-top: 3rem; */
      /* font-size: 5rem; */
      /* margin-left: 7rem; */
    }
  }
  .from-item-img-size {
    width: auto;
    height: 5rem;
  }
}
.el-form-item__label {
  ::v-deep .flex-align-center span:last-child {
    text-align: justify;
  }
}

.form-item-content-checkbox {
  /* margin-top: 3rem;
  margin-bottom: 4rem; */
  .el-checkbox {
    width: 100%;
    /* margin-bottom: 3rem; */
  }
}
/* 横线 */
.form-item-line {
  width: auto;
  height: 0.2rem;
  background-color: #ccc;
}
.form-item-text {
  padding-top: 1.5rem;
  color: #ccc;
  text-align: justify;
  /* font-size: 1rem; */
  margin-bottom: 2rem;
}
::v-deep .el-checkbox__label {
  margin-left: 0.5rem;
}
::v-deep .upload-demo {
  /* margin-bottom: 2rem; */
  display: flex;
  flex-direction: column;
  .upload-limit {
    width: 100%;
    font-size: 0.5rem;
    font-weight: 400;
    color: #000000;
  }
  .upload-button {
    width: 100%;
    position: relative;
    height: 1.5rem;
    padding: 0;
    color: #fff;
    background-color: #67C23A;
    margin: 1rem 0;
    span {
      /* font-size: 1.2rem; */
    }
    .upload-text {
      position: absolute;
      right: 20px;
      img {
        width: 80%;
        height: 80%;
      }
    }
  }
}
.el-upload-list {
  margin-bottom: 0.5rem;
}
.el-upload-list__item {
  font-size: 0.7rem;
}
::v-deep .flex-align-center {
  align-items: initial;
  span:last-child {
    text-align: left;
    font-weight: 500;
    color: #000;
    /* font-size: 16px; */
    line-height: 1.3;
  }
  .start {
    line-height: 1.4;
  }
}
.routerpage {
  padding: 0;
}

.continer {
  /* padding: 60px 0; */
  /* width: 1440px; */
  /* margin: 0 auto; */
  /* background-color: #fff; */
  /* display: flex;
  justify-content: center; */
  .mobile {
    /* width: 375px; */
    .header {
      /* margin: 0 auto 19px; */
      /* width: 104%; */
      /* height: 56px; */
      font-size: 1rem;
      font-weight: 600;
      color: #000000;
      /* line-height: 28px; */
      background-color: #fff;
      text-align: center;
      padding: 1rem 1.8rem;
    }
    .body {
      /* width: 375px; */
      /* height: 3741px; */
      background: #f8f9fa;
      padding: 0.5rem 0.8rem;
      /* padding-top: 18px; */
      .title {
        /* width: 315px; */
        /* height: 75px; */
        font-size: 1rem;
        font-weight: 400;
        color: #424242;
        text-align: center;
        padding: 2rem 1.5rem;
        text-align: center;
      }
      .content {
        /* width: 355px; */
        /* 临时设置高度 */
        /* height: 40rem;
        overflow: auto; */
        background: #ffffff;
        box-shadow: 0px 0px 0.1875rem 0px rgba(0, 0, 0, 0.1);
        border-color: transparent;
        border-radius: 8px;
        margin: 0 auto;
        padding: 0.5rem 1.5rem 0 1rem;
        .item {
          width: 100%;
          .upload-demo {
            width: 100%;
          }
          .question {
            /* font-size: 16px; */
            font-weight: 500;
            color: #d10000;
            line-height: 22px;
          }
          .el-form-item ::v-deep {
            .el-form-item__label {
              /* font-size: 1rem; */
              text-align: justify;
              line-height: inherit;
              font-weight: bold;
              .flex-align-center span:last-child {
                text-align: justify;
                font-weight: bold;
                font-size: 1rem;
              }
            }

            .el-form-item__content {
              /* margin-bottom: 1rem; */
              .el-select {
                /* height: 2rem; */
                /* box-shadow: 0 0 1rem rgb(0 38 98 / 15%); */
                margin-bottom: 1rem;
                .el-input__inner {
                  /* height: 2rem; */
                }
              }
              .is-focus {
                .el-input__suffix {
                  /* right: 4rem;
                  top: 3rem; */
                }
              }
              .el-input__suffix {
                /* height: 60%;
                right: 2rem; */
              }
              /* .el-input--suffix .is-focus{

              } */
            }
          }
        }
        .item1 {
          margin-bottom: 1rem;
        }

        .item + .item {
          margin-top: 1rem;
        }
      }
    }
    .submit-footer {
      /* width: 301px; */
      margin: 5rem auto 0;
      /* padding-bottom: 1.5rem; */
      .submit {
        width: 90%;
        /* font-size: 1rem; */
        margin: 0 auto;
        display: block;
        padding: 0.5rem 0;
        /* margin-top: 0rem; */
      }
    }
  }
}
</style>
<style lang="scss">
html {
  font-size: 18px !important;
}
.el-select-dropdown__list {
  /* height: 20rem; */
}
.el-select-dropdown__item {
  /* height: 1rem;
  font-size: 0.5rem;
  margin: 1rem 0; */
}
</style>
