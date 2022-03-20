
<template>
  <div style="height: 100vh">
    <iframe
      v-if="pdfBlob"
      :src="pdfBlob"
     :title="$t('TM_YULAN')"
      width="100%"
      height="100%"
      class="preview-iframe"
    />
    <div v-else class="preview-no-data"></div>
  </div>
</template>
<script>
import { getFileByIds } from "@/api/terms/uploadFile";
import { preview } from "@/utils/downloadUtil.js";
import { Loading } from "element-ui";

export default {
  components: {},
  data() {
    return {
      pdfBlob: "",
    };
  },
  mounted() {
    this.getUrl();
  },
  methods: {
    getUrl() {
      Loading.service({});
      getFileByIds([this.$route.query.id]).then((res) => {
        const { id, name } = res;
        preview({
          id: id,
          filename: name,
          callback: (res) => {
            Loading.service().close();
            this.pdfBlob = res;
          },
        });
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.preview-iframe {
  border: 0;
}
</style>