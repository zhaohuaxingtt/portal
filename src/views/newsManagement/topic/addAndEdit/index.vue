<template>
  <iPage style="flex: 1">
    <div class="page--top">
      <div>
        {{ ruleForm.id != "" ? category[ruleForm.category] : language('NEWS_XINJIANXINWEN', '新建新闻') }}
      </div>
      <div>
        <iButton v-if="showButton" @click="handleSave" :disabled="saveFlag">{{
          language('NEWS_BAOCUN', '保存')
        }}</iButton>
        <iButton v-if="showButton" @click="handleReset" :disabled="saveFlag">{{
         language('LK_ZHONGZHI', '重置')
        }}</iButton>
        <iButton @click="handleBack" :disabled="saveFlag">{{
          language('NEWS_FANHUI', '返回')
        }}</iButton>
        <iButton
          v-if="
            !showButton &&
            ruleForm.status === 0 &&
            userNewsClassify.length > 0 &&
            newsClassifyCode.includes(ruleForm.category)
          "
          @click="handleEdit"
          >{{ language('NEWS_BIANJI', '编辑')}}</iButton
        >
        <iButton @click="handlePreview" :disabled="saveFlag">{{
          language('NEWS_YULAN', '预览') 
        }}</iButton>
      </div>
    </div>
    <component
      ref="formComponent"
      v-if="formComponent"
      v-model="ruleForm"
      :is="formComponent"
      :userNewsClassify="userNewsClassify"
      :newsClassifyCode="newsClassifyCode"
      :operationType="type"
      v-loading="resetLoading"
    ></component>
  </iPage>
</template>

