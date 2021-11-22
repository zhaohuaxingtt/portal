<template>
  <div class="container">
    <!-- <iButton @click="handleOpen">点击弹窗</iButton> -->
    <surveyData
      :open="open"
      @closeDialog="closeDialog"
      @openFileDetails="openFileDetails"
      @openSingleDetails="openSingleDetails"
      @openBlankDetails="openBlankDetails"
      v-if="open"
      ref="indexDialog"
      :surData="sData"
      :surveyId="surData.id"
    ></surveyData>
    <detailsDialog
      :openFileDetailsBol="openFileDetailsBol"
      @backIndexDialog="backIndexDialog"
      v-if="openFileDetailsBol"
      ref="fileDialog"
      :fileDetails="fileDetails"
      :surveyId="surData.id"
    ></detailsDialog>
    <blankDialog
      :openBlankDetailsBol="openBlankDetailsBol"
      @backIndexDialog="backIndexDialog"
      v-if="openBlankDetailsBol"
      ref="blankDialog"
      :blankDetails="blankDetails"
      :surveyId="surData.id"
    ></blankDialog>
    <singleChooseDialog
      :openSingleChooseDetailsBol="openSingleChooseDetailsBol"
      @backIndexDialog="backIndexDialog"
      v-if="openSingleChooseDetailsBol"
      ref="singleDialog"
      :chooseDetails="chooseDetails"
      :surveyId="surData.id"
    >
    </singleChooseDialog>
  </div>
</template>
<script>
// import { iButton } from "rise";
import surveyData from "./components/surveyData.vue";
import detailsDialog from "./components/detailsDialog.vue";
import blankDialog from "./components/blankDialog.vue";
import singleChooseDialog from "./components/singleChooseDialog.vue";
import { surveyReport } from "@/api/survey/surveyData.js";
export default {
  components: {
    // iButton,
    surveyData,
    detailsDialog,
    blankDialog,
    singleChooseDialog,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    surData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // open: false,
      openFileDetailsBol: false,
      openBlankDetailsBol: false,
      openSingleChooseDetailsBol: false,
      fileDetails: {},
      blankDetails: {},
      chooseDetails: {},
      sData: [],
    };
  },
  mounted() {
    this.query({ id: this.surData.id });
  },
  watch: {
    surData: {
      handler(data) {
        console.log("问卷数据:", data);
        // this.query({ id: data.id });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    query(e) {
      surveyReport(e).then((res) => {
        console.log("res", res);
        this.sData = res;
      });
    },
    openSingleDetails(data) {
      this.handleDialogTransform("singleDialog", "indexDialog", "single");
      this.chooseDetails = data;
    },
    openBlankDetails(data) {
      this.handleDialogTransform("blankDialog", "indexDialog", "blank");
      this.blankDetails = data;
    },
    openFileDetails(data) {
      this.handleDialogTransform("fileDialog", "indexDialog", "file");
      this.fileDetails = data;
    },
    backIndexDialog(type) {
      if (type === "file") {
        this.handleDialogTransformBack("fileDialog", "indexDialog", type);
      }
      if (type === "single") {
        this.handleDialogTransformBack("singleDialog", "indexDialog", type);
      }
      if (type === "blank") {
        this.handleDialogTransformBack("blankDialog", "indexDialog", type);
      }
    },
    handleDialogTransform(dom, indexDom, type) {
      this.$refs[indexDom].$el.style.transform = "translateX(-1920px)";
      this.$refs[indexDom].$el.style.transition = "0.5s";
      setTimeout(() => {
        if (type === "file") {
          this.openFileDetailsBol = true;
        }
        if (type === "single") {
          this.openSingleChooseDetailsBol = true;
        }
        if (type === "blank") {
          this.openBlankDetailsBol = true;
        }
        this.$nextTick(() => {
          this.$refs[dom].$el.style.transform = "translateX(1920px)";
          setTimeout(() => {
            this.$refs[dom].$el.style.transform = "translateX(0)";
            this.$refs[dom].$el.style.transition = "0.2s";
            this.open = false;
          }, 200);
        });
      }, 500);
    },
    handleDialogTransformBack(dom, indexDom, type) {
      this.$refs[dom].$el.style.transform = "translateX(1920px)";
      this.$refs[dom].$el.style.transition = "0.5s";
      setTimeout(() => {
        this.open = true;
        this.$nextTick(() => {
          this.$refs[indexDom].$el.style.transform = "translateX(-1920px)";
          setTimeout(() => {
            this.$refs[indexDom].$el.style.transform = "translateX(0)";
            this.$refs[indexDom].$el.style.transition = "0.2s";
            if (type === "file") {
              this.openFileDetailsBol = false;
            }
            if (type === "single") {
              this.openSingleChooseDetailsBol = false;
            }
            if (type === "blank") {
              this.openBlankDetailsBol = false;
            }
          }, 200);
        });
      }, 500);
    },
    // handleOpen() {
    //   this.open = true;
    // },
    closeDialog() {
      // this.open = false;
      this.$emit("closeDialog");
    },
  },
};
</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
