<template>
  <iSearch>
    <el-form>
      <!--第一行-->
      <el-row>
        <el-form-item :label="language('NEWS_GONGGAOBIAOTI', '公告标题')">
          <iInput
              :placeholder="language('LK_QINGSHURU', '请输入')"
              v-model="form.title"
          ></iInput>
        </el-form-item>
        <el-form-item :label="language('NEWS_GONGGAOLEIXING', '公告类型')">
          <iSelect
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.type"
              clearable
          >
            <el-option
                v-for="item of noticeTypes"
                :key="item.id"
                :value="item.id"
                :label="item.name"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('NEWS_ZHUANGTAI', '状态')">
          <iSelect
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.status"
              clearable
          >
            <el-option
                v-for="item of noticeStatus"
                :key="item.value"
                :value="item.value"
                :label="item.label"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('NEWS_SHIFOUZHIDING', '是否置顶')">
          <iSelect
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.isTop"
              clearable
          >
            <el-option
                v-for="item of isTopOption"
                :key="item.value"
                :value="item.value"
                :label="item.label"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-row>
    </el-form>
    <template v-slot:button>
      <iButton @click="$emit('searchTableList', form)">{{ language('LK_INQUIRE', '查询') }}</iButton>
      <iButton @click="handleSearchReset">{{language('LK_ZHONGZHI', '重置')}}</iButton>
    </template>
  </iSearch>
</template>

<script>
import {iButton, iInput, iSelect} from "rise";
import {isTopOption, noticeStatus} from "./data";
import {getNoticeType,} from "@/api/news/notice.js";
// import iDateRangePicker from "@/components/newsComponents/iDateRangePicker/index.vue";
import iSearch from "@/components/iSearch/index.vue";

export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iButton,
  },
  props: {
    // form: {
    //   type: Object,
    //   default: () => {
    //     return {};
    //   },
    // },
  },
  data() {
    return {
      form: {
        isTop: "", // 是否置顶
        status: "", // 公告状态
        title: "", // 公告标题
        type: "", // 公告类型
      },
      noticeTypes: [],
      noticeStatus,
      isTopOption,
    };
  },
  mounted() {
    getNoticeType().then((res) => {
      // console.log("noticetype", res);
      this.noticeTypes = res;
    });
    // 绑定enter事件
    this.enterKeyup();
  },
  destroyed() {
    // 销毁enter事件
    this.enterKeyupDestroyed();
  },
  methods: {
    handleSearchReset() {
      this.form = {};
      this.$emit('searchTableList')
    },
    enterKey(event) {
      const code = event.keyCode
          ? event.keyCode
          : event.which
              ? event.which
              : event.charCode;
      if (code == 13) {
        this.$emit('searchTableList', this.form);
      }
    },
    enterKeyupDestroyed() {
      document.removeEventListener("keyup", this.enterKey);
    },
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .LastSearchOption {
  margin-top: 20px;
}

::v-deep .iSearch-content {
  justify-content: space-between;

  .operation {
    align-self: auto;
  }
}
</style>
