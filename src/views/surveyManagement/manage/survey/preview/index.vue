<template>
  <div class="container">
    <previewSurvey
      :preOpen="preOpen"
      @closePreDialog="closePreDialog"
      v-if="preOpen"
      :previewData="previewData"
      :createPre="createPre"
      :surveyId="surveyId"
    ></previewSurvey>
  </div>
</template>
<script>
import previewSurvey from "./components/previewSurveyDialog.vue";
import { findById } from "@/api/survey/survey.js";
export default {
  components: {
    previewSurvey,
  },
  props: {
    preOpen: {
      type: Boolean,
      default: false,
    },
    preData: {
      type: Object,
      default() {
        return {};
      },
    },
    createPre: {
      type: Boolean,
      default: false,
    },
    basicRuleForm: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      previewData: {},
    };
  },
  mounted() {
    if (this.createPre) {
      this.previewData = this.basicRuleForm;
    } else {
      this.query({ id: this.preData.id });
    }
  },
  watch: {
    // surData: {
    //   handler(data) {
    //     console.log("问卷数据:", data);
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  methods: {
    query(e) {
      findById(e).then((res) => {
        this.previewData = res;
      });
    },
    closePreDialog() {
      this.$emit("closePreDialog");
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