<script>
import { iCard, iPage, iButton } from "rise";
import topicNewsAddOrEdit from "./components/topicNewsAddOrEdit.vue";
import {
  findTopicDetailById,
  findTopicNewsPage,
  updateTopic,
  saveTopic,
  findAdminPermission,
} from "@/api/news/news";
import { newsClassify, newsTypes } from "./components/data";
import dayjs from "dayjs";
export default {
  components: {
    iPage,
    iButton,
    topicNewsAddOrEdit,
  },
  data() {
    return {
      ruleForm: {
        id: "",
        category: "",
        name: "",
        source: "",
        publishDate: dayjs().format("YYYY-MM-DD"),
        isTop: 0,
        status: 1,
        summary: "",
        tags: [],
        picUrl: "",
        newsIds: [],
      },
      type: "",
      id: "",
      newsClassify,
      userNewsClassify: [],
      newsClassifyCode: [],
      jsonStr: "",
      resetLoading: false,
      saveFlag: false,
    };
  },
  computed: {
    formComponent() {
      return "topicNewsAddOrEdit";
    },
    showButton() {
      return this.type != "" && this.type != undefined;
    },
    category() {
      let obj = this.newsClassify?.reduce((obj, item) => {
        return { ...obj, [item.value]: item.label };
      }, {});
      return obj;
    },
  },
  create() {},
  mounted() {
    this.type = this.$route.params.type;
    this.id = this.$route.params.id;
    if (this.$route.params.id !== "" && this.$route.params.id !== undefined) {
      this.handleResetDate();
    } else if (
      this.$route.params.type === undefined &&
      this.$route.params.id === undefined
    ) {
      this.$router.push({
        name: "newsTopic",
      });
    }
    findAdminPermission().then((res) => {
      this.userNewsClassify = res?.filter((item) => {
        return item.code < 4;
      });
      this.newsClassifyCode = this.userNewsClassify?.map((item) => item.code);
      if (this.ruleForm.id === "") {
        this.ruleForm.category = res[0].code;
        this.jsonStr = JSON.stringify(this.ruleForm);
      }
    });
  },
  methods: {
    handleResetDate() {
      this.query({ id: this.id });
    },
    handleSave() {
      const formData = {
        ...this.ruleForm,
      };
      let dateTime = this.ruleForm.publishDate;
      if (
        dayjs(dayjs(dateTime).format("YYYY-MM-DD")).valueOf() >
        dayjs(dayjs().format("YYYY-MM-DD")).valueOf()
      ) {
        formData.publishDate =
        dayjs(dateTime).format("YYYY-MM-DD") + " 00:00:00";
        formData.status = 0;
      } else {
        formData.publishDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
        formData.status = 1;
      }
      this.$refs["formComponent"].$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (formData.picUrl === null || formData.picUrl === "") {
            this.$message.error(this.language('NEWS_XWFMWSC',"新闻封面未上传！"));
            return;
          } else if (formData.newsIds?.length === 0) {
            this.$message.error("专题必须至少添加一个新闻！");
            return;
          }
          if (
            dayjs(dayjs(dateTime).format("YYYY-MM-DD")).valueOf() >
            dayjs(dayjs().format("YYYY-MM-DD")).valueOf()
          ) {
            this.save(formData);
          } else {
            this.$confirm("是否确定发布此专题新闻 ？", "提示", {
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning",
            }).then(() => {
              this.save(formData);
            });
          }
        }
      });
    },
    save(formData) {
      this.saveFlag = true;
      if (this.id !== "" && this.id !== undefined) {
        formData.id = this.id;
        //更新
        updateTopic(formData).then((res) => {
          this.$message.success(this.language('NEWS_GENGXINCHENGGONG',"更新成功"));
          this.saveFlag = false;
          // this.$router.push({
          //   name: "newsTopic",
          // });
          window.close()
        });
      } else {
        //新增
        saveTopic(formData).then((res) => {
          this.$message.success(this.language('NEWS_XINZENGCHENGGONG',"新增成功"));
          this.saveFlag = false;
          this.$router.push({
            name: "newsTopic",
          });
        });
      }
    },
    handlePreview() {
      let { href } = this.$router.resolve({
        name: "newsProjectDetails",
      });
      if (this.showButton) {
        const formData = {
          ...this.ruleForm,
        };
        let dateTime = this.ruleForm.publishDate;
        if (
          dayjs(dayjs(dateTime).format("YYYY-MM-DD")).valueOf() >
          dayjs(dayjs().format("YYYY-MM-DD")).valueOf()
        ) {
          formData.publishDate =
            dayjs(dateTime).format("YYYY-MM-DD") + " 00:00:00";
        } else {
          formData.publishDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
        }
        this.$refs["formComponent"].$refs["ruleForm"].validate((valid) => {
          if (valid) {
            if (formData.picUrl === null || formData.picUrl === "") {
              this.$message.error(this.language('NEWS_XWFMWSC',"新闻封面未上传！"));
              return;
            } else if (formData.newsIds?.length === 0) {
              this.$message.error("专题必须至少添加一个新闻！");
              return;
            }
            this.saveFlag = true;
            if (this.id !== "" && this.id !== undefined) {
              //更新
              updateTopic(formData).then((res) => {
                this.saveFlag = false;
                window.open(href + `?id=${res.id}`, "_blank");
              });
            } else {
              //草稿
              formData.status = 2;
              //新增
              saveTopic(formData).then((res) => {
                this.saveFlag = false;
                this.id = res.id;
                window.open(href + `?id=${res.id}`, "_blank");
              });
            }
          }
        });
      } else {
        window.open(href + `?id=${this.id}`, "_blank");
      }
    },
    handleEdit() {
      this.type = "edit";
    },
    handleReset() {
      this.resetLoading = true;
      if (this.id) {
        this.handleResetDate();
      } else {
        this.ruleForm = {
          id: "",
          category: "",
          name: "",
          source: "",
          publishDate: dayjs().format("YYYY-MM-DD"),
          isTop: 0,
          status: 1,
          summary: "",
          tags: [],
          picUrl: "",
          newsIds: [],
        };
        this.$refs["formComponent"].picUrl = [];
        this.$refs["formComponent"].newsCheckList = [];
        this.ruleForm.category = this.userNewsClassify[0].code;
        this.resetLoading = false;
      }
    },
    handleBack() {
      let data = { ...this.ruleForm };
      if (this.id !== "" && this.id !== undefined) {
        data.newsIds = [];
      }
      if (this.jsonStr == JSON.stringify(data)) {
        // this.$router.push({
        //   name: "newsTopic",
        // });
        if(this.type!=='add'){
          window.close()
        }else{
          this.$router.push({
            name: "newsTopic",
          });
        }
      } else {
        this.$confirm(
           this.language('NEWS_QDFHHBXWXGNRBHBC',"确定返回后，本新闻修改内容不会保存。"),
          this.language('NEWS_SFQDFH',"是否确定返回？"),
          {
            confirmButtonText: this.language('TERMS_SHI', '是'),
            cancelButtonText: this.language('TERMS_FOU', '否'),
            type: "warning",
          }
        ).then(() => {
          if(this.type!=='add'){
          window.close()
        }else{
          this.$router.push({
            name: "newsTopic",
          });
        }
        });
      }
    },
    query(e) {
      findTopicDetailById(e).then((res) => {
        this.ruleForm = {
          ...res,
        };
        this.jsonStr = JSON.stringify(this.ruleForm);
        if (this.type === "edit") {
          this.resetLoading = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.page--top {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  font-weight: bold;
  height: 40px;
  margin-bottom: 20px;
}
</style>
