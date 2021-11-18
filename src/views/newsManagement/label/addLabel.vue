<template>
  <iDialog
    :title="language('NEWS_XINJIANBIAOQIAN', '新建标签')"
    :visible.sync="open"
    width="35.25rem"
    :close-on-click-modal="false"
    destroy-on-close
    @close="clearDiolog"
    class="form-dialog"
  >
    <iEditForm>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
        class="form-box"
      >
        <el-row class="form-row">
          <iFormItem :label="language('NEWS_BIAOQIANNEIRONG', '标签内容')" prop="content">
            <iLabel :label="language('NEWS_BIAOQIANNEIRONG', '标签内容')" slot="label" required></iLabel>
            <iInput :placeholder="language('LK_QINGSHURU', '请输入')" v-model="ruleForm.content"> </iInput>
          </iFormItem>

          <iFormItem :label="language('NEWS_SUOSHUFENLEI', '所属分类')" prop="category">
            <iLabel :label="language('NEWS_SUOSHUFENLEI', '所属分类')" slot="label" required></iLabel>
            <iSelect multiple v-model="ruleForm.category">
              <el-option
                v-for="item in category"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-row>
        <div class="button-list">
          <el-form-item>
            <iButton @click="handleOK" plain>{{ language('NEWS_QUEDING', '确定') }}</iButton>
            <iButton @click="handleExit" plain>{{ language('NEWS_TUICHU', '退出') }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import { iButton, iDialog, iFormItem, iSelect, iLabel, iInput } from "rise";
import { category } from "./data";
// import {saveTag} from '@/api/news/news'

export default {
  components: {
    iDialog,
    iFormItem,
    iButton,
    iSelect,
    iLabel,
    iInput,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Array,
      default: (()=>{
        []
      }),
    },
  },
  data() {
    return {
      ruleForm: {
        content: "",
        category: [],
      },
      // category,
      rules: {
        content: [
          { required: true, message: this.language('LK_QINGSHURU', '请输入'), trigger: ["input", "blur"] },
        ],
        category: [{ required: true, message: this.language('LK_QINGXUANZE', '请选择'), trigger: "change" }],
      },
    };
  },
  watch: {
    open(val) {
     
      if (val) {
        this.$nextTick(()=>{
          this.$refs["ruleForm"].clearValidate(["category"]);
        })
          this.ruleForm = {};
      }
    },
  },
  methods: {
    clearDiolog() {
      this.$emit("clearDiolog", false);
    },
    handleOK() {
      this.ruleForm.content = this.ruleForm.content.trim()
      const formData = { ...this.ruleForm };
      this.$emit("hanleAddLabel", formData);
      // this.$refs["ruleForm"].validate((valid) => {
      //   if (valid) {
      //     this.$confirm("是否确定新建 标签内容 ？", this.language('NEWS_TISHI',"提示"), {
      //       confirmButtonText: "是",
      //       cancelButtonText: "否",
      //       type: "warning",
      //     })
      //       .then(() => {
      //         console.log(this.ruleForm)
      //         const formData = {...this.ruleForm,category:[this.ruleForm.category]}
      //         saveTag(formData)
      //           .then((data) => {
      //             this.$message.success("保存成功");
      //           })
      //           .catch(() => {
      //             this.$message.error("保存失败");
      //           });
      //       })
      //       .catch(() => {
      //         // this.handleCancel();
      //       });
      //   }
      // });
    },
    handleExit() {
      this.open = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-dialog ::v-deep {
  .el-dialog__header {
    margin-bottom: 4rem;
  }
}
::v-deep .form-row {
  .el-form-item {
    display: flex;

    .el-form-item__label {
      line-height: 35px;
      width: 134px;
      text-align: left;
      font-size: 16px;
      color: #4b4b4c;
      letter-spacing: 0;
      margin-bottom: 0;
    }
    .el-select{
      height: auto;
    }

    .el-form-item__content {
      flex: 1;
    }
  }
}

.button-list {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 18px 0 40px;
  margin-top: 3rem;

  .el-form-item {
    margin-bottom: 0;
    .el-button {
      height: 35px;
      width: 100px;
    }
    .cancel {
      margin-right: 20px;
    }
  }
}
</style>
