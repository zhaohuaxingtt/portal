<template>
  <div class="main">
    <el-form :model="form" :rules="rules" ref="form">
      <div class="tip">
        <span>{{ internationalTitles.tip }}</span>
      </div>
      <el-form-item prop="mail">
        <div class="input">
          <iInput
            :placeholder="internationalTitles.mailPlaceholder"
            class="mailInput"
            v-model="form.mail"
          ></iInput>
          <span>@CSVW.com</span>
        </div>
      </el-form-item>
      <div class="buttons">
        <iButton @click="trueBtnClick">{{
          internationalTitles.trueBtn
        }}</iButton>
        <iButton @click="exitBtnClick">{{
          internationalTitles.exitBtn
        }}</iButton>
      </div>
    </el-form>
  </div>
</template>

<script>
import { iInput, iButton, iDialog } from "rise";
export default {
  methods: {
    trueBtnClick() {
      //确认
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("close", this.form.mail);
          this.form.mail = "";
        } else {
          return false;
        }
      });
    },
    exitBtnClick() {
      //退出
      this.form.mail = "";
      this.$emit("close");
    },
  },
  components: {
    iInput,
    iButton,
    // iDialog,
  },
  data() {
    return {
      form: {
        mail: "",
      },
      internationalTitles: {
        tip: "新密码接收邮箱",
        trueBtn: "确认",
        exitBtn: "退出",
        mailPlaceholder: "请输入邮箱",
      },
      rules: {
        mail: [
          {
            min: 1,
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 150px;
}

.tip {
  margin-bottom: 10px;
}

.input {
  display: flex;
  align-items: center;
  .mailInput {
    width: 60%;
  }
  span {
    margin-left: 20px;
  }
}

.buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>