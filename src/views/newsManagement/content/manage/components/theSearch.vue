<template>
  <iSearch :icon="true">
    <el-form>
      <!--第一行-->
      <el-row>
        <el-form-item :label="language('NEWS_XINWENBIAOTI', '新闻标题')">
          <iInput
            :placeholder="language('LK_QINGSHURU', '请输入')"
            v-model="form.title"
          ></iInput>
        </el-form-item>
        <el-form-item :label="language('NEWS_XINWENFENLEI', '新闻分类')">
          <iSelect
            ref="select"
            :placeholder="language('LK_QINGXUANZE', '请选择')"
            v-model="form.category"
            clearable
          >
            <el-option
              v-for="item of userNewsClassify"
              :key="item.code"
              :value="item.code"
              :label="item.name"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('NEWS_XINWENLEIXING', '新闻类型')">
          <iSelect
            :placeholder="language('LK_QINGXUANZE', '请选择')"
            v-model="form.type"
            clearable
          >
            <el-option
              v-for="item of newsTypes"
              :key="item.value"
              :value="item.value"
              :label="item.label"
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
              v-for="item of newsStatus"
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
              v-for="item of isApprovalOption"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-row>
      <el-row>
        <iDateRangePicker
          class="LastSearchOption"
          :startDateProps="form.startPublishDate"
          :endDateProps="form.endPublishDate"
          @change-start="changeStart"
          @change-end="changeEnd"
          ref="iDateRangePicker"
          :label="language('NEWS_FABUQIZHIRIQI', '发布起止日期')"
        />
      </el-row>
    </el-form>
    <template v-slot:button>
          <iButton  @click="$emit('searchTableList')">{{ language('LK_INQUIRE', '查询') }}</iButton>
          <iButton @click="handleSearchReset">{{
            language('LK_ZHONGZHI', '重置')
          }}</iButton>
        </template>
  </iSearch>
</template>

<script>
import { iInput, iSelect,iButton } from "rise";
import { newsClassify, newsTypes,newsStatus } from "./data";
import iDateRangePicker from "@/components/iDateRangePicker/index.vue";
import iSearch from "@/components/iSearch/index.vue";
import dayjs from "@/utils/dayjs.js";

export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iButton,
    iDateRangePicker,
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return {};
      },
    },
    userNewsClassify: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      newsClassify,
      newsTypes,
      newsStatus,
      isApprovalOption: [
        {
          label: this.language('TERMS_SHI', '是'),
          value: 1,
        },
        {
          label: this.language('TERMS_FOU', '否'),
          value: 0,
        },
      ],
    };
  },
  mounted() {
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
      setTimeout(() => {
        this.$refs.iDateRangePicker.initDate();
      }, 4);
      this.$emit("handleSearchReset");
    },
    changeStart(e) {
      this.form.startPublishDate = e;
    },
    changeEnd(e) {
      this.form.endPublishDate = e;
      if (e) {
        this.endWeek = dayjs(e).week();
      } else {
        this.endWeek = dayjs(dayjs().year()).isoWeeksInYear();
      }
    },
    enterKey(event) {
      const code = event.keyCode
          ? event.keyCode
          : event.which
              ? event.which
              : event.charCode;
      if (code == 13) {
        this.$refs.select.blur();
        this.$emit('searchTableList');
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

<style lang="scss"  scoped>
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
